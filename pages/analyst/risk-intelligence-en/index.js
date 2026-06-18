import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'

const fallbackObjects = [
  {
    id: 'demo-1',
    title: 'Demo object: candidate for a sensitive role',
    object_type: 'candidate',
    status: 'draft',
    risk_level: 'medium',
    summary: 'Demo mode. Run the SQL file to enable Supabase persistence.'
  }
]

function badge(value) {
  const labels = {
    draft: 'Draft',
    in_work: 'In progress',
    review: 'Review',
    report_ready: 'Report ready',
    closed: 'Closed',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
    unknown: 'Not set',
    candidate: 'Candidate',
    company: 'Company',
    supplier: 'Supplier',
    person: 'Individual',
    asset: 'Asset'
  }
  return labels[value] || value || 'Not set'
}

export default function RiskIntelligenceIndexEn() {
  const [objects, setObjects] = useState([])
  const [mode, setMode] = useState('loading')
  const [error, setError] = useState('')

  async function loadObjects() {
    setError('')
    try {
      const response = await fetch('/api/risk-intelligence/objects')
      const data = await response.json()
      setObjects(Array.isArray(data.objects) ? data.objects : fallbackObjects)
      setMode(data.mode || 'supabase')
    } catch (loadError) {
      setObjects(fallbackObjects)
      setMode('demo')
      setError(loadError?.message || 'The section is open in demo mode')
    }
  }

  useEffect(() => {
    loadObjects()
  }, [])

  return (
    <>
      <Head>
        <title>Risk Intelligence - HEIMDALL</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#05070d] text-white">
        <HeimdallNav />
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-28">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">HEIMDALL Analyst</p>
              <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Risk Intelligence</h1>
              <p className="mt-4 max-w-2xl text-white/65">
                Analyst workspace for check objects, risk signals, connections and draft reports.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <Link href="/analyst/risk-intelligence" className="text-white/45 hover:text-white">RU</Link>
                <span className="text-white/25">/</span>
                <span className="text-sky-200">EN</span>
              </div>
            </div>
            <Link href="/analyst/risk-intelligence-en/new" className="rounded-2xl bg-sky-300 px-6 py-4 font-semibold text-black hover:bg-sky-200">
              Add object
            </Link>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">
            Mode: <span className="font-semibold text-sky-200">{mode === 'demo' ? 'demo / fallback' : mode === 'loading' ? 'loading' : 'Supabase'}</span>
            {error ? <span className="ml-2 text-amber-200">{error}</span> : null}
          </div>

          <div className="grid gap-4">
            {objects.map((object) => (
              <Link key={object.id} href={`/analyst/risk-intelligence-en/${object.id}`} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-sky-300/40 hover:bg-white/[0.07]">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{object.title || 'Untitled'}</h2>
                    <p className="mt-2 text-white/60">{object.summary || 'No summary yet'}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 text-sm">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{badge(object.status)}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{badge(object.object_type)}</span>
                    <span className="rounded-full border border-sky-300/30 px-3 py-1 text-sky-200">Risk: {badge(object.risk_level)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
