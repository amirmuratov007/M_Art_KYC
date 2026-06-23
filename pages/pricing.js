import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, ShieldCheck, FileSearch, UserSearch, Building2, LockKeyhole, SearchCheck, Clock3, CheckCircle2, AlertTriangle, Scale, BriefcaseBusiness, Home, Car } from 'lucide-react'

const oneTimeServices = [
  {
    title: 'Проверка контрагента',
    price: 'от 45 000 ₽',
    term: 'обычно 2-5 рабочих дней',
    text: 'Для решения перед договором, авансом, отсрочкой платежа, партнерством или спорной сделкой.',
    includes: ['суды, исполнительные производства и банкротные сигналы', 'собственники, связи, аффилированность и признаки номинальности', 'репутационные, санкционные и финансовые индикаторы', 'короткий вывод: можно работать, нужен контроль или лучше остановиться'],
    icon: FileSearch,
    href: '/proverka-kontragenta'
  },
  {
    title: 'Проверка поставщика из Китая',
    price: 'от 85 000 ₽',
    term: 'обычно 4-10 рабочих дней',
    text: 'Для закупок, авансов, первой поставки, смены поставщика или работы через посредника.',
    includes: ['проверка компании, сайта, документов и платежных реквизитов', 'признаки торговой прокладки, фиктивности или подмены производителя', 'красные флаги по переписке, счетам, условиям и логистике', 'рекомендации по безопасной оплате и следующему шагу'],
    icon: Building2,
    href: '/china-supplier-verification'
  },
  {
    title: 'Проверка кандидата',
    price: 'от 35 000 ₽',
    term: 'обычно 2-5 рабочих дней',
    text: 'Для найма на должности с доступом к деньгам, закупкам, документам, клиентам, базам и коммерческой тайне.',
    includes: ['проверка биографии, деловой репутации и публичных следов', 'конфликт интересов, связи с контрагентами и признаки риска', 'оценка соответствия должности и уровню доступа', 'вывод для HR, собственника или службы безопасности'],
    icon: UserSearch,
    href: '/proverka-kandidatov'
  },

  {
    title: 'Проверка домашнего персонала',
    price: 'от 25 000 ₽',
    term: 'обычно 1-7 рабочих дней',
    text: 'Для найма няни, сиделки, водителя, домработницы, садовника, сторожа или помощника с доступом к дому, детям, ключам и имуществу.',
    includes: ['проверка предоставленных данных и открытых признаков риска', 'публичный цифровой след, судебные и исполнительные сигналы', 'рекомендации и биографические несостыковки при наличии согласия', 'вывод для семьи: какие риски есть и какие ограничения нужны'],
    icon: Home,
    href: '/private-staff-check'
  },
  {
    title: 'Проверка собственника квартиры',
    price: 'от 35 000 ₽',
    term: 'обычно 2-5 рабочих дней',
    text: 'Для покупателя квартиры перед авансом, задатком, расчетами или подписанием договора с продавцом.',
    includes: ['личность продавца и роль в сделке', 'судебные, долговые и исполнительные сигналы', 'посредники, доверенности, давление и признаки мошенничества', 'вывод по рискам сделки и вопросам для юриста'],
    icon: Building2,
    href: '/proverka-sobstvennika-kvartiry'
  },
  {
    title: 'Проверка собственника автомобиля',
    price: 'от 25 000 ₽',
    term: 'обычно 1-5 рабочих дней',
    text: 'Для покупателя автомобиля перед оплатой, переводом задатка или сделкой через посредника.',
    includes: ['личность продавца и совпадение с владельцем', 'долги, суды, исполнительные производства и спорные сигналы', 'перекупы, доверенности, давление по срокам и признаки обмана', 'вывод по человеку и безопасному следующему шагу'],
    icon: Car,
    href: '/proverka-sobstvennika-avtomobilya'
  },
  {
    title: 'Due Diligence сделки',
    price: 'от 180 000 ₽',
    term: 'обычно 7-15 рабочих дней',
    text: 'Для покупки доли, входа в партнерство, инвестиций, крупного договора или сделки с высоким авансом.',
    includes: ['структура владения, бенефициары, связанные лица и активы', 'судебные, долговые, санкционные и корпоративные риски', 'проверка публичной истории, деловой репутации и конфликтов', 'управленческий отчет с картой рисков и рекомендациями'],
    icon: Scale,
    href: '/due-diligence-russia'
  }
]

