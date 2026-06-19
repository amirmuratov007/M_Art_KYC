import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'

const META_KEY = 'heimdall_risk_intelligence_objects_v4'
const DB_NAME = 'heimdall_risk_intelligence_v4'
const STORE_NAME = 'raw_payloads'

const objectTypes = [
  ['person', 'Физическое лицо'],
  ['candidate', 'Кандидат'],
  ['employee', 'Сотрудник'],
  ['contractor', 'Подрядчик'],
  ['company', 'Компания'],
  ['household_staff', 'Домашний персонал'],
  ['incident', 'Инцидент'],
  ['other', 'Другое']
]

const statuses = [
  ['new', 'Новая'],
  ['in_progress', 'В работе'],
  ['review', 'На проверке'],
  ['completed', 'Завершено'],
  ['archived', 'Архив']
]

const severityWeights = { low: 12, medium: 28, high: 52, critical: 80 }
const confidenceWeights = { low: 0.65, medium: 0.85, high: 1 }

function optionLabel(options, value) {
  return options.find(([key]) => key === value)?.[1] || value || 'Не указано'
}

function makeId() {
  return `rio-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function nowDate() {
  return new Date().toLocaleString('ru-RU')
}

function createEmptyObject(overrides = {}) {
  const id = overrides.id || makeId()
  return {
    id,
    name: overrides.name || 'Новая проверка',
    object_type: overrides.object_type || 'person',
    status: overrides.status || 'new',
    risk_level: overrides.risk_level || 'low',
    risk_score: overrides.risk_score || 0,
    description: overrides.description || 'Карточка проверки для анализа большого массива данных.',
    created_at: overrides.created_at || nowDate(),
    updated_at: overrides.updated_at || nowDate(),
    signals: overrides.signals || [],
    connections: overrides.connections || [],
    analysis: overrides.analysis || null,
    report: overrides.report || '',
    source: overrides.source || 'Рабочая карточка'
  }
}

function demoObjects() {
  return [
    createEmptyObject({
      id: 'demo-candidate',
      name: 'Демонстрационная проверка',
      object_type: 'candidate',
      status: 'in_progress',
      description: 'Тестовая карточка. Вставьте сырой массив данных и нажмите “Разобрать данные”.',
      source: 'Демонстрационный объект'
    })
  ]
}

function openDb() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('indexedDB' in window)) {
      resolve(null)
      return
    }
    const request = window.indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => resolve(null)
  })
}

async function readRaw(id) {
  const db = await openDb()
  if (!db) return ''
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const store = tx.objectStore(STORE_NAME)
    const request = store.get(id)
    request.onsuccess = () => resolve(request.result || '')
    request.onerror = () => resolve('')
  })
}

async function writeRaw(id, text) {
  const db = await openDb()
  if (!db) return false
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    const request = store.put(text || '', id)
    request.onsuccess = () => resolve(true)
    request.onerror = () => resolve(false)
  })
}

function loadObjects() {
  if (typeof window === 'undefined') return demoObjects()
  try {
    const parsed = JSON.parse(window.localStorage.getItem(META_KEY) || '[]')
    if (Array.isArray(parsed) && parsed.length) return parsed
  } catch (error) {}
  const seed = demoObjects()
  try { window.localStorage.setItem(META_KEY, JSON.stringify(seed)) } catch (error) {}
  return seed
}

function saveObjects(objects) {
  if (typeof window === 'undefined') return
  try { window.localStorage.setItem(META_KEY, JSON.stringify(objects)) } catch (error) {}
}

function unique(list) {
  return [...new Set((list || []).filter(Boolean).map((item) => String(item).trim()).filter(Boolean))]
}

function extractEntities(text) {
  const value = text || ''
  const emails = unique(value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [])
  const phones = unique(value.match(/(?:\+?\d[\d\s().-]{8,}\d)/g) || [])
  const inn = unique(value.match(/\b\d{10}\b|\b\d{12}\b/g) || [])
  const ogrn = unique(value.match(/\b\d{13}\b|\b\d{15}\b/g) || [])
  const urls = unique(value.match(/https?:\/\/[^\s)]+/gi) || [])
  const domains = unique(value.match(/\b[a-z0-9-]+\.(?:ru|com|org|net|io|ai|kz|ae|tr|de)\b/gi) || [])
  const companies = unique(value.match(/(?:ООО|АО|ПАО|ИП|ЗАО|НКО|LLC|LTD|JSC)\s+[«"A-Za-zА-Яа-я0-9 ._-]+/g) || [])
  const people = unique(value.match(/\b[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+(?:\s+[А-ЯЁ][а-яё]+)?\b/g) || []).slice(0, 80)

  return { emails, phones, inn, ogrn, urls, domains, companies, people }
}

function sentenceSplit(text) {
  return (text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 24)
}

function analyzeText(text, objectName) {
  const lower = (text || '').toLowerCase()
  const entities = extractEntities(text)
  const sentences = sentenceSplit(text)
  const facts = sentences.slice(0, 18).map((line, index) => ({
    id: `fact-${index + 1}`,
    title: `Факт ${index + 1}`,
    description: line
  }))

  const riskRules = [
    ['legal', 'Юридический риск', ['суд', 'иск', 'уголов', 'арбитраж', 'исполнительн', 'пристав', 'розыск', 'дело'], 'high'],
    ['financial', 'Финансовый риск', ['банкрот', 'долг', 'задолж', 'кредит', 'убыт', 'неплатеж', 'залож'], 'high'],
    ['reputation', 'Репутационный риск', ['негатив', 'скандал', 'жалоб', 'отзыв', 'конфликт', 'публикац'], 'medium'],
    ['documents', 'Документальные несоответствия', ['несоответ', 'расхожд', 'поддел', 'не подтвержд', 'не совпада'], 'high'],
    ['conflict_of_interest', 'Конфликт интересов', ['конкурент', 'аффилирован', 'связан', 'родствен', 'учредител', 'доля'], 'medium'],
    ['digital_trace', 'Цифровой след', ['почта', 'телефон', 'домен', 'аккаунт', 'соцсет', 'telegram'], 'low'],
    ['behavioral', 'Поведенческий риск', ['агресс', 'обман', 'скрывал', 'конфликтовал', 'уволен'], 'medium'],
    ['sanctions', 'Санкционный и комплаенс-риск', ['санкц', 'ofac', 'pep', 'экстрем', 'террор', 'комплаенс'], 'critical']
  ]

  const risks = riskRules
    .filter(([, , words]) => words.some((word) => lower.includes(word)))
    .map(([category, title, words, severity], index) => ({
      id: `signal-${Date.now()}-${index}`,
      category,
      title,
      description: `В сыром массиве данных обнаружены маркеры: ${words.filter((word) => lower.includes(word)).join(', ')}. Требуется ручная проверка и подтверждение источника.`,
      severity,
      confidence: 'medium',
      source: 'Автоматический разбор сырого массива'
    }))

  if (!risks.length && (text || '').trim()) {
    risks.push({
      id: `signal-${Date.now()}-baseline`,
      category: 'other',
      title: 'Требуется ручная квалификация данных',
      description: 'Массив данных загружен, но явные маркеры риска не выделены простым анализатором. Нужна ручная оценка аналитика.',
      severity: 'low',
      confidence: 'medium',
      source: 'Автоматический разбор сырого массива'
    })
  }

  const connections = []
  ;(entities.companies || []).slice(0, 40).forEach((name, index) => connections.push({ id: `conn-company-${index}`, target_name: name, target_type: 'company', relation_type: 'mentioned_together', strength: 'medium', description: 'Компания упоминается в массиве данных.' }))
  ;(entities.emails || []).slice(0, 30).forEach((name, index) => connections.push({ id: `conn-email-${index}`, target_name: name, target_type: 'email', relation_type: 'mentioned_together', strength: 'medium', description: 'Почта обнаружена в массиве данных.' }))
  ;(entities.phones || []).slice(0, 30).forEach((name, index) => connections.push({ id: `conn-phone-${index}`, target_name: name, target_type: 'phone', relation_type: 'mentioned_together', strength: 'medium', description: 'Телефон обнаружен в массиве данных.' }))
  ;(entities.domains || []).slice(0, 30).forEach((name, index) => connections.push({ id: `conn-domain-${index}`, target_name: name, target_type: 'domain', relation_type: 'mentioned_together', strength: 'weak', description: 'Домен обнаружен в массиве данных.' }))
  ;(entities.people || []).filter((name) => name !== objectName).slice(0, 30).forEach((name, index) => connections.push({ id: `conn-person-${index}`, target_name: name, target_type: 'person', relation_type: 'mentioned_together', strength: 'weak', description: 'ФИО упоминается рядом с объектом или в том же массиве.' }))

  const contradictions = sentences.filter((line) => /не совпада|расхожд|противореч|однако|но при этом|не подтвержд/i.test(line)).slice(0, 12)
  const questions = [
    'Подтвердить идентичность найденных совпадений.',
    'Отделить подтвержденные факты от предположений и комментариев.',
    'Проверить источники наиболее значимых сигналов риска.',
    'Уточнить у клиента основание и цель проверки.',
    'Проверить, не относятся ли совпадения к однофамильцам или одноименным компаниям.'
  ]

  const score = calculateScore(risks)
  const level = score >= 75 ? 'critical' : score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low'
  const summary = (text || '').trim()
    ? `По объекту “${objectName || 'без названия'}” загружен массив данных объемом ${(text || '').length.toLocaleString('ru-RU')} знаков. Система выделила ${facts.length} фактов, ${risks.length} возможных сигналов риска и ${connections.length} связей. Все выводы требуют проверки аналитиком.`
    : 'Сырой массив данных пока не загружен.'

  const report = buildReport({ objectName, score, level, risks, connections, contradictions, questions, summary })

  return { entities, facts, risks, connections, contradictions, questions, recommendations: ['Принять только подтвержденные сигналы.', 'Сохранить источники по каждому существенному выводу.', 'Не использовать обвинительные формулировки в клиентском отчете.', 'Перед финальным выводом проверить совпадения по дополнительным идентификаторам.'], score, level, summary, report, created_at: nowDate() }
}

function calculateScore(signals = []) {
  const total = signals.reduce((sum, signal) => sum + ((severityWeights[signal.severity] || 20) * (confidenceWeights[signal.confidence] || 0.85)), 0)
  return Math.max(0, Math.min(100, Math.round(total)))
}

function riskLabel(level) {
  return level === 'critical' ? 'Критический' : level === 'high' ? 'Высокий' : level === 'medium' ? 'Средний' : 'Низкий'
}

function buildReport({ objectName, score, level, risks, connections, contradictions, questions, summary }) {
  return [
    'Предварительный риск-отчет HEIMDALL',
    '',
    `Объект проверки: ${objectName || 'Не указан'}`,
    `Дата формирования: ${nowDate()}`,
    `Уровень риска: ${riskLabel(level)} (${score}/100)`,
    '',
    'Краткое резюме:',
    summary,
    '',
    'Ключевые признаки риска:',
    ...(risks.length ? risks.map((risk, index) => `${index + 1}. ${risk.title}. ${risk.description}`) : ['Существенные признаки риска пока не выделены.']),
    '',
    'Карта связей:',
    ...(connections.length ? connections.slice(0, 20).map((connection, index) => `${index + 1}. ${connection.target_name} - ${connection.description}`) : ['Связи пока не выделены.']),
    '',
    'Противоречия и зоны неопределенности:',
    ...(contradictions.length ? contradictions.map((item, index) => `${index + 1}. ${item}`) : ['Явные противоречия простым анализатором не выявлены.']),
    '',
    'Что требуется уточнить:',
    ...questions.map((item, index) => `${index + 1}. ${item}`),
    '',
    'Юридическая оговорка:',
    'Настоящий отчет является аналитическим документом и не содержит утверждений о виновности, нарушении закона или недобросовестности лица либо организации. Выводы основаны на предоставленных данных, открытых признаках и аналитической оценке. Для принятия юридически значимых решений рекомендуется дополнительная проверка и консультация профильного специалиста.'
  ].join('\n')
}

function Badge({ children, tone = 'default' }) {
  const cls = tone === 'red' ? 'border-red-300/25 bg-red-300/10 text-red-100' : tone === 'gold' ? 'border-[#D6A84F]/30 bg-[#D6A84F]/10 text-[#F7D784]' : tone === 'sky' ? 'border-sky-300/25 bg-sky-300/10 text-sky-100' : 'border-white/10 bg-white/5 text-white/70'
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{children}</span>
}

function Field({ label, children }) {
  return <label className="grid gap-2 text-sm text-white/55">{label}{children}</label>
}

function Select({ value, onChange, options }) {
  return <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-3 text-white outline-none focus:border-sky-300/40">{options.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
}

export default function RiskIntelligenceWorkspace({ initialObjectId = null }) {
  const [ready, setReady] = useState(false)
  const [objects, setObjects] = useState([])
  const [activeId, setActiveId] = useState(initialObjectId || null)
  const [rawText, setRawText] = useState('')
  const [message, setMessage] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiStatus, setAiStatus] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')

  useEffect(() => {
    const loaded = loadObjects()
    setObjects(loaded)

    let id = initialObjectId
    if (!id && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      id = params.get('open') || params.get('id')
      const match = window.location.pathname.match(/\/analyst\/risk-intelligence\/([^/?#]+)/)
      if (!id && match && match[1] && !['new', 'object'].includes(match[1])) id = decodeURIComponent(match[1])
    }

    if (id) {
      const exists = loaded.some((item) => item.id === id)
      const nextObjects = exists ? loaded : [createEmptyObject({ id, name: `Проверка ${id}`, description: 'Карточка восстановлена по прямой ссылке. Данные можно вставить и разобрать заново.' }), ...loaded]
      if (!exists) saveObjects(nextObjects)
      setObjects(nextObjects)
      setActiveId(id)
      readRaw(id).then(setRawText)
    }
    setReady(true)
  }, [initialObjectId])

  useEffect(() => { saveObjects(objects) }, [objects])

  const active = objects.find((item) => item.id === activeId) || null
  const filtered = useMemo(() => objects.filter((item) => {
    const text = `${item.name} ${item.description} ${item.id}`.toLowerCase()
    const okQuery = !query.trim() || text.includes(query.trim().toLowerCase())
    const okStatus = statusFilter === 'all' || item.status === statusFilter
    const okRisk = riskFilter === 'all' || item.risk_level === riskFilter
    return okQuery && okStatus && okRisk
  }), [objects, query, statusFilter, riskFilter])

  const stats = useMemo(() => ({
    total: objects.length,
    high: objects.filter((item) => ['high', 'critical'].includes(item.risk_level)).length,
    work: objects.filter((item) => ['new', 'in_progress', 'review'].includes(item.status)).length,
    completed: objects.filter((item) => item.status === 'completed').length
  }), [objects])

  const updateActive = (patch) => {
    if (!activeId) return
    setObjects((current) => current.map((item) => item.id === activeId ? { ...item, ...patch, updated_at: nowDate() } : item))
  }

  const openObject = async (id) => {
    setActiveId(id)
    setRawText(await readRaw(id))
    if (typeof window !== 'undefined') {
      const url = `/analyst/risk-intelligence?open=${encodeURIComponent(id)}`
      window.history.replaceState(null, '', url)
    }
  }

  const createObject = async () => {
    const item = createEmptyObject({ name: `Проверка ${objects.length + 1}` })
    setObjects((current) => [item, ...current])
    await writeRaw(item.id, '')
    await openObject(item.id)
    setMessage('Создана новая карточка проверки.')
  }

  const removeObject = (id) => {
    if (!confirm('Удалить карточку проверки из браузера?')) return
    setObjects((current) => current.filter((item) => item.id !== id))
    if (activeId === id) {
      setActiveId(null)
      setRawText('')
      if (typeof window !== 'undefined') window.history.replaceState(null, '', '/analyst/risk-intelligence')
    }
  }

  const saveRaw = async () => {
    if (!active) return
    await writeRaw(active.id, rawText)
    updateActive({ description: active.description || 'Сырой массив данных сохранен.' })
    setMessage('Массив данных сохранен в браузере.')
  }

  const runAnalysis = async () => {
    if (!active) return
    await writeRaw(active.id, rawText)
    const result = analyzeText(rawText, active.name)
    updateActive({ analysis: result, report: result.report, risk_score: result.score, risk_level: result.level, signals: result.risks, connections: result.connections, status: 'review' })
    setMessage('Данные разобраны. Проверьте сигналы, связи и отчет.')
  }


  const normalizeAiResult = (result) => {
    const safe = result || {}
    const risks = Array.isArray(safe.riskSignals) ? safe.riskSignals : Array.isArray(safe.risks) ? safe.risks : []
    const connections = Array.isArray(safe.connections) ? safe.connections : []
    const facts = Array.isArray(safe.facts) ? safe.facts : []
    const contradictions = Array.isArray(safe.contradictions) ? safe.contradictions : []
    const questions = Array.isArray(safe.questions) ? safe.questions : []
    const recommendations = Array.isArray(safe.recommendations) ? safe.recommendations : []
    const score = Math.max(0, Math.min(100, Number(safe?.riskAssessment?.score ?? safe.score ?? calculateScore(risks))))
    const level = safe?.riskAssessment?.level || safe.level || (score >= 75 ? 'critical' : score >= 50 ? 'high' : score >= 25 ? 'medium' : 'low')
    const summary = safe.summary || safe.executiveSummary || `ИИ разобрал массив данных по объекту “${active?.name || 'без названия'}”. Проверьте выводы аналитиком.`
    const report = safe.clientReportDraft || safe.report || buildReport({ objectName: active?.name, score, level, risks, connections, contradictions, questions, summary })

    return {
      entities: safe.entities || {},
      facts: facts.map((item, index) => typeof item === 'string' ? { id: `ai-fact-${index}`, title: `Факт ${index + 1}`, description: item } : { id: item.id || `ai-fact-${index}`, title: item.title || `Факт ${index + 1}`, description: item.description || item.text || JSON.stringify(item) }),
      risks: risks.map((item, index) => ({
        id: item.id || `ai-signal-${Date.now()}-${index}`,
        category: item.category || 'other',
        title: item.title || `Сигнал риска ${index + 1}`,
        description: item.description || item.reason || item.evidence || '',
        severity: ['low', 'medium', 'high', 'critical'].includes(item.severity) ? item.severity : 'medium',
        confidence: ['low', 'medium', 'high'].includes(item.confidence) ? item.confidence : 'medium',
        source: item.source || 'ИИ-разбор сырого массива'
      })),
      connections: connections.map((item, index) => ({
        id: item.id || `ai-conn-${Date.now()}-${index}`,
        target_name: item.target_name || item.targetName || item.name || `Связь ${index + 1}`,
        target_type: item.target_type || item.targetType || 'other',
        relation_type: item.relation_type || item.relationType || 'mentioned_together',
        strength: ['weak', 'medium', 'strong'].includes(item.strength) ? item.strength : 'medium',
        description: item.description || item.reason || ''
      })),
      contradictions: contradictions.map((item) => typeof item === 'string' ? item : item.description || item.text || JSON.stringify(item)),
      questions: questions.map((item) => typeof item === 'string' ? item : item.question || item.description || JSON.stringify(item)),
      recommendations: recommendations.map((item) => typeof item === 'string' ? item : item.recommendation || item.description || JSON.stringify(item)),
      score,
      level,
      summary,
      report,
      created_at: nowDate(),
      provider: safe.provider || 'ai'
    }
  }

  const runAiAnalysis = async () => {
    if (!active || aiLoading) return

    if (!rawText.trim()) {
      setMessage('Сначала вставьте сырой массив данных.')
      setAiStatus('ИИ не запущен: поле с данными пустое.')
      return
    }

    await writeRaw(active.id, rawText)
    setAiLoading(true)
    setMessage('ИИ-анализ запущен.')
    setAiStatus(`1/4 Данные сохранены. Отправляю в ИИ ${rawText.length.toLocaleString('ru-RU')} знаков...`)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 120000)

    try {
      setAiStatus('2/4 Запрос ушел на сервер HEIMDALL. Жду ответ OpenAI...')
      const response = await fetch('/api/risk-intelligence/analyze-raw-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ object: active, rawText }),
        signal: controller.signal
      })

      setAiStatus(`3/4 Сервер ответил: HTTP ${response.status}. Разбираю результат...`)
      const responseText = await response.text()
      let payload = {}
      try {
        payload = responseText ? JSON.parse(responseText) : {}
      } catch (parseError) {
        throw new Error(`Сервер вернул не JSON: ${responseText.slice(0, 500)}`)
      }

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error || `ИИ-анализ не выполнен. HTTP ${response.status}`)
      }

      const result = normalizeAiResult(payload.analysis)
      updateActive({
        analysis: result,
        report: result.report,
        risk_score: result.score,
        risk_level: result.level,
        signals: result.risks,
        connections: result.connections,
        status: 'review'
      })
      setMessage('ИИ-разбор выполнен. Проверьте факты, риски, связи и отчет.')
      setAiStatus(`4/4 Готово. Модель: ${payload.model || 'OpenAI'}. Частей: ${payload.chunks || 1}. Результат записан в отчет.`)
    } catch (error) {
      const text = error?.name === 'AbortError'
        ? 'Превышено время ожидания. Vercel или OpenAI не успели ответить. Попробуйте сократить массив или повторить запрос.'
        : (error?.message || 'Неизвестная ошибка ИИ-анализа')
      setMessage(`ИИ-разбор не выполнен: ${text}`)
      setAiStatus(`Ошибка ИИ: ${text}. Локальный разбор не запускал автоматически, чтобы не перетереть данные плохим результатом.`)
    } finally {
      clearTimeout(timeout)
      setAiLoading(false)
    }
  }

  const copyReport = async () => {
    if (!active?.report) return
    try {
      await navigator.clipboard.writeText(active.report)
      setMessage('Отчет скопирован.')
    } catch (error) {
      setMessage('Не удалось скопировать. Выделите текст вручную.')
    }
  }

  const exportJson = () => {
    const payload = JSON.stringify(objects, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `heimdall-checks-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!ready) {
    return <Shell><div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-8">Загрузка рабочего центра...</div></Shell>
  }

  return (
    <Shell>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">HEIMDALL Intelligence Core</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Центр риск-аналитики</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/60">Рабочий раздел восстановлен в автономном режиме. Объекты открываются внутри этой страницы, данные хранятся в браузере, Supabase не используется.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={createObject} className="rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white">Создать проверку</button>
          <button onClick={exportJson} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80">Скачать JSON</button>
        </div>
      </div>

      {message && <div className="mb-6 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-4 text-sm text-[#F7D784]">{message}</div>}

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Stat label="Всего" value={stats.total} />
        <Stat label="Высокий риск" value={stats.high} />
        <Stat label="В работе" value={stats.work} />
        <Stat label="Завершено" value={stats.completed} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <aside className="rounded-[32px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl xl:sticky xl:top-6 xl:h-fit">
          <div className="mb-4 grid gap-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по объектам" className="rounded-2xl border border-white/10 bg-black/25 p-3 text-white outline-none focus:border-sky-300/40" />
            <div className="grid grid-cols-2 gap-3">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-3 text-white"><option value="all">Все статусы</option>{statuses.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
              <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-3 text-white"><option value="all">Все риски</option><option value="low">Низкий</option><option value="medium">Средний</option><option value="high">Высокий</option><option value="critical">Критический</option></select>
            </div>
          </div>
          <div className="grid gap-3">
            {filtered.map((item) => <ObjectButton key={item.id} item={item} active={item.id === activeId} onOpen={() => openObject(item.id)} onRemove={() => removeObject(item.id)} />)}
          </div>
        </aside>

        <section>
          {active ? (
            <div className="grid gap-6">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2"><Badge tone="sky">{optionLabel(statuses, active.status)}</Badge><Badge tone={active.risk_level === 'high' || active.risk_level === 'critical' ? 'red' : 'gold'}>{riskLabel(active.risk_level)} · {active.risk_score}/100</Badge></div>
                  <button onClick={() => { setActiveId(null); if (typeof window !== 'undefined') window.history.replaceState(null, '', '/analyst/risk-intelligence') }} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">К списку</button>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field label="Название объекта"><input value={active.name} onChange={(e) => updateActive({ name: e.target.value })} className="rounded-2xl border border-white/10 bg-black/25 p-3 text-white outline-none focus:border-sky-300/40" /></Field>
                  <Field label="Тип объекта"><Select value={active.object_type} onChange={(value) => updateActive({ object_type: value })} options={objectTypes} /></Field>
                  <Field label="Статус"><Select value={active.status} onChange={(value) => updateActive({ status: value })} options={statuses} /></Field>
                  <Field label="Источник"><input value={active.source || ''} onChange={(e) => updateActive({ source: e.target.value })} className="rounded-2xl border border-white/10 bg-black/25 p-3 text-white outline-none focus:border-sky-300/40" /></Field>
                  <div className="md:col-span-2"><Field label="Описание"><textarea value={active.description || ''} onChange={(e) => updateActive({ description: e.target.value })} className="min-h-[90px] rounded-2xl border border-white/10 bg-black/25 p-3 text-white outline-none focus:border-sky-300/40" /></Field></div>
                </div>
              </div>

              <div className="rounded-[32px] border border-sky-300/15 bg-sky-300/[0.045] p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div><div className="text-sm uppercase tracking-[0.22em] text-sky-300/80">Сырой массив данных</div><p className="mt-2 text-sm text-white/55">Вставляйте любые объемы текста. Искусственного ограничения поля нет. Для очень больших массивов браузеру может потребоваться больше времени.</p></div>
                  <div className="flex flex-wrap gap-3"><button onClick={saveRaw} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Сохранить массив</button><button onClick={runAiAnalysis} disabled={aiLoading} className="rounded-full bg-[#D6A84F] px-5 py-2 text-sm font-semibold text-[#050816] disabled:cursor-not-allowed disabled:opacity-50">{aiLoading ? 'ИИ анализирует...' : 'Разобрать через Claude / DeepSeek'}</button><button onClick={runAnalysis} disabled={aiLoading} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 disabled:opacity-50">Локальный разбор</button></div>
                </div>
                <textarea value={rawText} onChange={(e) => setRawText(e.target.value)} placeholder="Вставьте сюда весь поток данных из источников: ФИО, телефоны, почты, компании, выписки, заметки, ссылки, комментарии клиента, найденные материалы..." className="mt-5 min-h-[360px] w-full rounded-[24px] border border-white/10 bg-black/30 p-5 text-sm leading-7 text-white outline-none focus:border-sky-300/40" />
                {aiStatus && (
                  <div className="mt-4 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-4 text-sm leading-7 text-[#F7D784]">
                    <div className="mb-1 font-semibold text-[#FFE6A3]">Статус ИИ</div>
                    <div>{aiStatus}</div>
                  </div>
                )}
              </div>

              {active.analysis && <AnalysisBlock analysis={active.analysis} />}

              <div className="rounded-[32px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Отчет</div><div className="flex gap-3"><button onClick={copyReport} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Скопировать</button><button onClick={() => window.print()} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Печать / PDF</button></div></div>
                <pre className="max-h-[620px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/72">{active.report || 'Отчет появится после разбора данных.'}</pre>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-8 text-white/65">Выберите объект слева или создайте новую проверку.</div>
          )}
        </section>
      </div>
    </Shell>
  )
}

