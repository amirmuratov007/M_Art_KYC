import path from 'path'
import { Readable } from 'stream'
import { getHeimdallSaBaseUrl } from '@/lib/heimdallSaConfig'
import { verifyInternalRequest } from '@/lib/internalAccess'
import { createHeimdallSaSignedHeaders } from '@/lib/heimdallSaAuth'

const ALLOWED_EXTENSIONS = new Set(['.html', '.htm', '.docx', '.pdf'])

function normalizeReportPath(value) {
  if (!value || typeof value !== 'string' || value.length > 2000) return ''

  try {
    const decoded = decodeURIComponent(value)
    if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.includes('\\') || decoded.includes('\0')) return ''

    const parsed = new URL(decoded, 'http://heimdall.internal')
    const segments = parsed.pathname.split('/')
    if (segments.includes('..')) return ''
    if (!ALLOWED_EXTENSIONS.has(path.extname(parsed.pathname).toLowerCase())) return ''
    return `${parsed.pathname}${parsed.search}`
  } catch (_) {
    return ''
  }
}

function safeFilename(reportPath) {
  const filename = path.basename(reportPath.split('?')[0] || 'heimdall-report')
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_') || 'heimdall-report'
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const access = await verifyInternalRequest(req, res, { scope: 'heimdall-sa-report' })
  if (!access.ok) {
    return res.status(access.status).json({ ok: false, error: access.error })
  }

  const reportPath = normalizeReportPath(req.query?.path)
  if (!reportPath) {
    return res.status(400).json({ ok: false, error: 'Некорректная ссылка на справку' })
  }

  try {
    const baseUrl = getHeimdallSaBaseUrl()
    const upstream = await fetch(new URL(reportPath, `${baseUrl}/`), {
      headers: createHeimdallSaSignedHeaders({ method: 'GET', path: reportPath }),
      signal: AbortSignal.timeout(60 * 1000)
    })

    if (!upstream.ok || !upstream.body) {
      return res.status(upstream.status || 502).json({ ok: false, error: 'Справка недоступна' })
    }

    const extension = path.extname(reportPath.split('?')[0]).toLowerCase()
    const contentType = upstream.headers.get('content-type') || (extension === '.docx'
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : extension === '.pdf'
        ? 'application/pdf'
        : 'text/html; charset=utf-8')

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'private, no-store, max-age=0')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Content-Disposition', `${extension === '.html' || extension === '.htm' || extension === '.pdf' ? 'inline' : 'attachment'}; filename="${safeFilename(reportPath)}"`)

    if (extension === '.html' || extension === '.htm') {
      res.setHeader('Content-Security-Policy', "sandbox; default-src 'none'; style-src 'unsafe-inline'; img-src data: blob:")
    }

    Readable.fromWeb(upstream.body).pipe(res)
  } catch (_) {
    return res.status(502).json({ ok: false, error: 'Не удалось открыть справку Heimdall-SA' })
  }
}
