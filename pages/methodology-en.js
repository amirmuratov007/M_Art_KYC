import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { Activity, Database, Eye, FileText, Network, ShieldCheck } from 'lucide-react'

const steps = [
  ['01', 'Collection', 'Initial collection of open-source data, corporate traces and source identifiers.', Database],
  ['02', 'Mapping', 'Relationship mapping: owners, directors, connected parties, entities and jurisdictions.', Network],
  ['03', 'Screening', 'Sanctions, PEP, litigation, adverse media and reputation signal screening.', Eye],
  ['04', 'Risk scoring', 'Risk assessment and separation of critical signals from background noise.', Activity],
  ['05', 'Analyst review', 'Analytical validation of links, logic and practical decision relevance.', ShieldCheck],
  ['06', 'Report', 'Final report with conclusions, risks and practical recommendations.', FileText]
]

export default function MethodologyEnPage() {
  return (
    <>
      <Head>
        <title>Intelligence Methodology | HEIMDALL</title>
        <meta name="description" content="HEIMDALL methodology: data collection, relationship mapping, sanctions screening, risk scoring and analytical reporting." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              Intelligence Methodology
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              HEIMDALL methodology
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              We verify not only facts, but the relationships between them. The goal is to produce decision-grade intelligence, not a disconnected data dump.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-32 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map(([num, title, text, Icon]) => (
            <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#F7D784]">{num}</div>
                <Icon className="h-6 w-6 text-sky-300" />
              </div>

              <h2 className="mt-7 text-3xl font-semibold tracking-[-0.04em]">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
            </div>
          ))}
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
