import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  FileText,
  Filter,
  LockKeyhole,
  MessageSquareText,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  UserRound
} from 'lucide-react'

const statusOptions = [
  ['new', 'Новая заявка'],
  ['contact', 'Связаться'],
  ['call', 'Созвон'],
  ['proposal', 'КП отправлено'],
  ['contract', 'Договор / NDA'],
  ['invoice', 'Счет'],
  ['paid', 'Оплачено'],
  ['in_work', 'В работе'],
  ['report_ready', 'Отчет готов'],
  ['support', 'Сопровождение'],
  ['closed', 'Исполнено'],
  ['lost', 'Отказ'],
  ['archived', 'Архив'],
  ['deleted', 'Удалено']
]

const priorityOptions = [
  ['low', 'Низкий'],
  ['normal', 'Обычный'],
  ['high', 'Высокий'],
  ['urgent', 'Срочно']
]

const statusLabels = Object.fromEntries(statusOptions)
const priorityLabels = Object.fromEntries(priorityOptions)

const serviceOptions = [
  'Проверка кандидата на чувствительную позицию',
  'Проверка домашнего персонала',
  'Проверка собственника квартиры',
  'Проверка собственника автомобиля',
  'Проверка контрагента',
  'Проверка поставщика перед авансом',
  'Due Diligence',
  'Информационная безопасность',
  'Аутсорсинг службы безопасности',
  'Внутреннее расследование',
  'Реклама / партнерство',
  'Другой запрос'
]

const emptyNewClient = {
  name: '',
  company: '',
  email: '',
  phone: '',
  contact: '',
  service: 'Проверка кандидата на чувствительную позицию',
  source: 'Ручное добавление / CRM',
  comment: '',
  priority: 'high',
  next_action: 'Связаться с клиентом'
}

function inputClass(extra = '') {
  return `w-full rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/50 ${extra}`
}

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value))
  } catch {
    return value
  }
}


function getDateState(value) {
  if (!value) return 'none'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'none'

  const now = new Date()
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

  if (date < now) return 'overdue'
  if (date >= startToday && date < startTomorrow) return 'today'
  return 'future'
}

function isFinalStatus(status) {
  return ['closed', 'lost', 'archived', 'deleted'].includes(status)
}

function getLeadTitle(lead) {
  return lead.company || lead.name || lead.contact || lead.email || lead.phone || `Заявка #${lead.id}`
}

function getLeadContact(lead) {
  return lead.contact || [lead.email, lead.phone].filter(Boolean).join(' · ') || 'Контакт не указан'
}

function getLeadTopic(lead) {
  return lead.topic || lead.check_type || lead.type || 'Общий запрос'
}

function getLeadMessage(lead) {
  return lead.message || lead.comment || lead.details || 'Описание не заполнено.'
}

function getLeadId(lead) {
  return String(lead.id ?? lead.lead_id ?? lead.uuid ?? '')
}

const emptyEdit = {
  lead_source: '',
  lead_id: '',
  status: 'new',
  priority: 'normal',
  amount: '',
  responsible: '',
  next_action: '',
  next_contact_at: '',
  internal_comment: ''
}

