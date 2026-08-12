const routePairs = [
  ['/', '/en'],
  ['/services', '/services-en'],
  ['/services-cluster', '/services-cluster-en'],
  ['/business-support', '/business-support-en'],
  ['/security-outsourcing', '/security-outsourcing-en'],
  ['/risk-intelligence', '/risk-intelligence-en'],
  ['/internal-investigations', '/internal-investigations-en'],
  ['/pricing', '/pricing-en'],
  ['/client-app', '/client-app-en'],
  ['/app-download', '/app-download-en'],
  ['/client-account-guide', '/client-account-guide-en'],
  ['/client-portal', '/client-portal-en'],
  ['/demo-client-app', '/demo-client-app-en'],
  ['/demo-report', '/demo-report-en'],
  ['/intelligence-dashboard', '/intelligence-dashboard-en'],
  ['/journal', '/journal-en'],
  ['/cases', '/cases-en'],
  ['/methodology', '/methodology-en'],
  ['/trust-center', '/trust-center-en'],
  ['/data-sources', '/data-sources-en'],
  ['/privacy', '/privacy-en'],
  ['/faq', '/faq-en'],
  ['/sample-reports', '/sample-reports-en'],
  ['/risk-test', '/risk-test-en'],
  ['/supplier-checklist', '/supplier-checklist-en'],
  ['/private-staff-check', '/private-staff-check-en'],
  ['/social-intelligence', '/social-intelligence-en'],
  ['/sectors', '/sectors-en'],
  ['/brandbook', '/brandbook-en'],
  ['/proverka-postavshchika-iz-kitaya', '/china-supplier-verification'],
  ['/proverka-postavshchika', '/supplier-verification'],
  ['/proverka-kompanii-pered-avansom', '/company-check-before-advance-payment'],
  ['/proverka-kontragenta-pered-sdelkoy', '/counterparty-check-before-deal'],
  ['/proverka-zakupochnogo-podryadchika', '/procurement-contractor-check'],
  ['/proverka-zakupok', '/procurement-risk-check-en'],
  ['/komplaens-proverka-kontragenta', '/compliance-counterparty-check'],
  ['/proverka-kandidatov', '/background-check'],
  ['/proverka-kandidata-na-rukovodyashchuyu-dolzhnost', '/executive-background-check-en'],
  ['/proverka-direktora', '/director-background-check'],
  ['/proverka-beneficiarov', '/ubo-verification-en'],
  ['/proverka-sobstvennika-kvartiry', '/apartment-owner-verification'],
  ['/proverka-sobstvennika-avtomobilya', '/car-owner-verification'],
  ['/proverka-prodavca-pered-pokupkoy', '/seller-verification-before-purchase'],
  ['/proverka-kontragenta-dubai', '/counterparty-check-dubai-en'],
  ['/proverka-kontragenta-kazakhstan', '/counterparty-check-kazakhstan-en'],
  ['/proverka-kontragenta-turkey', '/counterparty-check-turkey-en'],
  ['/due-diligence-russia', '/due-diligence?lang=en'],
  ['/aml-kyc-russia', '/aml-kyc?lang=en']
]

const casePairs = [
  ['china-supplier-advance-payment', 'china-supplier-advance-payment'],
  ['kontragent-180m', 'counterparty-180m-contract'],
  ['procurement-conflict-of-interest', 'procurement-conflict-of-interest'],
  ['cfo-screening', 'cfo-screening'],
  ['hidden-beneficiary-chain', 'hidden-beneficiary-chain'],
  ['sanctions-risk-without-direct-match', 'sanctions-risk-without-direct-match'],
  ['due-diligence-investment', 'investment-due-diligence']
]

const journalPairs = [
  ['7-priznakov-toksichnogo-kontragenta', '7-signs-of-toxic-counterparty'],
  ['kak-proverit-postavshchika-pered-zakupkoy', 'how-to-verify-supplier-before-procurement'],
  ['vypiska-ne-pokazyvaet-realnyy-kontrol', 'registry-extract-does-not-prove-real-control'],
  ['proverka-finansovogo-direktora', 'screening-cfo-before-appointment'],
  ['chto-proveryat-pered-pokupkoy-doli', 'what-to-check-before-buying-business-stake'],
  ['kak-proverit-postavshchika-pered-avansom', 'check-supplier-before-advance-payment'],
  ['postavshchik-iz-kitaya-chto-proverit-do-oplaty', 'china-supplier-verification-before-first-payment'],
  ['proverka-kontragenta-pered-sdelkoy-chto-vazhno', 'counterparty-check-before-deal-what-matters'],
  ['kak-vyyavit-konflikt-interesov-v-zakupkah', 'detect-conflict-of-interest-in-procurement'],
  ['proverka-direktora-pered-naznacheniem', 'director-background-check-before-appointment'],
  ['komplaens-proverka-kontragenta-spiskov-nedostatochno', 'compliance-counterparty-check-lists-not-enough'],
  ['chto-proverit-pered-pokupkoy-doli-v-biznese', 'what-to-check-before-buying-business-stake-seo'],
  ['kandidat-v-sluzhbu-bezopasnosti-proverka', 'security-officer-candidate-screening']
]

