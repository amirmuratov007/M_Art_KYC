import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeimdallLogo from '@/components/HeimdallLogo'
import ContactModal from '@/components/ContactModal'
import { detectSiteLanguage, getLanguageHref, hasLanguageCounterpart } from '@/lib/languageRoutes.mjs'
import { Menu, X, ChevronDown, UserRound } from 'lucide-react'

const ruMenu = [
  {
    title: 'Услуги',
    href: '/services',
    items: [
      ['Проверка контрагентов', '/proverka-kontragenta'],
      ['Проверка кандидатов', '/proverka-kandidatov'],
      ['Проверка бенефициаров', '/proverka-beneficiarov'],
      ['Покупка квартиры, дома или авто', '/proverka-prodavca-pered-pokupkoy'],
      ['Аудит безопасности бизнеса', '/security-audit'],
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
      ['Поставщик из Китая', '/proverka-postavshchika-iz-kitaya']
    ]
  },
  {
    title: 'Клиентам',
    href: '/business-support',
    items: [
      ['Комплексное сопровождение', '/business-support'],
      ['Служба безопасности на аутсорсе', '/security-outsourcing'],
      ['Центр управления рисками', '/risk-command-center'],
      ['Центр риск-аналитики', '/risk-intelligence'],
      ['Внутренние расследования', '/internal-investigations'],
      ['Единый прайс', '/pricing'],
      ['Клиентское приложение', '/client-app'],
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
      ['Контакты', '/contact'],
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
      ['China Supplier Verification', '/china-supplier-verification']
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
      ['Risk Intelligence', '/risk-intelligence-en'],
      ['Internal Investigations', '/internal-investigations-en'],
      ['Pricing', '/pricing-en'],
      ['Business Intelligence Support', '/business-intelligence-support-en'],
      ['Client Application', '/client-app-en'],
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

export default function HeimdallNav({ language, languageHref: languageHrefOverride }) {
  const router = useRouter()
  const currentLanguage = language || detectSiteLanguage(router.pathname, router.asPath)
  const ru = currentLanguage === 'ru'
  const menu = ru ? ruMenu : enMenu
  const [mobileOpen, setMobileOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const languageAsPath = router.query.test && !router.asPath.includes('?')
    ? `${router.asPath}?test=${encodeURIComponent(router.query.test)}`
    : router.asPath
  const languageHref = languageHrefOverride || getLanguageHref(router.pathname, currentLanguage, languageAsPath)
  const canSwitchLanguage = hasLanguageCounterpart(router.pathname, router.asPath)

  return (
    <>
      <header className="heimdall-primary-nav relative z-[9000] border-b border-white/10 bg-[#050816]/95 backdrop-blur-2xl">
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
            <Link href="/account" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-sky-300/30 hover:text-sky-100">
              <UserRound className="h-4 w-4" />
              {ru ? 'Кабинет' : 'Account'}
            </Link>

            {canSwitchLanguage && (
              <Link href={languageHref} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                {ru ? 'EN' : 'RU'}
              </Link>
            )}

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
                <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-3 rounded-[24px] border border-sky-300/20 bg-sky-300/10 px-4 py-4 text-base font-semibold text-sky-100">
                  <UserRound className="h-5 w-5" />
                  {ru ? 'Личный кабинет' : 'Client Account'}
                </Link>

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

                <div className={`grid gap-3 ${canSwitchLanguage ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {canSwitchLanguage && (
                    <Link href={languageHref} onClick={() => setMobileOpen(false)} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center text-sm font-semibold text-white">
                      {ru ? 'EN' : 'RU'}
                    </Link>
                  )}

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
