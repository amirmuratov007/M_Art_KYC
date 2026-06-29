import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, FileSearch, ShieldCheck, Network, UserSearch, Scale, Building2, CheckCircle2, AlertTriangle, LockKeyhole, ClipboardCheck, Home, Gauge, Radar } from 'lucide-react'

const services = [
  {
    title: 'Проверка контрагентов',
    text: 'Суды, владельцы, связанные компании, репутация, санкционные и финансовые сигналы.',
    href: '/proverka-kontragenta-pered-sdelkoy',
    icon: FileSearch,
    bestFor: 'перед договором, авансом, отсрочкой платежа или партнерством'
  },
  {
    title: 'Проверка поставщика из Китая',
    text: 'Проверка производителя, торговой компании, реквизитов, сайта, документов и следов фиктивности.',
    href: '/proverka-postavshchika-iz-kitaya',
    icon: Building2,
    bestFor: 'перед авансом, первой поставкой или сменой поставщика'
  },

  {
    title: 'Служба безопасности на аутсорсе',
    text: 'Внешний контур безопасности для компаний без собственного отдела: проверки, мониторинг, закрытые задачи и информационная безопасность.',
    href: '/security-outsourcing',
    icon: LockKeyhole,
    bestFor: 'когда нужно заменить или усилить службу безопасности без найма отдела'
  },
  {
    title: 'Внутренние расследования',
    text: 'Выявление мошенничества, сговора, утечек, конфликта интересов и нарушений внутри компании в правовом поле.',
    href: '/internal-investigations',
    icon: ClipboardCheck,
    bestFor: 'когда есть подозрение на внутреннюю схему, утечку, сговор или нарушение процессов'
  },

  {
    title: 'Проверка домашнего персонала',
    text: 'Няни, сиделки, водители, домработницы, садовники, сторожа и помощники перед допуском к дому, детям и имуществу.',
    href: '/private-staff-check',
    icon: Home,
    bestFor: 'когда частное лицо нанимает человека с доступом к дому, детям, ключам или личной информации'
  },
  {
    title: 'Проверка продавца перед покупкой квартиры, дачи, дома или авто',
    text: 'Проверяем человека за сделкой: собственника квартиры, дачи, дома, участка или автомобиля, его долги, суды, связи, посредников, доверенности и признаки проблемной продажи.',
    href: '/proverka-prodavca-pered-pokupkoy',
    icon: Building2,
    bestFor: 'перед авансом, задатком, оплатой, подписанием договора или сделкой через представителя'
  },
  {
    title: 'Проверка кандидатов',
    text: 'Риски для чувствительных должностей: конфликт интересов, репутация, биография и связи.',
    href: '/proverka-kandidatov',
    icon: ShieldCheck,
    bestFor: 'CFO, закупки, безопасность, продажи, доступ к деньгам и данным'
  },
  {
    title: 'Проверка бенефициаров',
    text: 'Фактический контроль, номинальные владельцы, скрытые связи и корпоративные конфликты.',
    href: '/proverka-beneficiarov',
    icon: UserSearch,
    bestFor: 'когда формальный владелец не объясняет реальный контроль'
  },
  {
    title: 'AML / KYC',
    text: 'Комплаенс-проверка клиентов, контрагентов и сделок с учетом санкционной экспозиции.',
    href: '/komplaens-proverka-kontragenta',
    icon: Scale,
    bestFor: 'санкции, PEP, платежный маршрут, комплаенс и репутация'
  },
  {
    title: 'Due Diligence',
    text: 'Комплексная проверка компании, сделки, партнера, актива или международной структуры.',
    href: '/due-diligence-russia',
    icon: Network,
    bestFor: 'покупка доли, инвестиции, M&A, крупные партнерства'
  },
  {
    title: 'Комплексное сопровождение',
    text: 'Постоянная проверка контрагентов, кандидатов, поставщиков и корпоративных рисков.',
    href: '/business-support',
    icon: Building2,
    bestFor: 'регулярные проверки, закупки, поток кандидатов и риск-мониторинг'
  }
]

const scenarios = [
  ['Сделка или покупка бизнеса', 'Проверка структуры владения, судебной истории, скрытых связей и красных флагов до подписания.'],
  ['Поставщик или подрядчик', 'Анализ признаков фиктивности, аффилированности, массовости, санкционного и платежного риска.'],
  ['Кандидат на чувствительную роль', 'Репутация, конфликт интересов, финансовое давление, связи с конкурентами или поставщиками.'],
  ['Иностранная компания', 'Международная проверка, бенефициары, локальные реестры, негативные публикации и комплаенс-сигналы.']
]

const packages = [
  ['Скрининг', 'Быстрый первичный вывод по объекту проверки.', '24-48 часов', ['красные флаги', 'базовые связи', 'санкционные и судебные сигналы']],
  ['Расширенный отчет', 'Глубокая проверка с логикой риска и рекомендациями.', '48-72 часа', ['карта связей', 'источники', 'управленческий вывод']],
  ['Сопровождение', 'Постоянный контур проверки для бизнеса.', 'ежемесячно', ['потоковые проверки', 'приоритетные задачи', 'единая история рисков']]
]

