import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'

const fallbackObjects = [
  {
    id: 'demo-1',
    title: 'Демо-объект: кандидат на чувствительную позицию',
    object_type: 'candidate',
    status: 'draft',
    risk_level: 'medium',
    summary: 'Демо-режим. Выполните SQL, чтобы включить сохранение в Supabase.'
  }
]

function badge(value) {
  const labels = {
    draft: 'Черновик',
    in_work: 'В работе',
    review: 'Проверка',
    report_ready: 'Отчет готов',
    closed: 'Закрыто',
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    critical: 'Критический',
    unknown: 'Не указан'
  }
  return labels[value] || value || 'Не указано'
}

export default function RiskIntelligenceIndex() {
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
      setError(loadError?.message || 'Раздел открыт в демо-режиме')
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
                Рабочий раздел для объектов проверки, сигналов риска, связей и шаблонных отчетов.
              </p>
            </div>
            <Link href="/analyst/risk-intelligence/new" className="rounded-2xl bg-sky-300 px-6 py-4 font-semibold text-black hover:bg-sky-200">
              Добавить объект
            </Link>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">
            Режим: <span className="font-semibold text-sky-200">{mode === 'demo' ? 'демо / fallback' : mode === 'loading' ? 'загрузка' : 'Supabase'}</span>
            {error ? <span className="ml-2 text-amber-200">{error}</span> : null}
          </div>

          <div className="grid gap-4">
            {objects.map((object) => (
              <Link key={object.id} href={`/analyst/risk-intelligence/${object.id}`} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-sky-300/40 hover:bg-white/[0.07]">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{object.title || 'Без названия'}</h2>
                    <p className="mt-2 text-white/60">{object.summary || 'Описание не заполнено'}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 text-sm">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{badge(object.status)}</span>
                    <span className="rounded-full border border-sky-300/30 px-3 py-1 text-sky-200">Риск: {badge(object.risk_level)}</span>
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
