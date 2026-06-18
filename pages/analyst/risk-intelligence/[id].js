import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { ConnectionForm, ConnectionsMap, getOptionLabel, ReportPreview, RiskLevelBadge, RiskStatusBadge, SignalForm, SignalsList } from '@/components/analyst/RiskIntelligenceUI'
import { riskObjectTypes, riskStatuses } from '@/data/riskIntelligenceMockData'
import { calculateRiskScore, getRiskLevel } from '@/lib/riskScoring'
import { addLocalRiskConnection, addLocalRiskSignal, deleteLocalRiskConnection, deleteLocalRiskSignal, generateLocalRiskReport, getLocalRiskBundle, getStorageModeLabel, updateLocalRiskObjectStatus } from '@/lib/riskIntelligenceLocalStore'
import { ArrowLeft, Copy, FileText, Printer, Save } from 'lucide-react'

export default function RiskObjectPage() {
  const router = useRouter()
  const { id } = router.query
  const [bundle, setBundle] = useState(null)
  const [status, setStatus] = useState('new')
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')

  const reload = () => {
    if (!id) return
    const nextBundle = getLocalRiskBundle(id)
    setBundle(nextBundle)
    if (nextBundle.object) setStatus(nextBundle.object.status)
  }

  useEffect(() => {
    reload()
  }, [id])

  const signals = bundle?.signals || []
  const connections = bundle?.connections || []
  const score = useMemo(() => calculateRiskScore(signals), [signals])
  const level = useMemo(() => getRiskLevel(score), [score])
  const riskObject = bundle?.object ? { ...bundle.object, status, risk_score: score, risk_level: level } : null
  const report = bundle?.report || null

  const addSignal = (signal) => {
    addLocalRiskSignal(riskObject.id, signal)
    setMessage('Сигнал сохранен в автономном хранилище браузера.')
    reload()
  }

  const removeSignal = (signalId) => {
    deleteLocalRiskSignal(riskObject.id, signalId)
    setMessage('Сигнал удален из автономного хранилища.')
    reload()
  }

  const addConnection = (connection) => {
    addLocalRiskConnection(riskObject.id, connection)
    setMessage('Связь сохранена в автономном хранилище браузера.')
    reload()
  }

  const removeConnection = (connectionId) => {
    deleteLocalRiskConnection(riskObject.id, connectionId)
    setMessage('Связь удалена из автономного хранилища.')
    reload()
  }

  const saveStatus = () => {
    updateLocalRiskObjectStatus(riskObject.id, status)
    setMessage('Статус сохранен в автономном хранилище браузера.')
    reload()
  }

  const generateReport = () => {
    generateLocalRiskReport({ riskObject, signals, connections, notes })
    setMessage('Шаблонный отчет сформирован и сохранен локально.')
    reload()
  }

  const copySummary = async () => {
    const text = report?.executiveSummary || `${riskObject.name}: текущая оценка риска ${score}/100. Сигналов: ${signals.length}. Связей: ${connections.length}.`
    await navigator.clipboard.writeText(text)
    setMessage('Краткое резюме скопировано.')
  }

  if (!riskObject) {
    return (
      <AnalystLayout title="Объект проверки">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-8 text-white/65">Загрузка объекта проверки...</div>
      </AnalystLayout>
    )
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

      <div className="mb-8 rounded-[24px] border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-5 text-sm leading-7 text-[#F7D784]">
        {getStorageModeLabel()} Никаких обращений к Supabase из этой карточки нет.
        {message && <div className="mt-2 text-white/85">{message}</div>}
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Тип объекта', getOptionLabel(riskObjectTypes, riskObject.object_type)],
          ['Оценка риска', `${score}/100`],
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
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:flex-wrap">
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
            {riskStatuses.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <button type="button" onClick={saveStatus} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white"><Save className="h-4 w-4" /> Сохранить статус</button>
          <button type="button" onClick={generateReport} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white"><FileText className="h-4 w-4" /> Сформировать отчет</button>
          <button type="button" onClick={copySummary} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white"><Copy className="h-4 w-4" /> Скопировать резюме</button>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white"><Printer className="h-4 w-4" /> Печать</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <SignalForm onAdd={addSignal} />
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6"><div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Сигналы риска</div><SignalsList signals={signals} onRemove={removeSignal} /></div>
          <ConnectionForm onAdd={addConnection} />
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6"><div className="mb-5 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Карта связей</div><ConnectionsMap connections={connections} onRemove={removeConnection} /></div>
          {report && <ReportPreview report={report} />}
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 xl:sticky xl:top-6 xl:h-fit">
          <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Заметки аналитика</div>
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Факты, вопросы клиенту, гипотезы и ограничения проверки..." className="mt-5 min-h-80 w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white outline-none focus:border-sky-300/40" />
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">Следующие действия аналитика: уточнить источник риска, проверить подтверждающие материалы, запросить дополнительную информацию у клиента, подготовить финальный вывод.</div>
        </div>
      </div>
    </AnalystLayout>
  )
}
