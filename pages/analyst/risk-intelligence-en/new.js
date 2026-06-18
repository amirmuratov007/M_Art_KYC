import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'

const initialForm = {
  title: '',
  object_type: 'candidate',
  status: 'draft',
  risk_level: 'unknown',
  summary: ''
}

export default function NewRiskIntelligenceObjectEn() {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function createObject(event) {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      const response = await fetch('/api/risk-intelligence/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      const id = data.object?.id
      if (!id) throw new Error(data.error || 'Failed to create object')
      router.push(`/analyst/risk-intelligence-en/${id}`)
    } catch (createError) {
      setError(createError?.message || 'Object creation error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Head>
        <title>New object - Risk Intelligence</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#05070d] text-white">
        <HeimdallNav />
        <section className="mx-auto max-w-4xl px-6 pb-20 pt-28">
          <Link href="/analyst/risk-intelligence-en" className="text-sm text-sky-200 hover:text-sky-100">← Back to objects</Link>
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold">Add check object</h1>
              <p className="mt-4 text-white/60">Create a card for a candidate, company, supplier or connected entity.</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href="/analyst/risk-intelligence/new" className="text-white/45 hover:text-white">RU</Link>
              <span className="text-white/25">/</span>
              <span className="text-sky-200">EN</span>
            </div>
          </div>

          <form onSubmit={createObject} className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm text-white/60">Title</span>
                <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-sky-300/50" value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="For example: Head of Sales candidate" required />
              </label>
              <div className="grid gap-5 md:grid-cols-3">
                <label className="grid gap-2">
                  <span className="text-sm text-white/60">Type</span>
                  <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={form.object_type} onChange={(event) => updateField('object_type', event.target.value)}>
                    <option value="candidate">Candidate</option>
                    <option value="company">Company</option>
                    <option value="supplier">Supplier</option>
                    <option value="person">Individual</option>
                    <option value="asset">Asset</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-white/60">Status</span>
                  <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={form.status} onChange={(event) => updateField('status', event.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="in_work">In progress</option>
                    <option value="review">Review</option>
                    <option value="report_ready">Report ready</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-white/60">Risk level</span>
                  <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={form.risk_level} onChange={(event) => updateField('risk_level', event.target.value)}>
                    <option value="unknown">Not set</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm text-white/60">Summary</span>
                <textarea className="min-h-36 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-sky-300/50" value={form.summary} onChange={(event) => updateField('summary', event.target.value)} placeholder="What is being checked, context, inputs, access level" />
              </label>
              {error ? <div className="rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-red-100">{error}</div> : null}
              <button disabled={saving} className="rounded-2xl bg-sky-300 px-6 py-4 font-semibold text-black disabled:opacity-60">
                {saving ? 'Saving...' : 'Create object'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