function Shell({ children }) {
  return (
    <>
      <Head><title>Центр риск-аналитики | HEIMDALL</title><meta name="robots" content="noindex,nofollow" /></Head>
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <header className="relative z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5"><HeimdallLogo /><div className="flex flex-wrap gap-3"><Link href="/analyst" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Панель аналитика</Link><Link href="/risk-intelligence" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Публичная страница</Link></div></div></header>
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-8">{children}</div>
      </main>
    </>
  )
}

function Stat({ label, value }) {
  return <div className="rounded-[26px] border border-white/10 bg-white/[0.045] p-5"><div className="text-sm text-white/45">{label}</div><div className="mt-2 text-3xl font-semibold text-[#F7D784]">{value}</div></div>
}

function ObjectButton({ item, active, onOpen, onRemove }) {
  return <div className={`rounded-[24px] border p-4 ${active ? 'border-sky-300/40 bg-sky-300/10' : 'border-white/10 bg-black/20'}`}><button type="button" onClick={onOpen} className="block w-full text-left"><div className="flex flex-wrap gap-2"><Badge tone="sky">{optionLabel(statuses, item.status)}</Badge><Badge>{item.risk_score}/100</Badge></div><div className="mt-3 text-xs text-white/35">{item.id}</div><div className="mt-1 text-lg font-semibold">{item.name}</div><div className="mt-1 text-sm text-white/50">{optionLabel(objectTypes, item.object_type)}</div></button><button type="button" onClick={onRemove} className="mt-3 text-xs text-red-200/70 hover:text-red-100">Удалить</button></div>
}

function AnalysisBlock({ analysis }) {
  const sections = [
    ['Краткое резюме', [analysis.summary]],
    ['Выделенные факты', (analysis.facts || []).map((item) => item.description)],
    ['Возможные риски', (analysis.risks || []).map((item) => `${item.title}: ${item.description}`)],
    ['Связи', (analysis.connections || []).map((item) => `${item.target_name}: ${item.description}`)],
    ['Противоречия', analysis.contradictions || []],
    ['Вопросы для уточнения', analysis.questions || []],
    ['Рекомендации', analysis.recommendations || []]
  ]
  return <div className="grid gap-4 md:grid-cols-2">{sections.map(([title, items]) => <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5"><div className="mb-3 text-sm uppercase tracking-[0.2em] text-sky-300/80">{title}</div><div className="grid gap-2 text-sm leading-7 text-white/62">{items && items.length ? items.slice(0, 30).map((item, index) => <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-3">{item}</div>) : <div className="text-white/35">Нет данных</div>}</div></div>)}</div>
}
