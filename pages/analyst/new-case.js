import { useState } from 'react'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { checkTypes } from '@/data/analystMockData'

export default function NewCasePage() {
  const [form, setForm] = useState({ subject: '', client: '', type: checkTypes[0], priority: 'Medium', deadline: '' })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <AnalystLayout title="New Case">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">New Case</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Create Check</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">Create an internal case. Persistence will be connected with backend in the next stage.</p>
      </div>

      <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <input value={form.subject} onChange={(event) => update('subject', event.target.value)} placeholder="Subject name" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" />
          <input value={form.client} onChange={(event) => update('client', event.target.value)} placeholder="Client name" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" />
          <select value={form.type} onChange={(event) => update('type', event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
            {checkTypes.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={form.priority} onChange={(event) => update('priority', event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <input value={form.deadline} onChange={(event) => update('deadline', event.target.value)} type="date" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" />
        </div>
        <button onClick={() => alert('Case creation will be connected to backend in Stage 2')} className="mt-8 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">Create mock case</button>
      </div>
    </AnalystLayout>
  )
}
