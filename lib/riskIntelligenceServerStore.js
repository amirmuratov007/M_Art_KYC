const PREFIX = process.env.HEIMDALL_RI_STORAGE_PREFIX || 'heimdall:ri:v1'
const OBJECT_IDS_KEY = `${PREFIX}:object_ids`
const REPORT_IDS_KEY = `${PREFIX}:report_ids`

function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || ''
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''
  return { url, token, enabled: Boolean(url && token) }
}

async function redis(command, ...args) {
  const { url, token, enabled } = getKvConfig()
  if (!enabled) {
    const error = new Error('Vercel KV не подключен. Добавьте KV_REST_API_URL и KV_REST_API_TOKEN.')
    error.code = 'KV_NOT_CONFIGURED'
    throw error
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([command, ...args])
  })

  const text = await response.text()
  let payload = null
  try { payload = text ? JSON.parse(text) : null } catch (error) {}

  if (!response.ok) {
    const error = new Error(payload?.error || text || `KV error ${response.status}`)
    error.status = response.status
    throw error
  }

  if (payload?.error) {
    const error = new Error(payload.error)
    error.status = 500
    throw error
  }

  return payload?.result
}

function objectKey(id) {
  return `${PREFIX}:object:${id}`
}

function rawKey(id) {
  return `${PREFIX}:raw:${id}`
}

function reportKey(id) {
  return `${PREFIX}:report:${id}`
}

function safeParse(value, fallback = null) {
  if (!value) return fallback
  if (typeof value === 'object') return value
  try { return JSON.parse(value) } catch (error) { return fallback }
}

function nowIso() {
  return new Date().toISOString()
}

export function storageStatus() {
  const { enabled } = getKvConfig()
  return { enabled, provider: enabled ? 'vercel-kv' : 'browser-fallback' }
}

export async function listObjects() {
  const ids = await redis('LRANGE', OBJECT_IDS_KEY, 0, -1)
  const uniqueIds = [...new Set(Array.isArray(ids) ? ids : [])]
  const items = []
  for (const id of uniqueIds) {
    const value = await redis('GET', objectKey(id))
    const parsed = safeParse(value)
    if (parsed?.id) items.push(parsed)
  }
  return items.sort((a, b) => String(b.updated_at || '').localeCompare(String(a.updated_at || '')))
}

export async function getObject(id) {
  const item = safeParse(await redis('GET', objectKey(id)))
  const rawText = await redis('GET', rawKey(id))
  return { item, rawText: rawText || '' }
}

export async function saveObject({ item, rawText = null }) {
  if (!item?.id) throw new Error('Нет id объекта проверки')
  const next = { ...item, updated_at_server: nowIso() }
  await redis('SET', objectKey(item.id), JSON.stringify(next))
  await redis('LREM', OBJECT_IDS_KEY, 0, item.id)
  await redis('LPUSH', OBJECT_IDS_KEY, item.id)
  if (typeof rawText === 'string') await redis('SET', rawKey(item.id), rawText)
  return next
}

export async function deleteObject(id) {
  if (!id) throw new Error('Нет id объекта проверки')
  await redis('DEL', objectKey(id))
  await redis('DEL', rawKey(id))
  await redis('LREM', OBJECT_IDS_KEY, 0, id)
  return true
}

export async function listReports(objectId = '') {
  const ids = await redis('LRANGE', REPORT_IDS_KEY, 0, -1)
  const uniqueIds = [...new Set(Array.isArray(ids) ? ids : [])]
  const items = []
  for (const id of uniqueIds) {
    const value = await redis('GET', reportKey(id))
    const parsed = safeParse(value)
    if (parsed?.id && (!objectId || parsed.object_id === objectId)) items.push(parsed)
  }
  return items.sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
}

export async function saveReport({ objectId, objectName, report, riskScore, riskLevel }) {
  if (!objectId) throw new Error('Нет id объекта проверки')
  const id = `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const item = {
    id,
    object_id: objectId,
    object_name: objectName || 'Проверка',
    report: report || '',
    risk_score: Number(riskScore || 0),
    risk_level: riskLevel || 'low',
    created_at: nowIso()
  }
  await redis('SET', reportKey(id), JSON.stringify(item))
  await redis('LPUSH', REPORT_IDS_KEY, id)
  return item
}
