import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ShieldCheck, LockKeyhole, FileSearch, Database, HelpCircle, ArrowRight, Eye, Network, Scale, Fingerprint } from 'lucide-react'

const pillars = [
  {
    title: 'Методология',
    text: 'Как HEIMDALL превращает факты, связи и слабые сигналы в понятный управленческий вывод.',
    href: '/methodology',
    icon: FileSearch,
  },
  {
    title: 'Источники данных',
    text: 'Какие категории официальных, публичных, коммерческих и аналитических данных используются в проверках.',
    href: '/data-sources',
    icon: Database,
  },
  {
    title: 'Конфиденциальность',
    text: 'Как защищаются запросы, материалы клиента, результаты проверки и доступ к аналитическим отчетам.',
    href: '/privacy',
    icon: LockKeyhole,
  },
  {
    title: 'FAQ',
    text: 'Короткие ответы о сроках, формате отчетов, проверке физических лиц, иностранных компаний и сопровождении.',
    href: '/faq',
    icon: HelpCircle,
  },
]

const principles = [
  ['Законная цель', 'Проверка проводится для оценки делового, комплаенс, кадрового или контрагентского риска.'],
  ['Проверяемые факты', 'Выводы отделяются от предположений, слабые совпадения не выдаются за установленный риск.'],
  ['Human review', 'Критические совпадения и связи проходят аналитическую проверку перед включением в отчет.'],
  ['Минимизация данных', 'В отчет попадает то, что важно для решения, а не весь массив найденной информации.'],
]

const signals = [
  ['Ownership', 'бенефициары, директора, связанные компании и признаки фактического контроля', Network],
  ['Litigation', 'суды, претензии, банкротные сигналы, исполнительные производства и долговая нагрузка', Scale],
  ['Compliance', 'санкции, PEP, AML/KYC, cross-border exposure и регуляторные риски', ShieldCheck],
  ['Reputation', 'adverse media, публичные конфликты, отраслевые сигналы и цифровой след', Eye],
]

export default function TrustCenterPage() {
  return (
    <>
      <Head>
        <title>Центр доверия | HEIMDALL</title>
        <meta name="description" content="Центр доверия HEIMDALL: методология проверок, источники данных, конфиденциальность, FAQ и подход к корпоративной разведке." />
        <link rel="canonical" href="https://www.heimdall-group.ru/trust-center" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
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
              Один раздел для клиента, юриста, комплаенс-офицера и службы безопасности: как HEIMDALL проверяет риски, какие данные использует, как защищает конфиденциальность и где проходят границы аналитики.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">
                Смотреть примеры отчетов <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/methodology" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white/85">
                Методология
              </Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-5 md:grid-cols-2 xl:grid-cols-4">
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

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="mb-10 max-w-4xl">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Operating principles</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Принципы проверки</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {principles.map(([title, text]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <div className="flex items-start gap-4">
                    <Fingerprint className="mt-1 h-5 w-5 shrink-0 text-[#F7D784]" />
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

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="mb-10 max-w-4xl">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Risk Intelligence</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Что именно проверяется</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {signals.map(([title, text, Icon]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <div className="flex items-start gap-4">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-sky-300" />
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

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
