import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import { getSupabaseBrowserClient } from '@/lib/supabaseClient'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  LogOut,
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

export default function AccountPage() {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  const [checksLoading, setChecksLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [checks, setChecks] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    company: ''
  })

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
        loadChecks(currentUser.id)
      }
    }

    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null
      setUser(currentUser)

      if (currentUser) {
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
      }
    }

    setAuthLoading(false)
  }

  async function logout() {
    if (!supabase) return

    await supabase.auth.signOut()
    setUser(null)
    setChecks([])
    setMessage('')
    setError('')
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.email ||
    'Клиент HEIMDALL'

  return (
    <>
      <Head>
        <title>Личный кабинет | HEIMDALL</title>
        <meta name="description" content="Личный кабинет клиента HEIMDALL: проверки, статусы, отчеты и риск-сигналы." />
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
              Закрытая зона HEIMDALL для клиентов: статусы проверок, отчеты, риск-сигналы и история обращений.
            </p>
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
                    'Мои документы и история обращений',
                    'Риск-сигналы и рекомендации аналитика'
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
                    Здесь отображаются ваши проверки, отчеты, документы и текущие риск-сигналы. Это рабочая зона клиента HEIMDALL.
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

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="text-sm text-white/45">Всего проверок</div>
                  <div className="mt-3 text-5xl font-semibold text-[#F7D784]">{checks.length}</div>
                </div>
                <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="text-sm text-white/45">В работе</div>
                  <div className="mt-3 text-5xl font-semibold text-sky-100">
                    {checks.filter((item) => item.status === 'in_progress' || item.status === 'review').length}
                  </div>
                </div>
                <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="text-sm text-white/45">Завершено</div>
                  <div className="mt-3 text-5xl font-semibold text-emerald-100">
                    {checks.filter((item) => item.status === 'completed').length}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  ['Мои проверки', 'Статусы, риск-оценка и текущий прогресс аналитика.'],
                  ['Мои отчеты', 'PDF, выводы, ссылки на материалы и финальные рекомендации.'],
                  ['Мои документы', 'Файлы, вводные данные и история взаимодействия с HEIMDALL.']
                ].map(([title, text]) => (
                  <div key={title} className="rounded-[34px] border border-sky-300/15 bg-sky-300/[0.055] p-7 backdrop-blur-2xl">
                    <FileText className="mb-6 h-7 w-7 text-sky-300" />
                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                  </div>
                ))}
              </div>

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

              <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl md:p-7">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h3 className="text-3xl font-semibold tracking-[-0.04em]">
                    Мои проверки
                  </h3>
                  {checksLoading && <div className="text-sm text-white/45">Обновление...</div>}
                </div>

                <div className="grid gap-4">
                  {checks.length === 0 ? (
                    <div className="rounded-[30px] border border-white/10 bg-black/25 p-8 text-white/60">
                      Пока нет проверок. После добавления записи в Supabase она появится здесь автоматически.
                    </div>
                  ) : (
                    checks.map((check) => (
                      <div key={check.id} className="grid gap-5 rounded-[30px] border border-white/10 bg-black/25 p-5 md:grid-cols-[1fr_auto_auto] md:items-center">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold tracking-[-0.03em]">
                              {check.title || 'Проверка HEIMDALL'}
                            </h4>
                            <p className="mt-2 text-sm leading-6 text-white/55">
                              {check.summary || check.type || 'Информация обновляется аналитиком.'}
                            </p>
                          </div>
                        </div>

                        <div className="text-left md:text-center">
                          <div className="text-xs uppercase tracking-[0.18em] text-white/35">Risk score</div>
                          <div className="mt-1 text-3xl font-semibold text-[#F7D784]">
                            {check.risk_score ?? '-'}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 md:items-end">
                          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
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
