import { NextResponse } from 'next/server'

export function middleware(request) {
  const proto = request.headers.get('x-forwarded-proto')
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  if (process.env.NODE_ENV === 'production' && proto === 'http') {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  if (host === 'heimdall-group.ru') {
    url.host = 'www.heimdall-group.ru'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
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
