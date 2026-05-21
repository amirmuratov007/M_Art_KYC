import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { ArrowRight, Smartphone, ShieldCheck, Bell, FileText, Gauge, LockKeyhole, Send } from 'lucide-react'

const features = [
  ['Dashboard', 'Статус сопровождения, активные проверки, риск-индекс и уведомления.'],
  ['Проверки', 'Контрагенты, кандидаты, бенефициары, поставщики и санкционные проверки.'],
  ['Отчёты', 'Доступ к PDF-отчётам, ключевым выводам и рекомендациям аналитика.'],
  ['Риск-сигналы', 'Новые судебные, санкционные, репутационные и структурные изменения.'],
  ['Запрос проверки', 'Клиент может быстро отправить новый объект на проверку.'],
  ['Закрытый доступ', 'Приложение доступно только клиентам на комплексном сопровождении.']
]

const screens = [
  ['Dashboard', Gauge],
  ['Checks', ShieldCheck],
  ['Reports', FileText],
  ['Signals', Bell],
  ['Request', Send]
]

export default function ClientAppPage() {
  return (
    <>
      <Head>
        <title>Клиентское приложение | HEIMDALL</title>
        <meta name="description" content="Клиентское приложение HEIMDALL для компаний на комплексном сопровождении бизнеса." />
        <link rel="canonical" href="https://www.heimdall-group.ru/client-app" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex items-center gap-3">
              <Link href="/client-app-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link>
              <Link href="/business-support" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Сопровождение</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <Smartphone className="h-4 w-4" />
              HEIMDALL Client App
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Приложение для клиентов на сопровождении
            </h1>

            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Закрытое мобильное приложение для компаний, которые подключили комплексное сопровождение бизнеса HEIMDALL. Клиент видит проверки, отчёты, риск-сигналы и может быстро отправить новый запрос аналитикам.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/business-support" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Подключить сопровождение
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Смотреть отчёты
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[48px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
            <div className="rounded-[38px] border border-[#D6A84F]/20 bg-[#07101f] p-5 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]/80">Client Access</div>
                  <div className="mt-1 text-xl font-semibold">Meridian Capital</div>
                </div>
                <LockKeyhole className="h-5 w-5 text-sky-300" />
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="text-sm text-white/45">Risk index</div>
                <div className="mt-2 text-5xl font-semibold text-[#F7D784]">64</div>
                <div className="mt-2 text-sm text-white/45">Enhanced Business Support</div>
              </div>

              <div className="mt-4 grid gap-3">
                {screens.map(([name, Icon]) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-sky-300" />
                      <span className="text-sm">{name}</span>
                    </div>
                    <span className="text-xs text-white/35">open</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Возможности</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Всё сопровождение в одном закрытом интерфейсе
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <ShieldCheck className="mb-6 h-6 w-6 text-sky-300" />
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Доступ</div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Приложение не продаётся отдельно
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
                Доступ предоставляется только клиентам, которые заключили договор на комплексное сопровождение бизнеса. Стоимость сопровождения - от 200 000 ₽ в месяц.
              </p>
            </div>
            <Link href="/business-support" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Смотреть условия
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
