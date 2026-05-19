import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ShieldCheck, Search, Building2, Users, FileText, LockKeyhole, Globe2, BriefcaseBusiness, ArrowRight, Eye, Fingerprint, CheckCircle2 } from 'lucide-react'
import HeimdallServices from '@/components/HeimdallServices'

const content = {
  ru: {
    logoSubtitle: 'Корпоративная разведка и проверка рисков',
    nav: ['Услуги', 'Кадровым агентствам', 'Как проходит проверка', 'Отчёт', 'Прайс-лист', 'Контакты'],
    navIds: ['services', 'recruitment', 'process', 'report', 'pricing', 'contacts'],
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
    servicesTitle: 'Проверки для принятия правильных решений, где ошибка стоит дорого',
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
      error: 'Не удалось отправить заявку. Попробуйте позже.',
      required: 'Заполните имя и телефон.'
    },
    checkTypes: ['Проверка контрагента', 'Проверка кандидата', 'Проверка топ-менеджера', 'AML/KYC проверка', 'Комплексная проверка бизнеса', 'Проверка иностранной компании', 'Корпоративная разведка', 'Другое'],
    footerItems: ['NDA по запросу', 'Конфиденциальная аналитика', 'Международные источники данных', 'Ограниченный доступ к информации'],
    footerContact: ['Email: contact@heimdal-group.ru', 'Telegram: @heimdall_risk', 'Защищённая коммуникация по запросу'],
    mobileCta: 'Запросить проверку'
  },
  en: {
    logoSubtitle: 'Corporate intelligence and risk advisory',
    nav: ['Services', 'Recruitment Agencies', 'Process', 'Report', 'Pricing', 'Contacts'],
    navIds: ['services', 'recruitment', 'process', 'report', 'pricing', 'contacts'],
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
      error: 'Could not send request. Please try again later.',
      required: 'Please enter your name and phone number.'
    },
    checkTypes: ['Counterparty check', 'Candidate screening', 'Executive check', 'AML/KYC review', 'Business due diligence', 'Foreign company review', 'Corporate intelligence', 'Other'],
    footerItems: ['NDA available on request', 'Confidential intelligence', 'International data sources', 'Restricted information access'],
    footerContact: ['Email: contact@heimdal-group.ru', 'Telegram: @heimdall_risk', 'Secure communication on request'],
    mobileCta: 'Request a review'
  }
}

const iconList = [Building2, Users, ShieldCheck, Search, Globe2, BriefcaseBusiness, Fingerprint, FileText]

