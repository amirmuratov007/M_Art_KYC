import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

import { applyRateLimitHeaders, checkRateLimit, hasSpamHoneypot, isPayloadTooLarge } from '@/lib/rateLimit'
async function sendTelegramMessage(payload) {
  const token = process.env.TG_TOKEN
  const chatId = process.env.TG_CHAT_ID

  if (!token || !chatId) {
    console.log('Telegram skipped: TG_TOKEN or TG_CHAT_ID missing')
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

  const result = await response.json()
  console.log('Telegram result:', result)
  return result
}

export default async function handler(req, res) {
  console.log('/api/lead called:', req.method)

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

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

    if (!body.name || !body.phone) {
      return res.status(400).json({
        ok: false,
        error: 'Name and phone are required'
      })
    }

    const payload = {
      name: body.name || '',
      company: body.company || '',
      email: body.email || '',
      phone: body.phone || '',
      check_type: body.check_type || '',
      comment: body.comment || '',
      locale: body.locale || 'ru',
      source: 'heimdall-website-final'
    }

    const supabase = getSupabaseAdmin()

    const { error } = await supabase
      .from('leads')
      .insert(payload)

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ ok: false, error: error.message })
    }

    const telegram = await sendTelegramMessage(payload)

    return res.status(200).json({
      ok: true,
      saved: true,
      telegram
    })
  } catch (error) {
    console.error('Lead API error:', error)
    return res.status(500).json({
      ok: false,
      error: error.message || 'Internal server error'
    })
  }
}
