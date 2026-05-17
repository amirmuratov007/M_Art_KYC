import { useState } from 'react'
import { ShieldCheck, Search, Building2, Users, FileText, LockKeyhole, Globe2, BriefcaseBusiness, ArrowRight, Eye, Fingerprint, CheckCircle2 } from 'lucide-react'
import IntelligenceCursor from '@/components/IntelligenceCursor'

const content = {
  ru: {
    logoSubtitle: 'Корпоративная разведка и проверка рисков',
    nav: ['Услуги', 'Кадровым агентствам', 'Как проходит проверка', 'Отчёт', 'Контакты'],
    navIds: ['services', 'recruitment', 'process', 'report', 'contacts'],
    topBadge: 'Конфиденциальная аналитика для корпоративных решений',
    heroA: 'Выявляем риски',
    heroB: 'до того, как они становятся проблемой',
    sub: 'HEIMDALL проводит комплексные проверки бизнеса, AML/KYC анализ, проверку кандидатов и корпоративную разведку для банков, инвесторов, юридических фирм и кадровых агентств.',
    cta1: 'Запросить проверку',
    cta2: 'Получить консультацию',
    stats: [
      ['24ч', 'быстрый старт проверки'],
      ['NDA', 'по запросу клиента'],
      ['10+', 'типов источников'],
      ['Risk', 'подход на основе риска']
    ],
    panelTitle: 'Индекс риска',
    panelLabel: 'Конфиденциально',
    panelScoreText: 'Обнаружены факторы, требующие дополнительного анализа',
    panelRows: [
      ['Структура владения', 'Нужна проверка'],
      ['Санкционные риски', 'Совпадений нет'],
      ['Судебная история', 'Есть сигналы'],
      ['Репутационный фон', 'Средний риск']
    ],
    panelNote: 'Итоговый отчёт содержит выявленные факты, краткое аналитическое заключение и рекомендации по дальнейшим действиям.',
    ticker: 'Проверка контрагентов • Проверка кандидатов • AML/KYC • Корпоративная разведка • Проверка иностранных компаний • Комплексная проверка бизнеса • Репутационные риски • Проверка топ-менеджеров •',
    servicesKicker: 'Услуги',
    servicesTitle: 'Проверки для решений, где ошибка стоит дорого',
    services: [
      ['Проверка контрагентов', 'Анализ юридических лиц, связей, деловой репутации, судебных рисков и признаков недобросовестности.'],
      ['Проверка кандидатов', 'Предварительная проверка благонадёжности, биографии, репутации и потенциальных рисков кандидата.'],
      ['AML/KYC проверки', 'Проверка санкционных, финансовых, комплаенс и регуляторных рисков перед началом сотрудничества.'],
      ['Корпоративная разведка', 'Сбор и анализ открытых, международных и специализированных источников для принятия решений.'],
      ['Иностранные компании', 'Проверка зарубежных юридических лиц, владельцев, структуры владения и репутационных факторов.'],
      ['Комплексная проверка бизнеса', 'Глубокий анализ компании, собственников, финансового контура, судебной истории и скрытых связей.'],
      ['Проверка топ-менеджеров', 'Аналитика биографии, конфликтов интересов, публичной репутации и управленческих рисков.'],
      ['Аналитический отчёт', 'Конфиденциальный документ с выводами, индексом риска, выявленными фактами и рекомендациями.']
    ],
    recruitmentBadge: 'Для кадровых и рекрутинговых агентств',
    recruitmentTitle: 'Ваш кандидат прошёл интервью. Но пройдёт ли он внутреннюю проверку?',
    recruitmentText: 'HEIMDALL помогает заранее выявлять риски кандидатов до передачи финалиста клиенту: биография, деловая репутация, конфликт интересов, иностранный опыт, чувствительные должности и скрытые факторы отказа.',
    recruitmentCta1: 'Проверить кандидата',
    recruitmentCta2: 'Получить консультацию',
    pains: ['потеря времени рекрутера', 'повторный поиск кандидата', 'срыв выхода финалиста', 'ухудшение отношений с клиентом', 'репутационные риски агентства', 'отказ после оффера'],
    processKicker: 'Как проходит проверка',
    processTitle: 'Простой процесс без личного кабинета и лишней сложности',
    process: [
      ['01', 'Вы оставляете заявку', 'Мы уточняем задачу, тип проверки, сроки и формат результата.'],
      ['02', 'Аналитики проводят проверку', 'Изучаются источники, связи, биография, юридические и репутационные факторы.'],
      ['03', 'Формируется конфиденциальный отчёт', 'Отчёт содержит выводы, выявленные факты и краткие рекомендации.'],
      ['04', 'Вы получаете решение по рискам', 'Мы помогаем понять, можно ли продолжать сделку, найм или сотрудничество.']
    ],
    reportKicker: 'Аналитический отчёт',
    reportTitle: 'Не поток данных, а понятные выводы для решения',
    reportText: 'Клиент получает конфиденциальный отчёт с индексом риска, кратким аналитическим заключением, выявленными фактами и рекомендацией.',
    reportStamp: 'Конфиденциально',
    reportLabel: 'HEIMDALL REPORT',
    reportHeading: 'Итоговая оценка риска',
    reportCards: [['Индекс риска', 'Средний'], ['Краткое заключение', 'Готово'], ['Выявленные факты', '12'], ['Рекомендация', 'Требуется анализ']],
    trustTitle: 'Конфиденциальность как стандарт',
    trustText: 'Каждая проверка проводится с соблюдением принципов конфиденциальности, ограниченного доступа к информации и методологии оценки рисков корпоративного уровня.',
    trust: ['Конфиденциальность как базовый стандарт', 'Ограниченный доступ к информации', 'Методология проверки корпоративного уровня', 'Международные источники данных', 'Аналитики с опытом проверки рисков', 'Индивидуальная оценка под задачу клиента'],
    leadKicker: 'Заявка',
    leadTitle: 'Запросить проверку',
    leadText: 'Опишите задачу. Мы свяжемся с вами, уточним детали и предложим формат проверки.',
    form: {
      name: 'Имя',
      company: 'Компания',
      email: 'Email',
      phone: 'Телефон',
      comment: 'Комментарий',
      submit: 'Отправить заявку',
      sending: 'Отправляем...',
      success: 'Заявка отправлена. Мы свяжемся с вами.',
      error: 'Не удалось отправить заявку. Попробуйте позже.'
    },
    checkTypes: ['Проверка контрагента', 'Проверка кандидата', 'Проверка топ-менеджера', 'AML/KYC проверка', 'Комплексная проверка бизнеса', 'Проверка иностранной компании', 'Корпоративная разведка', 'Другое'],
    footerItems: ['NDA по запросу', 'Конфиденциальная аналитика', 'Международные источники данных', 'Ограниченный доступ к информации'],
    footerContact: ['Email: contact@heimdall-risk.com', 'Telegram: @heimdall_risk', 'Защищённая коммуникация по запросу'],
    mobileCta: 'Запросить проверку'
  },
  en: {
    logoSubtitle: 'Corporate intelligence and risk advisory',
    nav: ['Services', 'Recruitment Agencies', 'Process', 'Report', 'Contacts'],
    navIds: ['services', 'recruitment', 'process', 'report', 'contacts'],
    topBadge: 'Confidential intelligence for executive decisions',
    heroA: 'We identify risks',
    heroB: 'before they become liabilities',
    sub: 'HEIMDALL delivers due diligence, AML/KYC reviews, candidate background checks and corporate intelligence for banks, investors, law firms and recruitment agencies.',
    cta1: 'Request a review',
    cta2: 'Get a consultation',
    stats: [
      ['24h', 'rapid review initiation'],
      ['NDA', 'available on request'],
      ['10+', 'source categories'],
      ['Risk', 'risk-based methodology']
    ],
    panelTitle: 'Risk Index',
    panelLabel: 'Confidential',
    panelScoreText: 'Signals detected that require additional analyst review',
    panelRows: [
      ['Ownership structure', 'Further review'],
      ['Sanctions exposure', 'No matches'],
      ['Litigation history', 'Signals found'],
      ['Reputation profile', 'Medium risk']
    ],
    panelNote: 'The final report includes key findings, an executive summary and clear recommendations for next steps.',
    ticker: 'Counterparty checks • Candidate screening • AML/KYC • Corporate intelligence • Foreign company review • Business due diligence • Reputational risk • Executive checks •',
    servicesKicker: 'Services',
    servicesTitle: 'Intelligence-led checks for decisions where mistakes are costly',
    services: [
      ['Counterparty Checks', 'Review of companies, affiliations, business reputation, litigation exposure and integrity signals.'],
      ['Candidate Screening', 'Pre-employment background review covering biography, reputation and potential risk factors.'],
      ['AML/KYC Reviews', 'Sanctions, financial crime, compliance and regulatory risk checks before engagement.'],
      ['Corporate Intelligence', 'Collection and analysis of open, international and specialist sources for decision-making.'],
      ['Foreign Company Review', 'Assessment of overseas entities, ownership, control structure and reputation signals.'],
      ['Business Due Diligence', 'In-depth review of companies, shareholders, financial perimeter, litigation history and hidden links.'],
      ['Executive Checks', 'Assessment of senior executives, conflicts of interest, public reputation and management risks.'],
      ['Analytical Report', 'A confidential report with findings, risk index, executive summary and recommendations.']
    ],
    recruitmentBadge: 'For recruitment and executive search agencies',
    recruitmentTitle: 'Your candidate passed the interview. But will they pass the client’s security review?',
    recruitmentText: 'HEIMDALL helps agencies identify candidate risks before presenting finalists to clients: biography, reputation, conflicts of interest, foreign work history, sensitive positions and hidden rejection factors.',
    recruitmentCta1: 'Screen a candidate',
    recruitmentCta2: 'Get a consultation',
    pains: ['recruiter time lost', 'candidate search restarted', 'finalist start date disrupted', 'client relationship damaged', 'agency reputation risk', 'post-offer rejection'],
    processKicker: 'Process',
    processTitle: 'A simple advisory process without dashboards or unnecessary complexity',
    process: [
      ['01', 'You submit a request', 'We clarify the objective, review type, timeline and expected output.'],
      ['02', 'Analysts conduct the review', 'Sources, affiliations, biography, legal and reputation factors are analysed.'],
      ['03', 'A confidential report is prepared', 'The report includes findings, an executive summary and concise recommendations.'],
      ['04', 'You receive a risk-based decision view', 'We help you decide whether to proceed with a transaction, hire or partnership.']
    ],
    reportKicker: 'Analytical Report',
    reportTitle: 'Not a data dump, but decision-ready intelligence',
    reportText: 'Clients receive a confidential report with a risk index, executive summary, key findings and a recommendation.',
    reportStamp: 'Confidential',
    reportLabel: 'HEIMDALL REPORT',
    reportHeading: 'Final Risk Assessment',
    reportCards: [['Risk Index', 'Medium'], ['Executive Summary', 'Ready'], ['Key Findings', '12'], ['Recommendation', 'Further review']],
    trustTitle: 'Confidentiality as a standard',
    trustText: 'Every engagement is handled with confidentiality, restricted information access and enterprise-grade risk methodology.',
    trust: ['Confidentiality by default', 'Restricted access to information', 'Enterprise-grade review methodology', 'International data sources', 'Experienced risk analysts', 'Tailored assessment for each client'],
    leadKicker: 'Request',
    leadTitle: 'Request a review',
    leadText: 'Describe your case. We will contact you, clarify the scope and propose the right review format.',
    form: {
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      comment: 'Comment',
      submit: 'Submit request',
      sending: 'Sending...',
      success: 'Request sent. We will contact you.',
      error: 'Could not send request. Please try again later.'
    },
    checkTypes: ['Counterparty check', 'Candidate screening', 'Executive check', 'AML/KYC review', 'Business due diligence', 'Foreign company review', 'Corporate intelligence', 'Other'],
    footerItems: ['NDA available on request', 'Confidential intelligence', 'International data sources', 'Restricted information access'],
    footerContact: ['Email: contact@heimdall-risk.com', 'Telegram: @heimdall_risk', 'Secure communication on request'],
    mobileCta: 'Request a review'
  }
}

