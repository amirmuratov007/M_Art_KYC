import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { riskObjects as mockRiskObjects, riskSignals as mockRiskSignals, riskConnections as mockRiskConnections, getRiskObjectById as getMockRiskObjectById } from '@/data/riskIntelligenceMockData'
import { buildFallbackRiskReport, calculateRiskScore, getRiskLevel } from '@/lib/riskScoring'

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function safeDate(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

function normalizeRiskObject(item, signals = []) {
  const riskScore = typeof item.risk_score === 'number' ? item.risk_score : calculateRiskScore(signals)
  const riskLevel = item.risk_level || getRiskLevel(riskScore)

  return {
    ...item,
    created_at: safeDate(item.created_at),
    updated_at: safeDate(item.updated_at),
    risk_score: riskScore,
    risk_level: riskLevel,
    red_flags_count: signals.filter((signal) => ['high', 'critical'].includes(signal.severity)).length
  }
}

function demoResponse(data, warning = null) {
  return { data, mode: 'demo', warning }
}

function liveResponse(data) {
  return { data, mode: 'live', warning: null }
}

async function getSupabaseOrNull() {
  if (!hasSupabaseConfig()) return null
  try {
    return getSupabaseAdmin()
  } catch (error) {
    return null
  }
}

export async function listRiskObjects() {
  const supabase = await getSupabaseOrNull()
  if (!supabase) return demoResponse(mockRiskObjects, 'Supabase не настроен. Показаны демонстрационные данные.')

  const { data: objects, error } = await supabase
    .from('risk_objects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return demoResponse(mockRiskObjects, `Supabase: ${error.message}`)
  if (!objects?.length) return liveResponse([])

  const objectIds = objects.map((item) => item.id)
  const { data: signals } = await supabase
    .from('risk_signals')
    .select('*')
    .in('object_id', objectIds)

  const normalized = objects.map((object) => normalizeRiskObject(object, (signals || []).filter((signal) => signal.object_id === object.id)))
  return liveResponse(normalized)
}

export async function getRiskObjectBundle(id) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) {
    const object = getMockRiskObjectById(id)
    const signals = mockRiskSignals.filter((signal) => signal.object_id === object.id)
    const connections = mockRiskConnections.filter((connection) => connection.object_id === object.id)
    return demoResponse({ object, signals, connections, report: null }, 'Supabase не настроен. Карточка работает в демонстрационном режиме.')
  }

  const { data: object, error } = await supabase
    .from('risk_objects')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !object) {
    const fallback = getMockRiskObjectById(id)
    return demoResponse({
      object: fallback,
      signals: mockRiskSignals.filter((signal) => signal.object_id === fallback.id),
      connections: mockRiskConnections.filter((connection) => connection.object_id === fallback.id),
      report: null
    }, error ? `Supabase: ${error.message}` : 'Объект не найден в Supabase. Показан демонстрационный объект.')
  }

  const [{ data: signals }, { data: connections }, { data: reports }] = await Promise.all([
    supabase.from('risk_signals').select('*').eq('object_id', object.id).order('created_at', { ascending: false }),
    supabase.from('risk_connections').select('*').eq('object_id', object.id).order('created_at', { ascending: false }),
    supabase.from('risk_reports').select('*').eq('object_id', object.id).order('created_at', { ascending: false }).limit(1)
  ])

  return liveResponse({
    object: normalizeRiskObject(object, signals || []),
    signals: signals || [],
    connections: connections || [],
    report: reports?.[0]?.content || null
  })
}

export async function createRiskObject(payload) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) {
    return demoResponse({
      id: `demo-${Date.now()}`,
      ...payload,
      status: 'new',
      risk_level: 'low',
      risk_score: 0,
      created_at: safeDate(new Date().toISOString())
    }, 'Supabase не настроен. Объект не записан в базу.')
  }

  const insertPayload = {
    object_type: payload.object_type || 'candidate',
    name: payload.name,
    description: payload.description || '',
    source_request_id: payload.source_request_id || null,
    status: 'new',
    risk_level: 'low',
    risk_score: 0
  }

  const { data, error } = await supabase
    .from('risk_objects')
    .insert(insertPayload)
    .select('*')
    .single()

  if (error) throw new Error(error.message)

  await logRiskActivity(data.id, 'object_created', { name: data.name, object_type: data.object_type })
  return liveResponse(normalizeRiskObject(data, []))
}

