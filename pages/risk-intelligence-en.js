import HeimdallPageShell from '@/components/HeimdallPageShell'

export default function RiskIntelligencePublicPageEn() {
  return (
    <HeimdallPageShell title="Risk Intelligence Center" description="HEIMDALL structures data, links and risk signals into a single analytical picture." switchHref="/risk-intelligence" switchLabel="RU">
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-4xl">
          <div className="text-sm uppercase tracking-[0.28em] text-sky-300/80">HEIMDALL Intelligence Core</div>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">HEIMDALL Risk Intelligence Center</h1>
          <p className="mt-7 text-xl leading-9 text-white/66">We turn fragmented data, facts, relationships and risk signals into one analytical picture, helping businesses make decisions before risk becomes damage.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#lead" className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white">Request a check</a>
            <a href="/analyst/risk-intelligence" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/80">Analyst workspace</a>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            ['Check objects', 'Candidates, employees, counterparties, contractors, household staff and internal incidents.'],
            ['Relationship map', 'People, companies, phones, emails, domains, addresses, documents and intersections between objects.'],
            ['Risk report', 'Facts, signals, contradictions, uncertainty areas and decision recommendations.']
          ].map(([title, text]) => (
            <div key={title} className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[34px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">How it works</h2>
          <p className="mt-4 text-base leading-8 text-white/64">An analyst creates a check card, loads a large raw data set from multiple sources, and the system extracts entities, facts, links, risks and contradictions. Final conclusions remain human-reviewed.</p>
        </div>
      </section>
    </HeimdallPageShell>
  )
}
