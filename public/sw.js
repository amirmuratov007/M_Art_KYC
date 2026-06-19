const CACHE_NAME = 'heimdall-safe-cache-v4'

self.addEventListener('install', (event) => {
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
  if (url.pathname.startsWith('/analyst')) {
    event.respondWith(fetch(request))
    return
  }

  event.respondWith(fetch(request).catch(() => new Response('', { status: 504 })))
})
