import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

async function sendTelegram({ token, chatId, text }) {
  if (!token || !chatId) {
    return { ok: false, skipped: true, error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' }
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
  })

  const data = await response.json().catch(() => ({}))
  return { ok: response.ok && data.ok, data }
}

async function saveSupportRequest(payload) {
  try {
    const supabase = getSupabaseAdmin()
    const tables = ['support_requests', 'contact_requests', 'leads']

    for (const table of tables) {
      const { error } = await supabase.from(table).insert(payload)
      if (!error) return { ok: true, table }
    }

    return { ok: false, error: 'No compatible Supabase table found' }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { name, company, contact, packageType, message, language } = req.body || {}

  if (!name || !contact) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
  }

  const createdAt = new Date().toISOString()
  const supportPayload = {
    name,
    company: company || null,
    contact,
    topic: 'Комплексное сопровождение',
    package_type: packageType || null,
    message: message || null,
    language: language === 'en' ? 'en' : 'ru',
    source: 'business_support_form',
    created_at: createdAt
  }

  const text = [
    '🛡️ Новая заявка HEIMDALL',
    '',
    'Направление: Комплексное сопровождение',
    `Язык: ${language === 'en' ? 'EN' : 'RU'}`,
    `Имя: ${name}`,
    `Компания: ${company || 'Не указана'}`,
    `Контакт: ${contact}`,
    `Формат: ${packageType || 'Не указан'}`,
    '',
    'Комментарий:',
    message || 'Без комментария'
  ].join('\n')

  const [telegramResult, supabaseResult] = await Promise.all([
    sendTelegram({
      token: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID,
      text
    }),
    saveSupportRequest(supportPayload)
  ])

  if (telegramResult.ok || supabaseResult.ok) {
    return res.status(200).json({
      ok: true,
      telegram: telegramResult.ok,
      supabase: supabaseResult.ok
    })
  }

  return res.status(500).json({
    ok: false,
    error: 'Support request was not delivered',
    telegram: telegramResult,
    supabase: supabaseResult
  })
}
