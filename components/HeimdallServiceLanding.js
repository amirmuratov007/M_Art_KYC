import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck, Clock3, LockKeyhole, ClipboardCheck, AlertTriangle } from 'lucide-react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { HeimdallFrame, SectionHeader, DecisionCard } from '@/components/HeimdallFrame'

const defaultProof = [
  'Проверяем факты, связи и контекст, а не только совпадения в базах.',
  'Формулируем вывод осторожно: риск, вероятность, влияние на решение.',
  'Работаем с NDA, закрытым контуром коммуникации и понятной ответственностью.'
]

const defaultProcess = [
  ['01', 'Контекст решения', 'Выясняем, что нужно защитить: деньги, доступ, сделку, репутацию, данные или управление.'],
  ['02', 'Сбор и проверка', 'Смотрим документы, реестры, судебные сигналы, корпоративные связи, медиа и цифровой след.'],
  ['03', 'Аналитический вывод', 'Отделяем подтвержденные факты от гипотез и показываем, что это означает для клиента.'],
  ['04', 'Рекомендация', 'Даем управленческий вывод: можно работать, нужен контроль, нужна углубленная проверка или стоп.']
]

export default function HeimdallServiceLanding({
  language = 'ru',
  title,
  description,
  canonical,
  eyebrow,
  heroTitle,
  heroText,
  primaryCta,
  secondaryCta,
  price,
  timing,
  audience = [],
  pain = [],
  includes = [],
  deliverables = [],
  process = defaultProcess,
  proof = defaultProof,
  cases = [],
  related = [],
  topic
}) {
  const ru = language === 'ru'
  const [contactOpen, setContactOpen] = useState(false)
  const requestTopic = topic || primaryCta || title || (ru ? 'Заявка HEIMDALL' : 'HEIMDALL request')

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical ? <link rel="canonical" href={canonical} /> : null}
      </Head>

      <HeimdallFrame>
        <HeimdallNav language={language} />

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#d6a84f]/25 bg-[#d6a84f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3d58a]">
              <ShieldCheck className="h-4 w-4" />
              {eyebrow || (ru ? 'Проверка риска' : 'Risk review')}
            </div>
            <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              {heroTitle}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/66 sm:text-xl sm:leading-9">
              {heroText}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#d6a84f] px-6 py-4 font-semibold text-[#0b0f14] shadow-[0_18px_55px_rgba(214,168,79,0.22)]"
              >
                {primaryCta || (ru ? 'Обсудить проверку' : 'Discuss review')} <ArrowRight className="h-4 w-4" />
              </button>
              <Link href={secondaryCta?.href || (ru ? '/sample-reports' : '/sample-reports-en')} className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.08] px-6 py-4 font-semibold text-white">
                {secondaryCta?.label || (ru ? 'Смотреть пример отчета' : 'View sample report')}
              </Link>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/[0.055] p-4 shadow-2xl backdrop-blur-2xl sm:p-6">
            <div className="rounded-[22px] border border-white/10 bg-[#101722] p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{ru ? 'Формат' : 'Scope'}</div>
                <div className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">{ru ? 'Закрытый контур' : 'Confidential'}</div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f3d58a]"><Clock3 className="h-4 w-4" /> {ru ? 'Срок' : 'Timing'}</div>
                  <div className="mt-3 text-xl font-semibold">{timing || (ru ? '24-72 часа' : '24-72 hours')}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f3d58a]"><FileSearch className="h-4 w-4" /> {ru ? 'Стоимость' : 'Price'}</div>
                  <div className="mt-3 text-xl font-semibold">{price || (ru ? 'по задаче' : 'by scope')}</div>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {(audience.length ? audience : [
                  ru ? 'Собственник или CEO' : 'Owner or CEO',
                  ru ? 'Юридический и комплаенс-контур' : 'Legal and compliance teams',
                  ru ? 'Закупки, HR или служба безопасности' : 'Procurement, HR or security'
                ]).map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#f3d58a]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f3f6fb] px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
          <SectionHeader
            eyebrow={ru ? 'Когда нужен HEIMDALL' : 'When HEIMDALL helps'}
            title={ru ? 'Мы включаемся там, где ошибка стоит дороже проверки' : 'We step in where a wrong decision costs more than the review'}
            text={ru ? 'Сайт должен сразу отвечать на главный вопрос клиента: в какой момент риск становится управленческой задачей.' : 'The site should answer the main client question: when does risk become a management decision?'}
          />
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            {(pain.length ? pain : [
              [ru ? 'Перед договором' : 'Before contract', ru ? 'Проверить, кто реально стоит за стороной сделки.' : 'Understand who really stands behind the counterparty.'],
              [ru ? 'Перед авансом' : 'Before payment', ru ? 'Снизить риск фиктивности, срыва поставки или подмены реквизитов.' : 'Reduce shell, delivery and payment substitution risk.'],
              [ru ? 'Перед доступом' : 'Before access', ru ? 'Не дать чувствительную роль человеку с неподходящим риском.' : 'Avoid giving sensitive access to the wrong risk profile.'],
              [ru ? 'Перед конфликтом' : 'Before dispute', ru ? 'Собрать факты и связи до управленческого или юридического шага.' : 'Structure facts before legal or management action.']
            ]).map(([cardTitle, text]) => (
              <DecisionCard key={cardTitle} title={cardTitle} text={text} />
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6a24]">{ru ? 'Состав проверки' : 'Review scope'}</div>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl">
                {ru ? 'Что именно проверяем' : 'What we actually check'}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {ru
                  ? 'Формат подбирается под риск, но клиент всегда получает понятную структуру: факты, контекст, вывод и следующий шаг.'
                  : 'The scope depends on the risk, but the client always gets a clear structure: facts, context, conclusion and next step.'}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(includes.length ? includes : proof).map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 text-sm leading-7 text-slate-700">
                  <CheckCircle2 className="mb-4 h-5 w-5 text-[#8b6a24]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0b0f14] px-4 py-16 text-white sm:px-5 sm:py-20">
          <SectionHeader
            dark
            eyebrow={ru ? 'Процесс' : 'Process'}
            title={ru ? 'Как выглядит работа' : 'How the work runs'}
            text={ru ? 'Меньше хаоса, больше управляемости: каждый этап дает материал для решения.' : 'Less chaos, more control: each step produces material for a decision.'}
          />
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
            {process.map(([step, stepTitle, stepText]) => (
              <div key={step} className="rounded-[18px] border border-white/10 bg-white/[0.055] p-6">
                <div className="text-sm font-semibold text-[#f3d58a]">{step}</div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{stepTitle}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{stepText}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f3f6fb] px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[22px] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-9">
              <LockKeyhole className="h-8 w-8 text-[#8b6a24]" />
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                {ru ? 'Что получает клиент' : 'What the client receives'}
              </h2>
              <div className="mt-8 grid gap-3">
                {(deliverables.length ? deliverables : [
                  ru ? 'Краткий управленческий вывод по риску.' : 'Concise management risk conclusion.',
                  ru ? 'Карта фактов, связей и красных флагов.' : 'Map of facts, links and red flags.',
                  ru ? 'Рекомендации по следующему действию.' : 'Recommended next action.',
                  ru ? 'Список источников и зон неопределенности.' : 'Sources and uncertainty notes.'
                ]).map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-4 text-sm leading-7 text-slate-700">
                    <ClipboardCheck className="mt-1 h-4 w-4 shrink-0 text-[#8b6a24]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-[#111827] p-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.14)] sm:p-9">
              <AlertTriangle className="h-8 w-8 text-[#f3d58a]" />
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]">
                {ru ? 'Границы работы' : 'Operating boundaries'}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/64">
                {ru
                  ? 'HEIMDALL не обещает незаконный доступ к закрытым базам и не заменяет юридическое заключение. Мы работаем с законными источниками, документами клиента, аналитикой и согласованными процедурами.'
                  : 'HEIMDALL does not promise illegal access to closed databases and does not replace legal advice. We work with lawful sources, client documents, analytics and agreed procedures.'}
              </p>
              <button type="button" onClick={() => setContactOpen(true)} className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[#d6a84f] px-6 py-4 font-semibold text-[#0b0f14]">
                {ru ? 'Обсудить задачу' : 'Discuss task'} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {(cases.length || related.length) ? (
          <section className="bg-white px-4 py-16 text-[#111827] sm:px-5 sm:py-20">
            <SectionHeader
              eyebrow={ru ? 'Дальше' : 'Next'}
              title={cases.length ? (ru ? 'Похожие кейсы' : 'Related cases') : (ru ? 'Связанные услуги' : 'Related services')}
              text={ru ? 'Клиент должен быстро перейти к доказательствам и соседним сценариям.' : 'Clients should quickly reach proof and adjacent scenarios.'}
            />
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
              {(cases.length ? cases : related).map(([itemTitle, text, href]) => (
                <Link key={href} href={href} className="rounded-[18px] border border-slate-200 bg-[#f8fafc] p-6 transition hover:border-[#d6a84f]/50 hover:bg-white">
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{itemTitle}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8b6a24]">
                    {ru ? 'Открыть' : 'Open'} <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <HeimdallFooter language={language} />
      </HeimdallFrame>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language={language} defaultTopic={requestTopic} />
    </>
  )
}
