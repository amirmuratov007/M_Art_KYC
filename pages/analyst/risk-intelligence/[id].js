import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { ConnectionForm, ConnectionsMap, getOptionLabel, ReportPreview, RiskLevelBadge, RiskStatusBadge, SignalForm, SignalsList } from '@/components/analyst/RiskIntelligenceUI'
import { riskObjectTypes, riskStatuses } from '@/data/riskIntelligenceMockData'
import { analyzeRawRiskData } from '@/lib/riskDataAnalyzer'
import { calculateRiskScore, getRiskLevel } from '@/lib/riskScoring'
import { addLocalRiskConnection, addLocalRiskSignal, deleteLocalRiskConnection, deleteLocalRiskSignal, generateLocalRiskReport, getLocalDataAnalysis, getLocalRawData, getLocalRiskBundle, getStorageModeLabel, saveLocalDataAnalysis, saveLocalRawData, updateLocalRiskObjectStatus } from '@/lib/riskIntelligenceLocalStore'
import { ArrowLeft, BrainCircuit, CheckCircle2, Copy, Database, FileText, Layers3, Printer, Save } from 'lucide-react'

function EntityGroup({ title, items }) {
  if (!items?.length) return null
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/40">{title}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.slice(0, 24).map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{item}</span>)}
      </div>
      {items.length > 24 && <div className="mt-3 text-xs text-white/35">Показаны первые 24 из {items.length}. Полный массив сохранен.</div>}
    </div>
  )
}

