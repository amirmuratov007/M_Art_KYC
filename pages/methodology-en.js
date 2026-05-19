import HeimdallPageShell from '@/components/HeimdallPageShell'
import { ArrowRight, Database, GitBranch, Gauge, UserCheck, FileText } from 'lucide-react'

const steps = [["Data collection", "Registries, litigation, sanctions, adverse media, corporate links."], ["Correlation", "Matching people, companies, addresses, directors and jurisdictions."], ["Risk scoring", "Risk score across ownership, litigation, sanctions, reputation and conflicts."], ["Analyst review", "Human review to filter false positives and weak signals."], ["Report", "Executive summary, facts, red flags and recommendation."]]
const icons = [Database, GitBranch, Gauge, UserCheck, FileText]

export default function MethodologyPage() {
  return (
    <HeimdallPageShell title="HEIMDALL Methodology" description="HEIMDALL review methodology: data collection, correlation, risk scoring and analytical conclusion." switchHref="/methodology" switchLabel="RU">
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-5xl">
          <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">HEIMDALL Methodology</div>
          <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">A methodology that turns signals into executive conclusions</h1>
          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">HEIMDALL uses a structured approach: sources, relationships, facts, risk model, analyst review and decision-ready reporting.</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
        <div className="grid gap-5">
          {steps.map(([title, text], index) => {
            const Icon = icons[index]
            return (
              <div key={title} className="grid gap-6 rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:grid-cols-[auto_1fr_auto] md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200"><Icon className="h-7 w-7" /></div>
                <div><div className="text-sm text-sky-300">0{index + 1}</div><h2 className="mt-2 text-3xl font-semibold">{title}</h2><p className="mt-3 text-white/60">{text}</p></div>
                <ArrowRight className="hidden h-6 w-6 text-sky-300 md:block" />
              </div>
            )
          })}
        </div>
      </section>
    </HeimdallPageShell>
  )
}
