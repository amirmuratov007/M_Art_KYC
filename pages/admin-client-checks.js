import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  LockKeyhole,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  UserRound
} from 'lucide-react'

const emptyForm = {
  id: '',
  user_id: '',
  title: '',
  type: 'counterparty',
  status: 'in_progress',
  risk_score: '',
  summary: '',
  report_url: ''
}

const statusLabels = {
  new: 'Новая',
  in_progress: 'В работе',
  review: 'На проверке',
  completed: 'Завершено',
  paused: 'Приостановлено'
}

const typeOptions = [
  ['counterparty', 'Проверка контрагента'],
  ['supplier', 'Проверка поставщика'],
  ['candidate', 'Проверка кандидата'],
  ['private_staff', 'Проверка домашнего персонала'],
  ['due_diligence', 'Due Diligence'],
  ['infosec', 'Информационная безопасность'],
  ['internal_investigation', 'Внутреннее расследование'],
  ['security_outsourcing', 'Служба безопасности на аутсорсе'],
  ['other', 'Другое']
]

const statusOptions = [
  ['new', 'Новая'],
  ['in_progress', 'В работе'],
  ['review', 'На проверке'],
  ['completed', 'Завершено'],
  ['paused', 'Приостановлено']
]

function inputClass(extra = '') {
  return `w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/50 ${extra}`
}

