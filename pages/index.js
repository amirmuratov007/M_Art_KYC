import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import { ArrowRight, ShieldCheck, FileSearch, LockKeyhole, Network, Gauge } from 'lucide-react'

const core = [
  {
    title: 'Проверка контрагентов',
    text: 'Суды, бенефициары, санкционные риски, связанные лица и репутационные сигналы.',
    href: '/proverka-kontragenta',
    icon: FileSearch
  },
  {
    title: 'Проверка кандидатов',
    text: 'Риски перед наймом: конфликт интересов, репутация, финансовая нагрузка и чувствительные роли.',
    href: '/proverka-kandidatov',
    icon: ShieldCheck
  },
  {
    title: 'Due Diligence',
    text: 'Комплексная проверка бизнеса, партнёров, сделок и международных структур.',
    href: '/due-diligence-russia',
    icon: Network
  },
  {
    title: 'Примеры отчётов',
    text: 'Показываем, как выглядит аналитический вывод HEIMDALL на вымышленных объектах.',
    href: '/sample-reports',
    icon: Gauge
  }
]

export default function HomePage() {
  return (
    <>
      <Head>
        <title>HEIMDALL | корпоративная разведка и проверка рисков</title>
        <meta
          name="description"
          content="HEIMDALL помогает проверять контрагентов, кандидатов, бенефициаров и бизнес-риски до принятия решений."
        />
        <link rel="canonical" href="https://www.heimdall-group.ru/" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Corporate Intelligence
            </div>

            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Проверки для принятия правильных решений
            </h1>

            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              HEIMDALL помогает выявлять риски в контрагентах, кандидатах, бенефициарах и бизнес-структурах до сделки, найма или партнёрства.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#lead"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]"
              >
                Запросить проверку
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/sample-reports"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white transition hover:border-[#D6A84F]/35 hover:text-[#F7D784]"
              >
                Посмотреть отчёты
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl shadow-2xl">
              <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
                <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">
                  Risk Intelligence Snapshot
                </div>

                <div className="mt-8 grid gap-4">
                  {[
                    ['Counterparty risk', '82/100'],
                    ['Hidden ownership', 'High'],
                    ['Sanctions exposure', 'Medium'],
                    ['Recommendation', 'Enhanced review']
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                      <span className="text-sm text-white/55">{label}</span>
                      <span className="font-semibold text-[#F7D784]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              Главное
            </div>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Четыре ключевых направления
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {core.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 hover:bg-white/[0.07]"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-white/58">
                    {item.text}
                  </p>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                    Подробнее
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-6 rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-3">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">
                Почему это важно
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                Ошибка в проверке стоит дороже самой проверки
              </h2>
            </div>

            {[
              ['До сделки', 'Проверяем компанию, владельцев, суды, связи и санкционные риски.'],
              ['До найма', 'Выявляем конфликты интересов, репутационные сигналы и риски чувствительных должностей.']
            ].map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-black/20 p-6">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="lead" className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                Следующий шаг
              </div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Опишите объект проверки
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
                Мы предложим формат: проверка кандидата, контрагента, бенефициара или комплексная проверка бизнеса.
              </p>
            </div>

            <Link
              href="mailto:info@heimdall-group.ru?subject=Запрос%20на%20проверку%20HEIMDALL"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]"
            >
              Написать
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
