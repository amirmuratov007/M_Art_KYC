import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

const CRM_META_TABLE = 'heimdall_crm_meta'

function setNoStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

function getAdminSecret(req) {
  const authorization = req.headers.authorization || ''
  const bearer = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  return req.headers['x-heimdall-admin-secret'] || bearer || req.query?.secret || ''
}

function verifyAdmin(req) {
  const expected = process.env.HEIMDALL_ADMIN_SECRET
  const received = getAdminSecret(req)

  if (!expected) {
    return { ok: false, status: 500, error: 'HEIMDALL_ADMIN_SECRET is not configured in Vercel' }
  }

  if (!received || received !== expected) {
    return { ok: false, status: 401, error: 'Admin access denied' }
  }

  return { ok: true }
}

function sanitize(value, maxLength = 2000) {
  return String(value || '').trim().slice(0, maxLength)
}

function sanitizeTableName(value) {
  const fallback = process.env.SUPABASE_LEADS_TABLE || 'heimdall_leads'
  const table = sanitize(value || fallback, 80)
  return /^[a-zA-Z0-9_]+$/.test(table) ? table : fallback
}

function normalizeStatus(value) {
  const allowed = new Set(['new', 'contact', 'call', 'proposal', 'contract', 'invoice', 'paid', 'in_work', 'report_ready', 'support', 'closed', 'lost'])
  const status = sanitize(value, 60) || 'new'
  return allowed.has(status) ? status : 'new'
}

function normalizePriority(value) {
  const allowed = new Set(['low', 'normal', 'high', 'urgent'])
  const priority = sanitize(value, 60) || 'normal'
  return allowed.has(priority) ? priority : 'normal'
}

function toNumberOrNull(value) {
  if (value === undefined || value === null || value === '') return null
  const number = Number(value)
  if (!Number.isFinite(number)) return null
  return Math.max(0, Math.round(number))
}

function toIsoOrNull(value) {
  const clean = sanitize(value, 80)
  if (!clean) return null
  const date = new Date(clean)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function normalizeLead(row, sourceTable, metaMap) {
  const id = String(row.id ?? row.lead_id ?? row.uuid ?? '')
  const meta = metaMap.get(id) || {}

  return {
    ...row,
    _crm: {
      lead_source: sourceTable,
      lead_id: id,
      status: meta.status || 'new',
      priority: meta.priority || 'normal',
      amount: meta.amount ?? null,
      responsible: meta.responsible || '',
      next_action: meta.next_action || '',
      next_contact_at: meta.next_contact_at || null,
      internal_comment: meta.internal_comment || '',
      updated_at: meta.updated_at || null
    }
  }
}

function buildSearchFilter(query) {
  const q = sanitize(query, 120)
  if (!q) return ''
  const escaped = q.replace(/[%_]/g, '')
  return escaped
}

async function loadMeta(supabase, sourceTable, ids) {
  if (!ids.length) {
    return { ok: true, available: true, map: new Map() }
  }

  const { data, error } = await supabase
    .from(CRM_META_TABLE)
    .select('*')
    .eq('lead_source', sourceTable)
    .in('lead_id', ids)

  if (error) {
    const missing = String(error.message || '').toLowerCase().includes('does not exist') || error.code === '42P01'
    return {
      ok: !missing,
      available: false,
      map: new Map(),
      error: error.message || 'CRM meta table unavailable'
    }
  }

  const map = new Map()
  for (const item of data || []) {
    map.set(String(item.lead_id), item)
  }

  return { ok: true, available: true, map }
}

async function listLeads(req, res, supabase) {
  const sourceTable = sanitizeTableName(req.query?.source)
  const limit = Math.min(300, Math.max(20, Number(req.query?.limit || 150)))
  const query = buildSearchFilter(req.query?.q)

  let request = supabase
    .from(sourceTable)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (query) {
    request = request.or(`name.ilike.%${query}%,company.ilike.%${query}%,contact.ilike.%${query}%,topic.ilike.%${query}%,message.ilike.%${query}%`)
  }

  const { data, error } = await request

  if (error) {
    return res.status(500).json({
      ok: false,
      error: error.message || `Unable to load leads from ${sourceTable}`,
      sourceTable
    })
  }

  const rows = data || []
  const ids = rows.map((row) => String(row.id ?? row.lead_id ?? row.uuid ?? '')).filter(Boolean)
  const metaResult = await loadMeta(supabase, sourceTable, ids)
  const leads = rows.map((row) => normalizeLead(row, sourceTable, metaResult.map))

  return res.status(200).json({
    ok: true,
    sourceTable,
    metaAvailable: metaResult.available,
    metaError: metaResult.available ? '' : metaResult.error || 'CRM meta table is not available',
    leads
  })
}

async function updateLeadMeta(req, res, supabase) {
  const body = req.body || {}
  const sourceTable = sanitizeTableName(body.lead_source || body.source)
  const leadId = sanitize(body.lead_id, 120)

  if (!leadId) {
    return res.status(400).json({ ok: false, error: 'lead_id is required' })
  }

  const payload = {
    lead_source: sourceTable,
    lead_id: leadId,
    status: normalizeStatus(body.status),
    priority: normalizePriority(body.priority),
    amount: toNumberOrNull(body.amount),
    responsible: sanitize(body.responsible, 220),
    next_action: sanitize(body.next_action, 1000),
    next_contact_at: toIsoOrNull(body.next_contact_at),
    internal_comment: sanitize(body.internal_comment, 5000),
    updated_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from(CRM_META_TABLE)
    .upsert(payload, { onConflict: 'lead_source,lead_id' })
    .select('*')
    .single()

  if (error) {
    const missing = String(error.message || '').toLowerCase().includes('does not exist') || error.code === '42P01'
    return res.status(missing ? 409 : 500).json({
      ok: false,
      sqlNeeded: missing,
      error: missing
        ? 'CRM meta table is not created yet. Apply supabase/heimdall_crm_schema.sql in Supabase SQL Editor.'
        : error.message || 'Unable to save CRM status'
    })
  }

  return res.status(200).json({ ok: true, meta: data })
}

export default async function handler(req, res) {
  setNoStore(res)

  const admin = verifyAdmin(req)
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
    return listLeads(req, res, supabase)
  }

  if (req.method === 'PATCH') {
    return updateLeadMeta(req, res, supabase)
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' })
}
