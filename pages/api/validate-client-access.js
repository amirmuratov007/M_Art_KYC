import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function setNoStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

function isValidTokenFormat(token) {
  return typeof token === 'string' && /^[a-f0-9]{64}$/i.test(token)
}

export default async function handler(req, res) {
  setNoStore(res)

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const { token } = req.query || {}

    if (!isValidTokenFormat(token)) {
      return res.status(400).json({ ok: false, error: 'Missing or invalid access token' })
    }

    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from('client_access_links')
      .select('id, client_name, client_email, company, plan, status, expires_at, open_count')
      .eq('token', token)
      .single()

    if (error || !data) {
      return res.status(404).json({ ok: false, error: 'Access link not found' })
    }

    if (data.status !== 'active') {
      return res.status(403).json({ ok: false, error: 'Access is not active' })
    }

    if (data.expires_at && new Date(data.expires_at).getTime() < Date.now()) {
      return res.status(403).json({ ok: false, error: 'Access link expired' })
    }

    await supabase
      .from('client_access_links')
      .update({
        last_opened_at: new Date().toISOString(),
        open_count: (data.open_count || 0) + 1
      })
      .eq('id', data.id)

    return res.status(200).json({
      ok: true,
      client: {
        name: data.client_name || '',
        email: data.client_email || '',
        company: data.company || '',
        plan: data.plan || 'HEIMDALL Client Access',
        expires_at: data.expires_at || null
      }
    })
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Access validation failed' })
  }
}
