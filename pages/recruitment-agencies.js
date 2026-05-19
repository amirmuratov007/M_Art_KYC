import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, ShieldCheck, Users, BriefcaseBusiness, LockKeyhole, AlertTriangle } from 'lucide-react'

const copy = {
  ru: {
    metaTitle: 'Проверка кандидатов для рекрутинговых агентств — HEIMDALL',
    metaDescription: 'Background screening и проверка кандидатов для рекрутинговых агентств перед передачей финалиста клиенту.',
    subtitle: 'Проверка кандидатов для рекрутинговых агентств',
    badge: 'Для кадровых и executive search агентств',
    title: 'Ваш кандидат прошёл интервью. Но пройдёт ли он проверку службы безопасности клиента?',
    lead: 'HEIMDALL помогает рекрутинговым агентствам заранее выявлять риски кандидатов до передачи финалиста клиенту: репутация, биография, конфликты интересов, долговая нагрузка, иностранный опыт и чувствительные факторы.',
    cta1: 'Проверить кандидата',
    cta2: 'Получить консультацию',
    painTitle: 'Почему агентства теряют деньги на финальном этапе',
    pains: [
      ['Время команды уже потрачено', 'Поиск, первичный отбор, интервью и коммуникации уже оплачены временем рекрутеров.'],
      ['Кандидат разворачивается после оффера', 'Служба безопасности клиента находит факторы, которые можно было выявить раньше.'],
      ['Портятся отношения с клиентом', 'Клиент начинает сомневаться в качестве подбора и глубине предварительного отбора.'],
      ['Репутация агентства под ударом', 'Один неудачный финалист может снизить доверие к агентству в будущих проектах.']
    ],
    comicTitle: 'Типичный сценарий без предварительной проверки кандидата',
    comic: [
      ['01', 'Клиент найден', 'Агентство получает хороший заказ на подбор.'],
      ['02', 'Недели поиска', 'Команда проводит sourcing, интервью и согласования.'],
      ['03', 'Финалист готов', 'Кандидат выглядит сильным и подходит клиенту.'],
      ['04', 'Служба безопасности останавливает процесс', 'После внутренней проверки появляются критичные тревожные сигналы.'],
      ['05', 'Потери агентства', 'Время потеряно, клиент недоволен, поиск начинается заново.'],
      ['06', 'HEIMDALL снижает риск', 'Screening до передачи клиенту помогает выявить проблемы заранее.']
    ],
    servicesTitle: 'Что можно проверить до передачи кандидата клиенту',
    services: [
      'Предварительная проверка кандидатов',
      'Проверка руководителей',
      'Проверка топ-менеджеров',
      'Проверка биографии кандидата',
      'Проверка репутационных рисков',
      'Проверка конфликтов интересов',
      'Проверка иностранного опыта работы',
      'Проверка для чувствительных должностей'
    ],
    processTitle: 'Как это работает',
    process: [
      ['01', 'Вы передаёте базовые данные', 'Имя кандидата, позиция, страна, контекст и уровень чувствительности роли.'],
      ['02', 'HEIMDALL проводит screening', 'Аналитики проверяют открытые, международные и специализированные источники.'],
      ['03', 'Вы получаете краткий отчёт', 'Risk score, ключевые findings, red flags и рекомендация.'],
      ['04', 'Вы решаете, вести ли кандидата дальше', 'Агентство снижает риск отказа клиента на финальном этапе.']
    ],
    deliverTitle: 'Что получает агентство',
    deliver: [
      'краткий конфиденциальный отчёт',
      'понятная оценка риска',
      'тревожные сигналы до передачи клиенту',
      'рекомендация по дальнейшим действиям',
      'более сильная позиция перед клиентом',
      'снижение риска репутационных потерь'
    ],
    finalTitle: 'Проверьте кандидата до того, как клиент потратит время на финальный этап',
    finalText: 'Оставьте заявку, и мы предложим подходящий формат проверки под роль, срочность и чувствительность позиции.',
    back: 'На главную',
    download: 'Скачать презентацию'
  },
  en: {
    metaTitle: 'Candidate Screening for Recruitment Agencies — HEIMDALL',
    metaDescription: 'Background screening for recruitment and executive search agencies before submitting finalists to clients.',
    subtitle: 'Background Screening for Recruitment Agencies',
    badge: 'For recruitment and executive search agencies',
    title: 'Your candidate passed the interview. But will they pass the client’s security review?',
    lead: 'HEIMDALL helps recruitment agencies identify candidate risks before submitting finalists to clients: reputation, biography, conflicts of interest, debt exposure, foreign experience and sensitive risk factors.',
    cta1: 'Screen a candidate',
    cta2: 'Get a consultation',
    painTitle: 'Why agencies lose money at the final stage',
    pains: [
      ['Team time is already spent', 'Sourcing, screening, interviews and coordination have already consumed recruiter time.'],
      ['The candidate is rejected after offer', 'The client’s security team finds risk factors that could have been detected earlier.'],
      ['Client relationship is damaged', 'The client starts questioning selection quality and pre-screening depth.'],
      ['Agency reputation is exposed', 'One failed finalist can reduce trust in future searches.']
    ],
    comicTitle: 'Typical scenario without pre-screening',
    comic: [
      ['01', 'Client secured', 'The agency wins a strong hiring mandate.'],
      ['02', 'Weeks of search', 'The team runs sourcing, interviews and coordination.'],
      ['03', 'Finalist ready', 'The candidate looks strong and fits the client.'],
      ['04', 'Security stops the process', 'Critical red flags appear during internal review.'],
      ['05', 'Agency loses value', 'Time is lost, the client is unhappy and search restarts.'],
      ['06', 'HEIMDALL lowers the risk', 'Screening before client submission reveals issues earlier.']
    ],
    servicesTitle: 'What can be checked before client submission',
    services: [
      'Предварительная проверка кандидатов',
      'Проверка руководителей',
      'Senior executive checks',
      'Candidate biography review',
      'Reputation risk review',
      'Conflict of interest screening',
      'Foreign work history review',
      'Screening for sensitive positions'
    ],
    processTitle: 'How it works',
    process: [
      ['01', 'You share basic details', 'Candidate name, role, country, context and sensitivity level.'],
      ['02', 'HEIMDALL runs screening', 'Analysts review open, international and specialist sources.'],
      ['03', 'You receive a concise report', 'Risk score, key findings, red flags and recommendation.'],
      ['04', 'You decide whether to proceed', 'The agency reduces the risk of final-stage client rejection.']
    ],
    deliverTitle: 'What the agency receives',
    deliver: [
      'concise confidential report',
      'clear risk score',
      'red flags before client submission',
      'recommendation for next steps',
      'stronger position with the client',
      'lower reputation risk'
    ],
    finalTitle: 'Screen the candidate before the client spends time on the final stage',
    finalText: 'Submit a request and we will suggest the right review format for the role, urgency and sensitivity level.',
    back: 'Back to home',
    download: 'Download presentation'
  }
}

