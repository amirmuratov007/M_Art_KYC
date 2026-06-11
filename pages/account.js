import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import HeimdallNav from '@/components/HeimdallNav'
import { getSupabaseBrowserClient } from '@/lib/supabaseClient'
import { useHeimdallAuth } from '@/components/HeimdallAuthProvider'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  FolderOpen,
  LockKeyhole,
  LogOut,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  UserRound
} from 'lucide-react'

const statusLabel = {
  new: 'Новая',
  in_progress: 'В работе',
  review: 'На проверке',
  completed: 'Завершено',
  paused: 'Приостановлено'
}

const statusTone = {
  new: 'border-sky-300/20 bg-sky-300/10 text-sky-100',
  in_progress: 'border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]',
  review: 'border-violet-300/20 bg-violet-300/10 text-violet-100',
  completed: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100',
  paused: 'border-white/10 bg-white/5 text-white/65'
}

const serviceOptions = [
  'Проверка контрагента',
  'Проверка поставщика',
  'Due Diligence сделки',
  'Информационная безопасность',
  'Внутреннее расследование',
  'Проверка домашнего персонала',
  'Служба безопасности на аутсорсе',
  'Другое'
]

const initialClientRequest = {
  service: 'Проверка контрагента',
  urgency: 'Обычная',
  subject: '',
  details: '',
  company: '',
  contact: ''
}

