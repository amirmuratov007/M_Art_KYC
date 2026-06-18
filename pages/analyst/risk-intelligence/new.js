import { useState } from 'react'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { Field, SelectField } from '@/components/analyst/RiskIntelligenceUI'
import { riskObjectTypes } from '@/data/riskIntelligenceMockData'

export default function NewRiskObjectPage() {
  const [form, setForm] = useState({ name: '', object_type: 'candidate', description: '', source_request_id: '' })
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const previewId = form.name ? `rio-local-${form.name.trim().toLowerCase().replace(/\s+/g, '-').slice(0, 24)}` : 'rio-local-new'

  return (
    <AnalystLayout title="Создать объект риска">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Новый объект</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Создать объект проверки</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">В Stage 1 форма работает как безопасный MVP без записи в базу. После подключения Supabase эти поля станут основой таблицы risk_objects.</p>
      </div>

      <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Название объекта"><input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Например: кандидат на роль Head" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" /></Field>
          <Field label="Тип объекта"><SelectField value={form.object_type} onChange={(value) => update('object_type', value)} options={riskObjectTypes} /></Field>
          <Field label="ID заявки CRM"><input value={form.source_request_id} onChange={(event) => update('source_request_id', event.target.value)} placeholder="CRM-LEAD-001" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" /></Field>
          <Field label="Описание"><input value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Кратко: что проверяем и почему" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" /></Field>
        </div>
        <div className="mt-8 rounded-2xl border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-5 text-sm leading-7 text-[#F7D784]">
          Предпросмотр локального ID: {previewId}. В этом этапе сохранение в базу намеренно не включено, чтобы не сломать действующую CRM.
        </div>
        <button type="button" onClick={() => alert('Stage 1: объект не записывается в базу. Подключение Supabase будет отдельным безопасным этапом.')} className="mt-6 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">Создать mock-объект</button>
      </div>
    </AnalystLayout>
  )
}
