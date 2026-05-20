import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { ShieldCheck, ArrowRight, LockKeyhole } from 'lucide-react'

const plans = [
  {
    title: 'Проверка кандидата',
    price: '24 900 ₽',
    time: '1–2 дня',
    features: ['Проверка биографии', 'Репутационные сигналы', 'Конфликты интересов', 'Краткое аналитическое заключение']
  },
  {
    title: 'Проверка контрагента',
    price: '49 900 ₽',
    time: '2 дня',
    featured: true,
    features: ['Судебная история', 'Санкционные риски', 'Бенефициары и связанные лица', 'Репутационный анализ', 'Краткий индекс риска']
  },
  {
    title: 'Комплексная проверка бизнеса',
    price: '89 900 ₽',
    time: '2–4 дня',
    features: ['Расширенная проверка компании', 'Анализ структуры владения', 'Связи и конфликтные сигналы', 'Executive summary', 'Конфиденциальный формат']
  }
]

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Прайс-лист | HEIMDALL</title>
        <meta name="description" content="Прайс-лист HEIMDALL: стоимость проверки кандидатов, контрагентов и комплексной проверки бизнеса." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex items-center gap-3">
              <Link href="/pricing-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link>
              <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Запросить проверку</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <ShieldCheck className="h-4 w-4" />
              HEIMDALL
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Прайс-лист на аналитические проверки</h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Фиксированные базовые форматы для проверки кандидатов, контрагентов и бизнеса. Сложные международные и конфиденциальные кейсы рассчитываются индивидуально.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-24 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.title} className={`rounded-[42px] border p-8 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 ${plan.featured ? 'border-sky-300/30 bg-sky-300/10 shadow-[0_0_60px_rgba(56,189,248,0.15)]' : 'border-white/10 bg-white/[0.045]'}`}>
              <div className="text-sm uppercase tracking-[0.22em] text-sky-200/80">{plan.time}</div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{plan.title}</h2>
              <div className="mt-8 text-6xl font-semibold tracking-[-0.06em] text-sky-100">{plan.price}</div>
              <div className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">{feature}</div>
                ))}
              </div>
              <Link href="/#lead" className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.24)]">
                Запросить проверку
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-white/10 bg-white/[0.045] p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Индивидуальные проверки</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">NDA и закрытый формат работы доступны по запросу</h2>
              <p className="mt-6 text-lg leading-8 text-white/64">Международные проверки, глубокая корпоративная разведка, санкционные расследования и чувствительные проекты рассчитываются отдельно.</p>
            </div>
            <div className="rounded-[34px] border border-sky-300/20 bg-sky-300/10 p-8">
              <LockKeyhole className="mb-6 h-7 w-7 text-sky-300" />
              <div className="text-2xl font-semibold">Индивидуальные проекты</div>
              <div className="mt-5 text-white/65 leading-8">Международные проверки, deep due diligence, санкционные расследования, корпоративная разведка и конфиденциальные проекты - от 150 000 ₽.</div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
