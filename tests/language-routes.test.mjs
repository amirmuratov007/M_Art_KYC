import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { detectSiteLanguage, getLanguageHref, languageRoutePairs } from '../lib/languageRoutes.mjs'

const projectRoot = path.resolve(import.meta.dirname, '..')

function routeFile(route) {
  const pathname = route.split('?')[0]
  if (pathname === '/') return path.join(projectRoot, 'pages', 'index.js')
  return path.join(projectRoot, 'pages', `${pathname.slice(1)}.js`)
}

test('all registered language routes point to existing pages', () => {
  for (const [ruPath, enPath] of languageRoutePairs) {
    assert.equal(fs.existsSync(routeFile(ruPath)), true, `Missing Russian route ${ruPath}`)
    assert.equal(fs.existsSync(routeFile(enPath)), true, `Missing English route ${enPath}`)
  }
})

test('language switching is symmetric for core service pages', () => {
  const pairs = [
    ['/proverka-postavshchika-iz-kitaya', '/china-supplier-verification'],
    ['/private-staff-check', '/private-staff-check-en'],
    ['/security-outsourcing', '/security-outsourcing-en'],
    ['/proverka-sobstvennika-kvartiry', '/apartment-owner-verification']
  ]

  for (const [ruPath, enPath] of pairs) {
    assert.equal(getLanguageHref(ruPath, 'ru', ruPath), enPath)
    assert.equal(getLanguageHref(enPath, 'en', enPath), ruPath)
  }
})

test('language detection uses routes and explicit query values', () => {
  assert.equal(detectSiteLanguage('/china-supplier-verification', '/china-supplier-verification'), 'en')
  assert.equal(detectSiteLanguage('/proverka-postavshchika-iz-kitaya', '/proverka-postavshchika-iz-kitaya'), 'ru')
  assert.equal(detectSiteLanguage('/due-diligence', '/due-diligence?lang=en'), 'en')
  assert.equal(detectSiteLanguage('/due-diligence', '/due-diligence?lang=ru'), 'ru')
})

test('switching preserves relevant query parameters', () => {
  assert.equal(getLanguageHref('/risk-test', 'ru', '/risk-test?test=private_staff'), '/risk-test-en?test=private_staff')
})