const directMap = new Map()
const englishRoutes = new Set(['/en'])

function registerPair(ruPath, enPath) {
  directMap.set(ruPath, enPath)
  directMap.set(enPath.split('?')[0], ruPath)
  englishRoutes.add(enPath.split('?')[0])
}

routePairs.forEach(([ruPath, enPath]) => registerPair(ruPath, enPath))
casePairs.forEach(([ruSlug, enSlug]) => registerPair(`/cases/${ruSlug}`, `/cases-en/${enSlug}`))
journalPairs.forEach(([ruSlug, enSlug]) => registerPair(`/journal/${ruSlug}`, `/journal-en/${enSlug}`))

directMap.set('/china-supplier-verification-en', '/proverka-postavshchika-iz-kitaya')
directMap.set('/executive-background-check', '/proverka-kandidata-na-rukovodyashchuyu-dolzhnost')
directMap.set('/cfo-screening', '/proverka-kandidatov')
directMap.set('/cfo-screening-en', '/proverka-kandidatov')
directMap.set('/procurement-risk-check', '/proverka-zakupok')
directMap.set('/pep-screening', '/aml-kyc-russia')
directMap.set('/pep-screening-en', '/aml-kyc-russia')
directMap.set('/ofac-screening-en', '/aml-kyc-russia')
directMap.set('/sanctions-screening-dubai-en', '/aml-kyc-russia')
directMap.set('/business-intelligence-support-en', '/business-support')
directMap.set('/proverka-sobstvennika-dachi', '/seller-verification-before-purchase')

const extraEnglishRoutes = [
  '/china-supplier-verification-en',
  '/executive-background-check',
  '/cfo-screening',
  '/cfo-screening-en',
  '/procurement-risk-check',
  '/pep-screening',
  '/pep-screening-en',
  '/ofac-screening-en',
  '/sanctions-screening-dubai-en',
  '/business-intelligence-support-en'
]
extraEnglishRoutes.forEach((path) => englishRoutes.add(path))

function splitAsPath(asPath = '') {
  const [pathAndQuery, hash = ''] = asPath.split('#')
  const [pathname, query = ''] = pathAndQuery.split('?')
  return { pathname: pathname || '/', query, hash }
}

function preserveQuery(target, query, hash) {
  const targetHasQuery = target.includes('?')
  const params = new URLSearchParams(query)
  params.delete('lang')
  const suffix = params.toString()
  const withQuery = suffix ? `${target}${targetHasQuery ? '&' : '?'}${suffix}` : target
  return hash ? `${withQuery}#${hash}` : withQuery
}

export function detectSiteLanguage(pathname = '/', asPath = '') {
  const parsed = splitAsPath(asPath || pathname)
  const params = new URLSearchParams(parsed.query)
  if (params.get('lang') === 'en') return 'en'
  if (params.get('lang') === 'ru') return 'ru'
  const path = parsed.pathname || pathname
  if (englishRoutes.has(path) || path.startsWith('/journal-en') || path.startsWith('/cases-en') || path.endsWith('-en')) return 'en'
  return 'ru'
}

export function getLanguageHref(pathname = '/', currentLanguage, asPath = '') {
  const parsed = splitAsPath(asPath || pathname)
  const path = parsed.pathname || pathname
  const direct = directMap.get(path)
  if (direct) return preserveQuery(direct, parsed.query, parsed.hash)
  if (path.startsWith('/journal/')) return '/journal-en'
  if (path.startsWith('/journal-en/')) return '/journal'
  if (path.startsWith('/cases/')) return '/cases-en'
  if (path.startsWith('/cases-en/')) return '/cases'
  return currentLanguage === 'en' ? '/' : '/en'
}

export function hasLanguageCounterpart(pathname = '/', asPath = '') {
  const path = splitAsPath(asPath || pathname).pathname || pathname
  return directMap.has(path) || path.startsWith('/journal/') || path.startsWith('/journal-en/') || path.startsWith('/cases/') || path.startsWith('/cases-en/')
}

export const languageRoutePairs = routePairs
