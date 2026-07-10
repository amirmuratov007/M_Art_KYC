import { useEffect, useRef, useState } from 'react'
import { AnalystLayout } from '@/components/analyst/AnalystUI'
import { AlertTriangle, CheckCircle2, Download, FileText, Loader2, ShieldCheck, UploadCloud, XCircle } from 'lucide-react'

const ACCEPTED_FILES = '.pdf,.html,.htm,.docx,.txt,.csv,.json,.xml'
const ACCEPTED_EXTENSIONS = new Set(ACCEPTED_FILES.split(','))
const MAX_UPLOAD_BYTES = 500 * 1024 * 1024
const MAX_FILES = 50

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
  if (Array.isArray(value)) return value.slice(0, 12).map(renderValue).join(', ')
  if (value?.key !== undefined && value?.item !== undefined) {
    const item = value.item
    if (Array.isArray(item)) return `${value.key}: ${item.slice(0, 12).join(', ')}${item.length > 12 ? `, еще ${item.length - 12}` : ''}`
    if (item && typeof item === 'object' && 'score' in item) {
      const count = Array.isArray(item.snippets) ? item.snippets.length : 0
      return `${value.key}: ${item.score} баллов${count ? `, найдено фрагментов: ${count}` : ''}`
    }
    return `${value.key}: ${renderValue(item)}`
  }
  if ('title' in value || 'url' in value) {
    return [value.title, value.url, value.tone ? `тональность: ${value.tone}` : ''].filter(Boolean).join('\n')
  }
  if ('name' in value || 'kind' in value || 'chars' in value) {
    return [value.name, value.kind, value.chars ? `${value.chars} символов` : '', value.duplicate_of ? `дубль: ${value.duplicate_of}` : ''].filter(Boolean).join(' · ')
  }
  if ('status' in value || 'message' in value || 'error' in value) {
    return [value.status, value.message || value.error].filter(Boolean).join('\n')
  }
  if ('enabled' in value && Array.isArray(value.hits)) {
    return `Найдено источников: ${value.hits.length}. Негатив: ${value.negative_count || 0}; позитив: ${value.positive_count || 0}; нейтрально: ${value.neutral_count || 0}.`
  }
  if ('stats' in value || 'consolidated' in value) {
    const stats = value.stats || {}
    return [value.name, stats.documents ? `документов: ${stats.documents}` : '', stats.facts ? `фактов: ${stats.facts}` : ''].filter(Boolean).join(' · ')
  }
  return Object.entries(value)
    .filter(([, item]) => item !== undefined && item !== null && item !== '')
    .slice(0, 10)
    .map(([key, item]) => `${key}: ${typeof item === 'object' ? renderValue(item) : item}`)
    .join('\n')
}

function formatBytes(bytes) {
  if (!bytes) return '0 Б'
  const units = ['Б', 'КБ', 'МБ', 'ГБ']
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / (1024 ** index)
  return `${value >= 10 || index === 0 ? Math.round(value) : value.toFixed(1)} ${units[index]}`
}

function validateFiles(nextFiles) {
  if (nextFiles.length > MAX_FILES) return `Можно загрузить не более ${MAX_FILES} файлов за одну проверку.`

  const unsupported = nextFiles.find((file) => {
    const extension = `.${file.name.split('.').pop()?.toLowerCase() || ''}`
    return !ACCEPTED_EXTENSIONS.has(extension)
  })
  if (unsupported) return `Формат файла «${unsupported.name}» не поддерживается.`

  const totalBytes = nextFiles.reduce((sum, file) => sum + file.size, 0)
  if (totalBytes > MAX_UPLOAD_BYTES) return 'Общий размер файлов превышает 500 МБ.'
  return ''
}

async function readResponsePayload(response) {
  const text = await response.text()
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch (_) {
    return { error: text }
  }
}