const iconList = [Building2, Users, ShieldCheck, Search, Globe2, BriefcaseBusiness, Fingerprint, FileText]

export default function Home() {
  const [language, setLanguage] = useState('ru')
  const t = content[language]
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    check_type: t.checkTypes[0],
    comment: ''
  })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const switchLanguage = () => {
    const next = language === 'ru' ? 'en' : 'ru'
    setLanguage(next)
    setForm((prev) => ({ ...prev, check_type: content[next].checkTypes[0] }))
    setStatus('idle')
    setMessage('')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault()
    }

    setMessage('')

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus('error')
      setMessage(language === 'ru' ? 'Заполните имя и телефон.' : 'Please enter your name and phone number.')
      return
    }

    setStatus('loading')
    setMessage(t.form.sending)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale: language })
      })

      let data = {}
      try {
        data = await response.json()
      } catch (_) {
        data = {}
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Send error')
      }

      setStatus('success')
      setMessage(t.form.success)
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        check_type: t.checkTypes[0],
        comment: ''
      })
    } catch (error) {
      setStatus('error')
      setMessage(t.form.error)
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <IntelligenceCursor />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.28),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_50%,#050816_100%)]" />
        <div className="absolute inset-0 hero-grid opacity-70" />
        <div className="scan-line" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="group">
            <div className="text-xl font-semibold tracking-[0.34em] text-white">HEIMDALL</div>
            <div className="mt-1 text-[11px] text-sky-200/70">{t.logoSubtitle}</div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/68 lg:flex">
            {t.nav.map((item, i) => (
              <a key={item} className="transition hover:text-white" href={`#${t.navIds[i]}`}>{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={switchLanguage} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 transition hover:border-sky-300/40 hover:bg-white/10">
              {language === 'ru' ? 'RU / EN' : 'EN / RU'}
            </button>
            <a href="#lead" className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:bg-sky-400 md:block">
              {t.cta1}
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-36 md:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="reveal inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/8 px-4 py-2 text-sm text-sky-100/80 shadow-[0_0_35px_rgba(37,99,235,0.14)]">
              <Eye className="h-4 w-4 text-sky-300" />
              {t.topBadge}
            </div>

            <h1 className="reveal delay-1 mt-8 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl xl:text-8xl">
              {t.heroA}
              <br />
              <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                {t.heroB}
              </span>
            </h1>

            <p className="reveal delay-2 mt-8 max-w-3xl text-lg leading-8 text-white/68 md:text-xl">
              {t.sub}
            </p>

            <div className="reveal delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#lead" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 text-base font-semibold text-white shadow-[0_0_55px_rgba(56,189,248,0.35)] transition hover:-translate-y-1 hover:bg-sky-400">
                {t.cta1}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#contacts" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-white/90 backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-300/35 hover:bg-white/10">
                {t.cta2}
              </a>
            </div>

            <div className="reveal delay-4 mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {t.stats.map(([num, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-white">{num}</div>
                  <div className="mt-1 text-xs leading-5 text-white/55">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal delay-2 relative">
            <div className="absolute -inset-8 rounded-[50px] bg-sky-500/15 blur-3xl" />
            <div className="light-sweep relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.055] p-5 shadow-premium backdrop-blur-2xl">
              <div className="rounded-[26px] border border-white/10 bg-[#07101f]/90 p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-sky-200/70">HEIMDALL SCAN</div>
                    <div className="mt-2 text-2xl font-semibold">{t.panelTitle}</div>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-200">
                    {t.panelLabel}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-sky-400 to-blue-600 shadow-[0_0_25px_rgba(56,189,248,0.7)]" />
                    </div>
                    <div className="mt-3 text-sm text-white/55">{t.panelScoreText}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-semibold text-sky-300">68</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">/ 100</div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {t.panelRows.map(([a, b]) => (
                    <div key={a} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                      <span className="text-white/72">{a}</span>
                      <span className="text-sm text-sky-200/72">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-sky-300/20 bg-sky-300/8 p-4 text-sm leading-6 text-white/70">
                  {t.panelNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.025] py-4">
        <div className="ticker text-sm text-white/55">
          <div className="ticker-track gap-8">
            <span>{t.ticker}</span>
            <span>{t.ticker}</span>
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="mb-12 max-w-3xl">
          <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.servicesKicker}</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.servicesTitle}</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.services.map(([title, text], index) => {
            const Icon = iconList[index]
            return (
              <div key={title} className="light-sweep group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07] hover:shadow-[0_0_60px_rgba(56,189,248,0.14)]">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200 transition group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold leading-tight text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section id="recruitment" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="overflow-hidden rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-400/12 via-white/[0.045] to-transparent p-6 backdrop-blur-2xl md:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-200">{t.recruitmentBadge}</div>
              <h2 className="mt-8 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">{t.recruitmentTitle}</h2>
              <p className="mt-7 text-lg leading-8 text-white/68">{t.recruitmentText}</p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#lead" className="rounded-2xl bg-sky-500 px-7 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:-translate-y-1 hover:bg-sky-400">{t.recruitmentCta1}</a>
                <a href="#lead" className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold transition hover:border-sky-300/35 hover:bg-white/10">{t.recruitmentCta2}</a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {t.pains.map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
                  <CheckCircle2 className="mb-4 h-5 w-5 text-sky-300" />
                  <div className="text-lg font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.processKicker}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.processTitle}</h2>
          </div>

          <div className="grid gap-4">
            {t.process.map(([num, title, text]) => (
              <div key={num} className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl">
                <div className="text-sm text-sky-300">{num}</div>
                <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.reportKicker}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.reportTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-white/64">{t.reportText}</p>
          </div>

          <div className="relative rounded-[34px] border border-white/10 bg-white/[0.055] p-5 shadow-premium backdrop-blur-2xl">
            <div className="absolute right-8 top-8 rotate-12 rounded-xl border border-red-300/30 px-4 py-2 text-xs uppercase tracking-[0.22em] text-red-200/80">{t.reportStamp}</div>
            <div className="rounded-[28px] bg-[#07101f] p-8">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.reportLabel}</div>
              <h3 className="mt-4 text-3xl font-semibold">{t.reportHeading}</h3>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {t.reportCards.map(([a, b]) => (
                  <div key={a} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="text-sm text-white/45">{a}</div>
                    <div className="mt-2 text-xl font-semibold text-white">{b}</div>
                  </div>
                ))}
              </div>
              <div className="mt-7 space-y-3">
                <div className="h-3 w-full rounded-full bg-white/10" />
                <div className="h-3 w-4/5 rounded-full bg-white/10" />
                <div className="h-3 w-2/3 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
          <div className="flex items-start gap-5">
            <LockKeyhole className="mt-2 h-8 w-8 text-sky-300" />
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{t.trustTitle}</h2>
              <p className="mt-5 max-w-4xl text-lg leading-8 text-white/64">{t.trustText}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {t.trust.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-5 text-white/75">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="lead" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-12 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-6 backdrop-blur-2xl md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.leadKicker}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.leadTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-white/64">{t.leadText}</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" value={form.name} onChange={handleChange} required placeholder={t.form.name} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
              <input name="company" value={form.company} onChange={handleChange} placeholder={t.form.company} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder={t.form.email} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder={t.form.phone} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
            </div>
            <select name="check_type" value={form.check_type} onChange={handleChange} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition focus:border-sky-300/45">
              {t.checkTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            <textarea name="comment" value={form.comment} onChange={handleChange} placeholder={t.form.comment} rows={5} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />

            <button type="submit" disabled={status === 'loading'} className="rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:bg-sky-400 disabled:opacity-60">
              {status === 'loading' ? t.form.sending : t.form.submit}
            </button>

            {message && (
              <div className={`rounded-2xl border px-5 py-4 text-sm ${status === 'success' ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-red-300/25 bg-red-300/10 text-red-100'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </section>

      <footer id="contacts" className="relative z-10 border-t border-white/10 bg-black/20 px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="text-2xl font-semibold tracking-[0.34em]">HEIMDALL</div>
            <div className="mt-3 text-white/55">{t.logoSubtitle}</div>
          </div>
          <div className="space-y-3 text-white/60">
            {t.footerItems.map((item) => <div key={item}>{item}</div>)}
          </div>
          <div className="space-y-3 text-white/60">
            {t.footerContact.map((item) => <div key={item}>{item}</div>)}
          </div>
        </div>

        <a href="#lead" className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl bg-sky-500 px-6 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.34)] md:hidden">
          {t.mobileCta}
        </a>
      </footer>
    </main>
  )
}
