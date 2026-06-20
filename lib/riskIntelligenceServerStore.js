import net from 'net'
import tls from 'tls'

const PREFIX = process.env.HEIMDALL_RI_STORAGE_PREFIX || 'heimdall:ri:v1'
const OBJECT_IDS_KEY = `${PREFIX}:object_ids`
const REPORT_IDS_KEY = `${PREFIX}:report_ids`

function normalizeRestUrl(value) {
  return String(value || '').replace(/\/+$/, '')
}

function pickEnv(names) {
  for (const name of names) {
    const value = process.env[name]
    if (value) return { name, value }
  }
  return { name: '', value: '' }
}

function getRedisConfig() {
  const restUrl = pickEnv(['KV_REST_API_URL', 'UPSTASH_REDIS_REST_URL', 'REDIS_REST_URL', 'VERCEL_KV_REST_API_URL'])
  const restToken = pickEnv(['KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_TOKEN', 'REDIS_REST_TOKEN', 'VERCEL_KV_REST_API_TOKEN'])

  if (restUrl.value && restToken.value) {
    return {
      enabled: true,
      mode: 'rest',
      provider: restUrl.name.includes('KV') ? 'vercel-kv-rest' : 'upstash-rest',
      source: `${restUrl.name} + ${restToken.name}`,
      url: normalizeRestUrl(restUrl.value),
      token: restToken.value
    }
  }

  const tcpUrl = pickEnv(['REDIS_URL', 'KV_URL', 'UPSTASH_REDIS_URL'])
  if (tcpUrl.value) {
    return {
      enabled: true,
      mode: 'tcp',
      provider: tcpUrl.value.startsWith('rediss://') ? 'redis-tls-url' : 'redis-url',
      source: tcpUrl.name,
      redisUrl: tcpUrl.value
    }
  }

  return { enabled: false, mode: 'none', provider: 'browser-fallback', source: 'none' }
}

function safeParse(value, fallback = null) {
  if (!value) return fallback
  if (typeof value === 'object') return value
  try { return JSON.parse(value) } catch (error) { return fallback }
}

function encodeResp(parts) {
  const items = parts.map((part) => {
    const value = part == null ? '' : String(part)
    return `$${Buffer.byteLength(value)}\r\n${value}\r\n`
  }).join('')
  return `*${parts.length}\r\n${items}`
}

function readLine(buffer, offset) {
  const end = buffer.indexOf('\r\n', offset)
  if (end < 0) return null
  return { line: buffer.slice(offset, end).toString('utf8'), next: end + 2 }
}

function parseResp(buffer, offset = 0) {
  if (offset >= buffer.length) return { complete: false }
  const type = String.fromCharCode(buffer[offset])
  const line = readLine(buffer, offset + 1)
  if (!line) return { complete: false }

  if (type === '+') return { complete: true, value: line.line, offset: line.next }
  if (type === '-') {
    const error = new Error(line.line || 'Redis error')
    error.redis = true
    throw error
  }
  if (type === ':') return { complete: true, value: Number(line.line), offset: line.next }
  if (type === '$') {
    const length = Number(line.line)
    if (length === -1) return { complete: true, value: null, offset: line.next }
    const end = line.next + length
    if (buffer.length < end + 2) return { complete: false }
    return { complete: true, value: buffer.slice(line.next, end).toString('utf8'), offset: end + 2 }
  }
  if (type === '*') {
    const count = Number(line.line)
    if (count === -1) return { complete: true, value: null, offset: line.next }
    const values = []
    let nextOffset = line.next
    for (let index = 0; index < count; index += 1) {
      const parsed = parseResp(buffer, nextOffset)
      if (!parsed.complete) return { complete: false }
      values.push(parsed.value)
      nextOffset = parsed.offset
    }
    return { complete: true, value: values, offset: nextOffset }
  }
  throw new Error(`Неожиданный ответ Redis: ${type}`)
}

