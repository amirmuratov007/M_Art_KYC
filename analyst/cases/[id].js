import { useRouter } from 'next/router'
import { useState } from 'react'
import { AnalystLayout, StatusBadge, RiskBadge, DocumentList, UploadBox } from '@/components/analyst/AnalystUI'
import { analystCases, statuses } from '@/data/analystMockData'

export default function CaseDetailPage() {
  const router = useRouter()
  const item = analystCases.find((caseItem) => caseItem.id === router.query.id) || analystCases[0]
  const [status, setStatus] = useState(item.status)
  const [notes, setNotes] = useState(item.notes)

  return (
    <AnalystLayout title={item.subject}>
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{item.id}</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">{item.subject}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">{item.summary}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <StatusBadge status={status} />
          <RiskBadge score={item.risk} />
        </div>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Client', item.client],
          ['Type', item.type],
          ['Analyst', item.analyst],
          ['Deadline', item.deadline]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[26px] border border-white/10 bg-white/[0.045] p-5">
            <div className="text-sm text-white/40">{label}</div>
            <div className="mt-2 font-semibold text-white/85">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Case Status</div>
        <div className="mt-5 flex flex-col gap-4 md:flex-row">
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button onClick={() => alert('AI draft generation will be connected in Stage 2')} className="rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">Generate AI Draft</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Key Findings</div>
            <div className="grid gap-3">
              {item.findings.map((finding) => (
                <div key={finding} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">{finding}</div>
              ))}
            </div>
          </div>

          <UploadBox />

          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Documents</div>
            <DocumentList documents={item.documents} />
          </div>
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
          <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Analyst Notes</div>
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-5 min-h-64 w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white outline-none focus:border-sky-300/40" />
          <button onClick={() => alert('Notes saved locally in mock mode')} className="mt-4 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white">Save notes</button>
        </div>
      </div>
    </AnalystLayout>
  )
}
