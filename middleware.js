import { NextResponse } from 'next/server'
import { COOKIE_NAME, getAuthSecret, verifyAnalystSession } from './lib/analystSession'

const PUBLIC_ANALYST_PATHS = ['/analyst/login', '/analyst/logout']

function isPublicAnalystPath(pathname) {
  return PUBLIC_ANALYST_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}

function isAnalystApi(pathname) {
  return pathname.startsWith('/api/risk-intelligence')
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl

  if (isPublicAnalystPath(pathname)) {
    return NextResponse.next()
  }

  const secret = getAuthSecret(process.env)
  const token = request.cookies.get(COOKIE_NAME)?.value || ''
  const session = await verifyAnalystSession(token, secret)

  if (session) {
    const response = NextResponse.next()
    response.headers.set('x-robots-tag', 'noindex, nofollow, noarchive')
    return response
  }

  if (isAnalystApi(pathname)) {
    return NextResponse.json({ ok: false, error: 'Требуется вход в аналитическую зону HEIMDALL.' }, { status: 401 })
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/analyst/login'
  loginUrl.searchParams.set('next', `${pathname}${search || ''}`)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/analyst/:path*', '/api/risk-intelligence/:path*'],
}