async function redisTcp(config, command, ...args) {
  const parsed = new URL(config.redisUrl)
  const secure = parsed.protocol === 'rediss:'
  const port = Number(parsed.port || (secure ? 6380 : 6379))
  const password = decodeURIComponent(parsed.password || '')
  const username = decodeURIComponent(parsed.username || '')
  const db = parsed.pathname && parsed.pathname !== '/' ? parsed.pathname.slice(1) : ''

  const commands = []
  if (password && username) commands.push(['AUTH', username, password])
  else if (password) commands.push(['AUTH', password])
  if (db) commands.push(['SELECT', db])
  commands.push([command, ...args])

  return new Promise((resolve, reject) => {
    const socket = secure
      ? tls.connect({ host: parsed.hostname, port, servername: parsed.hostname })
      : net.connect({ host: parsed.hostname, port })

    let buffer = Buffer.alloc(0)
    let commandIndex = 0
    let finished = false
    const timer = setTimeout(() => {
      if (finished) return
      finished = true
      socket.destroy()
      reject(new Error('Redis не ответил за 8 секунд. Проверь REDIS_URL и доступность базы.'))
    }, 8000)

    function finish(error, value) {
      if (finished) return
      finished = true
      clearTimeout(timer)
      socket.destroy()
      if (error) reject(error)
      else resolve(value)
    }

    function sendNext() {
      socket.write(encodeResp(commands[commandIndex]))
    }

    socket.on('connect', sendNext)
    socket.on('secureConnect', sendNext)
    socket.on('data', (chunk) => {
      try {
        buffer = Buffer.concat([buffer, chunk])
        const parsedResp = parseResp(buffer, 0)
        if (!parsedResp.complete) return
        buffer = Buffer.alloc(0)
        const value = parsedResp.value
        if (commandIndex < commands.length - 1) {
          commandIndex += 1
          sendNext()
          return
        }
        finish(null, value)
      } catch (error) {
        finish(error)
      }
    })
    socket.on('error', (error) => finish(error))
  })
}

async function redisRest(config, command, ...args) {
  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([command, ...args])
  })

  const text = await response.text()
  let payload = null
  try { payload = text ? JSON.parse(text) : null } catch (error) {}

  if (!response.ok) {
    const error = new Error(payload?.error || text || `Redis REST error ${response.status}`)
    error.status = response.status
    error.provider = config.provider
    error.source = config.source
    throw error
  }

  if (payload?.error) {
    const error = new Error(payload.error)
    error.status = 500
    error.provider = config.provider
    error.source = config.source
    throw error
  }

  return payload?.result
}

async function redis(command, ...args) {
  const config = getRedisConfig()
  if (!config.enabled) {
    const error = new Error('Серверное хранилище не подключено. Нужны KV_REST_API_URL/KV_REST_API_TOKEN, UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN или REDIS_URL.')
    error.code = 'KV_NOT_CONFIGURED'
    throw error
  }

  if (config.mode === 'rest') return redisRest(config, command, ...args)
  if (config.mode === 'tcp') return redisTcp(config, command, ...args)
  throw new Error('Неизвестный режим Redis')
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

function nowIso() {
  return new Date().toISOString()
}

export function storageStatus() {
  const config = getRedisConfig()
  return {
    enabled: config.enabled,
    provider: config.enabled ? config.provider : 'browser-fallback',
    mode: config.mode,
    source: config.source,
    prefix: PREFIX,
    expected: ['KV_REST_API_URL + KV_REST_API_TOKEN', 'UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN', 'REDIS_URL']
  }
}

export async function testStorageConnection() {
  const config = getRedisConfig()
  if (!config.enabled) return { ok: false, storage: storageStatus(), error: 'Переменные Redis не найдены.' }
  const key = `${PREFIX}:healthcheck`
  await redis('SET', key, nowIso())
  const value = await redis('GET', key)
  return { ok: Boolean(value), storage: storageStatus(), value }
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
  return items.sort((a, b) => String(b.updated_at || b.updated_at_server || '').localeCompare(String(a.updated_at || a.updated_at_server || '')))
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
