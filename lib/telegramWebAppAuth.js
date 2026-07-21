import { createHmac, createPublicKey, timingSafeEqual, verify as verifySignature } from 'node:crypto'

const HASH_PATTERN = /^[a-f0-9]{64}$/i
const BOT_ID_PATTERN = /^[1-9][0-9]{4,19}$/
const ED25519_SPKI_PREFIX = Buffer.from('302a300506032b6570032100', 'hex')
const TELEGRAM_PRODUCTION_PUBLIC_KEY = 'e7bf03a2fa4602af4580703d88dda5bb59f32ed8b02a56c187fe7d34caed242d'

function safeCompareHex(left, right) {
  if (!HASH_PATTERN.test(left) || !HASH_PATTERN.test(right)) return false
  const leftBuffer = Buffer.from(left, 'hex')
  const rightBuffer = Buffer.from(right, 'hex')
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}

export function validateTelegramInitData(rawValue, botToken, options = {}) {
  const raw = String(rawValue || '')
  const token = String(botToken || '')
  const maxAgeSeconds = Math.max(60, Number(options.maxAgeSeconds || 24 * 60 * 60))
  const nowSeconds = Math.floor(Number(options.nowMs || Date.now()) / 1000)

  if (!raw || raw.length > 8192 || !token) {
    return { ok: false, error: 'Missing or oversized Telegram init data' }
  }

  const params = new URLSearchParams(raw)
  const seen = new Set()
  const entries = []

  for (const [key, value] of params.entries()) {
    if (seen.has(key)) return { ok: false, error: 'Duplicate Telegram init data field' }
    seen.add(key)
    if (key !== 'hash') entries.push([key, value])
  }

  const receivedHash = params.get('hash') || ''
  const authDate = Number(params.get('auth_date'))

  if (!HASH_PATTERN.test(receivedHash) || !Number.isInteger(authDate)) {
    return { ok: false, error: 'Invalid Telegram init data format' }
  }

  if (authDate > nowSeconds + 60 || nowSeconds - authDate > maxAgeSeconds) {
    return { ok: false, error: 'Expired Telegram init data' }
  }

  entries.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
  const dataCheckString = entries.map(([key, value]) => `${key}=${value}`).join('\n')
  const secretKey = createHmac('sha256', 'WebAppData').update(token).digest()
  const calculatedHash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

  if (!safeCompareHex(receivedHash, calculatedHash)) {
    return { ok: false, error: 'Invalid Telegram init data signature' }
  }

  let user = null
  const userValue = params.get('user')

  if (userValue) {
    try {
      const parsed = JSON.parse(userValue)
      if (!Number.isSafeInteger(Number(parsed?.id))) {
        return { ok: false, error: 'Invalid Telegram user' }
      }
      user = parsed
    } catch (_) {
      return { ok: false, error: 'Invalid Telegram user payload' }
    }
  }

  return {
    ok: true,
    authDate,
    queryId: params.get('query_id') || '',
    user
  }
}

export function validateTelegramInitDataThirdParty(rawValue, botId, options = {}) {
  const raw = String(rawValue || '')
  const normalizedBotId = String(botId || '')
  const maxAgeSeconds = Math.max(60, Number(options.maxAgeSeconds || 24 * 60 * 60))
  const nowSeconds = Math.floor(Number(options.nowMs || Date.now()) / 1000)

  if (!raw || raw.length > 8192 || !BOT_ID_PATTERN.test(normalizedBotId)) {
    return { ok: false, error: 'Missing or oversized Telegram init data' }
  }

  const params = new URLSearchParams(raw)
  const seen = new Set()
  const entries = []

  for (const [key, value] of params.entries()) {
    if (seen.has(key)) return { ok: false, error: 'Duplicate Telegram init data field' }
    seen.add(key)
    if (key !== 'hash' && key !== 'signature') entries.push([key, value])
  }

  const authDate = Number(params.get('auth_date'))
  const encodedSignature = params.get('signature') || ''

  if (!Number.isInteger(authDate) || !encodedSignature) {
    return { ok: false, error: 'Invalid Telegram init data format' }
  }

  if (authDate > nowSeconds + 60 || nowSeconds - authDate > maxAgeSeconds) {
    return { ok: false, error: 'Expired Telegram init data' }
  }

  try {
    const signature = Buffer.from(encodedSignature, 'base64url')
    const publicKeyBytes = Buffer.from(options.publicKeyHex || TELEGRAM_PRODUCTION_PUBLIC_KEY, 'hex')

    if (signature.length !== 64 || publicKeyBytes.length !== 32) {
      return { ok: false, error: 'Invalid Telegram signature format' }
    }

    entries.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
    const fields = entries.map(([key, value]) => `${key}=${value}`).join('\n')
    const dataCheckString = `${normalizedBotId}:WebAppData\n${fields}`
    const publicKey = createPublicKey({
      key: Buffer.concat([ED25519_SPKI_PREFIX, publicKeyBytes]),
      format: 'der',
      type: 'spki'
    })

    if (!verifySignature(null, Buffer.from(dataCheckString, 'utf8'), publicKey, signature)) {
      return { ok: false, error: 'Invalid Telegram init data signature' }
    }
  } catch (_) {
    return { ok: false, error: 'Invalid Telegram init data signature' }
  }

  let user = null
  const userValue = params.get('user')

  if (userValue) {
    try {
      const parsed = JSON.parse(userValue)
      if (!Number.isSafeInteger(Number(parsed?.id))) {
        return { ok: false, error: 'Invalid Telegram user' }
      }
      user = parsed
    } catch (_) {
      return { ok: false, error: 'Invalid Telegram user payload' }
    }
  }

  return {
    ok: true,
    authDate,
    queryId: params.get('query_id') || '',
    user
  }
}
