import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'

const services = {
  "ru": {
    "subtitle": "Корпоративная разведка и проверка рисков",
    "kicker": "Проверка кандидатов",
    "title": "Проверка кандидатов до оффера и передачи клиенту",
    "description": "HEIMDALL помогает заранее выявить репутационные, биографические, корпоративные и конфликтные риски кандидата, особенно для чувствительных и руководящих позиций.",
    "cta": "Проверить кандидата",
    "back": "На главную",
    "cardTitle": "Что анализируем",
    "cardItems": [
      "биография и профессиональный контекст",
      "репутационные сигналы и публичный фон",
      "конфликты интересов и скрытые связи",
      "иностранный опыт, чувствительные должности и red flags"
    ],
    "blocks": [
      [
        "Для агентств",
        "Снижает риск отказа кандидата службой безопасности клиента после финального этапа."
      ],
      [
        "Для работодателей",
        "Помогает принять решение до оффера, доступа к данным или назначения на роль."
      ],
      [
        "Результат",
        "Краткое заключение, выявленные факты, уровень риска и рекомендация."
      ]
    ],
    "finalTitle": "Проверьте кандидата до того, как процесс найма сорвётся",
    "finalText": "Опишите роль, уровень чувствительности позиции и срочность проверки.",
    "metaTitle": "Проверка кандидатов — HEIMDALL",
    "metaDescription": "Background screening, проверка кандидатов, репутационных рисков, конфликтов интересов и биографии."
  },
  "en": {
    "subtitle": "Corporate intelligence and risk advisory",
    "kicker": "Candidate Screening",
    "title": "Candidate screening before offer or client submission",
    "description": "HEIMDALL helps identify reputation, biography, corporate and conflict-of-interest risks before a candidate reaches a sensitive or leadership role.",
    "cta": "Screen a candidate",
    "back": "Back to home",
    "cardTitle": "What we analyse",
    "cardItems": [
      "biography and professional context",
      "reputation signals and public background",
      "conflicts of interest and hidden affiliations",
      "foreign work history, sensitive roles and red flags"
    ],
    "blocks": [
      [
        "For agencies",
        "Reduces the risk of finalist rejection by the client’s internal security team."
      ],
      [
        "For employers",
        "Supports decision-making before offer, data access or appointment."
      ],
      [
        "Output",
        "Executive summary, findings, risk level and recommendation."
      ]
    ],
    "finalTitle": "Screen the candidate before hiring risk disrupts the process",
    "finalText": "Describe the role, sensitivity level and timeline. We will suggest a suitable scope.",
    "metaTitle": "Candidate Screening — HEIMDALL",
    "metaDescription": "Background screening for candidates, reputation risks, conflicts of interest and biography checks."
  }
}

export default function ServicePage() {
  const [language, setLanguage] = useState('ru')
  const t = services[language]

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
            <Link href="/" className="group">
              <div className="text-xl font-semibold tracking-[0.34em] text-white">HEIMDALL</div>
              <div className="mt-1 text-[11px] text-sky-200/70">{t.subtitle}</div>
            </Link>
            <div className="flex items-center gap-3">
              <button onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                {language === 'ru' ? 'RU / EN' : 'EN / RU'}
              </button>
              <Link href="/#lead" className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold md:block">
                {t.cta}
              </Link>
            </div>
          </div>
        </header>

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
                <Link href="/#lead" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:bg-sky-400">
                  {t.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold transition hover:border-sky-300/35">
                  {t.back}
                </Link>
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
          <div className="rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-8 backdrop-blur-2xl md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-4xl font-semibold tracking-[-0.04em]">{t.finalTitle}</h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/64">{t.finalText}</p>
              </div>
              <Link href="/#lead" className="rounded-2xl bg-sky-500 px-7 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                {t.cta}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
