export const COOKIE_NAME = 'heimdall_analyst_session'
export const DEFAULT_TTL_SECONDS = 60 * 60 * 8

function base64UrlEncode(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  const base64 = typeof btoa === 'function'
    ? btoa(binary)
    : Buffer.from(bytes).toString('base64')
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function base64UrlDecode(input) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  if (typeof atob === 'function') {
    const binary = atob(padded)
    return new Uint8Array([...binary].map((char) => char.charCodeAt(0)))
  }
  return new Uint8Array(Buffer.from(padded, 'base64'))
}

function constantTimeEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false
  let mismatch = 0
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index)
  }
  return mismatch === 0
}

async function signPayload(payload, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return base64UrlEncode(new Uint8Array(signature))
}

export function getAuthSecret(env = {}) {
  return env.HEIMDALL_ANALYST_SECRET || env.HEIMDALL_ANALYST_PASSWORD || ''
}

export async function createAnalystSession({ login, role = 'analyst', ttlSeconds = DEFAULT_TTL_SECONDS }, secret) {
  if (!secret) throw new Error('HEIMDALL_ANALYST_SECRET is not configured')
  const now = Math.floor(Date.now() / 1000)
  const payload = base64UrlEncode(JSON.stringify({ login, role, iat: now, exp: now + ttlSeconds }))
  const signature = await signPayload(payload, secret)
  return `${payload}.${signature}`
}

export async function verifyAnalystSession(token, secret) {
  if (!token || !secret || typeof token !== 'string' || !token.includes('.')) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null
  const expected = await signPayload(payload, secret)
  if (!constantTimeEqual(signature, expected)) return null

  try {
    const decodedBytes = base64UrlDecode(payload)
    const json = new TextDecoder().decode(decodedBytes)
    const session = JSON.parse(json)
    const now = Math.floor(Date.now() / 1000)
    if (!session.exp || session.exp < now) return null
    return session
  } catch (error) {
    return null
  }
}

export function analystCookieOptions({ maxAge = DEFAULT_TTL_SECONDS } = {}) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  }
}
