export const config = {
  maxDuration: 60,
  api: {
    bodyParser: { sizeLimit: '50mb' },
    responseLimit: false
  }
}

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions'
const DEFAULT_CLAUDE_MODEL = process.env.ANTHROPIC_MODEL || process.env.CLAUDE_MODEL || 'claude-sonnet-4-6'
const DEFAULT_DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat'
const CHUNK_SIZE = 36000

function safeText(value) {
  return typeof value === 'string' ? value : value == null ? '' : String(value)
}

function shortText(value, limit = 900) {
  return safeText(value).replace(/\s+/g, ' ').trim().slice(0, limit)
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
  return value
}

function balancedJson(text) {
  const value = stripJson(text)
  const first = value.indexOf('{')
  if (first < 0) return value
  let depth = 0
  let inString = false
  let escape = false
  for (let i = first; i < value.length; i += 1) {
    const char = value[i]
    if (escape) { escape = false; continue }
    if (char === '\\') { escape = true; continue }
    if (char === '"') { inString = !inString; continue }
    if (inString) continue
    if (char === '{') depth += 1
    if (char === '}') depth -= 1
    if (depth === 0) return value.slice(first, i + 1)
  }
  const last = value.lastIndexOf('}')
  if (last > first) return value.slice(first, last + 1)
  return value.slice(first)
}

function tryJson(text) {
  const attempts = [balancedJson(text), stripJson(text)]
  for (const attempt of attempts) {
    try { return JSON.parse(attempt) } catch (error) {}
  }
  return null
}

