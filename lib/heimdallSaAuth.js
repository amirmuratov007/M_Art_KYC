import crypto from 'crypto'

const SIGNATURE_VERSION = 'v1'
export const HEIMDALL_SA_SIGNATURE_MAX_AGE_MS = 2 * 60 * 1000

function getSigningSecret() {
  const secret = process.env.HEIMDALL_SA_SIGNING_SECRET || process.env.HEIMDALL_ADMIN_SECRET || ''
  if (!secret) throw new Error('Heimdall-SA signing secret is not configured')
  return secret
}

function normalizeMetadata(metadata = {}) {
  return {
    method: String(metadata.method || '').toUpperCase(),
    path: String(metadata.path || ''),
    timestamp: String(metadata.timestamp || ''),
    nonce: String(metadata.nonce || ''),
    contentLength: String(metadata.contentLength || '0'),
    contentType: String(metadata.contentType || '')
  }
}

function canonicalize(metadata) {
  const value = normalizeMetadata(metadata)
  return [
    SIGNATURE_VERSION,
    value.method,
    value.path,
    value.timestamp,
    value.nonce,
    value.contentLength,
    value.contentType
  ].join('\n')
}

function signMetadata(metadata) {
  return crypto.createHmac('sha256', getSigningSecret()).update(canonicalize(metadata)).digest('hex')
}

function timingSafeEqual(received, expected) {
  const a = Buffer.from(String(received || ''), 'utf8')
  const b = Buffer.from(String(expected || ''), 'utf8')
  return a.length > 0 && a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function createHeimdallSaSignedHeaders({ method, path, contentLength = 0, contentType = '' }) {
  const metadata = {
    method,
    path,
    timestamp: Date.now(),
    nonce: crypto.randomBytes(18).toString('hex'),
    contentLength,
    contentType
  }

  return {
    'x-heimdall-timestamp': String(metadata.timestamp),
    'x-heimdall-nonce': metadata.nonce,
    'x-heimdall-signature': signMetadata(metadata)
  }
}

export function verifyHeimdallSaSignature(metadata, signature) {
  const normalized = normalizeMetadata(metadata)
  const timestamp = Number(normalized.timestamp)
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() - timestamp) > HEIMDALL_SA_SIGNATURE_MAX_AGE_MS) return false
  if (!/^[a-f0-9]{36}$/i.test(normalized.nonce)) return false
  if (!['GET', 'POST'].includes(normalized.method)) return false
  return timingSafeEqual(signature, signMetadata(normalized))
}

export function isAllowedHeimdallSaRequest({ method, path }) {
  if (method === 'POST' && path === '/api/analyze') return true
  if (method === 'GET' && /^\/reports\/[a-zA-Z0-9._/-]+(?:\?[^\s]*)?$/.test(path) && !path.includes('..')) return true
  return false
}

