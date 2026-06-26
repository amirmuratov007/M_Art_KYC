const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const DANGEROUS_TAGS = /<\/?(script|iframe|object|embed|link|meta|style|base|form)\b[^>]*>/gi
const HTML_EVENT_ATTRIBUTES = /\son[a-z]+\s*=\s*(['"]).*?\1/gi
const JAVASCRIPT_URLS = /javascript\s*:/gi
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function setNoStore(res) {
  if (!res) return
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  res.setHeader('Surrogate-Control', 'no-store')
}

export function setJsonSecurityHeaders(res) {
  if (!res) return
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')
}

export function rejectNonPost(req, res) {
  if (req.method === 'POST') return false
  res.setHeader('Allow', 'POST')
  res.status(405).json({ ok: false, error: 'Method not allowed' })
  return true
}

export function rejectNonGet(req, res) {
  if (req.method === 'GET') return false
  res.setHeader('Allow', 'GET')
  res.status(405).json({ ok: false, error: 'Method not allowed' })
  return true
}

export function cleanText(value, maxLength = 2000) {
  return String(value || '')
    .replace(CONTROL_CHARS, ' ')
    .replace(DANGEROUS_TAGS, ' ')
    .replace(HTML_EVENT_ATTRIBUTES, ' ')
    .replace(JAVASCRIPT_URLS, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function cleanMultiline(value, maxLength = 4000) {
  return String(value || '')
    .replace(CONTROL_CHARS, ' ')
    .replace(DANGEROUS_TAGS, ' ')
    .replace(HTML_EVENT_ATTRIBUTES, ' ')
    .replace(JAVASCRIPT_URLS, '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
    .slice(0, maxLength)
}

export function normalizeEmail(value) {
  const email = cleanText(value, 254).toLowerCase()
  return EMAIL_PATTERN.test(email) ? email : ''
}

export function normalizePhone(value) {
  return cleanText(value, 80).replace(/[^\d+()\-\s.]/g, '').slice(0, 80)
}

export function hasSuspiciousContent(...values) {
  return values.some((value) => {
    const text = String(value || '')
    DANGEROUS_TAGS.lastIndex = 0
    HTML_EVENT_ATTRIBUTES.lastIndex = 0
    JAVASCRIPT_URLS.lastIndex = 0
    return DANGEROUS_TAGS.test(text) || HTML_EVENT_ATTRIBUTES.test(text) || JAVASCRIPT_URLS.test(text)
  })
}

export function clientError(message = 'Invalid request') {
  return { ok: false, error: message }
}
