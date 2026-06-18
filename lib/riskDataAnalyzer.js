const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi
const URL_RE = /https?:\/\/[^\s)\]]+/gi
const DOMAIN_RE = /\b(?:[a-z0-9-]+\.)+(?:ru|com|net|org|io|ai|рф|su|kz|by|de|eu)\b/gi
const INN_RE = /\b\d{10}(?:\d{2})?\b/g
const OGRN_RE = /\b\d{13}(?:\d{2})?\b/g
const PHONE_RE = /(?:\+?7|8)?[\s(.-]*\d{3}[\s).-]*\d{3}[\s.-]*\d{2}[\s.-]*\d{2}/g
const COMPANY_RE = /\b(?:ООО|АО|ПАО|ИП|НКО|ЗАО|OAO|LLC|Ltd|Inc)\s+[«\"A-Za-zА-Яа-яЁё0-9 ._-]{2,80}[»\"]?/g
const PERSON_RE = /\b[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+)?\b/g

const RISK_MARKERS = [
  {
    category: 'legal',
    title: 'Юридические признаки риска',
    severity: 'high',
    words: ['суд', 'иск', 'арбитраж', 'исполнительное производство', 'фссп', 'уголов', 'административ', 'задержан', 'обвин', 'приговор']
  },
  {
    category: 'financial',
    title: 'Финансовые признаки риска',
    severity: 'high',
    words: ['банкрот', 'долг', 'задолженность', 'кредитор', 'неплатеж', 'убыток', 'кассовый разрыв', 'налоговая задолженность']
  },
  {
    category: 'reputation',
    title: 'Репутационные признаки риска',
    severity: 'medium',
    words: ['скандал', 'негатив', 'жалоба', 'обман', 'мошен', 'подозр', 'конфликт', 'отрицательный отзыв', 'разоблач']
  },
  {
    category: 'conflict_of_interest',
    title: 'Признаки конфликта интересов',
    severity: 'high',
    words: ['конфликт интересов', 'конкурент', 'аффилирован', 'связанное лицо', 'номинал', 'родственник', 'бенефициар']
  },
  {
    category: 'documents',
    title: 'Документальные несоответствия',
    severity: 'medium',
    words: ['не совпадает', 'расхождение', 'разные даты', 'поддельн', 'недостовер', 'ошибка в документ', 'не подтверждено']
  },
  {
    category: 'employment',
    title: 'Кадровые и биографические риски',
    severity: 'medium',
    words: ['уволен', 'конфликт с работодателем', 'частая смена', 'перерыв в стаже', 'не подтвердил опыт', 'рекомендации отрицательные']
  },
  {
    category: 'digital_trace',
    title: 'Признаки цифрового следа',
    severity: 'medium',
    words: ['telegram', 'соцсеть', 'форум', 'домен', 'почта', 'никнейм', 'утечка', 'даркнет']
  }
]

function uniqueMatches(text, regex, max = 80) {
  const set = new Set()
  if (!text) return []
  const matches = text.match(regex) || []
  for (const item of matches) {
    const cleaned = String(item).trim().replace(/[,.);:]+$/, '')
    if (cleaned) set.add(cleaned)
    if (set.size >= max) break
  }
  return Array.from(set)
}

function countLines(text) {
  if (!text) return 0
  return text.split(/\r?\n/).filter((line) => line.trim()).length
}

function findContextLines(text, words, max = 12) {
  const lines = String(text || '').split(/\r?\n/)
  const lowerWords = words.map((word) => word.toLowerCase())
  const found = []

  for (const line of lines) {
    const normalized = line.toLowerCase()
    if (lowerWords.some((word) => normalized.includes(word))) {
      found.push(line.trim().slice(0, 420))
      if (found.length >= max) break
    }
  }

  return found
}

function buildRiskSignals(text) {
  return RISK_MARKERS.map((marker) => {
    const evidence = findContextLines(text, marker.words, 8)
    if (!evidence.length) return null
    return {
      category: marker.category,
      title: marker.title,
      description: `В сыром массиве данных найдены маркеры: ${marker.words.filter((word) => text.toLowerCase().includes(word.toLowerCase())).slice(0, 8).join(', ')}. Требуется ручная проверка контекста и источников.`,
      severity: marker.severity,
      confidence: evidence.length >= 3 ? 'medium' : 'low',
      source: 'Автоматический разбор сырого массива',
      evidence
    }
  }).filter(Boolean)
}

function buildConnectionSuggestions(entities) {
  const suggestions = []
  for (const company of entities.companies.slice(0, 20)) {
    suggestions.push({ target_name: company, target_type: 'company', relation_type: 'mentioned_together', strength: 'medium', description: 'Компания выделена из сырого массива данных и требует подтверждения связи с объектом.' })
  }
  for (const email of entities.emails.slice(0, 12)) {
    suggestions.push({ target_name: email, target_type: 'email', relation_type: 'mentioned_together', strength: 'weak', description: 'Почта выделена из сырого массива данных.' })
  }
  for (const phone of entities.phones.slice(0, 12)) {
    suggestions.push({ target_name: phone, target_type: 'phone', relation_type: 'mentioned_together', strength: 'weak', description: 'Телефон выделен из сырого массива данных.' })
  }
  for (const domain of entities.domains.slice(0, 12)) {
    suggestions.push({ target_name: domain, target_type: 'domain', relation_type: 'mentioned_together', strength: 'weak', description: 'Домен выделен из сырого массива данных.' })
  }
  return suggestions.slice(0, 50)
}