function extractStringField(text, field) {
  const re = new RegExp(`"${field}"\\s*:\\s*"([\\s\\S]*?)(?<!\\\\)"`, 'i')
  const match = safeText(text).match(re)
  return match?.[1]?.replace(/\\n/g, '\n').replace(/\\"/g, '"').trim() || ''
}

function extractArrayItems(text, field, limit = 8) {
  const value = safeText(text)
  const index = value.indexOf(`"${field}"`)
  if (index < 0) return []
  const after = value.slice(index)
  const start = after.indexOf('[')
  if (start < 0) return []
  let depth = 0
  let inString = false
  let escape = false
  let end = -1
  for (let i = start; i < after.length; i += 1) {
    const char = after[i]
    if (escape) { escape = false; continue }
    if (char === '\\') { escape = true; continue }
    if (char === '"') { inString = !inString; continue }
    if (inString) continue
    if (char === '[') depth += 1
    if (char === ']') depth -= 1
    if (depth === 0) { end = i; break }
  }
  if (end < 0) return []
  const raw = after.slice(start, end + 1)
  const parsed = tryJson(raw)
  if (Array.isArray(parsed)) return parsed.slice(0, limit)
  return []
}

function normalizeList(list, limit = 12) {
  return Array.isArray(list) ? list.filter(Boolean).slice(0, limit) : []
}

function normalizeAnalysis(value, rawModelText = '') {
  const source = value && typeof value === 'object' ? value : {}
  const summary = shortText(source.summary || extractStringField(rawModelText, 'summary') || 'Модель выделила признаки по предоставленному массиву. Требуется проверка аналитиком.', 1400)
  const riskSignals = normalizeList(source.riskSignals || source.risks || extractArrayItems(rawModelText, 'riskSignals', 10), 10)
  const facts = normalizeList(source.facts || extractArrayItems(rawModelText, 'facts', 10), 10)
  const connections = normalizeList(source.connections || extractArrayItems(rawModelText, 'connections', 10), 10)
  const contradictions = normalizeList(source.contradictions || extractArrayItems(rawModelText, 'contradictions', 8), 8)
  const questions = normalizeList(source.questions || extractArrayItems(rawModelText, 'questions', 8), 8)
  const recommendations = normalizeList(source.recommendations || extractArrayItems(rawModelText, 'recommendations', 8), 8)
  const entities = source.entities && typeof source.entities === 'object' ? source.entities : {}
  const score = Math.max(0, Math.min(100, Number(source?.riskAssessment?.score ?? source.score ?? calculateScore(riskSignals))))
  const level = ['low', 'medium', 'high', 'critical'].includes(source?.riskAssessment?.level) ? source.riskAssessment.level : scoreToLevel(score)

  const normalized = {
    summary,
    entities,
    facts: facts.map((item, index) => normalizeFact(item, index)),
    riskSignals: riskSignals.map((item, index) => normalizeRisk(item, index)),
    connections: connections.map((item, index) => normalizeConnection(item, index)),
    contradictions: contradictions.map((item) => typeof item === 'string' ? item : item.description || item.title || JSON.stringify(item)),
    questions: questions.map((item) => typeof item === 'string' ? item : item.question || item.description || JSON.stringify(item)),
    recommendations: recommendations.map((item) => typeof item === 'string' ? item : item.recommendation || item.description || JSON.stringify(item)),
    riskAssessment: { score, level, explanation: source?.riskAssessment?.explanation || '' },
    parseWarning: value ? '' : 'Модель вернула ответ, который не удалось полностью разобрать как JSON. Сайт собрал отчет из доступных фрагментов.'
  }

  normalized.clientReportDraft = buildClientReport(normalized)
  return normalized
}

function normalizeFact(item, index) {
  if (typeof item === 'string') return { title: `Факт ${index + 1}`, description: shortText(item), confidence: 'medium' }
  return {
    title: item?.title || `Факт ${index + 1}`,
    description: shortText(item?.description || item?.text || item?.sourceFragment || JSON.stringify(item)),
    sourceFragment: shortText(item?.sourceFragment || item?.source || '', 400),
    confidence: ['low', 'medium', 'high'].includes(item?.confidence) ? item.confidence : 'medium'
  }
}

function normalizeRisk(item, index) {
  if (typeof item === 'string') return { category: 'other', title: `Сигнал ${index + 1}`, description: shortText(item), severity: 'medium', confidence: 'medium', source: '' }
  return {
    category: item?.category || 'other',
    title: item?.title || `Сигнал ${index + 1}`,
    description: shortText(item?.description || item?.reason || item?.evidence || ''),
    severity: ['low', 'medium', 'high', 'critical'].includes(item?.severity) ? item.severity : 'medium',
    confidence: ['low', 'medium', 'high'].includes(item?.confidence) ? item.confidence : 'medium',
    source: shortText(item?.source || '', 400)
  }
}

function normalizeConnection(item, index) {
  if (typeof item === 'string') return { target_name: item, target_type: 'other', relation_type: 'mentioned_together', strength: 'medium', description: '' }
  return {
    target_name: item?.target_name || item?.targetName || item?.name || `Связь ${index + 1}`,
    target_type: item?.target_type || item?.targetType || 'other',
    relation_type: item?.relation_type || item?.relationType || 'mentioned_together',
    strength: ['weak', 'medium', 'strong'].includes(item?.strength) ? item.strength : 'medium',
    description: shortText(item?.description || item?.reason || '')
  }
}

function scoreToLevel(score) {
  return score >= 75 ? 'critical' : score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low'
}

function riskLabel(level) {
  return level === 'critical' ? 'Критический' : level === 'high' ? 'Высокий' : level === 'medium' ? 'Средний' : 'Низкий'
}

function calculateScore(risks = []) {
  const weights = { low: 10, medium: 25, high: 50, critical: 80 }
  const confidence = { low: 0.6, medium: 0.85, high: 1 }
  const total = risks.reduce((sum, item) => sum + ((weights[item?.severity] || 15) * (confidence[item?.confidence] || 0.8)), 0)
  return Math.max(0, Math.min(100, Math.round(total)))
}

function lineList(items, mapper, fallback) {
  const lines = normalizeList(items, 8).map((item, index) => `${index + 1}. ${mapper(item)}`.trim()).filter(Boolean)
  return lines.length ? lines : [fallback]
}

function buildClientReport(analysis) {
  const score = Number(analysis?.riskAssessment?.score || 0)
  const level = analysis?.riskAssessment?.level || scoreToLevel(score)
  const materialRisks = (analysis.riskSignals || []).filter((risk) => ['medium', 'high', 'critical'].includes(risk.severity) || ['high'].includes(risk.confidence))

  return [
    'Предварительный аналитический отчет HEIMDALL',
    '',
    `Дата формирования: ${new Date().toLocaleString('ru-RU')}`,
    `Предварительный уровень риска: ${riskLabel(level)} (${score}/100)`,
    '',
    '1. Краткий вывод',
    shortText(analysis.summary, 1400),
    '',
    '2. Идентификация объекта',
    'По предоставленному массиву выполнена идентификация объекта и связанных источников. Детальные адреса, документы, медицинские сведения и иные чувствительные персональные данные в клиентский отчет не выводятся и должны использоваться только при наличии законного основания.',
    '',
    '3. Подтвержденные факты',
    ...lineList(analysis.facts, (fact) => shortText(fact.description || fact.title), 'Существенные подтвержденные факты не выделены или требуют ручной проверки.'),
    '',
    '4. Значимые сигналы риска',
    ...lineList(materialRisks, (risk) => `${risk.title} - ${shortText(risk.description)} Уровень: ${riskLabel(risk.severity)}, достоверность: ${risk.confidence || 'medium'}.`, 'Значимые деловые, юридические, финансовые или репутационные сигналы риска по предоставленному массиву не подтверждены.'),
    '',
    '5. Связи и контекст',
    ...lineList(analysis.connections, (connection) => `${connection.target_name} - ${shortText(connection.description || 'упоминается в массиве данных')}`, 'Существенные деловые связи не выделены или требуют подтверждения.'),
    '',
    '6. Противоречия и зоны неопределенности',
    ...lineList(analysis.contradictions, (item) => shortText(item), 'Критичных противоречий по предоставленному массиву не выделено. Отдельные совпадения требуют подтверждения по дополнительным идентификаторам.'),
    '',
    '7. Что проверить дополнительно',
    ...lineList(analysis.questions?.length ? analysis.questions : analysis.recommendations, (item) => shortText(item), 'Проверить источники ключевых совпадений, актуальность данных и отсутствие однофамильцев.'),
    '',
    '8. Предварительное заключение',
    'Отчет является предварительным аналитическим документом. Он не содержит утверждений о виновности, нарушении закона или недобросовестности объекта проверки. Финальный вывод должен быть утвержден аналитиком после проверки источников, релевантности признаков и законности использования данных.'
  ].join('\n')
}

function schemaInstruction() {
  return `Верни только компактный валидный JSON без markdown. Не возвращай клиентский отчет внутри JSON. Ограничь массивы: facts до 8, riskSignals до 8, connections до 8, contradictions до 6, questions до 6, recommendations до 6.
Структура:
{
  "summary": "короткий деловой вывод без персональных подробностей",
  "entities": {"people": [], "companies": [], "inn": [], "ogrn": [], "domains": [], "urls": []},
  "facts": [{"title": "", "description": "", "sourceFragment": "", "confidence": "low|medium|high"}],
  "riskSignals": [{"category": "legal|financial|reputation|employment|sanctions|conflict_of_interest|behavioral|documents|digital_trace|identification|other", "title": "", "description": "", "severity": "low|medium|high|critical", "confidence": "low|medium|high", "source": ""}],
  "connections": [{"target_name": "", "target_type": "person|company|phone|email|domain|address|social_profile|document|incident|other", "relation_type": "works_at|owns|affiliated_with|contacted_by|same_phone|same_email|mentioned_together|family_or_close_relation|contractor_of|other", "strength": "weak|medium|strong", "description": ""}],
  "contradictions": [],
  "questions": [],
  "recommendations": [],
  "riskAssessment": {"score": 0, "level": "low|medium|high|critical", "explanation": ""}
}`
}

function systemPrompt() {
  return `Ты старший риск-аналитик HEIMDALL. Разбираешь сырой массив данных для внутреннего аналитика.

Правила:
- Не выдумывай факты.
- Не делай обвинительных формулировок.
- Отделяй подтвержденные факты от гипотез и вопросов для проверки.
- Не повышай риск только из-за наличия адресов, паспортов, телефонов, медицинских записей, семейных связей, поездок, покупок или личных сообщений.
- Если массив содержит чувствительные или избыточные персональные данные, это риск обработки данных и комплаенса, а не автоматический риск самого объекта.
- Для компаний оценивай финансовые, юридические, корпоративные, репутационные, санкционные и договорные признаки.
- Для кандидатов оценивай только деловую релевантность, непротиворечивость опыта, юридические/финансовые/репутационные маркеры.
- Пиши осторожно: "по предоставленному массиву", "выявлен признак", "требует проверки".
- Пиши на русском языке.
- Верни только JSON, без markdown.

${schemaInstruction()}`
}

function buildUserContent({ object, text, index, total }) {
  return `Объект проверки: ${JSON.stringify(object || {})}\n\nФрагмент ${index + 1} из ${total}. Разбери только этот фрагмент. Не включай подробные адреса, паспорта, медицину и частную жизнь в выводы, кроме нейтральной отметки о наличии чувствительных данных.\n\nСырой массив данных:\n${text}`
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
  throw new Error('Не задан ключ ИИ. Добавь ANTHROPIC_API_KEY или DEEPSEEK_API_KEY в Vercel')
}

function withTimeout(ms = 55000) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ms)
  return { controller, done: () => clearTimeout(timeout) }
}

