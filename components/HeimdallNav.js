import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { ChevronDown } from 'lucide-react'

const menuRu = [
  {
    title: 'Услуги',
    items: [
      ['Проверка контрагентов', '/proverka-kontragenta'],
      ['Проверка кандидатов', '/proverka-kandidatov'],
      ['AML / KYC', '/aml-kyc-russia'],
      ['Due Diligence', '/due-diligence-russia'],
      ['Проверка бенефициаров', '/proverka-beneficiarov'],
      ['Проверка руководителей', '/executive-screening']
    ]
  },
  {
    title: 'Платформа',
    items: [
      ['Кейсы', '/cases'],
      ['Демо-отчёт', '/demo-report'],
      ['Примеры отчётов', '/sample-reports'],
      ['Методология', '/methodology'],
      ['Прайс-лист', '/pricing']
    ]
  },
  {
    title: 'Клиентам',
    items: [
      ['Для кадровых агентств', '/recruitment-agencies'],
      ['Отрасли', '/sectors'],
      ['Журнал', '/journal'],
      ['Telegram', '/telegram'],
      ['Брендбук', '/brandbook']
    ]
  }
]

export default function HeimdallNav({ language = 'ru' }) {
  const menu = menuRu

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#050816]/82 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <HeimdallLogo />

        <nav className="hidden items-center gap-2 lg:flex">
          {menu.map((group) => (
            <div key={group.title} className="group relative">
              <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/65 transition hover:bg-white/5 hover:text-[#F7D784]">
                {group.title}
                <ChevronDown className="h-4 w-4" />
              </button>

              <div className="pointer-events-none absolute left-0 top-full w-80 translate-y-3 rounded-[28px] border border-white/10 bg-[#07101f]/96 p-3 opacity-0 shadow-2xl backdrop-blur-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-2 group-hover:opacity-100">
                {group.items.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-2xl px-4 py-3 text-sm text-white/62 transition hover:bg-white/7 hover:text-[#F7D784]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/sample-reports-en"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-[#D6A84F]/40 hover:text-[#F7D784]"
          >
            EN
          </Link>

          <Link
            href="/#lead"
            className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.25)]"
          >
            Связаться
          </Link>
        </div>
      </div>
    </header>
  )
}
