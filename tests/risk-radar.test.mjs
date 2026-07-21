import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function importSource(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), 'utf8')
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
}

const riskRadar = await importSource('../lib/riskRadar.js')
const telegramAuth = await importSource('../lib/telegramWebAppAuth.js')

function signInitData(values, botToken) {
  const entries = Object.entries(values).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
  const checkString = entries.map(([key, value]) => `${key}=${value}`).join('\n')
  const secret = createHmac('sha256', 'WebAppData').update(botToken).digest()
  const hash = createHmac('sha256', secret).update(checkString).digest('hex')
  return new URLSearchParams([...entries, ['hash', hash]]).toString()
}

test('risk radar produces explainable low and high results', () => {
  const scenario = riskRadar.riskRadarScenarios[0]
  const safeAnswers = Object.fromEntries(scenario.questions.map((question) => [question.id, question.options[0].id]))
  const riskyAnswers = Object.fromEntries(scenario.questions.map((question) => [question.id, question.options.at(-1).id]))

  const safe = riskRadar.calculateRiskResult(scenario, safeAnswers)
  const risky = riskRadar.calculateRiskResult(scenario, riskyAnswers)

  assert.equal(safe.level, 'low')
  assert.equal(safe.score, 0)
  assert.equal(safe.signals.length, 0)
  assert.equal(risky.level, 'high')
  assert.ok(risky.score >= 80)
  assert.ok(risky.signals.length >= 5)
  assert.ok(risky.actions.length >= 4)
})

test('daily cases and progress are deterministic and bounded', () => {
  const date = new Date(2026, 6, 21, 12, 0, 0)
  assert.equal(riskRadar.getDailyRiskCase(date).id, riskRadar.getDailyRiskCase(date).id)
  assert.equal(riskRadar.getDateKey(date), '2026-07-21')
  assert.equal(riskRadar.calculateStreak(['2026-07-19', '2026-07-20', '2026-07-21'], date), 3)

  const normalized = riskRadar.normalizeRiskRadarProgress({ xp: -10, assessments: new Array(40).fill({}), daily: null })
  assert.equal(normalized.xp, 0)
  assert.equal(normalized.assessments.length, 30)
  assert.deepEqual(normalized.daily, {})
})

test('Telegram init data accepts a fresh valid signature', () => {
  const token = '123456:test-token'
  const nowMs = Date.UTC(2026, 6, 21, 8, 0, 0)
  const authDate = Math.floor(nowMs / 1000) - 30
  const raw = signInitData({
    auth_date: String(authDate),
    query_id: 'AAEAAAE',
    user: JSON.stringify({ id: 8678851817, first_name: 'Artyr', username: 'v_arturov' })
  }, token)

  const result = telegramAuth.validateTelegramInitData(raw, token, { nowMs, maxAgeSeconds: 3600 })
  assert.equal(result.ok, true)
  assert.equal(result.user.id, 8678851817)
  assert.equal(result.user.username, 'v_arturov')
})

test('Telegram init data rejects tampering and expiration', () => {
  const token = '123456:test-token'
  const nowMs = Date.UTC(2026, 6, 21, 8, 0, 0)
  const fresh = signInitData({
    auth_date: String(Math.floor(nowMs / 1000) - 10),
    user: JSON.stringify({ id: 100, first_name: 'Test' })
  }, token)
  const tampered = fresh.replace('Test', 'Admin')
  const expired = signInitData({
    auth_date: String(Math.floor(nowMs / 1000) - 7200),
    user: JSON.stringify({ id: 100, first_name: 'Test' })
  }, token)

  assert.equal(telegramAuth.validateTelegramInitData(tampered, token, { nowMs, maxAgeSeconds: 3600 }).ok, false)
  assert.equal(telegramAuth.validateTelegramInitData(expired, token, { nowMs, maxAgeSeconds: 3600 }).ok, false)
})
