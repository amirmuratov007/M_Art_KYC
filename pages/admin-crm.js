import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { Building2, CheckCircle2, ExternalLink, FileText, Plus, RefreshCw, Save, Search, ShieldCheck, Trash2, UserPlus } from 'lucide-react'

const STORAGE_KEY = 'heimdall_company_crm_v1'

const emptyCompany = {
  name: '',
  contact: '',
  source: '',
  status: 'Новая заявка',
  note: ''
}

const emptyCheck = {
  subject: '',
  type: 'Человек',
  role: '',
  status: 'Новая проверка',
  riskLevel: '',
  reportUrl: '',
  comment: ''
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function loadCompanies() {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch (_) {
    return []
  }
}

function saveCompanies(items) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function leadTitle(lead) {
  return lead.company || lead.name || lead.client || lead.email || lead.phone || 'Компания без названия'
}

function leadContact(lead) {
  return [lead.name, lead.phone, lead.email].filter(Boolean).join(' / ')
}

export default function AdminCrmPage() {
  const [companies, setCompanies] = useState([])
  const [activeId, setActiveId] = useState('')
  const [companyForm, setCompanyForm] = useState(emptyCompany)
  const [checkForm, setCheckForm] = useState(emptyCheck)
  const [query, setQuery] = useState('')
  const [secret, setSecret] = useState('')
  const [leads, setLeads] = useState([])
  const [message, setMessage] = useState('')
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [syncingCompanies, setSyncingCompanies] = useState(false)

  useEffect(() => {
    const saved = loadCompanies()
    setCompanies(saved)
    setActiveId(saved[0]?.id || '')
    setSecret(window.sessionStorage.getItem('heimdall_admin_secret') || '')
  }, [])

  useEffect(() => {
    saveCompanies(companies)
  }, [companies])

  const active = companies.find((item) => item.id === activeId) || null
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return companies
    return companies.filter((company) => {
      const haystack = [
        company.name,
        company.contact,
        company.source,
        company.status,
        company.note,
        ...(company.checks || []).flatMap((check) => [check.subject, check.type, check.role, check.status, check.riskLevel])
      ].filter(Boolean).join(' ').toLowerCase()
      return haystack.includes(needle)
    })
  }, [companies, query])

  function apiHeaders() {
    return {
      'Content-Type': 'application/json',
      ...(secret ? { 'x-heimdall-admin-secret': secret } : {})
    }
  }

  async function persistCompany(company) {
    if (!secret || !company?.id) return
    try {
      const response = await fetch('/api/company-crm', {
        method: 'POST',
        headers: apiHeaders(),
        body: JSON.stringify(company)
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Не удалось сохранить карточку на сервере')
    } catch (error) {
      setMessage(`${error.message}. Локальная копия сохранена в браузере.`)
    }
  }

  async function loadCompanyCards() {
    setSyncingCompanies(true)
    setMessage('')
    try {
      if (secret) window.sessionStorage.setItem('heimdall_admin_secret', secret)
      const response = await fetch('/api/company-crm', { headers: secret ? { 'x-heimdall-admin-secret': secret } : {} })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Не удалось загрузить CRM с сервера')
      const loaded = data.companies || []
      setCompanies(loaded)
      setActiveId(loaded[0]?.id || '')
      setMessage(`С серверной CRM загружено карточек: ${loaded.length}`)
    } catch (error) {
      setMessage(`${error.message}. Работаем с локальной копией в браузере.`)
    } finally {
      setSyncingCompanies(false)
    }
  }

  async function removeCompanyFromServer(id) {
    if (!secret || !id) return
    try {
      await fetch(`/api/company-crm?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: secret ? { 'x-heimdall-admin-secret': secret } : {}
      })
    } catch (_) {}
  }

  function updateCompany(id, patch) {
    setCompanies((items) => items.map((item) => {
      if (item.id !== id) return item
      const updated = { ...item, ...patch, updatedAt: new Date().toISOString() }
      persistCompany(updated)
      return updated
    }))
  }

  function createCompany(event) {
    event.preventDefault()
    if (!companyForm.name.trim()) {
      setMessage('Укажи название компании.')
      return
    }
    const item = {
      id: uid(),
      ...companyForm,
      checks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setCompanies((items) => [item, ...items])
    setActiveId(item.id)
    setCompanyForm(emptyCompany)
    persistCompany(item)
    setMessage('Карточка компании создана.')
  }

  function addCheck(event) {
    event.preventDefault()
    if (!active) return
    if (!checkForm.subject.trim()) {
      setMessage('Укажи, кого или что проверяем.')
      return
    }
    const check = { id: uid(), ...checkForm, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    updateCompany(active.id, { checks: [check, ...(active.checks || [])] })
    setCheckForm(emptyCheck)
    setMessage('Проверка добавлена в карточку компании.')
  }

  function updateCheck(checkId, patch) {
    if (!active) return
    updateCompany(active.id, {
      checks: (active.checks || []).map((check) => check.id === checkId ? { ...check, ...patch, updatedAt: new Date().toISOString() } : check)
    })
  }

  function deleteCompany(id) {
    const next = companies.filter((item) => item.id !== id)
    setCompanies(next)
    removeCompanyFromServer(id)
    if (activeId === id) setActiveId(next[0]?.id || '')
  }

  function deleteCheck(checkId) {
    if (!active) return
    updateCompany(active.id, { checks: (active.checks || []).filter((check) => check.id !== checkId) })
  }

  async function loadLeads() {
    setMessage('')
    setLoadingLeads(true)
    try {
      if (secret) window.sessionStorage.setItem('heimdall_admin_secret', secret)
      const response = await fetch('/api/admin-crm?limit=50', {
        headers: secret ? { 'x-heimdall-admin-secret': secret } : {}
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Не удалось загрузить заявки')
      setLeads(data.leads || [])
      setMessage(`Загружено заявок: ${(data.leads || []).length}`)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoadingLeads(false)
    }
  }

  function importLead(lead) {
    const item = {
      id: uid(),
      name: leadTitle(lead),
      contact: leadContact(lead),
      source: lead.source || lead.utm_source || 'Сайт',
      status: 'Новая заявка',
      note: lead.message || lead.comment || '',
      checks: [],
      lead,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setCompanies((items) => [item, ...items])
    setActiveId(item.id)
    persistCompany(item)
    setMessage('Заявка перенесена в карточку компании.')
  }

  return (
    <>
      <Head>
        <title>CRM | HEIMDALL</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        <header className="relative z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
            <HeimdallLogo />
            <div className="flex flex-wrap gap-3">
              <Link href="/analyst/risk-intelligence" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Проверка Heimdall-SA</Link>
              <button onClick={loadCompanyCards} disabled={syncingCompanies} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm disabled:opacity-60">
                {syncingCompanies ? 'Синхронизация...' : 'Синхронизировать CRM'}
              </button>
              <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Сайт</Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 py-8 xl:grid-cols-[330px_1fr]">
          <aside className="grid gap-5 xl:sticky xl:top-6 xl:h-fit">
            <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-sky-300" />
                <h1 className="text-xl font-semibold">Компании</h1>
              </div>
              <label className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                <Search className="h-4 w-4 text-white/45" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Поиск по CRM" />
              </label>
              <div className="mt-4 grid max-h-[520px] gap-2 overflow-auto pr-1">
                {filtered.map((company) => (
                  <button key={company.id} onClick={() => setActiveId(company.id)} className={`rounded-2xl border p-4 text-left transition ${company.id === activeId ? 'border-sky-300/45 bg-sky-300/10' : 'border-white/10 bg-black/20 hover:bg-white/7'}`}>
                    <div className="font-semibold">{company.name}</div>
                    <div className="mt-2 text-xs text-white/45">{company.status} · {(company.checks || []).length} проверок</div>
                  </button>
                ))}
                {!filtered.length && <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/45">Карточек пока нет.</div>}
              </div>
            </section>

            <form onSubmit={createCompany} className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
              <h2 className="font-semibold">Новая карточка</h2>
              <div className="mt-4 grid gap-3">
                <input value={companyForm.name} onChange={(event) => setCompanyForm({ ...companyForm, name: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none focus:border-sky-300/50" placeholder="Компания-заказчик" />
                <input value={companyForm.contact} onChange={(event) => setCompanyForm({ ...companyForm, contact: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none focus:border-sky-300/50" placeholder="Контакт, телефон, email" />
                <input value={companyForm.source} onChange={(event) => setCompanyForm({ ...companyForm, source: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none focus:border-sky-300/50" placeholder="Источник заявки" />
                <textarea value={companyForm.note} onChange={(event) => setCompanyForm({ ...companyForm, note: event.target.value })} className="min-h-24 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none focus:border-sky-300/50" placeholder="Кратко о задаче" />
                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-black"><Plus className="h-4 w-4" />Создать</button>
              </div>
            </form>
          </aside>

          <section className="grid gap-6">
            {message && (
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm text-white/70">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {message}
              </div>
            )}

            <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">CRM по компаниям</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{active ? active.name : 'Выбери или создай компанию'}</h2>
                  {active && <p className="mt-3 text-sm leading-7 text-white/55">{active.contact || 'Контакт не указан'}</p>}
                </div>
                {active && (
                  <button onClick={() => deleteCompany(active.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-300/25 bg-red-300/10 px-4 py-3 text-sm text-red-100">
                    <Trash2 className="h-4 w-4" />
                    Удалить карточку
                  </button>
                )}
              </div>

              {active && (
                <div className="mt-6 grid gap-4 lg:grid-cols-3">
                  <label className="grid gap-2">
                    <span className="text-xs uppercase tracking-[0.16em] text-white/38">Статус</span>
                    <select value={active.status} onChange={(event) => updateCompany(active.id, { status: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none">
                      {['Новая заявка', 'В работе', 'Ждем данные', 'Отчет готов', 'Закрыто'].map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs uppercase tracking-[0.16em] text-white/38">Источник</span>
                    <input value={active.source || ''} onChange={(event) => updateCompany(active.id, { source: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-xs uppercase tracking-[0.16em] text-white/38">Контакт</span>
                    <input value={active.contact || ''} onChange={(event) => updateCompany(active.id, { contact: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" />
                  </label>
                  <label className="grid gap-2 lg:col-span-3">
                    <span className="text-xs uppercase tracking-[0.16em] text-white/38">Заметки по компании</span>
                    <textarea value={active.note || ''} onChange={(event) => updateCompany(active.id, { note: event.target.value })} className="min-h-28 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" />
                  </label>
                </div>
              )}
            </section>

            {active && (
              <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <UserPlus className="h-5 w-5 text-sky-300" />
                  <h2 className="text-xl font-semibold">Проверяемые люди и контрагенты</h2>
                </div>
                <form onSubmit={addCheck} className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_160px_1fr_auto]">
                  <input value={checkForm.subject} onChange={(event) => setCheckForm({ ...checkForm, subject: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" placeholder="ФИО, ИНН, компания, объект" />
                  <select value={checkForm.type} onChange={(event) => setCheckForm({ ...checkForm, type: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none">
                    {['Человек', 'Контрагент', 'Кандидат', 'Собственник', 'Поставщик', 'Другое'].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <input value={checkForm.role} onChange={(event) => setCheckForm({ ...checkForm, role: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" placeholder="Роль: директор, няня, подрядчик" />
                  <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-3 text-sm font-semibold text-black"><Plus className="h-4 w-4" />Добавить</button>
                </form>

                <div className="mt-6 grid gap-3">
                  {(active.checks || []).map((check) => (
                    <div key={check.id} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                      <div className="grid gap-3 lg:grid-cols-[1.2fr_150px_150px_160px_auto]">
                        <input value={check.subject} onChange={(event) => updateCheck(check.id, { subject: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" />
                        <select value={check.status} onChange={(event) => updateCheck(check.id, { status: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none">
                          {['Новая проверка', 'Собираем данные', 'На анализе', 'Справка готова', 'Закрыто'].map((item) => <option key={item}>{item}</option>)}
                        </select>
                        <input value={check.riskLevel || ''} onChange={(event) => updateCheck(check.id, { riskLevel: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" placeholder="Риск" />
                        <Link href={`/analyst/risk-intelligence?subject=${encodeURIComponent(check.subject)}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-300/25 bg-sky-300/10 px-4 py-3 text-sm font-semibold text-sky-100">
                          <ShieldCheck className="h-4 w-4" />
                          Проверить
                        </Link>
                        <button onClick={() => deleteCheck(check.id)} className="inline-flex items-center justify-center rounded-xl border border-red-300/25 bg-red-300/10 px-4 py-3 text-red-100" type="button"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr]">
                        <input value={check.reportUrl || ''} onChange={(event) => updateCheck(check.id, { reportUrl: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" placeholder="Ссылка на справку" />
                        <input value={check.comment || ''} onChange={(event) => updateCheck(check.id, { comment: event.target.value })} className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" placeholder="Комментарий" />
                      </div>
                      {check.reportUrl && <a href={check.reportUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-sky-200"><FileText className="h-4 w-4" />Открыть справку <ExternalLink className="h-3 w-3" /></a>}
                    </div>
                  ))}
                  {!active.checks?.length && <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-white/45">В этой компании еще нет проверяемых объектов.</div>}
                </div>
              </section>
            )}

            <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Импорт заявок с сайта</h2>
                  <p className="mt-2 text-sm text-white/50">Заявку можно перенести в отдельную карточку компании и дальше вести проверки внутри нее.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <input value={secret} onChange={(event) => setSecret(event.target.value)} type="password" className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm outline-none" placeholder="HEIMDALL_ADMIN_SECRET" />
                  <button onClick={loadLeads} disabled={loadingLeads} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold disabled:opacity-60">
                    {loadingLeads ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Загрузить
                  </button>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {leads.map((lead, index) => (
                  <div key={lead.id || index} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div>
                      <div className="font-semibold">{leadTitle(lead)}</div>
                      <div className="mt-1 text-xs text-white/45">{leadContact(lead) || 'Контакт не указан'}</div>
                    </div>
                    <button onClick={() => importLead(lead)} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold">
                      <Save className="h-4 w-4" />
                      В карточку
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>
      </main>
    </>
  )
}
