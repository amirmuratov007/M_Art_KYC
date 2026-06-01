import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ShieldCheck, LockKeyhole, FileSearch, Database, HelpCircle, ArrowRight, Eye, Network } from 'lucide-react'

const pillars = [
  {
    title: 'Методология',
    text: 'Проверка строится как risk-based анализ: факты, связи, контекст, репутационные сигналы и практический вывод для решения.',
    href: '/methodology',
    icon: FileSearch,
  },
  {
    title: 'Источники данных',
    text: 'Государственные реестры, судебные сведения, санкционные списки, корпоративные данные, СМИ, OSINT и коммерческие источники.',
    href: '/data-sources',
    icon: Database,
  },
  {
    title: 'Конфиденциальность',
    text: 'Работа с проверками, контрагентами, кандидатами и отчетами ведется в закрытом контуре и без публичного раскрытия деталей.',
    href: '/privacy',
    icon: LockKeyhole,
  },
  {
    title: 'FAQ',
    text: 'Ответы на вопросы о сроках, формате отчета, проверке физических лиц, иностранных компаний и сопровождении бизнеса.',
    href: '/faq',
    icon: HelpCircle,
  },
]

const signals = [
  ['Проверка владельцев', 'бенефициары, директора, связанные компании и признаки фактического контроля'],
  ['Судебные риски', 'споры, претензии, банкротные сигналы и долговая нагрузка'],
  ['Репутационная экспозиция', 'adverse media, публичные конфликты и отраслевые сигналы'],
  ['Комплаенс', 'санкционные списки, PEP, AML/KYC и cross-border exposure'],
]

export default function TrustCenterPage() {
  return (
    <>
      <Head>
        <title>Центр доверия | HEIMDALL</title>
        <meta name="description" content="Центр доверия HEIMDALL: методология проверок, источники данных, конфиденциальность, FAQ и подход к корпоративной разведке." />
        <link rel="canonical" href="https://heimdall-group.ru/trust-center" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" />
              Trust Center
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Центр доверия HEIMDALL
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Здесь собраны принципы работы HEIMDALL: как мы подходим к проверкам, какие типы данных анализируем,
              как защищаем конфиденциальность и что получает клиент в результате.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.title} href={item.href} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{item.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{item.text}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">
                  Подробнее <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="mb-10 max-w-4xl">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Risk Intelligence</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Что именно проверяется</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {signals.map(([title, text]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <div className="flex items-start gap-4">
                    <Network className="mt-1 h-5 w-5 shrink-0 text-sky-300" />
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 sm:px-5">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">HEIMDALL</div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Доверие строится на методологии, а не на обещаниях</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">Клиент получает не набор ссылок, а управленческий вывод: какие риски существуют, почему они важны и как они могут повлиять на решение.</p>
            </div>
            <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Смотреть отчеты <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
