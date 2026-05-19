import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'

const services = {
  "ru": {
    "subtitle": "Корпоративная разведка и проверка рисков",
    "kicker": "AML/KYC проверки",
    "title": "AML/KYC анализ для клиентов, партнёров и сделок",
    "description": "HEIMDALL помогает выявлять санкционные, комплаенс, финансовые и репутационные риски до начала взаимодействия или в рамках усиленной проверки.",
    "cta": "Запросить AML/KYC проверку",
    "back": "На главную",
    "cardTitle": "Фокус проверки",
    "cardItems": [
      "санкционные списки и негативные совпадения",
      "политически значимые лица и связанные стороны",
      "комплаенс-сигналы и adverse media",
      "структура владения и бенефициарный контур"
    ],
    "blocks": [
      [
        "Для банков и финтеха",
        "Поддержка риск-ориентированного подхода при проверке клиентов и партнёров."
      ],
      [
        "Для бизнеса",
        "Снижение риска взаимодействия с проблемными компаниями или лицами."
      ],
      [
        "Результат",
        "Структурированный отчёт с risk score, findings и рекомендацией."
      ]
    ],
    "finalTitle": "Проведите AML/KYC проверку до начала сотрудничества",
    "finalText": "Опишите субъект проверки, юрисдикции и цель анализа.",
    "metaTitle": "AML/KYC проверки — HEIMDALL",
    "metaDescription": "AML/KYC анализ, санкционные проверки, PEP, adverse media и комплаенс-риски."
  },
  "en": {
    "subtitle": "Corporate intelligence and risk advisory",
    "kicker": "AML/KYC Reviews",
    "title": "AML/KYC analysis for clients, partners and transactions",
    "description": "HEIMDALL helps identify sanctions, compliance, financial crime and reputation risks before engagement or as part of enhanced due diligence.",
    "cta": "Request AML/KYC review",
    "back": "Back to home",
    "cardTitle": "Review focus",
    "cardItems": [
      "sanctions lists and negative matches",
      "politically exposed persons and related parties",
      "compliance signals and adverse media",
      "ownership structure and beneficial ownership context"
    ],
    "blocks": [
      [
        "For banks and fintech",
        "Supports risk-based review of clients, counterparties and partners."
      ],
      [
        "For business",
        "Reduces exposure to problematic companies or individuals."
      ],
      [
        "Output",
        "Structured report with risk score, findings and recommendation."
      ]
    ],
    "finalTitle": "Run AML/KYC before engagement begins",
    "finalText": "Describe the subject, jurisdictions and review objective.",
    "metaTitle": "AML/KYC Reviews — HEIMDALL",
    "metaDescription": "AML/KYC analysis, sanctions screening, PEP, adverse media and compliance risk review."
  }
}

