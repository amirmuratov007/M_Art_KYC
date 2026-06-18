import {
  riskObjects as demoObjects,
  riskSignals as demoSignals,
  riskConnections as demoConnections
} from '@/data/riskIntelligenceMockData'
import { buildFallbackRiskReport, calculateRiskScore, getRiskLevel } from '@/lib/riskScoring'

const STORAGE_KEY = 'heimdall_risk_intelligence_local_v1'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function uid(prefix = 'rio') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function normalizeObject(object, signals = []) {
  const score = calculateRiskScore(signals)
  return {
    ...object,
    risk_score: score,
    risk_level: getRiskLevel(score),
    red_flags_count: signals.filter((signal) => ['high', 'critical'].includes(signal.severity)).length,
    updated_at: object.updated_at || object.created_at || today()
  }
}

function initialState() {
  return {
    objects: demoObjects.map((item) => ({ ...item, storage_type: 'demo' })),
    signals: demoSignals,
    connections: demoConnections,
    reports: {},
    activity: [],
    largePayloads: {}
  }
}

export function readRiskStore() {
  if (!canUseStorage()) return initialState()

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = initialState()
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
      return seeded
    }

    const parsed = JSON.parse(raw)
    return {
      objects: Array.isArray(parsed.objects) ? parsed.objects : [],
      signals: Array.isArray(parsed.signals) ? parsed.signals : [],
      connections: Array.isArray(parsed.connections) ? parsed.connections : [],
      reports: parsed.reports && typeof parsed.reports === 'object' ? parsed.reports : {},
      activity: Array.isArray(parsed.activity) ? parsed.activity : [],
      largePayloads: parsed.largePayloads && typeof parsed.largePayloads === 'object' ? parsed.largePayloads : {}
    }
  } catch (error) {
    return initialState()
  }
}

export function writeRiskStore(nextState) {
  if (!canUseStorage()) return nextState
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState))
  window.dispatchEvent(new CustomEvent('heimdall-risk-store-updated'))
  return nextState
}

export function resetRiskStore() {
  const seeded = initialState()
  return writeRiskStore(seeded)
}

export function listLocalRiskObjects() {
  const state = readRiskStore()
  return state.objects
    .map((object) => normalizeObject(object, state.signals.filter((signal) => signal.object_id === object.id)))
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
}

export function getLocalRiskBundle(id) {
  const state = readRiskStore()
  const object = state.objects.find((item) => item.id === id) || state.objects[0]
  const signals = state.signals.filter((signal) => signal.object_id === object?.id)
  const connections = state.connections.filter((connection) => connection.object_id === object?.id)

  return {
    object: object ? normalizeObject(object, signals) : null,
    signals,
    connections,
    report: object ? state.reports[object.id] || null : null,
    activity: object ? state.activity.filter((item) => item.object_id === object.id) : []
  }
}

export function createLocalRiskObject(payload) {
  const state = readRiskStore()
  const object = normalizeObject({
    id: uid('rio'),
    object_type: payload.object_type || 'candidate',
    name: payload.name || 'Новый объект проверки',
    description: payload.description || '',
    status: 'new',
    source_request_id: payload.source_request_id || '',
    source_type: payload.source_type || 'manual',
    storage_type: 'local',
    created_at: today(),
    updated_at: today()
  }, [])

  state.objects = [object, ...state.objects]
  state.activity = [{ id: uid('act'), object_id: object.id, action: 'object_created', created_at: today(), details: { name: object.name } }, ...state.activity]
  writeRiskStore(state)
  return object
}

export function updateLocalRiskObjectStatus(id, status) {
  const state = readRiskStore()
  state.objects = state.objects.map((object) => object.id === id ? { ...object, status, updated_at: today() } : object)
  state.activity = [{ id: uid('act'), object_id: id, action: 'status_updated', created_at: today(), details: { status } }, ...state.activity]
  writeRiskStore(state)
  return getLocalRiskBundle(id).object
}

export function addLocalRiskSignal(objectId, payload) {
  const state = readRiskStore()
  const signal = {
    id: uid('sig'),
    object_id: objectId,
    category: payload.category || 'other',
    title: payload.title || 'Сигнал риска',
    description: payload.description || '',
    severity: payload.severity || 'medium',
    confidence: payload.confidence || 'medium',
    source: payload.source || '',
    created_at: today()
  }

  state.signals = [signal, ...state.signals]
  state.objects = state.objects.map((object) => object.id === objectId ? { ...object, updated_at: today() } : object)
  state.activity = [{ id: uid('act'), object_id: objectId, action: 'signal_added', created_at: today(), details: { title: signal.title } }, ...state.activity]
  writeRiskStore(state)
  return signal
}

export function deleteLocalRiskSignal(objectId, signalId) {
  const state = readRiskStore()
  state.signals = state.signals.filter((signal) => signal.id !== signalId)
  state.objects = state.objects.map((object) => object.id === objectId ? { ...object, updated_at: today() } : object)
  state.activity = [{ id: uid('act'), object_id: objectId, action: 'signal_deleted', created_at: today(), details: { signalId } }, ...state.activity]
  writeRiskStore(state)
}

