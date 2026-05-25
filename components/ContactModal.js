import { useEffect, useState } from 'react'
import { X, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ContactModal({ open, onClose, language = 'ru', defaultTopic }) {
  const ru = language === 'ru'
  const fallbackTopic = ru ? 'Общий запрос' : 'General request'
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    name: '',
    company: '',
    contact: '',
    topic: defaultTopic || fallbackTopic,
    message: ''
  })

  useEffect(() => {
    if (!open) return
    setStatus('idle')
    setForm((current) => ({
      ...current,
      topic: defaultTopic || fallbackTopic
    }))
  }, [open, defaultTopic, fallbackTopic])

  if (!open) return null

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language, source: 'contact_modal' })
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok || data.ok === false) throw new Error('Request failed')

      setStatus('success')
      setForm({
        name: '',
        company: '',
        contact: '',
        topic: defaultTopic || fallbackTopic,
        message: ''
      })
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-xl">
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[34px] border border-white/10 bg-[#07101f] p-6 shadow-2xl md:p-8">
        <button type="button" onClick={onClose} className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="pr-12">
          <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{ru ? 'Связаться' : 'Contact'}</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{ru ? 'Оставить заявку HEIMDALL' : 'Send a HEIMDALL request'}</h2>
          <p className="mt-4 text-sm leading-7 text-white/60">
            {ru ? 'Заполните форму. Заявка уйдёт в рабочий канал и сохранится в базе заявок.' : 'Fill in the form. The request will be sent to the working channel and saved.'}
          </p>
        </div>

        <form onSubmit={submit} className="mt-7 grid gap-4">
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder={ru ? 'Ваше имя' : 'Your name'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
          <input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder={ru ? 'Компания' : 'Company'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
          <input required value={form.contact} onChange={(e) => update('contact', e.target.value)} placeholder={ru ? 'Телефон, Telegram или email' : 'Phone, Telegram or email'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />

          <select value={form.topic} onChange={(e) => update('topic', e.target.value)} className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 text-white outline-none focus:border-sky-300/40">
            {ru ? (
              <>
                <option>Проверка контрагента</option>
                <option>Проверка кандидата</option>
                <option>Проверка бенефициаров</option>
                <option>AML / KYC</option>
                <option>Due Diligence</option>
                <option>Комплексное сопровождение</option>
                <option>Клиентское приложение</option>
                <option>Общий запрос</option>
              </>
            ) : (
              <>
                <option>Counterparty intelligence</option>
                <option>Candidate screening</option>
                <option>Beneficial ownership review</option>
                <option>AML / KYC</option>
                <option>Due Diligence</option>
                <option>Business support</option>
                <option>Client application</option>
                <option>General request</option>
              </>
            )}
          </select>

          <textarea value={form.message} onChange={(e) => update('message', e.target.value)} placeholder={ru ? 'Коротко опишите задачу' : 'Briefly describe the task'} className="min-h-32 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />

          <button type="submit" disabled={status === 'loading'} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)] disabled:opacity-60">
            {status === 'loading' ? (ru ? 'Отправляем...' : 'Sending...') : (ru ? 'Отправить заявку' : 'Send request')}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

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
      </div>
    </div>
  )
}
