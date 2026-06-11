import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeimdallLogo from '@/components/HeimdallLogo'
import ContactModal from '@/components/ContactModal'
import { useHeimdallAuth } from '@/components/HeimdallAuthProvider'
import { Menu, X, ChevronDown, UserRound, LogOut, ShieldCheck } from 'lucide-react'

const ruMenu = [
  {
    title: 'Услуги',
    href: '/services',
    items: [
      ['Проверка контрагентов', '/proverka-kontragenta'],
      ['Проверка кандидатов', '/proverka-kandidatov'],
      ['Проверка домашнего персонала', '/private-staff-check'],
      ['Проверка бенефициаров', '/proverka-beneficiarov'],
      ['AML / KYC', '/aml-kyc-russia'],
      ['Due Diligence', '/due-diligence-russia'],
      ['Внутренние расследования', '/internal-investigations'],
      ['Единый прайс', '/pricing']
    ]
  },
  {
    title: 'Международные проверки',
    href: '/proverka-kontragenta-dubai',
    items: [
      ['Контрагент в Дубае', '/proverka-kontragenta-dubai'],
      ['Контрагент в Казахстане', '/proverka-kontragenta-kazakhstan'],
      ['Контрагент в Турции', '/proverka-kontragenta-turkey'],
      ['Поставщик из Китая', '/china-supplier-verification']
    ]
  },
  {
    title: 'Клиентам',
    href: '/business-support',
    items: [
      ['Комплексное сопровождение', '/business-support'],
      ['Служба безопасности на аутсорсе', '/security-outsourcing'],
      ['Внутренние расследования', '/internal-investigations'],
      ['Единый прайс', '/pricing'],
      ['Клиентское приложение', '/client-app'],
      ['Как работает кабинет', '/client-account-guide'],
      ['Личный кабинет', '/account'],
      ['Заказать услугу', '/account?tab=request'],
      ['Примеры отчетов', '/sample-reports']
    ]
  },
  {
    title: 'Материалы',
    href: '/journal',
    items: [
      ['Журнал', '/journal'],
      ['Риск-тесты', '/risk-test'],
      ['Чек-лист поставщика', '/supplier-checklist'],
      ['Кейсы', '/cases'],
      ['Методология', '/methodology'],
      ['Центр доверия', '/trust-center'],
      ['Источники данных', '/data-sources'],
      ['FAQ', '/faq']
    ]
  }
]

const enMenu = [
  {
    title: 'Services',
    href: '/services-en',
    items: [
      ['Corporate Intelligence', '/corporate-intelligence'],
      ['Executive Background Check', '/executive-background-check-en'],
      ['Household Staff Check', '/private-staff-check-en'],
      ['CFO Screening', '/cfo-screening-en'],
      ['Procurement Risk Check', '/procurement-risk-check-en'],
      ['Background Check', '/background-check'],
      ['Internal Investigations', '/internal-investigations-en'],
      ['Pricing', '/pricing-en']
    ]
  },
  {
    title: 'International',
    href: '/counterparty-check-dubai-en',
    items: [
      ['Counterparty Check Dubai', '/counterparty-check-dubai-en'],
      ['Counterparty Check Kazakhstan', '/counterparty-check-kazakhstan-en'],
      ['Counterparty Check Turkey', '/counterparty-check-turkey-en'],
      ['China Supplier Verification', '/china-supplier-verification-en']
    ]
  },
  {
    title: 'AML / Sanctions',
    href: '/sanctions-screening-dubai-en',
    items: [
      ['PEP Screening', '/pep-screening-en'],
      ['OFAC Screening', '/ofac-screening-en'],
      ['UBO Verification', '/ubo-verification-en'],
      ['Sanctions Screening Dubai', '/sanctions-screening-dubai-en']
    ]
  },
  {
    title: 'Client Access',
    href: '/business-support-en',
    items: [
      ['Business Support', '/business-support-en'],
      ['Security Outsourcing', '/security-outsourcing-en'],
      ['Internal Investigations', '/internal-investigations-en'],
      ['Pricing', '/pricing-en'],
      ['Business Intelligence Support', '/business-intelligence-support-en'],
      ['Client Application', '/client-app-en'],
      ['How Account Works', '/client-account-guide-en'],
      ['Client Account', '/account'],
      ['Request a service', '/account?tab=request'],
      ['Sample Reports', '/sample-reports-en']
    ]
  },
  {
    title: 'Resources',
    href: '/journal-en',
    items: [
      ['Journal', '/journal-en'],
      ['Risk tests', '/risk-test-en'],
      ['Supplier checklist', '/supplier-checklist-en'],
      ['Cases', '/cases-en'],
      ['Methodology', '/methodology-en'],
      ['Trust Center', '/trust-center-en'],
      ['Data Sources', '/data-sources-en'],
      ['FAQ', '/faq-en']
    ]
  }
]

