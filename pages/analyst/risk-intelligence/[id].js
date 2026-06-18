import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { ConnectionForm, ConnectionsMap, getOptionLabel, ReportPreview, RiskLevelBadge, RiskStatusBadge, SignalForm, SignalsList } from '@/components/analyst/RiskIntelligenceUI'
import { getRiskObjectBundle } from '@/lib/riskIntelligenceStore'
import { riskObjectTypes, riskStatuses } from '@/data/riskIntelligenceMockData'
import { calculateRiskScore, getRiskLevel } from '@/lib/riskScoring'
import { ArrowLeft, FileText, Save } from 'lucide-react'

export async function getServerSideProps(context) {
  const result = await getRiskObjectBundle(context.params.id)

  return {
    props: {
      initialBundle: result.data,
      storeMode: result.mode || 'demo',
      storeWarning: result.warning || null
    }
  }
}

async function parseApiResponse(response) {
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || 'Ошибка сохранения.')
  return body
}

export default function RiskObjectDetailPage({ initialBundle, storeMode, storeWarning }) {
  const riskObject = initialBundle.object
  const [status, setStatus] = useState(riskObject.status)
  const [signals, setSignals] = useState(initialBundle.signals || [])
  const [connections, setConnections] = useState(initialBundle.connections || [])
  const [notes, setNotes] = useState('')
  const [report, setReport] = useState(initialBundle.report || null)
  const [message, setMessage] = useState(storeWarning || '')
  const [saving, setSaving] = useState(false)

  const score = useMemo(() => calculateRiskScore(signals), [signals])
  const level = useMemo(() => getRiskLevel(score), [score])
  const currentObject = { ...riskObject, status, risk_score: score, risk_level: level }

  const addSignal = async (signal) => {
    const optimisticSignal = { ...signal, id: `local-sig-${Date.now()}`, object_id: riskObject.id }
    setSignals((current) => [optimisticSignal, ...current])
    setReport(null)
    setMessage('')

    try {
      const response = await fetch('/api/risk-intelligence/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...signal, object_id: riskObject.id })
      })
      const result = await parseApiResponse(response)
      if (result.mode === 'live' && result.data?.signal) {
        setSignals((current) => current.map((item) => item.id === optimisticSignal.id ? result.data.signal : item))
        setMessage('Сигнал сохранен в Supabase.')
      } else if (result.warning) {
        setMessage(result.warning)
      }
    } catch (error) {
      setMessage(`Сигнал добавлен на странице, но не записан в базу: ${error.message}`)
    }
  }

  const removeSignal = async (id) => {
    setSignals((current) => current.filter((item) => item.id !== id))
    setReport(null)
    setMessage('')

    try {
      const response = await fetch(`/api/risk-intelligence/signals/${id}?object_id=${riskObject.id}`, { method: 'DELETE' })
      const result = await parseApiResponse(response)
      setMessage(result.mode === 'live' ? 'Сигнал удален из Supabase.' : result.warning)
    } catch (error) {
      setMessage(`Сигнал удален на странице, но база не обновилась: ${error.message}`)
    }
  }

  const addConnection = async (connection) => {
    const optimisticConnection = { ...connection, id: `local-con-${Date.now()}`, object_id: riskObject.id }
    setConnections((current) => [optimisticConnection, ...current])
    setReport(null)
    setMessage('')

    try {
      const response = await fetch('/api/risk-intelligence/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...connection, object_id: riskObject.id })
      })
      const result = await parseApiResponse(response)
      if (result.mode === 'live' && result.data) {
        setConnections((current) => current.map((item) => item.id === optimisticConnection.id ? result.data : item))
        setMessage('Связь сохранена в Supabase.')
      } else if (result.warning) {
        setMessage(result.warning)
      }
    } catch (error) {
      setMessage(`Связь добавлена на странице, но не записана в базу: ${error.message}`)
    }
  }

  const removeConnection = async (id) => {
    setConnections((current) => current.filter((item) => item.id !== id))
    setReport(null)
    setMessage('')

    try {
      const response = await fetch(`/api/risk-intelligence/connections/${id}?object_id=${riskObject.id}`, { method: 'DELETE' })
      const result = await parseApiResponse(response)
      setMessage(result.mode === 'live' ? 'Связь удалена из Supabase.' : result.warning)
    } catch (error) {
      setMessage(`Связь удалена на странице, но база не обновилась: ${error.message}`)
    }
  }

  const saveStatus = async () => {
    setSaving(true)
    setMessage('')
    try {
      const response = await fetch(`/api/risk-intelligence/objects/${riskObject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      const result = await parseApiResponse(response)
      setMessage(result.mode === 'live' ? 'Статус сохранен в Supabase.' : result.warning)
    } catch (error) {
      setMessage(`Статус изменен на странице, но не записан в базу: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const generateReport = async () => {
    setSaving(true)
    setMessage('')
    try {
      const response = await fetch('/api/risk-intelligence/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riskObject: currentObject, signals, connections, notes })
      })
      const result = await parseApiResponse(response)
      setReport(result.data)
      setMessage(result.mode === 'live' ? 'Шаблонный отчет сформирован и сохранен в Supabase.' : result.warning)
    } catch (error) {
      setMessage(`Не удалось сохранить отчет: ${error.message}`)
    } finally {
      setSaving(false)
    }
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

      <div className={`mb-8 rounded-[24px] border p-5 text-sm leading-7 ${storeMode === 'live' ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100' : 'border-[#D6A84F]/20 bg-[#D6A84F]/10 text-[#F7D784]'}`}>
        {storeMode === 'live'
          ? 'Supabase подключен. Изменения карточки будут сохраняться в базу.'
          : `Демонстрационный режим. ${storeWarning || 'Чтобы включить запись, примените SQL и проверьте env-переменные Supabase.'}`}
        {message && <div className="mt-2 text-white/80">{message}</div>}
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
        <div className="mt-5 flex flex-col gap-4 md:flex-row">
          <select value={status} onChange={(event) => { setStatus(event.target.value); setReport(null) }} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
            {riskStatuses.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <button type="button" onClick={saveStatus} disabled={saving} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white disabled:opacity-60"><Save className="h-4 w-4" /> Сохранить статус</button>
          <button type="button" onClick={generateReport} disabled={saving} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white disabled:opacity-60"><FileText className="h-4 w-4" /> Сформировать шаблонный отчет</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <SignalForm onAdd={addSignal} />

          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Сигналы риска</div>
            <SignalsList signals={signals} onRemove={removeSignal} />
          </div>

          <ConnectionForm onAdd={addConnection} />

          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="mb-5 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Карта связей</div>
            <ConnectionsMap connections={connections} onRemove={removeConnection} />
          </div>

          {report && <ReportPreview report={report} />}
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 xl:sticky xl:top-6 xl:h-fit">
          <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Заметки аналитика</div>
          <textarea value={notes} onChange={(event) => { setNotes(event.target.value); setReport(null) }} placeholder="Факты, вопросы клиенту, гипотезы и ограничения проверки..." className="mt-5 min-h-80 w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white outline-none focus:border-sky-300/40" />
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">
            Этап 2: при наличии таблиц Supabase карточка сохраняет сигналы, связи, статус и шаблонный отчет. Если таблицы еще не созданы, интерфейс продолжит работать в демонстрационном режиме.
          </div>
        </div>
      </div>
    </AnalystLayout>
  )
}
