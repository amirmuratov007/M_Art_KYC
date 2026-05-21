import { useState } from 'react'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { ChevronDown, Menu, X } from 'lucide-react'

const menu = [
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
    title: 'Сопровождение',
    items: [
      ['Комплексное сопровождение бизнеса', '/business-support'],
      ['Клиентское приложение', '/client-app'],
      ['Прайс-лист сопровождения', '/business-support'],
      ['Примеры отчётов', '/sample-reports']
    ]
  },
  {
    title: 'Платформа',
    items: [
      ['Кейсы', '/cases'],
      ['Демо-отчёт', '/demo-report'],
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

export default function HeimdallNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="relative z-[100] border-b border-white/10 bg-[#050816]/95 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-5">
          <HeimdallLogo />

          <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
            {menu.map((group, index) => (
              <div key={group.title} className="group relative">
                <button className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/65 transition hover:bg-white/5 hover:text-[#F7D784] xl:px-4">
                  {group.title}
                  <ChevronDown className="h-4 w-4" />
                </button>

                <div className={`pointer-events-none absolute top-full w-80 translate-y-4 rounded-[28px] border border-white/10 bg-[#07101f]/98 p-3 opacity-0 shadow-2xl backdrop-blur-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-3 group-hover:opacity-100 ${index >= 2 ? 'right-0' : 'left-8'}`}>
                  {group.items.map(([label, href]) => (
                    <Link key={href} href={href} className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/7 hover:text-[#F7D784]">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex lg:flex">
            <Link href="/sample-reports-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">EN</Link>
            <Link href="/client-app" className="hidden rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-sm font-semibold text-[#F7D784] xl:inline-flex">Приложение</Link>
            <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white">Связаться</Link>
          </div>

          <button type="button" onClick={() => setOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden" aria-label="Открыть меню">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-[#050816] text-white lg:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(37,99,235,0.20),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_55%,#050816_100%)]" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <HeimdallLogo />

              <button type="button" onClick={() => setOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white" aria-label="Закрыть меню">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <div className="grid gap-4 pb-8">
                {menu.map((group) => (
                  <div key={group.title} className="rounded-[28px] border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-2xl">
                    <div className="mb-4 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
                      {group.title}
                    </div>

                    <div className="grid gap-2">
                      {group.items.map(([label, href]) => (
                        <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-base font-medium text-white/82 transition active:scale-[0.99]">
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-3">
                  <Link href="/sample-reports-en" onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center text-sm font-semibold text-white">
                    EN
                  </Link>

                  <Link href="/client-app" onClick={() => setOpen(false)} className="rounded-2xl border border-[#D6A84F]/30 bg-[#D6A84F]/15 px-4 py-4 text-center text-sm font-semibold text-[#F7D784]">
                    Приложение
                  </Link>
                </div>

                <Link href="/#lead" onClick={() => setOpen(false)} className="rounded-2xl bg-sky-500 px-4 py-4 text-center text-sm font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.22)]">
                  Связаться
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