const langMap = {
  '/': '/en',
  '/en': '/',
  '/account': '/account',
  '/client-account-guide': '/client-account-guide-en',
  '/client-account-guide-en': '/client-account-guide',

  '/proverka-kontragenta-dubai': '/counterparty-check-dubai-en',
  '/counterparty-check-dubai-en': '/proverka-kontragenta-dubai',
  '/proverka-kontragenta-kazakhstan': '/counterparty-check-kazakhstan-en',
  '/counterparty-check-kazakhstan-en': '/proverka-kontragenta-kazakhstan',
  '/proverka-kontragenta-turkey': '/counterparty-check-turkey-en',
  '/counterparty-check-turkey-en': '/proverka-kontragenta-turkey',
  '/china-supplier-verification': '/china-supplier-verification-en',
  '/china-supplier-verification-en': '/china-supplier-verification',

  '/business-support': '/business-support-en',
  '/business-support-en': '/business-support',
  '/security-outsourcing': '/security-outsourcing-en',
  '/security-outsourcing-en': '/security-outsourcing',
  '/internal-investigations': '/internal-investigations-en',
  '/internal-investigations-en': '/internal-investigations',
  '/pricing': '/pricing-en',
  '/pricing-en': '/pricing',
  '/private-staff-check': '/private-staff-check-en',
  '/private-staff-check-en': '/private-staff-check',
  '/supplier-checklist': '/supplier-checklist-en',
  '/supplier-checklist-en': '/supplier-checklist',
  '/risk-test': '/risk-test-en',
  '/risk-test-en': '/risk-test',
  '/business-intelligence-support-en': '/business-support',
  '/client-app': '/client-app-en',
  '/client-app-en': '/client-app',
  '/app-download': '/app-download-en',
  '/app-download-en': '/app-download',
  '/demo-client-app': '/demo-client-app-en',
  '/demo-client-app-en': '/demo-client-app',
  '/journal': '/journal-en',
  '/journal-en': '/journal',
  '/cases': '/cases-en',
  '/cases-en': '/cases',
  '/methodology': '/methodology-en',
  '/methodology-en': '/methodology',
  '/trust-center': '/trust-center-en',
  '/trust-center-en': '/trust-center',
  '/data-sources': '/data-sources-en',
  '/data-sources-en': '/data-sources',
  '/privacy': '/privacy-en',
  '/privacy-en': '/privacy',
  '/faq': '/faq-en',
  '/faq-en': '/faq',
  '/sample-reports': '/sample-reports-en',
  '/sample-reports-en': '/sample-reports',

  '/executive-background-check-en': '/proverka-kandidatov',
  '/cfo-screening-en': '/proverka-kandidatov',
  '/procurement-risk-check-en': '/proverka-kontragenta',
  '/pep-screening-en': '/aml-kyc-russia',
  '/ofac-screening-en': '/aml-kyc-russia',
  '/ubo-verification-en': '/proverka-beneficiarov',
  '/sanctions-screening-dubai-en': '/aml-kyc-russia'
}

function detectLanguage(pathname) {
  if (pathname === '/en') return 'en'
  if (pathname.endsWith('-en')) return 'en'
  if (pathname.startsWith('/journal-en')) return 'en'
  return 'ru'
}

