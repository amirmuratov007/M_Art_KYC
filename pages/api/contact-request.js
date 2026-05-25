
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error('Missing Telegram variables')
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  })

  const data = await response.json()

  if (!response.ok || !data.ok) {
    throw new Error('Telegram API error')
  }
}

async function saveLead(payload, type = 'contact') {
  try {
    const supabase = getSupabaseAdmin()

    await supabase
      .from('heimdall_leads')
      .insert([
        {
          type,
          language: payload.language || 'ru',
          name: payload.name || '',
          company: payload.company || '',
          contact: payload.contact || '',
          topic: payload.topic || '',
          message: payload.message || '',
          created_at: new Date().toISOString()
        }
      ])
  } catch (error) {
    console.error(error)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false })
  }

  try {
    const { name, company, contact, topic, message, language } = req.body || {}

    if (!name || !contact) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields'
      })
    }

    const text = [
      '🛡️ Новая заявка HEIMDALL',
      '',
      `Язык: ${language === 'en' ? 'EN' : 'RU'}`,
      `Имя: ${name}`,
      `Компания: ${company || 'Не указана'}`,
      `Контакт: ${contact}`,
      `Тема: ${topic || 'Общий запрос'}`,
      '',
      'Комментарий:',
      message || 'Без комментария'
    ].join('\n')

    await sendTelegram(text)

    await saveLead({
      name,
      company,
      contact,
      topic,
      message,
      language
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      ok: false,
      error: error.message
    })
  }
}