export function addLocalRiskConnection(objectId, payload) {
  const state = readRiskStore()
  const connection = {
    id: uid('con'),
    object_id: objectId,
    target_name: payload.target_name || 'Связанный объект',
    target_type: payload.target_type || 'other',
    relation_type: payload.relation_type || 'other',
    strength: payload.strength || 'medium',
    description: payload.description || '',
    created_at: today()
  }

  state.connections = [connection, ...state.connections]
  state.objects = state.objects.map((object) => object.id === objectId ? { ...object, updated_at: today() } : object)
  state.activity = [{ id: uid('act'), object_id: objectId, action: 'connection_added', created_at: today(), details: { target_name: connection.target_name } }, ...state.activity]
  writeRiskStore(state)
  return connection
}

export function deleteLocalRiskConnection(objectId, connectionId) {
  const state = readRiskStore()
  state.connections = state.connections.filter((connection) => connection.id !== connectionId)
  state.objects = state.objects.map((object) => object.id === objectId ? { ...object, updated_at: today() } : object)
  state.activity = [{ id: uid('act'), object_id: objectId, action: 'connection_deleted', created_at: today(), details: { connectionId } }, ...state.activity]
  writeRiskStore(state)
}

export function generateLocalRiskReport({ riskObject, signals, connections, notes }) {
  const state = readRiskStore()
  const report = buildFallbackRiskReport({ riskObject, signals, connections, notes })
  state.reports = { ...state.reports, [riskObject.id]: report }
  state.activity = [{ id: uid('act'), object_id: riskObject.id, action: 'report_generated', created_at: today(), details: { risk_score: report.riskScore } }, ...state.activity]
  writeRiskStore(state)
  return report
}

export function getStorageModeLabel() {
  return 'Автономный режим - данные хранятся в браузере аналитика. Supabase отключена для этого раздела.'
}

const LARGE_DB_NAME = 'heimdall_risk_intelligence_large_v1'
const LARGE_STORE_NAME = 'risk_large_payloads'

function canUseIndexedDb() {
  return typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined'
}

function openLargeDb() {
  if (!canUseIndexedDb()) return Promise.resolve(null)

  return new Promise((resolve) => {
    const request = window.indexedDB.open(LARGE_DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(LARGE_STORE_NAME)) db.createObjectStore(LARGE_STORE_NAME, { keyPath: 'key' })
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => resolve(null)
  })
}

async function largeDbGet(key) {
  const db = await openLargeDb()
  if (!db) return null

  return new Promise((resolve) => {
    const tx = db.transaction(LARGE_STORE_NAME, 'readonly')
    const store = tx.objectStore(LARGE_STORE_NAME)
    const request = store.get(key)
    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => resolve(null)
  })
}

async function largeDbPut(record) {
  const db = await openLargeDb()
  if (!db) return false

  return new Promise((resolve) => {
    const tx = db.transaction(LARGE_STORE_NAME, 'readwrite')
    const store = tx.objectStore(LARGE_STORE_NAME)
    const request = store.put(record)
    request.onsuccess = () => resolve(true)
    request.onerror = () => resolve(false)
  })
}

function fallbackLargePayloads() {
  const state = readRiskStore()
  return state.largePayloads && typeof state.largePayloads === 'object' ? state.largePayloads : {}
}

function writeFallbackLargePayload(key, payload) {
  const state = readRiskStore()
  state.largePayloads = { ...fallbackLargePayloads(), [key]: payload }
  writeRiskStore(state)
}

export async function getLocalRawData(objectId) {
  const key = `raw:${objectId}`
  const record = await largeDbGet(key)
  if (record) return record.payload || ''
  return fallbackLargePayloads()[key]?.payload || ''
}

export async function saveLocalRawData(objectId, rawData) {
  const key = `raw:${objectId}`
  const record = { key, object_id: objectId, payload: String(rawData || ''), updated_at: new Date().toISOString() }
  const saved = await largeDbPut(record)
  if (!saved) writeFallbackLargePayload(key, record)

  const state = readRiskStore()
  state.objects = state.objects.map((object) => object.id === objectId ? { ...object, updated_at: today(), raw_data_updated_at: today() } : object)
  state.activity = [{ id: uid('act'), object_id: objectId, action: 'raw_data_saved', created_at: today(), details: { characters: record.payload.length } }, ...state.activity]
  writeRiskStore(state)
  return record
}

export async function getLocalDataAnalysis(objectId) {
  const key = `analysis:${objectId}`
  const record = await largeDbGet(key)
  if (record) return record.payload || null
  return fallbackLargePayloads()[key]?.payload || null
}

export async function saveLocalDataAnalysis(objectId, analysis) {
  const key = `analysis:${objectId}`
  const record = { key, object_id: objectId, payload: analysis, updated_at: new Date().toISOString() }
  const saved = await largeDbPut(record)
  if (!saved) writeFallbackLargePayload(key, record)

  const state = readRiskStore()
  state.objects = state.objects.map((object) => object.id === objectId ? { ...object, updated_at: today(), analysis_updated_at: today() } : object)
  state.activity = [{ id: uid('act'), object_id: objectId, action: 'raw_data_analyzed', created_at: today(), details: { riskScore: analysis?.riskScore, characters: analysis?.sourceStats?.characters } }, ...state.activity]
  writeRiskStore(state)
  return record
}
