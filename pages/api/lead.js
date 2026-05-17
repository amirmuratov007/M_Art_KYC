import { getSupabaseAdmin } from '@/lib/supabaseAdmin'

async function sendTelegramMessage(payload) {
  const token = process.env.TG_TOKEN
  const chatId = process.env.TG_CHAT_ID

  if (!token || !chatId) {
    return { ok: false, skipped: true }
  }

  const text = [
    'Новая заявка с сайта HEIMDALL',
    '',
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

  return response.json()
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
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
      source: 'heimdall-website'
    }

    const supabase = getSupabaseAdmin()

    const { error } = await supabase
      .from('leads')
      .insert(payload)

    if (error) {
      console.error(error)
      return res.status(500).json({ ok: false, error: error.message })
    }

    const telegramResult = await sendTelegramMessage(payload)

    return res.status(200).json({
      ok: true,
      telegram: telegramResult
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      ok: false,
      error: error.message || 'Internal server error'
    })
  }
}
