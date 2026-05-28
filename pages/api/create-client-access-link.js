
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function requireAdmin(req) {
  const secret = process.env.HEIMDALL_ADMIN_SECRET
  const provided = req.headers['x-heimdall-admin-secret']

  return secret && provided && secret === provided
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  if (!requireAdmin(req)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  try {
    const supabase = getSupabaseAdmin()

    const {
      client_name,
      client_email,
      company,
      plan = 'HEIMDALL Client Access',
      days = 30
    } = req.body || {}

    if (!client_email) {
      return res.status(400).json({ ok: false, error: 'client_email is required' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + Number(days) * 24 * 60 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('client_access_links')
      .insert([
        {
          token,
          client_name: client_name || '',
          client_email,
          company: company || '',
          plan,
          status: 'active',
          expires_at: expiresAt
        }
      ])
      .select('*')
      .single()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message })
    }

    return res.status(200).json({
      ok: true,
      access: data,
      url: `https://heimdall-group.ru/app?token=${token}`
    })
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Access link creation failed' })
  }
}
