import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'

const emptySignal = { title: '', description: '', severity: 'medium', source: '' }
const emptyConnection = { from_label: '', to_label: '', relation_type: '', description: '' }

function inputClass(extra = '') {
  return `rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-sky-300/50 ${extra}`
}

export default function RiskIntelligenceObjectCard() {
  const router = useRouter()
  const { id } = router.query
  const [object, setObject] = useState(null)
  const [signals, setSignals] = useState([])
  const [connections, setConnections] = useState([])
  const [reports, setReports] = useState([])
  const [mode, setMode] = useState('loading')
  const [signalForm, setSignalForm] = useState(emptySignal)
  const [connectionForm, setConnectionForm] = useState(emptyConnection)
  const [reportText, setReportText] = useState('')
  const [message, setMessage] = useState('')

  async function loadCard() {
    if (!id) return
    setMessage('')
    try {
      const response = await fetch(`/api/risk-intelligence/objects/${id}`)
      const data = await response.json()
      if (!data.ok && !data.object) throw new Error(data.error || 'Не удалось загрузить объект')
      setObject(data.object || { id, title: 'Демо-объект', status: 'draft', risk_level: 'unknown', summary: '' })
      setSignals(Array.isArray(data.signals) ? data.signals : [])
      setConnections(Array.isArray(data.connections) ? data.connections : [])
      setReports(Array.isArray(data.reports) ? data.reports : [])
      setMode(data.mode || 'supabase')
    } catch (error) {
      setObject({ id, title: 'Демо-объект', object_type: 'candidate', status: 'draft', risk_level: 'unknown', summary: 'Раздел открыт в fallback-режиме.' })
      setMode('demo')
      setMessage(error?.message || 'Fallback-режим')
    }
  }

  useEffect(() => {
    loadCard()
  }, [id])

  async function saveObject(patch) {
    const nextObject = { ...object, ...patch }
    setObject(nextObject)
    try {
      const response = await fetch(`/api/risk-intelligence/objects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch)
      })
      const data = await response.json()
      if (data.object) setObject(data.object)
      setMode(data.mode || mode)
      setMessage('Сохранено')
    } catch {
      setMessage('Сохранено в демо-режиме')
    }
  }

  async function addSignal(event) {
    event.preventDefault()
    const payload = { ...signalForm, object_id: id }
    try {
      const response = await fetch('/api/risk-intelligence/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      setSignals((current) => [data.signal || { id: `local-${Date.now()}`, ...payload }, ...current])
      setSignalForm(emptySignal)
    } catch {
      setSignals((current) => [{ id: `local-${Date.now()}`, ...payload }, ...current])
    }
  }

  async function removeSignal(signalId) {
    setSignals((current) => current.filter((signal) => signal.id !== signalId))
    try {
      await fetch(`/api/risk-intelligence/signals/${signalId}`, { method: 'DELETE' })
    } catch {}
  }

  async function addConnection(event) {
    event.preventDefault()
    const payload = { ...connectionForm, object_id: id }
    try {
      const response = await fetch('/api/risk-intelligence/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      setConnections((current) => [data.connection || { id: `local-${Date.now()}`, ...payload }, ...current])
      setConnectionForm(emptyConnection)
    } catch {
      setConnections((current) => [{ id: `local-${Date.now()}`, ...payload }, ...current])
    }
  }

  async function removeConnection(connectionId) {
    setConnections((current) => current.filter((connection) => connection.id !== connectionId))
    try {
      await fetch(`/api/risk-intelligence/connections/${connectionId}`, { method: 'DELETE' })
    } catch {}
  }

  async function generateReport() {
    try {
      const response = await fetch('/api/risk-intelligence/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ object_id: id })
      })
      const data = await response.json()
      const report = data.report || { id: `local-report-${Date.now()}`, report_text: 'Не удалось сформировать отчет.' }
      setReportText(report.report_text || '')
      setReports((current) => [report, ...current])
      setMode(data.mode || mode)
    } catch {
      setReportText('Демо-отчет. API временно недоступен.')
    }
  }

  if (!object) {
    return (
      <main className="min-h-screen bg-[#05070d] text-white">
        <HeimdallNav />
        <section className="mx-auto max-w-6xl px-6 pt-28">Загрузка...</section>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{object.title || 'Объект'} - Risk Intelligence</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#05070d] text-white">
        <HeimdallNav />
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-28">
          <Link href="/analyst/risk-intelligence" className="text-sm text-sky-200 hover:text-sky-100">← Назад к объектам</Link>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <input className={inputClass('w-full text-3xl font-semibold')} value={object.title || ''} onChange={(event) => setObject({ ...object, title: event.target.value })} onBlur={(event) => saveObject({ title: event.target.value })} />
                <textarea className={inputClass('mt-4 min-h-28 w-full')} value={object.summary || ''} onChange={(event) => setObject({ ...object, summary: event.target.value })} onBlur={(event) => saveObject({ summary: event.target.value })} placeholder="Краткое описание объекта" />
              </div>
              <div className="grid gap-3 md:w-64">
                <select className={inputClass()} value={object.status || 'draft'} onChange={(event) => saveObject({ status: event.target.value })}>
                  <option value="draft">Черновик</option>
                  <option value="in_work">В работе</option>
                  <option value="review">Проверка</option>
                  <option value="report_ready">Отчет готов</option>
                  <option value="closed">Закрыто</option>
                </select>
                <select className={inputClass()} value={object.risk_level || 'unknown'} onChange={(event) => saveObject({ risk_level: event.target.value })}>
                  <option value="unknown">Риск не указан</option>
                  <option value="low">Низкий риск</option>
                  <option value="medium">Средний риск</option>
                  <option value="high">Высокий риск</option>
                  <option value="critical">Критический риск</option>
                </select>
              </div>
            </div>
            <div className="mt-4 text-sm text-white/50">Режим: {mode === 'demo' ? 'демо / fallback' : mode}. {message}</div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold">Сигналы риска</h2>
              <form onSubmit={addSignal} className="mt-5 grid gap-3">
                <input className={inputClass()} value={signalForm.title} onChange={(event) => setSignalForm({ ...signalForm, title: event.target.value })} placeholder="Название сигнала" required />
                <textarea className={inputClass('min-h-24')} value={signalForm.description} onChange={(event) => setSignalForm({ ...signalForm, description: event.target.value })} placeholder="Описание" />
                <div className="grid gap-3 md:grid-cols-2">
                  <select className={inputClass()} value={signalForm.severity} onChange={(event) => setSignalForm({ ...signalForm, severity: event.target.value })}>
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="critical">Критический</option>
                  </select>
                  <input className={inputClass()} value={signalForm.source} onChange={(event) => setSignalForm({ ...signalForm, source: event.target.value })} placeholder="Источник" />
                </div>
                <button className="rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-black">Добавить сигнал</button>
              </form>
              <div className="mt-5 grid gap-3">
                {signals.map((signal) => (
                  <div key={signal.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">{signal.title}</div>
                        <div className="mt-1 text-sm text-white/60">{signal.description}</div>
                      </div>
                      <button onClick={() => removeSignal(signal.id)} className="text-sm text-red-200">Удалить</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold">Связи</h2>
              <form onSubmit={addConnection} className="mt-5 grid gap-3">
                <input className={inputClass()} value={connectionForm.from_label} onChange={(event) => setConnectionForm({ ...connectionForm, from_label: event.target.value })} placeholder="От кого / от чего" required />
                <input className={inputClass()} value={connectionForm.to_label} onChange={(event) => setConnectionForm({ ...connectionForm, to_label: event.target.value })} placeholder="С кем / с чем связь" required />
                <input className={inputClass()} value={connectionForm.relation_type} onChange={(event) => setConnectionForm({ ...connectionForm, relation_type: event.target.value })} placeholder="Тип связи" />
                <textarea className={inputClass('min-h-24')} value={connectionForm.description} onChange={(event) => setConnectionForm({ ...connectionForm, description: event.target.value })} placeholder="Описание связи" />
                <button className="rounded-2xl bg-sky-300 px-5 py-3 font-semibold text-black">Добавить связь</button>
              </form>
              <div className="mt-5 grid gap-3">
                {connections.map((connection) => (
                  <div key={connection.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">{connection.from_label} → {connection.to_label}</div>
                        <div className="mt-1 text-sm text-white/60">{connection.relation_type} {connection.description ? `- ${connection.description}` : ''}</div>
                      </div>
                      <button onClick={() => removeConnection(connection.id)} className="text-sm text-red-200">Удалить</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Шаблонный отчет</h2>
                <p className="mt-2 text-white/60">Формирует черновик по объекту, сигналам и связям.</p>
              </div>
              <button onClick={generateReport} className="rounded-2xl bg-white px-5 py-3 font-semibold text-black">Сформировать отчет</button>
            </div>
            {reportText ? <pre className="mt-5 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white/75">{reportText}</pre> : null}
            {reports.length ? <div className="mt-4 text-sm text-white/50">Сохраненных отчетов: {reports.length}</div> : null}
          </section>
        </section>
      </main>
    </>
  )
}