function buildContradictions(text) {
  const markers = ['противореч', 'расхожд', 'не совпадает', 'не подтвержден', 'сомнитель', 'разные данные', 'разные даты', 'несоответств']
  return findContextLines(text, markers, 20)
}

function buildFacts(text) {
  const lines = String(text || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  return lines
    .filter((line) => line.length >= 28 && !line.startsWith('http'))
    .slice(0, 80)
    .map((line, index) => ({ title: `Факт ${index + 1}`, text: line.slice(0, 520) }))
}

function calculateAnalysisScore(signals, contradictions, entities) {
  let score = 0
  for (const signal of signals) {
    if (signal.severity === 'critical') score += 35
    if (signal.severity === 'high') score += 25
    if (signal.severity === 'medium') score += 14
    if (signal.severity === 'low') score += 7
  }
  score += Math.min(contradictions.length * 6, 24)
  score += entities.companies.length ? 6 : 0
  score += entities.phones.length + entities.emails.length >= 4 ? 6 : 0
  return Math.min(100, score)
}

function levelFromScore(score) {
  if (score >= 75) return 'critical'
  if (score >= 50) return 'high'
  if (score >= 25) return 'medium'
  return 'low'
}

export function splitForFutureAi(text, chunkSize = 12000) {
  const source = String(text || '')
  const chunks = []
  for (let i = 0; i < source.length; i += chunkSize) chunks.push(source.slice(i, i + chunkSize))
  return chunks
}

export function analyzeRawRiskData(rawData, riskObject = {}) {
  const text = String(rawData || '')
  const entities = {
    emails: uniqueMatches(text, EMAIL_RE),
    phones: uniqueMatches(text, PHONE_RE),
    inn: uniqueMatches(text, INN_RE),
    ogrn: uniqueMatches(text, OGRN_RE),
    urls: uniqueMatches(text, URL_RE),
    domains: uniqueMatches(text, DOMAIN_RE),
    companies: uniqueMatches(text, COMPANY_RE),
    persons: uniqueMatches(text, PERSON_RE, 60).filter((name) => name !== riskObject.name)
  }
  const suggestedSignals = buildRiskSignals(text)
  const contradictions = buildContradictions(text)
  const suggestedConnections = buildConnectionSuggestions(entities)
  const facts = buildFacts(text)
  const score = calculateAnalysisScore(suggestedSignals, contradictions, entities)
  const chunks = splitForFutureAi(text)

  return {
    created_at: new Date().toISOString(),
    sourceStats: {
      characters: text.length,
      lines: countLines(text),
      chunks: chunks.length,
      chunkSize: 12000
    },
    executiveSummary: text.trim()
      ? `Система разобрала сырой массив данных по объекту “${riskObject.name || 'объект проверки'}”. Выделены сущности, факты, возможные риски, связи и противоречия. Результат является предварительным и требует проверки аналитиком.`
      : 'Сырой массив данных пока не заполнен.',
    entities,
    facts,
    suggestedSignals,
    suggestedConnections,
    contradictions,
    questions: [
      'Какие источники подтверждают наиболее существенные признаки?',
      'Достаточно ли идентификаторов для уверенного отнесения найденных данных к объекту проверки?',
      'Какие факты являются подтвержденными, а какие остаются гипотезами?',
      'Есть ли признаки конфликта интересов или скрытых связей, требующие отдельной проверки?',
      'Какие сведения можно включать в клиентский отчет без юридических рисков?'
    ],
    recommendations: [
      'Отделить подтвержденные факты от предположений.',
      'Проверить источники по каждому существенному признаку риска.',
      'Подтвердить принадлежность телефонов, почт, компаний и доменов объекту проверки.',
      'Принять в карточку только те сигналы и связи, которые аналитик считает обоснованными.',
      'Формировать клиентский отчет только после ручной проверки ключевых выводов.'
    ],
    riskScore: score,
    riskLevel: levelFromScore(score),
    reportDraft: [
      `По объекту проверки “${riskObject.name || 'объект'}” выполнен предварительный разбор предоставленного массива данных.`,
      `Автоматически выделено: компаний - ${entities.companies.length}, персон - ${entities.persons.length}, телефонов - ${entities.phones.length}, почт - ${entities.emails.length}, доменов - ${entities.domains.length}.`,
      `Предварительно выявлено сигналов риска: ${suggestedSignals.length}. Противоречий или несоответствий: ${contradictions.length}.`,
      'Выводы требуют ручного подтверждения аналитиком HEIMDALL и не являются утверждением о виновности, нарушении закона или недобросовестности объекта проверки.'
    ].join('\n\n')
  }
}
