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

function normalizeTextItem(item, fallback = '') {
  if (typeof item === 'string') return shortText(item, 900)
  if (!item || typeof item !== 'object') return fallback
  return shortText(item.description || item.text || item.summary || item.comment || item.title || fallback, 900)
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
  const normalizedRisks = riskSignals.map((item, index) => normalizeRisk(item, index))
  const normalizedFacts = facts.map((item, index) => normalizeFact(item, index))
  const normalizedConnections = connections.map((item, index) => normalizeConnection(item, index))

  const normalized = {
    summary,
    entities,
    profile: normalizeProfile(source.profile, source.objectProfile, entities),
    facts: normalizedFacts,
    riskSignals: normalizedRisks,
    riskMatrix: normalizeRiskMatrix(source.riskMatrix, normalizedRisks),
    riskDetails: normalizeRiskDetails(source.riskDetails, normalizedRisks),
    chronology: normalizeChronology(source.chronology || source.timeline),
    sourceContour: normalizeSourceContour(source.sourceContour || source.sources, normalizedRisks),
    connections: normalizedConnections,
    contradictions: contradictions.map((item) => typeof item === 'string' ? item : item.description || item.title || JSON.stringify(item)),
    questions: questions.map((item) => typeof item === 'string' ? item : item.question || item.description || JSON.stringify(item)),
    recommendations: recommendations.map((item) => typeof item === 'string' ? item : item.recommendation || item.description || JSON.stringify(item)),
    recommendationActions: normalizeRecommendationActions(source.recommendationActions || source.actions, recommendations),
    decision: normalizeDecision(source.decision, summary, level),
    reviewChecklist: normalizeReviewChecklist(source.reviewChecklist),
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

function normalizeProfile(profile, objectProfile, entities) {
  const source = profile && typeof profile === 'object' ? profile : objectProfile && typeof objectProfile === 'object' ? objectProfile : {}
  const company = normalizeList(entities?.companies, 1)[0] || ''
  return {
    objectName: shortText(source.objectName || source.name || company || 'Объект проверки', 160),
    objectType: shortText(source.objectType || source.type || 'Не классифицирован', 160),
    activity: shortText(source.activity || source.sector || source.role || 'Требует уточнения по материалам проверки', 240),
    declaredHistory: shortText(source.declaredHistory || source.history || source.background || 'История и контекст требуют проверки по источникам', 260),
    jurisdictions: normalizeList(source.jurisdictions || source.locations || [], 8).map((item) => normalizeTextItem(item)).filter(Boolean),
    keyRisk: shortText(source.keyRisk || source.mainRisk || 'Ключевой риск определяется после проверки источников и идентификации объекта', 320),
    statusRecommendation: shortText(source.statusRecommendation || source.status || 'Черновик требует проверки аналитиком HEIMDALL', 320)
  }
}

function normalizeRiskMatrix(matrix, risks) {
  const items = normalizeList(matrix, 8)
  if (items.length) {
    return items.map((item, index) => ({
      category: shortText(item?.category || item?.title || `Категория ${index + 1}`, 140),
      risk: riskLabel(['low', 'medium', 'high', 'critical'].includes(item?.risk) ? item.risk : item?.level || item?.severity || 'medium'),
      comment: shortText(item?.comment || item?.description || item?.signal || '', 260)
    }))
  }

  return normalizeList(risks, 6).map((risk) => ({
    category: shortText(risk.category || risk.title || 'Риск', 140),
    risk: riskLabel(risk.severity || 'medium'),
    comment: shortText(risk.description || risk.source || 'Требует проверки аналитиком', 260)
  }))
}

function normalizeRiskDetails(details, risks) {
  const items = normalizeList(details, 8)
  const source = items.length ? items : normalizeList(risks, 8).map((risk) => ({
    title: risk.title,
    level: risk.severity,
    signal: risk.description,
    whyItMatters: risk.source || 'Сигнал может влиять на договорные, комплаенс- или управленческие решения.',
    additionalCheck: 'Проверить источник, актуальность, идентификаторы объекта и деловую значимость признака.'
  }))

  return source.map((item, index) => ({
    title: shortText(item?.title || item?.risk || `Риск ${index + 1}`, 180),
    level: ['low', 'medium', 'high', 'critical'].includes(item?.level) ? item.level : ['low', 'medium', 'high', 'critical'].includes(item?.severity) ? item.severity : 'medium',
    signal: shortText(item?.signal || item?.description || item?.evidence || '', 420),
    whyItMatters: shortText(item?.whyItMatters || item?.importance || item?.impact || '', 420),
    additionalCheck: shortText(item?.additionalCheck || item?.whatToCheck || item?.nextStep || '', 420),
    sourceRefs: normalizeList(item?.sourceRefs || item?.sources || [], 5).map((ref) => normalizeTextItem(ref)).filter(Boolean),
    confidence: ['low', 'medium', 'high'].includes(item?.confidence) ? item.confidence : 'medium'
  }))
}

function normalizeChronology(items) {
  return normalizeList(items, 8).map((item, index) => ({
    period: shortText(item?.period || item?.date || item?.year || `Этап ${index + 1}`, 120),
    event: shortText(item?.event || item?.title || item?.description || '', 260),
    comment: shortText(item?.comment || item?.meaning || item?.context || '', 260)
  })).filter((item) => item.event || item.comment)
}

function normalizeSourceContour(items, risks) {
  const source = normalizeList(items, 8)
  if (source.length) {
    return source.map((item) => ({
      source: shortText(item?.source || item?.name || item?.type || 'Источник', 140),
      assessment: shortText(item?.assessment || item?.tone || item?.status || 'Требует проверки', 120),
      signal: shortText(item?.signal || item?.description || item?.comment || '', 320)
    }))
  }

  return normalizeList(risks, 6).map((risk) => ({
    source: shortText(risk.source || risk.category || 'Сырой массив данных', 140),
    assessment: risk.severity === 'critical' || risk.severity === 'high' ? 'Негативный' : risk.severity === 'medium' ? 'Смешанный' : 'Нейтральный',
    signal: shortText(risk.description || risk.title || '', 320)
  }))
}

function normalizeRecommendationActions(items, recommendations) {
  const source = normalizeList(items, 6)
  if (source.length) {
    return source.map((item, index) => ({
      action: shortText(item?.action || item?.title || `Действие ${index + 1}`, 220),
      description: shortText(item?.description || item?.reason || item?.comment || '', 420)
    }))
  }

  return normalizeList(recommendations, 6).map((item, index) => ({
    action: shortText(typeof item === 'string' ? item : item?.recommendation || item?.title || `Действие ${index + 1}`, 220),
    description: shortText(typeof item === 'string' ? 'Проверить и применить при согласовании отчета.' : item?.description || item?.reason || '', 420)
  }))
}

function normalizeDecision(decision, summary, level) {
  const source = decision && typeof decision === 'object' ? decision : {}
  return {
    recommendation: shortText(source.recommendation || source.action || (level === 'critical' || level === 'high' ? 'Не принимать решение без расширенной проверки и условий защиты.' : 'Допустимо продолжить работу после проверки ключевых источников.'), 420),
    rationale: shortText(source.rationale || source.summary || summary, 800)
  }
}

function normalizeReviewChecklist(items) {
  const defaults = [
    'Проверить источники по каждому существенному риску.',
    'Подтвердить идентификацию объекта и исключить однофамильцев/одноименные компании.',
    'Отделить подтвержденные факты от гипотез и комментариев.',
    'Убрать из клиентского отчета избыточные персональные и чувствительные данные.',
    'Проверить, что формулировки не звучат как обвинение без подтвержденной основы.',
    'Согласовать итоговую рекомендацию с руководителем проверки.'
  ]
  const source = normalizeList(items, 8).map((item) => normalizeTextItem(item)).filter(Boolean)
  return source.length ? source : defaults
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
  const profile = analysis.profile || {}
  const riskMatrix = normalizeList(analysis.riskMatrix, 8)
  const riskDetails = normalizeList(analysis.riskDetails, 8)
  const chronology = normalizeList(analysis.chronology, 8)
  const sourceContour = normalizeList(analysis.sourceContour, 8)
  const recommendations = normalizeList(analysis.recommendationActions, 6)
  const decision = analysis.decision || {}
  const methodology = [
    ['Идентификация', 'Совпадения по названию, роли, регистрационным данным, доменам, контактам и связанным лицам.'],
    ['Суды и обязательства', 'Судебные дела, исполнительные производства, банкротные признаки, повторяющиеся споры и претензии.'],
    ['Санкции и комплаенс', 'Прямые списки, косвенные связи, цепочки владения, контрагенты и юрисдикционные ограничения.'],
    ['Репутация', 'Негативные публикации, отзывы, архивы, профессиональные обсуждения и публичные конфликты.'],
    ['Связи', 'Директора, учредители, номинальные лица, пересечения по адресам, телефонам, доменам и поставщикам.'],
    ['Вывод', 'Risk index, ключевые находки, сценарии действий и управленческая рекомендация.']
  ]

  return [
    'HEIMDALL INTELLIGENCE GROUP',
    'WORKING DRAFT - ANALYST REVIEW REQUIRED',
    'Confidential analytical format',
    '',
    'Counterparty / Subject Intelligence Report',
    '',
    `Объект: ${profile.objectName || 'Объект проверки'}`,
    `Индекс риска: ${score}/100`,
    `Статус: Черновик на проверке аналитиком`,
    `Классификация: ${profile.objectType || 'Risk intelligence object'}`,
    `Дата формирования: ${new Date().toLocaleString('ru-RU')}`,
    '',
    '1. Executive Summary',
    '',
    `Risk Index: ${score}/100`,
    `Предварительный уровень риска: ${riskLabel(level)}`,
    '',
    shortText(analysis.summary, 1400),
    '',
    'Категория | Риск | Комментарий',
    ...(riskMatrix.length ? riskMatrix.map((item) => `${item.category} | ${item.risk} | ${item.comment}`) : ['Профиль риска | Требует проверки | Недостаточно структурированных сигналов для уверенной матрицы.']),
    '',
    '2. Профиль объекта проверки',
    '',
    `Объект: ${profile.objectName || 'Не указан'}`,
    `Тип / роль: ${profile.objectType || 'Не указан'}`,
    `Сфера / контекст: ${profile.activity || 'Требует уточнения'}`,
    `Заявленная история: ${profile.declaredHistory || 'Требует проверки'}`,
    `Юрисдикции: ${profile.jurisdictions?.length ? profile.jurisdictions.join(', ') : 'Не выделены'}`,
    `Ключевой риск: ${profile.keyRisk || 'Требует ручной квалификации'}`,
    `Статус: ${profile.statusRecommendation || 'Требует проверки аналитиком'}`,
    '',
    '3. Выявленные риски и проблемы',
    '',
    ...(riskDetails.length ? riskDetails.flatMap((risk, index) => [
      `3.${index + 1}. ${risk.title}`,
      `Уровень: ${riskLabel(risk.level)}`,
      `Сигнал: ${risk.signal || 'Сигнал требует уточнения.'}`,
      `Почему это важно: ${risk.whyItMatters || 'Влияние на решение должно быть проверено аналитиком.'}`,
      `Что проверить дополнительно: ${risk.additionalCheck || 'Проверить источник, актуальность и деловую значимость.'}`,
      risk.sourceRefs?.length ? `Источники / фрагменты: ${risk.sourceRefs.join('; ')}` : '',
      ''
    ].filter(Boolean)) : ['Существенные риски не выделены или требуют ручной проверки.', '']),
    '4. Хронология и контекст',
    '',
    'Период | Событие | Комментарий',
    ...(chronology.length ? chronology.map((item) => `${item.period} | ${item.event} | ${item.comment}`) : ['Не выделено | Хронология требует ручной сборки | Добавьте даты и события после проверки источников.']),
    '',
    '5. OSINT и репутационный контур',
    '',
    'Источник | Оценка | Сигнал',
    ...(sourceContour.length ? sourceContour.map((item) => `${item.source} | ${item.assessment} | ${item.signal}`) : ['Сырой массив | Требует проверки | Источники должны быть подтверждены аналитиком.']),
    '',
    '6. Рекомендации HEIMDALL',
    '',
    'Действие | Описание',
    ...(recommendations.length ? recommendations.map((item) => `${item.action} | ${item.description}`) : lineList(analysis.recommendations, (item) => `${shortText(item)} | Проверить перед финальным решением.`, 'Провести ручную проверку ключевых выводов перед передачей отчета клиенту.')),
    '',
    `Решение: ${decision.recommendation || 'Итоговое решение должно быть согласовано аналитиком.'}`,
    '',
    `Итог HEIMDALL: ${decision.rationale || 'вывод требует ручного согласования после проверки источников, идентификаторов и релевантности признаков.'}`,
    '',
    '7. Приложение - методология проверки',
    '',
    'Блок | Что проверяется',
    ...methodology.map(([block, text]) => `${block} | ${text}`),
    '',
    'Внутреннее ограничение: этот документ является рабочим черновиком. Перед передачей клиенту сотрудник HEIMDALL должен проверить источники, убрать неподтвержденные утверждения и согласовать итоговую рекомендацию.'
  ].join('\n')
}

function schemaInstruction() {
  return `Верни только компактный валидный JSON без markdown. Не возвращай клиентский отчет внутри JSON: сайт сам соберет отчет по шаблону HEIMDALL. Ограничь массивы: facts до 8, riskSignals до 8, riskDetails до 8, riskMatrix до 6, chronology до 8, sourceContour до 8, connections до 8, contradictions до 6, questions до 6, recommendations до 6.
Структура:
{
  "summary": "короткий деловой вывод без персональных подробностей",
  "profile": {
    "objectName": "",
    "objectType": "",
    "activity": "",
    "declaredHistory": "",
    "jurisdictions": [],
    "keyRisk": "",
    "statusRecommendation": ""
  },
  "entities": {"people": [], "companies": [], "inn": [], "ogrn": [], "domains": [], "urls": []},
  "facts": [{"title": "", "description": "", "sourceFragment": "", "confidence": "low|medium|high"}],
  "riskMatrix": [{"category": "", "risk": "low|medium|high|critical", "comment": ""}],
  "riskSignals": [{"category": "legal|financial|reputation|employment|sanctions|conflict_of_interest|behavioral|documents|digital_trace|identification|other", "title": "", "description": "", "severity": "low|medium|high|critical", "confidence": "low|medium|high", "source": ""}],
  "riskDetails": [{"title": "", "level": "low|medium|high|critical", "signal": "", "whyItMatters": "", "additionalCheck": "", "sourceRefs": [], "confidence": "low|medium|high"}],
  "chronology": [{"period": "", "event": "", "comment": ""}],
  "sourceContour": [{"source": "", "assessment": "negative|mixed|neutral|positive|needs_review", "signal": ""}],
  "connections": [{"target_name": "", "target_type": "person|company|phone|email|domain|address|social_profile|document|incident|other", "relation_type": "works_at|owns|affiliated_with|contacted_by|same_phone|same_email|mentioned_together|family_or_close_relation|contractor_of|other", "strength": "weak|medium|strong", "description": ""}],
  "contradictions": [],
  "questions": [],
  "recommendations": [],
  "recommendationActions": [{"action": "", "description": ""}],
  "decision": {"recommendation": "", "rationale": ""},
  "reviewChecklist": [],
  "riskAssessment": {"score": 0, "level": "low|medium|high|critical", "explanation": ""}
}`
}

function systemPrompt() {
  return `Ты старший риск-аналитик HEIMDALL. Разбираешь сырой массив данных для внутреннего аналитика.

Правила:
- Не выдумывай факты.
- Не делай обвинительных формулировок.
- Отделяй подтвержденные факты от гипотез и вопросов для проверки.
- Каждый значимый риск должен иметь: сигнал, почему это важно для решения клиента, что проверить дополнительно.
- Если источник не подтвержден или контекст неполный, снижай confidence и выноси вопрос в questions/reviewChecklist.
- Не превращай частную жизнь, адреса, телефоны и бытовые сведения в риск без понятной деловой релевантности.
- Не повышай риск только из-за наличия адресов, паспортов, телефонов, медицинских записей, семейных связей, поездок, покупок или личных сообщений.
- Если массив содержит чувствительные или избыточные персональные данные, это риск обработки данных и комплаенса, а не автоматический риск самого объекта.
- Для компаний оценивай финансовые, юридические, корпоративные, репутационные, санкционные и договорные признаки.
- Для кандидатов оценивай только деловую релевантность, непротиворечивость опыта, юридические/финансовые/репутационные маркеры.
- Пиши осторожно: "по предоставленному массиву", "выявлен признак", "требует проверки".
- Стиль отчета должен соответствовать HEIMDALL: управленческий вывод, risk index, таблица категорий, профиль объекта, риски, хронология, OSINT-контур, рекомендации.
- Пиши на русском языке.
- Верни только JSON, без markdown.

${schemaInstruction()}`
}

function buildSourceManifest(sources = []) {
  const list = normalizeList(sources, 20).map((source, index) => ({
    index: index + 1,
    file_name: shortText(source?.file_name || source?.name || '', 180),
    status: shortText(source?.status || '', 40),
    characters: Number(source?.characters || 0),
    mime_type: shortText(source?.mime_type || source?.type || '', 120),
    error: shortText(source?.error || '', 180)
  }))
  return list.length ? JSON.stringify(list, null, 2) : '[]'
}

function buildUserContent({ object, text, index, total, sources = [] }) {
  return `Объект проверки: ${JSON.stringify(object || {})}

Паспорт загруженных источников:
${buildSourceManifest(sources)}

Фрагмент ${index + 1} из ${total}. Разбери только этот фрагмент. Не включай подробные адреса, паспорта, медицину и частную жизнь в выводы, кроме нейтральной отметки о наличии чувствительных данных.

Если в тексте есть блоки "HEIMDALL SOURCE", используй их как паспорт источников. В sourceRefs указывай имя файла или короткий фрагмент, но не выдумывай источники. Если источник имеет status needs_ocr, отметь его в reviewChecklist, но не делай выводов из невидимого текста.

Сырой массив данных:
${text}`
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

async function analyzeChunk({ provider, object, text, index, total, sources }) {
  const content = await callModel(provider, [
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: buildUserContent({ object, text, index, total, sources }) }
  ], 4200)
  return normalizeAnalysis(tryJson(content), content)
}

async function finalMerge({ provider, object, partials, rawLength, sources }) {
  const content = await callModel(provider, [
    { role: 'system', content: systemPrompt() },
    { role: 'user', content: `Объект проверки: ${JSON.stringify(object || {})}

Паспорт загруженных источников:
${buildSourceManifest(sources)}

Ниже частичные разборы большого массива данных. Объедини их в один компактный результат. Убери дубли. Не добавляй факты, которых нет в частичных разборах. Не включай подробные чувствительные персональные данные. Если часть источников требует OCR, добавь это в reviewChecklist.

Объем исходного массива: ${rawLength} знаков.

Частичные разборы:
${JSON.stringify(partials).slice(0, 750000)}` }
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
    const sources = Array.isArray(req.body?.sources) ? req.body.sources : []
    if (!rawText.trim()) return res.status(400).json({ ok: false, error: 'Пустой массив данных' })

    const provider = getProvider()
    const model = provider === 'claude' ? DEFAULT_CLAUDE_MODEL : DEFAULT_DEEPSEEK_MODEL
    const chunks = chunkText(rawText)
    const partials = []

    for (let index = 0; index < chunks.length; index += 1) {
      partials.push(await analyzeChunk({ provider, object, text: chunks[index], index, total: chunks.length, sources }))
    }

    const analysis = chunks.length === 1 ? partials[0] : await finalMerge({ provider, object, partials, rawLength: rawText.length, sources })

    return res.status(200).json({
      ok: true,
      provider,
      model,
      chunks: chunks.length,
      analysis: { ...analysis, provider, model, rawLength: rawText.length, sourceCount: sources.length }
    })
  } catch (error) {
    const message = error?.name === 'AbortError'
      ? 'ИИ не успел ответить за лимит времени Vercel. Попробуй уменьшить массив или повторить запрос.'
      : error.message || 'AI analysis failed'
    return res.status(500).json({ ok: false, error: message })
  }
}