export default function ServicePage() {
  const [language, setLanguage] = useState('ru')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')
    const savedLang = window.localStorage.getItem('heimdall_lang')
    const nextLang = urlLang === 'en' || savedLang === 'en' ? 'en' : 'ru'

    window.localStorage.setItem('heimdall_lang', nextLang)
    setLanguage(nextLang)
  }, [])

  const switchLanguage = () => {
    const next = language === 'ru' ? 'en' : 'ru'

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('heimdall_lang', next)
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState({}, '', url.toString())
    }

    setLanguage(next)
  }
  const t = services[language]


  const relatedServices = [
    [
        "/counterparty-check",
        "Проверка контрагентов",
        "Counterparty Checks"
    ],
    [
        "/candidate-screening",
        "Проверка кандидатов",
        "Candidate Screening"
    ],
    [
        "/due-diligence",
        "Комплексная проверка бизнеса",
        "Business Due Diligence"
    ],
    [
        "/foreign-company-check",
        "Проверка иностранных компаний",
        "Foreign Company Review"
    ]
]

  const faqItems = language === 'ru'
    ? [
        ['Сколько занимает проверка?', 'Срок зависит от юрисдикций, глубины анализа и доступности источников. После заявки мы предложим реалистичный срок.'],
        ['Какие данные нужны для старта?', 'Обычно достаточно названия компании или имени кандидата, страны, контекста проверки и желаемой глубины анализа.'],
        ['Можно ли работать под NDA?', 'Да. По запросу взаимодействие может проходить под NDA и с ограниченным доступом к материалам.'],
        ['Что входит в итоговый отчёт?', 'Индекс риска, краткое заключение, выявленные факты, red flags и рекомендация по дальнейшим действиям.']
      ]
    : [
        ['How long does a review take?', 'Timing depends on jurisdictions, depth of analysis and source availability. We suggest a realistic timeline after the request.'],
        ['What data is needed to start?', 'Usually a company name or candidate name, country, review context and desired depth are enough to begin.'],
        ['Can you work under NDA?', 'Yes. On request, engagement can be handled under NDA with restricted access to case materials.'],
        ['What is included in the final report?', 'Risk index, executive summary, findings, red flags and a recommendation for next steps.']
      ]

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_50%,#050816_100%)]" />
          <div className="absolute inset-0 hero-grid opacity-50" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <Link href={language === 'ru' ? '/' : '/?lang=en'} className="group flex items-center gap-4">
              <img src="/heimdall-logo-gold-mark.svg" alt="HEIMDALL" className="h-12 w-12 rounded-2xl" />
              <div>
                <div className="text-xl font-semibold tracking-[0.34em] text-white">HEIMDALL</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]/80">Intelligence Group</div>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <button onClick={switchLanguage} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                {language === 'ru' ? 'RU / EN' : 'EN / RU'}
              </button>
              <Link href={language === 'ru' ? '/#lead' : '/?lang=en#lead'} className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold md:block">
                {t.cta}
              </Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-8 text-sm text-white/45">
          <Link href="/" className="transition hover:text-sky-200">
            {language === 'ru' ? 'Главная' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#service-pages" className="transition hover:text-sky-200">
            {language === 'ru' ? 'Услуги' : 'Services'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{t.kicker}</span>
        </div>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-200">
                {t.kicker}
              </div>
              <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-7xl">
                {t.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/66 md:text-xl">
                {t.description}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href={language === 'ru' ? '/#lead' : '/?lang=en#lead'} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:bg-sky-400">
                  {t.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={language === 'ru' ? '/' : '/?lang=en'} className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold transition hover:border-sky-300/35">
                  {t.back}
                </Link>
                <a href="/heimdall-presentation-ru-en.pdf" className="inline-flex items-center justify-center rounded-2xl border border-sky-300/25 bg-sky-300/10 px-7 py-4 font-semibold text-sky-100 transition hover:border-sky-300/45">
                  {language === 'ru' ? 'Скачать презентацию' : 'Download presentation'}
                </a>
              </div>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-6 shadow-premium backdrop-blur-2xl">
              <div className="rounded-[28px] bg-[#07101f]/90 p-7">
                <div className="text-xs uppercase tracking-[0.25em] text-sky-300/70">HEIMDALL REVIEW</div>
                <div className="mt-5 text-3xl font-semibold">{t.cardTitle}</div>
                <div className="mt-7 space-y-4">
                  {t.cardItems.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-white/70">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {t.blocks.map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl">
                <CheckCircle2 className="mb-5 h-5 w-5 text-sky-300" />
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {language === 'ru' ? 'Вопросы и ответы' : 'FAQ'}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                {language === 'ru' ? 'Частые вопросы по проверке' : 'Common questions about this review'}
              </h2>
            </div>
            <div className="space-y-4">
              {faqItems.map(([question, answer]) => (
                <div key={question} className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                  <h3 className="text-lg font-semibold">{question}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="mb-8">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                {language === 'ru' ? 'Связанные услуги' : 'Related services'}
              </div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                {language === 'ru' ? 'Другие направления HEIMDALL' : 'Other HEIMDALL services'}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedServices.map(([href, ruLabel, enLabel]) => (
                <Link key={href} href={href} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-5 py-4 transition hover:border-sky-300/35 hover:bg-white/[0.06]">
                  <span>{language === 'ru' ? ruLabel : enLabel}</span>
                  <ArrowRight className="h-4 w-4 text-sky-300 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-8 backdrop-blur-2xl md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.04em]">{t.finalTitle}</h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/64">{t.finalText}</p>
              </div>
              <Link href={language === 'ru' ? '/#lead' : '/?lang=en#lead'} className="rounded-2xl bg-sky-500 px-7 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                {t.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
