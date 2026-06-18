// HEIMDALL service worker disabled.
// Previous versions cached internal analyst routes and could return the home page.

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.registration.unregister().catch(() => null),
      caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key)))).catch(() => null),
      self.clients.claim().catch(() => null)
    ])
  )
})

self.addEventListener('fetch', () => {
  // No fetch handler. Browser/Next.js handle all routes directly.
})
