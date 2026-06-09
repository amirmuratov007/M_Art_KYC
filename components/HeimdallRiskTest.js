import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useHeimdallAuth } from '@/components/HeimdallAuthProvider'
import { ArrowRight, AlertTriangle, CheckCircle2, Gauge, ShieldCheck, Sparkles } from 'lucide-react'

const ruQuestions = [
  {
    id: 'advance',
    text: 'Контрагент просит аванс или оплату до результата?',
    answers: [
      ['Нет, оплата после понятного этапа', 0],
      ['Да, частичный аванс', 9],
      ['Да, существенный аванс или полная предоплата', 17]
    ]
  },
  {
    id: 'pressure',
    text: 'Вас торопят с оплатой, подписанием или переводом денег?',
    answers: [
      ['Нет, сроки обычные', 0],
      ['Есть мягкое давление', 8],
      ['Сильно давят и обещают потерю условий', 16]
    ]
  },
  {
    id: 'requisites',
    text: 'Реквизиты, договор и переписка относятся к одной и той же компании?',
    answers: [
      ['Да, все совпадает', 0],
      ['Есть мелкие расхождения', 10],
      ['Счет/договор/контакт от разных лиц или компаний', 22]
    ]
  },
  {
    id: 'identity',
    text: 'Понятно, кто подписывает документы и имеет ли он полномочия?',
    answers: [
      ['Да, полномочия понятны', 0],
      ['Пока не проверяли', 8],
      ['Подписант непонятен или избегает подтверждений', 16]
    ]
  },
  {
    id: 'digital',
    text: 'Есть нормальный сайт, корпоративная почта и проверяемые контакты?',
    answers: [
      ['Да, цифровой контур выглядит цельно', 0],
      ['Есть только часть признаков', 7],
      ['Только мессенджер, личная почта или новый домен', 15]
    ]
  },
  {
    id: 'documents',
    text: 'Контрагент спокойно дает документы, подтверждения и отвечает на вопросы?',
    answers: [
      ['Да, отвечает нормально', 0],
      ['Отвечает выборочно', 8],
      ['Уходит от вопросов или присылает формальные документы', 16]
    ]
  },
  {
    id: 'price',
    text: 'Цена, условия или скорость сделки выглядят слишком выгодными?',
    answers: [
      ['Нет, условия рыночные', 0],
      ['Есть заметная выгода без полного объяснения', 7],
      ['Цена сильно ниже рынка или условия слишком хорошие', 14]
    ]
  },
  {
    id: 'history',
    text: 'Есть понятная история работ, поставок, репутации или рекомендаций?',
    answers: [
      ['Да, история понятна', 0],
      ['История частично подтверждена', 7],
      ['Истории почти нет или она не проверяется', 14]
    ]
  },
  {
    id: 'amount',
    text: 'Сумма сделки существенная для вашего бизнеса?',
    answers: [
      ['Нет, сумма некритичная', 0],
      ['Да, заметная сумма', 7],
      ['Да, ошибка будет болезненной', 14]
    ]
  },
  {
    id: 'inside',
    text: 'Кто-то внутри компании уже проверил сделку по регламенту?',
    answers: [
      ['Да, есть понятная проверка', 0],
      ['Проверили поверхностно', 7],
      ['Нет, решение принимается по переписке и обещаниям', 15]
    ]
  }
]

