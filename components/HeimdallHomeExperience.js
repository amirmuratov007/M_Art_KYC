import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ShieldCheck, FileSearch, Network, UserSearch, LockKeyhole, ClipboardCheck, CheckCircle2, BarChart3 } from 'lucide-react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { HeimdallFrame, SectionHeader, DecisionCard } from '@/components/HeimdallFrame'

const ru = {
  lang: 'ru',
  title: 'HEIMDALL | Корпоративная разведка и проверка рисков',
  description: 'HEIMDALL помогает собственникам и компаниям проверять контрагентов, кандидатов, бенефициаров, поставщиков и бизнес-риски до решения.',
  canonical: 'https://www.heimdall-group.ru/',
  eyebrow: 'Corporate intelligence for decisions',
  h1: 'Проверка рисков для сделок, закупок, найма и партнерств',
  lead: 'HEIMDALL превращает разрозненные факты, связи, реестры, судебные сигналы и репутационный фон в понятный управленческий вывод: работать, ограничить риск, проверить глубже или остановиться.',
  primary: 'Описать объект проверки',
  secondary: 'Посмотреть примеры отчетов',
  secondaryHref: '/sample-reports',
  trust: ['Решение вместо справки', 'Закрытый формат', 'Собственный риск-контур'],
  metrics: [
    ['24-72 часа', 'первичный вывод по стандартным задачам'],
    ['1000+ источников', 'реестры, суды, медиа, связи, комплаенс'],
    ['4 сценария', 'сделка, аванс, найм, партнерство']
  ],
  products: [
    ['Проверка контрагента', 'Суды, владельцы, бенефициары, связи, санкции и репутационный фон.', '/proverka-kontragenta', FileSearch],
    ['Проверка кандидата', 'Конфликт интересов, цифровой след, репутация и риски для чувствительной роли.', '/proverka-kandidatov', UserSearch],
    ['Due Diligence', 'Проверка бизнеса, сделки, актива, партнера или международной структуры.', '/due-diligence-russia', Network],
    ['Business Support', 'Постоянный контур проверок, ИБ, расследований и риск-мониторинга.', '/business-support', ShieldCheck]
  ],
  scenarios: [
    ['Перед договором', 'Понять, кто реально стоит за контрагентом и какие риски придут вместе с ним.'],
    ['Перед авансом', 'Проверить поставщика, реквизиты, производителя, посредника и признаки фиктивности.'],
    ['Перед доступом', 'Оценить кандидата на роль с деньгами, данными, закупками или управлением.'],
    ['Перед конфликтом', 'Собрать факты, связи и гипотезы до юридического или управленческого решения.']
  ],
  method: [
    ['01', 'Идентификация объекта', 'Фиксируем компанию, человека, сайт, документы, реквизиты и связанные сущности.'],
    ['02', 'Проверка контуров', 'Смотрим судебные, корпоративные, санкционные, репутационные и цифровые сигналы.'],
    ['03', 'Связи и контекст', 'Ищем аффилированность, скрытый контроль, номинальность и конфликт интересов.'],
    ['04', 'Вывод для решения', 'Собираем отчет: факты, риск, влияние, ограничения, следующий шаг.']
  ],
  cases: [
    ['Поставщик из Китая', 'как аванс остановили до рискованной оплаты', '/cases/china-supplier-advance-payment'],
    ['Закупочный конфликт', 'скрытая связка подрядчика и посредника', '/cases/procurement-conflict-of-interest'],
    ['Санкционный риск', 'нет прямого совпадения, но риск есть', '/cases/sanctions-risk-without-direct-match']
  ],
  ctaTitle: 'Не знаете, какую проверку выбрать?',
  ctaText: 'Опишите ситуацию коротко. Мы предложим формат, срок и достаточную глубину проверки.',
  cta: 'Подобрать формат'
}

const en = {
  lang: 'en',
  title: 'HEIMDALL | Corporate intelligence and risk review',
  description: 'HEIMDALL helps owners and companies assess counterparties, candidates, beneficial owners, suppliers and business risks before decisions are made.',
  canonical: 'https://www.heimdall-group.ru/en',
  eyebrow: 'Corporate intelligence for decisions',
  h1: 'Risk review for deals, procurement, hiring and partnerships',
  lead: 'HEIMDALL turns scattered facts, links, registries, litigation signals and reputation context into a management conclusion: proceed, limit exposure, review deeper or stop.',
  primary: 'Describe review object',
  secondary: 'View sample reports',
  secondaryHref: '/sample-reports-en',
  trust: ['Decision over extract', 'Confidential workflow', 'Dedicated risk perimeter'],
  metrics: [
    ['24-72 hours', 'initial findings for standard cases'],
    ['1000+ sources', 'registries, courts, media, links, compliance'],
    ['4 scenarios', 'deal, payment, hiring, partnership']
  ],
  products: [
    ['Counterparty review', 'Litigation, ownership, beneficial owners, links, sanctions and reputation context.', '/corporate-intelligence', FileSearch],
    ['Executive screening', 'Conflict of interest, digital footprint, reputation and sensitive role risk.', '/executive-background-check-en', UserSearch],
    ['Due diligence', 'Review of business, transaction, asset, partner or international structure.', '/due-diligence-russia', Network],
    ['Business support', 'Ongoing review perimeter, infosec, investigations and risk monitoring.', '/business-support-en', ShieldCheck]
  ],
  scenarios: [
    ['Before contract', 'Understand who really stands behind the counterparty and what risks follow.'],
    ['Before payment', 'Check supplier, bank details, manufacturer, intermediary and shell patterns.'],
    ['Before access', 'Assess a candidate for money, data, procurement or management exposure.'],
    ['Before conflict', 'Structure facts, links and hypotheses before legal or management action.']
  ],
  method: [
    ['01', 'Object identification', 'Fix company, person, website, documents, bank details and related entities.'],
    ['02', 'Risk perimeter check', 'Review litigation, corporate, sanctions, reputation and digital signals.'],
    ['03', 'Links and context', 'Look for affiliation, hidden control, nominee patterns and conflict of interest.'],
    ['04', 'Decision output', 'Build a report: facts, risk, impact, limits and next action.']
  ],
  cases: [
    ['China supplier', 'risky advance payment stopped before transfer', '/cases-en/china-supplier-advance-payment'],
    ['Procurement conflict', 'hidden contractor and intermediary link', '/cases-en/procurement-conflict-of-interest'],
    ['Sanctions exposure', 'no direct match, but risk was present', '/cases-en/sanctions-risk-without-direct-match']
  ],
  ctaTitle: 'Not sure which review scope you need?',
  ctaText: 'Briefly describe the situation. We will suggest the format, timing and sufficient depth.',
  cta: 'Request scope'
}

