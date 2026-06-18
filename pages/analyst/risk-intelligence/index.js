import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { RiskObjectCard } from '@/components/analyst/RiskIntelligenceUI'
import { riskObjectTypes, riskStatuses } from '@/data/riskIntelligenceMockData'
import { listRiskObjects } from '@/lib/riskIntelligenceStore'
import { PlusCircle } from 'lucide-react'

export async function getServerSideProps() {
  const result = await listRiskObjects()

  return {
    props: {
      initialObjects: result.data || [],
      storeMode: result.mode || 'demo',
      storeWarning: result.warning || null
    }
  }
}

export default function RiskIntelligenceConsolePage({ initialObjects, storeMode, storeWarning }) {
  const [status, setStatus] = useState('all')
  const [type, setType] = useState('all')
  const [level, setLevel] = useState('all')
  const [riskObjects] = useState(initialObjects || [])

  const objects = useMemo(() => riskObjects.filter((item) => {
    return (status === 'all' || item.status === status) && (type === 'all' || item.object_type === type) && (level === 'all' || item.risk_level === level)
  }), [riskObjects, status, type, level])

  const active = riskObjects.filter((item) => item.status !== 'completed' && item.status !== 'archived').length
  const highRisk = riskObjects.filter((item) => ['high', 'critical'].includes(item.risk_level)).length
  const avgRisk = riskObjects.length ? Math.round(riskObjects.reduce((sum, item) => sum + item.risk_score, 0) / riskObjects.length) : 0

  return (
    <AnalystLayout title="Центр риск-аналитики">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Ядро аналитики HEIMDALL</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Центр риск-аналитики</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">Объекты проверки, сигналы риска, связи, оценка риска и шаблонный отчет. На этом этапе данные уже могут сохраняться в Supabase, если таблицы созданы.</p>
        </div>
        <Link href="/analyst/risk-intelligence/new" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">
          <PlusCircle className="h-4 w-4" /> Создать объект
        </Link>
      </div>

      <div className={`mb-8 rounded-[24px] border p-5 text-sm leading-7 ${storeMode === 'live' ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100' : 'border-[#D6A84F]/20 bg-[#D6A84F]/10 text-[#F7D784]'}`}>
        {storeMode === 'live'
          ? 'Режим хранения: Supabase подключен. Новые объекты, сигналы, связи и отчеты будут записываться в базу.'
          : `Режим хранения: демонстрационный. ${storeWarning || 'Чтобы включить запись, примените SQL и проверьте env-переменные Supabase.'}`}
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-3">
        {[
          ['Активные объекты', active],
          ['Высокий риск', highRisk],
          ['Средняя оценка', `${avgRisk}/100`]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="text-sm text-white/45">{label}</div>
            <div className="mt-3 text-4xl font-semibold text-[#F7D784]">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-4 rounded-[30px] border border-white/10 bg-white/[0.045] p-5 md:grid-cols-3">
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
          <option value="all">Все статусы</option>
          {riskStatuses.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
        <select value={type} onChange={(event) => setType(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
          <option value="all">Все типы</option>
          {riskObjectTypes.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
        <select value={level} onChange={(event) => setLevel(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
          <option value="all">Все уровни риска</option>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
          <option value="critical">Критический</option>
        </select>
      </div>

      {objects.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {objects.map((item) => <RiskObjectCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-8 text-white/60">Объектов пока нет. Создайте первый объект проверки.</div>
      )}
    </AnalystLayout>
  )
}
