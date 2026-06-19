import { COOKIE_NAME, createAnalystSession, getAuthSecret, analystCookieOptions } from '../../../lib/analystSession'

function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index)
  }
  return mismatch === 0
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`]
  if (options.maxAge != null) parts.push(`Max-Age=${options.maxAge}`)
  if (options.path) parts.push(`Path=${options.path}`)
  if (options.httpOnly) parts.push('HttpOnly')
  if (options.secure) parts.push('Secure')
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`)
  return parts.join('; ')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const expectedLogin = process.env.HEIMDALL_ANALYST_LOGIN || ''
  const expectedPassword = process.env.HEIMDALL_ANALYST_PASSWORD || ''
  const secret = getAuthSecret(process.env)

  if (!expectedLogin || !expectedPassword || !secret) {
    return res.status(500).json({
      ok: false,
      error: 'Доступ не настроен. Добавь HEIMDALL_ANALYST_LOGIN, HEIMDALL_ANALYST_PASSWORD и HEIMDALL_ANALYST_SECRET в Vercel.',
    })
  }

  const { login = '', password = '' } = req.body || {}
  const loginOk = safeCompare(String(login), expectedLogin)
  const passwordOk = safeCompare(String(password), expectedPassword)

  if (!loginOk || !passwordOk) {
    return res.status(401).json({ ok: false, error: 'Неверный логин или пароль.' })
  }

  const token = await createAnalystSession({ login: expectedLogin, role: process.env.HEIMDALL_ANALYST_ROLE || 'analyst' }, secret)
  res.setHeader('Set-Cookie', serializeCookie(COOKIE_NAME, token, analystCookieOptions()))
  return res.status(200).json({ ok: true })
}
