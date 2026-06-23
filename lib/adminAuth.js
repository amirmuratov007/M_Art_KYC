import crypto from 'crypto'
import { applyRateLimitHeaders, checkRateLimit } from './rateLimit'

function readHeader(req, name) {
  const value = req?.headers?.[name.toLowerCase()] || req?.headers?.[name] || ''
  return Array.isArray(value) ? value[0] : value
}

export function getAdminSecretFromRequest(req) {
  const authorization = readHeader(req, 'authorization')
  const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  return readHeader(req, 'x-heimdall-admin-secret') || bearer || ''
}

function timingSafeStringEqual(received, expected) {
  const expectedBuffer = Buffer.from(String(expected || ''), 'utf8')
  const receivedBuffer = Buffer.from(String(received || ''), 'utf8')

  if (!expectedBuffer.length || receivedBuffer.length !== expectedBuffer.length) {
    const dummy = Buffer.alloc(Math.max(expectedBuffer.length, 1))
    crypto.timingSafeEqual(dummy, dummy)
    return false
  }

  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
}

export function verifyAdminRequest(req, res, { scope = 'admin' } = {}) {
  const rate = checkRateLimit(req, {
    scope: `${scope}-auth`,
    limit: 30,
    windowMs: 60 * 1000
  })
  applyRateLimitHeaders(res, rate)

  if (!rate.ok) {
    return {
      ok: false,
      status: 429,
      error: 'Слишком много запросов. Попробуйте еще раз через минуту.'
    }
  }

  const expected = process.env.HEIMDALL_ADMIN_SECRET
  const received = getAdminSecretFromRequest(req)

  if (!expected) {
    return { ok: false, status: 500, error: 'HEIMDALL_ADMIN_SECRET is not configured in Vercel' }
  }

  if (!timingSafeStringEqual(received, expected)) {
    return { ok: false, status: 401, error: 'Admin access denied' }
  }

  return { ok: true }
}
