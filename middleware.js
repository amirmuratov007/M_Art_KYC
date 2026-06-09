import { NextResponse } from 'next/server'

function isLocalOrInternalHost(hostname) {
  return (
    !hostname ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname.endsWith('.local') ||
    hostname.startsWith('localhost:') ||
    hostname.startsWith('127.0.0.1:') ||
    hostname.startsWith('0.0.0.0:')
  )
}

function getHostWithoutPort(value = '') {
  return value.split(',')[0].trim().replace(/^https?:\/\//, '').split('/')[0].split(':')[0]
}

export function middleware(request) {
  const proto = request.headers.get('x-forwarded-proto')
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = request.headers.get('host') || ''
  const effectiveHost = getHostWithoutPort(forwardedHost || host)
  const rawHost = getHostWithoutPort(host)
  const url = request.nextUrl.clone()

  const isProduction = process.env.NODE_ENV === 'production'
  const isPublicRequest = !isLocalOrInternalHost(effectiveHost)
  const isOnlyInternalHost = isLocalOrInternalHost(rawHost) && !forwardedHost

  // Beget/Passenger can pass requests to Next.js as localhost:3000.
  // Never redirect to https://localhost:3000. Only canonicalize real public hosts.
  if (isProduction && isPublicRequest && !isOnlyInternalHost) {
    if (proto === 'http') {
      url.protocol = 'https:'
      url.host = forwardedHost || host
      return NextResponse.redirect(url, 308)
    }

    if (effectiveHost === 'heimdall-group.ru') {
      url.protocol = 'https:'
      url.host = 'www.heimdall-group.ru'
      return NextResponse.redirect(url, 308)
    }
  }

  const response = NextResponse.next()

  response.headers.set('X-HEIMDALL-Security', 'enabled')
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|android-chrome-192x192.png|android-chrome-512x512.png).*)'
  ]
}
