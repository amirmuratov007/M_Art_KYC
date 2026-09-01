import { useEffect, useMemo, useState } from 'react'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { Activity, BarChart3, Eye, RefreshCw, TrendingUp, UsersRound } from 'lucide-react'

const periods = [7, 30, 90]

function Metric({ label, value, icon: Icon }) {
  const displayValue = value === null || value === undefined
    ? 'Нет данных'
    : Number(value).toLocaleString('ru-RU')

  return (
    <div className="border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-3 text-sm text-white/48">
        <span>{label}</span>
        <Icon className="h-4 w-4 text-sky-300" />
      </div>
      <div className="mt-3 text-3xl font-semibold text-[#F7D784]">{displayValue}</div>
    </div>
  )
}

function Ranking({ title, items = [] }) {
  const max = Math.max(...items.map((item) => item.views), 1)
  return (
    <section className="border border-white/10 bg-white/[0.045] p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.length ? items.map((item) => (
          <div key={item.name}>
            <div className="flex items-start justify-between gap-4 text-sm">
              <span className="min-w-0 break-all text-white/68">{item.name}</span>
              <span className="shrink-0 font-semibold text-white">{item.views}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden bg-white/8">
              <div className="h-full bg-sky-400" style={{ width: `${Math.max((item.views / max) * 100, 2)}%` }} />
            </div>
          </div>
        )) : <p className="text-sm text-white/45">Данных за период пока нет.</p>}
      </div>
    </section>
  )
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(30)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/analytics-summary?days=${days}`, { cache: 'no-store' })
      const payload = await response.json()
      if (!response.ok || payload.ok === false) throw new Error(payload.error || 'Не удалось загрузить статистику')
      setData(payload)
    } catch (loadError) {
      setError(loadError.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [days])

  const daily = useMemo(() => data?.dailyViews || [], [data])

  return (
    <AnalystLayout title="Статистика сайта">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Собственная аналитика</div>
          <h1 className="mt-3 text-4xl font-semibold">Статистика сайта</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">Без параметров URL, закрытых разделов и посетителей, которые не дали согласие на аналитику.</p>
        </div>
        <button type="button" onClick={load} disabled={loading} title="Обновить" aria-label="Обновить статистику" className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-white/5 text-white/70 disabled:opacity-50">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="mt-6 inline-flex border border-white/10 bg-black/20 p-1">
        {periods.map((period) => (
          <button key={period} type="button" onClick={() => setDays(period)} className={`px-4 py-2 text-sm transition ${days === period ? 'bg-sky-400 font-semibold text-black' : 'text-white/60 hover:text-white'}`}>
            {period} дней
          </button>
        ))}
      </div>

      {error && <div className="mt-6 border border-red-300/25 bg-red-300/10 p-4 text-sm text-red-100">{error}</div>}
      {!error && !data?.storageReady && !loading && <div className="mt-6 border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-100">Хранилище аналитики пока не готово или не содержит данных.</div>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Metric label="Просмотры за период" value={data?.views} icon={Eye} />
        <Metric label="Уникальные посетители" value={data?.uniqueVisitors} icon={UsersRound} />
        <Metric label="Сегодня" value={data?.todayViews} icon={BarChart3} />
        <Metric label="Вчера" value={data?.yesterdayViews} icon={BarChart3} />
        <Metric label="Страниц на посетителя" value={data?.averageViewsPerVisitor} icon={Activity} />
        <Metric label="Изменение к вчерашнему дню, %" value={data?.todayChangePercent} icon={TrendingUp} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Ranking title="Динамика по дням" items={daily} />
        <Ranking title="Популярные страницы" items={data?.topPages} />
        <Ranking title="Источники переходов" items={data?.referrers} />
        <Ranking title="Языки браузера" items={data?.languages} />
      </div>
    </AnalystLayout>
  )
}
