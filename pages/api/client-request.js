import { createClient } from '@supabase/supabase-js'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

import { applyRateLimitHeaders, checkRateLimit, getClientIp, hasSpamHoneypot, isPayloadTooLarge } from '@/lib/rateLimit'
import { cleanMultiline, cleanText, rejectNonPost, setJsonSecurityHeaders, setNoStore } from '@/lib/apiSecurity'
function getAnonClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  return createClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  })
}

async function verifyUser(req) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''

  if (!token) {
    return { ok: false, status: 401, error: 'Auth token required' }
  }

  const supabase = getAnonClient()
  const { data, error } = await supabase.auth.getUser(token)

  if (error || !data?.user) {
    return { ok: false, status: 401, error: 'Invalid session' }
  }

  return { ok: true, user: data.user }
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TG_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TG_CHAT_ID

  if (!token || !chatId) {
    return { ok: false, skipped: true, error: 'Telegram credentials missing' }
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      })
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

async function saveLead(payload) {
  const table = process.env.SUPABASE_LEADS_TABLE || 'heimdall_leads'

  try {
    const supabase = getSupabaseAdmin()
    const { error } = await supabase.from(table).insert([
      {
        type: 'client_request',
        language: 'ru',
        name: payload.name,
        company: payload.company,
        contact: payload.contact,
        topic: payload.topic,
        message: payload.message,
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

  const ipRate = checkRateLimit(req, { scope: 'client-request-ip', limit: 20, windowMs: 60 * 1000 })
  applyRateLimitHeaders(res, ipRate)

  if (!ipRate.ok) {
    return res.status(429).json({
      ok: false,
      error: 'Слишком много запросов. Попробуйте еще раз через минуту.'
    })
  }

  if (hasSpamHoneypot(req.body)) {
    return res.status(200).json({ ok: true, blocked: true })
  }

  if (isPayloadTooLarge(req.body, 9000)) {
    return res.status(413).json({ ok: false, error: 'Слишком большой текст заявки' })
  }

  let auth

  try {
    auth = await verifyUser(req)
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Auth check failed' })
  }

  if (!auth.ok) {
    return res.status(auth.status).json({ ok: false, error: auth.error })
  }

  const user = auth.user

  const userRate = checkRateLimit(req, {
    scope: 'client-request-user',
    identifier: user.id || getClientIp(req),
    limit: 10,
    windowMs: 60 * 1000
  })
  applyRateLimitHeaders(res, userRate)

  if (!userRate.ok) {
    return res.status(429).json({
      ok: false,
      error: 'Слишком много запросов. Попробуйте еще раз через минуту.'
    })
  }

  const body = req.body || {}

  const service = cleanText(body.service, 160)
  const urgency = cleanText(body.urgency, 80)
  const subject = cleanText(body.subject, 220)
  const details = cleanMultiline(body.details, 4000)
  const company = cleanText(body.company || user.user_metadata?.company || '', 220)
  const fullName = cleanText(body.fullName || user.user_metadata?.full_name || user.email || '', 220)
  const contact = cleanText(body.contact || user.email || '', 220)

  if (!service || !subject || !details) {
    return res.status(400).json({
      ok: false,
      error: 'Заполните направление, тему и описание задачи'
    })
  }

  const topic = `Клиентский кабинет: ${service}`
  const message = [
    `Срочность: ${urgency || 'Не указана'}`,
    `Тема: ${subject}`,
    '',
    details,
    '',
    `Supabase user_id: ${user.id}`,
    `Email аккаунта: ${user.email || 'Не указан'}`
  ].join('\n')

  const telegramText = [
    '🛡️ Новый запрос из личного кабинета HEIMDALL',
    '',
    `Клиент: ${fullName}`,
    `Компания: ${company || 'Не указана'}`,
    `Контакт: ${contact}`,
    `Направление: ${service}`,
    `Срочность: ${urgency || 'Не указана'}`,
    `Тема: ${subject}`,
    '',
    'Описание:',
    details,
    '',
    `User ID: ${user.id}`,
    `Email: ${user.email || 'Не указан'}`
  ].join('\n')

  const [telegramResult, supabaseResult] = await Promise.all([
    sendTelegram(telegramText),
    saveLead({
      name: fullName,
      company,
      contact,
      topic,
      message
    })
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
