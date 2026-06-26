import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { rejectNonGet, setJsonSecurityHeaders, setNoStore } from '@/lib/apiSecurity'
import { applyRateLimitHeaders, checkRateLimit } from '@/lib/rateLimit'

function getToken(req) {
  const authorization = req.headers.authorization || ''
  const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  const headerToken = req.headers['x-heimdall-client-token']

  return bearer || headerToken || ''
}

function isValidTokenFormat(token) {
  return typeof token === 'string' && /^[a-f0-9]{64}$/i.test(token)
}

function isExpired(value) {
  return value && new Date(value).getTime() < Date.now()
}

function safeClientPayload(access) {
  return {
    name: access.client_name || '',
    email: access.client_email || '',
    company: access.company || '',
    plan: access.plan || 'HEIMDALL Client Access',
    expires_at: access.expires_at || null
  }
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonGet(req, res)) return

  const rate = checkRateLimit(req, { scope: 'client-dashboard', limit: 60, windowMs: 60 * 1000 })
  applyRateLimitHeaders(res, rate)

  if (!rate.ok) {
    return res.status(429).json({ ok: false, error: 'Too many requests' })
  }

  const token = getToken(req)

  if (!isValidTokenFormat(token)) {
    return res.status(401).json({ ok: false, error: 'Client access token is required' })
  }

  try {
    const supabase = getSupabaseAdmin()

    const { data: access, error } = await supabase
      .from('client_access_links')
      .select('id, client_name, client_email, company, plan, status, expires_at, open_count')
      .eq('token', token)
      .single()

    if (error || !access) {
      return res.status(404).json({ ok: false, error: 'Access link not found' })
    }

    if (access.status !== 'active') {
      return res.status(403).json({ ok: false, error: 'Client access is not active' })
    }

    if (isExpired(access.expires_at)) {
      return res.status(403).json({ ok: false, error: 'Client access link expired' })
    }

    await supabase
      .from('client_access_links')
      .update({
        last_opened_at: new Date().toISOString(),
        open_count: (access.open_count || 0) + 1
      })
      .eq('id', access.id)

    return res.status(200).json({
      ok: true,
      source: 'heimdall-client-dashboard',
      mode: 'secured-client-access',
      updated_at: new Date().toISOString(),
      client: safeClientPayload(access),
      checks: [],
      reports: [],
      signals: [],
      summary: {
        checks_total: 0,
        active_checks: 0,
        completed_checks: 0,
        reports_total: 0,
        signals_total: 0
      }
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || 'Dashboard API failed'
    })
  }
}
