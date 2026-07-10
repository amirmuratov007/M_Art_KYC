import { Transform } from 'stream'
import { rejectCrossSiteRequest } from '@/lib/apiSecurity'
import { getHeimdallSaBaseUrl } from '@/lib/heimdallSaConfig'
import { verifyInternalRequest } from '@/lib/internalAccess'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false
  }
}

const MAX_BYTES = 500 * 1024 * 1024
const UPSTREAM_TIMEOUT_MS = 30 * 60 * 1000

function parseResponseText(text) {
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch (_) {
    return { error: text.slice(0, 4000) }
  }
}

function createLimitedUploadStream(req) {
  let size = 0

  const limiter = new Transform({
    transform(chunk, encoding, callback) {
      size += chunk.length
      if (size > MAX_BYTES) {
        callback(Object.assign(new Error('UPLOAD_TOO_LARGE'), { code: 'UPLOAD_TOO_LARGE' }))
        return
      }
      callback(null, chunk)
    }
  })

  req.pipe(limiter)
  return limiter
}

function toProtectedReportUrl(value, baseUrl) {
  if (!value || typeof value !== 'string') return ''

  try {
    const upstreamBase = new URL(baseUrl)
    const resolved = new URL(value, upstreamBase)
    if (resolved.origin !== upstreamBase.origin) return ''
    const relativePath = `${resolved.pathname}${resolved.search}`
    return `/api/heimdall-sa/report?path=${encodeURIComponent(relativePath)}`
  } catch (_) {
    return ''
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (rejectCrossSiteRequest(req, res)) return

  const access = await verifyInternalRequest(req, res, { scope: 'heimdall-sa' })
  if (!access.ok) {
    return res.status(access.status).json({ ok: false, error: access.error })
  }

  const contentType = req.headers['content-type'] || ''
  if (!contentType.includes('multipart/form-data')) {
    return res.status(400).json({ error: 'Ожидался multipart/form-data' })
  }

  const contentLength = Number(req.headers['content-length'] || 0)
  if (Number.isFinite(contentLength) && contentLength > MAX_BYTES) {
    return res.status(413).json({ error: 'Общий размер загрузки превышает 500 МБ' })
  }

  try {
    const baseUrl = getHeimdallSaBaseUrl()
    const headers = { 'content-type': contentType }
    if (contentLength > 0) headers['content-length'] = String(contentLength)

    const upstream = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers,
      body: createLimitedUploadStream(req),
      duplex: 'half',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)
    })

    const text = await upstream.text()
    const payload = parseResponseText(text)

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: payload.error || payload.details || `Heimdall-SA вернул ошибку ${upstream.status}`
      })
    }

    const { structured_html: structuredHtml, ...safePayload } = payload
    return res.status(200).json({
      ...safePayload,
      structured_html_available: Boolean(structuredHtml),
      report_url: toProtectedReportUrl(payload.report_url, baseUrl),
      docx_url: toProtectedReportUrl(payload.docx_url, baseUrl)
    })
  } catch (error) {
    if (error?.code === 'UPLOAD_TOO_LARGE' || error?.cause?.code === 'UPLOAD_TOO_LARGE') {
      return res.status(413).json({ error: 'Общий размер загрузки превышает 500 МБ' })
    }

    if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
      return res.status(504).json({ error: 'Heimdall-SA не завершил проверку за 30 минут' })
    }

    return res.status(502).json({
      error: 'Heimdall-SA недоступен или вернул некорректный ответ'
    })
  }
}
