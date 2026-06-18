const CACHE_NAME = 'heimdall-client-app-v2'
const CORE_ASSETS = [
  '/',
  '/client-app',
  '/app-download',
  '/account',
  '/analyst/risk-intelligence',
  '/analyst/risk-intelligence/new',
  '/analyst/risk-intelligence/object',
  '/site.webmanifest',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => null)
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  )
  self.clients.claim()
})

function offlineResponse(message) {
  return new Response(message, {
    status: 503,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}

self.addEventListener('fetch', (event) => {
  const request = event.request

  if (request.method !== 'GET') return
  if (!request.url.startsWith(self.location.origin)) return

  const url = new URL(request.url)

  // Не подменяем внутренние страницы аналитики главной страницей.
  // Если маршрут временно недоступен, браузер должен показать реальную ошибку, а не вести на /.
  if (url.pathname.startsWith('/analyst/')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request).then((cached) => cached || offlineResponse('HEIMDALL analyst page is temporarily unavailable offline.')))
    )
    return
  }

  // Для Next.js chunks/data не используем fallback на главную, иначе динамические страницы могут открывать /.
  if (url.pathname.startsWith('/_next/')) {
    event.respondWith(fetch(request).catch(() => caches.match(request).then((cached) => cached || offlineResponse('HEIMDALL asset is temporarily unavailable offline.'))))
    return
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => null)
        return response
      })
      .catch(() => caches.match(request).then((cached) => cached || offlineResponse('HEIMDALL page is temporarily unavailable offline.')))
  )
})
