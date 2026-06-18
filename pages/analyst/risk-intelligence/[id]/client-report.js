import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'

const legalDisclaimer = 'Настоящий отчет является аналитическим документом и не содержит утверждений о виновности, нарушении закона или недобросовестности лица либо организации. Выводы основаны на предоставленных данных, открытых признаках и аналитической оценке. Для принятия юридически значимых решений рекомендуется дополнительная проверка и консультация профильного специалиста.'

function label(value) {
  const labels = {
    draft: 'Черновик',
    in_work: 'В работе',
    review: 'Проверка',
    report_ready: 'Отчет готов',
    closed: 'Закрыто',
    unknown: 'Не указан',
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    critical: 'Критический',
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

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(value ? new Date(value) : new Date())
  } catch {
    return new Date().toLocaleString('ru-RU')
  }
}

function sectionText(title, body) {
  return `${title}\n${body || 'Не заполнено.'}`
}

export default function ClientRiskReportPage() {
  const router = useRouter()
  const { id } = router.query
  const [object, setObject] = useState(null)
  const [signals, setSignals] = useState([])
  const [connections, setConnections] = useState([])
  const [reports, setReports] = useState([])
  const [mode, setMode] = useState('loading')
  const [message, setMessage] = useState('')

  async function loadReport() {
    if (!id) return
    try {
      const response = await fetch(`/api/risk-intelligence/objects/${id}`)
      const data = await response.json()
      setObject(data.object || { id, title: 'Демо-объект', object_type: 'candidate', risk_level: 'unknown', summary: 'Демо-режим.' })
      setSignals(Array.isArray(data.signals) ? data.signals : [])
      setConnections(Array.isArray(data.connections) ? data.connections : [])
      setReports(Array.isArray(data.reports) ? data.reports : [])
      setMode(data.mode || 'supabase')
      if (data.warning) setMessage(data.warning)
    } catch (error) {
      setObject({ id, title: 'Демо-объект', object_type: 'candidate', risk_level: 'unknown', summary: 'Fallback-режим.' })
      setMode('demo')
      setMessage(error?.message || 'Fallback-режим')
    }
  }

  useEffect(() => {
    loadReport()
  }, [id])

  async function refreshDraft() {
    try {
      const response = await fetch('/api/risk-intelligence/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ object_id: id })
      })
      const data = await response.json()
      if (data.report) setReports((current) => [data.report, ...current])
      setMode(data.mode || mode)
      setMessage(data.warning || 'Шаблонный отчет обновлен')
    } catch {
      setMessage('Не удалось обновить отчет. Страница остается доступной для печати.')
    }
  }

  const reportText = useMemo(() => {
    if (!object) return ''
    const signalLines = signals.length ? signals.map((signal, index) => `${index + 1}. ${signal.title || 'Сигнал'} - ${label(signal.severity)}${signal.description ? `\n${signal.description}` : ''}`).join('\n') : 'Сигналы риска не добавлены.'
    const connectionLines = connections.length ? connections.map((connection, index) => `${index + 1}. ${connection.from_label || 'Объект'} -> ${connection.to_label || 'Связь'} (${connection.relation_type || 'тип связи не указан'})${connection.description ? `\n${connection.description}` : ''}`).join('\n') : 'Связи не добавлены.'
    return [
      'Предварительный риск-отчет HEIMDALL',
      sectionText('Объект проверки', object.title),
      sectionText('Тип объекта', label(object.object_type)),
      sectionText('Дата формирования', formatDate(new Date())),
      sectionText('Уровень риска', label(object.risk_level)),
      sectionText('Оценка риска', label(object.risk_level)),
      sectionText('Краткое резюме', object.summary || 'Краткое резюме не заполнено.'),
      sectionText('Ключевые признаки риска', signalLines),
      sectionText('Карта связей', connectionLines),
      sectionText('Что требует дополнительной проверки', 'Источники риска, подтверждающие материалы, контекст заявки, актуальность данных и возможные конфликтующие сведения.'),
      sectionText('Рекомендации', 'Провести дополнительную проверку, запросить недостающие материалы у клиента и подготовить финальный аналитический вывод после верификации признаков.'),
      sectionText('Методологическая оговорка', 'Материал является предварительной аналитической оценкой и не заменяет полноценную проверку, юридическую экспертизу или решение уполномоченных органов.'),
      sectionText('Юридическая оговорка', legalDisclaimer)
    ].join('\n\n')
  }, [object, signals, connections])

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(reportText)
      setMessage('Отчет скопирован')
    } catch {
      setMessage('Не удалось скопировать автоматически. Выделите текст вручную.')
    }
  }

  if (!object) {
    return <main className="min-h-screen bg-[#05070d] text-white"><HeimdallNav /><section className="mx-auto max-w-5xl px-6 pt-28">Загрузка...</section></main>
  }

  return (
    <>
      <Head>
        <title>Клиентский отчет - HEIMDALL</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-[#05070d] text-white print:bg-white print:text-black">
        <div className="print:hidden"><HeimdallNav /></div>
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-28 print:px-0 print:py-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <Link href={`/analyst/risk-intelligence/${id}`} className="text-sm text-sky-200 hover:text-sky-100">← Назад к объекту</Link>
            <div className="flex flex-wrap gap-3">
              <button onClick={copyReport} className="rounded-2xl border border-sky-300/20 bg-sky-300/10 px-5 py-3 font-semibold text-sky-100">Скопировать отчет</button>
              <button onClick={() => window.print()} className="rounded-2xl bg-white px-5 py-3 font-semibold text-black">Печать / сохранить в PDF</button>
              <button onClick={refreshDraft} className="rounded-2xl border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-5 py-3 font-semibold text-[#F7D784]">Обновить шаблонный отчет</button>
            </div>
          </div>

          {mode === 'demo' ? <div className="mb-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100 print:hidden">Сейчас включен демонстрационный режим. Для постоянного хранения данных выполните SQL-файл в Supabase.</div> : null}
          {message ? <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70 print:hidden">{message}</div> : null}

          <article className="rounded-[36px] border border-white/10 bg-white/[0.06] p-7 shadow-2xl print:rounded-none print:border-0 print:bg-white print:p-0 print:shadow-none md:p-10">
            <div className="border-b border-white/10 pb-8 print:border-black/20">
              <p className="text-sm uppercase tracking-[0.32em] text-[#F7D784] print:text-black/60">HEIMDALL</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">Предварительный риск-отчет HEIMDALL</h1>
              <p className="mt-4 text-white/58 print:text-black/60">Дата формирования: {formatDate(new Date())}</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 print:border-black/15 print:bg-white"><div className="text-sm text-white/45 print:text-black/50">Объект проверки</div><div className="mt-2 text-xl font-semibold">{object.title || 'Без названия'}</div></div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 print:border-black/15 print:bg-white"><div className="text-sm text-white/45 print:text-black/50">Тип объекта</div><div className="mt-2 text-xl font-semibold">{label(object.object_type)}</div></div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 print:border-black/15 print:bg-white"><div className="text-sm text-white/45 print:text-black/50">Уровень риска</div><div className="mt-2 text-xl font-semibold">{label(object.risk_level)}</div></div>
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5 print:border-black/15 print:bg-white"><div className="text-sm text-white/45 print:text-black/50">Оценка риска</div><div className="mt-2 text-xl font-semibold">{label(object.risk_level)}</div></div>
            </div>

            <ReportSection title="Краткое резюме">{object.summary || 'Краткое резюме не заполнено.'}</ReportSection>
            <ReportSection title="Ключевые признаки риска">
              {signals.length ? signals.map((signal, index) => <div key={signal.id || index} className="mb-4"><strong>{index + 1}. {signal.title || 'Сигнал'} - {label(signal.severity)}</strong><p className="mt-1 text-white/62 print:text-black/70">{signal.description || 'Описание не заполнено.'}</p></div>) : 'Сигналы риска не добавлены.'}
            </ReportSection>
            <ReportSection title="Карта связей">
              {connections.length ? connections.map((connection, index) => <div key={connection.id || index} className="mb-4"><strong>{connection.from_label || 'Объект'} → {connection.to_label || 'Связь'}</strong><p className="mt-1 text-white/62 print:text-black/70">{connection.relation_type || 'Тип связи не указан'}{connection.description ? ` - ${connection.description}` : ''}</p></div>) : 'Связи не добавлены.'}
            </ReportSection>
            <ReportSection title="Что требует дополнительной проверки">Источники риска, подтверждающие материалы, контекст заявки, актуальность данных и возможные конфликтующие сведения.</ReportSection>
            <ReportSection title="Рекомендации">Провести дополнительную проверку, запросить недостающие материалы у клиента и подготовить финальный аналитический вывод после верификации признаков.</ReportSection>
            <ReportSection title="Методологическая оговорка">Материал является предварительной аналитической оценкой и не заменяет полноценную проверку, юридическую экспертизу или решение уполномоченных органов.</ReportSection>
            <ReportSection title="Юридическая оговорка">{legalDisclaimer}</ReportSection>
            {reports.length ? <div className="mt-8 text-sm text-white/40 print:text-black/45">Сохраненных черновиков отчета: {reports.length}</div> : null}
          </article>
        </section>
      </main>
    </>
  )
}

function ReportSection({ title, children }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-3 whitespace-pre-wrap leading-8 text-white/70 print:text-black/75">{children}</div>
    </section>
  )
}
