import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { caseStudiesEn } from '@/data/caseStudiesEn'
import { ArrowRight, FileSearch, Network, ShieldAlert } from 'lucide-react'

export default function CasesEnPage() {
  return (
    <>
      <Head>
        <title>Corporate Intelligence Cases | HEIMDALL</title>
        <meta name="description" content="Sanitized HEIMDALL case files on counterparties, executives, beneficial ownership and transaction due diligence." />
        <link rel="canonical" href="https://www.heimdall-group.ru/cases-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              <FileSearch className="h-4 w-4" />
              Intelligence Case Files
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Corporate intelligence cases
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Sanitized scenarios without client names, personal data or confidential details.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-5 lg:grid-cols-2">
          {caseStudiesEn.map((item) => (
            <Link key={item.slug} href={`/cases-en/${item.slug}`} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35">
              <div className="flex items-start justify-between gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div className="rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">{item.risk}</div>
              </div>

              <div className="mt-8 text-xs uppercase tracking-[0.22em] text-[#F7D784]">{item.category}</div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">{item.summary}</p>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                Read case
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 sm:px-5">
          <div className="rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12">
            <Network className="mb-6 h-8 w-8 text-[#F7D784]" />
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Every case is about management risk, not just data
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
              HEIMDALL helps clients identify risk before a transaction, appointment, partnership or access decision.
            </p>
          </div>
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
