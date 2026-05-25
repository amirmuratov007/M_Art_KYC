import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

function clean(value) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return { ok: false, error: 'Missing Telegram env variables' }
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
  })

  const data = await response.json().catch(() => null)

  if (!response.ok || !data?.ok) {
    return { ok: false, error: 'Telegram API error', details: data }
  }

  return { ok: true }
}

async function saveToSupabase(row) {
  try {
    const supabase = getSupabaseAdmin()

    const first = await supabase.from('lead_requests').insert(row)
    if (!first.error) return { ok: true, table: 'lead_requests' }

    const second = await supabase.from('requests').insert(row)
    if (!second.error) return { ok: true, table: 'requests' }

    console.error('Supabase insert failed:', first.error, second.error)
    return { ok: false, error: first.error?.message || second.error?.message || 'Supabase insert failed' }
  } catch (error) {
    console.error('Supabase unavailable:', error)
    return { ok: false, error: error?.message || 'Supabase unavailable' }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = req.body || {}
  const name = clean(body.name)
  const company = clean(body.company)
  const contact = clean(body.contact)
  const topic = clean(body.topic) || 'Общий запрос'
  const message = clean(body.message)
  const language = body.language === 'en' ? 'en' : 'ru'

  if (!name || !contact) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
  }

  const payload = { name, company, contact, topic, message, language }

  const text = [
    '🛡️ Новая заявка HEIMDALL',
    '',
    'Тип: общая форма',
    `Язык: ${language === 'en' ? 'EN' : 'RU'}`,
    `Имя: ${name}`,
    `Компания: ${company || 'Не указана'}`,
    `Контакт: ${contact}`,
    `Тема: ${topic}`,
    '',
    'Комментарий:',
    message || 'Без комментария'
  ].join('\n')

  const telegramResult = await sendTelegram(text)

  if (!telegramResult.ok) {
    return res.status(500).json({
      ok: false,
      error: telegramResult.error || 'Telegram failed',
      details: telegramResult.details || null
    })
  }

  const supabaseResult = await saveToSupabase({
    source: 'website_contact_form',
    language,
    name,
    company: company || null,
    contact,
    topic,
    message: message || null,
    status: 'new',
    payload
  })

  return res.status(200).json({
    ok: true,
    telegram: true,
    supabase: supabaseResult.ok,
    supabaseTable: supabaseResult.table || null
  })
}
