import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

import { applyRateLimitHeaders, checkRateLimit, hasSpamHoneypot, isPayloadTooLarge } from '@/lib/rateLimit'
import { cleanMultiline, cleanText, normalizeEmail, normalizePhone, rejectCrossSiteRequest, rejectNonPost, setJsonSecurityHeaders, setNoStore } from '@/lib/apiSecurity'
async function sendTelegramMessage(payload) {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TG_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TG_CHAT_ID

  if (!token || !chatId) {
    return { ok: false, skipped: true }
  }

  const text = [
    'Новая заявка с сайта HEIMDALL',
    '',
    `Язык: ${payload.locale || '—'}`,
    `Имя: ${payload.name || '—'}`,
    `Компания: ${payload.company || '—'}`,
    `Email: ${payload.email || '—'}`,
    `Телефон: ${payload.phone || '—'}`,
    `Тип проверки: ${payload.check_type || '—'}`,
    '',
    `Комментарий: ${payload.comment || '—'}`
  ].join('\n')

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text
    })
  })

  const result = await response.json().catch(() => ({}))
  return { ok: response.ok && result.ok !== false }
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonPost(req, res)) return
  if (rejectCrossSiteRequest(req, res)) return

  const rate = checkRateLimit(req, { scope: 'lead', limit: 5, windowMs: 60 * 1000 })
  applyRateLimitHeaders(res, rate)

  if (!rate.ok) {
    return res.status(429).json({
      ok: false,
      error: 'Слишком много запросов. Попробуйте еще раз через минуту.'
    })
  }

  if (hasSpamHoneypot(req.body)) {
    return res.status(200).json({ ok: true, blocked: true })
  }

  if (isPayloadTooLarge(req.body, 7000)) {
    return res.status(413).json({ ok: false, error: 'Слишком большой текст заявки' })
  }

  try {
    const body = req.body || {}

    const name = cleanText(body.name, 220)
    const phone = normalizePhone(body.phone)

    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        error: 'Name and phone are required'
      })
    }

    const payload = {
      name,
      company: cleanText(body.company, 220),
      email: normalizeEmail(body.email),
      phone,
      check_type: cleanText(body.check_type, 160),
      comment: cleanMultiline(body.comment, 2000),
      locale: cleanText(body.locale, 8) || 'ru',
      source: 'heimdall-website-final'
    }

    const supabase = getSupabaseAdmin()

    const { error } = await supabase
      .from('leads')
      .insert(payload)

    if (error) {
      return res.status(500).json({ ok: false, error: 'Lead storage failed' })
    }

    const telegram = await sendTelegramMessage(payload)

    return res.status(200).json({
      ok: true,
      saved: true,
      notified: Boolean(telegram?.ok)
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'Internal server error'
    })
  }
}
