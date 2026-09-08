import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ExpressCounterpartyForm from '@/components/ExpressCounterpartyForm'
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, FileSearch, LockKeyhole, Scale, ShieldCheck } from 'lucide-react'

const included = [
  'статус компании, регистрационные данные, руководители и владельцы',
  'суды, исполнительные производства, банкротные и долговые сигналы',
  'санкционные, репутационные и связанные корпоративные риски',
  'несостыковки между договором, счетом, сайтом и получателем денег'
]

const result = [
  ['Факты', 'Короткая проверяемая сводка со ссылками на источники.'],
  ['Красные флаги', 'Сигналы, которые способны изменить условия сделки.'],
  ['Решение', 'Работать, запросить документы, изменить расчеты или остановиться.']
]

const faq = [
  ['Каких данных достаточно для старта?', 'ИНН, название компании или адрес сайта. Полезно добавить договор, счет и коротко описать предстоящее решение.'],
  ['Когда начинается срок?', 'После подтверждения задачи и получения достаточных исходных данных. Точный срок фиксируем до начала работы.'],
  ['Что происходит, если нужна глубокая проверка?', 'Сначала сообщим, почему экспресс-формата недостаточно. При переходе к расширенной проверке стоимость экспресс-проверки учитывается в итоговой цене.'],
  ['Используются ли закрытые базы?', 'Нет. Работа строится на законных источниках, документах клиента и проверяемой аналитике.']
]

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Экспресс-проверка контрагента перед авансом или сделкой',
  description: 'Проверка компании, владельцев, судов, долговых, санкционных и репутационных сигналов за один рабочий день.',
  provider: {
    '@type': 'Organization',
    name: 'HEIMDALL',
    url: 'https://www.heimdall-group.ru/'
  },
  areaServed: 'RU',
  offers: {
    '@type': 'Offer',
    price: '19000',
    priceCurrency: 'RUB',
    url: 'https://www.heimdall-group.ru/proverka-kontragenta'
  }
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://www.heimdall-group.ru/' },
    { '@type': 'ListItem', position: 2, name: 'Услуги', item: 'https://www.heimdall-group.ru/services' },
    { '@type': 'ListItem', position: 3, name: 'Экспресс-проверка контрагента', item: 'https://www.heimdall-group.ru/proverka-kontragenta' }
  ]
}

export default function CounterpartyExpressPage() {
  return (
    <>
      <Head>
        <title>Экспресс-проверка контрагента за 1 день | HEIMDALL</title>
        <meta name="description" content="Экспресс-проверка контрагента перед авансом или договором: владельцы, суды, долги, санкции, репутация и получатель платежа. Стоимость 19 000 рублей." />
        <link rel="canonical" href="https://www.heimdall-group.ru/proverka-kontragenta" />
        <meta property="og:title" content="Экспресс-проверка контрагента за один рабочий день" />
        <meta property="og:description" content="Короткая справка, красные флаги и решение по риску до оплаты или подписания." />
        <meta property="og:url" content="https://www.heimdall-group.ru/proverka-kontragenta" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(214,168,79,0.15),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1fr_0.82fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-3 border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
              <Clock3 className="h-4 w-4" /> Один рабочий день
            </div>
            <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-[0.98] sm:text-6xl md:text-7xl">
              Проверьте контрагента до аванса или подписания
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/66 sm:text-xl sm:leading-9">
              Быстрый аналитический скрининг компании, людей и платежного маршрута. На выходе - факты, тревожные сигналы и понятное решение по следующему шагу.
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-6 border-y border-white/10 py-6">
              <div><div className="text-sm text-white/45">Стоимость</div><div className="mt-1 text-4xl font-semibold text-[#F7D784]">19 000 ₽</div></div>
              <div><div className="text-sm text-white/45">Срок</div><div className="mt-1 text-xl font-semibold">1 рабочий день</div></div>
              <div><div className="text-sm text-white/45">Формат</div><div className="mt-1 text-xl font-semibold">Краткая справка</div></div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#express-check" className="inline-flex items-center justify-center gap-3 bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Отправить ИНН <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 border border-white/12 bg-white/7 px-6 py-4 font-semibold text-white">Посмотреть пример отчета</Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3 border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-white/68">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F7D784]" /> {item}
                </div>
              ))}
            </div>
          </div>

          <ExpressCounterpartyForm />
        </section>

        <section className="relative z-10 border-y border-white/10 bg-white/[0.025]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20">
            <div className="max-w-3xl"><div className="text-sm uppercase tracking-[0.2em] text-sky-300">Результат</div><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Справка, которую можно использовать в решении</h2></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {result.map(([title, text], index) => (
                <article key={title} className="border border-white/10 bg-[#07101f] p-6">
                  <div className="text-sm text-[#F7D784]">0{index + 1}</div><h3 className="mt-4 text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/58">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 sm:py-24 lg:grid-cols-2">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-[#F7D784]">Границы экспресс-формата</div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Сразу говорим, когда одного дня недостаточно</h2>
            <p className="mt-6 text-base leading-8 text-white/62">Сложная цепочка владельцев, иностранные юрисдикции, большой массив документов или внутреннее расследование требуют расширенного объема. До начала работы вы получите точный состав и цену.</p>
            <div className="mt-7 flex items-start gap-3 border-l-2 border-[#D6A84F] bg-[#D6A84F]/[0.07] p-5 text-sm leading-7 text-white/68">
              <Scale className="mt-1 h-5 w-5 shrink-0 text-[#F7D784]" /> При переходе к расширенной проверке стоимость экспресс-скрининга учитывается в итоговой цене.
            </div>
          </div>
          <div className="grid gap-4">
            {[
              [ShieldCheck, 'Работа по согласованному заданию', 'До старта фиксируем объект, решение клиента, объем и срок.'],
              [LockKeyhole, 'Конфиденциальная передача', 'Полученные документы используются только для согласованной задачи.'],
              [FileSearch, 'Проверяемые источники', 'В справке отделяем подтвержденные факты от аналитических предположений.'],
              [AlertTriangle, 'Без обещаний абсолютной безопасности', 'Отчет снижает неопределенность, но не заменяет юридическую и финансовую экспертизу.']
            ].map(([Icon, title, text]) => (
              <div key={title} className="flex gap-4 border border-white/10 bg-white/[0.04] p-5"><Icon className="mt-1 h-5 w-5 shrink-0 text-sky-300" /><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/56">{text}</p></div></div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-5 sm:pb-28">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div><div className="text-sm uppercase tracking-[0.2em] text-sky-300">Вопросы</div><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">До отправки заявки</h2><Link href="/cases/kontragent-180m" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">Посмотреть кейс проверки <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="grid gap-3">
              {faq.map(([question, answer]) => (
                <details key={question} className="group border border-white/10 bg-white/[0.04] p-5"><summary className="cursor-pointer list-none font-semibold">{question}</summary><p className="mt-3 text-sm leading-7 text-white/58">{answer}</p></details>
              ))}
            </div>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
