import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import {
  cleanText,
  clientError,
  rejectNonGet,
  setJsonSecurityHeaders,
  setNoStore
} from '@/lib/apiSecurity'

function getAuthToken(req) {
  const header = cleanText(req.headers.authorization || '', 300)
  if (header.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim()
  }

  return cleanText(req.headers['x-analytics-token'] || req.query.token || '', 300)
}

function countBy(items, keySelector, limit = 10) {
  const counts = new Map()

  for (const item of items) {
    const key = keySelector(item)
    if (!key) continue
    counts.set(key, (counts.get(key) || 0) + 1)
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, views]) => ({ name, views }))
}

function startOfMoscowDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)) - 3 * 60 * 60 * 1000)
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonGet(req, res)) return

  const expectedToken = process.env.ANALYTICS_READ_TOKEN || process.env.HEIMDALL_ADMIN_SECRET
  const token = getAuthToken(req)

  if (!expectedToken || token !== expectedToken) {
    return res.status(401).json(clientError('Unauthorized'))
  }

  const days = Math.min(Math.max(Number(req.query.days || 7), 1), 90)
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('heimdall_pageviews')
      .select('created_at,path,referrer,language,ip_hash')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: false })
      .limit(10000)

    if (error) {
      return res.status(200).json({ ok: true, storageReady: false, views: 0, message: 'Analytics storage is not ready' })
    }

    const rows = data || []
    const todayStart = startOfMoscowDay()
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000)
    const uniqueVisitors = new Set(rows.map((row) => row.ip_hash).filter(Boolean)).size
    const todayViews = rows.filter((row) => new Date(row.created_at) >= todayStart).length
    const yesterdayViews = rows.filter((row) => {
      const createdAt = new Date(row.created_at)
      return createdAt >= yesterdayStart && createdAt < todayStart
    }).length

    return res.status(200).json({
      ok: true,
      storageReady: true,
      periodDays: days,
      views: rows.length,
      uniqueVisitors,
      todayViews,
      yesterdayViews,
      topPages: countBy(rows, (row) => row.path || '/', 15),
      referrers: countBy(rows, (row) => {
        if (!row.referrer) return 'direct'
        try {
          return new URL(row.referrer).hostname || row.referrer
        } catch (_) {
          return row.referrer
        }
      }, 10),
      languages: countBy(rows, (row) => row.language || 'unknown', 10),
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    return res.status(200).json({ ok: true, storageReady: false, views: 0, message: 'Analytics storage is unavailable' })
  }
}
