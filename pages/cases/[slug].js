import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { caseStudies } from '@/data/caseStudies'
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react'

export async function getStaticPaths() {
  return {
    paths: caseStudies.map((item) => ({ params: { slug: item.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const study = caseStudies.find((item) => item.slug === params.slug)
  return { props: { study } }
}

export default function CaseDetailPage({ study }) {
  return (
    <>
      <Head>
        <title>{study.title} | HEIMDALL</title>
        <meta name="description" content={study.summary} />
        <link rel="canonical" href={`https://www.heimdall-group.ru/cases/${study.slug}`} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <article className="relative z-10 mx-auto max-w-5xl px-4 py-20 sm:px-5">
          <Link href="/cases" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
            <ArrowLeft className="h-4 w-4" />
            Все кейсы
          </Link>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
            <ShieldAlert className="h-4 w-4" />
            {study.category} · {study.risk}
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-7xl">
            {study.title}
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/64">{study.summary}</p>

          <section className="mt-12 grid gap-6">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">Ситуация</div>
              <p className="mt-5 text-lg leading-9 text-white/68">{study.situation}</p>
            </div>

            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">Что насторожило</div>
              <div className="mt-6 grid gap-4">
                {study.signals.map((signal) => (
                  <div key={signal} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-7 text-white/68">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-300" />
                    {signal}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">Результат</div>
              <p className="mt-5 text-lg leading-9 text-white/72">{study.result}</p>
            </div>
          </section>

          <section className="mt-12 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.08] p-8 backdrop-blur-2xl md:p-12">
            <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
              Нужна аналогичная проверка?
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/64">
              HEIMDALL подготовит аналитический вывод по контрагенту, кандидату, бенефициару или сделке до принятия решения.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={study.serviceHref} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">
                {study.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Получить пример отчета
              </Link>
            </div>
          </section>
        </article>

        <HeimdallFooter />
      </main>
    </>
  )
}