function ResultList({ title, items }) {
  const list = asArray(items).slice(0, 16)
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      {list.length ? (
        <div className="mt-4 grid gap-3">
          {list.map((item, index) => (
            <div key={index} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/72">
              <p className="whitespace-pre-wrap break-words">{renderValue(item)}</p>
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const requestController = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setSubject(params.get('subject') || '')
    setRawText(params.get('raw_text') || '')
  }, [])

  useEffect(() => () => requestController.current?.abort(), [])

  const analysis = result?.analysis || {}
  const reportUrl = result?.report_url || ''
  const docxUrl = result?.docx_url || ''
  const totalFileBytes = files.reduce((sum, file) => sum + file.size, 0)

  const stats = [
    ['Уровень риска', getFirst(analysis.risk_level, analysis.riskLevel, analysis.level, analysis.risk?.level, analysis.risk)],
    ['Документов', getFirst(analysis.document_count, analysis.documents_count, analysis.stats?.documents, analysis.documents?.length)],
    ['Дублей', getFirst(analysis.duplicate_count, analysis.duplicates_count, analysis.stats?.duplicates, analysis.duplicates?.length, analysis.duplicates)],
    ['Класс нейросети', getFirst(analysis.neural?.label, analysis.neural_class, analysis.nn_class, analysis.class, analysis.predicted_class, analysis.model_class)]
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
      const controller = new AbortController()
      requestController.current = controller

      const form = new FormData()
      form.append('subject', subject)
      form.append('raw_text', rawText)
      form.append('use_open_sources', useOpenSources ? 'true' : 'false')
      form.append('use_sbis', useSbis ? 'true' : 'false')
      files.forEach((file) => form.append('files', file))

      const response = await fetch('/api/heimdall-sa/analyze', {
        method: 'POST',
        credentials: 'same-origin',
        body: form,
        signal: controller.signal
      })
      const data = await readResponsePayload(response)

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Heimdall-SA вернул ошибку')
      }

      setResult(data)
    } catch (submitError) {
      setError(submitError.name === 'AbortError' ? 'Проверка остановлена.' : submitError.message)
    } finally {
      requestController.current = null
      setLoading(false)
    }
  }

  function handleFiles(event) {
    const nextFiles = Array.from(event.target.files || [])
    const validationError = validateFiles(nextFiles)
    if (validationError) {
      event.target.value = ''
      setFiles([])
      setError(validationError)
      return
    }
    setError('')
    setFiles(nextFiles)
  }

  function cancelRequest() {
    requestController.current?.abort()
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
                  maxLength={300}
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-sky-300/50"
                  placeholder="ФИО, компания, ИНН, контрагент или кандидат"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-white/78">Сырой массив данных</span>
                <textarea
                  value={rawText}
                  onChange={(event) => setRawText(event.target.value)}
                  maxLength={2000000}
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
                    <div className="mt-1 text-xs text-white/45">
                      {files.length
                        ? `${files.length} файл(а), ${formatBytes(totalFileBytes)}: ${files.slice(0, 4).map((file) => file.name).join(', ')}${files.length > 4 ? ` и еще ${files.length - 4}` : ''}`
                        : 'До 50 файлов, общий размер до 500 МБ'}
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  accept={ACCEPTED_FILES}
                  multiple
                  onChange={handleFiles}
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

              <div className="flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100/85">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                Доступ подтверждается защищённой сессией аналитика. Ключи Heimdall-SA и СБИС не передаются в браузер.
              </div>

              {error && (
                <div role="alert" aria-live="polite" className="flex items-start gap-3 rounded-2xl border border-red-300/25 bg-red-300/10 p-4 text-sm text-red-100">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-400 px-6 py-4 font-semibold text-black transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                  {loading ? 'Формируем справку...' : 'Сформировать справку'}
                </button>
                {loading && (
                  <button type="button" onClick={cancelRequest} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/75">
                    <XCircle className="h-4 w-4" />
                    Остановить
                  </button>
                )}
              </div>
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
                    <a href={reportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 font-semibold">
                      <FileText className="h-5 w-5" />
                      HTML-справка
                    </a>
                  )}
                  {docxUrl && (
                    <a href={docxUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 font-semibold">
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
            <ResultList title="Внешние источники" items={getFirst(analysis.open_sources?.hits, analysis.external_sources, analysis.sources, analysis.open_sources)} />
            {getFirst(analysis.sbis, analysis.sbis_data, result.sbis) && <ResultList title="СБИС" items={getFirst(analysis.sbis, analysis.sbis_data, result.sbis)} />}
            {analysis.documents?.length ? <ResultList title="Загруженные материалы" items={analysis.documents} /> : null}
          </div>
        )}
      </div>
    </AnalystLayout>
  )
}
