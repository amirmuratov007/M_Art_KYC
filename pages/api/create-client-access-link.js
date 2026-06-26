
import crypto from 'crypto'
import { verifyAdminRequest } from '@/lib/adminAuth'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { cleanText, normalizeEmail, rejectNonPost, setJsonSecurityHeaders, setNoStore } from '@/lib/apiSecurity'

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonPost(req, res)) return

  const admin = verifyAdminRequest(req, res, { scope: 'create-client-access-link' })
  if (!admin.ok) {
    return res.status(admin.status).json({ ok: false, error: admin.error })
  }

  try {
    const supabase = getSupabaseAdmin()

    const body = req.body || {}
    const client_name = cleanText(body.client_name, 220)
    const client_email = normalizeEmail(body.client_email)
    const company = cleanText(body.company, 220)
    const plan = cleanText(body.plan, 220) || 'HEIMDALL Client Access'
    const days = Math.min(Math.max(Number(body.days || 30), 1), 90)

    if (!client_email) {
      return res.status(400).json({ ok: false, error: 'valid client_email is required' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

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

    return res.status(201).json({
      ok: true,
      access: data,
      url: `https://heimdall-group.ru/app?token=${token}`
    })
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Access link creation failed' })
  }
}
