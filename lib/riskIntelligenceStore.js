import { createClient } from '@supabase/supabase-js'

const TABLE_OBJECTS = 'risk_intelligence_objects'
const TABLE_SIGNALS = 'risk_intelligence_signals'
const TABLE_CONNECTIONS = 'risk_intelligence_connections'
const TABLE_REPORTS = 'risk_intelligence_reports'

const demoObjects = [
  {
    id: 'demo-1',
    title: 'Демо-объект: кандидат на чувствительную позицию',
    object_type: 'candidate',
    status: 'draft',
    risk_level: 'medium',
    summary: 'Демонстрационный объект. Supabase не настроен или таблицы еще не созданы.',
    source_request_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const demoSignals = [
  {
    id: 'demo-signal-1',
    object_id: 'demo-1',
    title: 'Пример сигнала риска',
    description: 'Проверьте публичные признаки, связи, судебные и исполнительные данные.',
    severity: 'medium',
    source: 'Демо-режим',
    created_at: new Date().toISOString()
  }
]

const demoConnections = []

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
}

function isMissingTableError(error) {
  if (!error) return false
  const message = `${error.message || ''} ${error.details || ''} ${error.hint || ''}`.toLowerCase()
  return error.code === '42P01' || message.includes('does not exist') || message.includes('schema cache') || message.includes('relation')
}

function demoResponse(extra = {}) {
  return { ok: true, mode: 'demo', ...extra }
}

function dbResponse(extra = {}) {
  return { ok: true, mode: 'supabase', ...extra }
}

function errorResponse(error, fallback = {}) {
  if (isMissingTableError(error)) return demoResponse(fallback)
  return { ok: false, mode: 'error', error: error?.message || 'Unknown error', ...fallback }
}

export function normalizeObject(payload = {}) {
  return {
    title: String(payload.title || payload.name || 'Новый объект проверки').trim(),
    object_type: String(payload.object_type || payload.type || 'candidate').trim(),
    status: String(payload.status || 'draft').trim(),
    risk_level: String(payload.risk_level || 'unknown').trim(),
    summary: String(payload.summary || payload.description || '').trim(),
    source_request_id: payload.source_request_id ? String(payload.source_request_id).trim().slice(0, 160) : null
  }
}

export async function listRiskObjects() {
  const supabase = getSupabase()
  if (!supabase) return demoResponse({ objects: demoObjects })

  const { data, error } = await supabase
    .from(TABLE_OBJECTS)
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) return errorResponse(error, { objects: demoObjects })
  return dbResponse({ objects: data || [] })
}

export async function createRiskObject(payload) {
  const supabase = getSupabase()
  const object = normalizeObject(payload)

  if (!supabase) {
    return demoResponse({ object: { id: `demo-${Date.now()}`, ...object, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } })
  }

  const { data, error } = await supabase
    .from(TABLE_OBJECTS)
    .insert(object)
    .select('*')
    .single()

  if (error && String(error.message || '').toLowerCase().includes('source_request_id')) {
    const legacyObject = { ...object }
    delete legacyObject.source_request_id
    const retry = await supabase.from(TABLE_OBJECTS).insert(legacyObject).select('*').single()
    if (!retry.error) return dbResponse({ object: retry.data, warning: 'SQL stage 3 is not applied: source_request_id was not saved.' })
  }

  if (error) return errorResponse(error, { object: { id: `demo-${Date.now()}`, ...object } })
  return dbResponse({ object: data })
}


export async function findRiskObjectBySourceRequest(sourceRequestId) {
  const cleanId = String(sourceRequestId || '').trim()
  if (!cleanId) return { ok: false, error: 'Missing source_request_id' }

  const supabase = getSupabase()
  if (!supabase) return demoResponse({ object: null })

  const { data, error } = await supabase
    .from(TABLE_OBJECTS)
    .select('*')
    .eq('source_request_id', cleanId)
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    const message = String(error.message || '').toLowerCase()
    if (message.includes('source_request_id') || message.includes('column')) {
      return demoResponse({ object: null, warning: 'SQL stage 3 is not applied: source_request_id column is missing.' })
    }
    return errorResponse(error, { object: null })
  }

  return dbResponse({ object: data || null })
}

