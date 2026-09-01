import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function importSource(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), 'utf8')
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
}

const analytics = await importSource('../lib/analyticsPrivacy.js')
const safeUrl = await importSource('../lib/safeUrl.js')
const heimdallSaAuth = await importSource('../lib/heimdallSaAuth.js')
const analystSession = await importSource('../lib/analystSession.js')

test('production headers block mixed content and unsafe downloads', async () => {
  const config = await readFile(new URL('../next.config.js', import.meta.url), 'utf8')
  assert.match(config, /upgrade-insecure-requests/)
  assert.match(config, /block-all-mixed-content/)
  assert.match(config, /X-Download-Options/)
  assert.match(config, /X-DNS-Prefetch-Control/)
})

test('analytics removes queries and excludes private workspaces', () => {
  assert.equal(analytics.normalizeAnalyticsPath('/pricing?email=private@example.com#form'), '/pricing')
  assert.equal(analytics.isPrivateAnalyticsPath('/analyst/heimdall-sa?subject=person'), true)
  assert.equal(analytics.isPrivateAnalyticsPath('/admin-crm'), true)
  assert.equal(analytics.isPrivateAnalyticsPath('/pricing'), false)
  assert.equal(analytics.sanitizeAnalyticsReferrer('https://example.com/search?q=secret'), 'https://example.com/search')
})

test('report links allow only local paths and HTTPS', () => {
  assert.equal(safeUrl.normalizeSafeReportUrl('/reports/result.pdf?download=1'), '/reports/result.pdf?download=1')
  assert.equal(safeUrl.normalizeSafeReportUrl('https://storage.example/report.pdf'), 'https://storage.example/report.pdf')
  assert.equal(safeUrl.normalizeSafeReportUrl('javascript:alert(1)'), '')
  assert.equal(safeUrl.normalizeSafeReportUrl('//evil.example/report.pdf'), '')
  assert.equal(safeUrl.normalizeSafeReportUrl('https://user:password@example.com/report.pdf'), '')
})

test('Heimdall-SA signatures bind method, path and upload metadata', () => {
  process.env.HEIMDALL_SA_SIGNING_SECRET = 'test-secret-at-least-32-characters-long'
  const path = '/api/analyze'
  const contentType = 'multipart/form-data; boundary=test'
  const headers = heimdallSaAuth.createHeimdallSaSignedHeaders({ method: 'POST', path, contentLength: 123, contentType })
  const metadata = {
    method: 'POST',
    path,
    timestamp: headers['x-heimdall-timestamp'],
    nonce: headers['x-heimdall-nonce'],
    contentLength: '123',
    contentType
  }
  assert.equal(heimdallSaAuth.isAllowedHeimdallSaRequest(metadata), true)
  assert.equal(heimdallSaAuth.verifyHeimdallSaSignature(metadata, headers['x-heimdall-signature']), true)
  assert.equal(heimdallSaAuth.verifyHeimdallSaSignature({ ...metadata, path: '/api/sbis-config' }, headers['x-heimdall-signature']), false)
})

test('production analyst sessions never fall back to the login password', () => {
  assert.equal(analystSession.getAuthSecret({ NODE_ENV: 'production', HEIMDALL_ANALYST_PASSWORD: 'password' }), '')
  assert.equal(analystSession.getAuthSecret({ NODE_ENV: 'development', HEIMDALL_ANALYST_PASSWORD: 'password' }), 'password')
})
