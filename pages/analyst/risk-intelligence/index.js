import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'

const fallbackObjects = [
  {
    id: 'demo-1',
    title: 'Демо-объект: кандидат на чувствительную позицию',
    object_type: 'candidate',
    status: 'draft',
    risk_level: 'medium',
    summary: 'Демо-режим. Выполните SQL, чтобы включить сохранение в Supabase.',
    source_request_id: null
  }
]

const statusOptions = [
  ['all', 'Все статусы'],
  ['draft', 'Черновик'],
  ['in_work', 'В работе'],
  ['review', 'Проверка'],
  ['report_ready', 'Отчет готов'],
  ['closed', 'Закрыто']
]

const riskOptions = [
  ['all', 'Все уровни риска'],
  ['unknown', 'Не указан'],
  ['low', 'Низкий'],
  ['medium', 'Средний'],
  ['high', 'Высокий'],
  ['critical', 'Критический']
]

const typeOptions = [
  ['all', 'Все типы'],
  ['candidate', 'Кандидат'],
  ['company', 'Компания'],
  ['supplier', 'Поставщик'],
  ['person', 'Физическое лицо'],
  ['asset', 'Актив'],
  ['incident', 'Инцидент'],
  ['request', 'Заявка CRM']
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
    unknown: 'Не указан',
    candidate: 'Кандидат',
    company: 'Компания',
    supplier: 'Поставщик',
    person: 'Физическое лицо',
    asset: 'Актив',
    incident: 'Инцидент',
    request: 'Заявка CRM'
  }
  return labels[value] || value || 'Не указано'
}

function sourceLabel(object) {
  if (String(object?.id || '').startsWith('demo-')) return 'Демонстрационный объект'
  if (object?.source_request_id) return 'Заявка'
  return 'Ручное создание'
}

function fieldClass() {
  return 'rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-sky-300/50'
}

export default function RiskIntelligenceIndex() {
  const [objects, setObjects] = useState([])
  const [mode, setMode] = useState('loading')
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  async function loadObjects() {
    setError('')
    try {
      const response = await fetch('/api/risk-intelligence/objects')
      const data = await response.json()
      setObjects(Array.isArray(data.objects) ? data.objects : fallbackObjects)
      setMode(data.mode || 'supabase')
      if (data.warning) setError(data.warning)
    } catch (loadError) {
      setObjects(fallbackObjects)
      setMode('demo')
      setError(loadError?.message || 'Раздел открыт в демо-режиме')
    }
  }

  useEffect(() => {
    loadObjects()
  }, [])

  const filteredObjects = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase()
    return objects.filter((object) => {
      if (cleanQuery) {
        const haystack = `${object.title || ''} ${object.summary || ''} ${object.source_request_id || ''}`.toLowerCase()
        if (!haystack.includes(cleanQuery)) return false
      }
      if (riskFilter !== 'all' && object.risk_level !== riskFilter) return false
      if (statusFilter !== 'all' && object.status !== statusFilter) return false
      if (typeFilter !== 'all' && object.object_type !== typeFilter) return false
      return true
    })
  }, [objects, query, riskFilter, statusFilter, typeFilter])

  const stats = useMemo(() => ({
    all: objects.length,
    serious: objects.filter((object) => ['high', 'critical'].includes(object.risk_level)).length,
    inWork: objects.filter((object) => ['in_work', 'review'].includes(object.status)).length,
    closed: objects.filter((object) => ['closed', 'report_ready'].includes(object.status)).length
  }), [objects])

  return (
    <>
      <Head>
        <title>Центр риск-аналитики - HEIMDALL</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#05070d] text-white">
        <HeimdallNav />
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-28">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200/70">HEIMDALL Analyst</p>
              <h1 className="mt-3 text-4xl font-semibold md:text-5xl">Центр риск-аналитики</h1>
              <p className="mt-4 max-w-2xl text-white/65">
                Рабочий раздел для объектов проверки, сигналов риска, связей, источников CRM и клиентских отчетов.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="text-sky-200">RU</span>
                <span className="text-white/25">/</span>
                <Link href="/analyst/risk-intelligence-en" className="text-white/45 hover:text-white">EN</Link>
              </div>
            </div>
            <Link href="/analyst/risk-intelligence/new" className="rounded-2xl bg-sky-300 px-6 py-4 font-semibold text-black hover:bg-sky-200">
              Добавить объект
            </Link>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"><div className="text-3xl font-semibold">{stats.all}</div><div className="mt-1 text-sm text-white/55">Всего объектов</div></div>
            <div className="rounded-3xl border border-red-300/20 bg-red-300/10 p-5"><div className="text-3xl font-semibold">{stats.serious}</div><div className="mt-1 text-sm text-red-100/75">Высокий/критический риск</div></div>
            <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-5"><div className="text-3xl font-semibold">{stats.inWork}</div><div className="mt-1 text-sm text-sky-100/75">В работе</div></div>
            <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5"><div className="text-3xl font-semibold">{stats.closed}</div><div className="mt-1 text-sm text-emerald-100/75">Завершено</div></div>
          </div>

          <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/70">
            Режим: <span className="font-semibold text-sky-200">{mode === 'demo' ? 'демо / fallback' : mode === 'loading' ? 'загрузка' : 'Supabase'}</span>
            {mode === 'demo' ? <div className="mt-2 text-amber-100">Сейчас включен демонстрационный режим. Для постоянного хранения данных выполните SQL-файл в Supabase.</div> : null}
            {error ? <div className="mt-2 text-amber-200">{error}</div> : null}
          </div>

          <div className="mb-6 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:grid-cols-4">
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Быстрый поиск по названию" className={fieldClass()} />
            <select value={riskFilter} onChange={(event) => setRiskFilter(event.target.value)} className={fieldClass()}>{riskOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={fieldClass()}>{statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
            <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className={fieldClass()}>{typeOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          </div>

          <div className="grid gap-4">
            {filteredObjects.length ? filteredObjects.map((object) => (
              <Link key={object.id} href={`/analyst/risk-intelligence/${object.id}`} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-sky-300/40 hover:bg-white/[0.07]">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-2 text-xs uppercase tracking-[0.22em] text-white/35">Источник: {sourceLabel(object)}</div>
                    <h2 className="text-2xl font-semibold">{object.title || 'Без названия'}</h2>
                    <p className="mt-2 text-white/60">{object.summary || 'Описание не заполнено'}</p>
                    {object.source_request_id ? <p className="mt-3 text-sm text-sky-200/70">Создано из заявки: {object.source_request_id}</p> : null}
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2 text-sm">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{badge(object.object_type)}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">{badge(object.status)}</span>
                    <span className="rounded-full border border-sky-300/30 px-3 py-1 text-sky-200">Риск: {badge(object.risk_level)}</span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-white/55">По выбранным фильтрам объектов нет.</div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
