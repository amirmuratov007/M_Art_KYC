import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, Bell, CheckCircle2, ClipboardCheck, FileSearch, Gauge, LockKeyhole, Network, Radar, ShieldCheck, UsersRound } from 'lucide-react'

const commandModules = [
  ['Риск-реестр', 'Все проверки, красные флаги, решения и статусы в единой логике: новый, в работе, закрыть, мониторить.', ClipboardCheck],
  ['Сделки и авансы', 'Контрагенты, поставщики, посредники, договоры, платежные маршруты и признаки фиктивности до денег.', FileSearch],
  ['Люди и доступы', 'Кандидаты, подрядчики, домашний персонал, руководители и роли с доступом к деньгам, детям, данным или объектам.', UsersRound],
  ['Цифровые риски', 'Утечки, поддельные домены, подрядчики с доступами, фишинг, публичные следы и слабые места периметра.', LockKeyhole],
  ['Связи и бенефициары', 'Фактический контроль, номинальность, семейные и корпоративные связи, конфликт интересов, скрытые группы влияния.', Network],
  ['Мониторинг', 'Повторные проверки и тревожные сигналы по важным объектам: суды, санкции, медиа, репутация, изменения в контуре.', Bell]
]

const workflow = [
  ['1. Входящий риск', 'Фиксируем объект: компания, человек, сделка, подрядчик, актив, доступ или инцидент.'],
  ['2. Быстрая квалификация', 'Определяем, что проверять первым: владельцы, суды, связи, доступы, утечки, платежный маршрут или репутацию.'],
  ['3. Аналитический вывод', 'Даем управленческий ответ: можно продолжать, нужно ограничить условия, нужен стоп или глубокий разбор.'],
  ['4. Контроль изменений', 'Важные объекты остаются в наблюдении, чтобы риск не всплыл после оплаты, найма или допуска.']
]

const ownerQuestions = [
  'Кому можно платить аванс без риска потерять деньги?',
  'Кого можно допускать к финансам, CRM, детям, дому или коммерческой тайне?',
  'Какие подрядчики и посредники выглядят опасно?',
  'Где у компании слабое место в данных, доступах и публичном цифровом следе?',
  'Какие сделки стоит остановить до подписания?'
]

export default function RiskCommandCenterPage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Risk Control Center | HEIMDALL</title>
        <meta name="description" content="Risk Control Center HEIMDALL: единый контур управления рисками сделок, авансов, кандидатов, подрядчиков, бенефициаров, доступов и цифрового периметра." />
        <link rel="canonical" href="https://www.heimdall-group.ru/risk-command-center" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <Radar className="h-4 w-4" /> Операционный риск-контур
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Центр управления рисками для собственника
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              HEIMDALL превращает разрозненные проверки в понятную систему решений: кого проверять, где стоп, что мониторить, кому ограничить доступ и какие сделки можно вести дальше.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Запустить риск-контур <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/security-audit" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Аудит безопасности
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Ответы для решения</div>
              <div className="mt-8 grid gap-3">
                {ownerQuestions.map((item) => (
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
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Модули</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Что входит в центр рисков</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {commandModules.map(([title, text, Icon]) => (
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
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-sky-200">Процесс</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">От тревожного сигнала к управленческому решению</h2>
              <p className="mt-6 text-base leading-8 text-white/64">
                Формат подходит для компаний, где риски появляются постоянно: закупки, маркетплейсы, недвижимость, персонал, подрядчики, международные поставки и конфиденциальные задачи собственника.
              </p>
            </div>
            <div className="grid gap-4">
              {workflow.map(([title, text]) => (
                <div key={title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-sky-100">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-28">
          <div className="grid gap-6 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
                <Gauge className="h-4 w-4" /> Быстрый старт
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Начнем с 10 ключевых рисков бизнеса</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">Оставьте контакты и коротко опишите компанию. Мы предложим первый список объектов для проверки и формат контроля.</p>
            </div>
            <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Оставить заявку <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic="Risk Control Center" />
    </>
  )
}
