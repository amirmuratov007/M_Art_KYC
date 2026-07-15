import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { isPrivateAnalyticsPath, normalizeAnalyticsPath, sanitizeAnalyticsReferrer } from '@/lib/analyticsPrivacy'

function sendInternalPageview(path) {
  if (typeof window === 'undefined') return

  const payload = {
    path,
    referrer: sanitizeAnalyticsReferrer(document.referrer),
    language: navigator.language || '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    screen: window.screen ? `${window.screen.width}x${window.screen.height}` : ''
  }

  const body = JSON.stringify(payload)

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/analytics-event', blob)
      return
    }
  } catch (_) {
    // Fall back to fetch below.
  }

  fetch('/api/analytics-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true
  }).catch(() => {})
}

function sendExternalPageview(path, analyticsAllowed) {
  if (typeof window === 'undefined' || !analyticsAllowed) return false

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const ymId = process.env.NEXT_PUBLIC_YM_ID

  if (gaId && window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: `${window.location.origin}${path}`,
      page_path: path,
      page_title: document.title || 'HEIMDALL'
    })
  }

  if (ymId && window.ym) {
    window.ym(Number(ymId), 'hit', path, { title: '' })
  }

  return (!gaId || Boolean(window.gtag)) && (!ymId || Boolean(window.ym))
}

export default function HeimdallAnalytics({ analyticsAllowed = false }) {
  const router = useRouter()
  const lastInternalPath = useRef('')
  const lastExternalPath = useRef('')

  useEffect(() => {
    const track = (url) => {
      const path = normalizeAnalyticsPath(url)
      if (!analyticsAllowed || isPrivateAnalyticsPath(path)) return

      if (lastInternalPath.current !== path) {
        lastInternalPath.current = path
        sendInternalPageview(path)
      }

      if (lastExternalPath.current !== path && sendExternalPageview(path, analyticsAllowed)) {
        lastExternalPath.current = path
      }
    }

    const timer = window.setTimeout(() => {
      track(window.location.pathname)
    }, 700)

    router.events.on('routeChangeComplete', track)

    return () => {
      window.clearTimeout(timer)
      router.events.off('routeChangeComplete', track)
    }
  }, [analyticsAllowed, router.events])

  return null
}
