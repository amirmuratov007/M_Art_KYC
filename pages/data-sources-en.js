import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { Database, FileSearch, ShieldCheck, LockKeyhole, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const groups = [
  ['Official registries', 'Corporate registrations, entity status, management changes and ownership structure records.'],
  ['Litigation and debt data', 'Court disputes, enforcement proceedings, insolvency episodes and debt exposure indicators.'],
  ['Sanctions and compliance sources', 'Sanctions lists, PEP signals, AML/KYC context and cross-border exposure.'],
  ['Public reputation', 'Media, sector publications, adverse media, public conflicts and reputation signals.'],
  ['Links and ownership', 'Connected entities, directors, beneficial owners, nominee indicators and practical control.'],
  ['OSINT and analytical context', 'Open sources, digital traces, behavioural signals and cross-source correlation.'],
]

const controls = [
  'Sources are applied according to the risk category, not mechanically in the same way for every request.',
  'Weak matches are marked as requiring review, not presented as established risk.',
  'Reports show material risk and context without exposing the full internal search map.',
]

export default function DataSourcesEnPage() {
  return (
    <>
      <Head>
        <title>Data Sources | HEIMDALL</title>
        <meta name="description" content="Data source categories used by HEIMDALL: registries, litigation data, sanctions lists, media, OSINT and corporate intelligence sources." />
        <link rel="canonical" href="https://www.heimdall-group.ru/data-sources-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <HeimdallNav language="en" />
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]"><Database className="h-4 w-4" /> Data Sources</div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Data sources</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">HEIMDALL combines open, official, commercial and analytical sources. We do not disclose the full internal method, but we show the categories of data that support the review process.</p>
          </div>
        </section>
        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([title, text]) => (
            <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200"><FileSearch className="h-6 w-6" /></div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
            </div>
          ))}
        </section>
        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-28 sm:px-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-8 backdrop-blur-2xl"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#F7D784]" /><p className="max-w-4xl text-base leading-8 text-white/70">Sources do not replace analytical judgement. HEIMDALL's value is cross-source correlation and the translation of scattered signals into a clear risk summary for the client.</p></div></div>
          <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
            <div className="mb-5 flex items-center gap-3 text-[#F7D784]"><LockKeyhole className="h-5 w-5" /><span className="text-sm uppercase tracking-[0.24em]">Data controls</span></div>
            <div className="grid gap-4">{controls.map((item) => <p key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">{item}</p>)}</div>
            <Link href="/privacy-en" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">Privacy <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
