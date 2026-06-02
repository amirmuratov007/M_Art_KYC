import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ShieldCheck, LockKeyhole, FileSearch, Database, HelpCircle, ArrowRight, Eye, Network, Scale, Fingerprint } from 'lucide-react'

const pillars = [
  ['Methodology', 'How HEIMDALL turns facts, links and weak signals into decision-grade intelligence.', '/methodology-en', FileSearch],
  ['Data sources', 'Categories of official, public, commercial and analytical data used in reviews.', '/data-sources-en', Database],
  ['Privacy', 'How client requests, materials, reports and access to intelligence products are protected.', '/privacy-en', LockKeyhole],
  ['FAQ', 'Answers on timing, report formats, individuals, foreign entities and ongoing support.', '/faq-en', HelpCircle],
]

const principles = [
  ['Legitimate purpose', 'Reviews are performed for business, compliance, hiring or counterparty risk decisions.'],
  ['Evidence discipline', 'Confirmed facts are separated from assumptions and weak matches are not overstated.'],
  ['Human review', 'Critical matches and relationship signals are reviewed by an analyst before reporting.'],
  ['Data minimisation', 'Reports focus on decision-relevant risk, not on dumping every available trace.'],
]

const signals = [
  ['Ownership', 'beneficial owners, directors, linked entities and indicators of practical control', Network],
  ['Litigation', 'court records, claims, insolvency signals, enforcement proceedings and debt exposure', Scale],
  ['Compliance', 'sanctions, PEP, AML/KYC, cross-border exposure and regulatory risk', ShieldCheck],
  ['Reputation', 'adverse media, public conflicts, sector signals and digital footprint', Eye],
]

export default function TrustCenterEnPage() {
  return (
    <>
      <Head>
        <title>Trust Center | HEIMDALL</title>
        <meta name="description" content="HEIMDALL Trust Center: methodology, data sources, privacy, FAQ and the operating principles behind corporate intelligence work." />
        <link rel="canonical" href="https://www.heimdall-group.ru/trust-center-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" />
              Trust Center
            </div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">HEIMDALL Trust Center</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              A single place for clients, legal teams, compliance officers and security teams to understand how HEIMDALL reviews risk, uses data, protects confidentiality and defines the boundaries of intelligence work.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/sample-reports-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">View sample reports <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/methodology-en" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white/85">Methodology</Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(([title, text, href, Icon]) => (
            <Link key={title} href={href} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200"><Icon className="h-6 w-6" /></div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
            </Link>
          ))}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="mb-10 max-w-4xl"><div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Operating principles</div><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Review principles</h2></div>
            <div className="grid gap-5 md:grid-cols-2">
              {principles.map(([title, text]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-6"><div className="flex items-start gap-4"><Fingerprint className="mt-1 h-5 w-5 shrink-0 text-[#F7D784]" /><div><h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 text-sm leading-7 text-white/60">{text}</p></div></div></div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="mb-10 max-w-4xl"><div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Risk Intelligence</div><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">What is reviewed</h2></div>
            <div className="grid gap-5 md:grid-cols-2">
              {signals.map(([title, text, Icon]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-6"><div className="flex items-start gap-4"><Icon className="mt-1 h-5 w-5 shrink-0 text-sky-300" /><div><h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3><p className="mt-3 text-sm leading-7 text-white/60">{text}</p></div></div></div>
              ))}
            </div>
          </div>
        </section>

        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
