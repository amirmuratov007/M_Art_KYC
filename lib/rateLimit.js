const DEFAULT_WINDOW_MS = 60 * 1000

function getStore() {
  if (!globalThis.__heimdallRateLimitStore) {
    globalThis.__heimdallRateLimitStore = new Map()
  }
  return globalThis.__heimdallRateLimitStore
}

function getHeader(req, name) {
  const value = req?.headers?.[name.toLowerCase()] || req?.headers?.[name] || ''
  return Array.isArray(value) ? value[0] : value
}

export function getClientIp(req) {
  const forwardedFor = getHeader(req, 'x-forwarded-for')
  const realIp = getHeader(req, 'x-real-ip')
  const cfIp = getHeader(req, 'cf-connecting-ip')
  const candidate = forwardedFor?.split(',')?.[0]?.trim() || realIp || cfIp || req?.socket?.remoteAddress || 'unknown'
  return String(candidate || 'unknown').replace(/^::ffff:/, '')
}

export function checkRateLimit(req, options = {}) {
  const windowMs = Number(options.windowMs || DEFAULT_WINDOW_MS)
  const limit = Number(options.limit || 5)
  const scope = options.scope || 'default'
  const identifier = options.identifier || getClientIp(req)
  const now = Date.now()
  const key = `${scope}:${identifier}`
  const store = getStore()

  // Clean old buckets opportunistically, so long-running Passenger processes do not grow forever.
  for (const [entryKey, entry] of store.entries()) {
    if (!entry || entry.resetAt <= now) {
      store.delete(entryKey)
    }
  }

  const current = store.get(key)

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return {
      ok: true,
      limit,
      remaining: Math.max(limit - 1, 0),
      resetAt,
      retryAfter: Math.ceil(windowMs / 1000)
    }
  }

  current.count += 1
  store.set(key, current)

  const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000))

  if (current.count > limit) {
    return {
      ok: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfter
    }
  }

  return {
    ok: true,
    limit,
    remaining: Math.max(limit - current.count, 0),
    resetAt: current.resetAt,
    retryAfter
  }
}

export function applyRateLimitHeaders(res, result) {
  if (!res || !result) return
  res.setHeader('X-RateLimit-Limit', String(result.limit))
  res.setHeader('X-RateLimit-Remaining', String(result.remaining))
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)))
  if (!result.ok) {
    res.setHeader('Retry-After', String(result.retryAfter))
  }
}

export function hasSpamHoneypot(body = {}) {
  const honeypotFields = ['website', 'homepage', 'url', 'company_site', 'companySite']
  return honeypotFields.some((field) => String(body?.[field] || '').trim().length > 0)
}

export function isPayloadTooLarge(body = {}, maxChars = 7000) {
  try {
    return JSON.stringify(body || {}).length > maxChars
  } catch (_) {
    return true
  }
}
