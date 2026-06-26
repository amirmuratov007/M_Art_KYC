import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'

const sections = [
  {
    title: 'Контрагент и сделка',
    items: [
      'Проверить совпадение юридического лица, реквизитов и фактического получателя денег.',
      'Посмотреть свежие изменения директора, адреса, учредителей и статуса компании.',
      'Проверить судебные дела, исполнительные производства и признаки долговой нагрузки.',
      'Оценить связанные компании, повторяющиеся адреса, телефоны, руководителей и учредителей.',
      'Сверить полномочия подписанта и срок действия доверенности.',
      'Проверить, нет ли платежа через третье лицо без понятного основания.',
      'Зафиксировать условия возврата аванса и документы, которые должны быть переданы до оплаты.',
      'Отделить подтвержденные факты от устных обещаний менеджера или посредника.',
      'Проверить репутационный фон и негативные упоминания до подписания договора.',
      'Оценить, какие условия договора закрывают найденные риски.'
    ]
  },
  {
    title: 'Поставщики и подрядчики',
    items: [
      'Проверить историю поставщика до первой крупной партии или предоплаты.',
      'Сравнить заявленный опыт с публичными следами, кейсами и деловой историей.',
      'Проверить, не менялись ли юрлица перед получением нового заказа.',
      'Разделить тестовый бюджет и основной аванс.',
      'Проверить, кому принадлежат рекламные кабинеты, аналитика, кампании и доступы.',
      'Ограничить подрядчику права только нужными функциями.',
      'Назначить владельца доступа и дату пересмотра прав.',
      'Фиксировать KPI, критерии остановки и порядок отчетности заранее.',
      'Проверять субподрядчиков, если они получают доступ к данным или деньгам.',
      'Сохранять переписку и решения в корпоративном контуре, а не только в мессенджере.'
    ]
  },
  {
    title: 'Кандидаты и доступы',
    items: [
      'Усиленно проверять роли с доступом к деньгам, данным, клиентам и документам.',
      'Проверять конфликт интересов и связанный бизнес кандидата.',
      'Сверять биографию, рекомендации и фактический опыт без незаконного сбора данных.',
      'Разделять проверку линейного сотрудника и руководителя.',
      'Проверять финансовые, судебные и репутационные сигналы только в рамках роли.',
      'Не выдавать полные доступы в первый день без необходимости.',
      'Настроить MFA для почты, CRM, банков, маркетплейсов и рекламных кабинетов.',
      'Закрывать доступы сразу после увольнения или завершения проекта.',
      'Проверять, кто может менять реквизиты, создавать платежи и подтверждать заявки.',
      'Вести журнал действий по чувствительным системам.'
    ]
  },
  {
    title: 'Покупка имущества',
    items: [
      'Проверять продавца до аванса, а не только объект покупки.',
      'Для квартиры смотреть собственника, полномочия, семейные и наследственные риски.',
      'Для дома и дачи отдельно проверять землю, границы, ВРИ, подъезд и коммуникации.',
      'Для автомобиля проверять ограничения, залоги, регистрацию и исполнительные производства.',
      'Не переводить деньги третьему лицу без документального основания.',
      'Проверять доверенности, согласия и право распоряжения объектом.',
      'Оценивать срочность сделки как отдельный риск-сигнал.',
      'Фиксировать условия возврата задатка или аванса письменно.',
      'Проверять историю переходов права и спорные обстоятельства.',
      'Подключать профильного юриста там, где нужен правовой анализ титула.'
    ]
  },
  {
    title: 'Информационная безопасность',
    items: [
      'Проверять, какие сервисы открыты в интернет и кто отвечает за обновления.',
      'Приоритизировать уязвимости, которые реально эксплуатируются или связаны с деньгами.',
      'Разделять личные и корпоративные учетные записи.',
      'Запретить передачу паролей в чатах и таблицах.',
      'Проверять подрядчиков, которые получают доступ к сайту, рекламе, CRM или облакам.',
      'Хранить резервные копии отдельно от основной инфраструктуры.',
      'Проверять домены, почту и SPF/DKIM/DMARC для снижения фишинга.',
      'Иметь короткий план действий при утечке, взломе или подозрительном платеже.',
      'Обучать сотрудников не формально, а на примерах реальных атак.',
      'Регулярно пересматривать список доступов, владельцев систем и критичных поставщиков.'
    ]
  }
]

const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0)

export default function SecurityChecklistPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '50 security checks for business decisions',
    description: 'HEIMDALL practical security checklist for counterparties, suppliers, candidates, purchases and information security.',
    url: 'https://www.heimdall-group.ru/security-checklist'
  }

  return (
    <>
      <Head>
        <title>50 пунктов безопасности перед сделкой | HEIMDALL</title>
        <meta name="description" content="Практический чеклист HEIMDALL: 50 пунктов безопасности для сделок, поставщиков, кандидатов, покупки имущества и информационной безопасности." />
        <link rel="canonical" href="https://www.heimdall-group.ru/security-checklist" />
        <meta property="og:title" content="50 пунктов безопасности перед сделкой | HEIMDALL" />
        <meta property="og:description" content="Проверка рисков перед авансом, наймом, доступами, поставщиками и покупкой имущества." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" />
              HEIMDALL Security Checklist
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              50 пунктов безопасности перед решением
            </h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Короткая карта того, что стоит проверить до аванса, найма, доступа к системам, покупки имущества, выбора подрядчика или подписания сделки.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/62">
              {['Сделки', 'Поставщики', 'Кандидаты', 'Имущество', 'InfoSec'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 lg:grid-cols-5">
            {sections.map((section, index) => (
              <article key={section.title} className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <div className="flex h-full flex-col">
                  <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">{String(index + 1).padStart(2, '0')}</div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{section.title}</h2>
                  <ol className="mt-6 grid gap-4 text-sm leading-6 text-white/66">
                    {section.items.map((item) => (
                      <li key={item} className="grid grid-cols-[auto_1fr] gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[34px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.08] p-8 backdrop-blur-2xl md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]">{totalItems} проверок</div>
              <h2 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Нужна проверка перед конкретным решением?</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/64">
                HEIMDALL собирает факты, связи и риск-сигналы в понятный вывод: что подтверждено, что настораживает и какие условия стоит изменить до оплаты или подписания.
              </p>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
              Выбрать проверку
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
