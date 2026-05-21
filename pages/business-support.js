import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { ArrowRight, ShieldCheck, LockKeyhole, FileSearch, Bell, Users, Building2, Gauge, CheckCircle2 } from 'lucide-react'

const packages = [
  {
    name: 'Базовое сопровождение',
    price: 'от 200 000 ₽ / месяц',
    best: false,
    description: 'Для компаний, которым нужен постоянный контроль контрагентов, кандидатов и базовых рисков.',
    features: [
      'до 8 проверок в месяц',
      'проверка контрагентов и кандидатов',
      'краткие аналитические заключения',
      'ежемесячный риск-обзор',
      'приоритетная коммуникация'
    ]
  },
  {
    name: 'Расширенное сопровождение',
    price: 'от 350 000 ₽ / месяц',
    best: true,
    description: 'Для бизнеса, который регулярно принимает решения по сделкам, партнёрам, найму и поставщикам.',
    features: [
      'до 18 проверок в месяц',
      'углублённые отчёты по компаниям и людям',
      'санкционные и репутационные проверки',
      'карты связей и бенефициаров',
      'еженедельный риск-дайджест',
      'доступ к клиентскому приложению'
    ]
  },
  {
    name: 'Стратегическое сопровождение',
    price: 'от 600 000 ₽ / месяц',
    best: false,
    description: 'Для собственников, холдингов, инвесторов и компаний с чувствительными международными задачами.',
    features: [
      'индивидуальный объём проверок',
      'комплексная корпоративная разведка',
      'проверка иностранных компаний',
      'расширенный контроль бенефициаров',
      'сопровождение сделок и переговоров',
      'закрытый формат и NDA'
    ]
  }
]

const benefits = [
  ['Постоянный контроль риска', 'Компания получает не разовую проверку, а регулярный аналитический контур вокруг сделок, найма и партнёров.'],
  ['Быстрее принимать решения', 'Руководство видит краткий вывод: можно работать, нужны ограничения или риск слишком высокий.'],
  ['Меньше потерь', 'Проверка до решения помогает избежать токсичных контрагентов, слабых кандидатов и скрытых конфликтов интересов.'],
  ['Закрытый формат', 'Работа может вестись под NDA, с ограниченным доступом и конфиденциальной коммуникацией.']
]

const workflow = [
  ['01', 'Подключение', 'Определяем задачи бизнеса, чувствительные зоны и формат отчётности.'],
  ['02', 'Регулярные проверки', 'Проверяем контрагентов, кандидатов, поставщиков, бенефициаров и связанные структуры.'],
  ['03', 'Риск-мониторинг', 'Фиксируем сигналы, изменения, новые судебные и репутационные события.'],
  ['04', 'Отчёты и рекомендации', 'Передаём краткие выводы, карты связей, риск-индекс и рекомендации для решения.']
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
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex items-center gap-3">
              <Link href="/business-support-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link>
              <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Обсудить сопровождение</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Комплексное сопровождение
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Постоянная защита бизнеса от скрытых рисков
            </h1>

            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              HEIMDALL сопровождает бизнес на постоянной основе: проверяет контрагентов, кандидатов, поставщиков, бенефициаров, сделки и репутационные риски до того, как они станут проблемой.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/#lead" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Запросить предложение
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Смотреть отчёты
              </Link>
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
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                    <div className="text-sm text-white/45">{label}</div>
                    <div className="mt-1 font-semibold text-[#F7D784]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Преимущества</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Это не разовая проверка, а постоянный риск-контур</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <ShieldCheck className="mb-6 h-6 w-6 text-sky-300" />
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Как это работает</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">От запроса до регулярной защиты</h2>
          </div>

          <div className="grid gap-5">
            {workflow.map(([number, title, text]) => (
              <div key={number} className="grid gap-5 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl md:grid-cols-[90px_1fr] md:items-center">
                <div className="text-4xl font-semibold text-[#F7D784]">{number}</div>
                <div>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Прайс-лист</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Стоимость сопровождения</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Финальная стоимость зависит от количества проверок, глубины отчётов, юрисдикций, скорости реакции и необходимости закрытого формата.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((plan) => (
              <div key={plan.name} className={`rounded-[42px] border p-8 backdrop-blur-2xl ${plan.best ? 'border-sky-300/30 bg-sky-300/10 shadow-[0_0_60px_rgba(56,189,248,0.15)]' : 'border-white/10 bg-white/[0.045]'}`}>
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">{plan.best ? 'Оптимальный формат' : 'Формат'}</div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{plan.name}</h3>
                <p className="mt-5 text-sm leading-7 text-white/60">{plan.description}</p>
                <div className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-sky-100">{plan.price}</div>
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Клиентское приложение</div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Доступ к приложению входит в сопровождение</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">Клиенты смогут видеть статусы проверок, отчёты, риск-сигналы, уведомления и историю сопровождения бизнеса.</p>
            </div>
            <Link href="/#lead" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
              Обсудить подключение
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
