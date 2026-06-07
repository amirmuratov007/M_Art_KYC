import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, AlertTriangle, CheckCircle2, ClipboardCheck, FileSearch, LockKeyhole, Scale, ShieldCheck, UserCheck } from 'lucide-react'

const signals = [
  ['Корпоративное мошенничество', 'подозрительные закупки, откаты, фиктивные подрядчики, завышение стоимости, конфликт интересов'],
  ['Утечки и инсайдерские риски', 'передача коммерческой тайны, слив клиентской базы, несанкционированный доступ к документам'],
  ['Сговор внутри команды', 'неформальные группы влияния, давление на сотрудников, блокировка решений, скрытая лояльность поставщикам'],
  ['Нарушения процессов', 'обход регламентов, подмена согласований, ручное управление оплатами, работа вне утвержденных процедур'],
  ['Репутационные угрозы', 'действия сотрудников или подрядчиков, которые создают риск для руководства, бренда и переговорной позиции']
]

const stages = [
  ['1. Правовая рамка', 'Фиксируем основание расследования, полномочия заказчика, круг проверяемых процессов, режим конфиденциальности и ограничения по персональным данным.'],
  ['2. Гипотезы и карта риска', 'Определяем, где может быть нарушение: закупки, продажи, финансы, склад, доступы, подрядчики, переговоры или утечки информации.'],
  ['3. Сбор и сопоставление данных', 'Анализируем документы, переписку в разрешенном контуре, открытые источники, корпоративные следы, платежную и договорную логику.'],
  ['4. Интервью и проверочные мероприятия', 'Проводим структурированные беседы, сверку показаний, контрольные вопросы, анализ поведения и противоречий без давления и провокаций.'],
  ['5. Временное включение специалиста в процессы', 'При необходимости специалист HEIMDALL может быть легально включен в проектную группу или процесс клиента по договору и регламенту, без незаконного скрытого проникновения.'],
  ['6. Отчет и профилактика', 'Передаем выводы, доказательную карту, перечень нарушений, рекомендации по кадровым, договорным, ИБ и процессным мерам.']
]

const allowed = [
  'внутренний аудит документов, действий и бизнес-процессов',
  'выявление конфликта интересов, сговора и аффилированности',
  'проверка поставщиков, подрядчиков и сотрудников в допустимом правовом контуре',
  'анализ цифровых следов, доступов, логов и признаков утечки при наличии правового основания',
  'интервью, объяснения, сверка фактов и подготовка доказательной карты',
  'временное участие специалистов в проекте клиента по официальному договорному регламенту'
]

const prohibited = [
  'не проводим оперативно-розыскные мероприятия и не выдаем их за частную услугу',
  'не прослушиваем телефоны, не взламываем аккаунты и не получаем доступ к чужим системам незаконно',
  'не провоцируем сотрудников на нарушения и не создаем искусственные инциденты',
  'не собираем специальные категории персональных данных без законного основания',
  'не используем методы давления, угрозы, шантаж или незаконное наблюдение',
  'не подменяем правоохранительные органы и не обещаем уголовно-процессуальный результат'
]

const packages = [
  ['Внутренний скрининг', 'от 250 000 ₽', '7-10 рабочих дней', ['первичная карта риска', 'анализ документов и участников', 'гипотезы нарушений', 'короткий управленческий отчет']],
  ['Корпоративное расследование', 'от 600 000 ₽', '2-4 недели', ['полная проверка процесса или подразделения', 'интервью и сверка фактов', 'карта связей и конфликта интересов', 'рекомендации по пресечению нарушений']],
  ['Профилактический контур', 'от 450 000 ₽ / месяц', 'ежемесячно', ['постоянный мониторинг рисковых процессов', 'проверка поставщиков и сотрудников в рамках закона', 'конфиденциальные задачи для руководства', 'план предупреждения нарушений']]
]

