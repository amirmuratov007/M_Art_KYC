import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import SupportRequestForm from '@/components/SupportRequestForm'
import { ArrowRight, LockKeyhole, CheckCircle2 } from 'lucide-react'

const packages = [
  ['Базовое сопровождение', 'от 200 000 ₽ / месяц', 'до 8 проверок в месяц', 'проверка контрагентов и кандидатов', 'ежемесячный риск-обзор'],
  ['Расширенное сопровождение', 'от 350 000 ₽ / месяц', 'до 18 проверок в месяц', 'углублённые отчёты', 'доступ к клиентскому приложению'],
  ['Стратегическое сопровождение', 'от 600 000 ₽ / месяц', 'индивидуальный объём проверок', 'корпоративная разведка', 'закрытый формат и NDA']
]

export default function BusinessSupportPage() {
  return (
    <>
      <Head>
        <title>Комплексное сопровождение бизнеса | HEIMDALL</title>
        <meta name="description" content="Комплексное сопровождение бизнеса HEIMDALL: постоянная проверка контрагентов, кандидатов, бенефициаров, поставщиков и корпоративных рисков." />
        <link rel="canonical" href="https://www.heimdall-group.ru/business-support" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex items-center gap-3">
              <Link href="/business-support-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link>
              <a href="#support-request" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Оставить заявку</a>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Комплексное сопровождение
            </div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Постоянная защита бизнеса от скрытых рисков</h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">HEIMDALL сопровождает бизнес на постоянной основе: проверяет контрагентов, кандидатов, поставщиков, бенефициаров, сделки и репутационные риски до того, как они станут проблемой.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#support-request" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">Оставить заявку <ArrowRight className="h-4 w-4" /></a>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">Смотреть отчёты</Link>
            </div>
          </div>
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Что получает клиент</div>
              <div className="mt-8 grid gap-4">
                {[
                  ['Проверки', 'контрагенты, кандидаты, бенефициары'],
                  ['Мониторинг', 'суды, санкции, репутация'],
                  ['Отчёты', 'выводы и рекомендации'],
                  ['Приложение', 'доступ для клиентов сопровождения']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4"><div className="text-sm text-white/45">{label}</div><div className="mt-1 font-semibold text-[#F7D784]">{value}</div></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl"><div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Прайс-лист</div><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Стоимость сопровождения</h2></div>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map(([name, price, a, b, c], index) => (
              <div key={name} className={`rounded-[42px] border p-8 backdrop-blur-2xl ${index === 1 ? 'border-sky-300/30 bg-sky-300/10' : 'border-white/10 bg-white/[0.045]'}`}>
                <h3 className="text-3xl font-semibold tracking-[-0.04em]">{name}</h3>
                <div className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-sky-100">{price}</div>
                <div className="mt-8 space-y-3">{[a,b,c].map((feature) => <div key={feature} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />{feature}</div>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="support-request" className="relative z-10 mx-auto max-w-4xl px-5 pb-32"><SupportRequestForm language="ru" /></section>
      </main>
    </>
  )
}