const enQuestions = [
  {
    id: 'advance',
    text: 'Does the counterparty ask for advance payment before a clear milestone?',
    answers: [
      ['No, payment is tied to a clear stage', 0],
      ['Yes, partial advance payment', 9],
      ['Yes, large advance or full prepayment', 17]
    ]
  },
  {
    id: 'pressure',
    text: 'Are you being pushed to pay, sign or transfer money quickly?',
    answers: [
      ['No, timing is normal', 0],
      ['There is some pressure', 8],
      ['Strong pressure and fear of losing terms', 16]
    ]
  },
  {
    id: 'requisites',
    text: 'Do the bank details, contract and communication belong to the same company?',
    answers: [
      ['Yes, everything matches', 0],
      ['There are minor inconsistencies', 10],
      ['Invoice, contract or contact comes from different entities', 22]
    ]
  },
  {
    id: 'identity',
    text: 'Is it clear who signs the documents and whether they are authorized?',
    answers: [
      ['Yes, authority is clear', 0],
      ['Not checked yet', 8],
      ['Signer is unclear or avoids confirmation', 16]
    ]
  },
  {
    id: 'digital',
    text: 'Is there a credible website, corporate email and verifiable contact pattern?',
    answers: [
      ['Yes, the digital footprint looks consistent', 0],
      ['Only some indicators are present', 7],
      ['Only messenger, personal email or a new domain', 15]
    ]
  },
  {
    id: 'documents',
    text: 'Does the counterparty provide documents and answer questions calmly?',
    answers: [
      ['Yes, they respond normally', 0],
      ['They answer selectively', 8],
      ['They avoid questions or provide formal documents only', 16]
    ]
  },
  {
    id: 'price',
    text: 'Do the price, terms or speed look too favorable?',
    answers: [
      ['No, terms look market-level', 0],
      ['There is visible upside without full explanation', 7],
      ['Price is far below market or terms are too good', 14]
    ]
  },
  {
    id: 'history',
    text: 'Is there a verifiable history of work, supply, reputation or references?',
    answers: [
      ['Yes, history is clear', 0],
      ['History is partly confirmed', 7],
      ['There is little or no verifiable history', 14]
    ]
  },
  {
    id: 'amount',
    text: 'Is the deal amount material for your business?',
    answers: [
      ['No, the amount is not critical', 0],
      ['Yes, the amount is meaningful', 7],
      ['Yes, a mistake would be painful', 14]
    ]
  },
  {
    id: 'inside',
    text: 'Has anyone inside your company checked the deal under a clear procedure?',
    answers: [
      ['Yes, there is a clear review', 0],
      ['Only a surface check was made', 7],
      ['No, decision is based on messages and promises', 15]
    ]
  }
]

function getRiskLevel(score, ru) {
  if (score >= 86) {
    return {
      label: ru ? 'Критический риск' : 'Critical risk',
      tone: 'border-red-300/35 bg-red-300/10 text-red-100',
      cta: ru ? 'Не переводите деньги без ручной проверки.' : 'Do not transfer funds without manual review.',
      description: ru
        ? 'В ответах есть набор сильных красных флагов. Нужна ручная проверка компании, реквизитов, полномочий, владельцев, цифрового следа и истории сделки.'
        : 'The answers contain several strong red flags. Manual review of the company, payment details, authority, ownership, digital footprint and transaction history is recommended.'
    }
  }

  if (score >= 58) {
    return {
      label: ru ? 'Высокий риск' : 'High risk',
      tone: 'border-orange-300/35 bg-orange-300/10 text-orange-100',
      cta: ru ? 'Перед оплатой лучше заказать проверку HEIMDALL.' : 'A HEIMDALL review is recommended before payment.',
      description: ru
        ? 'Сделка не выглядит безопасной по быстрым признакам. Стоит проверить контрагента, документы и связанных лиц до подписания или аванса.'
        : 'The deal does not look safe based on quick indicators. Counterparty, documents and connected parties should be reviewed before signing or prepayment.'
    }
  }

  if (score >= 30) {
    return {
      label: ru ? 'Умеренный риск' : 'Moderate risk',
      tone: 'border-[#D6A84F]/35 bg-[#D6A84F]/10 text-[#F7D784]',
      cta: ru ? 'Проверьте спорные места до принятия решения.' : 'Review the questionable points before deciding.',
      description: ru
        ? 'Критических сигналов может не быть, но есть неопределенность. Минимум стоит проверить реквизиты, полномочия и историю контрагента.'
        : 'There may be no critical signal, but uncertainty remains. At minimum, payment details, authority and history should be checked.'
    }
  }

  return {
    label: ru ? 'Низкий быстрый риск' : 'Low quick risk',
    tone: 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100',
    cta: ru ? 'Полная проверка все равно нужна для существенных сделок.' : 'Full review may still be needed for material deals.',
    description: ru
      ? 'По быстрым ответам риск выглядит ниже среднего. Это не заключение, а только предварительный скрининг по вашим ответам.'
      : 'Based on quick answers, risk appears below average. This is not a conclusion, only a preliminary screening based on your answers.'
  }
}

