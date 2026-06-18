import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import SupportRequestForm from '@/components/SupportRequestForm'
import { ArrowRight, BrainCircuit, CheckCircle2, FileSearch, Gauge, Network, ShieldCheck, Users, Home, Building2, BriefcaseBusiness, AlertTriangle } from 'lucide-react'

const objects = [
  ['Кандидаты', 'чувствительные роли, доступ к деньгам, клиентам, аналитике и коммерческой информации', Users],
  ['Сотрудники', 'конфликт интересов, внутренние инциденты, доступы, признаки утечек и скрытых связей', ShieldCheck],
  ['Подрядчики', 'доступы к CRM, рекламе, сайту, бухгалтерии, данным и платежным процессам', BriefcaseBusiness],
  ['Контрагенты', 'суды, владельцы, связи, репутация, авансы, санкционные и финансовые признаки', Building2],
  ['Домашний персонал', 'няни, помощники, водители, садовники и другие люди рядом с семьей и имуществом', Home],
  ['Инциденты', 'подозрительные события, утечки, подмена реквизитов, конфликтные ситуации и внутренние сигналы', AlertTriangle]
]

const results = [
  'риск-профиль объекта проверки',
  'связи между людьми, компаниями, телефонами, доменами и документами',
  'красные флаги с уровнем значимости и уверенности',
  'предварительный risk score для управленческого решения',
  'структурированный отчет без обвинительных формулировок',
  'рекомендации: что уточнить, что проверить, какое решение отложить'
]

const steps = [
  ['1. Объект', 'Фиксируем, кого или что проверяем: кандидат, компания, подрядчик, домашний персонал, сотрудник или инцидент.'],
  ['2. Сигналы', 'Добавляем юридические, финансовые, репутационные, цифровые и поведенческие признаки риска.'],
  ['3. Связи', 'Собираем карту связей: люди, компании, телефоны, почты, домены, документы и упоминания.'],
  ['4. Оценка', 'Система считает risk score и помогает аналитику быстро выделить приоритетные красные флаги.'],
  ['5. Отчет', 'HEIMDALL формирует аккуратный управленческий отчет: факты, признаки, гипотезы и рекомендации отдельно.']
]

export default function RiskIntelligencePage() {
  return (
    <>
      <Head>
        <title>Центр риск-аналитики | HEIMDALL</title>
        <meta name="description" content="Центр риск-аналитики HEIMDALL: единая картина рисков, связи, красные флаги, risk score и отчеты для проверки кандидатов, сотрудников, подрядчиков, контрагентов и домашнего персонала." />
        <link rel="canonical" href="https://www.heimdall-group.ru/risk-intelligence" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <BrainCircuit className="h-4 w-4" /> Heimdall Intelligence Core
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Центр риск-аналитики HEIMDALL
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Мы собираем разрозненные факты, связи и сигналы риска в единую аналитическую картину. Это помогает принимать решения по найму, сделкам, подрядчикам, персоналу и внутренним инцидентам до того, как риск станет проблемой.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#risk-request" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Оставить заявку на проверку <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Примеры отчетов
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-sky-300/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Что дает система</div>
              <div className="mt-8 grid gap-4">
                {results.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-6 text-white/72">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Что анализируем</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Один центр для разных объектов проверки</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {objects.map(([title, text, Icon]) => (
              <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[46px] border border-sky-300/20 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-sky-100">
                  <Network className="h-4 w-4" /> Risk graph
                </div>
                <h2 className="mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">От фактов к связям и решению</h2>
                <p className="mt-6 text-lg leading-8 text-white/64">HEIMDALL не складывает признаки в хаотичный список. Мы отделяем факты от гипотез, показываем связи и формируем понятную управленческую логику.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {steps.map(([title, text]) => (
                  <div key={title} className="rounded-[28px] border border-white/10 bg-black/22 p-6">
                    <div className="text-sm font-semibold text-[#F7D784]">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [FileSearch, 'Законные источники', 'Работа строится на данных клиента, открытых источниках, документах и согласованных основаниях проверки.'],
              [Gauge, 'Risk score', 'Оценка помогает расставить приоритеты, но не заменяет решение аналитика и юридическую проверку.'],
              [ShieldCheck, 'Юридическая аккуратность', 'Отчеты не содержат обвинений. Мы разделяем факты, признаки, гипотезы и рекомендации.']
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7">
                <Icon className="h-7 w-7 text-sky-300" />
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="risk-request" className="relative z-10 mx-auto max-w-5xl px-5 pb-24">
          <SupportRequestForm title="Оставить заявку на риск-анализ" subtitle="Опишите объект проверки и задачу. Мы предложим формат проверки, сроки и структуру отчета." source="risk-intelligence" />
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
