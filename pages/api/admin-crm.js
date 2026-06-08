import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

const CRM_META_TABLE = 'heimdall_crm_meta'

const STATUS_LABELS = {
  new: 'Новая заявка',
  contact: 'Связаться',
  call: 'Созвон',
  proposal: 'КП отправлено',
  contract: 'Договор / NDA',
  invoice: 'Счет',
  paid: 'Оплачено',
  in_work: 'В работе',
  report_ready: 'Отчет готов',
  support: 'Сопровождение',
  closed: 'Исполнено',
  lost: 'Отказ',
  archived: 'Архив'
}

const PRIORITY_LABELS = {
  low: 'Низкий',
  normal: 'Обычный',
  high: 'Высокий',
  urgent: 'Срочно'
}

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
  const allowed = new Set(['new', 'contact', 'call', 'proposal', 'contract', 'invoice', 'paid', 'in_work', 'report_ready', 'support', 'closed', 'lost', 'archived'])
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


async function sendCrmTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TG_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TG_CHAT_ID

  if (!token || !chatId) {
    return { ok: false, skipped: true, error: 'Telegram credentials are not configured' }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok || data.ok === false) {
      return { ok: false, error: data.description || `Telegram API error ${response.status}` }
    }

    return { ok: true }
  } catch (error) {
    return { ok: false, error: error.message || 'Telegram request failed' }
  }
}

function getLeadTitle(row = {}) {
  return row.company || row.name || row.contact || row.email || row.phone || `Заявка #${row.id || row.lead_id || row.uuid || ''}`
}

function getLeadContact(row = {}) {
  return row.contact || [row.email, row.phone].filter(Boolean).join(' · ') || 'Контакт не указан'
}

function getLeadTopic(row = {}) {
  return row.topic || row.check_type || row.type || 'Общий запрос'
}

function formatDateForTelegram(value) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Moscow'
    }).format(new Date(value))
  } catch {
    return String(value)
  }
}

async function loadExistingMeta(supabase, sourceTable, leadId) {
  const { data, error } = await supabase
    .from(CRM_META_TABLE)
    .select('*')
    .eq('lead_source', sourceTable)
    .eq('lead_id', leadId)
    .maybeSingle()

  if (error) return null
  return data || null
}

async function loadLeadRow(supabase, sourceTable, leadId) {
  const { data, error } = await supabase
    .from(sourceTable)
    .select('*')
    .eq('id', leadId)
    .maybeSingle()

  if (error) return null
  return data || null
}

function buildCrmNotification({ oldMeta, newMeta, lead }) {
  const previousStatus = oldMeta?.status || 'new'
  const nextStatus = newMeta.status || 'new'
  const statusChanged = previousStatus !== nextStatus
  const nextActionChanged = sanitize(oldMeta?.next_action, 1000) !== sanitize(newMeta.next_action, 1000) && Boolean(newMeta.next_action)
  const nextContactChanged = String(oldMeta?.next_contact_at || '') !== String(newMeta.next_contact_at || '') && Boolean(newMeta.next_contact_at)
  const priorityBecameUrgent = oldMeta?.priority !== 'urgent' && newMeta.priority === 'urgent'
  const amountChanged = String(oldMeta?.amount ?? '') !== String(newMeta.amount ?? '') && newMeta.amount !== null

  const importantStatus = ['contact', 'call', 'proposal', 'contract', 'invoice', 'paid', 'in_work', 'report_ready', 'support', 'closed', 'lost', 'archived'].includes(nextStatus)

  if (!statusChanged && !nextActionChanged && !nextContactChanged && !priorityBecameUrgent && !amountChanged) {
    return null
  }

  if (statusChanged && !importantStatus && !nextActionChanged && !nextContactChanged && !priorityBecameUrgent && !amountChanged) {
    return null
  }

  const lines = [
    '🧭 HEIMDALL CRM',
    '',
    `Заявка: ${getLeadTitle(lead)}`,
    `Контакт: ${getLeadContact(lead)}`,
    `Услуга: ${getLeadTopic(lead)}`,
    `Этап: ${STATUS_LABELS[previousStatus] || previousStatus} → ${STATUS_LABELS[nextStatus] || nextStatus}`,
    `Приоритет: ${PRIORITY_LABELS[newMeta.priority] || newMeta.priority || 'Обычный'}`
  ]

  if (newMeta.amount) lines.push(`Сумма: ${Number(newMeta.amount).toLocaleString('ru-RU')} ₽`)
  if (newMeta.responsible) lines.push(`Ответственный: ${newMeta.responsible}`)
  if (newMeta.next_action) lines.push(`Следующий шаг: ${newMeta.next_action}`)
  if (newMeta.next_contact_at) lines.push(`Вернуться: ${formatDateForTelegram(newMeta.next_contact_at)}`)

  lines.push('', `ID: ${newMeta.lead_source}/${newMeta.lead_id}`)

  return lines.join('\n')
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

  const [oldMeta, leadRow] = await Promise.all([
    loadExistingMeta(supabase, sourceTable, leadId),
    loadLeadRow(supabase, sourceTable, leadId)
  ])

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

  const notificationText = buildCrmNotification({ oldMeta, newMeta: data, lead: leadRow || { id: leadId } })
  const telegram = notificationText ? await sendCrmTelegram(notificationText) : { ok: false, skipped: true }

  return res.status(200).json({ ok: true, meta: data, telegram })
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
