import { aiDrafts } from '@/data/aiDraftMockData'

function SeverityBadge({ severity }) {
  const cls = severity === 'Высокий'
    ? 'border-red-300/25 bg-red-300/10 text-red-200'
    : severity === 'Средний'
      ? 'border-amber-300/25 bg-amber-300/10 text-amber-200'
      : 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'

  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{severity}</span>
}

export default function AIDraftView({ caseId = 'HMD-2026-001' }) {
  const draft = aiDrafts[caseId] || aiDrafts['HMD-2026-001']

  return (
    <div className="grid gap-6">
      <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-7">
        <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Черновик ИИ-отчета</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{draft.subject}</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sm text-sky-100">{draft.reportType}</span>
          <span className="rounded-full border border-red-300/25 bg-red-300/10 px-3 py-1 text-sm text-red-200">{draft.riskLevel} · {draft.riskScore}/100</span>
        </div>
      </div>

      <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Краткое резюме</div>
        <div className="grid gap-3">
          {draft.executiveSummary.map((item) => (
            <p key={item} className="text-sm leading-7 text-white/68">{item}</p>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Выделенные объекты</div>
        <div className="grid gap-3 md:grid-cols-2">
          {draft.entities.map((entity) => (
            <div key={`${entity.type}-${entity.name}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[#F7D784]/80">{entity.type}</div>
              <div className="mt-2 font-semibold">{entity.name}</div>
              <div className="mt-1 text-xs text-white/40">уверенность: {Math.round(entity.confidence * 100)}%</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Ключевые признаки</div>
        <div className="grid gap-4">
          {draft.findings.map((finding) => (
            <article key={finding.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SeverityBadge severity={finding.severity} />
                <span className="text-xs text-white/40">{finding.category}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{finding.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/64">{finding.description}</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-6 text-white/50">Источник: {finding.source}</div>
              <div className="mt-4 text-sm leading-7 text-sky-100/75">Рекомендация: {finding.recommendation}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Хронология</div>
        <div className="grid gap-3">
          {draft.timeline.map(([date, event]) => (
            <div key={`${date}-${event}`} className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-[100px_1fr]">
              <div className="font-semibold text-[#F7D784]">{date}</div>
              <div className="text-sm text-white/68">{event}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-4 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Итоговая рекомендация</div>
        <p className="text-lg leading-8 text-white/75">{draft.finalRecommendation}</p>
      </section>
    </div>
  )
}