function AnalysisPanel({ analysis, onAcceptSignal, onAcceptAllSignals, onAcceptConnection, onAcceptAllConnections }) {
  if (!analysis) return null
  const entities = analysis.entities || {}

  return (
    <div className="grid gap-6">
      <div className="rounded-[30px] border border-sky-300/20 bg-sky-300/[0.06] p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="text-sm uppercase tracking-[0.22em] text-sky-200/80">Разбор массива данных</div>
            <p className="mt-4 text-lg leading-8 text-white/70">{analysis.executiveSummary}</p>
          </div>
          <RiskLevelBadge level={analysis.riskLevel} score={analysis.riskScore} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="text-xs text-white/40">Символов</div><div className="mt-1 text-2xl font-semibold text-white">{analysis.sourceStats?.characters || 0}</div></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="text-xs text-white/40">Строк</div><div className="mt-1 text-2xl font-semibold text-white">{analysis.sourceStats?.lines || 0}</div></div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><div className="text-xs text-white/40">Чанков для будущего ИИ</div><div className="mt-1 text-2xl font-semibold text-white">{analysis.sourceStats?.chunks || 0}</div></div>
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="mb-5 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Выделенные сущности</div>
        <div className="grid gap-4 md:grid-cols-2">
          <EntityGroup title="Люди" items={entities.persons} />
          <EntityGroup title="Компании" items={entities.companies} />
          <EntityGroup title="Телефоны" items={entities.phones} />
          <EntityGroup title="Почты" items={entities.emails} />
          <EntityGroup title="ИНН" items={entities.inn} />
          <EntityGroup title="ОГРН" items={entities.ogrn} />
          <EntityGroup title="Домены" items={entities.domains} />
          <EntityGroup title="Ссылки" items={entities.urls} />
        </div>
      </div>

      {!!analysis.facts?.length && (
        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
          <div className="mb-5 text-sm uppercase tracking-[0.22em] text-white/55">Извлеченные факты</div>
          <div className="grid gap-3">
            {analysis.facts.slice(0, 18).map((fact) => <div key={fact.title} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/65"><span className="text-white/35">{fact.title}: </span>{fact.text}</div>)}
          </div>
          {analysis.facts.length > 18 && <div className="mt-4 text-xs text-white/35">Показаны первые 18 фактов из {analysis.facts.length}.</div>}
        </div>
      )}

      <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="text-sm uppercase tracking-[0.22em] text-sky-300/80">Предложенные сигналы риска</div>
          {!!analysis.suggestedSignals?.length && <button type="button" onClick={onAcceptAllSignals} className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Принять все сигналы</button>}
        </div>
        <div className="mt-5 grid gap-4">
          {analysis.suggestedSignals?.length ? analysis.suggestedSignals.map((signal, index) => (
            <div key={`${signal.title}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div>
                  <div className="font-semibold text-white">{signal.title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/55">{signal.description}</p>
                  <div className="mt-3 text-xs text-white/35">Категория: {signal.category} · Серьезность: {signal.severity} · Уверенность: {signal.confidence}</div>
                </div>
                <button type="button" onClick={() => onAcceptSignal(signal)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"><CheckCircle2 className="h-4 w-4" /> Принять</button>
              </div>
              {!!signal.evidence?.length && <div className="mt-4 grid gap-2">{signal.evidence.slice(0, 3).map((line) => <div key={line} className="rounded-xl bg-white/[0.04] p-3 text-xs leading-5 text-white/45">{line}</div>)}</div>}
            </div>
          )) : <div className="text-white/45">Сигналы риска не выделены. Можно добавить их вручную после изучения данных.</div>}
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Предложенные связи</div>
          {!!analysis.suggestedConnections?.length && <button type="button" onClick={onAcceptAllConnections} className="rounded-2xl bg-[#D6A84F] px-4 py-2 text-sm font-semibold text-[#050816]">Принять все связи</button>}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {analysis.suggestedConnections?.length ? analysis.suggestedConnections.slice(0, 24).map((connection, index) => (
            <div key={`${connection.target_name}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-semibold text-white">{connection.target_name}</div>
              <div className="mt-2 text-xs text-white/40">{connection.target_type} · {connection.relation_type} · {connection.strength}</div>
              <p className="mt-2 text-sm leading-6 text-white/55">{connection.description}</p>
              <button type="button" onClick={() => onAcceptConnection(connection)} className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75">Принять связь</button>
            </div>
          )) : <div className="text-white/45">Связи не выделены автоматически.</div>}
        </div>
      </div>

      {!!analysis.contradictions?.length && (
        <div className="rounded-[30px] border border-red-300/20 bg-red-300/[0.06] p-6">
          <div className="mb-5 text-sm uppercase tracking-[0.22em] text-red-200/80">Противоречия и несоответствия</div>
          <div className="grid gap-3">{analysis.contradictions.map((item) => <div key={item} className="rounded-2xl border border-red-200/10 bg-black/20 p-4 text-sm leading-7 text-white/65">{item}</div>)}</div>
        </div>
      )}

      <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="text-sm uppercase tracking-[0.22em] text-white/55">Черновик выводов</div>
        <pre className="mt-5 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/65">{analysis.reportDraft}</pre>
      </div>
    </div>
  )
}

export default function RiskObjectPage({ forcedId = '', onBack = null } = {}) {
  const router = useRouter()
  const routeId = typeof router.query.id === 'string' ? router.query.id : ''
  const queryId = typeof router.query.open === 'string' ? router.query.open : ''
  const pathId = typeof window !== 'undefined' ? decodeURIComponent(window.location.pathname.split('/').filter(Boolean).pop() || '') : ''
  const id = forcedId || queryId || routeId || (pathId && !['risk-intelligence', 'object', 'new'].includes(pathId) ? pathId : '')
  const [bundle, setBundle] = useState(null)
  const [status, setStatus] = useState('new')
  const [notes, setNotes] = useState('')
  const [rawData, setRawData] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [isLoadingLargeData, setIsLoadingLargeData] = useState(false)
  const [message, setMessage] = useState('')

  const reload = () => {
    if (!id) return
    const nextBundle = getLocalRiskBundle(id)
    setBundle(nextBundle)
    if (nextBundle.object) setStatus(nextBundle.object.status)
  }

  useEffect(() => {
    reload()
  }, [id])

  useEffect(() => {
    if (!id) return
    setIsLoadingLargeData(true)
    Promise.all([getLocalRawData(id), getLocalDataAnalysis(id)])
      .then(([savedRawData, savedAnalysis]) => {
        setRawData(savedRawData || '')
        setAnalysis(savedAnalysis || null)
      })
      .finally(() => setIsLoadingLargeData(false))
  }, [id])

  const signals = bundle?.signals || []
  const connections = bundle?.connections || []
  const score = useMemo(() => calculateRiskScore(signals), [signals])
  const level = useMemo(() => getRiskLevel(score), [score])
  const riskObject = bundle?.object ? { ...bundle.object, status, risk_score: score, risk_level: level } : null
  const report = bundle?.report || null
  const rawStats = useMemo(() => ({ characters: rawData.length, lines: rawData.split(/\r?\n/).filter((line) => line.trim()).length }), [rawData])

  const addSignal = (signal) => {
    addLocalRiskSignal(riskObject.id, signal)
    setMessage('Сигнал сохранен в автономном хранилище браузера.')
    reload()
  }

  const removeSignal = (signalId) => {
    deleteLocalRiskSignal(riskObject.id, signalId)
    setMessage('Сигнал удален из автономного хранилища.')
    reload()
  }

  const addConnection = (connection) => {
    addLocalRiskConnection(riskObject.id, connection)
    setMessage('Связь сохранена в автономном хранилище браузера.')
    reload()
  }

  const removeConnection = (connectionId) => {
    deleteLocalRiskConnection(riskObject.id, connectionId)
    setMessage('Связь удалена из автономного хранилища.')
    reload()
  }

  const saveStatus = () => {
    updateLocalRiskObjectStatus(riskObject.id, status)
    setMessage('Статус сохранен в автономном хранилище браузера.')
    reload()
  }

  const saveRaw = async () => {
    await saveLocalRawData(riskObject.id, rawData)
    setMessage(`Сырой массив данных сохранен. Символов: ${rawData.length}. Искусственного лимита в поле нет.`)
    reload()
  }

  const analyzeRaw = async () => {
    await saveLocalRawData(riskObject.id, rawData)
    const nextAnalysis = analyzeRawRiskData(rawData, riskObject)
    await saveLocalDataAnalysis(riskObject.id, nextAnalysis)
    setAnalysis(nextAnalysis)
    setMessage('Массив разобран: выделены сущности, риски, связи, противоречия и черновик выводов.')
    reload()
  }

  const acceptSignal = (signal) => {
    addSignal({ category: signal.category, title: signal.title, description: signal.description, severity: signal.severity, confidence: signal.confidence, source: signal.source })
  }

  const acceptAllSignals = () => {
    for (const signal of analysis?.suggestedSignals || []) acceptSignal(signal)
    setMessage('Предложенные сигналы приняты в карточку проверки.')
  }

  const acceptConnection = (connection) => {
    addConnection(connection)
  }

  const acceptAllConnections = () => {
    for (const connection of analysis?.suggestedConnections || []) acceptConnection(connection)
    setMessage('Предложенные связи приняты в карточку проверки.')
  }

  const generateReport = () => {
    const mergedNotes = [notes, analysis?.reportDraft ? `\n\nРазбор массива данных:\n${analysis.reportDraft}` : ''].filter(Boolean).join('\n')
    generateLocalRiskReport({ riskObject, signals, connections, notes: mergedNotes })
    setMessage('Шаблонный отчет сформирован и сохранен локально.')
    reload()
  }

  const copySummary = async () => {
    const text = analysis?.executiveSummary || report?.executiveSummary || `${riskObject.name}: текущая оценка риска ${score}/100. Сигналов: ${signals.length}. Связей: ${connections.length}.`
    await navigator.clipboard.writeText(text)
    setMessage('Краткое резюме скопировано.')
  }

  if (!id) {
    return (
      <AnalystLayout title="Объект проверки">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-8 text-white/65">Не найден идентификатор объекта. Вернись в центр риск-аналитики и открой объект из списка.</div>
      </AnalystLayout>
    )
  }

  if (!riskObject) {
    return (
      <AnalystLayout title="Объект проверки">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-8 text-white/65">Объект не найден в автономном хранилище этого браузера. Вернись в центр риск-аналитики и открой объект из списка.</div>
      </AnalystLayout>
    )
  }

  return (
    <AnalystLayout title={riskObject.name}>
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          {typeof onBack === 'function' ? (
            <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200"><ArrowLeft className="h-4 w-4" /> Назад к центру</button>
          ) : (
            <Link href="/analyst/risk-intelligence" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200"><ArrowLeft className="h-4 w-4" /> Назад к центру</Link>
          )}
          <div className="mt-6 text-sm uppercase tracking-[0.25em] text-sky-300/80">{riskObject.source_request_id || riskObject.id}</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">{riskObject.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/60">{riskObject.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <RiskStatusBadge status={status} />
          <RiskLevelBadge level={level} score={score} />
        </div>
      </div>

      <div className="mb-8 rounded-[24px] border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-5 text-sm leading-7 text-[#F7D784]">
        {getStorageModeLabel()} Большие массивы данных сохраняются отдельно в браузерном хранилище IndexedDB. Искусственного ограничения по объему в поле ввода нет.
        {message && <div className="mt-2 text-white/85">{message}</div>}
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Тип объекта', getOptionLabel(riskObjectTypes, riskObject.object_type)],
          ['Оценка риска', `${score}/100`],
          ['Сигналы риска', signals.length],
          ['Связи', connections.length]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[26px] border border-white/10 bg-white/[0.045] p-5">
            <div className="text-sm text-white/40">{label}</div>
            <div className="mt-2 font-semibold text-white/85">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
        <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Статус и отчет</div>
        <div className="mt-5 flex flex-col gap-4 md:flex-row md:flex-wrap">
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white">
            {riskStatuses.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <button type="button" onClick={saveStatus} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white"><Save className="h-4 w-4" /> Сохранить статус</button>
          <button type="button" onClick={generateReport} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white"><FileText className="h-4 w-4" /> Сформировать отчет</button>
          <button type="button" onClick={copySummary} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white"><Copy className="h-4 w-4" /> Скопировать резюме</button>
          <button type="button" onClick={() => window.print()} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white"><Printer className="h-4 w-4" /> Печать</button>
        </div>
      </div>

      <div className="mb-8 rounded-[34px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.055] p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80"><Database className="h-4 w-4" /> Сырой массив данных</div>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-white/55">Вставляй сюда весь поток данных из источников: ФИО, даты, телефоны, почты, ссылки, выписки, комментарии, фрагменты документов, результаты ручных проверок. Поле не имеет maxlength. Для больших массивов используется IndexedDB, а для будущего ИИ данные уже считаются чанками.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-white/45 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3"><div>Символов</div><strong className="mt-1 block text-lg text-white">{rawStats.characters}</strong></div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3"><div>Строк</div><strong className="mt-1 block text-lg text-white">{rawStats.lines}</strong></div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3"><div>Статус</div><strong className="mt-1 block text-sm text-white">{isLoadingLargeData ? 'загрузка' : 'готово'}</strong></div>
          </div>
        </div>
        <textarea value={rawData} onChange={(event) => setRawData(event.target.value)} placeholder="Вставь сюда весь массив данных без предварительной сортировки..." className="mt-6 min-h-[520px] w-full rounded-3xl border border-white/10 bg-black/30 p-5 text-sm leading-7 text-white outline-none placeholder:text-white/30 focus:border-[#F7D784]/40" />
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:flex-wrap">
          <button type="button" onClick={saveRaw} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white"><Save className="h-4 w-4" /> Сохранить массив</button>
          <button type="button" onClick={analyzeRaw} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]"><BrainCircuit className="h-4 w-4" /> Разобрать данные</button>
          <button type="button" onClick={() => setRawData('')} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-6 py-4 font-semibold text-white/65">Очистить поле</button>
        </div>
      </div>

      <div className="mb-8">
        <AnalysisPanel analysis={analysis} onAcceptSignal={acceptSignal} onAcceptAllSignals={acceptAllSignals} onAcceptConnection={acceptConnection} onAcceptAllConnections={acceptAllConnections} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <SignalForm onAdd={addSignal} />
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6"><div className="mb-5 text-sm uppercase tracking-[0.22em] text-sky-300/80">Принятые сигналы риска</div><SignalsList signals={signals} onRemove={removeSignal} /></div>
          <ConnectionForm onAdd={addConnection} />
          <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6"><div className="mb-5 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Принятая карта связей</div><ConnectionsMap connections={connections} onRemove={removeConnection} /></div>
          {report && <ReportPreview report={report} />}
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 xl:sticky xl:top-6 xl:h-fit">
          <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80"><Layers3 className="h-4 w-4" /> Заметки аналитика</div>
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Факты, вопросы клиенту, гипотезы и ограничения проверки..." className="mt-5 min-h-80 w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white outline-none focus:border-sky-300/40" />
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">Следующие действия аналитика: проверить источники, подтвердить идентификацию, принять или отклонить предложенные сигналы, сформировать осторожный клиентский вывод.</div>
        </div>
      </div>
    </AnalystLayout>
  )
}
