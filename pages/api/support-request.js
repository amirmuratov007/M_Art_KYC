export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Missing Telegram env variables' })
  }

  const { name, company, contact, packageType, message, language } = req.body || {}

  if (!name || !company || !contact) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
  }

  const text = [
    '🛡️ Новая заявка HEIMDALL',
    '',
    `Язык: ${language === 'en' ? 'EN' : 'RU'}`,
    `Имя: ${name}`,
    `Компания: ${company}`,
    `Контакт: ${contact}`,
    `Формат: ${packageType || 'Не указан'}`,
    '',
    'Комментарий:',
    message || 'Без комментария'
  ].join('\n')

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    })

    const data = await response.json()
    if (!response.ok || !data.ok) {
      return res.status(500).json({ ok: false, error: 'Telegram API error', details: data })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