export default function HeimdallHomeExperience({ language = 'ru' }) {
  const content = language === 'en' ? en : ru
  const isRu = content.lang === 'ru'
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={content.canonical} />
      </Head>

      <HeimdallFrame>
        <HeimdallNav language={content.lang} />

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d6a84f]/25 bg-[#d6a84f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3d58a]">
              <LockKeyhole className="h-4 w-4" />
              {content.eyebrow}
            </div>
            <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              {content.h1}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/66 sm:text-xl sm:leading-9">
              {content.lead}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#d6a84f] px-6 py-4 font-semibold text-[#0b0f14] shadow-[0_18px_55px_rgba(214,168,79,0.22)]">
                {content.primary} <ArrowRight className="h-4 w-4" />
              </button>
              <Link href={content.secondaryHref} className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.08] px-6 py-4 font-semibold text-white">
                {content.secondary}
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {content.trust.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm text-white/70">{item}</span>
              ))}
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/[0.055] p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
            <div className="rounded-[22px] border border-white/10 bg-[#101722] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">HEIMDALL</div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{isRu ? 'Risk briefing' : 'Risk briefing'}</div>
                </div>
                <BarChart3 className="h-9 w-9 text-[#f3d58a]" />
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white p-5">
                <img src="/report-previews/counterparty-premium-preview.png" alt="HEIMDALL report preview" className="h-auto w-full rounded-xl" />
              </div>
              <div className="mt-5 grid gap-3">
                {content.metrics.map(([value, label]) => (
                  <div key={value} className="grid grid-cols-[105px_1fr] gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                    <div className="text-sm font-semibold text-[#f3d58a]">{value}</div>
                    <div className="text-sm leading-6 text-white/62">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f6fb] px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
          <SectionHeader
            eyebrow={isRu ? 'Продукты' : 'Products'}
            title={isRu ? 'Сайт должен продавать не услуги, а решение в момент риска' : 'The site should sell a decision at the moment of risk'}
            text={isRu ? 'Я бы развивал HEIMDALL как понятную линейку продуктов, а не как длинный каталог похожих проверок.' : 'I would develop HEIMDALL as a clear product line, not a long catalogue of similar checks.'}
          />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.products.map(([title, text, href, Icon]) => (
              <Link key={href} href={href} className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:border-[#d6a84f]/50">
                <Icon className="h-7 w-7 text-[#8b6a24]" />
                <h2 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8b6a24]">
                  {isRu ? 'Подробнее' : 'Learn more'} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
          <SectionHeader
            eyebrow={isRu ? 'Сценарии' : 'Scenarios'}
            title={isRu ? 'Когда клиенту нужен не сайт, а быстрый ответ' : 'When the client needs an answer, not a website'}
            text={isRu ? 'Каждый сценарий ведет к понятной заявке и отчету.' : 'Each scenario leads to a clear request and report.'}
          />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.scenarios.map(([title, text]) => <DecisionCard key={title} title={title} text={text} />)}
          </div>
        </section>

        <section className="bg-[#0b0f14] px-4 py-16 text-white sm:px-5 sm:py-20">
          <SectionHeader
            dark
            eyebrow={isRu ? 'Методология' : 'Method'}
            title={isRu ? 'Доверие создается процессом' : 'Trust is created by process'}
            text={isRu ? 'HEIMDALL должен выглядеть как аналитическая компания с дисциплиной, а не как лендинг с обещаниями.' : 'HEIMDALL should feel like a disciplined intelligence company, not a promise-heavy landing page.'}
          />
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
            {content.method.map(([step, title, text]) => (
              <div key={step} className="rounded-[18px] border border-white/10 bg-white/[0.055] p-6">
                <div className="text-sm font-semibold text-[#f3d58a]">{step}</div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f3f6fb] px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
          <SectionHeader
            eyebrow={isRu ? 'Кейсы' : 'Cases'}
            title={isRu ? 'Доказательства важнее обещаний' : 'Proof matters more than promises'}
            text={isRu ? 'Кейсы должны быть главным коммерческим активом сайта.' : 'Cases should be the main commercial asset of the website.'}
          />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {content.cases.map(([title, text, href]) => (
              <Link key={href} href={href} className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:border-[#d6a84f]/50">
                <ClipboardCheck className="h-7 w-7 text-[#8b6a24]" />
                <h2 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[22px] border border-slate-200 bg-[#111827] p-7 text-white shadow-[0_18px_70px_rgba(15,23,42,0.18)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">{content.ctaTitle}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">{content.ctaText}</p>
            </div>
            <button type="button" onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#d6a84f] px-6 py-4 font-semibold text-[#0b0f14]">
              {content.cta} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language={content.lang} />
      </HeimdallFrame>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language={content.lang} defaultTopic={content.primary} />
    </>
  )
}
