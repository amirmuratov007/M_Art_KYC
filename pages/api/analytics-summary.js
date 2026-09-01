import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { verifyInternalRequest } from '@/lib/internalAccess'
import {
  cleanText,
  clientError,
  rejectNonGet,
  setJsonSecurityHeaders,
  setNoStore
} from '@/lib/apiSecurity'
import { isPrivateAnalyticsPath, normalizeAnalyticsPath, sanitizeAnalyticsReferrer } from '@/lib/analyticsPrivacy'

function getAuthToken(req) {
  const header = cleanText(req.headers.authorization || '', 300)
  if (header.toLowerCase().startsWith('bearer ')) {
    return header.slice(7).trim()
  }

  return cleanText(req.headers['x-analytics-token'] || '', 300)
}

function safeTokenEqual(received, expected) {
  const a = Buffer.from(String(received || ''), 'utf8')
  const b = Buffer.from(String(expected || ''), 'utf8')
  if (!a.length || a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
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

function moscowDateKey(dateValue) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(dateValue))
}

function buildDailySeries(rows, days, todayStart) {
  const counts = new Map(rows.map((row) => [moscowDateKey(row.created_at), 0]))
  for (const row of rows) {
    const key = moscowDateKey(row.created_at)
    counts.set(key, (counts.get(key) || 0) + 1)
  }

  return Array.from({ length: days }, (_, index) => {
    const offset = days - index - 1
    const key = moscowDateKey(new Date(todayStart.getTime() - offset * 24 * 60 * 60 * 1000))
    return { name: key, views: counts.get(key) || 0 }
  })
}

export default async function handler(req, res) {
  setNoStore(res)
  setJsonSecurityHeaders(res)

  if (rejectNonGet(req, res)) return

  const expectedToken = process.env.ANALYTICS_READ_TOKEN || process.env.HEIMDALL_ADMIN_SECRET
  const token = getAuthToken(req)

  if (!safeTokenEqual(token, expectedToken)) {
    const access = await verifyInternalRequest(req, res, { scope: 'analytics-summary' })
    if (!access.ok) return res.status(401).json(clientError('Unauthorized'))
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

    const rows = (data || [])
      .map((row) => ({
        ...row,
        path: normalizeAnalyticsPath(row.path),
        referrer: sanitizeAnalyticsReferrer(row.referrer)
      }))
      .filter((row) => !isPrivateAnalyticsPath(row.path))
    const todayStart = startOfMoscowDay()
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000)
    const uniqueVisitors = new Set(rows.map((row) => row.ip_hash).filter(Boolean)).size
    const todayViews = rows.filter((row) => new Date(row.created_at) >= todayStart).length
    const yesterdayViews = rows.filter((row) => {
      const createdAt = new Date(row.created_at)
      return createdAt >= yesterdayStart && createdAt < todayStart
    }).length
    const averageViewsPerVisitor = uniqueVisitors ? Number((rows.length / uniqueVisitors).toFixed(1)) : 0
    const todayChangePercent = yesterdayViews
      ? Math.round(((todayViews - yesterdayViews) / yesterdayViews) * 100)
      : null

    return res.status(200).json({
      ok: true,
      storageReady: true,
      periodDays: days,
      views: rows.length,
      uniqueVisitors,
      todayViews,
      yesterdayViews,
      averageViewsPerVisitor,
      todayChangePercent,
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
      dailyViews: buildDailySeries(rows, days, todayStart),
      generatedAt: new Date().toISOString()
    })
  } catch (error) {
    return res.status(200).json({ ok: true, storageReady: false, views: 0, message: 'Analytics storage is unavailable' })
  }
}