export default function Home() {
  const [language, setLanguage] = useState('ru')
  const t = content[language]
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const scannerSteps = language === 'ru'
    ? [
        'Сканирование структуры владения',
        'Проверка санкционных рисков',
        'Анализ судебной истории',
        'Проверка репутационного фона',
        'Формирование индекса риска'
      ]
    : [
        'Scanning ownership structure',
        'Running sanctions screening',
        'Checking litigation history',
        'Analysing reputation signals',
        'Calculating risk index'
      ]
  const scannerMetrics = language === 'ru'
    ? [['Источники', '10+'], ['Сигналы', '37'], ['Статус', 'Активно']]
    : [['Sources', '10+'], ['Signals', '37'], ['Status', 'Active']]

  const intelligenceCases = language === 'ru'
    ? [
        ['Сделка с иностранным контрагентом', 'Выявлены скрытые связи с проблемными юридическими лицами и признаки номинальной структуры владения.', 'Рекомендация: расширенная проверка перед оплатой'],
        ['Кандидат на руководящую позицию', 'Обнаружен конфликт интересов, не раскрытый на этапе интервью, и репутационные сигналы в открытых источниках.', 'Рекомендация: дополнительное интервью и юридическая оценка'],
        ['Инвестиционный due diligence', 'Подтверждены судебные споры, финансовые маркеры риска и расхождения в публичной биографии бенефициара.', 'Рекомендация: пересмотр условий сделки']
      ]
    : [
        ['Foreign counterparty transaction', 'Hidden links to high-risk entities and nominee ownership indicators were identified before payment.', 'Recommendation: enhanced review before proceeding'],
        ['Executive hiring decision', 'A non-disclosed conflict of interest and reputation signals were found during pre-offer screening.', 'Recommendation: additional interview and legal review'],
        ['Investment due diligence', 'Litigation exposure, risk markers and discrepancies in the beneficiary profile were confirmed.', 'Recommendation: revisit transaction terms']
      ]

  const reportSections = language === 'ru'
    ? [
        ['01', 'Краткое заключение', 'Сводный вывод для руководителя без перегруза техническими деталями.'],
        ['02', 'Матрица рисков', 'Санкции, суды, репутация, владение, конфликты интересов.'],
        ['03', 'Карта связей', 'Визуальное представление найденных связей и контрольных точек.'],
        ['04', 'Рекомендация', 'Продолжать, остановить, запросить дополнительные документы или углубить проверку.']
      ]
    : [
        ['01', 'Executive Summary', 'A concise leadership-level conclusion without unnecessary technical overload.'],
        ['02', 'Risk Matrix', 'Sanctions, litigation, reputation, ownership and conflicts of interest.'],
        ['03', 'Relationship Map', 'Visual representation of detected links and control points.'],
        ['04', 'Recommendation', 'Proceed, stop, request additional documents or perform enhanced review.']
      ]


  const terminalLines = language === 'ru'
    ? [
        ['00:01', 'Инициализация защищённого аналитического контура'],
        ['00:04', 'Проверка международных источников и санкционных списков'],
        ['00:09', 'Построение карты владения и аффилированных связей'],
        ['00:14', 'Поиск судебных, исполнительных и репутационных сигналов'],
        ['00:18', 'Сопоставление конфликтов интересов и скрытых пересечений'],
        ['00:23', 'Формирование индекса риска и рекомендации аналитика']
      ]
    : [
        ['00:01', 'Initialising secure intelligence environment'],
        ['00:04', 'Checking international sources and sanctions lists'],
        ['00:09', 'Mapping ownership and affiliated relationships'],
        ['00:14', 'Searching litigation, enforcement and reputation signals'],
        ['00:18', 'Correlating conflicts of interest and hidden overlaps'],
        ['00:23', 'Generating risk index and analyst recommendation']
      ]

  const riskMetrics = language === 'ru'
    ? [
        ['Санкции', '12%', 'Низкий'],
        ['Суды', '41%', 'Средний'],
        ['Репутация', '64%', 'Повышенный'],
        ['Связи', '58%', 'Требует анализа']
      ]
    : [
        ['Sanctions', '12%', 'Low'],
        ['Litigation', '41%', 'Medium'],
        ['Reputation', '64%', 'Elevated'],
        ['Affiliations', '58%', 'Review required']
      ]

  const methodologySteps = language === 'ru'
    ? [
        ['01', 'Сбор данных', 'Определяем источники, юрисдикции, сущности и контрольные точки проверки.'],
        ['02', 'Корреляция связей', 'Сопоставляем собственников, директоров, компании, события и репутационные сигналы.'],
        ['03', 'Моделирование риска', 'Оцениваем факторы по весу, срочности, влиянию и вероятности.'],
        ['04', 'Аналитический вывод', 'Формируем executive-level отчёт с рекомендацией и понятным next step.']
      ]
    : [
        ['01', 'Data Collection', 'We define sources, jurisdictions, entities and review checkpoints.'],
        ['02', 'Relationship Correlation', 'We connect owners, directors, companies, events and reputation signals.'],
        ['03', 'Risk Modelling', 'We score factors by weight, urgency, impact and probability.'],
        ['04', 'Analyst Review', 'We deliver an executive-level report with a clear recommendation and next step.']
      ]

  useEffect(() => {
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    check_type: content.ru.checkTypes[0],
    comment: ''
  })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')
    const savedLang = window.localStorage.getItem('heimdall_lang')
    const nextLang = urlLang === 'en' || savedLang === 'en' ? 'en' : 'ru'

    window.localStorage.setItem('heimdall_lang', nextLang)
    setLanguage(nextLang)
    setForm((prev) => ({ ...prev, check_type: content[nextLang].checkTypes[0] }))
  }, [])
  const [demoRunning, setDemoRunning] = useState(false)
  const [demoStep, setDemoStep] = useState(0)

  const switchLanguage = () => {
    const next = language === 'ru' ? 'en' : 'ru'

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('heimdall_lang', next)
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState({}, '', url.toString())
    }

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
    event.preventDefault()
    setMessage('')

    if (!form.name.trim() || !form.phone.trim()) {
      setStatus('error')
      setMessage(t.form.required)
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

      const data = await response.json().catch(() => ({}))

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


  const audienceCards = language === 'ru'
    ? [
        ['Банки и финтех', 'Проверка клиентов, партнёров, бенефициаров и повышенных комплаенс-рисков.'],
        ['Инвесторы и фонды', 'Проверка бизнеса, собственников, судебной истории и репутационных факторов перед сделкой.'],
        ['Юридические фирмы', 'Аналитическая поддержка при корпоративных спорах, сделках и проверке сторон.'],
        ['Кадровые агентства', 'Предварительный скрининг кандидатов до передачи финалиста клиенту.'],
        ['Крупный бизнес', 'Проверка поставщиков, подрядчиков, руководителей и чувствительных позиций.'],
        ['Частные клиенты', 'Конфиденциальная проверка сложных кейсов, активов, партнёров и репутационных рисков.']
      ]
    : [
        ['Banks & fintech', 'Client, partner, beneficial owner and enhanced compliance risk reviews.'],
        ['Investors & funds', 'Business, shareholder, litigation and reputation checks before transactions.'],
        ['Law firms', 'Analytical support for disputes, transactions and counterparty reviews.'],
        ['Recruitment agencies', 'Candidate screening before presenting finalists to corporate clients.'],
        ['Large enterprises', 'Supplier, contractor, executive and sensitive-position checks.'],
        ['Private clients', 'Confidential review of complex cases, assets, partners and reputation risks.']
      ]

  const triggerCards = language === 'ru'
    ? [
        ['Перед сделкой', 'Когда важно понять, кто стоит за компанией и какие риски могут всплыть после подписания.'],
        ['Перед наймом', 'Когда кандидат выходит на чувствительную, финансовую или управленческую позицию.'],
        ['Перед партнёрством', 'Когда репутация партнёра может повлиять на ваш бизнес, клиентов и регуляторные риски.'],
        ['Перед инвестицией', 'Когда нужна независимая оценка владельцев, структуры, судебной истории и red flags.'],
        ['При иностранном контрагенте', 'Когда компания зарегистрирована в другой юрисдикции и данные разрознены.'],
        ['При тревожных сигналах', 'Когда уже есть сомнения, конфликт, странная структура или негативный фон.']
      ]
    : [
        ['Before a transaction', 'When you need to understand who stands behind a company and what may surface later.'],
        ['Before hiring', 'When a candidate is entering a sensitive, financial or leadership role.'],
        ['Before a partnership', 'When a partner’s reputation can affect your business, clients and regulatory exposure.'],
        ['Before investing', 'When you need an independent view of owners, structure, litigation and red flags.'],
        ['With foreign entities', 'When a company is registered abroad and information is fragmented across jurisdictions.'],
        ['When signals appear', 'When there are doubts, conflicts, unusual structures or negative background signals.']
      ]

  const deliverableCards = language === 'ru'
    ? [
        ['Индекс риска', 'Понятная итоговая оценка по ключевым категориям риска.'],
        ['Краткое заключение', 'Executive summary для принятия решения без перегруза данными.'],
        ['Выявленные факты', 'Структурированные findings с источниками и пояснениями.'],
        ['Red flags', 'Отдельный список факторов, которые требуют внимания или дополнительной проверки.'],
        ['Рекомендация', 'Практический вывод: продолжать, остановить, запросить документы или провести углублённую проверку.'],
        ['PDF-отчёт', 'Конфиденциальный документ, который можно передать внутри компании или клиенту.']
      ]
    : [
        ['Risk index', 'A clear overall assessment across key risk categories.'],
        ['Executive summary', 'Decision-ready summary without overwhelming data noise.'],
        ['Key findings', 'Structured findings with context, sources and analyst notes.'],
        ['Red flags', 'A focused list of signals that require attention or additional review.'],
        ['Recommendation', 'Practical guidance: proceed, pause, request documents or deepen the review.'],
        ['PDF report', 'A confidential document for internal review or client-facing advisory work.']
      ]


  const demoSteps = language === 'ru'
    ? [
        ['Инициализация', 'Запуск защищённого аналитического контура HEIMDALL', 'complete'],
        ['Источники', 'Проверка международных реестров, судебных и санкционных баз', 'complete'],
        ['Владение', 'Построение цепочки собственников и связанных лиц', 'complete'],
        ['Сигналы', 'Обнаружены репутационные и корпоративные аномалии', 'warning'],
        ['Риск', 'Индекс риска пересчитан с учётом скрытых связей', 'warning'],
        ['Вывод', 'Сформирована рекомендация для управленческого решения', 'complete']
      ]
    : [
        ['Initialisation', 'Launching the secured HEIMDALL intelligence environment', 'complete'],
        ['Sources', 'Checking international registries, litigation and sanctions datasets', 'complete'],
        ['Ownership', 'Mapping ownership chain and related parties', 'complete'],
        ['Signals', 'Reputational and corporate anomalies detected', 'warning'],
        ['Risk', 'Risk index recalculated with hidden affiliations included', 'warning'],
        ['Conclusion', 'Recommendation prepared for executive decision-making', 'complete']
      ]

  const demoAlerts = language === 'ru'
    ? [
        ['Повышенное внимание', 'Связь с компанией в другой юрисдикции требует дополнительной проверки'],
        ['Репутационный сигнал', 'Обнаружен негативный фон в открытых источниках'],
        ['Рекомендация', 'Запросить подтверждающие документы перед продолжением процесса']
      ]
    : [
        ['Elevated attention', 'Link to an entity in another jurisdiction requires further review'],
        ['Reputation signal', 'Adverse background detected in open sources'],
        ['Recommendation', 'Request supporting documents before proceeding']
      ]

  useEffect(() => {
    if (!demoRunning) return

    setDemoStep(0)

    const interval = setInterval(() => {
      setDemoStep((current) => {
        if (current >= demoSteps.length - 1) {
          clearInterval(interval)
          return current
        }

        return current + 1
      })
    }, 850)

    return () => clearInterval(interval)
  }, [demoRunning, language])

  const startDemo = () => {
    setDemoRunning(false)
    setDemoStep(0)

    setTimeout(() => {
      setDemoRunning(true)
    }, 80)
  }

  return (
    <>
      <Head>
        <title>HEIMDALL — Corporate Intelligence & Risk Advisory</title>
        <meta name="description" content="HEIMDALL проводит due diligence, AML/KYC, проверку контрагентов, проверку кандидатов и корпоративную разведку." />
      </Head>

      <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
        <div
          className="pointer-events-none fixed z-[9999] hidden h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.95)] md:block"
          style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)' }}
        />
        <div
          className="pointer-events-none fixed z-[9998] hidden h-10 w-10 rounded-full border border-sky-300/35 md:block"
          style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)' }}
        />
        <div className="intelligence-network pointer-events-none fixed inset-0 z-0 opacity-70" />
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.28),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_50%,#050816_100%)]" />
          <div className="absolute inset-0 hero-grid opacity-70" />
          <div className="scan-line" />
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex items-center gap-4">
              <img src="/heimdall-logo-gold-mark.svg" alt="HEIMDALL" className="h-12 w-12 rounded-2xl" />
              <div>
                <div className="text-xl font-semibold tracking-[0.34em] text-white">
                  HEIMDALL
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]/80">
                  Intelligence Group
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-8 text-sm text-white/68 lg:flex">
              {t.nav.map((item, i) => (
                <a key={item} className="transition hover:text-white" href={`#${t.navIds[i]}`}>
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={switchLanguage}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 transition hover:border-sky-300/40 hover:bg-white/10"
              >
                {language === 'ru' ? 'RU / EN' : 'EN / RU'}
              </button>

              <a
                href="#lead"
                className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:bg-sky-400 md:block"
              >
                {t.cta1}
              </a>
            </div>
          </div>
        </header>

        <section id="top" className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-36 md:pt-44">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] overflow-hidden">
            <div className="absolute left-[8%] top-[10%] h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[120px]" />
            <div className="absolute right-[0%] top-[0%] h-[390px] w-[390px] rounded-full bg-cyan-400/10 blur-[130px]" />
            <div className="absolute bottom-[5%] left-[38%] h-[360px] w-[360px] rounded-full bg-blue-700/10 blur-[130px]" />
          </div>

          <div className="grid items-center gap-16 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <div className="reveal inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-sky-100/80 shadow-[0_0_35px_rgba(37,99,235,0.14)]">
                <Eye className="h-4 w-4 text-sky-300" />
                {language === 'ru' ? 'Корпоративная разведка и проверка рисков' : 'Corporate Intelligence & Risk Advisory'}
              </div>

              <h1 className="reveal mt-9 max-w-6xl text-5xl font-semibold leading-[0.92] tracking-[-0.075em] text-white md:text-7xl xl:text-8xl">
                {language === 'ru' ? (
                  <>
                    Превращаем
                    <br />
                    неопределённость
                    <br />
                    <span className="bg-gradient-to-r from-sky-100 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                      в преимущество.
                    </span>
                  </>
                ) : (
                  <>
                    Turning
                    <br />
                    uncertainty
                    <br />
                    <span className="bg-gradient-to-r from-sky-100 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                      into advantage.
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-9 max-w-3xl text-lg leading-8 text-white/66 md:text-xl">
                {language === 'ru'
                  ? 'HEIMDALL помогает компаниям, инвесторам и кадровым агентствам выявлять скрытые риски до того, как они становятся проблемой.'
                  : 'HEIMDALL helps companies, investors and recruitment agencies detect hidden risks before they become liabilities.'}
              </p>

              <div className="mt-11 flex flex-col gap-4 sm:flex-row">
                <a href="#lead" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-8 py-5 text-base font-semibold text-white shadow-[0_0_55px_rgba(56,189,248,0.35)] transition hover:-translate-y-1 hover:bg-sky-400">
                  {t.cta1}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>

                <a href="#service-pages" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045] px-8 py-5 text-base font-semibold text-white/88 backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-300/35 hover:bg-white/[0.07]">
                  {language === 'ru' ? 'Посмотреть направления' : 'View services'}
                </a>
              </div>

              <div className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                {(language === 'ru'
                  ? [
                      ['40+', 'юрисдикций для анализа'],
                      ['24ч', 'быстрый старт проверки'],
                      ['NDA', 'по запросу клиента']
                    ]
                  : [
                      ['40+', 'jurisdictions covered'],
                      ['24h', 'rapid review start'],
                      ['NDA', 'available on request']
                    ]
                ).map(([value, label]) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition hover:border-sky-300/25 hover:bg-white/[0.06]">
                    <div className="text-4xl font-semibold tracking-[-0.04em] text-sky-100">{value}</div>
                    <div className="mt-3 text-sm leading-6 text-white/50">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[52px] bg-sky-500/10 blur-3xl" />

              <div className="light-sweep relative overflow-hidden rounded-[42px] border border-sky-300/20 bg-white/[0.045] p-5 shadow-[0_0_80px_rgba(14,165,233,0.08)] backdrop-blur-2xl">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="relative rounded-[34px] border border-white/10 bg-[#07101f]/90 p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-sky-200/70">
                        HEIMDALL INTELLIGENCE
                      </div>
                      <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                        {language === 'ru' ? 'Стратегическая карта рисков' : 'Strategic Risk Review'}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                      {language === 'ru' ? 'Активно' : 'Active'}
                    </div>
                  </div>

                  <div className="mt-8 space-y-5">
                    {(language === 'ru'
                      ? [
                          ['Контрагент', 'Средний риск', '72%'],
                          ['Кандидат', 'Низкий риск', '18%'],
                          ['Иностранная структура', 'Повышенный риск', '81%']
                        ]
                      : [
                          ['Counterparty', 'Moderate Risk', '72%'],
                          ['Candidate', 'Low Risk', '18%'],
                          ['Foreign Structure', 'Elevated Risk', '81%']
                        ]
                    ).map(([title, risk, score]) => (
                      <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                        <div className="flex items-center justify-between gap-6">
                          <div>
                            <div className="text-lg font-semibold">{title}</div>
                            <div className="mt-1 text-sm text-white/45">{risk}</div>
                          </div>

                          <div className="text-3xl font-semibold tracking-[-0.04em] text-sky-100">
                            {score}
                          </div>
                        </div>

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_22px_rgba(56,189,248,0.6)]" style={{ width: score }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-3xl border border-sky-300/15 bg-sky-300/10 p-6">
                    <div className="text-sm uppercase tracking-[0.24em] text-sky-300/70">
                      {language === 'ru' ? 'Конфиденциальный анализ' : 'Confidential Advisory'}
                    </div>

                    <div className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                      {language === 'ru' ? 'Аналитика для принятия решений.' : 'Decision-ready intelligence.'}
                    </div>

                    <p className="mt-4 text-sm leading-7 text-white/58">
                      {language === 'ru'
                        ? 'HEIMDALL объединяет проверочную методологию, анализ рисков и executive-level отчётность.'
                        : 'HEIMDALL combines investigative methodology, risk analysis and executive-level reporting.'}
                    </p>
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

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {language === 'ru' ? 'Интеллектуальный сканер' : 'Intelligence Scanner'}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                {language === 'ru' ? 'Визуализация аналитической проверки' : 'Live intelligence review simulation'}
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/62">
                {language === 'ru'
                  ? 'Демонстрационный модуль показывает, как HEIMDALL последовательно проходит ключевые зоны риска: владение, санкции, суды, репутацию и итоговую рекомендацию.'
                  : 'This preview demonstrates how HEIMDALL reviews core risk areas: ownership, sanctions, litigation, reputation and final recommendation.'}
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {scannerMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-sky-300/15 bg-sky-300/8 p-4">
                    <div className="text-2xl font-semibold text-sky-200">{value}</div>
                    <div className="mt-1 text-xs text-white/45">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[36px] border border-sky-300/20 bg-[#07101f]/80 p-8 shadow-premium backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.16),transparent_34%)]" />
              <div className="relative grid gap-4">
                {scannerSteps.map((step, index) => (
                  <div key={step} className="scanner-row flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4" style={{ animationDelay: `${index * 0.55}s` }}>
                    <div className="flex items-center gap-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.9)]" />
                      <span className="text-white/78">{step}</span>
                    </div>
                    <span className="text-sm text-sky-200/70">{language === 'ru' ? 'готово' : 'complete'}</span>
                  </div>
                ))}
              </div>
              <div className="scanner-beam" />
            </div>
          </div>
        </section>

        <section id="intelligence" className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="mb-12 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              {language === 'ru' ? 'Интерактивный аналитический контур' : 'Interactive Intelligence Environment'}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {language === 'ru'
                ? 'Так выглядит процесс выявления скрытых рисков'
                : 'A live view of how hidden risks are detected'}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/62">
              {language === 'ru'
                ? 'Этот блок показывает логику работы HEIMDALL: от первичного сканирования источников до карты связей, индекса риска и аналитической рекомендации.'
                : 'This section demonstrates the HEIMDALL workflow: from source scanning to relationship mapping, risk scoring and analyst recommendation.'}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#060d1b]/85 p-6 shadow-premium backdrop-blur-2xl">
              <div className="terminal-scan-line" />
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-sky-200/70">HEIMDALL TERMINAL</div>
                  <div className="mt-2 text-2xl font-semibold">
                    {language === 'ru' ? 'Живой аналитический сценарий' : 'Live intelligence scenario'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
                </div>
              </div>

              <div className="space-y-3 font-mono text-sm">
                {terminalLines.map(([time, line], index) => (
                  <div key={line} className="terminal-row rounded-2xl border border-white/10 bg-black/25 px-4 py-3" style={{ animationDelay: `${index * 420}ms` }}>
                    <span className="mr-4 text-sky-300/70">{time}</span>
                    <span className="text-white/78">&gt; {line}</span>
                    {index === terminalLines.length - 1 && <span className="terminal-cursor ml-1">|</span>}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {scannerMetrics.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-4">
                    <div className="text-xs text-white/45">{label}</div>
                    <div className="mt-1 text-xl font-semibold text-sky-100">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-sky-300/70">
                      {language === 'ru' ? 'Динамический индекс' : 'Dynamic risk score'}
                    </div>
                    <div className="mt-2 text-2xl font-semibold">72 / 100</div>
                  </div>
                  <div className="risk-orb flex h-24 w-24 items-center justify-center rounded-full border border-sky-300/30 bg-sky-300/10 text-2xl font-semibold text-sky-100">72</div>
                </div>
                <div className="space-y-4">
                  {riskMetrics.map(([label, percent, state]) => (
                    <div key={label}>
                      <div className="mb-2 flex justify-between text-sm text-white/60"><span>{label}</span><span>{state}</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="risk-bar h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600" style={{ width: percent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <div className="mb-5 text-xs uppercase tracking-[0.24em] text-sky-300/70">
                  {language === 'ru' ? 'Карта владения и связей' : 'Ownership and relationship map'}
                </div>
                <div className="relationship-stage relative h-64 rounded-3xl border border-white/10 bg-black/25">
                  <div className="node node-a">{language === 'ru' ? 'Компания' : 'Company'}</div>
                  <div className="node node-b">{language === 'ru' ? 'Директор' : 'Director'}</div>
                  <div className="node node-c">{language === 'ru' ? 'Холдинг' : 'Holding'}</div>
                  <div className="node node-d">{language === 'ru' ? 'Риск' : 'Risk'}</div>
                  <div className="link link-ab" />
                  <div className="link link-ac" />
                  <div className="link link-cd" />
                  <div className="radar-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="methodology" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="mb-10 max-w-3xl">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {language === 'ru' ? 'Методология HEIMDALL' : 'HEIMDALL Methodology'}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {language === 'ru' ? 'От сигналов к управленческому решению' : 'From signals to executive decision'}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {methodologySteps.map(([num, title, text]) => (
                <div key={num} className="rounded-3xl border border-white/10 bg-black/20 p-6 transition hover:-translate-y-1 hover:border-sky-300/30">
                  <div className="text-sm text-sky-300">{num}</div>
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="mb-12 max-w-3xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              {t.servicesKicker}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {t.servicesTitle}
            </h2>
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
                <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-200">
                  {t.recruitmentBadge}
                </div>

                <h2 className="mt-8 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                  {t.recruitmentTitle}
                </h2>

                <p className="mt-7 text-lg leading-8 text-white/68">
                  {t.recruitmentText}
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <a href="#lead" className="rounded-2xl bg-sky-500 px-7 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:-translate-y-1 hover:bg-sky-400">
                    {t.recruitmentCta1}
                  </a>
                  <a href="#lead" className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold transition hover:border-sky-300/35 hover:bg-white/10">
                    {t.recruitmentCta2}
                  </a>
                  <Link href="/recruitment-agencies" className="rounded-2xl border border-sky-300/20 bg-sky-300/10 px-7 py-4 text-center font-semibold text-sky-100 transition hover:border-sky-300/45 hover:bg-sky-300/15">
                    {language === 'ru' ? 'Страница для агентств' : 'Agency page'}
                  </Link>
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

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              {language === 'ru' ? 'Анонимные сценарии' : 'Anonymous case scenarios'}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {language === 'ru' ? 'Как выглядит ценность проверки до решения' : 'What risk intelligence changes before a decision'}
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {intelligenceCases.map(([title, text, result], index) => (
              <div key={title} className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:shadow-[0_0_70px_rgba(56,189,248,0.13)]">
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sky-400/10 blur-3xl transition group-hover:bg-sky-400/20" />
                <div className="relative">
                  <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-lg font-semibold text-sky-200">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
                  <div className="mt-7 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.07] p-4 text-sm leading-6 text-emerald-100/80">
                    {result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section id="recruitment-comic" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-12 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              {language === 'ru' ? 'Комикс для кадровых агентств' : 'Comic for recruitment agencies'}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {language === 'ru'
                ? 'Один кандидат может стоить агентству недель работы'
                : 'One candidate can cost an agency weeks of work'}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
              {language === 'ru'
                ? 'Короткая история о том, почему предварительная проверка кандидата до передачи клиенту защищает время, деньги и репутацию агентства.'
                : 'A short story showing why pre-screening a candidate before client submission protects agency time, money and reputation.'}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {(language === 'ru'
              ? [
                  ['/recruitment-comic/panel-01-client.svg', 'Клиент найден', 'Агентство получает сильный заказ на подбор.'],
                  ['/recruitment-comic/panel-02-search.svg', 'Недели поиска', 'Рекрутеры тратят время на звонки, отбор и интервью.'],
                  ['/recruitment-comic/panel-03-interview.svg', 'Кандидат выглядит идеально', 'Интервью проходит отлично. Все довольны.'],
                  ['/recruitment-comic/panel-04-rejection.svg', 'Служба безопасности разворачивает', 'После внутренней проверки всплывают критичные факторы риска.'],
                  ['/recruitment-comic/panel-05-risks.svg', 'Скрытые проблемы', 'Долговая нагрузка, репутационные факторы, вредные привычки и вопросы к воинскому учёту.'],
                  ['/recruitment-comic/panel-06-heimdall.svg', 'HEIMDALL проверяет заранее', 'Предварительный screening снижает риск отказа после оффера.']
                ]
              : [
                  ['/recruitment-comic/panel-01-client.svg', 'Client secured', 'The agency wins an important hiring mandate.'],
                  ['/recruitment-comic/panel-02-search.svg', 'Weeks of search', 'Recruiters spend time sourcing, screening and interviewing.'],
                  ['/recruitment-comic/panel-03-interview.svg', 'The candidate looks perfect', 'The interview goes well. Everyone is impressed.'],
                  ['/recruitment-comic/panel-04-rejection.svg', 'Security rejects the candidate', 'Critical risk factors appear during the internal review.'],
                  ['/recruitment-comic/panel-05-risks.svg', 'Hidden issues', 'Debt load, reputation factors, destructive habits and military-registration concerns.'],
                  ['/recruitment-comic/panel-06-heimdall.svg', 'HEIMDALL checks upfront', 'Pre-screening reduces the risk of post-offer rejection.']
                ]
            ).map(([src, title, text], index) => (
              <div key={src} className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] backdrop-blur-xl transition hover:-translate-y-2 hover:border-sky-300/35 hover:shadow-[0_0_55px_rgba(56,189,248,0.14)]">
                <div className="relative overflow-hidden bg-slate-950">
                  <img src={src} alt={title} className="aspect-[1.46] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[34px] border border-sky-300/20 bg-sky-300/8 p-6 backdrop-blur-xl md:flex md:items-center md:justify-between">
            <div>
              <div className="text-xl font-semibold">
                {language === 'ru'
                  ? 'Проверяйте кандидата до того, как клиент потратит время на финальный этап'
                  : 'Screen the candidate before the client spends time on the final stage'}
              </div>
              <div className="mt-2 text-sm leading-6 text-white/62">
                {language === 'ru'
                  ? 'HEIMDALL помогает выявлять red flags заранее и снижать риск отказа после оффера.'
                  : 'HEIMDALL helps reveal red flags early and reduce the risk of post-offer rejection.'}
              </div>
            </div>
            <a href="#lead" className="mt-5 inline-flex rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.25)] transition hover:bg-sky-400 md:mt-0">
              {language === 'ru' ? 'Проверить кандидата' : 'Screen a candidate'}
            </a>
          </div>
        </section>

        <section id="process" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {t.processKicker}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {t.processTitle}
              </h2>
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
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {t.reportKicker}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {t.reportTitle}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                {t.reportText}
              </p>
            </div>

            <div className="relative rounded-[34px] border border-white/10 bg-white/[0.055] p-5 shadow-premium backdrop-blur-2xl">
              <div className="absolute right-8 top-8 rotate-12 rounded-xl border border-red-300/30 px-4 py-2 text-xs uppercase tracking-[0.22em] text-red-200/80">
                {t.reportStamp}
              </div>
              <div className="rounded-[28px] bg-[#07101f] p-8">
                <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                  {t.reportLabel}
                </div>
                <h3 className="mt-4 text-3xl font-semibold">{t.reportHeading}</h3>

                <div className="mt-7 grid gap-3">
                  {reportSections.map(([num, title, text]) => (
                    <div key={num} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="flex items-center gap-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-300/10 text-xs text-sky-200">{num}</span>
                        <div>
                          <div className="font-semibold text-white">{title}</div>
                          <div className="mt-1 text-sm leading-6 text-white/50">{text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {t.reportCards.map(([a, b]) => (
                    <div key={a} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="text-sm text-white/45">{a}</div>
                      <div className="mt-2 text-xl font-semibold text-white">{b}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-2xl border border-sky-300/15 bg-sky-300/[0.06] p-5">
                  <div className="mb-4 text-sm text-sky-200/70">{language === 'ru' ? 'Карта связей' : 'Relationship map'}</div>
                  <div className="relative h-28 overflow-hidden rounded-xl border border-white/10 bg-black/25">
                    <div className="absolute left-[12%] top-[36%] h-3 w-3 rounded-full bg-sky-300 shadow-[0_0_22px_rgba(125,211,252,0.85)]" />
                    <div className="absolute left-[46%] top-[18%] h-3 w-3 rounded-full bg-sky-200 shadow-[0_0_22px_rgba(125,211,252,0.65)]" />
                    <div className="absolute left-[74%] top-[58%] h-3 w-3 rounded-full bg-blue-400 shadow-[0_0_22px_rgba(96,165,250,0.65)]" />
                    <div className="absolute left-[18%] top-[42%] h-px w-[30%] rotate-[-16deg] bg-sky-300/35" />
                    <div className="absolute left-[49%] top-[33%] h-px w-[30%] rotate-[22deg] bg-sky-300/35" />
                  </div>
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
                <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                  {t.trustTitle}
                </h2>
                <p className="mt-5 max-w-4xl text-lg leading-8 text-white/64">
                  {t.trustText}
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {t.trust.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-5 text-white/75">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-12 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              {language === 'ru' ? 'Для кого' : 'Who we serve'}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {language === 'ru'
                ? 'Проверки для принятия правильных решений'
                : 'Risk checks for better decisions'}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {audienceCards.map(([title, text]) => (
              <div key={title} className="light-sweep group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07]">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-sky-300/20 bg-sky-300/8 p-6 backdrop-blur-xl md:flex md:items-center md:justify-between">
            <div>
              <div className="text-lg font-semibold">
                {language === 'ru' ? 'Не уверены, какой формат проверки нужен?' : 'Not sure which review format you need?'}
              </div>
              <div className="mt-2 text-sm text-white/60">
                {language === 'ru' ? 'Опишите задачу — мы предложим подходящий объём анализа.' : 'Describe the case — we will suggest the right review scope.'}
              </div>
            </div>
            <a href="#lead" className="mt-5 inline-flex rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.24)] transition hover:bg-sky-400 md:mt-0">
              {t.cta1}
            </a>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {language === 'ru' ? 'Когда нужна проверка' : 'When to run a review'}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {language === 'ru'
                  ? 'Проверяйте до того, как риск становится затратой'
                  : 'Review before risk becomes a cost'}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                {language === 'ru'
                  ? 'HEIMDALL помогает принять решение до сделки, найма, партнёрства или инвестиции — когда ещё можно изменить условия, запросить документы или остановить процесс.'
                  : 'HEIMDALL helps you decide before a transaction, hire, partnership or investment — while there is still time to adjust terms, request documents or stop the process.'}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {triggerCards.map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                  <div className="mb-4 h-2 w-2 rounded-full bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.9)]" />
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl md:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                  {language === 'ru' ? 'Что получает клиент' : 'What clients receive'}
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  {language === 'ru'
                    ? 'Не просто данные. Выводы, red flags и рекомендация'
                    : 'Not just data. Findings, red flags and a recommendation'}
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/64">
                  {language === 'ru'
                    ? 'Отчёт собирается так, чтобы его можно было использовать внутри службы безопасности, юридического отдела, инвестиционного комитета или перед клиентом агентства.'
                    : 'The report is structured for use by security teams, legal departments, investment committees or client-facing advisory teams.'}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {deliverableCards.map(([title, text]) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
                    <CheckCircle2 className="mb-4 h-5 w-5 text-sky-300" />
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 rounded-3xl border border-sky-300/20 bg-sky-300/8 p-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-xl font-semibold">
                  {language === 'ru' ? 'Получите пример формата отчёта перед стартом' : 'Request a sample report format before starting'}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  {language === 'ru'
                    ? 'Покажем структуру отчёта и объясним, какие источники подойдут для вашей задачи.'
                    : 'We can show the report structure and explain which sources fit your case.'}
                </div>
              </div>
              <a href="#lead" className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 text-center font-semibold transition hover:border-sky-300/40 hover:bg-white/15">
                {t.cta2}
              </a>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="overflow-hidden rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-8 backdrop-blur-2xl md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                  {language === 'ru' ? 'Конфиденциальность и NDA' : 'Confidentiality & NDA'}
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  {language === 'ru'
                    ? 'Работаем с чувствительной информацией без лишнего шума'
                    : 'Sensitive intelligence handled without unnecessary exposure'}
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/64">
                  {language === 'ru'
                    ? 'По запросу работаем под NDA, ограничиваем доступ к материалам и передаём результат в формате, удобном для руководства, юридической службы или службы безопасности.'
                    : 'On request, we work under NDA, restrict access to case materials and deliver results in a format suitable for executives, legal teams or security departments.'}
                </p>
              </div>

              <div className="grid gap-4">
                {(language === 'ru'
                  ? ['NDA по запросу', 'Ограниченный доступ аналитиков', 'Конфиденциальная передача отчёта', 'Минимизация лишних данных']
                  : ['NDA on request', 'Restricted analyst access', 'Confidential report delivery', 'Data minimisation by default']
                ).map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5">
                    <LockKeyhole className="h-5 w-5 text-sky-300" />
                    <span className="text-white/78">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        <section id="demo" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="overflow-hidden rounded-[46px] border border-sky-300/20 bg-gradient-to-br from-sky-500/14 via-white/[0.045] to-transparent p-6 shadow-premium backdrop-blur-2xl md:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                  {language === 'ru' ? 'Интерактивная демонстрация' : 'Interactive Demo'}
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  {language === 'ru'
                    ? 'Запустите демо-анализ и посмотрите, как появляются риски'
                    : 'Run a demo scan and see how risk signals emerge'}
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/64">
                  {language === 'ru'
                    ? 'Демонстрация показывает, как HEIMDALL превращает разрозненные сигналы в управленческий вывод: источники, связи, риск-скоринг и рекомендация аналитика.'
                    : 'The demo shows how HEIMDALL turns fragmented signals into an executive conclusion: sources, relationships, risk scoring and analyst recommendation.'}
                </p>

                <button
                  type="button"
                  onClick={startDemo}
                  className="mt-8 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:-translate-y-1 hover:bg-sky-400"
                >
                  {language === 'ru' ? 'Запустить демонстрацию анализа' : 'Run demo analysis'}
                </button>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {(language === 'ru'
                    ? [['12', 'источников'], ['3', 'сигнала'], ['72', 'индекс риска']]
                    : [['12', 'sources'], ['3', 'signals'], ['72', 'risk index']]
                  ).map(([value, label]) => (
                    <div key={label} className="rounded-3xl border border-white/10 bg-black/25 p-5">
                      <div className="text-3xl font-semibold text-sky-200">{value}</div>
                      <div className="mt-1 text-sm text-white/50">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#06101f]/90 p-6 backdrop-blur-2xl">
                  <div className="demo-sweep" />
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-sky-300/70">HEIMDALL DEMO SCAN</div>
                      <div className="mt-2 text-2xl font-semibold">
                        {demoRunning
                          ? (language === 'ru' ? 'Анализ выполняется' : 'Analysis in progress')
                          : (language === 'ru' ? 'Готово к запуску' : 'Ready to run')}
                      </div>
                    </div>
                    <div className="risk-orb flex h-20 w-20 items-center justify-center rounded-full border border-sky-300/30 bg-sky-300/10 text-xl font-semibold text-sky-100">
                      {demoRunning ? Math.min(72, 18 + demoStep * 11) : 0}
                    </div>
                  </div>

                  <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-700"
                      style={{ width: `${demoRunning ? ((demoStep + 1) / demoSteps.length) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="space-y-3">
                    {demoSteps.map(([title, text, type], index) => {
                      const active = demoRunning && index <= demoStep
                      return (
                        <div
                          key={title}
                          className={`rounded-2xl border px-4 py-4 transition-all duration-500 ${
                            active
                              ? type === 'warning'
                                ? 'border-amber-300/25 bg-amber-300/10 text-white'
                                : 'border-sky-300/25 bg-sky-300/10 text-white'
                              : 'border-white/10 bg-white/[0.025] text-white/35'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <span className={`mt-1 h-2.5 w-2.5 rounded-full ${active ? 'bg-sky-300 shadow-[0_0_18px_rgba(125,211,252,0.9)]' : 'bg-white/20'}`} />
                            <div>
                              <div className="font-semibold">{title}</div>
                              <div className="mt-1 text-sm leading-6 opacity-70">{text}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {demoAlerts.map(([title, text], index) => (
                    <div
                      key={title}
                      className={`rounded-3xl border p-5 backdrop-blur-xl transition-all duration-500 ${
                        demoRunning && demoStep >= index + 3
                          ? 'border-amber-300/25 bg-amber-300/10'
                          : 'border-white/10 bg-white/[0.035]'
                      }`}
                    >
                      <div className="text-sm font-semibold text-sky-200">{title}</div>
                      <div className="mt-2 text-xs leading-5 text-white/58">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="packages" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-12 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              {language === 'ru' ? 'Форматы проверки' : 'Engagement formats'}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {language === 'ru'
                ? 'Три уровня анализа под разные задачи и сроки'
                : 'Three review levels for different scopes and timelines'}
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              {language === 'ru'
                ? 'Мы не публикуем фиксированные цены: объём проверки зависит от юрисдикций, глубины анализа, срочности и доступности источников.'
                : 'We do not publish fixed pricing: scope depends on jurisdictions, review depth, urgency and source availability.'}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {(language === 'ru'
              ? [
                  ['Express Check', 'Быстрая первичная проверка', ['Санкционные и репутационные сигналы', 'Базовая проверка судебных рисков', 'Краткий вывод аналитика']],
                  ['Standard Due Diligence', 'Комплексная проверка для сделки или найма', ['Структура владения и связи', 'Судебная и репутационная история', 'Индекс риска и рекомендации']],
                  ['Enhanced Intelligence Review', 'Углублённая аналитика для сложных кейсов', ['Международные источники', 'Скрытые связи и red flags', 'Расширенный executive report']]
                ]
              : [
                  ['Express Check', 'Fast initial risk review', ['Sanctions and reputation signals', 'Basic litigation screening', 'Concise analyst conclusion']],
                  ['Standard Due Diligence', 'Full review for transaction or hiring decisions', ['Ownership structure and affiliations', 'Litigation and reputation profile', 'Risk index and recommendations']],
                  ['Enhanced Intelligence Review', 'Deep intelligence review for complex cases', ['International source coverage', 'Hidden links and red flags', 'Expanded executive report']]
                ]
            ).map(([title, subtitle, items]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-sky-300/35">
                <div className="text-sm uppercase tracking-[0.2em] text-sky-300/70">{title}</div>
                <h3 className="mt-4 text-2xl font-semibold">{subtitle}</h3>
                <div className="mt-7 space-y-4">
                  {items.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-white/62">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <a href="#lead" className="mt-8 inline-flex rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold transition hover:border-sky-300/35 hover:bg-white/15">
                  {language === 'ru' ? 'Обсудить формат' : 'Discuss format'}
                </a>
              </div>
            ))}
          </div>
        </section>

        <HeimdallServices language={language} />

        <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-10 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {language === 'ru' ? 'Прайс-лист' : 'Pricing'}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {language === 'ru'
                  ? 'Прозрачная стоимость основных проверок'
                  : 'Clear pricing for core intelligence reviews'}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                {language === 'ru'
                  ? 'Базовые форматы проверки фиксированы. Сложные международные и конфиденциальные кейсы рассчитываются индивидуально.'
                  : 'Core review formats have fixed pricing. Complex international and confidential cases are scoped individually.'}
              </p>
            </div>

            <div className="grid gap-3">
              {(language === 'ru'
                ? [
                    ['Проверка кандидата', 'от 24 900 ₽'],
                    ['Проверка контрагента', 'от 49 900 ₽'],
                    ['Комплексная проверка бизнеса', 'от 89 900 ₽']
                  ]
                : [
                    ['Candidate Screening', 'from $290'],
                    ['Counterparty Intelligence', 'from $590'],
                    ['Enhanced Due Diligence', 'from $1,200']
                  ]
              ).map(([name, price]) => (
                <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                  <span className="text-white/78">{name}</span>
                  <span className="font-semibold text-sky-200">{price}</span>
                </div>
              ))}

              <Link
                href={language === 'ru' ? '/pricing' : '/pricing-en'}
                className="mt-3 inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.24)] transition hover:bg-sky-400"
              >
                {language === 'ru' ? 'Открыть полный прайс-лист' : 'Open full pricing'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="lead" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-12 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-6 backdrop-blur-2xl md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {t.leadKicker}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {t.leadTitle}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                {t.leadText}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input name="name" value={form.name} onChange={handleChange} placeholder={t.form.name} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
                <input name="company" value={form.company} onChange={handleChange} placeholder={t.form.company} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <input name="email" value={form.email} onChange={handleChange} type="email" placeholder={t.form.email} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder={t.form.phone} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
              </div>

              <select name="check_type" value={form.check_type} onChange={handleChange} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition focus:border-sky-300/45">
                {t.checkTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <textarea name="comment" value={form.comment} onChange={handleChange} placeholder={t.form.comment} rows={5} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/50">
                {language === 'ru' ? (
                  <>
                    Отправляя заявку, вы соглашаетесь с обработкой данных и принимаете{' '}
                    <a href="/privacy" className="text-sky-300 hover:text-sky-200">политику конфиденциальности</a>
                    {' '}и{' '}
                    <a href="/terms" className="text-sky-300 hover:text-sky-200">условия использования</a>.
                  </>
                ) : (
                  <>
                    By submitting this request, you agree to data processing and accept the{' '}
                    <a href="/privacy" className="text-sky-300 hover:text-sky-200">privacy policy</a>
                    {' '}and{' '}
                    <a href="/terms" className="text-sky-300 hover:text-sky-200">terms of use</a>.
                  </>
                )}
              </div>

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

          <div className="mx-auto mt-10 flex max-w-7xl flex-wrap gap-5 border-t border-white/10 pt-6 text-sm text-white/45">
            <a href="/privacy" className="transition hover:text-sky-200">
              {language === 'ru' ? 'Политика конфиденциальности' : 'Privacy Policy'}
            </a>
            <a href="/terms" className="transition hover:text-sky-200">
              {language === 'ru' ? 'Условия использования' : 'Terms of Use'}
            </a>
            <span>{language === 'ru' ? 'NDA по запросу' : 'NDA available on request'}</span>
          </div>

          <a href="#lead" className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl bg-sky-500 px-6 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.34)] md:hidden">
            {t.mobileCta}
          </a>
          <a href="https://t.me/heimdall_risk" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 hidden rounded-full border border-sky-300/30 bg-sky-500/90 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.34)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-sky-400 md:block">
            Telegram
          </a>
        </footer>
      </main>
    </>
  )
}