export default function HeimdallRiskTest({ language = 'ru', compact = false }) {
  const ru = language !== 'en'
  const questions = ru ? ruQuestions : enQuestions
  const visibleQuestions = compact ? questions.slice(0, 5) : questions
  const { user, refreshSession } = useHeimdallAuth()
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: user?.user_metadata?.full_name || user?.email || '', company: '', contact: user?.email || '', details: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const answeredCount = Object.keys(answers).length
  const score = useMemo(() => Object.values(answers).reduce((sum, value) => sum + Number(value || 0), 0), [answers])
  const maxScore = useMemo(() => visibleQuestions.reduce((sum, question) => sum + Math.max(...question.answers.map((answer) => Number(answer[1] || 0))), 0), [visibleQuestions])
  const normalizedScore = maxScore > 0 ? Math.min(100, Math.round((score / maxScore) * 100)) : 0
  const risk = getRiskLevel(normalizedScore, ru)
  const isComplete = answeredCount === visibleQuestions.length
  const isAuthenticated = Boolean(user)

  const selectedLabels = visibleQuestions.map((question) => {
    const selected = question.answers.find((answer) => String(answer[1]) === String(answers[question.id]))
    return `${question.text}: ${selected ? selected[0] : ru ? 'не отвечено' : 'not answered'}`
  })

  const updateContact = (key, value) => setContact((current) => ({ ...current, [key]: value }))

  async function submit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      if (!isComplete) {
        throw new Error(ru ? 'Ответьте на все вопросы теста.' : 'Please answer all test questions.')
      }

      const detailsText = [
        ru ? `Результат экспресс-оценки: ${risk.label}` : `Quick risk score result: ${risk.label}`,
        ru ? `Балл риска: ${normalizedScore}/100` : `Risk score: ${normalizedScore}/100`,
        '',
        ru ? 'Ответы:' : 'Answers:',
        ...selectedLabels,
        '',
        ru ? 'Комментарий клиента:' : 'Client note:',
        contact.details || (ru ? 'Не указан' : 'Not provided')
      ].join('\n')

      let response

      if (isAuthenticated) {
        const currentSession = await refreshSession()
        const accessToken = currentSession?.access_token
        if (!accessToken) throw new Error(ru ? 'Сессия истекла. Войдите в кабинет заново.' : 'Session expired. Please sign in again.')

        response = await fetch('/api/client-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            service: ru ? 'Экспресс-оценка риска сделки' : 'Quick deal risk score',
            urgency: normalizedScore >= 58 ? (ru ? 'Срочная' : 'Urgent') : (ru ? 'Обычная' : 'Normal'),
            subject: ru ? `Риск-тест: ${risk.label}` : `Risk test: ${risk.label}`,
            details: detailsText,
            company: contact.company,
            contact: contact.contact || user?.email || '',
            fullName: contact.name || user?.user_metadata?.full_name || user?.email || '',
            website: contact.website
          })
        })
      } else {
        response = await fetch('/api/contact-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contact.name,
            company: contact.company,
            contact: contact.contact,
            topic: ru ? `Риск-тест: ${risk.label}` : `Risk test: ${risk.label}`,
            language: ru ? 'ru' : 'en',
            source: compact ? 'homepage_risk_test' : 'risk_test',
            message: detailsText,
            website: contact.website
          })
        })
      }

      const data = await response.json().catch(() => ({}))
      if (!response.ok || data.ok === false) {
        throw new Error(data.error || (ru ? 'Не удалось отправить результат.' : 'Could not submit the result.'))
      }

      setStatus('success')
      setContact((current) => ({ ...current, details: '' }))
    } catch (submitError) {
      setStatus('error')
      setError(submitError.message || (ru ? 'Не удалось отправить результат.' : 'Could not submit the result.'))
    }
  }

  return (
    <section className={compact ? 'relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24' : 'relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-24'}>
      <div className={`grid gap-7 rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[42px] sm:p-8 ${compact ? 'lg:grid-cols-[0.88fr_1.12fr]' : 'lg:grid-cols-[0.82fr_1.18fr]'}`}>
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
            <Gauge className="h-4 w-4 shrink-0" />
            <span className="truncate">{ru ? 'Бесплатный риск-тест' : 'Free risk test'}</span>
          </div>

          <h2 className="mt-6 text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
            {compact
              ? (ru ? 'Оцените риск сделки за 60 секунд' : 'Score deal risk in 60 seconds')
              : (ru ? 'Экспресс-оценка риска сделки за 60 секунд' : 'Quick deal risk score in 60 seconds')}
          </h2>

          <p className="mt-5 text-base leading-8 text-white/64 sm:text-lg">
            {ru
              ? 'Ответьте на вопросы и получите предварительный риск-профиль. Это не расследование и не юридическое заключение, а быстрый скрининг по вашим ответам.'
              : 'Answer the questions and get a preliminary risk profile. This is not an investigation or legal opinion, only a quick screening based on your answers.'}
          </p>

          <div className="mt-6 grid gap-3">
            {[
              ru ? 'не требует документов' : 'no documents required',
              ru ? 'результат сразу на экране' : 'instant result on screen',
              ru ? 'заявка попадает в CRM HEIMDALL' : 'request goes to HEIMDALL CRM'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                {item}
              </div>
            ))}
          </div>

          {compact && (
            <Link href={ru ? '/risk-test' : '/risk-test-en'} className="mt-7 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">
              {ru ? 'Открыть полный тест' : 'Open full test'} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <form onSubmit={submit} className="min-w-0 rounded-[30px] border border-white/10 bg-[#050816]/72 p-4 sm:p-6">
          <div className="grid gap-4">
            {visibleQuestions.map((question, index) => (
              <div key={question.id} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-sm font-semibold text-[#F7D784]">{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold leading-6 text-white">{question.text}</div>
                    <div className="mt-3 grid gap-2">
                      {question.answers.map(([label, points]) => (
                        <button
                          key={`${question.id}-${points}`}
                          type="button"
                          onClick={() => setAnswers((current) => ({ ...current, [question.id]: points }))}
                          className={`rounded-2xl border px-4 py-3 text-left text-sm leading-6 transition ${String(answers[question.id]) === String(points) ? 'border-[#D6A84F]/55 bg-[#D6A84F]/15 text-[#F7D784]' : 'border-white/10 bg-black/20 text-white/68 hover:border-sky-300/30 hover:text-white'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-5 rounded-[24px] border p-5 ${risk.tone}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <div className="text-xl font-semibold tracking-[-0.03em]">{isComplete ? risk.label : (ru ? 'Ответьте на вопросы' : 'Answer the questions')}</div>
                <p className="mt-2 text-sm leading-6 opacity-85">
                  {isComplete ? risk.description : (ru ? 'После заполнения тест покажет предварительный риск-профиль.' : 'After completion, the test will show a preliminary risk profile.')}
                </p>
                {isComplete && <div className="mt-3 text-sm font-semibold opacity-95">{ru ? `Балл риска: ${normalizedScore}/100` : `Risk score: ${normalizedScore}/100`}</div>}
              </div>
            </div>
          </div>

          {isComplete && (
            <div className="mt-5 grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                <span>{risk.cta}</span>
              </div>

              <input aria-hidden="true" tabIndex="-1" autoComplete="off" value={contact.website} onChange={(event) => updateContact('website', event.target.value)} className="hidden" placeholder="Website" />

              {!isAuthenticated && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input value={contact.name} onChange={(event) => updateContact('name', event.target.value)} required className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Имя' : 'Name'} />
                  <input value={contact.contact} onChange={(event) => updateContact('contact', event.target.value)} required className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Телефон, email или Telegram' : 'Phone, email or Telegram'} />
                </div>
              )}

              {isAuthenticated && (
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm leading-6 text-emerald-100">
                  {ru ? `Вы вошли как ${user?.email}. Контакт повторно вводить не нужно.` : `Signed in as ${user?.email}. No need to enter contact details again.`}
                </div>
              )}

              <input value={contact.company} onChange={(event) => updateContact('company', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Компания, если есть' : 'Company, if any'} />
              <textarea value={contact.details} onChange={(event) => updateContact('details', event.target.value)} rows={3} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Коротко опишите ситуацию, сумму, контрагента или сомнения' : 'Briefly describe the deal, amount, counterparty or concerns'} />

              <button disabled={status === 'loading'} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.25)] disabled:cursor-not-allowed disabled:opacity-60">
                {status === 'loading' ? (ru ? 'Отправляем...' : 'Sending...') : (ru ? 'Отправить результат HEIMDALL' : 'Send result to HEIMDALL')}
                <ArrowRight className="h-4 w-4" />
              </button>

              {status === 'success' && (
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm leading-6 text-emerald-100">
                  {ru ? 'Результат отправлен. Мы увидим его в CRM и сможем предложить ручную проверку.' : 'Result sent. We will see it in CRM and can suggest a manual review.'}
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm leading-6 text-red-100">
                  {error}
                </div>
              )}
            </div>
          )}

          <p className="mt-4 text-xs leading-5 text-white/42">
            {ru
              ? 'Результат теста не является юридическим заключением, расследованием или полной проверкой. Для вывода требуется ручная проверка специалистом HEIMDALL.'
              : 'The result is not a legal opinion, investigation or full verification. A manual HEIMDALL review is required for a reliable conclusion.'}
          </p>
        </form>
      </div>
    </section>
  )
}
