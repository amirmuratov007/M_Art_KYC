import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import SupportRequestForm from '@/components/SupportRequestForm'
import { ArrowRight, AlertTriangle, Bell, Building2, CheckCircle2, FileSearch, Gauge, LockKeyhole, Network, ShieldCheck, UserSearch } from 'lucide-react'

const problems = [
  ['Нет собственной службы безопасности', 'Решения о сделках, найме, авансах и партнерах принимаются без независимой проверки.'],
  ['Служба безопасности перегружена', 'Внутренняя команда занимается срочными инцидентами и не успевает глубоко проверять внешний периметр.'],
  ['Нужна конфиденциальность', 'Часть задач нельзя передавать сотрудникам, поставщикам или людям внутри конфликтной цепочки.'],
  ['Есть международный контур', 'Поставщики, посредники, бенефициары и платежные маршруты находятся в разных юрисдикциях.']
]

const coverage = [
  ['Контрагенты и поставщики', 'суды, владельцы, связанные компании, признаки фиктивности, санкционные и репутационные сигналы', FileSearch],
  ['Кандидаты на чувствительные роли', 'закупки, финансы, продажи, доступ к данным, конфликт интересов и репутационные риски', UserSearch],
  ['Бенефициары и связи', 'фактический контроль, номинальные владельцы, аффилированность и скрытые конфликты', Network],
  ['Сделки и партнерства', 'Due Diligence перед покупкой бизнеса, инвестицией, совместным проектом или крупным договором', Building2],
  ['Информационная безопасность', 'внешний риск-контур, утечки, цифровой след, доступы, подрядчики, домены и признаки компрометации', LockKeyhole],
  ['Постоянный мониторинг', 'повторные проверки, тревожные сигналы, изменения по судам, санкциям, медиа и репутации', Bell]
]

const infosec = [
  ['Внешняя диагностика цифрового периметра', 'Смотрим компанию глазами атакующего и недобросовестного контрагента: домены, сайты, поддомены, открытые сервисы, публичные следы, технические и репутационные сигналы.'],
  ['Утечки и компрометация', 'Проверяем публичные признаки утечек корпоративных почт, телефонов, доменов, документов, реквизитов и следов, которые могут использоваться для давления, фишинга или мошенничества.'],
  ['Подрядчики и доступы', 'Оцениваем ИТ-поставщиков, интеграторов, маркетологов, бухгалтеров, удаленных исполнителей и других людей, у которых есть доступ к данным, деньгам, CRM, сайту, рекламе или переписке.'],
  ['Фишинг и имитация бренда', 'Ищем поддельные домены, похожие названия, подозрительные контакты, схемы подмены реквизитов, письма от имени руководства и другие признаки социальной инженерии.'],
  ['Коммерческая тайна и внутренние риски', 'Помогаем снизить риск утечки коммерческих предложений, баз клиентов, условий сделок, закупочных цен, данных контрагентов и внутренней переписки.'],
  ['Разбор инцидентов', 'Разбираем подозрительные ситуации: странная активность сотрудника, утечка, конфликт интересов, подмена реквизитов, давление со стороны поставщика или неожиданная цифровая активность вокруг компании.']
]

const infosecProcess = [
  ['1. Карта активов', 'Фиксируем домены, сайты, публичные каналы, ключевые почты, внешних подрядчиков, сервисы, точки входа и людей с чувствительными доступами.'],
  ['2. Проверка внешних сигналов', 'Собираем следы из открытых источников: утечки, похожие домены, негатив, публичные документы, технические ошибки, репутационные и мошеннические сигналы.'],
  ['3. Приоритизация рисков', 'Разделяем находки на критичные, существенные и наблюдаемые. Клиент получает не список страшилок, а понятную очередность действий.'],
  ['4. План закрытия', 'Готовим управленческий план: что отключить, что ограничить, кого проверить, какие правила ввести, какие доступы пересмотреть и что мониторить постоянно.']
]

const infosecDeliverables = [
  'Карта цифрового периметра: домены, публичные активы, внешние сервисы, подрядчики и чувствительные точки доступа',
  'Реестр рисков по ИБ с приоритетом: критично, важно, наблюдать',
  'Проверка утечек, похожих доменов, публичных следов и признаков фишинга',
  'Рекомендации по доступам: что закрыть, кому ограничить, какие роли разделить',
  'Регламент для собственника и руководителей: как согласовывать доступы, подрядчиков, платежи и передачу данных',
  'Отчет для управленческого решения без технического тумана'
]

