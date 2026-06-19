export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    },
    responseLimit: false
  }
}

const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1'
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const CHUNK_SIZE = 70000

function safeText(value) {
  return typeof value === 'string' ? value : value == null ? '' : String(value)
}

function chunkText(text, size = CHUNK_SIZE) {
  const value = safeText(text)
  if (!value) return []
  const chunks = []
  for (let index = 0; index < value.length; index += size) chunks.push(value.slice(index, index + size))
  return chunks
}

function stripJson(text) {
  const value = safeText(text).trim()
  if (!value) return '{}'
  const fenced = value.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced?.[1]) return fenced[1].trim()
  const first = value.indexOf('{')
  const last = value.lastIndexOf('}')
  if (first >= 0 && last > first) return value.slice(first, last + 1)
  return value
}

function parseJson(text) {
  try {
    return JSON.parse(stripJson(text))
  } catch (error) {
    return {
      summary: 'ИИ вернул неструктурированный ответ. Ниже сохранен сырой текст ответа.',
      entities: {},
      facts: [{ title: 'Сырой ответ ИИ', description: safeText(text).slice(0, 12000) }],
      riskSignals: [],
      connections: [],
      contradictions: [],
      questions: ['Повторить анализ или разобрать ответ вручную.'],
      recommendations: ['Не использовать неструктурированный ответ как финальный отчет.'],
      riskAssessment: { score: 0, level: 'low', explanation: 'Не удалось разобрать JSON.' },
      clientReportDraft: safeText(text).slice(0, 16000)
    }
  }
}

function schemaInstruction() {
  return `Верни только валидный JSON без markdown. Структура:
{
  "summary": "краткое резюме анализа",
  "entities": {
    "people": [],
    "companies": [],
    "phones": [],
    "emails": [],
    "inn": [],
    "ogrn": [],
    "domains": [],
    "urls": [],
    "addresses": [],
    "documents": []
  },
  "facts": [
    {"title": "", "description": "", "sourceFragment": "", "confidence": "low|medium|high"}
  ],
  "riskSignals": [
    {"category": "legal|financial|reputation|employment|sanctions|conflict_of_interest|behavioral|documents|digital_trace|identification|other", "title": "", "description": "", "severity": "low|medium|high|critical", "confidence": "low|medium|high", "source": "фрагмент/источник из массива"}
  ],
  "connections": [
    {"target_name": "", "target_type": "person|company|phone|email|domain|address|social_profile|document|incident|other", "relation_type": "works_at|owns|affiliated_with|contacted_by|same_phone|same_email|mentioned_together|family_or_close_relation|contractor_of|other", "strength": "weak|medium|strong", "description": ""}
  ],
  "contradictions": [],
  "questions": [],
  "recommendations": [],
  "riskAssessment": {"score": 0, "level": "low|medium|high|critical", "explanation": ""},
  "clientReportDraft": "черновик клиентского отчета"
}`
}

function systemPrompt() {
  return `Ты аналитик HEIMDALL. Твоя задача - разобрать сырой массив данных по объекту проверки и структурировать его для риск-аналитика.

Критически важно:
- Не выдумывай факты.
- Не делай обвинительных утверждений.
- Разделяй факты, признаки, гипотезы и вопросы для проверки.
- Если совпадение не подтверждено, так и пиши: "требует подтверждения".
- Не пиши, что лицо виновно, нарушило закон или является мошенником.
- Используй формулировки: "выявлен признак", "может указывать на", "требует дополнительной проверки", "по предоставленным данным".
- В riskSignals оценивай не человека, а признаки в данных.
- Если массив содержит мусор, повторы или противоречия, выделяй это отдельно.
- Пиши на русском языке.

${schemaInstruction()}`
}

async function callOpenAI(messages, maxTokens = 10000) {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('OPENAI_API_KEY не задан в Vercel')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 110000)
  try {
    const response = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        temperature: 0.1,
        response_format: { type: 'json_object' },
        messages,
        max_tokens: maxTokens
      }),
      signal: controller.signal
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = payload?.error?.message || `OpenAI API error ${response.status}`
      throw new Error(message)
    }
    return payload?.choices?.[0]?.message?.content || '{}'
  } finally {
    clearTimeout(timeout)
  }
}

async function analyzeChunk({ object, text, index, total }) {
  const content = await callOpenAI([
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: `Объект проверки: ${JSON.stringify(object || {})}\n\nЭто часть ${index + 1} из ${total}. Разбери только этот фрагмент. Не делай финальный отчет по всему делу, только структурированный разбор фрагмента.\n\nСырой массив данных:\n${text}` }
  ], 8000)
  return parseJson(content)
}

async function finalMerge({ object, partials, rawLength }) {
  const content = await callOpenAI([
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: `Объект проверки: ${JSON.stringify(object || {})}\n\nНиже частичные разборы большого массива данных. Объедини их в единый аналитический результат. Убери дубли. Не добавляй факты, которых нет в частичных разборах. Сделай итоговый riskAssessment и клиентский отчет.\n\nОбъем исходного массива: ${rawLength} знаков.\n\nЧастичные разборы:\n${JSON.stringify(partials).slice(0, 900000)}` }
  ], 12000)
  return parseJson(content)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const object = req.body?.object || {}
    const rawText = safeText(req.body?.rawText)

    if (!rawText.trim()) {
      return res.status(400).json({ ok: false, error: 'Пустой массив данных' })
    }

    const chunks = chunkText(rawText)
    const partials = []

    for (let index = 0; index < chunks.length; index += 1) {
      partials.push(await analyzeChunk({ object, text: chunks[index], index, total: chunks.length }))
    }

    const analysis = chunks.length === 1
      ? partials[0]
      : await finalMerge({ object, partials, rawLength: rawText.length })

    return res.status(200).json({
      ok: true,
      model: DEFAULT_MODEL,
      chunks: chunks.length,
      analysis: {
        ...analysis,
        provider: 'openai',
        model: DEFAULT_MODEL,
        rawLength: rawText.length
      }
    })
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'OpenAI analysis failed' })
  }
}
