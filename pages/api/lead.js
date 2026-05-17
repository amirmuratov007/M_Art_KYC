import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

const LOG_PREFIX = '[HEIMDALL_API_LEAD]'

function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function safeError(error) {
  if (!error) return 'Unknown error'
  if (typeof error === 'string') return error
  return error.message || JSON.stringify(error)
}

async function sendTelegramMessage(payload) {
  const token = process.env.TG_TOKEN
  const chatId = process.env.TG_CHAT_ID

  if (!token || !chatId) {
    console.warn(`${LOG_PREFIX} telegram skipped: TG_TOKEN or TG_CHAT_ID missing`, {
      has_token: Boolean(token),
      has_chat_id: Boolean(chatId)
    })
    return { ok: false, skipped: true, error: 'Missing TG_TOKEN or TG_CHAT_ID' }
  }

  const text = [
    '🛡 Новая заявка с сайта HEIMDALL',
    '',
    `Язык: ${payload.locale || '—'}`,
    `Имя: ${payload.name || '—'}`,
    `Компания: ${payload.company || '—'}`,
    `Email: ${payload.email || '—'}`,
    `Телефон: ${payload.phone || '—'}`,
    `Тип проверки: ${payload.check_type || '—'}`,
    '',
    `Комментарий: ${payload.comment || '—'}`,
    '',
    `Источник: ${payload.source || '—'}`
  ].join('\n')

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12000)

  try {
    console.log(`${LOG_PREFIX} telegram sendMessage started`, { chat_id: chatId })

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      }),
      signal: controller.signal
    })

    const result = await response.json().catch(() => ({}))
    console.log(`${LOG_PREFIX} telegram sendMessage finished`, {
      status: response.status,
      ok: response.ok,
      telegram_ok: result.ok,
      description: result.description || null
    })

    return {
      ok: response.ok && result.ok === true,
      status: response.status,
      result
    }
  } catch (error) {
    console.error(`${LOG_PREFIX} telegram sendMessage failed`, safeError(error))
    return { ok: false, error: safeError(error) }
  } finally {
    clearTimeout(timeout)
  }
}

export default async function handler(req, res) {
  const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  console.log(`${LOG_PREFIX} request started`, { request_id: requestId, method: req.method })

  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    console.warn(`${LOG_PREFIX} method not allowed`, { request_id: requestId, method: req.method })
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}

    const payload = {
      name: clean(body.name),
      company: clean(body.company),
      email: clean(body.email),
      phone: clean(body.phone),
      check_type: clean(body.check_type),
      comment: clean(body.comment),
      locale: clean(body.locale) || 'ru',
      source: 'heimdall-website-production'
    }

    console.log(`${LOG_PREFIX} payload received`, {
      request_id: requestId,
      locale: payload.locale,
      check_type: payload.check_type,
      has_name: Boolean(payload.name),
      has_phone: Boolean(payload.phone),
      has_email: Boolean(payload.email),
      has_company: Boolean(payload.company),
      comment_length: payload.comment.length
    })

    if (!payload.name || !payload.phone) {
      console.warn(`${LOG_PREFIX} validation failed`, { request_id: requestId })
      return res.status(400).json({ ok: false, error: 'Name and phone are required' })
    }

    console.log(`${LOG_PREFIX} supabase insert started`, { request_id: requestId })
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('leads')
      .insert(payload)
      .select('id')
      .single()

    if (error) {
      console.error(`${LOG_PREFIX} supabase insert failed`, { request_id: requestId, error })
      return res.status(500).json({ ok: false, error: `Supabase insert failed: ${error.message}` })
    }

    console.log(`${LOG_PREFIX} supabase insert success`, { request_id: requestId, lead_id: data?.id || null })

    const telegram = await sendTelegramMessage(payload)

    if (!telegram.ok) {
      console.warn(`${LOG_PREFIX} telegram did not confirm delivery`, {
        request_id: requestId,
        lead_id: data?.id || null,
        telegram
      })
    }

    console.log(`${LOG_PREFIX} request completed`, {
      request_id: requestId,
      lead_id: data?.id || null,
      telegram_ok: telegram.ok
    })

    return res.status(200).json({
      ok: true,
      saved: true,
      lead_id: data?.id || null,
      telegram
    })
  } catch (error) {
    console.error(`${LOG_PREFIX} request crashed`, { request_id: requestId, error: safeError(error) })
    return res.status(500).json({ ok: false, error: safeError(error) || 'Internal server error' })
  }
}