export default function HeimdallNav({ language }) {
  const router = useRouter()
  const currentLanguage = language || detectLanguage(router.pathname)
  const ru = currentLanguage === 'ru'
  const menu = ru ? ruMenu : enMenu
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const languageHref = langMap[router.pathname] || (ru ? '/en' : '/')
  const { user, signOut } = useHeimdallAuth()
  const displayName = user?.user_metadata?.full_name || user?.email || ''
  const shortName = displayName.length > 28 ? `${displayName.slice(0, 25)}...` : displayName

  async function handleLogout() {
    await signOut()
    setMobileOpen(false)
    if (router.pathname === '/account') {
      router.push('/account')
    }
  }

  return (
    <>
      <header className="relative z-[9000] border-b border-white/10 bg-[#050816]/95 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-5">
          <HeimdallLogo href={ru ? '/' : '/en'} />

          <nav className="hidden items-center gap-1 lg:flex">
            {menu.map((group) => (
              <div
                key={group.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(group.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={group.href} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/7 hover:text-[#F7D784]">
                  {group.title}
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Link>

                <div className={`absolute left-1/2 top-full z-[9999] w-80 -translate-x-1/2 pt-3 transition duration-200 ${activeDropdown === group.title ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
                  <div className="rounded-[26px] border border-white/15 bg-[#050816] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.88)] ring-1 ring-sky-300/10">
                    {group.items.map(([label, itemHref]) => (
                      <Link key={itemHref} href={itemHref} className="block rounded-2xl px-4 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-[#F7D784]">
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('auth-user')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href="/account" className="inline-flex max-w-[260px] items-center gap-2 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-sm text-[#F7D784] transition hover:border-[#D6A84F]/45">
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span className="truncate">{shortName}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </Link>

                <div className={`absolute right-0 top-full z-[9999] w-72 pt-3 transition duration-200 ${activeDropdown === 'auth-user' ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
                  <div className="rounded-[26px] border border-white/15 bg-[#050816] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.88)] ring-1 ring-sky-300/10">
                    <div className="mb-2 rounded-2xl border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-3 text-xs leading-5 text-[#F7D784]">
                      {ru ? 'Вы вошли как' : 'Signed in as'}<br />
                      <span className="break-all text-white/80">{displayName}</span>
                    </div>
                    <Link href="/account" className="block rounded-2xl px-4 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-[#F7D784]">
                      {ru ? 'Личный кабинет' : 'Client Account'}
                    </Link>
                    <Link href="/account?tab=request" className="block rounded-2xl px-4 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-[#F7D784]">
                      {ru ? 'Заказать услугу' : 'Request a service'}
                    </Link>
                    <button type="button" onClick={handleLogout} className="mt-2 flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm text-red-100/85 transition hover:bg-red-300/10">
                      <LogOut className="h-4 w-4" />
                      {ru ? 'Выйти' : 'Sign out'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/account" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-sky-300/30 hover:text-sky-100">
                <UserRound className="h-4 w-4" />
                {ru ? 'Кабинет' : 'Account'}
              </Link>
            )}

            <Link href={languageHref} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              {ru ? 'EN' : 'RU'}
            </Link>

            <button type="button" onClick={() => setContactOpen(true)} className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.22)]">
              {ru ? 'Связаться' : 'Contact'}
            </button>
          </div>

          <button type="button" onClick={() => setMobileOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] overflow-x-hidden bg-[#050816] text-white lg:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(37,99,235,0.20),transparent_35%),linear-gradient(135deg,#050816_0%,#08111f_55%,#050816_100%)]" />

          <div className="relative z-10 flex h-dvh min-h-screen flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <HeimdallLogo href={ru ? '/' : '/en'} />
              <button type="button" onClick={() => setMobileOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5">
              <div className="grid gap-4 pb-8">
                {user ? (
                  <div className="rounded-[24px] border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-4">
                    <div className="flex items-center gap-3 text-[#F7D784]">
                      <ShieldCheck className="h-5 w-5 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs uppercase tracking-[0.18em] text-[#F7D784]/70">{ru ? 'Авторизован' : 'Signed in'}</div>
                        <div className="truncate text-base font-semibold text-white">{displayName}</div>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Link href="/account" onClick={() => setMobileOpen(false)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-center text-sm font-semibold text-white">
                        {ru ? 'Кабинет' : 'Account'}
                      </Link>
                      <Link href="/account?tab=request" onClick={() => setMobileOpen(false)} className="rounded-2xl bg-[#D6A84F] px-4 py-4 text-center text-sm font-semibold text-[#050816]">
                        {ru ? 'Заказать услугу' : 'Request'}
                      </Link>
                    </div>
                    <button type="button" onClick={handleLogout} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm font-semibold text-red-100">
                      <LogOut className="h-4 w-4" />
                      {ru ? 'Выйти' : 'Sign out'}
                    </button>
                  </div>
                ) : (
                  <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-3 rounded-[24px] border border-sky-300/20 bg-sky-300/10 px-4 py-4 text-base font-semibold text-sky-100">
                    <UserRound className="h-5 w-5" />
                    {ru ? 'Личный кабинет' : 'Client Account'}
                  </Link>
                )}

                {menu.map((group) => (
                  <div key={group.title} className="min-w-0 rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
                    <Link href={group.href} onClick={() => setMobileOpen(false)} className="mb-4 block text-xs uppercase tracking-[0.24em] text-[#F7D784]">
                      {group.title}
                    </Link>
                    <div className="grid gap-2">
                      {group.items.map(([label, itemHref]) => (
                        <Link key={itemHref} href={itemHref} onClick={() => setMobileOpen(false)} className="break-words rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-base font-medium leading-6 text-white/82">
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                  <Link href={languageHref} onClick={() => setMobileOpen(false)} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center text-sm font-semibold text-white">
                    {ru ? 'EN' : 'RU'}
                  </Link>

                  <button type="button" onClick={() => { setMobileOpen(false); setContactOpen(true) }} className="rounded-2xl bg-sky-500 px-4 py-4 text-center text-sm font-semibold text-white">
                    {ru ? 'Связаться' : 'Contact'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language={currentLanguage} />
    </>
  )
}
