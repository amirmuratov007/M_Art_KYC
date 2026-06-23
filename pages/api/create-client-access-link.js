
import crypto from 'crypto'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const admin = verifyAdminRequest(req, res, { scope: 'create-client-access-link' })
  if (!admin.ok) {
    return res.status(admin.status).json({ ok: false, error: admin.error })
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
