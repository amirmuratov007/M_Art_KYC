import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { caseStudies } from '@/data/caseStudies'
import { ArrowRight, FileSearch, ShieldAlert, Network, CheckCircle2 } from 'lucide-react'

const filters = ['Поставщики', 'Контрагенты', 'Закупки', 'Кандидаты', 'Бенефициары', 'AML / KYC', 'Due Diligence']

export default function CasesPage() {
  return (
    <>
      <Head>
        <title>Кейсы корпоративной разведки | HEIMDALL</title>
        <meta name="description" content="Обезличенные кейсы HEIMDALL: проверка контрагентов, поставщиков из Китая, кандидатов, скрытых бенефициаров, AML/KYC и due diligence перед сделкой." />
        <link rel="canonical" href="https://www.heimdall-group.ru/cases" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-5 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              <FileSearch className="h-4 w-4" />
              Intelligence Case Files
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Кейсы, где проверка спасает деньги и управленческие решения
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Обезличенные сценарии проверок: без раскрытия клиентов, персональных данных и конфиденциальных деталей.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {filters.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-white/68">{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[38px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-6 backdrop-blur-2xl">
            <img src="/heimdall-logo-mark.png" alt="HEIMDALL" className="mx-auto w-full max-w-[460px]" />
            <div className="mt-6 grid gap-3">
              {[
                ['7 кейсов', 'поставщики, контрагенты, кандидаты, AML и сделки'],
                ['без персональных данных', 'только логика риска и управленческий вывод'],
                ['прикладной формат', 'что проверяли, что нашли, какое решение принято']
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                  <div className="text-sm font-semibold text-[#F7D784]">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-white/58">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-5 lg:grid-cols-2">
          {caseStudies.map((item) => (
            <Link key={item.slug} href={`/cases/${item.slug}`} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35">
              <div className="flex items-start justify-between gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div className="rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">{item.risk}</div>
              </div>

              <div className="mt-8 text-xs uppercase tracking-[0.22em] text-[#F7D784]">{item.category}</div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">{item.summary}</p>

              <div className="mt-6 grid gap-2">
                {item.signals.slice(0, 2).map((signal) => (
                  <div key={signal} className="flex items-start gap-2 text-sm leading-6 text-white/56">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {signal}
                  </div>
                ))}
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                Читать кейс
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 sm:px-5">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Network className="mb-6 h-8 w-8 text-[#F7D784]" />
              <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Каждый кейс показывает управленческий риск, а не просто набор фактов
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
                HEIMDALL помогает увидеть проблему до сделки, найма, партнерства, оплаты поставщику или передачи доступа.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Выбрать проверку <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
