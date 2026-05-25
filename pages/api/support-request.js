import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

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
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, company, contact, packageType, message, language } = req.body || {}

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
