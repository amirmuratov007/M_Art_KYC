import Head from 'next/head'
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

export default function NewRiskIntelligenceObject() {
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
      if (!id) throw new Error(data.error || 'Не удалось создать объект')
      router.push(`/analyst/risk-intelligence/${id}`)
    } catch (createError) {
      setError(createError?.message || 'Ошибка создания объекта')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Head>
        <title>Новый объект - Risk Intelligence</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#05070d] text-white">
        <HeimdallNav />
        <section className="mx-auto max-w-4xl px-6 pb-20 pt-28">
          <h1 className="text-4xl font-semibold">Добавить объект проверки</h1>
          <p className="mt-4 text-white/60">Создайте карточку кандидата, компании, поставщика или связанного объекта.</p>

          <form onSubmit={createObject} className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm text-white/60">Название</span>
                <input className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-sky-300/50" value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="Например: Кандидат Head of Sales" required />
              </label>
              <div className="grid gap-5 md:grid-cols-3">
                <label className="grid gap-2">
                  <span className="text-sm text-white/60">Тип</span>
                  <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={form.object_type} onChange={(event) => updateField('object_type', event.target.value)}>
                    <option value="candidate">Кандидат</option>
                    <option value="company">Компания</option>
                    <option value="supplier">Поставщик</option>
                    <option value="person">Физическое лицо</option>
                    <option value="asset">Актив</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-white/60">Статус</span>
                  <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={form.status} onChange={(event) => updateField('status', event.target.value)}>
                    <option value="draft">Черновик</option>
                    <option value="in_work">В работе</option>
                    <option value="review">Проверка</option>
                    <option value="report_ready">Отчет готов</option>
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm text-white/60">Уровень риска</span>
                  <select className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none" value={form.risk_level} onChange={(event) => updateField('risk_level', event.target.value)}>
                    <option value="unknown">Не указан</option>
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="critical">Критический</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm text-white/60">Краткое описание</span>
                <textarea className="min-h-36 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-sky-300/50" value={form.summary} onChange={(event) => updateField('summary', event.target.value)} placeholder="Что проверяем, контекст, вводные, зона доступа" />
              </label>
              {error ? <div className="rounded-2xl border border-red-300/20 bg-red-500/10 p-4 text-red-100">{error}</div> : null}
              <button disabled={saving} className="rounded-2xl bg-sky-300 px-6 py-4 font-semibold text-black disabled:opacity-60">
                {saving ? 'Сохраняю...' : 'Создать объект'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