export default function RecruitmentAgencies() {
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
  const t = copy[language]

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta property="og:title" content={t.metaTitle} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(37,99,235,0.26),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_50%,#050816_100%)]" />
          <div className="absolute inset-0 hero-grid opacity-60" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <Link href={language === 'ru' ? '/' : '/?lang=en'} className="flex items-center gap-4">
              <img src="/heimdall-logo-gold-mark.svg" alt="HEIMDALL" className="h-12 w-12 rounded-2xl" />
              <div>
                <div className="text-xl font-semibold tracking-[0.34em]">HEIMDALL</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]/80">Intelligence Group</div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <button onClick={switchLanguage} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                {language === 'ru' ? 'RU / EN' : 'EN / RU'}
              </button>
              <Link href={language === 'ru' ? '/#lead' : '/?lang=en#lead'} className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold md:block">
                {t.cta1}
              </Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-200">
                {t.badge}
              </div>
              <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-7xl">
                {t.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-white/66 md:text-xl">
                {t.lead}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href={language === 'ru' ? '/#lead' : '/?lang=en#lead'} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:bg-sky-400">
                  {t.cta1}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={language === 'ru' ? '/' : '/?lang=en'} className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold transition hover:border-sky-300/35">
                  {t.back}
                </Link>
              </div>
            </div>

            <div className="rounded-[38px] border border-sky-300/20 bg-white/[0.045] p-6 shadow-premium backdrop-blur-2xl">
              <div className="rounded-[30px] bg-[#07101f]/90 p-7">
                <div className="text-xs uppercase tracking-[0.25em] text-sky-300/70">RECRUITMENT RISK</div>
                <div className="mt-5 grid gap-4">
                  {t.pains.map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                        <div>
                          <div className="font-semibold">{title}</div>
                          <div className="mt-1 text-sm leading-6 text-white/58">{text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.comicTitle}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {language === 'ru' ? 'Как агентство теряет время, деньги и доверие клиента' : 'A visual story without external images'}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.comic.map(([num, title, text]) => (
              <div key={num} className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-sky-300/35">
                <div className="absolute right-5 top-5 text-5xl opacity-20">
                  {num === '01' ? '🤝' : num === '02' ? '🔎' : num === '03' ? '⭐' : num === '04' ? '⛔' : num === '05' ? '⚠️' : '🛡️'}
                </div>
                <div className="mb-7 inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sm text-sky-200">{num}</div>
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.servicesTitle}</div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                  {language === 'ru' ? 'Проверка до передачи финалиста клиенту' : 'Screening before finalist submission'}
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {t.services.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/25 p-5">
                    <CheckCircle2 className="mb-4 h-5 w-5 text-sky-300" />
                    <div className="font-semibold">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.processTitle}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              {language === 'ru' ? 'Простой процесс для агентства' : 'A simple agency workflow'}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {t.process.map(([num, title, text]) => (
              <div key={num} className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <div className="text-sm text-sky-300">{num}</div>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-10 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.deliverTitle}</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.finalTitle}</h2>
              <p className="mt-6 text-lg leading-8 text-white/64">{t.finalText}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href={language === 'ru' ? '/#lead' : '/?lang=en#lead'} className="rounded-2xl bg-sky-500 px-7 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                  {t.cta1}
                </Link>
                <a href={language === 'ru' ? '/heimdall-presentation-ru.pdf' : '/heimdall-presentation-en.pdf'} className="rounded-2xl border border-white/10 bg-white/10 px-7 py-4 text-center font-semibold transition hover:border-sky-300/35">
                  {language === 'ru' ? 'Скачать презентацию' : 'Download presentation'}
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              {t.deliver.map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5">
                  <ShieldCheck className="h-5 w-5 text-sky-300" />
                  <span className="text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
