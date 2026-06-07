import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function setNoStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

function getToken(req) {
  const authorization = req.headers.authorization || ''
  const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  const headerToken = req.headers['x-heimdall-client-token']
  const queryToken = req.query?.token

  return bearer || headerToken || queryToken || ''
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

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
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
