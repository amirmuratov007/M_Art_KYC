import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import {
  cleanText,
  clientError,
  rejectNonPost,
  setJsonSecurityHeaders,
  setNoStore
} from '@/lib/apiSecurity'
import {
  applyRateLimitHeaders,
  checkRateLimit,
  getClientIp,
  isPayloadTooLarge
} from '@/lib/rateLimit'

function hashIp(ip) {
  const salt = process.env.ANALYTICS_HASH_SALT || process.env.HEIMDALL_ANALYST_SECRET || 'heimdall-analytics'
  return crypto.createHash('sha256').update(`${salt}:${ip || 'unknown'}`).digest('hex').slice(0, 40)
}

function normalizePath(value) {
  const path = cleanText(value, 500)
  if (!path || !path.startsWith('/')) return '/'
  if (path.startsWith('//')) return '/'
  return path
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonPost(req, res)) return

  const rateLimit = checkRateLimit(req, {
    scope: 'analytics-event',
    limit: 180,
    windowMs: 60 * 1000
  })
  applyRateLimitHeaders(res, rateLimit)

  if (!rateLimit.ok) {
    return res.status(429).json(clientError('Too many requests'))
  }

  if (isPayloadTooLarge(req.body, 3000)) {
    return res.status(413).json(clientError('Payload too large'))
  }

  const body = req.body || {}
  const userAgent = cleanText(req.headers['user-agent'] || '', 500)
  const ipHash = hashIp(getClientIp(req))

  const event = {
    path: normalizePath(body.path),
    title: cleanText(body.title, 250),
    referrer: cleanText(body.referrer, 500),
    language: cleanText(body.language, 40),
    timezone: cleanText(body.timezone, 80),
    screen: cleanText(body.screen, 40),
    user_agent: userAgent,
    ip_hash: ipHash
  }

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from('heimdall_pageviews').insert(event)

    if (error) {
      return res.status(200).json({ ok: true, stored: false, error: 'Analytics storage is not ready' })
    }

    return res.status(200).json({ ok: true, stored: true })
  } catch (error) {
    return res.status(200).json({ ok: true, stored: false, error: 'Analytics storage is unavailable' })
  }
}
