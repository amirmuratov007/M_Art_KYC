import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { RiskObjectCard } from '@/components/analyst/RiskIntelligenceUI'
import { riskObjectTypes, riskStatuses } from '@/data/riskIntelligenceMockData'
import { listLocalRiskObjects, resetRiskStore, getStorageModeLabel } from '@/lib/riskIntelligenceLocalStore'
import { PlusCircle, RefreshCcw, Search } from 'lucide-react'

export default function RiskIntelligenceIndex() {
  const [objects, setObjects] = useState([])
  const [query, setQuery] = useState('')
  const [riskLevel, setRiskLevel] = useState('all')
  const [status, setStatus] = useState('all')
  const [objectType, setObjectType] = useState('all')

  const reload = () => setObjects(listLocalRiskObjects())

  useEffect(() => {
    reload()
    const onUpdate = () => reload()
    window.addEventListener('heimdall-risk-store-updated', onUpdate)
    return () => window.removeEventListener('heimdall-risk-store-updated', onUpdate)
  }, [])

  const filteredObjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return objects.filter((item) => {
      const matchesQuery = !normalizedQuery || [item.name, item.description, item.source_request_id].filter(Boolean).join(' ').toLowerCase().includes(normalizedQuery)
      const matchesRisk = riskLevel === 'all' || item.risk_level === riskLevel
      const matchesStatus = status === 'all' || item.status === status
      const matchesType = objectType === 'all' || item.object_type === objectType
      return matchesQuery && matchesRisk && matchesStatus && matchesType
    })
  }, [objects, query, riskLevel, status, objectType])

  const counters = useMemo(() => ({
    total: objects.length,
    high: objects.filter((item) => ['high', 'critical'].includes(item.risk_level)).length,
    active: objects.filter((item) => ['new', 'in_progress', 'review'].includes(item.status)).length,
    completed: objects.filter((item) => item.status === 'completed').length
  }), [objects])

  const resetDemo = () => {
    resetRiskStore()
    reload()
  }

  return (
    <AnalystLayout title="Центр риск-аналитики">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">HEIMDALL</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Центр риск-аналитики</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">Автономный рабочий модуль без Supabase. Объекты, сигналы, связи и отчеты сохраняются в браузере аналитика и не зависят от внешней базы.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={resetDemo} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/75 hover:bg-white/10"><RefreshCcw className="h-4 w-4" /> Сбросить демо</button>
          <Link href="/analyst/risk-intelligence/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D6A84F] px-5 py-3 text-sm font-semibold text-[#050816]"><PlusCircle className="h-4 w-4" /> Создать объект</Link>
        </div>
      </div>

      <div className="mb-8 rounded-[24px] border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-5 text-sm leading-7 text-[#F7D784]">
        {getStorageModeLabel()} Это временное рабочее хранилище для этапа без Supabase. Для постоянной серверной базы следующим шагом подключается другая база, а не Supabase.
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {[
          ['Всего объектов', counters.total],
          ['Высокий риск', counters.high],
          ['В работе', counters.active],
          ['Исполнено', counters.completed]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5">
            <div className="text-sm text-white/45">{label}</div>
            <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/70">
          <Search className="h-4 w-4 text-white/40" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по объектам" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" />
        </label>
        <select value={riskLevel} onChange={(event) => setRiskLevel(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-3 text-sm text-white"><option value="all">Все уровни риска</option><option value="low">Низкий</option><option value="medium">Средний</option><option value="high">Высокий</option><option value="critical">Критический</option></select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-3 text-sm text-white"><option value="all">Все статусы</option>{riskStatuses.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
        <select value={objectType} onChange={(event) => setObjectType(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-3 text-sm text-white"><option value="all">Все типы</option>{riskObjectTypes.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {filteredObjects.map((item) => <RiskObjectCard key={item.id} item={item} />)}
      </div>

      {!filteredObjects.length && (
        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-8 text-center text-white/55">Объекты не найдены. Измени фильтры или создай новый объект проверки.</div>
      )}
    </AnalystLayout>
  )
}