const infosecPlans = [
  {
    title: 'ИБ Старт',
    price: 'от 75 000 ₽',
    term: 'разовая диагностика',
    best: 'для собственника, который хочет быстро понять, где бизнес уязвим',
    includes: ['карта внешнего цифрового периметра', 'проверка доменов, сайта, публичных следов и утечек', 'поиск признаков фишинга, имитации бренда и слабых мест', 'короткий план закрытия критичных рисков']
  },
  {
    title: 'ИБ Контур',
    price: 'от 150 000 ₽',
    term: 'расширенная проверка',
    best: 'для компании с подрядчиками, CRM, рекламой, удаленными сотрудниками и чувствительными данными',
    includes: ['все из ИБ Старт', 'проверка подрядчиков и доступов', 'оценка рисков коммерческой тайны и передачи данных', 'регламент доступов и управленческий отчет']
  },
  {
    title: 'ИБ Сопровождение',
    price: 'от 220 000 ₽ / месяц',
    term: 'постоянная работа',
    best: 'для бизнеса, где есть регулярные сделки, сотрудники, подрядчики и риск утечек',
    includes: ['ежемесячный мониторинг внешних сигналов', 'проверка новых подрядчиков с доступами', 'разбор подозрительных ситуаций и инцидентов', 'обновление реестра рисков и приоритетная связь']
  }
]

const outsourcingPlans = [
  {
    title: 'Контур безопасности',
    price: 'от 180 000 ₽ / месяц',
    term: 'базовое сопровождение',
    best: 'для компаний без собственной службы безопасности',
    includes: ['до 10 проверок в месяц', 'контрагенты, кандидаты, поставщики', 'единый риск-реестр', 'краткие управленческие выводы', 'консультации по красным флагам']
  },
  {
    title: 'Внешняя служба безопасности',
    price: 'от 350 000 ₽ / месяц',
    term: 'регулярный контур',
    best: 'для компаний с закупками, наймом, авансами и международными контрагентами',
    includes: ['до 25 проверок в месяц', 'расширенные проверки и связи', 'ИБ Контур как часть сопровождения', 'мониторинг ключевых объектов', 'приоритетные задачи собственника']
  },
  {
    title: 'Корпоративный штаб риска',
    price: 'от 650 000 ₽ / месяц',
    term: 'закрытый формат',
    best: 'для собственников, групп компаний, сложных сделок и чувствительных конфликтов',
    includes: ['индивидуальный пул задач', 'сложные проверки и расследования', 'кризисные ситуации и инциденты', 'закрытый контур коммуникации', 'ежемесячный управленческий отчет']
  }
]

const investigationPlans = [
  {
    title: 'Внутренний скрининг',
    price: 'от 250 000 ₽',
    term: 'точечная проверка',
    includes: ['первичный разбор ситуации', 'проверка документов, событий и цифровых следов', 'карта возможных участников и уязвимых процессов', 'рекомендации по снижению ущерба']
  },
  {
    title: 'Корпоративное расследование',
    price: 'от 600 000 ₽',
    term: 'полный цикл',
    includes: ['план расследования и гипотезы', 'интервью, анализ документов и связей', 'выявление конфликта интересов, сговора или утечки', 'отчет для управленческого и юридического решения']
  },
  {
    title: 'Профилактический контур',
    price: 'от 450 000 ₽ / месяц',
    term: 'превентивная работа',
    includes: ['постоянный анализ внутренних сигналов', 'проверка рисковых процессов и ролей', 'рекомендации по регламентам и контролям', 'закрытая коммуникация с собственником']
  }
]

const steps = [
  ['1. Короткий разбор задачи', 'Понимаем, что именно нужно защитить: деньги, сделку, закупку, найм, данные, репутацию или управленческий контроль.'],
  ['2. Подбор формата', 'Предлагаем разовую проверку, ИБ-аудит, расследование или ежемесячный контур безопасности. Не продаем лишнее.'],
  ['3. Работа и отчет', 'Собираем факты, проверяем гипотезы, фиксируем красные флаги и готовим понятный управленческий вывод.'],
  ['4. Решение и сопровождение', 'Помогаем понять, что делать дальше: работать, ограничить доступ, запросить документы, остановить сделку или усилить контроль.']
]

const notes = [
  'Цены являются стартовыми. Итоговая стоимость зависит от страны, срочности, количества объектов, глубины проверки и объема документов.',
  'HEIMDALL не оказывает незаконные услуги, не проводит оперативно-розыскную деятельность и не обещает доступ к закрытым государственным базам.',
  'Работа строится на договоре, законных источниках, документах клиента, открытых данных, аналитике, интервью и согласованных корпоративных процедурах.',
  'Для чувствительных задач возможны NDA, отдельный контур коммуникации и индивидуальный режим доступа к материалам.'
]

