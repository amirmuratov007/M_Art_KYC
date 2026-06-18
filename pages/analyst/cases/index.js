import { useMemo, useState } from 'react'
import { AnalystLayout, CaseCard } from '@/components/analyst/AnalystUI'
import { analystCases, statuses, checkTypes } from '@/data/analystMockData'

export default function CasesPage() {
  const [status, setStatus] = useState('Все')
  const [type, setType] = useState('Все')

  const cases = useMemo(() => analystCases.filter((item) => {
    return (status === 'Все' || item.status === status) && (type === 'Все' || item.type === type)
  }), [status, type])

  return (
    <AnalystLayout title="Проверки">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Проверки</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Все проверки</h1>
      </div>

      <div className="mb-8 grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.045] p-5 md:grid-cols-2">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
          <option>Все</option>
          {statuses.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
          <option>Все</option>
          {checkTypes.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {cases.map((item) => <CaseCard key={item.id} item={item} />)}
      </div>
    </AnalystLayout>
  )
}
