import { useEffect, useState } from 'react'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { AlertTriangle, CheckCircle2, Download, FileText, Loader2, Search, ShieldCheck, UploadCloud } from 'lucide-react'

const ACCEPTED_FILES = '.pdf,.html,.htm,.docx,.txt,.csv,.json,.xml'

function asArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'object') return Object.entries(value).map(([key, item]) => ({ key, item }))
  return [value]
}

function getFirst(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '')
}

function renderValue(value) {
  if (value === null || value === undefined || value === '') return 'Нет данных'
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
  return JSON.stringify(value, null, 2)
}

function absoluteUrl(baseUrl, value) {
  if (!value) return ''
  if (/^https?:\/\//i.test(value)) return value
  return `${baseUrl}${value.startsWith('/') ? value : `/${value}`}`
}

function ResultList({ title, items }) {
  const list = asArray(items)
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      {list.length ? (
        <div className="mt-4 grid gap-3">
          {list.map((item, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/72">
              <pre className="whitespace-pre-wrap break-words font-sans">{renderValue(item)}</pre>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-white/45">Нет данных в ответе Heimdall-SA.</p>
      )}
    </section>
  )
}

export default function HeimdallSaWorkspace() {
  const [subject, setSubject] = useState('')
  const [rawText, setRawText] = useState('')
  const [files, setFiles] = useState([])
  const [useOpenSources, setUseOpenSources] = useState(true)
  const [useSbis, setUseSbis] = useState(false)
  const [secret, setSecret] = useState('')
  const [savingSecret, setSavingSecret] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.sessionStorage.getItem('heimdall_admin_secret') || ''
    const params = new URLSearchParams(window.location.search)
    setSecret(saved)
    setSubject(params.get('subject') || '')
    setRawText(params.get('raw_text') || '')
  }, [])

  const analysis = result?.analysis || {}
  const baseUrl = result?.heimdall_sa_base_url || 'http://127.0.0.1:5188'
  const reportUrl = absoluteUrl(baseUrl, result?.report_url)
  const docxUrl = absoluteUrl(baseUrl, result?.docx_url)

  const stats = [
    ['Уровень риска', getFirst(analysis.risk_level, analysis.riskLevel, analysis.level, analysis.risk?.level, analysis.risk)],
    ['Документов', getFirst(analysis.document_count, analysis.documents_count, analysis.stats?.documents, analysis.documents?.length)],
    ['Дублей', getFirst(analysis.duplicate_count, analysis.duplicates_count, analysis.stats?.duplicates, analysis.duplicates?.length, analysis.duplicates)],
    ['Класс нейросети', getFirst(analysis.neural_class, analysis.nn_class, analysis.class, analysis.predicted_class, analysis.model_class)]
  ]

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setResult(null)

    if (!subject.trim() && !rawText.trim() && files.length === 0) {
      setError('Добавь объект проверки, сырой текст или файл.')
      return
    }

    try {
      setLoading(true)
      if (savingSecret && typeof window !== 'undefined') {
        window.sessionStorage.setItem('heimdall_admin_secret', secret)
      }

      const form = new FormData()
      form.append('subject', subject)
      form.append('raw_text', rawText)
      form.append('use_open_sources', useOpenSources ? 'true' : 'false')
      form.append('use_sbis', useSbis ? 'true' : 'false')
      files.forEach((file) => form.append('files', file))

      const response = await fetch('/api/heimdall-sa/analyze', {
        method: 'POST',
        headers: secret ? { 'x-heimdall-admin-secret': secret } : {},
        body: form
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Heimdall-SA вернул ошибку')
      }

      setResult(data)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnalystLayout title="Проверка Heimdall-SA">
      <div className="grid gap-6">
        <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Центр риск-аналитики</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">Проверка Heimdall-SA</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/58">
                Рабочий интерфейс для собственной нейросети: сырой массив, файлы, открытые источники и СБИС уходят в локальный сервер Heimdall-SA через защищенный прокси сайта.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
              СБИС-ключи остаются только в Heimdall-SA
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/78">Объект проверки</span>
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-300/50"
                  placeholder="ФИО, компания, ИНН, контрагент или кандидат"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/78">Сырой массив данных</span>
                <textarea
                  value={rawText}
                  onChange={(event) => setRawText(event.target.value)}
                  rows={12}
                  className="resize-y rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-300/50"
                  placeholder="Вставь сюда выгрузку, переписку, реквизиты, факты, найденные данные или заметки аналитика."
                />
              </label>

              <label className="rounded-[26px] border border-dashed border-sky-300/25 bg-sky-300/5 p-5">
                <div className="flex items-center gap-3">
                  <UploadCloud className="h-5 w-5 text-sky-300" />
                  <div>
                    <div className="font-semibold">Файлы PDF / HTML / DOCX / TXT / CSV / JSON / XML</div>
                    <div className="mt-1 text-xs text-white/45">{files.length ? files.map((file) => file.name).join(', ') : 'Можно загрузить несколько файлов сразу'}</div>
                  </div>
                </div>
                <input
                  type="file"
                  accept={ACCEPTED_FILES}
                  multiple
                  onChange={(event) => setFiles(Array.from(event.target.files || []))}
                  className="mt-4 block w-full text-sm text-white/65 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-white"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                  <input type="checkbox" checked={useOpenSources} onChange={(event) => setUseOpenSources(event.target.checked)} className="h-4 w-4 accent-sky-400" />
                  Искать по открытым источникам
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                  <input type="checkbox" checked={useSbis} onChange={(event) => setUseSbis(event.target.checked)} className="h-4 w-4 accent-sky-400" />
                  Подтянуть данные СБИС
                </label>
              </div>

              <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-white/70">HEIMDALL_ADMIN_SECRET</span>
                  <input
                    value={secret}
                    onChange={(event) => setSecret(event.target.value)}
                    type="password"
                    className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none focus:border-sky-300/50"
                    placeholder="Нужен для доступа к серверному прокси"
                  />
                </label>
                <label className="flex items-center gap-3 text-xs text-white/50">
                  <input type="checkbox" checked={savingSecret} onChange={(event) => setSavingSecret(event.target.checked)} className="h-4 w-4 accent-sky-400" />
                  Запомнить в sessionStorage только на время этой сессии браузера
                </label>
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-300/25 bg-red-300/10 p-4 text-sm text-red-100">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-400 px-6 py-4 font-semibold text-black transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                Сформировать справку
              </button>
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <h2 className="text-xl font-semibold">Результат</h2>
            {!result ? (
              <div className="mt-6 rounded-[26px] border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/55">
                После отправки здесь появятся уровень риска, факты, риск-сигналы, блоки открытых источников и СБИС, а также ссылки на HTML и Word-справку.
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
                  <CheckCircle2 className="h-5 w-5" />
                  Кейс {result.case_id} сформирован
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {stats.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-white/38">{label}</div>
                      <div className="mt-2 text-lg font-semibold text-white/86">{renderValue(value)}</div>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {reportUrl && (
                    <a href={reportUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 font-semibold">
                      <FileText className="h-5 w-5" />
                      HTML-справка
                    </a>
                  )}
                  {docxUrl && (
                    <a href={docxUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 font-semibold">
                      <Download className="h-5 w-5" />
                      Word-справка
                    </a>
                  )}
                </div>
              </div>
            )}
          </section>
        </form>

        {result && (
          <div className="grid gap-6 xl:grid-cols-2">
            <ResultList title="Найденные факты" items={getFirst(analysis.facts, analysis.found_facts, analysis.key_facts)} />
            <ResultList title="Риск-сигналы" items={getFirst(analysis.risk_signals, analysis.signals, analysis.risks)} />
            <ResultList title="Внешние источники" items={getFirst(analysis.open_sources, analysis.external_sources, analysis.sources)} />
            {getFirst(analysis.sbis, analysis.sbis_data, result.sbis) && <ResultList title="СБИС" items={getFirst(analysis.sbis, analysis.sbis_data, result.sbis)} />}
            {result.structured_html && <ResultList title="Структурный HTML-разбор" items={result.structured_html} />}
            <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 xl:col-span-2">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-sky-300" />
                <h3 className="text-lg font-semibold">Сырой ответ analysis</h3>
              </div>
              <pre className="mt-4 max-h-[520px] overflow-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-5 text-white/68">{JSON.stringify(analysis, null, 2)}</pre>
            </section>
          </div>
        )}
      </div>
    </AnalystLayout>
  )
}
