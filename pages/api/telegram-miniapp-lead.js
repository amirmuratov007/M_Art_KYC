import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { applyRateLimitHeaders, checkRateLimit, hasSpamHoneypot, isPayloadTooLarge } from '@/lib/rateLimit'
import { cleanMultiline, cleanText, rejectCrossSiteRequest, rejectNonPost, setJsonSecurityHeaders, setNoStore } from '@/lib/apiSecurity'
import { validateTelegramInitData, validateTelegramInitDataThirdParty } from '@/lib/telegramWebAppAuth'

const levelLabels = {
  low: 'низкий',
  medium: 'средний',
  high: 'высокий'
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TG_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.TG_CHAT_ID

  if (!token || !chatId) return { ok: false, skipped: true }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    })
    const data = await response.json().catch(() => ({}))
    return response.ok && data.ok !== false
      ? { ok: true }
      : { ok: false, error: data.description || `Telegram API error ${response.status}` }
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
        type: 'telegram_miniapp_lead',
        language: 'ru',
        name: payload.name,
        company: payload.company,
        contact: payload.contact,
        topic: payload.scenario,
        message: payload.message,
        created_at: new Date().toISOString()
      }
    ])

    return error ? { ok: false, error: error.message || 'Supabase insert error' } : { ok: true }
  } catch (error) {
    return { ok: false, error: error.message || 'Supabase unavailable' }
  }
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonPost(req, res)) return
  if (rejectCrossSiteRequest(req, res)) return

  const rate = checkRateLimit(req, { scope: 'telegram-miniapp-lead', limit: 4, windowMs: 60 * 1000 })
  applyRateLimitHeaders(res, rate)

  if (!rate.ok) {
    return res.status(429).json({ ok: false, error: 'Слишком много запросов. Попробуйте ещё раз через минуту.' })
  }

  if (hasSpamHoneypot(req.body)) return res.status(200).json({ ok: true, blocked: true })
  if (isPayloadTooLarge(req.body, 10000)) return res.status(413).json({ ok: false, error: 'Слишком большой запрос' })

  const body = req.body || {}
  const initData = String(body.initData || '')
  let telegramIdentity = null

  if (initData) {
    const token = process.env.TELEGRAM_MINIAPP_BOT_TOKEN
    const botId = process.env.TELEGRAM_MINIAPP_BOT_ID || '8523170241'
    const hasThirdPartySignature = new URLSearchParams(initData).has('signature')
    const validation = hasThirdPartySignature
      ? validateTelegramInitDataThirdParty(initData, botId, { maxAgeSeconds: 24 * 60 * 60 })
      : validateTelegramInitData(initData, token, { maxAgeSeconds: 24 * 60 * 60 })

    if (!validation.ok) {
      return res.status(401).json({ ok: false, error: 'Сессия Telegram недействительна. Откройте приложение заново.' })
    }

    telegramIdentity = validation.user
  }

  const name = cleanText(body.name, 160)
  const contact = cleanText(body.contact, 180)
  const company = cleanText(body.company, 180)
  const comment = cleanMultiline(body.comment, 1200)
  const scenario = cleanText(body.scenario, 180)
  const riskLevel = ['low', 'medium', 'high'].includes(body.riskLevel) ? body.riskLevel : ''
  const hasRiskScore = body.riskScore !== null && body.riskScore !== undefined && body.riskScore !== ''
  const numericScore = hasRiskScore ? Number(body.riskScore) : Number.NaN
  const riskScore = Number.isFinite(numericScore) ? Math.max(0, Math.min(100, Math.round(numericScore))) : null
  const signals = Array.isArray(body.signals)
    ? body.signals.map((signal) => cleanText(signal, 220)).filter(Boolean).slice(0, 6)
    : []

  if (!name || !contact || !scenario) {
    return res.status(400).json({ ok: false, error: 'Заполните имя и контакт' })
  }

  const telegramId = telegramIdentity?.id ? String(telegramIdentity.id) : ''
  const telegramUsername = cleanText(telegramIdentity?.username, 80)
  const source = telegramIdentity ? 'Проверенная сессия Telegram' : 'Открыто в браузере'
  const scoreText = riskScore === null ? 'не рассчитан' : `${riskScore}/100`
  const levelText = riskLevel ? levelLabels[riskLevel] : 'не определён'
  const signalText = signals.length ? signals.map((signal, index) => `${index + 1}. ${signal}`).join('\n') : 'Не переданы'

  const message = [
    `Источник: ${source}`,
    telegramId ? `Telegram ID: ${telegramId}` : '',
    telegramUsername ? `Telegram username: @${telegramUsername}` : '',
    `Сценарий: ${scenario}`,
    `Предварительный риск: ${scoreText}, ${levelText}`,
    '',
    'Риск-сигналы:',
    signalText,
    '',
    'Комментарий:',
    comment || 'Без комментария'
  ].filter((line) => line !== '').join('\n')

  const telegramText = [
    'Новая заявка из HEIMDALL Риск-радара',
    '',
    `Имя: ${name}`,
    `Компания: ${company || 'Не указана'}`,
    `Контакт: ${contact}`,
    message
  ].join('\n')

  const [telegramResult, supabaseResult] = await Promise.all([
    sendTelegram(telegramText),
    saveLead({ name, company, contact, scenario, message })
  ])

  if (telegramResult.ok || supabaseResult.ok) return res.status(200).json({ ok: true })

  return res.status(500).json({ ok: false, error: 'Не удалось отправить запрос. Попробуйте позже.' })
}
