import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

function normalizePath(url) {
  if (typeof window === 'undefined') return '/'

  try {
    const parsed = new URL(url || window.location.href, window.location.origin)
    return `${parsed.pathname}${parsed.search}` || '/'
  } catch (_) {
    return window.location.pathname + window.location.search || '/'
  }
}

function sendInternalPageview(path) {
  if (typeof window === 'undefined') return

  const payload = {
    path,
    title: document.title || '',
    referrer: document.referrer || '',
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
  if (typeof window === 'undefined' || !analyticsAllowed) return

  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const ymId = process.env.NEXT_PUBLIC_YM_ID

  if (gaId && window.gtag) {
    window.gtag('config', gaId, { page_path: path })
  }

  if (ymId && window.ym) {
    window.ym(Number(ymId), 'hit', path)
  }
}

export default function HeimdallAnalytics({ analyticsAllowed = false }) {
  const router = useRouter()
  const lastInternalPath = useRef('')
  const lastExternalPath = useRef('')

  useEffect(() => {
    const track = (url) => {
      const path = normalizePath(url)

      if (lastInternalPath.current !== path) {
        lastInternalPath.current = path
        sendInternalPageview(path)
      }

      if (analyticsAllowed && lastExternalPath.current !== path) {
        lastExternalPath.current = path
        sendExternalPageview(path, analyticsAllowed)
      }
    }

    const timer = window.setTimeout(() => {
      track(window.location.href)
    }, 500)

    router.events.on('routeChangeComplete', track)

    return () => {
      window.clearTimeout(timer)
      router.events.off('routeChangeComplete', track)
    }
  }, [analyticsAllowed, router.events])

  return null
}