async function callClaude(messages, maxTokens = 5000) {
  const key = anthropicKey()
  if (!key) throw new Error('ANTHROPIC_API_KEY не задан в Vercel')
  const { controller, done } = withTimeout()
  try {
    const system = messages.find((item) => item.role === 'system')?.content || systemPrompt()
    const userMessages = messages.filter((item) => item.role !== 'system').map((item) => ({ role: item.role === 'assistant' ? 'assistant' : 'user', content: safeText(item.content) }))
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: DEFAULT_CLAUDE_MODEL, max_tokens: maxTokens, temperature: 0.1, system, messages: userMessages }),
      signal: controller.signal
    })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `Claude API error ${response.status}`)
    return (Array.isArray(payload?.content) ? payload.content.map((part) => part?.text || '').join('\n') : '').trim() || '{}'
  } finally { done() }
}

async function callDeepSeek(messages, maxTokens = 5000) {
  const key = deepseekKey()
  if (!key) throw new Error('DEEPSEEK_API_KEY не задан в Vercel')
  const { controller, done } = withTimeout()
  try {
    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: DEFAULT_DEEPSEEK_MODEL, temperature: 0.1, response_format: { type: 'json_object' }, messages, max_tokens: maxTokens, stream: false }),
      signal: controller.signal
    })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `DeepSeek API error ${response.status}`)
    return payload?.choices?.[0]?.message?.content || '{}'
  } finally { done() }
}

