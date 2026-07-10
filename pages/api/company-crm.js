import { verifyInternalRequest } from '@/lib/internalAccess'
import { rejectCrossSiteRequest } from '@/lib/apiSecurity'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

const TABLE = 'heimdall_company_crm'

function text(value, max = 4000) {
  return String(value || '').trim().slice(0, max)
}

function normalizeCompany(body = {}) {
  const now = new Date().toISOString()
  return {
    id: text(body.id, 120),
    name: text(body.name, 300),
    contact: text(body.contact, 500),
    source: text(body.source, 300),
    status: text(body.status, 120) || 'Новая заявка',
    note: text(body.note, 8000),
    checks: Array.isArray(body.checks) ? body.checks : [],
    lead: body.lead && typeof body.lead === 'object' ? body.lead : null,
    created_at: text(body.createdAt || body.created_at, 80) || now,
    updated_at: now
  }
}

function toClient(row) {
  return {
    id: row.id,
    name: row.name || '',
    contact: row.contact || '',
    source: row.source || '',
    status: row.status || 'Новая заявка',
    note: row.note || '',
    checks: Array.isArray(row.checks) ? row.checks : [],
    lead: row.lead || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export default async function handler(req, res) {
  if (rejectCrossSiteRequest(req, res)) return

  const access = await verifyInternalRequest(req, res, { scope: 'company-crm' })
  if (!access.ok) {
    return res.status(access.status).json({ ok: false, error: access.error })
  }

  let supabase
  try {
    supabase = getSupabaseAdmin()
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message })
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('updated_at', { ascending: false })

    if (error) return res.status(500).json({ ok: false, error: error.message })
    return res.status(200).json({ ok: true, companies: (data || []).map(toClient) })
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    const payload = normalizeCompany(req.body)
    if (!payload.id || !payload.name) {
      return res.status(400).json({ ok: false, error: 'Нужны id и название компании' })
    }

    const { data, error } = await supabase
      .from(TABLE)
      .upsert(payload, { onConflict: 'id' })
      .select('*')
      .single()

    if (error) return res.status(500).json({ ok: false, error: error.message })
    return res.status(200).json({ ok: true, company: toClient(data) })
  }

  if (req.method === 'DELETE') {
    const id = text(req.query?.id || req.body?.id, 120)
    if (!id) return res.status(400).json({ ok: false, error: 'Company id is required' })

    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) return res.status(500).json({ ok: false, error: error.message })
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE')
  return res.status(405).json({ ok: false, error: 'Method not allowed' })
}
