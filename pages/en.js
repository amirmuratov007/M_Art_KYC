import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import HeimdallConversionPanel from '@/components/HeimdallConversionPanel'
import {
  ArrowRight,
  ShieldCheck,
  FileSearch,
  LockKeyhole,
  Network,
  Gauge,
  Bell,
  Newspaper,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

const core = [
  ['Corporate Intelligence', 'Corporate records, litigation, ownership, sanctions exposure and reputational signals.', '/corporate-intelligence', FileSearch],
  ['Executive Background Check', 'Conflict of interest, reputation, financial stress and sensitive role review.', '/executive-background-check-en', ShieldCheck],
  ['Due Diligence', 'Enhanced review of businesses, partners, transactions and international structures.', '/due-diligence-russia', Network],
  ['Sample Reports', 'See how HEIMDALL structures findings and risk conclusions.', '/sample-reports-en', Gauge]
]

const decisionMoments = [
  ['Before a deal', 'Confirm owners, litigation history, reputation and nominee risk before signing.'],
  ['Before paying a supplier', 'Identify shell patterns, affiliations, sanctions exposure and hidden connections.'],
  ['Before hiring', 'Reduce risk around money, data, procurement and decision-making access.'],
  ['Before partnership', 'Understand who really stands behind the company and what risks come with them.']
]

const trustProof = [
  ['Methodology', 'Not just database extracts, but a structured risk conclusion with clear logic.', '/methodology-en'],
  ['Data Sources', 'Open registries, courts, media, corporate links and compliance signals.', '/data-sources-en'],
  ['Privacy', 'Tasks, documents and review results remain confidential.', '/privacy-en']
]

export default function HomePageEn() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('General inquiry')

  const openContact = (nextTopic = 'General inquiry') => {
    setTopic(nextTopic)
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>HEIMDALL | Corporate intelligence and risk review</title>
        <meta name="description" content="HEIMDALL helps companies assess counterparties, candidates, beneficial owners and business risks before deals, hiring and partnerships are made." />
        <link rel="canonical" href="https://www.heimdall-group.ru/en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784] sm:px-5 sm:text-sm">
              <LockKeyhole className="h-4 w-4 shrink-0" />
              <span className="truncate">Risk Control &amp; Business Intelligence</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">
              Corporate intelligence and risk review before deals, hiring and partnerships
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/64 sm:text-xl sm:leading-9">
              HEIMDALL helps you understand who you are dealing with: actual owners, hidden links, litigation and sanctions exposure, conflicts of interest and reputation red flags.
            </p>

            <div className="mt-9 grid gap-4 sm:flex sm:flex-row">
              <button onClick={() => openContact('Counterparty intelligence')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                Check a counterparty <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/sample-reports-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-6 py-4 font-semibold text-[#F7D784]">Get sample report</Link>
              <Link href="/trust-center-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white">Why trust us</Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/62">
              {['Deal', 'Procurement', 'Hiring', 'Partnership', 'Investment'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2">{item}</span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['1000+ sources', 'Registries, courts, adverse media and corporate link analysis.'],
                ['24-72 hours', 'Fast initial findings for standard cases and accelerated launch.'],
                ['Confidential', 'Tasks and results stay within the client review perimeter.']
              ].map(([title, text]) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl">
                  <div className="text-sm font-semibold text-[#F7D784]">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/58">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl shadow-2xl sm:rounded-[42px] sm:p-6">
            <div className="rounded-[28px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-5 sm:rounded-[34px] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
                  <ShieldCheck className="h-4 w-4" /> Brand Signal
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-sky-200">
                  <Gauge className="h-4 w-4" /> HEIMDALL Snapshot
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,79,0.12),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-5 sm:p-7">
                <img src="/heimdall-logo-full.png" alt="HEIMDALL" className="mx-auto w-full max-w-[520px]" />
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  'Counterparties, beneficial owners and connected parties',
                  'Executive screening, conflict of interest and sensitive role review',
                  'Sanctions, litigation, reputation signals and corporate links'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F7D784]" />
                    <span className="text-sm leading-6 text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Counterparty risk', '82/100'],
                  ['Recommendation', 'Enhanced review'],
                  ['Trust Center', 'Methodology and privacy'],
                  ['Access mode', 'Telegram + client account']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
                    <div className="mt-2 text-sm font-semibold text-[#F7D784] sm:text-base">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-5 lg:grid-cols-4">
            {decisionMoments.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">When HEIMDALL helps</div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-sky-200"><Sparkles className="h-4 w-4" /> Fast start</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Describe the object - we will suggest the review scope</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">A company, person, supplier, investor or partner. A name, website, profile or short context is enough to start.</p>
            </div>
            <button onClick={() => openContact('Review scope assessment')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.25)]">Request scope <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {trustProof.map(([title, text, href]) => (
              <Link key={href} href={href} className="rounded-[30px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-7 backdrop-blur-2xl transition hover:border-[#D6A84F]/40">
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">Open <ArrowRight className="h-4 w-4" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]"><Bell className="h-4 w-4" /> New service</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Business Support</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">Ongoing corporate intelligence, due diligence and risk advisory for companies operating in sensitive environments. Starting from $2,500 per month.</p>
            </div>
            <Link href="/business-support-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">View support <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-sky-200"><Newspaper className="h-4 w-4" /> Telegram publications</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">HEIMDALL journal posts</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">Analytical publications are available in the website journal with search and topic filters.</p>
            </div>
            <Link href="/journal-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">Open publications <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {core.map(([title, text, href, Icon]) => (
              <Link key={title} href={href} className="group rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 sm:rounded-[34px] sm:p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]"><Icon className="h-6 w-6" /></div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <HeimdallConversionPanel language="en" />

        <HeimdallFooter language="en" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="en" defaultTopic={topic} />
    </>
  )
}
