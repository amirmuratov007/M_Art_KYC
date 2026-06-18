import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { Field, SelectField } from '@/components/analyst/RiskIntelligenceUI'
import { riskObjectTypes } from '@/data/riskIntelligenceMockData'
import { createLocalRiskObject, getStorageModeLabel } from '@/lib/riskIntelligenceLocalStore'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewRiskObject() {
  const router = useRouter()
  const [form, setForm] = useState({ object_type: 'candidate', name: '', description: '', source_request_id: '' })
  const [error, setError] = useState('')
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) {
      setError('Укажи название объекта проверки.')
      return
    }
    const object = createLocalRiskObject(form)
    router.push(`/analyst/risk-intelligence/${object.id}`)
  }

  return (
    <AnalystLayout title="Новый объект проверки">
      <Link href="/analyst/risk-intelligence" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200"><ArrowLeft className="h-4 w-4" /> Назад к центру</Link>
      <div className="mt-8 max-w-4xl rounded-[34px] border border-white/10 bg-white/[0.045] p-7">
        <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Автономное хранилище</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Создать объект проверки</h1>
        <p className="mt-4 text-sm leading-7 text-white/55">{getStorageModeLabel()}</p>

        <form onSubmit={submit} className="mt-7 grid gap-5">
          <Field label="Тип объекта"><SelectField value={form.object_type} onChange={(value) => update('object_type', value)} options={riskObjectTypes} /></Field>
          <Field label="Название"><input value={form.name} onChange={(event) => update('name', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Например: кандидат на руководящую роль" /></Field>
          <Field label="Описание"><textarea value={form.description} onChange={(event) => update('description', event.target.value)} className="min-h-32 rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Контекст проверки, доступы, риски, ограничения" /></Field>
          <Field label="Источник или номер заявки"><input value={form.source_request_id} onChange={(event) => update('source_request_id', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Например: CRM-LEAD-001" /></Field>
          {error && <div className="rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-100">{error}</div>}
          <button type="submit" className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]"><Save className="h-4 w-4" /> Создать и открыть</button>
        </form>
      </div>
    </AnalystLayout>
  )
}
