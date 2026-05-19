import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight, Building2, Landmark, Scale, Users, BriefcaseBusiness, LockKeyhole, CheckCircle2 } from 'lucide-react'

const sectors = [["Банки и финтех", "Проверка клиентов, партнёров, бенефициаров и повышенных комплаенс-рисков.", ["AML/KYC", "санкционные риски", "связанные лица"]], ["Инвесторы и фонды", "Проверка бизнеса, собственников, судебной истории и репутационного фона перед вложением капитала.", ["due diligence", "структура владения", "судебные риски"]], ["Юридические фирмы", "Аналитическая поддержка сделок, споров, проверки сторон и подготовки позиции клиента.", ["корпоративная разведка", "контрагенты", "доказательные сигналы"]], ["Кадровые агентства", "Проверка кандидатов до передачи финалиста клиенту и снижение риска отказа после проверки службы безопасности.", ["проверка кандидатов", "репутация", "конфликты интересов"]], ["Крупный бизнес", "Проверка поставщиков, подрядчиков, руководителей, партнёров и чувствительных позиций.", ["поставщики", "подрядчики", "руководители"]], ["Частные клиенты", "Конфиденциальные проверки сложных ситуаций, активов, партнёров и репутационных рисков.", ["конфиденциальность", "активы", "частные кейсы"]]]

const icons = [Building2, Landmark, Scale, Users, BriefcaseBusiness, LockKeyhole]

export default function SectorsPage() {
  return (
    <>
      <Head>
        <title>Кому помогает HEIMDALL — HEIMDALL</title>
        <meta name="description" content="Отраслевые решения HEIMDALL для банков, инвесторов, юридических фирм, кадровых агентств и крупного бизнеса." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <Link href="/" className="text-xl font-semibold tracking-[0.34em]">HEIMDALL</Link>
            <div className="flex items-center gap-3">
              <Link href="/sectors-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link>
              <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Обсудить задачу</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <BriefcaseBusiness className="h-4 w-4" />
              HEIMDALL Sectors
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Проверки для разных клиентов, но с одной целью — снизить риск ошибки</h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">HEIMDALL адаптирует глубину проверки, источники и формат отчёта под задачу клиента: сделка, найм, партнёрство, инвестиция или конфликт.</p>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sectors.map(([name, text, tags], index) => {
              const Icon = icons[index]
              return (
                <div key={name} className="group rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07]">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em]">{name}</h2>
                  <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/55">{tag}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-10 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Подбор формата</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Под каждую задачу — свой уровень проверки
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                Мы подбираем формат проверки под риск, сроки, юрисдикцию и чувствительность кейса.
              </p>
              <Link href="/#lead" className="mt-9 inline-flex rounded-2xl bg-sky-500 px-7 py-4 font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                Обсудить задачу
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {['Express Check', 'Standard Due Diligence', 'Enhanced Intelligence Review'].map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5">
                  <CheckCircle2 className="h-5 w-5 text-sky-300" />
                  <span className="text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