export async function getRiskObject(id) {
  const supabase = getSupabase()
  if (!id) return { ok: false, error: 'Missing object id' }

  if (!supabase) {
    const object = demoObjects.find((item) => item.id === id) || { ...demoObjects[0], id }
    return demoResponse({ object, signals: demoSignals.filter((signal) => signal.object_id === object.id), connections: demoConnections })
  }

  const { data: object, error: objectError } = await supabase
    .from(TABLE_OBJECTS)
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (objectError) return errorResponse(objectError, { object: { ...demoObjects[0], id }, signals: demoSignals, connections: [] })
  if (!object) return { ok: false, mode: 'supabase', error: 'Object not found' }

  const [{ data: signals, error: signalsError }, { data: connections, error: connectionsError }, { data: reports, error: reportsError }] = await Promise.all([
    supabase.from(TABLE_SIGNALS).select('*').eq('object_id', id).order('created_at', { ascending: false }),
    supabase.from(TABLE_CONNECTIONS).select('*').eq('object_id', id).order('created_at', { ascending: false }),
    supabase.from(TABLE_REPORTS).select('*').eq('object_id', id).order('created_at', { ascending: false })
  ])

  if (signalsError && !isMissingTableError(signalsError)) return errorResponse(signalsError, { object, signals: [], connections: [], reports: [] })
  if (connectionsError && !isMissingTableError(connectionsError)) return errorResponse(connectionsError, { object, signals: signals || [], connections: [], reports: [] })
  if (reportsError && !isMissingTableError(reportsError)) return errorResponse(reportsError, { object, signals: signals || [], connections: connections || [], reports: [] })

  return dbResponse({ object, signals: signals || [], connections: connections || [], reports: reports || [] })
}

export async function updateRiskObject(id, payload) {
  const supabase = getSupabase()
  const patch = {}
  ;['title', 'object_type', 'status', 'risk_level', 'summary', 'source_request_id'].forEach((key) => {
    if (payload[key] !== undefined) patch[key] = String(payload[key] || '').trim()
  })
  patch.updated_at = new Date().toISOString()

  if (!supabase) return demoResponse({ object: { id, ...patch } })

  const { data, error } = await supabase
    .from(TABLE_OBJECTS)
    .update(patch)
    .eq('id', id)
    .select('*')
    .maybeSingle()

  if (error && String(error.message || '').toLowerCase().includes('source_request_id')) {
    const legacyPatch = { ...patch }
    delete legacyPatch.source_request_id
    const retry = await supabase.from(TABLE_OBJECTS).update(legacyPatch).eq('id', id).select('*').maybeSingle()
    if (!retry.error) return dbResponse({ object: retry.data, warning: 'SQL stage 3 is not applied: source_request_id was not saved.' })
  }

  if (error) return errorResponse(error, { object: { id, ...patch } })
  return dbResponse({ object: data })
}

export async function deleteRiskObject(id) {
  const supabase = getSupabase()
  if (!supabase) return demoResponse({ deleted: true })

  const { error } = await supabase.from(TABLE_OBJECTS).delete().eq('id', id)
  if (error) return errorResponse(error, { deleted: false })
  return dbResponse({ deleted: true })
}

export async function createRiskSignal(payload) {
  const supabase = getSupabase()
  const signal = {
    object_id: payload.object_id,
    title: String(payload.title || 'Новый сигнал риска').trim(),
    description: String(payload.description || '').trim(),
    severity: String(payload.severity || 'medium').trim(),
    source: String(payload.source || '').trim()
  }

  if (!supabase) return demoResponse({ signal: { id: `demo-signal-${Date.now()}`, ...signal, created_at: new Date().toISOString() } })

  const { data, error } = await supabase.from(TABLE_SIGNALS).insert(signal).select('*').single()
  if (error) return errorResponse(error, { signal: { id: `demo-signal-${Date.now()}`, ...signal } })
  return dbResponse({ signal: data })
}

export async function deleteRiskSignal(id) {
  const supabase = getSupabase()
  if (!supabase) return demoResponse({ deleted: true })

  const { error } = await supabase.from(TABLE_SIGNALS).delete().eq('id', id)
  if (error) return errorResponse(error, { deleted: false })
  return dbResponse({ deleted: true })
}

