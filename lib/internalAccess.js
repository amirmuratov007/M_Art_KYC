import { verifyAdminRequest } from './adminAuth'
import { COOKIE_NAME, getAuthSecret, verifyAnalystSession } from './analystSession'
import { setJsonSecurityHeaders, setNoStore } from './apiSecurity'

function parseCookies(cookieHeader = '') {
  const cookies = {}

  for (const part of String(cookieHeader || '').split(';')) {
    const [rawName, ...rawValue] = part.trim().split('=')
    if (!rawName) continue

    try {
      cookies[rawName] = decodeURIComponent(rawValue.join('=') || '')
    } catch (_) {
      cookies[rawName] = ''
    }
  }

  return cookies
}

export async function verifyInternalRequest(req, res, { scope = 'internal' } = {}) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  const cookies = parseCookies(req?.headers?.cookie || '')
  const token = cookies[COOKIE_NAME] || ''
  const session = await verifyAnalystSession(token, getAuthSecret(process.env))

  if (session) {
    return { ok: true, source: 'analyst-session', session }
  }

  const admin = verifyAdminRequest(req, res, { scope })
  if (admin.ok) return { ...admin, source: 'admin-secret' }
  return admin
}