async function callModel(provider, messages, maxTokens = 5000) {
  if (provider === 'claude') return callClaude(messages, maxTokens)
  if (provider === 'deepseek') return callDeepSeek(messages, maxTokens)
  throw new Error(`Неизвестный провайдер ИИ: ${provider}`)
}

async function analyzeChunk({ provider, object, text, index, total }) {
  const content = await callModel(provider, [
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: buildUserContent({ object, text, index, total }) }
  ], 4200)
  return normalizeAnalysis(tryJson(content), content)
}

async function finalMerge({ provider, object, partials, rawLength }) {
  const content = await callModel(provider, [
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: `Объект проверки: ${JSON.stringify(object || {})}\n\nНиже частичные разборы большого массива данных. Объедини их в один компактный результат. Убери дубли. Не добавляй факты, которых нет в частичных разборах. Не включай подробные чувствительные персональные данные.\n\nОбъем исходного массива: ${rawLength} знаков.\n\nЧастичные разборы:\n${JSON.stringify(partials).slice(0, 750000)}` }
  ], 5200)
  return normalizeAnalysis(tryJson(content), content)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const object = req.body?.object || {}
    const rawText = safeText(req.body?.rawText)
    if (!rawText.trim()) return res.status(400).json({ ok: false, error: 'Пустой массив данных' })

    const provider = getProvider()
    const model = provider === 'claude' ? DEFAULT_CLAUDE_MODEL : DEFAULT_DEEPSEEK_MODEL
    const chunks = chunkText(rawText)
    const partials = []

    for (let index = 0; index < chunks.length; index += 1) {
      partials.push(await analyzeChunk({ provider, object, text: chunks[index], index, total: chunks.length }))
    }

    const analysis = chunks.length === 1 ? partials[0] : await finalMerge({ provider, object, partials, rawLength: rawText.length })

    return res.status(200).json({
      ok: true,
      provider,
      model,
      chunks: chunks.length,
      analysis: { ...analysis, provider, model, rawLength: rawText.length }
    })
  } catch (error) {
    const message = error?.name === 'AbortError'
      ? 'ИИ не успел ответить за лимит времени Vercel. Попробуй уменьшить массив или повторить запрос.'
      : error.message || 'AI analysis failed'
    return res.status(500).json({ ok: false, error: message })
  }
}