const infosecBoundaries = [
  'Не продаем иллюзию абсолютной защиты. HEIMDALL выявляет риски, дает план и помогает построить управляемый контур.',
  'Не заменяем штатного системного администратора или SOC 24/7, если клиенту нужен именно технический мониторинг инфраструктуры в реальном времени.',
  'Не проводим вредоносные действия и не атакуем чужие системы. Работа строится на легальных проверках, открытых источниках, документах клиента и согласованных тестах.',
  'При необходимости подключаем технических специалистов под отдельную задачу: аудит сайта, настройка доступов, проверка почты, доменов, облаков и рабочих процессов.'
]

const infoSecPricing = [
  { name: 'ИБ Старт', price: 'от 75 000 ₽', period: 'разовая диагностика', best: 'для малого бизнеса и собственника, который хочет понять текущие риски', includes: ['карта внешнего цифрового периметра', 'проверка доменов, сайта, публичных следов и утечек', 'поиск признаков фишинга и имитации бренда', 'короткий план закрытия критичных рисков'] },
  { name: 'ИБ Контур', price: 'от 150 000 ₽', period: 'разовая расширенная проверка', best: 'для компании с подрядчиками, CRM, рекламой, удаленными сотрудниками и чувствительными данными', includes: ['все из ИБ Старт', 'проверка подрядчиков и доступов', 'оценка рисков коммерческой тайны', 'регламент доступов и передачи данных', 'управленческий отчет с приоритетами'] },
  { name: 'ИБ Сопровождение', price: 'от 220 000 ₽ / месяц', period: 'постоянная работа', best: 'для бизнеса, где есть регулярные сделки, сотрудники, подрядчики и риск утечек', includes: ['ежемесячный мониторинг внешних сигналов', 'проверка новых подрядчиков с доступами', 'разбор подозрительных ситуаций', 'обновление реестра рисков', 'приоритетная связь по ИБ-инцидентам'] }
]

const outsourcingPricing = [
  { name: 'Контур безопасности', price: 'от 180 000 ₽ / месяц', best: 'для компаний без собственной службы безопасности', includes: ['до 10 проверок в месяц', 'контрагенты, кандидаты, поставщики', 'единый риск-реестр', 'краткие управленческие выводы', 'консультации по красным флагам'] },
  { name: 'Внешняя служба безопасности', price: 'от 350 000 ₽ / месяц', best: 'для компаний с регулярными закупками, наймом, авансами и международными контрагентами', includes: ['до 25 проверок в месяц', 'расширенные проверки и связи', 'ИБ Контур как часть сопровождения', 'мониторинг ключевых объектов', 'приоритетные задачи собственника'] },
  { name: 'Корпоративный штаб риска', price: 'от 650 000 ₽ / месяц', best: 'для собственников, групп компаний, сложных сделок и чувствительных конфликтов', includes: ['индивидуальный пул задач', 'сложные проверки и расследования', 'кризисные ситуации и инциденты', 'закрытый контур коммуникации', 'ежемесячный управленческий отчет'] }
]

const formats = [
  ['Стартовый контур', 'для компаний без службы безопасности', 'проверки по запросу, базовые регламенты, первичный риск-фильтр'],
  ['Операционное сопровождение', 'для регулярных сделок, закупок и найма', 'ежемесячный пул проверок, приоритетные задачи, единая история рисков'],
  ['Внешний отдел безопасности', 'для собственников и руководителей', 'закрытый контур, сложные проверки, информационная безопасность, кризисные задачи']
]

