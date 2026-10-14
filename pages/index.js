import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock3, FileSearch, LockKeyhole, ShieldCheck } from 'lucide-react'
import HeimdallFooter from '@/components/HeimdallFooter'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallRiskFloatingPlugin from '@/components/HeimdallRiskFloatingPlugin'
import OsintMotionSystem from '@/components/OsintMotionSystem'

const productPath = [
  { step: '01', title: 'Экспресс', meta: '19 000 ₽ · 1 рабочий день', text: 'Первичная проверка перед авансом, договором или отсрочкой. Помогает вовремя остановиться или понять, куда смотреть дальше.', href: '/proverka-kontragenta' },
  { step: '02', title: 'Расширенная проверка', meta: 'от 45 000 ₽ · 2-5 рабочих дней', text: 'Для сделки, где важны владельцы, связанные компании, судебная история, финансовые и репутационные сигналы.', href: '/proverka-kontragenta-pered-sdelkoy' },
  { step: '03', title: 'Глубокая проверка', meta: 'состав и цена согласуются заранее', text: 'Для инвестиций, покупки доли, сложной структуры, зарубежного элемента или большого массива документов.', href: '/due-diligence-russia' },
  { step: '04', title: 'Мониторинг', meta: 'регулярный контур контроля', text: 'Для отношений на месяцы: отслеживаем значимые изменения по компании и подаем сигнал, когда нужно вернуться к решению.', href: '/business-support' }
]

