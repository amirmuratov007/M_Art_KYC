const CACHE_NAME = 'heimdall-app-cache-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['/account', '/site.webmanifest'])).catch(() => {})
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  if (!request.url.startsWith(self.location.origin)) return

  const url = new URL(request.url)
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/analyst')
  ) {
    event.respondWith(fetch(request))
    return
  }

  event.respondWith(
    fetch(request).catch(() => caches.match('/account').then((cached) => cached || new Response('', { status: 504 })))
  )
})
