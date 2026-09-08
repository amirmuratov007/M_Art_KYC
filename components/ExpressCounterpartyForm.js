import { useRef, useState } from 'react'
import { ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react'
import { trackConversion } from '@/lib/conversionAnalytics'

const initialForm = {
  name: '',
  company: '',
  contact: '',
  message: '',
  website: ''
}

function readCampaignSource() {
  if (typeof window === 'undefined') return 'site'
  const params = new URLSearchParams(window.location.search)
  const value = params.get('utm_source') || params.get('source') || 'site'
  return value.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80) || 'site'
}

export default function ExpressCounterpartyForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const formOpenTracked = useRef(false)

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const trackFormOpen = () => {
    if (formOpenTracked.current) return
    formOpenTracked.current = true
    trackConversion('lead_form_open')
  }

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setError('')
    trackConversion('lead_form_submit')

    try {
      const response = await fetch('/api/contact-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          contact: form.contact,
          topic: 'Экспресс-проверка контрагента за один рабочий день',
          message: [
            `Объект проверки: ${form.company}`,
            form.message ? `Решение или риск: ${form.message}` : 'Решение или риск: не указан',
            `Источник: ${readCampaignSource()}`
          ].join('\n'),
          language: 'ru',
          source: 'express_counterparty_page',
          website: form.website
        })
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok || payload.ok === false) throw new Error(payload.error || 'Не удалось отправить заявку')

      trackConversion('lead_submit_success')
      setStatus('success')
      setForm(initialForm)
    } catch (submitError) {
      trackConversion('lead_submit_error')
      setError(submitError.message || 'Не удалось отправить заявку')
      setStatus('error')
    }
  }

  return (
    <form id="express-check" onSubmit={submit} onFocus={trackFormOpen} className="scroll-mt-28 border border-[#D6A84F]/25 bg-[#07101f] p-5 shadow-2xl sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]">Заявка на экспресс-проверку</div>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Пришлите ИНН, название или сайт</h2>
        </div>
        <div className="inline-flex items-center gap-2 border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-100">
          <LockKeyhole className="h-4 w-4" /> Конфиденциально
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/60">До начала работы согласуем достаточность данных, точный состав проверки и срок.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/68">
          Ваше имя
          <input required autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} className="border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none focus:border-sky-300/45" />
        </label>
        <label className="grid gap-2 text-sm text-white/68">
          Телефон, Telegram или почта
          <input required autoComplete="email" value={form.contact} onChange={(event) => update('contact', event.target.value)} className="border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none focus:border-sky-300/45" />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm text-white/68">
        Объект проверки
        <input required value={form.company} onChange={(event) => update('company', event.target.value)} placeholder="ИНН, название компании или адрес сайта" className="border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none placeholder:text-white/32 focus:border-sky-300/45" />
      </label>

      <label className="mt-4 grid gap-2 text-sm text-white/68">
        Перед каким решением проверяем
        <textarea value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="Например: аванс 2 млн рублей, новый поставщик, отсрочка платежа" className="min-h-24 border border-white/10 bg-black/25 px-4 py-3.5 text-white outline-none placeholder:text-white/32 focus:border-sky-300/45" />
      </label>

      <input tabIndex="-1" autoComplete="off" value={form.website} onChange={(event) => update('website', event.target.value)} className="hidden" aria-hidden="true" />

      <button type="submit" disabled={status === 'loading'} className="mt-5 inline-flex w-full items-center justify-center gap-3 bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816] disabled:opacity-60">
        {status === 'loading' ? 'Отправляем...' : 'Запросить экспресс-проверку'}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-4 text-xs leading-6 text-white/42">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и политикой конфиденциальности. Сообщение не создает обязательства по оплате.</p>

      {status === 'success' && (
        <div className="mt-5 flex items-start gap-3 border border-emerald-300/25 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          Заявка получена. Мы проверим исходные данные и свяжемся с вами для подтверждения задачи.
        </div>
      )}
      {status === 'error' && <div className="mt-5 border border-red-300/25 bg-red-300/10 p-4 text-sm text-red-100">{error}</div>}
    </form>
  )
}