export default function SecurityOutsourcingPage() {
  return (
    <>
      <Head>
        <title>Служба безопасности на аутсорсе | HEIMDALL</title>
        <meta name="description" content="HEIMDALL как внешняя служба безопасности для бизнеса: проверка контрагентов, кандидатов, поставщиков, бенефициаров, сделок, мониторинг рисков и информационная безопасность." />
        <link rel="canonical" href="https://www.heimdall-group.ru/security-outsourcing" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" /> Внешняя служба безопасности
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              HEIMDALL может заменить службу безопасности в компании
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Если у бизнеса нет собственной службы безопасности, ее можно вынести на аутсорс. HEIMDALL закрывает проверки контрагентов, кандидатов, поставщиков, бенефициаров, сделок и информационных рисков без найма отдельного отдела.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#security-request" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Обсудить внешний контур <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#pricing" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Прайс и форматы
              </a>
              <Link href="/business-support" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Сопровождение бизнеса
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Что заменяем</div>
              <div className="mt-8 grid gap-4">
                {['проверка контрагентов', 'проверка кандидатов', 'контроль поставщиков', 'информационная безопасность', 'мониторинг рисков', 'закрытые задачи собственника'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Когда это нужно</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Внешний контур безопасности вместо хаотичных проверок</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {problems.map(([title, text]) => (
              <div key={title} className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-100">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Зона ответственности</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Что HEIMDALL берет на себя</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coverage.map(([title, text, Icon]) => (
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
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-sky-100">
                  <LockKeyhole className="h-4 w-4" /> Информационная безопасность
                </div>
                <h2 className="mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">
                  Большой раздел по защите данных, доступов и цифрового периметра
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/64">
                  Для собственника риск часто начинается не в суде и не в реестре, а в доступах, подрядчиках, переписке, доменах, утечках и людях, которые видят коммерческую информацию. Поэтому информационная безопасность встроена в сопровождение HEIMDALL.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {infosec.map(([title, text]) => (
                  <div key={title} className="rounded-[28px] border border-white/10 bg-black/25 p-6">
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-sky-100">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Как проходит работа по ИБ</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Клиент получает понятный контур, а не набор технических терминов</h2>
              <p className="mt-6 text-base leading-8 text-white/62">
                Мы описываем информационную безопасность языком собственника: где компания уязвима, через кого может произойти утечка, какие доступы опасны, где возможна подмена реквизитов и что нужно закрыть в первую очередь.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {infosecProcess.map(([title, text]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/25 p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Что получает клиент</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Конкретные результаты по ИБ</h2>
              <div className="mt-8 grid gap-4">
                {infosecDeliverables.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Границы ответственности</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Честно показываем, что входит и что не входит</h2>
              <div className="mt-8 grid gap-4">
                {infosecBoundaries.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 pb-24">
          <div className="mb-10 max-w-5xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Прайс</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Отдельно ИБ и отдельно полное сопровождение службы безопасности</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/62">
              Цены указаны как стартовые ориентиры. Итоговая стоимость зависит от числа объектов проверки, количества сотрудников и подрядчиков, международного контура, срочности и глубины анализа.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="mb-5 text-3xl font-semibold tracking-[-0.04em] text-sky-100">Информационная безопасность</h3>
            <div className="grid gap-5 lg:grid-cols-3">
              {infoSecPricing.map((plan, index) => (
                <div key={plan.name} className={`rounded-[36px] border p-7 backdrop-blur-2xl ${index === 1 ? 'border-sky-300/35 bg-sky-300/10' : 'border-white/10 bg-white/[0.045]'}`}>
                  <div className="text-sm uppercase tracking-[0.2em] text-white/42">{plan.period}</div>
                  <h4 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{plan.name}</h4>
                  <div className="mt-4 text-3xl font-semibold text-[#F7D784]">{plan.price}</div>
                  <p className="mt-4 text-sm leading-7 text-white/60">{plan.best}</p>
                  <div className="mt-7 grid gap-3">
                    {plan.includes.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-200" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-3xl font-semibold tracking-[-0.04em] text-[#F7D784]">Полное сопровождение как служба безопасности</h3>
            <div className="grid gap-5 lg:grid-cols-3">
              {outsourcingPricing.map((plan, index) => (
                <div key={plan.name} className={`rounded-[36px] border p-7 backdrop-blur-2xl ${index === 1 ? 'border-[#D6A84F]/35 bg-[#D6A84F]/10' : 'border-white/10 bg-white/[0.045]'}`}>
                  <h4 className="text-3xl font-semibold tracking-[-0.04em]">{plan.name}</h4>
                  <div className="mt-4 text-3xl font-semibold text-[#F7D784]">{plan.price}</div>
                  <p className="mt-4 text-sm leading-7 text-white/60">{plan.best}</p>
                  <div className="mt-7 grid gap-3">
                    {plan.includes.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[32px] border border-white/10 bg-black/25 p-7 text-sm leading-7 text-white/60">
            Разовые проверки контрагента, кандидата, поставщика или бенефициара можно заказывать отдельно. Прайс выше относится именно к информационной безопасности и постоянному внешнему контуру службы безопасности.
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Форматы работы</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">От разовых задач до внешнего отдела безопасности</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {formats.map(([name, audience, text], index) => (
              <div key={name} className={`rounded-[38px] border p-8 backdrop-blur-2xl ${index === 1 ? 'border-sky-300/30 bg-sky-300/10' : 'border-white/10 bg-white/[0.045]'}`}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-[#F7D784]">
                  <Gauge className="h-5 w-5" />
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em]">{name}</h3>
                <p className="mt-4 text-sm font-semibold text-sky-100">{audience}</p>
                <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="security-request" className="relative z-10 mx-auto max-w-4xl scroll-mt-28 px-5 pb-32">
          <SupportRequestForm language="ru" />
        </section>

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
