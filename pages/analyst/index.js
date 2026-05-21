import { AnalystLayout, CaseCard } from '@/components/analyst/AnalystUI'
import { analystCases } from '@/data/analystMockData'

export default function AnalystDashboard() {
  const active = analystCases.filter((item) => item.status !== 'Completed').length
  const highRisk = analystCases.filter((item) => item.risk >= 80).length
  const avgRisk = Math.round(analystCases.reduce((sum, item) => sum + item.risk, 0) / analystCases.length)

  return (
    <AnalystLayout title="Dashboard">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">HEIMDALL Analyst Console</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Analyst Dashboard</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">Internal workspace for managing checks, documents, notes and AI draft preparation.</p>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-3">
        {[
          ['Active cases', active],
          ['High-risk cases', highRisk],
          ['Average risk score', `${avgRisk}/100`]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="text-sm text-white/45">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-[#F7D784]">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {analystCases.slice(0, 4).map((item) => <CaseCard key={item.id} item={item} />)}
      </div>
    </AnalystLayout>
  )
}
