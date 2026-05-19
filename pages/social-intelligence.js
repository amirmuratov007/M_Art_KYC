import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import HeimdallAnimatedBackground from '@/components/HeimdallAnimatedBackground'
import HeimdallTrustLayer from '@/components/HeimdallTrustLayer'
import HeimdallLeadCapture from '@/components/HeimdallLeadCapture'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const blocks = [["Counterparty checks", "Hidden owners, litigation, sanctions, reputation."], ["Candidate screening", "Biography, conflicts of interest, reputation signals."], ["Sanctions screening", "Direct and indirect exposure to restricted parties."], ["Vendor screening", "Payment discipline, litigation history, conflict signals."], ["Executive screening", "Review of executives and sensitive positions."], ["Foreign companies", "Data across jurisdictions and registries."]]

export default function Page() {
  const language = "en"
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <HeimdallAnimatedBackground />
      <HeimdallNav language={language} />
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-5xl">
          <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">HEIMDALL</div>
          <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">SEO cluster for risk review services</h1>
          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">Structured HEIMDALL service directions for search traffic, advertising and specific client needs.</p>
        </div>
      </section>
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map(([title, text]) => (
            <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-sky-300/35">
              <CheckCircle2 className="mb-5 h-5 w-5 text-sky-300" />
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">Learn more <ArrowRight className="h-4 w-4" /></div>
            </div>
          ))}
        </div>
      </section>
      <HeimdallTrustLayer language={language} />
      <HeimdallLeadCapture language={language} />
      <HeimdallFooter language={language} />
    </main>
  )
}
