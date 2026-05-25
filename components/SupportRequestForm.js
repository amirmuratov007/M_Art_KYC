import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function SupportRequestForm({ language = 'ru' }) {
  const ru = language === 'ru'
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    name: '',
    company: '',
    contact: '',
    packageType: ru ? 'Расширенное сопровождение' : 'Enhanced Business Support',
    message: ''
  })

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/support-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language })
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok || data.ok === false) throw new Error('Request failed')

      setStatus('success')
      setForm({
        name: '',
        company: '',
        contact: '',
        packageType: ru ? 'Расширенное сопровождение' : 'Enhanced Business Support',
        message: ''
      })
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[42px] border border-sky-300/20 bg-white/[0.055] p-6 backdrop-blur-2xl md:p-8">
      <div className="mb-7">
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
          {ru ? 'Заявка' : 'Request'}
        </div>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
          {ru ? 'Оставить заявку на сопровождение' : 'Request business support'}
        </h3>
        <p className="mt-4 text-sm leading-7 text-white/60">
          {ru ? 'Заполните короткую форму. Заявка поступит в рабочий канал и сохранится в базе.' : 'Fill in a short form. The request will be sent to the working channel and saved.'}
        </p>
      </div>

      <div className="grid gap-4">
        <input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder={ru ? 'Ваше имя' : 'Your name'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
        <input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder={ru ? 'Компания' : 'Company'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
        <input required value={form.contact} onChange={(e) => update('contact', e.target.value)} placeholder={ru ? 'Телефон, Telegram или email' : 'Phone, Telegram or email'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />

        <select value={form.packageType} onChange={(e) => update('packageType', e.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] px-5 py-4 text-white outline-none focus:border-sky-300/40">
          {ru ? (
            <>
              <option>Базовое сопровождение</option>
              <option>Расширенное сопровождение</option>
              <option>Стратегическое сопровождение</option>
              <option>Нужно обсудить формат</option>
            </>
          ) : (
            <>
              <option>Essential Business Support</option>
              <option>Enhanced Business Support</option>
              <option>Strategic Intelligence Support</option>
              <option>Need to discuss format</option>
            </>
          )}
        </select>

        <textarea value={form.message} onChange={(e) => update('message', e.target.value)} placeholder={ru ? 'Что нужно сопровождать? Контрагенты, кандидаты, поставщики, сделки, бенефициары...' : 'What should be covered? Counterparties, candidates, suppliers, transactions, beneficial owners...'} className="min-h-36 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
      </div>

      <button type="submit" disabled={status === 'loading'} className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)] disabled:opacity-60">
        {status === 'loading' ? (ru ? 'Отправляем...' : 'Sending...') : (ru ? 'Отправить заявку' : 'Send request')}
        <ArrowRight className="h-4 w-4" />
      </button>

      {status === 'success' && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          {ru ? 'Заявка отправлена. Мы свяжемся с вами.' : 'Request sent. We will contact you.'}
        </div>
      )}

      {status === 'error' && (
        <div className="mt-5 rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
          {ru ? 'Не удалось отправить заявку. Проверьте Telegram и Supabase переменные в Vercel.' : 'Could not send request. Check Telegram and Supabase variables in Vercel.'}
        </div>
      )}
    </form>
  )
}
