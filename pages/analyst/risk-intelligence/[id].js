import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { ConnectionForm, ConnectionsMap, getOptionLabel, ReportPreview, RiskLevelBadge, RiskStatusBadge, SignalForm, SignalsList } from '@/components/analyst/RiskIntelligenceUI'
import { getConnectionsByObjectId, getRiskObjectById, getSignalsByObjectId, riskObjectTypes, riskStatuses } from '@/data/riskIntelligenceMockData'
import { buildFallbackRiskReport, calculateRiskScore, getRiskLevel } from '@/lib/riskScoring'
import { ArrowLeft, FileText } from 'lucide-react'

export default function RiskObjectDetailPage() {
  const router = useRouter()
  const riskObject = getRiskObjectById(router.query.id)
  const [status, setStatus] = useState(riskObject.status)
  const [signals, setSignals] = useState(getSignalsByObjectId(riskObject.id))
  const [connections, setConnections] = useState(getConnectionsByObjectId(riskObject.id))
  const [notes, setNotes] = useState('')
  const [report, setReport] = useState(null)

  const score = useMemo(() => calculateRiskScore(signals), [signals])
  const level = useMemo(() => getRiskLevel(score), [score])

  const addSignal = (signal) => {
    setSignals((current) => [{ ...signal, id: `local-sig-${Date.now()}`, object_id: riskObject.id }, ...current])
    setReport(null)
  }

  const addConnection = (connection) => {
    setConnections((current) => [{ ...connection, id: `local-con-${Date.now()}`, object_id: riskObject.id }, ...current])
    setReport(null)
  }

  const generateReport = () => {
    setReport(buildFallbackRiskReport({ riskObject: { ...riskObject, status, risk_score: score, risk_level: level }, signals, connections, notes }))
  }

  return (
    <AnalystLayout title={riskObject.name}>
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <Link href="/analyst/risk-intelligence" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200"><ArrowLeft className="h-4 w-4" /> Назад к центру</Link>
          <div className="mt-6 text-sm uppercase tracking-[0.25em] text-sky-300/80">{riskObject.source_request_id || riskObject.id}</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">{riskObject.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">{riskObject.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <RiskStatusBadge status={status} />
          <RiskLevelBadge level={level} score={score} />
        </div>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Тип объекта', getOptionLabel(riskObjectTypes, riskObject.object_type)],
          ['Risk score', `${score}/100`],
          ['Сигналы риска', signals.length],
          ['Связи', connections.length]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[26px] border border-white/10 bg-white/[0.045] p-5">
            <div className="text-sm text-white/40">{label}</div>
            <div className="mt-2 font-semibold text-white/85">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Статус и отчет</div>
        <div className="mt-5 flex flex-col gap-4 md:flex-row">
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
            {riskStatuses.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <button type="button" onClick={generateReport} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white"><FileText className="h-4 w-4" /> Сформировать шаблонный отчет</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <SignalForm onAdd={addSignal} />

          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Сигналы риска</div>
            <SignalsList signals={signals} onRemove={(id) => { setSignals((current) => current.filter((item) => item.id !== id)); setReport(null) }} />
          </div>

          <ConnectionForm onAdd={addConnection} />

          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="mb-5 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Карта связей</div>
            <ConnectionsMap connections={connections} onRemove={(id) => { setConnections((current) => current.filter((item) => item.id !== id)); setReport(null) }} />
          </div>

          {report && <ReportPreview report={report} />}
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 xl:sticky xl:top-6 xl:h-fit">
          <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Заметки аналитика</div>
          <textarea value={notes} onChange={(event) => { setNotes(event.target.value); setReport(null) }} placeholder="Факты, вопросы клиенту, гипотезы и ограничения проверки..." className="mt-5 min-h-80 w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white outline-none focus:border-sky-300/40" />
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">
            Stage 1 работает локально: добавленные сигналы, связи и заметки не записываются в Supabase. Это безопасный каркас для проверки интерфейса и логики.
          </div>
        </div>
      </div>
    </AnalystLayout>
  )
}
