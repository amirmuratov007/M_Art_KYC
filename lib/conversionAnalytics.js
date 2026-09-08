import { normalizeAnalyticsPath, sanitizeAnalyticsReferrer } from '@/lib/analyticsPrivacy'
import { normalizeConversionEvent } from '@/lib/conversionEvents.mjs'

const CONSENT_KEY = 'heimdall_cookie_consent'

function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch (_) {
    return false
  }
}

export function trackConversion(value) {
  const event = normalizeConversionEvent(value)
  if (!event || !hasAnalyticsConsent()) return false

  const path = normalizeAnalyticsPath(window.location.pathname)
  const payload = {
    event,
    path,
    referrer: sanitizeAnalyticsReferrer(document.referrer),
    language: navigator.language || '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    screen: window.screen ? `${window.screen.width}x${window.screen.height}` : ''
  }
  const body = JSON.stringify(payload)

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics-event', new Blob([body], { type: 'application/json' }))
    } else {
      fetch('/api/analytics-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true
      }).catch(() => {})
    }
  } catch (_) {
    // Analytics must never interrupt the customer action.
  }

  const ymId = Number(process.env.NEXT_PUBLIC_YM_ID)
  if (ymId && typeof window.ym === 'function') {
    window.ym(ymId, 'reachGoal', event)
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, { page_path: path })
  }

  return true
}
