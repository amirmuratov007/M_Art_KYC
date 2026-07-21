import { createHmac, timingSafeEqual } from 'node:crypto'

const HASH_PATTERN = /^[a-f0-9]{64}$/i

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
