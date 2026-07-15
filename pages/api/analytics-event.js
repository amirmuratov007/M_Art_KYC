import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import {
  cleanText,
  clientError,
  rejectCrossSiteRequest,
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
import {
  isLikelyBot,
  isPrivateAnalyticsPath,
  normalizeAnalyticsPath,
  sanitizeAnalyticsReferrer
} from '@/lib/analyticsPrivacy'

function hashIp(ip) {
  const salt = process.env.ANALYTICS_HASH_SALT || process.env.HEIMDALL_ANALYST_SECRET || ''
  if (!salt) return ''
  return crypto.createHmac('sha256', salt).update(ip || 'unknown').digest('hex').slice(0, 40)
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonPost(req, res)) return
  if (rejectCrossSiteRequest(req, res)) return

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
  const path = normalizeAnalyticsPath(body.path)

  if (isLikelyBot(userAgent) || isPrivateAnalyticsPath(path)) {
    return res.status(200).json({ ok: true, stored: false })
  }

  const ipHash = hashIp(getClientIp(req))

  const event = {
    path,
    title: '',
    referrer: sanitizeAnalyticsReferrer(body.referrer),
    language: cleanText(body.language, 40),
    timezone: cleanText(body.timezone, 80),
    screen: cleanText(body.screen, 40),
    user_agent: '',
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
