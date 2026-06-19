import { COOKIE_NAME, getAuthSecret, verifyAnalystSession } from '../../../lib/analystSession'

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, item) => {
    const [rawKey, ...rawValue] = item.trim().split('=')
    if (!rawKey) return acc
    acc[rawKey] = decodeURIComponent(rawValue.join('='))
    return acc
  }, {})
}

export default async function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie || '')
  const session = await verifyAnalystSession(cookies[COOKIE_NAME], getAuthSecret(process.env))
  if (!session) return res.status(401).json({ ok: false })
  return res.status(200).json({ ok: true, role: session.role || 'analyst', login: session.login || '' })
}
