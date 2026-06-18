import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'

const legalDisclaimer = 'This report is an analytical document and does not contain assertions of guilt, violation of law or bad faith by any person or organization. The conclusions are based on provided data, open indicators and analytical assessment. For legally significant decisions, additional verification and consultation with a qualified specialist are recommended.'

function label(value) {
  const labels = {
    draft: 'Draft',
    in_work: 'In progress',
    review: 'Review',
    report_ready: 'Report ready',
    closed: 'Closed',
    unknown: 'Not set',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
    candidate: 'Candidate',
    company: 'Company',
    supplier: 'Supplier',
    person: 'Person',
    asset: 'Asset',
    incident: 'Incident',
    request: 'CRM request'
  }
  return labels[value] || value || 'Not set'
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(value ? new Date(value) : new Date())
  } catch {
    return new Date().toLocaleString('en-GB')
  }
}

function sectionText(title, body) {
  return `${title}\n${body || 'Not provided.'}`
}

export default function ClientRiskReportPageEn() {
  const router = useRouter()
  const { id } = router.query
  const [object, setObject] = useState(null)
  const [signals, setSignals] = useState([])
  const [connections, setConnections] = useState([])
  const [reports, setReports] = useState([])
  const [mode, setMode] = useState('loading')
  const [message, setMessage] = useState('')

  async function loadReport() {
    if (!id) return
    try {
      const response = await fetch(`/api/risk-intelligence/objects/${id}`)
      const data = await response.json()
      setObject(data.object || { id, title: 'Demo object', object_type: 'candidate', risk_level: 'unknown', summary: 'Demo mode.' })
      setSignals(Array.isArray(data.signals) ? data.signals : [])
      setConnections(Array.isArray(data.connections) ? data.connections : [])
      setReports(Array.isArray(data.reports) ? data.reports : [])
      setMode(data.mode || 'supabase')
      if (data.warning) setMessage(data.warning)
    } catch (error) {
      setObject({ id, title: 'Demo object', object_type: 'candidate', risk_level: 'unknown', summary: 'Fallback mode.' })
      setMode('demo')
      setMessage(error?.message || 'Fallback mode')
    }
  }

  useEffect(() => {
    loadReport()
  }, [id])

  async function refreshDraft() {
    try {
      const response = await fetch('/api/risk-intelligence/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ object_id: id, language: 'en' })
      })
      const data = await response.json()
      if (data.report) setReports((current) => [data.report, ...current])
      setMode(data.mode || mode)
      setMessage(data.warning || 'Draft report refreshed')
    } catch {
      setMessage('Could not refresh the report. The page is still available for printing.')
    }
  }

  const reportText = useMemo(() => {
    if (!object) return ''
    const signalLines = signals.length ? signals.map((signal, index) => `${index + 1}. ${signal.title || 'Signal'} - ${label(signal.severity)}${signal.description ? `\n${signal.description}` : ''}`).join('\n') : 'No risk signals have been added.'
    const connectionLines = connections.length ? connections.map((connection, index) => `${index + 1}. ${connection.from_label || 'Object'} -> ${connection.to_label || 'Connection'} (${connection.relation_type || 'connection type not set'})${connection.description ? `\n${connection.description}` : ''}`).join('\n') : 'No connections have been added.'
    return [
      'HEIMDALL preliminary risk report',
      sectionText('Object', object.title),
      sectionText('Object type', label(object.object_type)),
      sectionText('Date generated', formatDate(new Date())),
      sectionText('Risk level', label(object.risk_level)),
      sectionText('Risk score', label(object.risk_level)),
      sectionText('Executive summary', object.summary || 'No summary provided.'),
      sectionText('Key risk indicators', signalLines),
      sectionText('Connection map', connectionLines),
      sectionText('Items requiring additional verification', 'Risk sources, supporting materials, request context, data freshness and potentially conflicting information.'),
      sectionText('Recommendations', 'Conduct additional verification, request missing materials from the client and prepare the final analytical conclusion after validating the indicators.'),
      sectionText('Methodology note', 'This material is a preliminary analytical assessment and does not replace full verification, legal review or a decision by competent authorities.'),
      sectionText('Legal disclaimer', legalDisclaimer)
    ].join('\n\n')
  }, [object, signals, connections])

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(reportText)
      setMessage('Report copied')
    } catch {
      setMessage('Automatic copy failed. Please select the text manually.')
    }
  }

  if (!object) {
    return <main className="min-h-screen bg-[#05070d] text-white"><HeimdallNav /><section className="mx-auto max-w-5xl px-6 pt-28">Loading...</section></main>
  }

  return (
    <>
      <Head>
        <title>Client report - HEIMDALL</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#05070d] text-white print:bg-white print:text-black">
        <div className="print:hidden"><HeimdallNav /></div>
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-28 print:px-0 print:py-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <Link href={`/analyst/risk-intelligence-en/${id}`} className="text-sm text-sky-200 hover:text-sky-100">← Back to object</Link>
            <div className="flex flex-wrap gap-3">
              <button onClick={copyReport} className="rounded-2xl border border-sky-300/20 bg-sky-300/10 px-5 py-3 font-semibold text-sky-100">Copy report</button>
              <button onClick={() => window.print()} className="rounded-2xl bg-white px-5 py-3 font-semibold text-black">Print / save as PDF</button>
              <button onClick={refreshDraft} className="rounded-2xl border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-5 py-3 font-semibold text-[#F7D784]">Refresh draft report</button>
            </div>
          </div>

          {mode === 'demo' ? <div className="mb-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100 print:hidden">Demo mode is enabled. To store data permanently, run the SQL file in Supabase.</div> : null}
          {message ? <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70 print:hidden">{message}</div> : null}

          <article className="rounded-[36px] border border-white/10 bg-white/[0.06] p-7 shadow-2xl print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none md:p-10">
            <div className="border-b border-white/10 pb-8 print:border-black/20">
              <p className="text-sm uppercase tracking-[0.32em] text-[#F7D784] print:text-black/60">HEIMDALL</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">HEIMDALL preliminary risk report</h1>
              <p className="mt-4 text-white/58 print:text-black/60">Date generated: {formatDate(new Date())}</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Metric title="Object" value={object.title || 'Untitled'} />
              <Metric title="Object type" value={label(object.object_type)} />
              <Metric title="Risk level" value={label(object.risk_level)} />
              <Metric title="Risk score" value={label(object.risk_level)} />
            </div>

            <ReportSection title="Executive summary">{object.summary || 'No summary provided.'}</ReportSection>
            <ReportSection title="Key risk indicators">
              {signals.length ? signals.map((signal, index) => <div key={signal.id || index} className="mb-4"><strong>{index + 1}. {signal.title || 'Signal'} - {label(signal.severity)}</strong><p className="mt-1 text-white/62 print:text-black/70">{signal.description || 'No description provided.'}</p></div>) : 'No risk signals have been added.'}
            </ReportSection>
            <ReportSection title="Connection map">
              {connections.length ? connections.map((connection, index) => <div key={connection.id || index} className="mb-4"><strong>{connection.from_label || 'Object'} → {connection.to_label || 'Connection'}</strong><p className="mt-1 text-white/62 print:text-black/70">{connection.relation_type || 'Connection type not set'}{connection.description ? ` - ${connection.description}` : ''}</p></div>) : 'No connections have been added.'}
            </ReportSection>
            <ReportSection title="Items requiring additional verification">Risk sources, supporting materials, request context, data freshness and potentially conflicting information.</ReportSection>
            <ReportSection title="Recommendations">Conduct additional verification, request missing materials from the client and prepare the final analytical conclusion after validating the indicators.</ReportSection>
            <ReportSection title="Methodology note">This material is a preliminary analytical assessment and does not replace full verification, legal review or a decision by competent authorities.</ReportSection>
            <ReportSection title="Legal disclaimer">{legalDisclaimer}</ReportSection>
            {reports.length ? <div className="mt-8 text-sm text-white/40 print:text-black/45">Saved draft reports: {reports.length}</div> : null}
          </article>
        </section>
      </main>
    </>
  )
}

function Metric({ title, value }) {
  return <div className="rounded-3xl border border-white/10 bg-black/20 p-5 print:border-black/15 print:bg-white"><div className="text-sm text-white/45 print:text-black/50">{title}</div><div className="mt-2 text-xl font-semibold">{value}</div></div>
}

function ReportSection({ title, children }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-3 whitespace-pre-wrap leading-8 text-white/70 print:text-black/75">{children}</div>
    </section>
  )
}
