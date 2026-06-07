import { useState } from 'react'
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react'

const topicsRu = [
  'Проверка контрагента перед сделкой',
  'Проверка поставщика перед авансом',
  'Проверка кандидата на чувствительную роль',
  'Проверка бенефициаров и скрытых связей',
  'Due Diligence / инвестиционная проверка',
  'Постоянное сопровождение бизнеса',
  'Служба безопасности на аутсорсе'
]

const topicsEn = [
  'Counterparty review before a deal',
  'Supplier review before advance payment',
  'Executive or sensitive role screening',
  'Beneficial ownership and hidden links',
  'Due diligence / investment review',
  'Ongoing business risk support',
  'Outsourced security department'
]

export default function HeimdallConversionPanel({ language = 'ru' }) {
  const ru = language === 'ru'
  const topics = ru ? topicsRu : topicsEn
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    name: '',
    company: '',
    contact: '',
    topic: topics[0],
    message: ''
  })

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          language,
          source: 'homepage_conversion_panel',
          message: form.message || (ru
            ? 'Прошу предложить формат проверки и следующий шаг.'
            : 'Please suggest the review scope and next step.')
        })
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || data.ok === false) {
        throw new Error(data.error || 'Request failed')
      }

      setStatus('success')
      setForm({
        name: '',
        company: '',
        contact: '',
        topic: topics[0],
        message: ''
      })
    } catch (error) {
      setErrorMessage(error.message || 'Request failed')
      setStatus('error')
    }
  }

  return (
    <section id="lead" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-4 pb-16 sm:px-5 sm:pb-24">
      <div className="grid gap-8 rounded-[38px] border border-[#D6A84F]/25 bg-[radial-gradient(circle_at_18%_10%,rgba(214,168,79,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 backdrop-blur-2xl sm:rounded-[48px] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div className="flex flex-col justify-between rounded-[30px] border border-white/10 bg-black/25 p-6 sm:rounded-[38px] sm:p-8">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#F7D784] sm:text-sm">
              <Sparkles className="h-4 w-4" /> {ru ? 'Быстрый старт' : 'Fast start'}
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-5xl md:text-6xl">
              {ru ? 'Получите формат проверки под вашу ситуацию' : 'Get the right review scope for your situation'}
            </h2>
            <p className="mt-6 text-base leading-8 text-white/64 sm:text-lg">
              {ru
                ? 'Не нужно готовить техническое задание. Напишите, кого нужно проверить и какой риск вы хотите закрыть. Мы ответим с понятным следующим шагом.'
                : 'No formal brief is required. Tell us who needs to be reviewed and what risk you want to reduce. We will reply with a clear next step.'}
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            {(ru ? [
              'Можно отправить только название компании, сайт, ИНН, профиль или имя',
              'Заявка уйдет в Telegram и сохранится в рабочей базе',
              'Подходит для сделки, аванса, найма, закупки и партнерства'
            ] : [
              'A company name, website, profile or person name is enough',
              'The request goes to Telegram and is saved in the working database',
              'Useful before deals, payments, hiring, procurement and partnerships'
            ]).map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-4 text-sm leading-6 text-white/70">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F7D784]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[30px] border border-white/10 bg-[#07101f]/90 p-5 shadow-2xl sm:rounded-[38px] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">{ru ? 'Заявка' : 'Request'}</div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                {ru ? 'Опишите объект проверки' : 'Describe the review object'}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs text-emerald-100">
              <LockKeyhole className="h-4 w-4" /> {ru ? 'Конфиденциально' : 'Confidential'}
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder={ru ? 'Ваше имя' : 'Your name'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
            <input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder={ru ? 'Компания' : 'Company'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
          </div>

          <div className="mt-4 grid gap-4">
            <input required value={form.contact} onChange={(e) => update('contact', e.target.value)} placeholder={ru ? 'Телефон, Telegram или email' : 'Phone, Telegram or email'} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
            <select value={form.topic} onChange={(e) => update('topic', e.target.value)} className="rounded-2xl border border-white/10 bg-[#050816] px-5 py-4 text-white outline-none focus:border-sky-300/40">
              {topics.map((topic) => <option key={topic}>{topic}</option>)}
            </select>
            <textarea value={form.message} onChange={(e) => update('message', e.target.value)} placeholder={ru ? 'Кого проверить и перед каким решением? Например: поставщик из Китая перед авансом, кандидат в закупки, партнер перед сделкой.' : 'Who should be reviewed and before what decision? Example: supplier before payment, procurement candidate, partner before a deal.'} className="min-h-32 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
          </div>

          <button type="submit" disabled={status === 'loading'} className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816] shadow-[0_0_45px_rgba(214,168,79,0.24)] disabled:opacity-60">
            {status === 'loading' ? (ru ? 'Отправляем...' : 'Sending...') : (ru ? 'Получить следующий шаг' : 'Get next step')}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-4 flex items-start gap-3 text-xs leading-6 text-white/45">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-300/70" />
            <span>
              {ru
                ? 'Нажимая кнопку, вы соглашаетесь с обработкой персональных данных и принимаете политику конфиденциальности. Форма использует существующий рабочий API HEIMDALL.'
                : 'By clicking the button, you agree to personal data processing and accept the privacy policy. This form uses the existing HEIMDALL API.'}
            </span>
          </div>

          {status === 'success' && (
            <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm leading-6 text-emerald-100">
              {ru ? 'Заявка отправлена. Мы свяжемся с вами.' : 'Request sent. We will contact you.'}
            </div>
          )}

          {status === 'error' && (
            <div className="mt-5 rounded-2xl border border-red-300/20 bg-red-300/10 p-4 text-sm leading-6 text-red-100">
              {ru ? 'Не удалось отправить заявку: ' : 'Could not send request: '}{errorMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
