import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyAdminRequest } from '@/lib/adminAuth'

function setNoStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

function sanitize(value, maxLength = 2000) {
  return String(value || '').trim().slice(0, maxLength)
}

function toIntegerOrNull(value) {
  if (value === undefined || value === null || value === '') return null
  const number = Number(value)
  if (!Number.isFinite(number)) return null
  return Math.max(0, Math.min(100, Math.round(number)))
}

function normalizeStatus(value) {
  const allowed = new Set(['new', 'in_progress', 'review', 'completed', 'paused'])
  const status = sanitize(value, 40) || 'in_progress'
  return allowed.has(status) ? status : 'in_progress'
}

function normalizePayload(body = {}) {
  return {
    user_id: sanitize(body.user_id, 80),
    title: sanitize(body.title, 300),
    type: sanitize(body.type, 120),
    status: normalizeStatus(body.status),
    risk_score: toIntegerOrNull(body.risk_score),
    summary: sanitize(body.summary, 4000),
    report_url: sanitize(body.report_url, 1000) || null
  }
}

function normalizeAccountPayload(body = {}) {
  return {
    email: sanitize(body.email, 220).toLowerCase(),
    password: sanitize(body.password, 200),
    full_name: sanitize(body.full_name || body.fullName, 220),
    company: sanitize(body.company, 220)
  }
}

function validatePayload(payload) {
  if (!payload.user_id) return 'Сначала найдите клиента по email. UUID вручную вводить не нужно.'
  if (!payload.title) return 'Укажите название проверки'
  return ''
}

function validateAccountPayload(payload) {
  if (!payload.email) return 'Укажите email клиента'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return 'Email клиента выглядит некорректно'
  if (!payload.password || payload.password.length < 8) return 'Пароль должен быть не короче 8 символов'
  return ''
}

async function resolveUserByEmail(supabase, email) {
  const target = sanitize(email, 220).toLowerCase()

  if (!target) {
    return { ok: false, error: 'Email is required' }
  }

  const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })

  if (error) {
    return { ok: false, error: error.message || 'Unable to read Supabase users' }
  }

  const user = (data?.users || []).find((item) => String(item.email || '').toLowerCase() === target)

  if (!user) {
    return { ok: false, error: 'Пользователь с таким email не найден в Supabase Auth' }
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      full_name: user.user_metadata?.full_name || '',
      company: user.user_metadata?.company || ''
    }
  }
}

export default async function handler(req, res) {
  setNoStore(res)

  const admin = verifyAdminRequest(req, res, { scope: 'admin-client-checks' })
  if (!admin.ok) {
    return res.status(admin.status).json({ ok: false, error: admin.error })
  }

  let supabase

  try {
    supabase = getSupabaseAdmin()
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Supabase admin client failed' })
  }

  if (req.method === 'GET') {
    const email = sanitize(req.query?.email, 220)
    const userId = sanitize(req.query?.user_id, 80)

    if (email) {
      const result = await resolveUserByEmail(supabase, email)
      if (!result.ok) {
        return res.status(404).json({ ok: false, error: result.error })
      }
      return res.status(200).json({ ok: true, user: result.user })
    }

    if (!userId) {
      return res.status(400).json({ ok: false, error: 'Укажите email клиента. UUID вручную вводить не нужно.' })
    }

    const { data, error } = await supabase
      .from('client_checks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ ok: false, error: error.message || 'Unable to load checks' })
    }

    return res.status(200).json({ ok: true, checks: data || [] })
  }

  if (req.method === 'POST') {
    if (req.body?.action === 'create_user') {
      const account = normalizeAccountPayload(req.body)
      const validationError = validateAccountPayload(account)

      if (validationError) {
        return res.status(400).json({ ok: false, error: validationError })
      }

      const existing = await resolveUserByEmail(supabase, account.email)

      if (existing.ok) {
        return res.status(200).json({ ok: true, user: existing.user, existing: true })
      }

      const { data, error } = await supabase.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: true,
        user_metadata: {
          full_name: account.full_name,
          company: account.company
        }
      })

      if (error) {
        return res.status(500).json({ ok: false, error: error.message || 'Unable to create client account' })
      }

      const user = data?.user

      return res.status(200).json({
        ok: true,
        user: {
          id: user?.id,
          email: user?.email,
          created_at: user?.created_at,
          last_sign_in_at: user?.last_sign_in_at,
          full_name: user?.user_metadata?.full_name || '',
          company: user?.user_metadata?.company || ''
        },
        existing: false
      })
    }

    const payload = normalizePayload(req.body)
    const validationError = validatePayload(payload)

    if (validationError) {
      return res.status(400).json({ ok: false, error: validationError })
    }

    const { data, error } = await supabase
      .from('client_checks')
      .insert([payload])
      .select('*')
      .single()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message || 'Unable to create check' })
    }

    return res.status(200).json({ ok: true, check: data })
  }

  if (req.method === 'PATCH') {
    const id = sanitize(req.body?.id, 80)
    const payload = normalizePayload(req.body)
    const validationError = validatePayload(payload)

    if (!id) {
      return res.status(400).json({ ok: false, error: 'Check id is required' })
    }

    if (validationError) {
      return res.status(400).json({ ok: false, error: validationError })
    }

    const { data, error } = await supabase
      .from('client_checks')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      return res.status(500).json({ ok: false, error: error.message || 'Unable to update check' })
    }

    return res.status(200).json({ ok: true, check: data })
  }

  if (req.method === 'DELETE') {
    const id = sanitize(req.body?.id || req.query?.id, 80)

    if (!id) {
      return res.status(400).json({ ok: false, error: 'Check id is required' })
    }

    const { error } = await supabase
      .from('client_checks')
      .delete()
      .eq('id', id)

    if (error) {
      return res.status(500).json({ ok: false, error: error.message || 'Unable to delete check' })
    }

    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' })
}