export default function InternalInvestigationsPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('Внутреннее расследование')
  const openContact = (nextTopic) => {
    setTopic(nextTopic || 'Внутреннее расследование')
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>Внутренние расследования в компании | HEIMDALL</title>
        <meta name="description" content="Внутренние корпоративные расследования HEIMDALL: мошенничество, конфликт интересов, утечки, сговор, закупочные нарушения и профилактика рисков в правовом поле РФ." />
        <link rel="canonical" href="https://www.heimdall-group.ru/internal-investigations" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(214,168,79,0.18),transparent_34%),radial-gradient(circle_at_88%_16%,rgba(56,189,248,0.12),transparent_32%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              Внутренние расследования
            </div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Найти нарушение внутри компании до того, как оно станет уголовным делом, убытком или публичным скандалом
            </h1>
            <p className="mt-8 max-w-4xl text-lg leading-9 text-white/64 md:text-xl">
              HEIMDALL помогает собственникам и руководству проводить внутренние расследования: выявлять сговор, утечки, конфликт интересов, закупочные схемы, злоупотребления доступом и нарушения регламентов. Работа строится не как “серые методы”, а как управляемая корпоративная проверка в рамках закона, договора и режима конфиденциальности.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openContact('Внутреннее расследование')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816] shadow-[0_0_45px_rgba(214,168,79,0.24)]">
                Обсудить расследование <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/security-outsourcing" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Служба безопасности на аутсорсе
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-6 backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">Главный принцип</h2>
            <p className="mt-5 text-sm leading-7 text-white/64">
              Расследование должно помогать бизнесу принимать решение, а не создавать новый правовой риск. Поэтому мы заранее фиксируем границы: что можно проверять, какие данные допустимы, кто имеет доступ к материалам и как используется итоговый отчет.
            </p>
            <div className="mt-6 grid gap-3">
              {['Правовая рамка до старта', 'Конфиденциальный отчет', 'Без провокаций и давления', 'Фокус на предупреждение ущерба'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F7D784]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Когда это нужно</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Сигналы для запуска внутреннего расследования</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {signals.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <AlertTriangle className="h-6 w-6 text-[#F7D784]" />
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[38px] border border-sky-300/15 bg-sky-300/[0.055] p-6 backdrop-blur-2xl md:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-4xl">
                <div className="text-sm uppercase tracking-[0.24em] text-sky-200/80">Важно</div>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Мы не продаем “оперативно-розыскную деятельность”</h2>
                <p className="mt-6 text-base leading-8 text-white/64 md:text-lg">
                  Частная компания не должна подменять правоохранительные органы. Поэтому HEIMDALL не формулирует услугу как незаконное внедрение, прослушку, взлом, провокацию или сбор данных без основания. Мы работаем как корпоративный расследователь и внешний риск-контур: по договору, с согласованным регламентом, с учетом персональных данных работников и режима коммерческой тайны.
                </p>
              </div>
              <Scale className="h-14 w-14 shrink-0 text-sky-200/70" />
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Методика</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Как проходит расследование</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stages.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <ClipboardCheck className="h-6 w-6 text-[#F7D784]" />
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-24 lg:grid-cols-2">
          <div className="rounded-[34px] border border-emerald-300/15 bg-emerald-300/[0.055] p-6 backdrop-blur-2xl md:p-8">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Что можно делать</h2>
            <div className="mt-6 grid gap-3">
              {allowed.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[34px] border border-red-300/15 bg-red-300/[0.045] p-6 backdrop-blur-2xl md:p-8">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">Чего мы не делаем</h2>
            <div className="mt-6 grid gap-3">
              {prohibited.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66">
                  <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-red-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Прайс</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Стоимость внутренних расследований</h2>
            <p className="mt-6 text-base leading-8 text-white/60">Финальная стоимость зависит от количества процессов, подразделений, документов, участников и глубины проверки.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map(([title, price, timing, items]) => (
              <div key={title} className="rounded-[34px] border border-[#D6A84F]/18 bg-[#D6A84F]/[0.055] p-7 backdrop-blur-2xl">
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">{timing}</div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
                <div className="mt-4 text-2xl font-semibold text-white">{price}</div>
                <div className="mt-6 grid gap-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/62">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                      {item}
                    </div>
                  ))}
                </div>
                <button onClick={() => openContact(title)} className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-5 py-4 font-semibold text-[#050816]">
                  Запросить расчет <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <UserCheck className="h-10 w-10 text-[#F7D784]" />
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Что получает руководитель</h2>
              </div>
              <div className="grid gap-4 text-sm leading-7 text-white/64 md:grid-cols-2">
                {['обоснованную картину событий без слухов и эмоций', 'перечень лиц, процессов и точек контроля, которые требуют внимания', 'рекомендации по дисциплинарным, договорным и организационным действиям', 'план профилактики повторных нарушений', 'основания для передачи материалов юристам или правоохранительным органам при необходимости', 'конфиденциальный формат работы без публичного конфликта внутри компании'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-[#D6A84F]/25 bg-[#D6A84F]/[0.07] p-7 text-center backdrop-blur-2xl md:p-10">
            <FileSearch className="mx-auto h-10 w-10 text-[#F7D784]" />
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Есть подозрение на внутренний риск?</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/62">Опишите ситуацию без лишних деталей. Мы предложим безопасный формат проверки и сразу обозначим, что можно делать, а что лучше не трогать без юриста или правоохранительных органов.</p>
            <button onClick={() => openContact('Конфиденциальное внутреннее расследование')} className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Оставить конфиденциальную заявку <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic={topic} />
    </>
  )
}
