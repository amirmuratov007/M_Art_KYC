import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import { ArrowRight, ShieldCheck, FileSearch, LockKeyhole, Network, Gauge, Bell, Newspaper } from 'lucide-react'

const core = [
  ['Counterparty Intelligence', 'Litigation, beneficial owners, sanctions risks, related parties and reputation signals.', '/corporate-intelligence', FileSearch],
  ['Candidate Screening', 'Pre-hire risks: conflict of interest, reputation, financial pressure and sensitive roles.', '/background-check', ShieldCheck],
  ['Due Diligence', 'Enhanced review of businesses, partners, transactions and international structures.', '/due-diligence-dubai', Network],
  ['Sample Reports', 'See how HEIMDALL analytical conclusions look on fictional subjects.', '/sample-reports-en', Gauge]
]

export default function HomePage() {
  return (
    <>
      <Head>
        <title>HEIMDALL | Corporate Intelligence and Risk Screening</title>
        <meta name="description" content="HEIMDALL helps companies review counterparties, candidates, beneficial owners and business risks before decisions are made." />
        <link rel="canonical" href="https://www.heimdall-group.ru/en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784] sm:px-5 sm:text-sm">
              <LockKeyhole className="h-4 w-4 shrink-0" />
              <span className="truncate">Corporate Intelligence</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">
              Intelligence for better business decisions
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/64 sm:text-xl sm:leading-9">
              HEIMDALL helps identify risks in counterparties, candidates, beneficial owners and business structures before a deal, hire or partnership.
            </p>

            <div className="mt-9 grid gap-4 sm:flex sm:flex-row">
              <Link href="/#lead" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Request review
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link href="/business-support-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-6 py-4 font-semibold text-[#F7D784] transition hover:border-[#D6A84F]/45">
                Business support
              </Link>

              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white transition hover:border-[#D6A84F]/35 hover:text-[#F7D784]">
                View reports
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl shadow-2xl sm:rounded-[42px] sm:p-6">
              <div className="rounded-[26px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-5 sm:rounded-[34px] sm:p-7">
                <div className="text-xs uppercase tracking-[0.2em] text-[#F7D784]/80 sm:text-sm">Risk Intelligence Snapshot</div>
                <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                  {[
                    ['Counterparty risk', '82/100'],
                    ['Hidden ownership', 'High'],
                    ['Sanctions exposure', 'Medium'],
                    ['Recommendation', 'Enhanced review']
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-4 sm:px-5">
                      <span className="min-w-0 text-sm text-white/55">{label}</span>
                      <span className="shrink-0 text-sm font-semibold text-[#F7D784] sm:text-base">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
                <Bell className="h-4 w-4" />
                New service
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Business support бизнеса
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">
                A continuous risk layer for companies: regular reviews of counterparties, candidates, suppliers, beneficial owners, transactions and reputation signals. Pricing starts from $2,500 per month.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/business-support-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">
                  View support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                ['from $2,500 / month', 'essential support'],
                ['client application', 'for retained support clients'],
                ['monthly reports', 'risks, statuses, recommendations']
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <div className="text-xl font-semibold text-[#F7D784]">{title}</div>
                  <div className="mt-2 text-sm text-white/55">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-sky-200">
                <Newspaper className="h-4 w-4" />
                Telegram publications
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
                HEIMDALL channel posts on the website
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">
                All analytical posts from the Telegram channel are available in the website journal with search and topic filters.
              </p>
            </div>

            <Link href="/journal-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">
              Open publications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="mb-8 max-w-4xl sm:mb-10">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Core</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl">Four key directions</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {core.map(([title, text, href, Icon]) => (
              <Link key={title} href={href} className="group rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 hover:bg-white/[0.07] sm:rounded-[34px] sm:p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="lead" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5 sm:pb-32">
          <div className="grid gap-8 rounded-[32px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 md:p-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Next step</div>
              <h2 className="mt-5 max-w-4xl text-3xl font-semibold tracking-[-0.05em] sm:text-5xl md:text-6xl">Describe the review subject</h2>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">We will suggest the right format: candidate screening, counterparty review, beneficial ownership review or enhanced business support.</p>
            </div>
            <Link href="mailto:info@heimdall-group.ru?subject=HEIMDALL%20review%20request" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
              Contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
