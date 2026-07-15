import { cleanText, clientError, rejectNonPost, setJsonSecurityHeaders, setNoStore } from '@/lib/apiSecurity'
import { applyRateLimitHeaders, checkRateLimit, isPayloadTooLarge } from '@/lib/rateLimit'
import { isAllowedHeimdallSaRequest, verifyHeimdallSaSignature } from '@/lib/heimdallSaAuth'

export default function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)
  if (rejectNonPost(req, res)) return

  const rate = checkRateLimit(req, { scope: 'heimdall-sa-authorize', limit: 240, windowMs: 60 * 1000 })
  applyRateLimitHeaders(res, rate)
  if (!rate.ok) return res.status(429).json(clientError('Too many requests'))
  if (isPayloadTooLarge(req.body, 10000)) return res.status(413).json(clientError('Payload too large'))

  const metadata = {
    method: cleanText(req.body?.method, 10).toUpperCase(),
    path: cleanText(req.body?.path, 2200),
    timestamp: cleanText(req.body?.timestamp, 30),
    nonce: cleanText(req.body?.nonce, 80),
    contentLength: cleanText(req.body?.contentLength, 30),
    contentType: cleanText(req.body?.contentType, 500)
  }
  const signature = cleanText(req.body?.signature, 128)

  if (!isAllowedHeimdallSaRequest(metadata) || !verifyHeimdallSaSignature(metadata, signature)) {
    return res.status(401).json(clientError('Unauthorized'))
  }

  return res.status(200).json({ ok: true })
}