function PlanCard({ plan, featured = false }) {
  return (
    <div className={`flex h-full flex-col rounded-[34px] border p-7 backdrop-blur-2xl ${featured ? 'border-[#D6A84F]/35 bg-[#D6A84F]/[0.08] shadow-[0_0_70px_rgba(214,168,79,0.12)]' : 'border-white/10 bg-white/[0.045]'}`}>
      <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/85">{plan.term}</div>
      <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{plan.title}</h3>
      <div className="mt-5 text-3xl font-semibold text-sky-100">{plan.price}</div>
      {plan.best && <p className="mt-4 text-sm leading-7 text-white/58">{plan.best}</p>}
      <div className="mt-7 grid gap-3">
        {plan.includes.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PricingPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('Единый прайс и подбор услуги')
  const openContact = (value) => {
    setTopic(value)
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>Прайс HEIMDALL - проверки, ИБ, расследования и служба безопасности</title>
        <meta name="description" content="Единый прайс HEIMDALL: проверки контрагентов, поставщиков, кандидатов, домашнего персонала, собственников квартир и автомобилей, Due Diligence, ИБ, расследования и безопасность на аутсорсе." />
        <link rel="canonical" href="https://www.heimdall-group.ru/pricing" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <BriefcaseBusiness className="h-4 w-4" /> Коммерческая витрина
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Единый прайс HEIMDALL
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Проверки, информационная безопасность, внутренние расследования и сопровождение как внешняя служба безопасности. Выберите формат под риск, бюджет и срочность.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openContact('Подобрать услугу по прайсу')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Подобрать услугу <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#recurring" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Ежемесячное сопровождение
              </a>
              <Link href="/security-outsourcing" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Служба безопасности
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Что можно купить</div>
              <div className="mt-8 grid gap-4">
                {['разовая проверка перед решением', 'информационная безопасность', 'внутреннее расследование', 'внешняя служба безопасности', 'закрытый формат для собственника'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="one-time" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Разовые услуги</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Когда нужно быстро принять решение</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Подходит, если нужно проверить конкретного контрагента, поставщика, кандидата, бенефициара или сделку.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {oneTimeServices.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]"><Icon className="h-6 w-6" /></div>
                  <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">{service.term}</div>
                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{service.title}</h3>
                  <div className="mt-4 text-3xl font-semibold text-sky-100">{service.price}</div>
                  <p className="mt-5 text-sm leading-7 text-white/60">{service.text}</p>
                  <div className="mt-7 grid gap-3">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />{item}</div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={service.href} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">Подробнее</Link>
                    <button onClick={() => openContact(service.title)} className="rounded-2xl bg-[#D6A84F] px-4 py-3 text-sm font-semibold text-[#050816]">Заказать</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section id="infosec" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Информационная безопасность</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">ИБ как понятный управленческий продукт</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Не абстрактный технический аудит, а поиск рисков, которые могут привести к утечке данных, потере денег, подмене бренда, захвату доступов или конфликту с подрядчиком.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {infosecPlans.map((plan, index) => <PlanCard key={plan.title} plan={plan} featured={index === 1} />)}
          </div>
        </section>

        <section id="investigations" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Внутренние расследования</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Когда проблема уже внутри компании</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Для ситуаций с утечками, сговором, конфликтом интересов, подозрительными закупками, злоупотреблениями или скрытыми внутренними рисками.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {investigationPlans.map((plan, index) => <PlanCard key={plan.title} plan={plan} featured={index === 1} />)}
          </div>
        </section>

        <section id="recurring" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Ежемесячное сопровождение</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">HEIMDALL как внешняя служба безопасности</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Для бизнеса, которому нужны регулярные проверки, контроль рисков, ИБ, закрытые задачи собственника и единый ответственный контур без найма отдельного отдела.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {outsourcingPlans.map((plan, index) => <PlanCard key={plan.title} plan={plan} featured={index === 1} />)}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-100"><Clock3 className="h-6 w-6" /></div>
              <h2 className="mt-7 text-4xl font-semibold tracking-[-0.05em]">Как подбирается формат</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">Главная цель - не продать самый дорогой пакет, а выбрать достаточный уровень проверки, чтобы руководитель мог принять решение без лишнего риска.</p>
            </div>
            <div className="grid gap-4">
              {steps.map(([title, text]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#F7D784]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-[#D6A84F]/25 bg-[#D6A84F]/[0.07] p-7 md:p-10 backdrop-blur-2xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]"><AlertTriangle className="h-4 w-4" /> Важно</div>
                <h2 className="mt-7 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Прозрачные границы работы</h2>
              </div>
              <div className="grid gap-3">
                {notes.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-7 text-white/68">
                    <SearchCheck className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-sky-300/20 bg-sky-300/[0.08] p-8 md:p-10 text-center backdrop-blur-2xl">
            <div className="mx-auto max-w-3xl">
              <div className="text-sm uppercase tracking-[0.24em] text-sky-200/80">Заявка</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Не знаете, какой пакет нужен?</h2>
              <p className="mt-6 text-lg leading-8 text-white/62">Опишите ситуацию коротко. HEIMDALL предложит формат: разовая проверка, ИБ, расследование или внешняя служба безопасности.</p>
              <button onClick={() => openContact('Подбор формата по прайсу')} className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Получить предложение <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <HeimdallFooter />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic={topic} />
    </>
  )
}
