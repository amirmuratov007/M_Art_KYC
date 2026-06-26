import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

import { applyRateLimitHeaders, checkRateLimit, hasSpamHoneypot, isPayloadTooLarge } from '@/lib/rateLimit'
import { cleanMultiline, cleanText, rejectNonPost, setJsonSecurityHeaders, setNoStore } from '@/lib/apiSecurity'
async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token) return { ok: false, error: 'TELEGRAM_BOT_TOKEN отсутствует в Vercel' }
  if (!chatId) return { ok: false, error: 'TELEGRAM_CHAT_ID отсутствует в Vercel' }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok || data.ok === false) {
      return {
        ok: false,
        error: data.description || `Telegram API error ${response.status}`
      }
    }

    return { ok: true }
  } catch (error) {
    return { ok: false, error: error.message || 'Telegram request failed' }
  }
}

async function saveSupabase(payload) {
  const table = process.env.SUPABASE_LEADS_TABLE || 'heimdall_leads'

  try {
    const supabase = getSupabaseAdmin()

    const { error } = await supabase.from(table).insert([
      {
        type: 'business_support',
        language: payload.language || 'ru',
        name: payload.name || '',
        company: payload.company || '',
        contact: payload.contact || '',
        topic: payload.packageType || '',
        message: payload.message || '',
        created_at: new Date().toISOString()
      }
    ])

    if (error) {
      return { ok: false, error: error.message || 'Supabase insert error' }
    }

    return { ok: true }
  } catch (error) {
    return { ok: false, error: error.message || 'Supabase unavailable' }
  }
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonPost(req, res)) return

  const rate = checkRateLimit(req, { scope: 'support-request', limit: 5, windowMs: 60 * 1000 })
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

  const body = req.body || {}
  const name = cleanText(body.name, 220)
  const company = cleanText(body.company, 220)
  const contact = cleanText(body.contact, 220)
  const packageType = cleanText(body.packageType, 220)
  const message = cleanMultiline(body.message, 2500)
  const language = cleanText(body.language, 8)

  if (!name || !company || !contact) {
    return res.status(400).json({
      ok: false,
      error: 'Заполните имя, компанию и контакт'
    })
  }

  const text = [
    '🛡️ Новая заявка на сопровождение HEIMDALL',
    '',
    `Язык: ${language === 'en' ? 'EN' : 'RU'}`,
    `Имя: ${name}`,
    `Компания: ${company}`,
    `Контакт: ${contact}`,
    `Пакет: ${packageType || 'Не указан'}`,
    '',
    'Комментарий:',
    message || 'Без комментария'
  ].join('\n')

  const [telegramResult, supabaseResult] = await Promise.all([
    sendTelegram(text),
    saveSupabase({ name, company, contact, packageType, message, language })
  ])

  if (telegramResult.ok || supabaseResult.ok) {
    return res.status(200).json({
      ok: true,
      telegram: telegramResult,
      supabase: supabaseResult
    })
  }

  return res.status(500).json({
    ok: false,
    error: [
      `Telegram: ${telegramResult.error}`,
      `Supabase: ${supabaseResult.error}`
    ].join(' | ')
  })
}
