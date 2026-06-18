import { useState } from 'react'
import { useRouter } from 'next/router'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { Field, SelectField } from '@/components/analyst/RiskIntelligenceUI'
import { riskObjectTypes } from '@/data/riskIntelligenceMockData'

export default function NewRiskObjectPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', object_type: 'candidate', description: '', source_request_id: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const createObject = async () => {
    if (!form.name.trim()) {
      setMessage('Укажите название объекта проверки.')
      return
    }

    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/risk-intelligence/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const body = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(body.error || 'Не удалось создать объект.')

      if (body.mode === 'live') {
        router.push(`/analyst/risk-intelligence/${body.data.id}`)
      } else {
        setMessage(body.warning || 'Supabase не настроен. Объект показан как демонстрационный и не записан в базу.')
      }
    } catch (error) {
      setMessage(error.message || 'Ошибка сохранения.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AnalystLayout title="Создать объект риска">
      <div className="mb-8">
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Новый объект</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Создать объект проверки</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/60">Этап 2: форма записывает объект в Supabase, если таблицы созданы и env-переменные настроены. Если база недоступна, интерфейс не падает и показывает понятное предупреждение.</p>
      </div>

      <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Название объекта"><input value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Например: кандидат на руководящую роль" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" /></Field>
          <Field label="Тип объекта"><SelectField value={form.object_type} onChange={(value) => update('object_type', value)} options={riskObjectTypes} /></Field>
          <Field label="ID заявки CRM"><input value={form.source_request_id} onChange={(event) => update('source_request_id', event.target.value)} placeholder="CRM-LEAD-001" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" /></Field>
          <Field label="Описание"><input value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Кратко: что проверяем и почему" className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" /></Field>
        </div>

        {message && <div className="mt-8 rounded-2xl border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-5 text-sm leading-7 text-[#F7D784]">{message}</div>}

        <button type="button" onClick={createObject} disabled={saving} className="mt-6 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white disabled:opacity-60">
          {saving ? 'Сохраняю...' : 'Создать объект проверки'}
        </button>
      </div>
    </AnalystLayout>
  )
}