export default function AdminClientChecksPage() {
  const router = useRouter()
  const [secret, setSecret] = useState('')
  const [email, setEmail] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [checks, setChecks] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const isEditing = Boolean(form.id)

  useEffect(() => {
    const saved = window.localStorage.getItem('heimdall_admin_secret') || ''
    setSecret(saved)
  }, [])

  useEffect(() => {
    const emailFromQuery = typeof router.query?.email === 'string' ? router.query.email : ''
    if (emailFromQuery) setEmail(emailFromQuery)
  }, [router.query?.email])

  useEffect(() => {
    const emailFromQuery = typeof router.query?.email === 'string' ? router.query.email : ''
    if (!emailFromQuery || !secret) return

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailFromQuery)
    if (!isEmail) return

    const timer = window.setTimeout(() => {
      const formEvent = { preventDefault() {} }
      findUserByEmail(formEvent)
    }, 150)

    return () => window.clearTimeout(timer)
  }, [router.query?.email, secret])

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'x-heimdall-admin-secret': secret
  }), [secret])

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function saveSecret() {
    window.localStorage.setItem('heimdall_admin_secret', secret)
    setMessage('Админ-ключ сохранен в этом браузере.')
    setError('')
  }

  function resetForm(keepUser = true) {
    setForm({
      ...emptyForm,
      user_id: keepUser ? form.user_id : ''
    })
  }

  async function apiRequest(path, options = {}) {
    const response = await fetch(path, {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {})
      }
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok || result.ok === false) {
      throw new Error(result.error || 'Запрос не выполнен')
    }

    return result
  }

  async function findUserByEmail(event) {
    event.preventDefault()

    if (!secret) {
      setError('Сначала укажите HEIMDALL_ADMIN_SECRET')
      return
    }

    if (!email) {
      setError('Укажите email клиента')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await apiRequest(`/api/admin-client-checks?email=${encodeURIComponent(email)}`)
      setUserInfo(result.user)
      setForm((current) => ({ ...current, user_id: result.user.id }))
      setMessage(`Клиент найден: ${result.user.email}. Можно добавлять проверку в кабинет.`)
      await loadChecks(result.user.id, false)
    } catch (error) {
      setError(error.message || 'Клиент не найден')
    }

    setLoading(false)
  }

  async function loadChecks(userId = form.user_id, withLoader = true) {
    if (!secret) {
      setError('Сначала укажите HEIMDALL_ADMIN_SECRET')
      return
    }

    if (!userId) {
      setError('Сначала найдите клиента по email. Клиент должен быть зарегистрирован в /account.')
      return
    }

    if (withLoader) setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await apiRequest(`/api/admin-client-checks?user_id=${encodeURIComponent(userId)}`)
      setChecks(result.checks || [])
      if (withLoader) setMessage('Проверки клиента загружены.')
    } catch (error) {
      setError(error.message || 'Не удалось загрузить проверки')
      setChecks([])
    }

    if (withLoader) setLoading(false)
  }

  async function submitCheck(event) {
    event.preventDefault()

    if (!secret) {
      setError('Сначала укажите HEIMDALL_ADMIN_SECRET')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    const payload = {
      ...form,
      risk_score: form.risk_score === '' ? null : Number(form.risk_score)
    }

    try {
      await apiRequest('/api/admin-client-checks', {
        method: isEditing ? 'PATCH' : 'POST',
        body: JSON.stringify(payload)
      })
      setMessage(isEditing ? 'Проверка обновлена.' : 'Проверка добавлена в кабинет клиента.')
      await loadChecks(form.user_id, false)
      resetForm(true)
    } catch (error) {
      setError(error.message || 'Не удалось сохранить проверку')
    }

    setLoading(false)
  }

  function editCheck(check) {
    setForm({
      id: check.id || '',
      user_id: check.user_id || form.user_id || '',
      title: check.title || '',
      type: check.type || 'counterparty',
      status: check.status || 'in_progress',
      risk_score: check.risk_score ?? '',
      summary: check.summary || '',
      report_url: check.report_url || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function deleteCheck(id) {
    const confirmed = window.confirm('Удалить проверку из кабинета клиента?')
    if (!confirmed) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      await apiRequest('/api/admin-client-checks', {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })
      setChecks((current) => current.filter((item) => item.id !== id))
      setMessage('Проверка удалена.')
      if (String(form.id) === String(id)) resetForm(true)
    } catch (error) {
      setError(error.message || 'Не удалось удалить проверку')
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Управление клиентскими проверками | HEIMDALL</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Закрытая админ-страница HEIMDALL для управления клиентскими проверками." />
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
              Только для администратора
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Клиентские проверки
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Закрытая панель для добавления, обновления и удаления проверок в личном кабинете клиента HEIMDALL.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pb-28 sm:px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-8">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sky-300/80">
                <LockKeyhole className="h-4 w-4" />
                Доступ
              </div>

              <label className="mt-7 block text-sm text-white/55">HEIMDALL_ADMIN_SECRET</label>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="password"
                  value={secret}
                  onChange={(event) => setSecret(event.target.value)}
                  placeholder="Админ-ключ из Vercel"
                  className={inputClass()}
                />
                <button
                  type="button"
                  onClick={saveSecret}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-sky-300/20 bg-sky-300/10 px-5 py-4 font-semibold text-sky-100"
                >
                  <Save className="h-4 w-4" />
                  Сохранить
                </button>
              </div>

              <div className="mt-6 rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100/85">
                Эта страница не добавлена в меню и закрыта через серверную проверку ключа. Не передавай ссылку и ключ клиентам.
              </div>
            </div>

            <form onSubmit={findUserByEmail} className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sky-300/80">
                <Search className="h-4 w-4" />
                Найти клиента
              </div>

              <p className="mt-5 text-sm leading-7 text-white/58">
                Введи email клиента, с которым он зарегистрировался в кабинете. UUID из Supabase больше вручную вводить не нужно.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="client@example.com"
                  className={inputClass()}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-4 font-semibold text-white disabled:opacity-60"
                >
                  <Search className="h-4 w-4" />
                  Найти
                </button>
              </div>

              {userInfo && (
                <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-5 text-sm leading-7 text-emerald-100">
                  <div className="font-semibold">Клиент найден</div>
                  <div>Email: {userInfo.email}</div>
                  <div>User ID: {userInfo.id}</div>
                  {userInfo.full_name && <div>Имя: {userInfo.full_name}</div>}
                  {userInfo.company && <div>Компания: {userInfo.company}</div>}
                </div>
              )}
            </form>

            {(message || error) && (
              <div className={`rounded-[30px] border p-5 text-sm leading-7 ${error ? 'border-red-300/20 bg-red-300/10 text-red-100' : 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'}`}>
                {error || message}
              </div>
            )}
          </div>

          <div className="grid gap-8">
            <form onSubmit={submitCheck} className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
                    <Plus className="h-4 w-4" />
                    {isEditing ? 'Редактировать проверку' : 'Новая проверка'}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                    {isEditing ? 'Обновить карточку' : 'Добавить в кабинет'}
                  </h2>
                </div>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => resetForm(true)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70"
                  >
                    Новая карточка
                  </button>
                )}
              </div>

              <div className="mt-8 grid gap-4">
                <input type="hidden" value={form.user_id} readOnly />

                <div className="rounded-3xl border border-sky-300/15 bg-sky-300/10 p-5 text-sm leading-7 text-sky-50/85">
                  <div className="font-semibold text-white">Клиент для кабинета</div>
                  <div className="mt-2">
                    {userInfo?.email ? (
                      <>Найден клиент: <span className="font-semibold text-white">{userInfo.email}</span>. Проверка будет добавлена в его личный кабинет.</>
                    ) : (
                      <>Сначала найди клиента по email выше. Если клиент еще не зарегистрирован, попроси его войти или зарегистрироваться на /account.</>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/55">Название проверки</label>
                  <input
                    required
                    value={form.title}
                    onChange={(event) => update('title', event.target.value)}
                    placeholder="Например: Проверка поставщика Shenzhen Northline"
                    className={inputClass()}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm text-white/55">Тип</label>
                    <select value={form.type} onChange={(event) => update('type', event.target.value)} className={inputClass()}>
                      {typeOptions.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/55">Статус</label>
                    <select value={form.status} onChange={(event) => update('status', event.target.value)} className={inputClass()}>
                      {statusOptions.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/55">Risk score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={form.risk_score}
                      onChange={(event) => update('risk_score', event.target.value)}
                      placeholder="0-100"
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/55">Краткое резюме для клиента</label>
                  <textarea
                    rows={5}
                    value={form.summary}
                    onChange={(event) => update('summary', event.target.value)}
                    placeholder="Что проверяется, что уже найдено, какой следующий шаг. Не добавляй сюда чувствительные детали, которые нельзя показывать клиенту."
                    className={inputClass('resize-y leading-7')}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/55">Ссылка на отчет</label>
                  <input
                    value={form.report_url}
                    onChange={(event) => update('report_url', event.target.value)}
                    placeholder="https://... или пусто, если отчет еще не готов"
                    className={inputClass()}
                  />
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/58">
                  В кабинет клиента попадут только эти поля. Не публикуй в report_url открытые ссылки на файлы с персональными данными, если доступ к файлу не ограничен.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)] disabled:opacity-60"
                >
                  {loading ? 'Сохранение...' : isEditing ? 'Сохранить изменения' : 'Добавить проверку'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sky-300/80">
                    <FileText className="h-4 w-4" />
                    Проверки клиента
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Список карточек</h3>
                </div>

                <button
                  type="button"
                  onClick={() => loadChecks()}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 hover:text-white disabled:opacity-60"
                >
                  <RefreshCw className="h-4 w-4" />
                  Обновить
                </button>
              </div>

              <div className="mt-7 grid gap-4">
                {checks.length === 0 ? (
                  <div className="rounded-[30px] border border-white/10 bg-black/25 p-8 text-white/58">
                    Проверок пока нет или клиент еще не выбран по email.
                  </div>
                ) : (
                  checks.map((check) => (
                    <div key={check.id} className="rounded-[30px] border border-white/10 bg-black/25 p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/35">
                            <UserRound className="h-3.5 w-3.5" />
                            ID {check.id} · {check.type || 'type'}
                          </div>
                          <h4 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{check.title}</h4>
                          <p className="mt-3 text-sm leading-7 text-white/58">{check.summary || 'Резюме не заполнено.'}</p>
                        </div>

                        <div className="flex shrink-0 flex-col gap-2 text-right">
                          <div className="rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-sm text-[#F7D784]">
                            Risk {check.risk_score ?? '-'}
                          </div>
                          <div className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100">
                            {statusLabels[check.status] || check.status || 'В работе'}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => editCheck(check)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-sky-300/20 bg-sky-300/10 px-4 py-3 text-sm font-semibold text-sky-100"
                        >
                          <Save className="h-4 w-4" />
                          Редактировать
                        </button>

                        {check.report_url && (
                          <a
                            href={check.report_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70"
                          >
                            Открыть отчет
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => deleteCheck(check.id)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm font-semibold text-red-100"
                        >
                          <Trash2 className="h-4 w-4" />
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[34px] border border-amber-300/15 bg-amber-300/10 p-6 text-sm leading-7 text-amber-100/85">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4" />
                Важно
              </div>
              Эта панель управляет только карточками в таблице client_checks. UUID вручную вводить не нужно: клиент находится по email. Аккаунт клиента создается через регистрацию на /account.
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
