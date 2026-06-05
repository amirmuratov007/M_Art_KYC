import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeimdallLogo from '@/components/HeimdallLogo'
import ContactModal from '@/components/ContactModal'
import { Menu, X, ChevronDown, UserRound } from 'lucide-react'

const ruMenu = [
  {
    title: 'Услуги',
    href: '/services',
    items: [
      ['Проверка контрагентов', '/proverka-kontragenta'],
      ['Проверка кандидатов', '/proverka-kandidatov'],
      ['Проверка бенефициаров', '/proverka-beneficiarov'],
      ['AML / KYC', '/aml-kyc-russia'],
      ['Due Diligence', '/due-diligence-russia']
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
      ['Клиентское приложение', '/client-app'],
      ['Скачать приложение', '/app-download'],
      ['Демо-кабинет', '/demo-client-app'],
      ['Личный кабинет', '/account'],
      ['Примеры отчетов', '/sample-reports']
    ]
  },
  {
    title: 'Материалы',
    href: '/journal',
    items: [
      ['Журнал', '/journal'],
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
      ['CFO Screening', '/cfo-screening-en'],
      ['Procurement Risk Check', '/procurement-risk-check-en'],
      ['Background Check', '/background-check']
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
      ['Business Intelligence Support', '/business-intelligence-support-en'],
      ['Client Application', '/client-app-en'],
      ['Download App', '/app-download-en'],
      ['Demo Dashboard', '/demo-client-app-en'],
      ['Client Account', '/account'],
      ['Sample Reports', '/sample-reports-en']
    ]
  },
  {
    title: 'Resources',
    href: '/journal-en',
    items: [
      ['Journal', '/journal-en'],
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

                <div className="absolute left-1/2 top-full z-[9999] h-4 w-80 -translate-x-1/2" />

                <div className={`absolute left-1/2 top-[calc(100%+12px)] z-[9999] w-80 -translate-x-1/2 rounded-[26px] border border-white/15 bg-[#050816] p-3 shadow-[0_35px_100px_rgba(0,0,0,0.88)] ring-1 ring-sky-300/10 transition duration-200 ${activeDropdown === group.title ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
                  {group.items.map(([label, itemHref]) => (
                    <Link key={itemHref} href={itemHref} className="block rounded-2xl px-4 py-3 text-sm text-white/78 transition hover:bg-white/10 hover:text-[#F7D784]">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <Link href="/account" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-sky-300/30 hover:text-sky-100">
              <UserRound className="h-4 w-4" />
              {ru ? 'Кабинет' : 'Account'}
            </Link>

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
        <div className="fixed inset-0 z-[9999] bg-[#050816] text-white lg:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(37,99,235,0.20),transparent_35%),linear-gradient(135deg,#050816_0%,#08111f_55%,#050816_100%)]" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <HeimdallLogo href={ru ? '/' : '/en'} />
              <button type="button" onClick={() => setMobileOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <div className="grid gap-4 pb-8">
                <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-3 rounded-[24px] border border-sky-300/20 bg-sky-300/10 px-4 py-4 text-base font-semibold text-sky-100">
                  <UserRound className="h-5 w-5" />
                  {ru ? 'Личный кабинет' : 'Client Account'}
                </Link>

                {menu.map((group) => (
                  <div key={group.title} className="rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-2xl">
                    <Link href={group.href} onClick={() => setMobileOpen(false)} className="mb-4 block text-xs uppercase tracking-[0.24em] text-[#F7D784]">
                      {group.title}
                    </Link>
                    <div className="grid gap-2">
                      {group.items.map(([label, itemHref]) => (
                        <Link key={itemHref} href={itemHref} onClick={() => setMobileOpen(false)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-base font-medium text-white/82">
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