export default function AdminCrmPage() {
  const [secret, setSecret] = useState('')
  const [source, setSource] = useState('')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [viewFilter, setViewFilter] = useState('active')
  const [leads, setLeads] = useState([])
  const [selectedLead, setSelectedLead] = useState(null)
  const [edit, setEdit] = useState(emptyEdit)
  const [metaAvailable, setMetaAvailable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [activeCrmTab, setActiveCrmTab] = useState('list')
  const [newClient, setNewClient] = useState(emptyNewClient)
  const [riskObjectsByLead, setRiskObjectsByLead] = useState({})
  const [autoLoaded, setAutoLoaded] = useState(false)

  useEffect(() => {
    setSecret(window.sessionStorage.getItem('heimdall_admin_secret') || '')
    window.localStorage.removeItem('heimdall_admin_secret')
    setSource(window.localStorage.getItem('heimdall_crm_source') || '')
  }, [])

  useEffect(() => {
    if (!secret || autoLoaded) return

    const timer = window.setTimeout(() => {
      setAutoLoaded(true)
      loadLeads()
    }, 250)

    return () => window.clearTimeout(timer)
  }, [secret, autoLoaded])

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'x-heimdall-admin-secret': secret
  }), [secret])

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const status = lead._crm?.status || 'new'
      const final = isFinalStatus(status)
      const dateState = getDateState(lead._crm?.next_contact_at)
      const priority = lead._crm?.priority || 'normal'

      if (viewFilter === 'active' && final) return false
      if (viewFilter === 'archive' && status !== 'archived') return false
      if (viewFilter === 'deleted' && status !== 'deleted') return false
      if (viewFilter === 'final' && !final) return false
      if (viewFilter === 'today' && (final || dateState !== 'today')) return false
      if (viewFilter === 'overdue' && (final || dateState !== 'overdue')) return false
      if (viewFilter === 'urgent' && (final || priority !== 'urgent')) return false
      if (statusFilter !== 'all' && status !== statusFilter) return false

      return true
    })
  }, [leads, statusFilter, viewFilter])

  const stats = useMemo(() => {
    const result = {
      all: leads.length,
      new: 0,
      inWork: 0,
      money: 0,
      closed: 0,
      archived: 0,
      deleted: 0,
      today: 0,
      overdue: 0,
      urgent: 0
    }

    for (const lead of leads) {
      const status = lead._crm?.status || 'new'
      if (status === 'new') result.new += 1
      if (['contact', 'call', 'proposal', 'contract', 'invoice', 'paid', 'in_work', 'report_ready', 'support'].includes(status)) result.inWork += 1
      if (['proposal', 'contract', 'invoice', 'paid'].includes(status)) result.money += 1
      if (['closed', 'lost'].includes(status)) result.closed += 1
      if (status === 'archived') result.archived += 1
      if (status === 'deleted') result.deleted += 1
      if (!isFinalStatus(status) && getDateState(lead._crm?.next_contact_at) === 'today') result.today += 1
      if (!isFinalStatus(status) && getDateState(lead._crm?.next_contact_at) === 'overdue') result.overdue += 1
      if (!isFinalStatus(status) && (lead._crm?.priority || 'normal') === 'urgent') result.urgent += 1
    }

    return result
  }, [leads])

  function saveSecret() {
    window.sessionStorage.setItem('heimdall_admin_secret', secret)
    window.localStorage.removeItem('heimdall_admin_secret')
    window.localStorage.setItem('heimdall_crm_source', source)
    setMessage('Админ-ключ сохранен до закрытия вкладки. Источник заявок сохранен в этом браузере.')
    setError('')
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
      const details = result.sqlNeeded
        ? ' Нужно выполнить SQL-файл supabase/heimdall_crm_schema.sql один раз в Supabase.'
        : ''
      throw new Error((result.error || 'Запрос не выполнен') + details)
    }

    return result
  }

  async function loadLeads(event) {
    if (event) event.preventDefault()

    if (!secret) {
      setError('Сначала укажи HEIMDALL_ADMIN_SECRET')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const params = new URLSearchParams()
      if (source) params.set('source', source)
      if (query) params.set('q', query)
      params.set('limit', '200')

      const result = await apiRequest(`/api/admin-crm?${params.toString()}`)
      setLeads(result.leads || [])
      setMetaAvailable(result.metaAvailable !== false)
      setMessage(`Заявки загружены: ${result.leads?.length || 0}. Источник: ${result.sourceTable}.`)
      if (result.metaAvailable === false) {
        setError('CRM-статусы пока не сохраняются: нужно один раз применить SQL-файл supabase/heimdall_crm_schema.sql в Supabase.')
      }
    } catch (error) {
      setError(error.message || 'Не удалось загрузить заявки')
      setLeads([])
    }

    setLoading(false)
  }

  function selectLead(lead) {
    const crm = lead._crm || {}
    setSelectedLead(lead)
    setEdit({
      lead_source: crm.lead_source || source || 'heimdall_leads',
      lead_id: crm.lead_id || getLeadId(lead),
      status: crm.status || 'new',
      priority: crm.priority || 'normal',
      amount: crm.amount ?? '',
      responsible: crm.responsible || '',
      next_action: crm.next_action || '',
      next_contact_at: crm.next_contact_at ? String(crm.next_contact_at).slice(0, 16) : '',
      internal_comment: crm.internal_comment || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function updateEdit(key, value) {
    setEdit((current) => ({ ...current, [key]: value }))
  }

  async function persistLeadMeta(nextEdit, successMessage = 'CRM-карточка сохранена.') {
    if (!selectedLead) {
      setError('Сначала выбери заявку')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await apiRequest('/api/admin-crm', {
        method: 'PATCH',
        body: JSON.stringify(nextEdit)
      })

      const updatedMeta = result.meta
      const telegramNote = result.telegram?.ok ? ' Telegram уведомлен.' : ''
      setLeads((current) => current.map((lead) => {
        const crm = lead._crm || {}
        if (String(crm.lead_source) === String(updatedMeta.lead_source) && String(crm.lead_id) === String(updatedMeta.lead_id)) {
          return {
            ...lead,
            _crm: {
              ...crm,
              ...updatedMeta
            }
          }
        }
        return lead
      }))
      setSelectedLead((current) => current ? { ...current, _crm: { ...(current._crm || {}), ...updatedMeta } } : current)
      setEdit((current) => ({ ...current, ...updatedMeta }))
      setMetaAvailable(true)
      setMessage(`${successMessage}${telegramNote}`)
    } catch (error) {
      setError(error.message || 'Не удалось сохранить CRM-карточку')
    }

    setLoading(false)
  }

  async function saveLeadMeta(event) {
    event.preventDefault()
    await persistLeadMeta(edit)
  }

  async function quickSetStatus(status, successMessage, commentText = '') {
    const nextComment = commentText
      ? [edit.internal_comment, commentText].filter(Boolean).join('\n')
      : edit.internal_comment

    const nextEdit = {
      ...edit,
      status,
      internal_comment: nextComment,
      next_action: status === 'closed' ? '' : edit.next_action,
      next_contact_at: status === 'closed' ? '' : edit.next_contact_at
    }

    setEdit(nextEdit)
    await persistLeadMeta(nextEdit, successMessage)
  }

  function updateNewClient(key, value) {
    setNewClient((current) => ({ ...current, [key]: value }))
  }

  async function createNewClient(event) {
    event.preventDefault()

    if (!secret) {
      setError('Сначала укажи HEIMDALL_ADMIN_SECRET')
      return
    }

    const hasContact = [newClient.email, newClient.phone, newClient.contact].some((value) => String(value || '').trim())

    if (!String(newClient.name || '').trim() || !hasContact) {
      setError('Заполни имя клиента и хотя бы один контакт: email, телефон или Telegram.')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await apiRequest('/api/admin-crm', {
        method: 'POST',
        body: JSON.stringify({
          action: 'create_manual_lead',
          ...newClient
        })
      })

      const createdLead = result.lead
      if (createdLead) {
        setLeads((current) => [createdLead, ...current.filter((lead) => {
          const currentKey = `${lead._crm?.lead_source || source || 'heimdall_leads'}:${getLeadId(lead)}`
          const createdKey = `${createdLead._crm?.lead_source}:${createdLead._crm?.lead_id}`
          return currentKey !== createdKey
        })])
        selectLead(createdLead)
      }

      setNewClient(emptyNewClient)
      setActiveCrmTab('list')
      setMetaAvailable(true)
      setMessage('Клиент добавлен в CRM. Карточка создана без ручного Supabase UUID.')
    } catch (error) {
      setError(error.message || 'Не удалось добавить клиента')
    }

    setLoading(false)
  }


  async function createRiskObjectFromSelectedLead() {
    if (!selectedLead) {
      setError('Сначала выбери заявку')
      return
    }

    if (!secret) {
      setError('Сначала укажи HEIMDALL_ADMIN_SECRET')
      return
    }

    const leadId = getLeadId(selectedLead)
    if (!leadId) {
      setError('У выбранной заявки нет ID для связки с Центром риск-аналитики')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await apiRequest('/api/risk-intelligence/from-request', {
        method: 'POST',
        body: JSON.stringify({
          source_request_id: leadId,
          source_label: selectedLead._crm?.lead_source || selectedLead._source_table || source || 'CRM',
          lead: selectedLead
        })
      })

      if (result.object?.id) {
        setRiskObjectsByLead((current) => ({ ...current, [leadId]: result.object }))
        setMessage(result.created ? 'Объект проверки создан из заявки CRM.' : 'Объект проверки уже был создан ранее.')
      } else {
        setError('API не вернул объект проверки')
      }
    } catch (error) {
      setError(error.message || 'Не удалось создать объект проверки')
    }

    setLoading(false)
  }

  const selectedEmail = (() => {
    const candidates = [selectedLead?.email, selectedLead?.contact, selectedLead?.phone]
    return candidates.map((value) => String(value || '').trim()).find((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) || ''
  })()

  return (
    <>
      <Head>
        <title>HEIMDALL CRM | Закрытая панель заявок</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Закрытая CRM-панель HEIMDALL для обработки заявок и ведения продаж." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.16),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Закрытая CRM
            </div>

            <h1 className="mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">
              Заявки и продажи
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">
              Рабочая панель HEIMDALL: заявки, этапы, приоритет, следующий шаг, клиентский доступ и переход к проверкам без ручного поиска UUID.
            </p>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-[28px] border border-white/10 bg-white/[0.045] p-3 backdrop-blur-2xl">
              {[
                ['Активно', stats.inWork],
                ['Сегодня', stats.today],
                ['Просрочено', stats.overdue]
              ].map(([label, value]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (label === 'Сегодня') setViewFilter('today')
                    if (label === 'Просрочено') setViewFilter('overdue')
                    if (label === 'Активно') setViewFilter('active')
                  }}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left transition hover:bg-white/10"
                >
                  <div className="text-2xl font-semibold text-[#F7D784]">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">{label}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pb-28 sm:px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="grid gap-8">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sky-300/80">
                <ShieldCheck className="h-4 w-4" />
                Доступ
              </div>

              <label className="mt-7 block text-sm text-white/55">HEIMDALL_ADMIN_SECRET</label>
              <input
                type="password"
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
                placeholder="Админ-ключ из Vercel"
                className={`mt-3 ${inputClass()}`}
              />

              <label className="mt-5 block text-sm text-white/55">Таблица заявок</label>
              <input
                value={source}
                onChange={(event) => setSource(event.target.value)}
                placeholder="Пусто = SUPABASE_LEADS_TABLE или heimdall_leads"
                className={`mt-3 ${inputClass('font-mono text-sm')}`}
              />

              <button
                type="button"
                onClick={saveSecret}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-sky-300/20 bg-sky-300/10 px-5 py-4 font-semibold text-sky-100"
              >
                <Save className="h-4 w-4" />
                Сохранить настройки
              </button>

              <div className="mt-6 rounded-3xl border border-amber-300/15 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100/85">
                Страница закрыта ключом и не добавлена в меню. Для полной CRM-логики нужен служебный SQL-файл из патча.
              </div>

              <div className="mt-4 rounded-3xl border border-sky-300/15 bg-sky-300/10 p-5 text-sm leading-7 text-sky-100/85">
                Telegram-уведомления уходят только по важным событиям: смена этапа, срочный приоритет, сумма, следующий шаг или дата контакта. Комментарии без изменения этапа не спамят чат.
              </div>
            </div>

            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-black/20 p-2">
                <button
                  type="button"
                  onClick={() => setActiveCrmTab('list')}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeCrmTab === 'list' ? 'bg-sky-500 text-white' : 'text-white/62 hover:bg-white/10'}`}
                >
                  Заявки
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCrmTab('add')}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeCrmTab === 'add' ? 'bg-[#D6A84F] text-black' : 'text-white/62 hover:bg-white/10'}`}
                >
                  Добавить нового клиента
                </button>
              </div>

              {activeCrmTab === 'list' ? (
                <form onSubmit={loadLeads} className="mt-7">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sky-300/80">
                    <Search className="h-4 w-4" />
                    Поиск
                  </div>

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Имя, компания, контакт, тема"
                    className={`mt-6 ${inputClass()}`}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-5 py-4 font-semibold text-white disabled:opacity-60"
                  >
                    <RefreshCw className="h-4 w-4" />
                    {loading ? 'Загрузка...' : 'Загрузить заявки'}
                  </button>
                </form>
              ) : (
                <form onSubmit={createNewClient} className="mt-7">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
                    <UserRound className="h-4 w-4" />
                    Новый клиент
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    Здесь можно вручную добавить клиента или лид. Supabase UUID искать не нужно. Заполни контакт, услугу и следующий шаг.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input
                      value={newClient.name}
                      onChange={(event) => updateNewClient('name', event.target.value)}
                      placeholder="Имя клиента *"
                      className={inputClass()}
                    />
                    <input
                      value={newClient.company}
                      onChange={(event) => updateNewClient('company', event.target.value)}
                      placeholder="Компания / агентство"
                      className={inputClass()}
                    />
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(event) => updateNewClient('email', event.target.value)}
                      placeholder="Email"
                      className={inputClass()}
                    />
                    <input
                      value={newClient.phone}
                      onChange={(event) => updateNewClient('phone', event.target.value)}
                      placeholder="Телефон"
                      className={inputClass()}
                    />
                  </div>

                  <input
                    value={newClient.contact}
                    onChange={(event) => updateNewClient('contact', event.target.value)}
                    placeholder="Telegram / другой контакт"
                    className={`mt-4 ${inputClass()}`}
                  />

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <select
                      value={newClient.service}
                      onChange={(event) => updateNewClient('service', event.target.value)}
                      className={inputClass()}
                    >
                      {serviceOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                    <select
                      value={newClient.priority}
                      onChange={(event) => updateNewClient('priority', event.target.value)}
                      className={inputClass()}
                    >
                      {priorityOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>

                  <input
                    value={newClient.source}
                    onChange={(event) => updateNewClient('source', event.target.value)}
                    placeholder="Источник: Telegram / HR / Милена / канал"
                    className={`mt-4 ${inputClass()}`}
                  />

                  <input
                    value={newClient.next_action}
                    onChange={(event) => updateNewClient('next_action', event.target.value)}
                    placeholder="Следующий шаг"
                    className={`mt-4 ${inputClass()}`}
                  />

                  <textarea
                    rows={5}
                    value={newClient.comment}
                    onChange={(event) => updateNewClient('comment', event.target.value)}
                    placeholder="Комментарий: что обещали, что спросил клиент, что важно не забыть"
                    className={`mt-4 ${inputClass('resize-y leading-7')}`}
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D6A84F] px-5 py-4 font-semibold text-black disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {loading ? 'Добавляю...' : 'Добавить клиента в CRM'}
                  </button>
                </form>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['Всего', stats.all],
                ['Новые', stats.new],
                ['В работе', stats.inWork],
                ['Деньги', stats.money],
                ['Связаться сегодня', stats.today],
                ['Просрочено', stats.overdue],
                ['Срочно', stats.urgent],
                ['Закрыто', stats.closed],
                ['Архив', stats.archived],
                ['Удалено', stats.deleted]
              ].map(([label, value]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                  <div className="text-3xl font-semibold tracking-[-0.04em]">{value}</div>
                  <div className="mt-1 text-sm text-white/45">{label}</div>
                </div>
              ))}
            </div>

            {(message || error) && (
              <div className={`rounded-[30px] border p-5 text-sm leading-7 ${error ? 'border-red-300/20 bg-red-300/10 text-red-100' : 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100'}`}>
                {error || message}
              </div>
            )}
          </div>

          <div className="grid gap-8">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-amber-200/80">
                    <CalendarClock className="h-4 w-4" />
                    Напоминания
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] md:text-4xl">Кого обработать сейчас</h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Блок строится по полю “Когда вернуться”. Просроченные заявки не пропадают, пока ты не закроешь их или не перенесешь дату.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => setViewFilter('overdue')} className="rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm font-semibold text-red-100">
                    Просрочено: {stats.overdue}
                  </button>
                  <button type="button" onClick={() => setViewFilter('today')} className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-100">
                    Сегодня: {stats.today}
                  </button>
                </div>
              </div>
            </div>

            {selectedLead && (
              <form onSubmit={saveLeadMeta} className="rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-7 backdrop-blur-2xl md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
                      <BriefcaseBusiness className="h-4 w-4" />
                      Карточка заявки
                    </div>
                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                      {getLeadTitle(selectedLead)}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/58">
                      {getLeadContact(selectedLead)} · {getLeadTopic(selectedLead)}
                    </p>
                  </div>

                  <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white/55">
                    ID {getLeadId(selectedLead)}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm text-white/55">Этап</label>
                    <select value={edit.status} onChange={(event) => updateEdit('status', event.target.value)} className={inputClass()}>
                      {statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/55">Приоритет</label>
                    <select value={edit.priority} onChange={(event) => updateEdit('priority', event.target.value)} className={inputClass()}>
                      {priorityOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/55">Сумма, ₽</label>
                    <input
                      type="number"
                      min="0"
                      value={edit.amount}
                      onChange={(event) => updateEdit('amount', event.target.value)}
                      placeholder="Например: 180000"
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/55">Ответственный</label>
                    <input
                      value={edit.responsible}
                      onChange={(event) => updateEdit('responsible', event.target.value)}
                      placeholder="Кто ведет заявку"
                      className={inputClass()}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/55">Когда вернуться</label>
                    <input
                      type="datetime-local"
                      value={edit.next_contact_at}
                      onChange={(event) => updateEdit('next_contact_at', event.target.value)}
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm text-white/55">Следующий шаг</label>
                  <input
                    value={edit.next_action}
                    onChange={(event) => updateEdit('next_action', event.target.value)}
                    placeholder="Например: отправить КП, запросить ИНН, назначить созвон"
                    className={inputClass()}
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm text-white/55">Внутренний комментарий</label>
                  <textarea
                    rows={5}
                    value={edit.internal_comment}
                    onChange={(event) => updateEdit('internal_comment', event.target.value)}
                    placeholder="Внутренние заметки. Клиент это не видит."
                    className={inputClass('resize-y leading-7')}
                  />
                </div>

                <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/62">
                  <div className="font-semibold text-white">Сообщение клиента</div>
                  <div className="mt-2 whitespace-pre-wrap">{getLeadMessage(selectedLead)}</div>
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm font-semibold text-white/75">Быстрые действия</div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={loading || !metaAvailable}
                      onClick={() => quickSetStatus('closed', 'Заявка отмечена как исполненная.', 'Исполнено. Работа по заявке завершена.')}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 disabled:opacity-60"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Исполнено
                    </button>

                    <button
                      type="button"
                      disabled={loading || !metaAvailable}
                      onClick={() => quickSetStatus('lost', 'Заявка переведена в отказ.', 'Отказ. Клиент не подтвердил интерес или заявка нецелeвая.')}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-300/10 px-5 py-3 text-sm font-semibold text-red-100 disabled:opacity-60"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      В отказ
                    </button>

                    <button
                      type="button"
                      disabled={loading || !metaAvailable}
                      onClick={() => quickSetStatus('archived', 'Заявка отправлена в архив.', 'Архив. Скрыто из активной воронки.')}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/80 disabled:opacity-60"
                    >
                      В архив
                    </button>

                    <button
                      type="button"
                      disabled={loading || !metaAvailable}
                      onClick={() => {
                        if (window.confirm('Скрыть заявку из CRM? История останется в базе, но в активной воронке заявка больше не будет видна.')) {
                          quickSetStatus('deleted', 'Заявка удалена из активной CRM.', 'Удалено из CRM. Заявка скрыта из рабочих списков.')
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-100 disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" />
                      Удалить из CRM
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={loading || !metaAvailable}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-black shadow-[0_0_45px_rgba(214,168,79,0.25)] disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    Сохранить CRM-карточку
                  </button>

                  <button
                    type="button"
                    disabled={loading || !selectedLead}
                    onClick={createRiskObjectFromSelectedLead}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784] disabled:opacity-60"
                  >
                    Создать объект проверки
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {riskObjectsByLead[getLeadId(selectedLead)]?.id && (
                    <a
                      href={`/analyst/risk-intelligence/${riskObjectsByLead[getLeadId(selectedLead)].id}`}
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-7 py-4 font-semibold text-emerald-100"
                    >
                      Открыть объект проверки
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}

                  <a
                    href={`/admin-client-checks${selectedEmail ? `?email=${encodeURIComponent(selectedEmail)}` : ''}`}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-sky-300/20 bg-sky-300/10 px-7 py-4 font-semibold text-sky-100"
                  >
                    Создать клиентскую проверку
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {!metaAvailable && (
                  <div className="mt-5 rounded-3xl border border-red-300/20 bg-red-300/10 p-5 text-sm leading-7 text-red-100">
                    Сначала нужно применить SQL-файл `supabase/heimdall_crm_schema.sql`. После этого статусы и комментарии начнут сохраняться.
                  </div>
                )}
              </form>
            )}

            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-sky-300/80">
                    <Filter className="h-4 w-4" />
                    Воронка
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Список заявок</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  <select value={viewFilter} onChange={(event) => setViewFilter(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none">
                    <option value="active">Только активные</option>
                    <option value="overdue">Просрочено</option>
                    <option value="today">Связаться сегодня</option>
                    <option value="urgent">Срочные</option>
                    <option value="final">Закрытые и отказ</option>
                    <option value="archive">Архив</option>
                    <option value="deleted">Удаленные</option>
                    <option value="all">Все заявки</option>
                  </select>

                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none">
                    <option value="all">Все этапы</option>
                    {statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-7 grid gap-4">
                {filteredLeads.length === 0 ? (
                  <div className="rounded-[30px] border border-white/10 bg-black/25 p-8 text-white/58">
                    Заявок пока нет. Нажми “Загрузить заявки”.
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const crm = lead._crm || {}
                    const isSelected = selectedLead && getLeadId(selectedLead) === getLeadId(lead)

                    return (
                      <button
                        key={`${crm.lead_source}-${getLeadId(lead)}`}
                        type="button"
                        onClick={() => selectLead(lead)}
                        className={`rounded-[30px] border p-5 text-left transition ${isSelected ? 'border-[#D6A84F]/40 bg-[#D6A84F]/10' : 'border-white/10 bg-black/25 hover:border-sky-300/25'}`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/35">
                              <UserRound className="h-3.5 w-3.5" />
                              {formatDate(lead.created_at)} · ID {getLeadId(lead)}
                            </div>
                            <h4 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{getLeadTitle(lead)}</h4>
                            <p className="mt-2 text-sm text-white/55">{getLeadContact(lead)}</p>
                            <p className="mt-3 line-clamp-2 text-sm leading-7 text-white/50">{getLeadTopic(lead)} · {getLeadMessage(lead)}</p>
                          </div>

                          <div className="flex shrink-0 flex-col gap-2 text-right">
                            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-100">
                              {statusLabels[crm.status] || crm.status || 'Новая'}
                            </span>
                            <span className="rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-sm text-[#F7D784]">
                              {priorityLabels[crm.priority] || crm.priority || 'Обычный'}
                            </span>
                          </div>
                        </div>

                        {(crm.next_action || crm.amount) && (
                          <div className="mt-4 grid gap-3 text-sm text-white/55 md:grid-cols-2">
                            {crm.next_action && (
                              <div className="flex items-start gap-2">
                                <MessageSquareText className="mt-0.5 h-4 w-4 text-sky-200" />
                                {crm.next_action}
                              </div>
                            )}
                            {crm.amount ? (
                              <div className="flex items-start gap-2">
                                <FileText className="mt-0.5 h-4 w-4 text-[#F7D784]" />
                                {Number(crm.amount).toLocaleString('ru-RU')} ₽
                              </div>
                            ) : null}
                          </div>
                        )}

                        {crm.next_contact_at && (
                          <div className={`mt-3 flex items-center gap-2 text-sm ${getDateState(crm.next_contact_at) === 'overdue' ? 'text-red-100' : getDateState(crm.next_contact_at) === 'today' ? 'text-amber-100' : 'text-white/55'}`}>
                            <CalendarClock className="h-4 w-4" />
                            Вернуться: {formatDate(crm.next_contact_at)}{getDateState(crm.next_contact_at) === 'overdue' ? ' · просрочено' : getDateState(crm.next_contact_at) === 'today' ? ' · сегодня' : ''}
                          </div>
                        )}
                      </button>
                    )
                  })
                )}
              </div>
            </div>

            <div className="rounded-[34px] border border-emerald-300/15 bg-emerald-300/10 p-6 text-sm leading-7 text-emerald-100/85">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Как использовать
              </div>
              Загрузи заявки, выбери карточку, назначь этап и следующий шаг. Когда клиент оплатил или началась работа, создай объект проверки в Центре риск-аналитики или клиентскую проверку через быстрые кнопки в карточке заявки.
            </div>

            <div className="rounded-[34px] border border-amber-300/15 bg-amber-300/10 p-6 text-sm leading-7 text-amber-100/85">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <AlertTriangle className="h-4 w-4" />
                Граница v1
              </div>
              CRM v1.3 ведет заявки, этапы, быстрые закрытия и архив. Это еще не бухгалтерия, не документооборот и не файловое хранилище. Эти модули лучше добавлять отдельными патчами.
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