const deliverables = [
  'Краткий вывод для решения: работать, остановить, углубить проверку',
  'Карта выявленных рисков и связей',
  'Список источников и проверочных контуров',
  'Рекомендации по следующим действиям'
]

const caseLinks = [
  ['Поставщик из Китая', 'как мы остановили рискованный аванс', '/cases/china-supplier-advance-payment'],
  ['Закупочный конфликт', 'скрытая связка подрядчика и посредника', '/cases/procurement-conflict-of-interest'],
  ['Санкционный риск', 'нет прямого совпадения, но риск есть', '/cases/sanctions-risk-without-direct-match']
]

const decisionTracks = [
  {
    title: 'Нужно решить сегодня',
    text: 'Быстрый скрининг перед авансом, задатком, наймом или подписанием. Вывод короткий: можно идти дальше, стоп, нужна глубокая проверка.',
    href: '/contact',
    icon: Gauge
  },
  {
    title: 'Нужно разобрать сложную связку',
    text: 'Бенефициары, посредники, семейные связи, номиналы, цепочки компаний, конфликт интересов и международные элементы.',
    href: '/due-diligence-russia',
    icon: Network
  },
  {
    title: 'Нужно поставить риск на контроль',
    text: 'Постоянный формат для собственника: реестр рисков, приоритеты, мониторинг, повторные проверки и закрытые задачи.',
    href: '/risk-command-center',
    icon: Radar
  },
  {
    title: 'Нужно усилить безопасность',
    text: 'Доступы, подрядчики, цифровой след, утечки, поддельные домены, фишинг, коммерческая тайна и базовая дисциплина процессов.',
    href: '/security-audit',
    icon: LockKeyhole
  }
]

export default function ServicesPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('Общий запрос')
  const openContact = (nextTopic) => {
    setTopic(nextTopic || 'Общий запрос')
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>Услуги | HEIMDALL</title>
        <meta name="description" content="Услуги HEIMDALL: проверка контрагентов, поставщиков из Китая, кандидатов, домашнего персонала, продавцов перед покупкой квартиры, дачи, дома или авто, бенефициаров, AML/KYC, due diligence и сопровождение бизнеса." />
        <link rel="canonical" href="https://www.heimdall-group.ru/services" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              Услуги проверки
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Выберите проверку под конкретный риск
            </h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Не продаем абстрактные справки. Подбираем формат под решение: платить, нанимать, подписывать, покупать долю, входить в партнерство или остановиться.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openContact('Подбор формата проверки')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Подобрать проверку <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/cases" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Смотреть кейсы
              </Link>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Пример отчета
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-6 backdrop-blur-2xl">
            <img src="/heimdall-logo-mark.png" alt="HEIMDALL" className="mx-auto w-full max-w-[420px]" />
            <div className="mt-6 grid gap-3">
              {['Контрагент до договора', 'Поставщик до аванса', 'Кандидат до доступа', 'Партнер до сделки'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#F7D784]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <div key={service.href} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 hover:bg-white/[0.07]">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{service.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{service.text}</p>
                <p className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/58">
                  <span className="text-[#F7D784]">Лучше всего:</span> {service.bestFor}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={service.href} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                    Подробнее <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                  <button onClick={() => openContact(service.title)} className="inline-flex items-center gap-2 rounded-2xl bg-[#D6A84F] px-4 py-3 text-sm font-semibold text-[#050816]">
                    Заказать
                  </button>
                </div>
              </div>
            )
          })}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Как выбрать</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Четыре входа вместо длинного выбора услуги</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/62">
              Если непонятно, какую проверку заказать, начинайте от ситуации. Мы сами соберем правильный маршрут: быстрый скрининг, due diligence, риск-контроль или аудит безопасности.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {decisionTracks.map(({ title, text, href, icon: Icon }) => (
              <Link key={title} href={href} className="group rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07]">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                  Перейти <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Форматы</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Три рабочих режима проверки</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map(([title, text, timing, items]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">{timing}</div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                <div className="mt-6 grid gap-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Сценарии</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Когда проверка нужна не для галочки</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {scenarios.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Результат</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">На выходе не справка, а решение по риску</h2>
              <p className="mt-6 text-base leading-8 text-white/64">Отчет HEIMDALL показывает не только найденные факты, но и то, что они означают для сделки, найма, закупки или партнерства.</p>
            </div>
            <div className="grid gap-3">
              {deliverables.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/72">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Кейсы</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Примеры задач</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {caseLinks.map(([title, text, href]) => (
              <Link key={href} href={href} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:border-[#D6A84F]/35">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">Читать <ArrowRight className="h-4 w-4" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-28">
          <div className="grid gap-6 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Нужна проверка сегодня?</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">Оставьте контакт и коротко опишите объект проверки. Мы вернемся с подходящим форматом и сроком.</p>
            </div>
            <button onClick={() => openContact('Срочная проверка')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">Оставить заявку <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic={topic} />
    </>
  )
}