export async function updateRiskObjectStatus(id, status) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) return demoResponse({ id, status }, 'Supabase не настроен. Статус изменен только на странице.')

  const { data, error } = await supabase
    .from('risk_objects')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  await logRiskActivity(id, 'status_updated', { status })
  return liveResponse(data)
}

async function recalculateObjectRisk(objectId) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) return null

  const { data: signals, error } = await supabase
    .from('risk_signals')
    .select('*')
    .eq('object_id', objectId)

  if (error) throw new Error(error.message)

  const riskScore = calculateRiskScore(signals || [])
  const riskLevel = getRiskLevel(riskScore)

  const { error: updateError } = await supabase
    .from('risk_objects')
    .update({ risk_score: riskScore, risk_level: riskLevel, updated_at: new Date().toISOString() })
    .eq('id', objectId)

  if (updateError) throw new Error(updateError.message)

  return { risk_score: riskScore, risk_level: riskLevel }
}

export async function createRiskSignal(payload) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) return demoResponse({ id: `demo-signal-${Date.now()}`, ...payload }, 'Supabase не настроен. Сигнал не записан в базу.')

  const { data, error } = await supabase
    .from('risk_signals')
    .insert({
      object_id: payload.object_id,
      category: payload.category || 'other',
      title: payload.title,
      description: payload.description || '',
      severity: payload.severity || 'medium',
      confidence: payload.confidence || 'medium',
      source: payload.source || ''
    })
    .select('*')
    .single()

  if (error) throw new Error(error.message)

  const objectRisk = await recalculateObjectRisk(payload.object_id)
  await logRiskActivity(payload.object_id, 'signal_added', { title: data.title, severity: data.severity })
  return liveResponse({ signal: data, objectRisk })
}

export async function deleteRiskSignal(id, objectId) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) return demoResponse({ id }, 'Supabase не настроен. Сигнал удален только на странице.')

  const { error } = await supabase.from('risk_signals').delete().eq('id', id)
  if (error) throw new Error(error.message)

  const objectRisk = objectId ? await recalculateObjectRisk(objectId) : null
  if (objectId) await logRiskActivity(objectId, 'signal_deleted', { id })
  return liveResponse({ id, objectRisk })
}

export async function createRiskConnection(payload) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) return demoResponse({ id: `demo-connection-${Date.now()}`, ...payload }, 'Supabase не настроен. Связь не записана в базу.')

  const { data, error } = await supabase
    .from('risk_connections')
    .insert({
      object_id: payload.object_id,
      target_name: payload.target_name,
      target_type: payload.target_type || 'other',
      relation_type: payload.relation_type || 'other',
      strength: payload.strength || 'medium',
      description: payload.description || ''
    })
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  await logRiskActivity(payload.object_id, 'connection_added', { target_name: data.target_name, relation_type: data.relation_type })
  return liveResponse(data)
}

export async function deleteRiskConnection(id, objectId) {
  const supabase = await getSupabaseOrNull()
  if (!supabase) return demoResponse({ id }, 'Supabase не настроен. Связь удалена только на странице.')

  const { error } = await supabase.from('risk_connections').delete().eq('id', id)
  if (error) throw new Error(error.message)

  if (objectId) await logRiskActivity(objectId, 'connection_deleted', { id })
  return liveResponse({ id })
}

export async function generateAndSaveReport({ riskObject, signals, connections, notes }) {
  const report = buildFallbackRiskReport({ riskObject, signals, connections, notes })
  const supabase = await getSupabaseOrNull()
  if (!supabase) return demoResponse(report, 'Supabase не настроен. Отчет сформирован только на странице.')

  const { error } = await supabase
    .from('risk_reports')
    .insert({ object_id: riskObject.id, report_type: 'template_draft', content: report })

  if (error) throw new Error(error.message)
  await logRiskActivity(riskObject.id, 'report_generated', { report_type: 'template_draft', risk_score: report.riskScore })
  return liveResponse(report)
}

export async function logRiskActivity(objectId, action, details = {}) {
  const supabase = await getSupabaseOrNull()
  if (!supabase || !objectId) return null

  await supabase
    .from('risk_activity_log')
    .insert({ object_id: objectId, action, details })

  return true
}
