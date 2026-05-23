export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' })
  }

  const { name, company, contact, topic, message, language } = req.body || {}

  if (!name || !contact) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
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

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    })

    const data = await tg.json()
    if (!tg.ok || !data.ok) return res.status(500).json({ ok: false, details: data })

    return res.status(200).json({ ok: true })
  } catch (error) {
    return res.status(500).json({ ok: false })
  }
}