export async function createRiskConnection(payload) {
  const supabase = getSupabase()
  const connection = {
    object_id: payload.object_id,
    from_label: String(payload.from_label || payload.from || 'Объект').trim(),
    to_label: String(payload.to_label || payload.to || 'Связанный объект').trim(),
    relation_type: String(payload.relation_type || payload.type || 'связь').trim(),
    description: String(payload.description || '').trim()
  }

  if (!supabase) return demoResponse({ connection: { id: `demo-connection-${Date.now()}`, ...connection, created_at: new Date().toISOString() } })

  const { data, error } = await supabase.from(TABLE_CONNECTIONS).insert(connection).select('*').single()
  if (error) return errorResponse(error, { connection: { id: `demo-connection-${Date.now()}`, ...connection } })
  return dbResponse({ connection: data })
}

export async function deleteRiskConnection(id) {
  const supabase = getSupabase()
  if (!supabase) return demoResponse({ deleted: true })

  const { error } = await supabase.from(TABLE_CONNECTIONS).delete().eq('id', id)
  if (error) return errorResponse(error, { deleted: false })
  return dbResponse({ deleted: true })
}

function normalizeReportLanguage(language = 'ru') {
  const value = String(language || 'ru').toLowerCase()
  return value.startsWith('en') ? 'en' : 'ru'
}

export function buildReport({ object, signals = [], connections = [] }, language = 'ru') {
  const normalizedLanguage = normalizeReportLanguage(language)

  if (normalizedLanguage === 'en') {
    const signalLines = signals.length
      ? signals.map((signal, index) => `${index + 1}. ${signal.title || 'Signal'} - ${signal.severity || 'no severity'}${signal.description ? `\n   ${signal.description}` : ''}`).join('\n')
      : 'No risk signals have been added.'

    const connectionLines = connections.length
      ? connections.map((connection, index) => `${index + 1}. ${connection.from_label || 'Object'} -> ${connection.to_label || 'Connection'} (${connection.relation_type || 'connection type not set'})`).join('\n')
      : 'No connections have been added.'

    return `HEIMDALL Risk Intelligence\n\nObject: ${object?.title || 'Untitled'}\nType: ${object?.object_type || 'not set'}\nStatus: ${object?.status || 'not set'}\nRisk level: ${object?.risk_level || 'not set'}\n\nSummary:\n${object?.summary || 'No summary yet.'}\n\nRisk signals:\n${signalLines}\n\nConnections:\n${connectionLines}\n\nPreliminary conclusion:\nExpert interpretation of the signals, source verification and final analytical conclusion are required.`
  }

  const signalLines = signals.length
    ? signals.map((signal, index) => `${index + 1}. ${signal.title || 'Сигнал'} - ${signal.severity || 'без уровня'}${signal.description ? `\n   ${signal.description}` : ''}`).join('\n')
    : 'Сигналы риска не добавлены.'

  const connectionLines = connections.length
    ? connections.map((connection, index) => `${index + 1}. ${connection.from_label || 'Объект'} -> ${connection.to_label || 'Связь'} (${connection.relation_type || 'тип связи не указан'})`).join('\n')
    : 'Связи не добавлены.'

  return `HEIMDALL Risk Intelligence\n\nОбъект: ${object?.title || 'Без названия'}\nТип: ${object?.object_type || 'не указан'}\nСтатус: ${object?.status || 'не указан'}\nУровень риска: ${object?.risk_level || 'не указан'}\n\nКраткое описание:\n${object?.summary || 'Описание не заполнено.'}\n\nСигналы риска:\n${signalLines}\n\nСвязи:\n${connectionLines}\n\nПредварительный вывод:\nТребуется экспертная интерпретация сигналов, проверка источников и подготовка финального заключения.`
}

export async function generateRiskReport(objectId, language = 'ru') {
  const current = await getRiskObject(objectId)
  if (!current.ok) return current

  const normalizedLanguage = normalizeReportLanguage(language)
  const report_text = buildReport(current, normalizedLanguage)
  const report = {
    object_id: objectId,
    title: normalizedLanguage === 'en' ? `Draft report - ${current.object?.title || 'object'}` : `Шаблонный отчет - ${current.object?.title || 'объект'}`,
    report_text
  }

  const supabase = getSupabase()
  if (!supabase || current.mode === 'demo') {
    return demoResponse({ report: { id: `demo-report-${Date.now()}`, ...report, created_at: new Date().toISOString() } })
  }

  const { data, error } = await supabase.from(TABLE_REPORTS).insert(report).select('*').single()
  if (error) return errorResponse(error, { report })
  return dbResponse({ report: data })
}