export default function AccountPage() {
  const router = useRouter()
  const { refreshSession, signOut } = useHeimdallAuth()
  const [mode, setMode] = useState('login')
  const [activeTab, setActiveTab] = useState('checks')
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [checksLoading, setChecksLoading] = useState(false)
  const [requestLoading, setRequestLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [checks, setChecks] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [requestMessage, setRequestMessage] = useState('')
  const [requestError, setRequestError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    company: ''
  })
  const [clientRequest, setClientRequest] = useState(initialClientRequest)

  const supabase = useMemo(() => {
    try {
      return getSupabaseBrowserClient()
    } catch (error) {
      return null
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setError('В Vercel не указаны NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY')
      setLoading(false)
      return
    }

    let mounted = true

    async function init() {
      const { data } = await supabase.auth.getSession()

      if (!mounted) return

      const currentUser = data?.session?.user || null
      setUser(currentUser)
      setLoading(false)

      if (currentUser) {
        hydrateClientRequest(currentUser)
        loadChecks(currentUser.id)
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null
      setUser(currentUser)

      if (currentUser) {
        hydrateClientRequest(currentUser)
        loadChecks(currentUser.id)
      } else {
        setChecks([])
      }
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    if (!router.isReady) return

    const requestedTab = Array.isArray(router.query.tab) ? router.query.tab[0] : router.query.tab
    const requestedService = Array.isArray(router.query.service) ? router.query.service[0] : router.query.service

    if (['checks', 'reports', 'request', 'documents'].includes(requestedTab)) {
      setActiveTab(requestedTab)
    }

    if (requestedService && serviceOptions.includes(requestedService)) {
      setClientRequest((current) => ({ ...current, service: requestedService }))
    }
  }, [router.isReady, router.query.tab, router.query.service])

  function hydrateClientRequest(currentUser) {
    setClientRequest((current) => ({
      ...current,
      company: current.company || currentUser?.user_metadata?.company || '',
      contact: current.contact || currentUser?.email || ''
    }))
  }

  async function loadChecks(userId) {
    if (!supabase || !userId) return

    setChecksLoading(true)

    const { data, error } = await supabase
      .from('client_checks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
      setChecks([])
    } else {
      setError('')
      setChecks(data || [])
    }

    setChecksLoading(false)
  }

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const updateClientRequest = (key, value) => {
    setClientRequest((current) => ({ ...current, [key]: value }))
  }

  async function submit(event) {
    event.preventDefault()

    if (!supabase) return

    setAuthLoading(true)
    setError('')
    setMessage('')

    if (mode === 'register') {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
            company: form.company
          }
        }
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Аккаунт создан. Если Supabase требует подтверждение email, откройте письмо и подтвердите регистрацию.')
        setUser(data?.user || null)
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password
      })

      if (error) {
        setError(error.message)
      } else {
        setUser(data?.user || null)
        setMessage('Вход выполнен.')
        const requestedTab = Array.isArray(router.query.tab) ? router.query.tab[0] : router.query.tab
        if (requestedTab === 'request') setActiveTab('request')
      }
    }

    setAuthLoading(false)
  }

  async function submitClientRequest(event) {
    event.preventDefault()

    if (!supabase || !user) return

    setRequestLoading(true)
    setRequestError('')
    setRequestMessage('')

    const currentSession = await refreshSession()
    const accessToken = currentSession?.access_token

    if (!accessToken) {
      setRequestLoading(false)
      setRequestError('Сессия истекла. Войдите в кабинет заново.')
      return
    }

    try {
      const response = await fetch('/api/client-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          ...clientRequest,
          fullName: displayName
        })
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok || result.ok === false) {
        throw new Error(result.error || 'Не удалось отправить запрос')
      }

      setRequestMessage('Запрос отправлен. Команда HEIMDALL получит его в Telegram и свяжется с вами.')
      setClientRequest((current) => ({
        ...initialClientRequest,
        company: current.company,
        contact: current.contact
      }))
      setActiveTab('checks')
    } catch (error) {
      setRequestError(error.message || 'Ошибка отправки запроса')
    }

    setRequestLoading(false)
  }

  async function logout() {
    if (!supabase) return

    await signOut()
    setUser(null)
    setChecks([])
    setMessage('')
    setError('')
    setRequestMessage('')
    setRequestError('')
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email ||
    'Клиент HEIMDALL'

  const reports = checks.filter((item) => Boolean(item.report_url))
  const activeChecks = checks.filter((item) => item.status === 'in_progress' || item.status === 'review' || item.status === 'new')

  const tabs = [
    ['checks', 'Мои проверки', checks.length],
    ['reports', 'Отчеты', reports.length],
    ['request', 'Новый запрос', null],
    ['documents', 'Документы', null]
  ]

  return (
    <>
      <Head>
        <title>Личный кабинет | HEIMDALL</title>
        <meta name="description" content="Личный кабинет клиента HEIMDALL: проверки, статусы, отчеты, документы и новые запросы." />
        <link rel="canonical" href="https://www.heimdall-group.ru/account" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Клиентский доступ
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Личный кабинет клиента
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Закрытая зона HEIMDALL для клиентов: проверки, статусы, отчеты, документы и новые запросы команде.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/client-account-guide" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white">
                Как работает кабинет
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          {loading ? (
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-10 text-white/60 backdrop-blur-2xl">
              Загрузка кабинета...
            </div>
          ) : !user ? (
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
                <ShieldCheck className="mb-8 h-9 w-9 text-sky-300" />

                <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                  Вход для клиентов HEIMDALL
                </h2>

                <p className="mt-6 text-base leading-8 text-white/60">
                  После входа клиент видит только свои проверки. Доступ строится через Supabase Auth и привязку проверок к user_id.
                </p>

                <div className="mt-8 grid gap-3">
                  {[
                    'Мои проверки и текущие статусы',
                    'Мои отчеты и ссылки на PDF',
                    'Новый запрос в работу',
                    'Документы, вводные данные и рекомендации'
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[42px] border border-sky-300/20 bg-white/[0.055] p-7 backdrop-blur-2xl md:p-10">
                <div className="mb-7 flex rounded-2xl border border-white/10 bg-black/25 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login')
                      setError('')
                      setMessage('')
                    }}
                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${mode === 'login' ? 'bg-sky-500 text-white' : 'text-white/55 hover:text-white'}`}
                  >
                    Вход
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register')
                      setError('')
                      setMessage('')
                    }}
                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${mode === 'register' ? 'bg-sky-500 text-white' : 'text-white/55 hover:text-white'}`}
                  >
                    Регистрация
                  </button>
                </div>

                <form onSubmit={submit} className="grid gap-4">
                  {mode === 'register' && (
                    <>
                      <input
                        required
                        value={form.fullName}
                        onChange={(event) => update('fullName', event.target.value)}
                        placeholder="ФИО"
                        className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                      />

                      <input
                        value={form.company}
                        onChange={(event) => update('company', event.target.value)}
                        placeholder="Компания"
                        className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                      />
                    </>
                  )}

                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update('email', event.target.value)}
                    placeholder="Email"
                    className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                  />

                  <input
                    required
                    type="password"
                    minLength={6}
                    value={form.password}
                    onChange={(event) => update('password', event.target.value)}
                    placeholder="Пароль"
                    className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                  />

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)] disabled:opacity-60"
                  >
                    {authLoading ? 'Обработка...' : mode === 'register' ? 'Создать кабинет' : 'Войти'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                {message && (
                  <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="mt-5 rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
                    {error}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              <div className="grid gap-6 rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sky-300/80">
                    <UserRound className="h-4 w-4" />
                    Клиентский workspace
                  </div>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                    {displayName}
                  </h2>
                  <p className="mt-5 text-base leading-8 text-white/60">
                    Здесь отображаются ваши проверки, отчеты, документы и новые задачи для команды HEIMDALL.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white"
                >
                  Выйти
                  <LogOut className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-6 rounded-[34px] border border-sky-300/20 bg-sky-300/[0.055] p-6 backdrop-blur-2xl md:grid-cols-[1fr_auto] md:items-center md:p-7">
                <div>
                  <div className="text-sm uppercase tracking-[0.22em] text-sky-300/80">Подсказка по кабинету</div>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    Проверки появляются после добавления аналитиком HEIMDALL. Новый запрос можно отправить во вкладке “Новый запрос”, а готовые материалы появятся во вкладке “Отчеты”.
                  </p>
                </div>
                <Link href="/client-account-guide" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">
                  Инструкция
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="text-sm text-white/45">Всего проверок</div>
                  <div className="mt-3 text-5xl font-semibold text-[#F7D784]">{checks.length}</div>
                </div>
                <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="text-sm text-white/45">В работе</div>
                  <div className="mt-3 text-5xl font-semibold text-sky-100">{activeChecks.length}</div>
                </div>
                <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="text-sm text-white/45">Отчетов</div>
                  <div className="mt-3 text-5xl font-semibold text-violet-100">{reports.length}</div>
                </div>
                <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="text-sm text-white/45">Завершено</div>
                  <div className="mt-3 text-5xl font-semibold text-emerald-100">
                    {checks.filter((item) => item.status === 'completed').length}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 rounded-[30px] border border-white/10 bg-white/[0.045] p-3 backdrop-blur-2xl">
                {tabs.map(([key, label, count]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${activeTab === key ? 'bg-sky-500 text-white' : 'bg-black/25 text-white/58 hover:text-white'}`}
                  >
                    {label}{count !== null ? ` · ${count}` : ''}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => user?.id && loadChecks(user.id)}
                  className="ml-auto inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 hover:text-white"
                >
                  <RefreshCw className="h-4 w-4" />
                  Обновить
                </button>
              </div>

              {requestMessage && (
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
                  {requestMessage}
                </div>
              )}

              {requestError && (
                <div className="rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
                  {requestError}
                </div>
              )}

              {activeTab === 'checks' && (
                <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl md:p-7">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <h3 className="text-3xl font-semibold tracking-[-0.04em]">Мои проверки</h3>
                    {checksLoading && <div className="text-sm text-white/45">Обновление...</div>}
                  </div>

                  <div className="grid gap-4">
                    {checks.length === 0 ? (
                      <div className="rounded-[30px] border border-white/10 bg-black/25 p-8 text-white/60">
                        Пока нет проверок. Создайте новый запрос или дождитесь добавления проверки аналитиком HEIMDALL.
                      </div>
                    ) : (
                      checks.map((check) => (
                        <div key={check.id} className="grid gap-5 rounded-[30px] border border-white/10 bg-black/25 p-5 md:grid-cols-[1fr_auto_auto] md:items-center">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold tracking-[-0.03em]">{check.title || 'Проверка HEIMDALL'}</h4>
                              <p className="mt-2 text-sm leading-6 text-white/55">{check.summary || check.type || 'Информация обновляется аналитиком.'}</p>
                              <div className="mt-3 text-xs text-white/35">
                                {check.created_at ? new Date(check.created_at).toLocaleDateString('ru-RU') : 'Дата не указана'}
                              </div>
                            </div>
                          </div>

                          <div className="text-left md:text-center">
                            <div className="text-xs uppercase tracking-[0.18em] text-white/35">Risk score</div>
                            <div className="mt-1 text-3xl font-semibold text-[#F7D784]">{check.risk_score ?? '-'}</div>
                          </div>

                          <div className="flex flex-col gap-3 md:items-end">
                            <div className={`rounded-full border px-4 py-2 text-sm ${statusTone[check.status] || 'border-white/10 bg-white/5 text-white/70'}`}>
                              {statusLabel[check.status] || check.status || 'В работе'}
                            </div>

                            {check.report_url && (
                              <a
                                href={check.report_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white"
                              >
                                Открыть отчет
                                <ArrowRight className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
                  <h3 className="text-3xl font-semibold tracking-[-0.04em]">Отчеты</h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58">
                    Здесь собраны проверки, по которым уже добавлена ссылка на отчет. Сами файлы должны храниться только в разрешенном месте: закрытое хранилище, Supabase Storage или защищенная ссылка.
                  </p>

                  <div className="mt-7 grid gap-4">
                    {reports.length === 0 ? (
                      <div className="rounded-[30px] border border-white/10 bg-black/25 p-8 text-white/60">
                        Пока нет опубликованных отчетов.
                      </div>
                    ) : (
                      reports.map((check) => (
                        <div key={check.id} className="grid gap-4 rounded-[30px] border border-white/10 bg-black/25 p-5 md:grid-cols-[1fr_auto] md:items-center">
                          <div>
                            <h4 className="text-xl font-semibold tracking-[-0.03em]">{check.title || 'Отчет HEIMDALL'}</h4>
                            <p className="mt-2 text-sm leading-6 text-white/55">{check.summary || 'Финальные материалы по проверке.'}</p>
                          </div>
                          <a
                            href={check.report_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#D6A84F] px-5 py-3 text-sm font-semibold text-[#050816]"
                          >
                            Открыть отчет
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'request' && (
                <div className="grid gap-6 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.055] p-7 backdrop-blur-2xl md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
                  <div>
                    <MessageSquareText className="mb-7 h-9 w-9 text-sky-300" />
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Новый запрос</h3>
                    <p className="mt-5 text-base leading-8 text-white/62">
                      Опишите задачу: кого или что нужно проверить, какие сроки, какие документы уже есть и какой результат нужен руководителю. Запрос уйдет команде HEIMDALL в Telegram и в таблицу заявок.
                    </p>
                    <div className="mt-7 grid gap-3 text-sm text-white/62">
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">Не отправляйте пароли, банковские доступы и лишние персональные данные.</div>
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">Файлы пока передаются через согласованный защищенный канал. Загрузку документов добавим отдельным патчем.</div>
                    </div>
                  </div>

                  <form onSubmit={submitClientRequest} className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <select
                        value={clientRequest.service}
                        onChange={(event) => updateClientRequest('service', event.target.value)}
                        className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-sky-300/40"
                      >
                        {serviceOptions.map((option) => (
                          <option key={option} value={option} className="bg-[#08111f] text-white">{option}</option>
                        ))}
                      </select>

                      <select
                        value={clientRequest.urgency}
                        onChange={(event) => updateClientRequest('urgency', event.target.value)}
                        className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none focus:border-sky-300/40"
                      >
                        {['Обычная', 'Срочно', 'Критично'].map((option) => (
                          <option key={option} value={option} className="bg-[#08111f] text-white">{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        value={clientRequest.company}
                        onChange={(event) => updateClientRequest('company', event.target.value)}
                        placeholder="Компания"
                        className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                      />
                      <input
                        value={clientRequest.contact}
                        onChange={(event) => updateClientRequest('contact', event.target.value)}
                        placeholder="Контакт для связи"
                        className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                      />
                    </div>

                    <input
                      required
                      value={clientRequest.subject}
                      onChange={(event) => updateClientRequest('subject', event.target.value)}
                      placeholder="Тема запроса"
                      className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                    />

                    <textarea
                      required
                      rows={7}
                      value={clientRequest.details}
                      onChange={(event) => updateClientRequest('details', event.target.value)}
                      placeholder="Описание задачи: объект проверки, сроки, вводные данные, ожидаемый результат"
                      className="resize-none rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40"
                    />

                    <button
                      type="submit"
                      disabled={requestLoading}
                      className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.25)] disabled:opacity-60"
                    >
                      {requestLoading ? 'Отправка...' : 'Отправить запрос'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
                  <FolderOpen className="mb-7 h-9 w-9 text-[#F7D784]" />
                  <h3 className="text-3xl font-semibold tracking-[-0.04em]">Документы</h3>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58">
                    Раздел подготовлен под документы клиента: вводные материалы, отчеты, приложения, NDA и согласованные файлы. Сейчас опубликованные документы отображаются через ссылки на отчеты в проверках. Загрузку документов в закрытое хранилище нужно добавлять отдельным безопасным патчем.
                  </p>

                  <div className="mt-7 grid gap-4 md:grid-cols-3">
                    {[
                      ['Вводные данные', 'Материалы, которые клиент передает для проверки.'],
                      ['Рабочие документы', 'Промежуточные файлы и уточнения аналитика.'],
                      ['Финальные отчеты', 'Итоговые PDF и рекомендации по результату.']
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-[30px] border border-white/10 bg-black/25 p-6">
                        <h4 className="text-xl font-semibold tracking-[-0.03em]">{title}</h4>
                        <p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-6 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-7 backdrop-blur-2xl md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Client application</div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Открыть клиентское приложение</h3>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">
                    Если вам выдана персональная ссылка после оплаты, используйте ее для доступа к защищенному приложению.
                  </p>
                </div>
                <Link href="/app" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
                  Перейти в приложение
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {error && (
                <div className="rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
                  {error}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
