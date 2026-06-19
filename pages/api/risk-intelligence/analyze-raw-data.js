export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    },
    responseLimit: false
  }
}

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions'
const DEFAULT_CLAUDE_MODEL = process.env.ANTHROPIC_MODEL || process.env.CLAUDE_MODEL || 'claude-sonnet-4-6'
const DEFAULT_DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'
const CHUNK_SIZE = 42000

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
      summary: 'Модель вернула неструктурированный ответ. Ниже сохранен сырой текст ответа.',
      entities: {},
      facts: [{ title: 'Сырой ответ модели', description: safeText(text).slice(0, 12000) }],
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
  return `Верни только валидный JSON без markdown, комментариев и пояснений. Структура:
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
- Медицинские, паспортные, адресные и семейные сведения не превращай в "риск" сами по себе. Отмечай их только как чувствительные данные или как факт наличия в массиве.
- Если массив содержит мусор, повторы или противоречия, выделяй это отдельно.
- Пиши на русском языке.

${schemaInstruction()}`
}

function buildUserContent({ object, text, index, total }) {
  return `Объект проверки: ${JSON.stringify(object || {})}\n\nЭто часть ${index + 1} из ${total}. Разбери только этот фрагмент. Не делай финальный отчет по всему делу, только структурированный разбор фрагмента.\n\nСырой массив данных:\n${text}`
}

function anthropicKey() {
  return process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || ''
}

function deepseekKey() {
  return process.env.DEEPSEEK_API_KEY || ''
}

function getProvider() {
  const requested = safeText(process.env.AI_PROVIDER || '').toLowerCase().trim()
  if (requested === 'claude' || requested === 'anthropic') {
    if (!anthropicKey()) throw new Error('AI_PROVIDER=claude, но ANTHROPIC_API_KEY не задан в Vercel')
    return 'claude'
  }
  if (requested === 'deepseek') {
    if (!deepseekKey()) throw new Error('AI_PROVIDER=deepseek, но DEEPSEEK_API_KEY не задан в Vercel')
    return 'deepseek'
  }
  if (anthropicKey()) return 'claude'
  if (deepseekKey()) return 'deepseek'
  throw new Error('Не задан ключ ИИ. Добавь в Vercel ANTHROPIC_API_KEY для Claude или DEEPSEEK_API_KEY для DeepSeek')
}

function withTimeout(ms = 55000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ms)
  return { controller, done: () => clearTimeout(timeout) }
}

async function callClaude(messages, maxTokens = 7000) {
  const key = anthropicKey()
  if (!key) throw new Error('ANTHROPIC_API_KEY не задан в Vercel')

  const { controller, done } = withTimeout()
  try {
    const system = messages.find((item) => item.role === 'system')?.content || systemPrompt()
    const userMessages = messages.filter((item) => item.role !== 'system').map((item) => ({
      role: item.role === 'assistant' ? 'assistant' : 'user',
      content: safeText(item.content)
    }))

    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_CLAUDE_MODEL,
        max_tokens: maxTokens,
        temperature: 0.1,
        system,
        messages: userMessages
      }),
      signal: controller.signal
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = payload?.error?.message || payload?.message || `Claude API error ${response.status}`
      throw new Error(message)
    }

    const parts = Array.isArray(payload?.content) ? payload.content : []
    const text = parts.map((part) => part?.text || '').join('\n').trim()
    return text || '{}'
  } finally {
    done()
  }
}

async function callDeepSeek(messages, maxTokens = 7000) {
  const key = deepseekKey()
  if (!key) throw new Error('DEEPSEEK_API_KEY не задан в Vercel')

  const { controller, done } = withTimeout()
  try {
    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: DEFAULT_DEEPSEEK_MODEL,
        temperature: 0.1,
        response_format: { type: 'json_object' },
        messages,
        max_tokens: maxTokens,
        stream: false
      }),
      signal: controller.signal
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = payload?.error?.message || payload?.message || `DeepSeek API error ${response.status}`
      throw new Error(message)
    }
    return payload?.choices?.[0]?.message?.content || '{}'
  } finally {
    done()
  }
}

async function callModel(provider, messages, maxTokens = 7000) {
  if (provider === 'claude') return callClaude(messages, maxTokens)
  if (provider === 'deepseek') return callDeepSeek(messages, maxTokens)
  throw new Error(`Неизвестный провайдер ИИ: ${provider}`)
}

async function analyzeChunk({ provider, object, text, index, total }) {
  const content = await callModel(provider, [
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: buildUserContent({ object, text, index, total }) }
  ], 5000)
  return parseJson(content)
}

async function finalMerge({ provider, object, partials, rawLength }) {
  const content = await callModel(provider, [
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: `Объект проверки: ${JSON.stringify(object || {})}\n\nНиже частичные разборы большого массива данных. Объедини их в единый аналитический результат. Убери дубли. Не добавляй факты, которых нет в частичных разборах. Сделай итоговый riskAssessment и клиентский отчет.\n\nОбъем исходного массива: ${rawLength} знаков.\n\nЧастичные разборы:\n${JSON.stringify(partials).slice(0, 900000)}` }
  ], 7000)
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

    const provider = getProvider()
    const model = provider === 'claude' ? DEFAULT_CLAUDE_MODEL : DEFAULT_DEEPSEEK_MODEL
    const chunks = chunkText(rawText)
    const partials = []

    for (let index = 0; index < chunks.length; index += 1) {
      partials.push(await analyzeChunk({ provider, object, text: chunks[index], index, total: chunks.length }))
    }

    const analysis = chunks.length === 1
      ? partials[0]
      : await finalMerge({ provider, object, partials, rawLength: rawText.length })

    return res.status(200).json({
      ok: true,
      provider,
      model,
      chunks: chunks.length,
      analysis: {
        ...analysis,
        provider,
        model,
        rawLength: rawText.length
      }
    })
  } catch (error) {
    const message = error?.name === 'AbortError'
      ? 'ИИ не успел ответить за лимит времени Vercel. Попробуй уменьшить массив или использовать DeepSeek/Claude с более быстрым режимом.'
      : error.message || 'AI analysis failed'
    return res.status(500).json({ ok: false, error: message })
  }
}