const reportRows = [
  ['Финансы', 'долги, банкротные признаки, исполнительные производства'],
  ['Суды', 'тип споров, повторяемость, важные суммы и роли'],
  ['Владение', 'руководители, владельцы, связанные лица'],
  ['Платеж', 'сверка договора, счета, сайта и получателя денег']
]

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HEIMDALL',
  url: 'https://www.heimdall-group.ru/',
  email: 'a.muradov@heimdall-group.ru',
  telephone: '+79936984959',
  sameAs: ['https://t.me/heimdall_risk']
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>HEIMDALL | Проверка контрагентов перед сделкой</title>
        <meta name="description" content="HEIMDALL помогает проверить контрагента перед авансом, договором или отсрочкой: факты, риски, платежный маршрут и понятный следующий шаг." />
        <link rel="canonical" href="https://www.heimdall-group.ru/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <OsintMotionSystem />
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(214,168,79,0.12),transparent_26%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl gap-8 px-4 py-10 sm:px-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex max-w-full items-center gap-3 border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#F7D784]">
              <Clock3 className="h-4 w-4 shrink-0" /> Экспресс-проверка до оплаты
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">Проверьте контрагента до аванса, договора или отсрочки</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">Сверяем компанию, владельцев, долги, суды, платежные реквизиты и обстоятельства вашей сделки. На выходе - короткий вывод: платить, запросить документы или остановиться.</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/proverka-kontragenta" className="inline-flex items-center justify-center gap-3 bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">Проверить контрагента <ArrowRight className="h-4 w-4" /></Link>
              <a href="#why-heimdall" className="inline-flex items-center justify-center gap-3 border border-white/12 bg-white/[0.06] px-6 py-4 font-semibold text-white/90">Чем отличаемся от реестров</a>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-6 py-4 font-semibold text-[#F7D784]">Пример отчета</Link>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ['19 000 ₽', 'Фиксированная цена экспресс-проверки.'],
                ['1 рабочий день', 'Срок после подтверждения задачи и данных.'],
                ['Без лишней глубины', 'Останавливаемся, если уже достаточно для решения.']
              ].map(([title, text]) => (
                <div key={title} className="border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl"><div className="text-sm font-semibold text-[#F7D784]">{title}</div><p className="mt-2 text-sm leading-6 text-white/58">{text}</p></div>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-[#07101f]/92 p-4 shadow-2xl backdrop-blur-2xl sm:p-5">
            <div className="border border-[#D6A84F]/20 bg-black/20 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3"><div className="inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]"><FileSearch className="h-5 w-5" /> Результат на одной странице</div><span className="border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-100">Понятно без методички</span></div>
              <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">Чек-лист для решения по сделке</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">Не загадочный балл, а конкретные категории, факты, ссылки на источники и объяснение, что делать с каждым сигналом.</p>
              <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {reportRows.map(([title, text]) => (
                  <div key={title} className="grid gap-2 py-3 sm:grid-cols-[0.3fr_1fr_auto] sm:items-center"><div className="font-semibold text-white">{title}</div><div className="text-sm leading-6 text-white/58">{text}</div><div className="inline-flex w-fit items-center gap-2 text-xs text-sky-200"><CheckCircle2 className="h-4 w-4" /> проверено</div></div>
                ))}
              </div>
              <div className="mt-5 border-l-2 border-[#D6A84F] bg-[#D6A84F]/[0.07] px-4 py-3 text-sm leading-6 text-white/72"><span className="font-semibold text-[#F7D784]">Рекомендация:</span> продолжить сделку с условиями, запросить документы или поставить платеж на паузу.</div>
            </div>
          </div>
        </section>

        <section id="why-heimdall" className="relative z-10 border-y border-white/10 bg-white/[0.025]"><div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-5 lg:grid-cols-[0.75fr_1.25fr]">
          <div><div className="text-sm uppercase tracking-[0.2em] text-[#F7D784]">Зачем платить за проверку</div><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">ЕГРЮЛ и агрегаторы полезны. Они не отвечают за ваше решение.</h2><p className="mt-5 text-base leading-8 text-white/62">Реестры дают отдельные факты. В реальной сделке важны связи между фактами, сумма аванса, документы, получатель денег и время, в которое нужно принять решение.</p></div>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="border border-white/10 bg-black/20 p-6"><div className="text-sm font-semibold text-white/72">Открытые реестры и агрегаторы</div><ul className="mt-5 grid gap-3 text-sm leading-6 text-white/56"><li>Показывают карточку компании и отдельные события.</li><li>Требуют самостоятельно сопоставить владельцев, судебный фон и платеж.</li><li>Не знают, что именно вы собираетесь подписывать или оплачивать.</li></ul></article>
            <article className="border border-sky-300/20 bg-sky-300/[0.07] p-6"><div className="flex items-center gap-2 text-sm font-semibold text-sky-100"><ShieldCheck className="h-5 w-5" /> HEIMDALL</div><ul className="mt-5 grid gap-3 text-sm leading-6 text-white/72"><li>Собирает факты вокруг одной конкретной сделки и ее участников.</li><li>Показывает, что подтверждено, что требует уточнения и что меняет условия платежа.</li><li>Дает следующий шаг, который можно передать финансовому директору, закупкам или юристу.</li></ul></article>
          </div>
        </div></section>

        <section id="product-path" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-20"><div className="max-w-3xl"><div className="text-sm uppercase tracking-[0.2em] text-sky-200">Логика работы</div><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Проверка растет вместе с риском сделки</h2><p className="mt-5 text-base leading-8 text-white/62">Не заставляем покупать глубокую проверку заранее. Каждый следующий уровень подключается только когда первый уровень показал причину углубляться.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{productPath.map((item) => (<Link key={item.title} href={item.href} className="group border border-white/10 bg-white/[0.045] p-6 transition hover:border-[#D6A84F]/40 hover:bg-white/[0.07]"><div className="text-sm font-semibold text-[#F7D784]">{item.step}</div><h3 className="mt-4 text-2xl font-semibold">{item.title}</h3><p className="mt-3 text-sm font-semibold text-sky-200">{item.meta}</p><p className="mt-4 text-sm leading-7 text-white/58">{item.text}</p><div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">Подробнее <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div></Link>))}</div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-20"><div className="grid gap-6 border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><div className="text-sm uppercase tracking-[0.2em] text-[#F7D784]">Для малого и среднего бизнеса</div><h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Не потерять аванс раньше, чем начнется дорогая проверка</h2><p className="mt-4 max-w-3xl text-base leading-8 text-white/66">Начните с проверки перед авансом. Если по базовым сигналам нет причин углубляться, на этом можно остановиться. Если риск есть, понятен следующий уровень и его цель.</p></div><Link href="/proverka-kompanii-pered-avansom" className="inline-flex items-center justify-center gap-3 bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">Проверка перед авансом <ArrowRight className="h-4 w-4" /></Link></div></section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-5 sm:pb-24"><div className="grid gap-4 md:grid-cols-3">{[
          ['Примеры отчетов', 'Вымышленные примеры показывают формат вывода и структуру чек-листа.', '/sample-reports'],
          ['Методология и источники', 'Объясняем, как отделяем факт от предположения и проверяем совпадения.', '/methodology'],
          ['Конфиденциальность и данные', 'До оплаты согласуем задачу, формат обмена материалами и условия работы.', '/trust-center']
        ].map(([title, text, href]) => (<Link key={title} href={href} className="border border-white/10 bg-white/[0.045] p-6 transition hover:border-sky-300/35"><LockKeyhole className="h-5 w-5 text-sky-200" /><h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-white/58">{text}</p></Link>))}</div></section>

        <HeimdallRiskFloatingPlugin language="ru" />
        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
