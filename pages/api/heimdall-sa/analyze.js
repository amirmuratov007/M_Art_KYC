import { verifyAdminRequest } from '@/lib/adminAuth'
import { COOKIE_NAME, getAuthSecret, verifyAnalystSession } from '@/lib/analystSession'
import { getHeimdallSaBaseUrl } from '@/lib/heimdallSaConfig'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false
  }
}

const MAX_BYTES = 500 * 1024 * 1024

function parseResponseText(text) {
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch (_) {
    return { error: text }
  }
}

function parseCookies(cookieHeader = '') {
  return cookieHeader.split(';').reduce((acc, item) => {
    const [key, ...valueParts] = item.trim().split('=')
    if (!key) return acc
    acc[key] = decodeURIComponent(valueParts.join('=') || '')
    return acc
  }, {})
}

async function verifyHeimdallSaAccess(req, res) {
  const cookies = parseCookies(req.headers.cookie || '')
  const analystSession = await verifyAnalystSession(cookies[COOKIE_NAME], getAuthSecret(process.env))

  if (analystSession) {
    return { ok: true, source: 'analyst-session' }
  }

  return verifyAdminRequest(req, res, { scope: 'heimdall-sa' })
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0

    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BYTES) {
        reject(new Error('Слишком большой запрос'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })

    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const access = await verifyHeimdallSaAccess(req, res)
  if (!access.ok) {
    return res.status(access.status).json({ ok: false, error: access.error })
  }

  const contentType = req.headers['content-type'] || ''
  if (!contentType.includes('multipart/form-data')) {
    return res.status(400).json({ error: 'Ожидался multipart/form-data' })
  }

  try {
    const body = await readBody(req)
    const baseUrl = getHeimdallSaBaseUrl()
    const upstream = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: {
        'content-type': contentType,
        'content-length': String(body.length)
      },
      body
    })

    const text = await upstream.text()
    const payload = parseResponseText(text)

    if (!upstream.ok) {
      return res.status(upstream.status).json(payload)
    }

    return res.status(200).json({
      ...payload,
      heimdall_sa_base_url: baseUrl
    })
  } catch (error) {
    return res.status(502).json({
      error: 'Heimdall-SA недоступен или вернул некорректный ответ',
      details: error.message
    })
  }
}
