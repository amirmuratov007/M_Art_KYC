const PRIVATE_PREFIXES = [
  '/account',
  '/admin-',
  '/analyst',
  '/app',
  '/client-portal'
]

const BOT_PATTERN = /bot|crawler|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|whatsapp|telegrambot|yandeximages|monitoring/i

export function normalizeAnalyticsPath(value) {
  try {
    const parsed = new URL(String(value || '/'), 'https://heimdall.invalid')
    const pathname = parsed.pathname.replace(/\/{2,}/g, '/').slice(0, 500)
    return pathname.startsWith('/') ? pathname || '/' : '/'
  } catch (_) {
    return '/'
  }
}

export function isPrivateAnalyticsPath(value) {
  const path = normalizeAnalyticsPath(value).toLowerCase()
  return PRIVATE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`) || (prefix.endsWith('-') && path.startsWith(prefix)))
}

export function sanitizeAnalyticsReferrer(value) {
  if (!value) return ''
  try {
    const parsed = new URL(String(value))
    if (!['http:', 'https:'].includes(parsed.protocol)) return ''
    return `${parsed.origin}${normalizeAnalyticsPath(parsed.pathname)}`.slice(0, 500)
  } catch (_) {
    return ''
  }
}

export function isLikelyBot(userAgent) {
  return BOT_PATTERN.test(String(userAgent || ''))
}

