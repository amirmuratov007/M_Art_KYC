import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { useHeimdallAuth } from '@/components/HeimdallAuthProvider'
import { ArrowRight, CheckCircle2, ShieldCheck, AlertTriangle, FileText, LockKeyhole, Truck, WalletCards } from 'lucide-react'

const checklist = [
  'проверить, кто выставляет счет и совпадает ли получатель денег с реальным поставщиком',
  'сравнить сайт, домен, адреса, контакты, реквизиты и переписку между собой',
  'понять, производитель перед вами, торговая прокладка или неизвестный посредник',
  'проверить регистрацию, историю, судебные и репутационные сигналы',
  'оценить условия аванса, срочность, давление, скидки и нестандартные платежные просьбы',
  'зафиксировать красные флаги до оплаты, а не после потери денег'
]

const redFlags = [
  'поставщик торопит с оплатой и давит сроками',
  'счет выставлен от другой компании или на личные/странные реквизиты',
  'документы выглядят формально, но не подтверждают реальное производство',
  'домен, почта, адрес и контакты не складываются в единую картину',
  'цена заметно ниже рынка без понятного объяснения',
  'менеджер избегает прямых вопросов о компании, фабрике, лицензиях и логистике'
]

const steps = [
  ['1. Оставьте контакт', 'Укажите, что вы планируете оплатить, какая сумма аванса, страна, товар и что уже прислал поставщик.'],
  ['2. Получите чек-лист', 'Мы пришлем структурированный список первичных проверок и покажем, на какие признаки смотреть до оплаты.'],
  ['3. При необходимости проверим поставщика', 'Если риск высокий, можно заказать полноценную проверку поставщика перед переводом денег.']
]

export default function SupplierChecklistPage() {
  const { user, refreshSession } = useHeimdallAuth()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || user?.email || '',
    company: user?.user_metadata?.company || '',
    contact: user?.email || '',
    amount: '',
    message: ''
  })

  const isAuthenticated = Boolean(user)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  async function submit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      let response

      if (isAuthenticated) {
        const currentSession = await refreshSession()
        const accessToken = currentSession?.access_token

        if (!accessToken) {
          throw new Error('Сессия истекла. Войдите в кабинет заново.')
        }

        response = await fetch('/api/client-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            service: 'Чек-лист проверки поставщика перед авансом',
            urgency: 'Обычная',
            subject: 'Лид-магнит: чек-лист проверки поставщика',
            details: `Клиент запросил чек-лист проверки поставщика перед авансом. Сумма/план оплаты: ${form.amount || 'не указано'}. Детали: ${form.message || 'не указано'}`,
            company: form.company,
            contact: form.contact || user?.email || '',
            fullName: form.name || user?.user_metadata?.full_name || user?.email || ''
          })
        })
      } else {
        response = await fetch('/api/contact-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            company: form.company,
            contact: form.contact,
            topic: 'Чек-лист проверки поставщика перед авансом',
            language: 'ru',
            source: 'supplier_checklist_lead_magnet',
            message: `Запрос чек-листа проверки поставщика перед авансом. Сумма/план оплаты: ${form.amount || 'не указано'}. Детали: ${form.message || 'не указано'}`
          })
        })
      }

      const data = await response.json().catch(() => ({}))
      if (!response.ok || data.ok === false) {
        throw new Error(data.error || 'Не удалось отправить заявку')
      }

      setStatus('success')
      setForm((current) => ({ ...current, amount: '', message: '' }))
    } catch (submitError) {
      setStatus('error')
      setError(submitError.message || 'Не удалось отправить заявку. Попробуйте еще раз.')
    }
  }

  return (
    <>
      <Head>
        <title>Чек-лист проверки поставщика перед авансом | HEIMDALL</title>
        <meta name="description" content="Получите чек-лист проверки поставщика перед авансом: документы, реквизиты, сайт, домен, красные флаги, признаки посредника и риск потери денег." />
        <link rel="canonical" href="https://www.heimdall-group.ru/supplier-checklist" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.13),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" />
              Лид-магнит HEIMDALL
            </div>

            <h1 className="mt-8 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl md:text-7xl">
              Чек-лист проверки поставщика перед авансом
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/68 md:text-xl md:leading-9">
              Перед оплатой поставщику важно проверить не только компанию, но и реквизиты, документы, сайт, контактных лиц, давление по срокам и признаки посредника. Чек-лист поможет увидеть красные флаги до перевода денег.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#get-checklist" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                Получить чек-лист
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/china-supplier-verification" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Проверка поставщика из Китая
              </Link>
            </div>
          </div>

          <form id="get-checklist" onSubmit={submit} className="rounded-[36px] border border-white/10 bg-white/[0.055] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl md:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-3 text-[#F7D784]">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">Получить чек-лист</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">Оставьте контакт. Если вы уже вошли в кабинет, заявка уйдет как запрос авторизованного клиента.</p>
              </div>
            </div>

            <div className="mt-7 grid gap-4">
              {!isAuthenticated && (
                <>
                  <input value={form.name} onChange={(e) => update('name', e.target.value)} required className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder="Имя" />
                  <input value={form.contact} onChange={(e) => update('contact', e.target.value)} required className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder="Телефон, email или Telegram" />
                </>
              )}

              {isAuthenticated && (
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm leading-6 text-emerald-100">
                  Вы вошли как {user?.email}. Контакт повторно вводить не нужно.
                </div>
              )}

              <input value={form.company} onChange={(e) => update('company', e.target.value)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder="Компания, если есть" />
              <input value={form.amount} onChange={(e) => update('amount', e.target.value)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder="Сумма аванса или план оплаты" />
              <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={4} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder="Коротко опишите поставщика, страну, товар и что уже вызывает сомнения" />

              <button disabled={status === 'loading'} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#06101e] transition hover:bg-[#F7D784] disabled:cursor-not-allowed disabled:opacity-60">
                {status === 'loading' ? 'Отправляем...' : 'Получить чек-лист'}
                <ArrowRight className="h-4 w-4" />
              </button>

              {status === 'success' && <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm text-emerald-100">Заявка отправлена. Мы свяжемся с вами и передадим чек-лист.</div>}
              {status === 'error' && <div className="rounded-2xl border border-red-300/20 bg-red-300/[0.08] px-4 py-3 text-sm text-red-100">{error}</div>}
            </div>
          </form>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-5">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl">
              <AlertTriangle className="h-8 w-8 text-[#F7D784]" />
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Когда чек-лист нужен срочно</h2>
              <div className="mt-8 grid gap-3">
                {redFlags.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/72">{item}</div>
                ))}
              </div>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <Truck className="h-8 w-8 text-sky-200" />
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">Что внутри чек-листа</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {checklist.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/72">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <LockKeyhole className="h-7 w-7 text-[#F7D784]" />
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="grid gap-6 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/55">
                <WalletCards className="h-4 w-4" />
                Перед оплатой
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] md:text-6xl">Если сумма существенная, одного чек-листа мало</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">Для аванса, первой поставки, OEM-производства или работы через посредника лучше заказать полноценную проверку поставщика до перевода денег.</p>
            </div>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
              Посмотреть прайс
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
