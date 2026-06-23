import { verifyAdminRequest } from '@/lib/adminAuth'
import { createRiskObject, findRiskObjectBySourceRequest } from '@/lib/riskIntelligenceStore'

function setNoStore(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

function clean(value, max = 1000) {
  return String(value || '').trim().slice(0, max)
}

function pickLeadTitle(lead = {}) {
  return clean(lead.company || lead.name || lead.contact || lead.email || lead.phone || `Заявка ${lead.id || lead.lead_id || lead.uuid || ''}`, 220)
}

function pickLeadTopic(lead = {}) {
  return clean(lead.topic || lead.check_type || lead.service || lead.type || 'Заявка CRM', 260)
}

function pickLeadMessage(lead = {}) {
  return clean(lead.message || lead.comment || lead.details || '', 1800)
}

function mapObjectType(lead = {}) {
  const text = `${pickLeadTopic(lead)} ${pickLeadMessage(lead)}`.toLowerCase()
  if (text.includes('контрагент') || text.includes('компан') || text.includes('due diligence')) return 'company'
  if (text.includes('поставщик')) return 'supplier'
  if (text.includes('нян') || text.includes('персонал') || text.includes('кандидат') || text.includes('сотрудник')) return 'candidate'
  if (text.includes('инцидент') || text.includes('расслед')) return 'incident'
  return 'request'
}

export default async function handler(req, res) {
  setNoStore(res)

  const admin = verifyAdminRequest(req, res, { scope: 'risk-intelligence-from-request' })
  if (!admin.ok) return res.status(admin.status).json({ ok: false, error: admin.error })

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}
    const lead = body.lead || {}
    const sourceRequestId = clean(body.source_request_id || lead._crm?.lead_id || lead.id || lead.lead_id || lead.uuid, 160)

    if (!sourceRequestId) {
      return res.status(400).json({ ok: false, error: 'Не удалось определить ID заявки для связки с объектом проверки.' })
    }

    const existing = await findRiskObjectBySourceRequest(sourceRequestId)
    if (existing.object) {
      return res.status(200).json({ ok: true, mode: existing.mode, object: existing.object, created: false, warning: existing.warning || '' })
    }

    const sourceLabel = clean(body.source_label || lead._crm?.lead_source || lead._source_table || 'CRM', 120)
    const topic = pickLeadTopic(lead)
    const contact = clean(lead.contact || [lead.email, lead.phone].filter(Boolean).join(' · '), 260)
    const description = [
      `Создано из заявки CRM: ${sourceLabel}/${sourceRequestId}.`,
      topic ? `Запрос: ${topic}.` : '',
      contact ? `Контакт: ${contact}.` : '',
      pickLeadMessage(lead)
    ].filter(Boolean).join('\n')

    const result = await createRiskObject({
      title: `Заявка: ${pickLeadTitle(lead)}`,
      object_type: mapObjectType(lead),
      status: 'in_work',
      risk_level: 'unknown',
      summary: description,
      source_request_id: sourceRequestId
    })

    return res.status(result.ok ? 200 : 400).json({ ...result, created: true })
  } catch (error) {
    return res.status(200).json({
      ok: true,
      mode: 'demo',
      created: true,
      object: {
        id: `demo-${Date.now()}`,
        title: 'Демо-объект из заявки CRM',
        object_type: 'request',
        status: 'in_work',
        risk_level: 'unknown',
        summary: 'Fallback-режим. Supabase или SQL stage 3 пока не настроены.'
      },
      warning: error?.message || 'Fallback mode'
    })
  }
}
