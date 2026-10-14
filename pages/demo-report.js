import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { AlertTriangle, ArrowRight, CheckCircle2, CircleHelp, FileCheck2, FileSearch, Landmark, Network, Scale, ShieldCheck, WalletCards } from 'lucide-react'

const variants = {
  company: {
    label: 'Демонстрационная справка по компании',
    subject: 'ООО «Северный Контур»',
    type: 'Новый поставщик перед авансом',
    decision: 'Запросить документы до оплаты',
    decisionText: 'Есть несостыковка между договором и платежными реквизитами. Остальные категории не дают критичного основания останавливать сделку, но платеж лучше не проводить до сверки.',
    status: 'Требует уточнения',
    categories: [
      ['Финансы', 'Подтверждено', 'Критичных банкротных и исполнительных сигналов в демонстрационной проверке не найдено.', Landmark, 'good'],
      ['Суды', 'Нужно уточнить', 'Есть хозяйственный спор. Для решения важны предмет спора, сумма и текущая стадия.', Scale, 'neutral'],
      ['Владение', 'Подтверждено', 'Руководитель и владельцы сопоставлены с данными по компании.', Network, 'good'],
      ['Платеж', 'Риск для сделки', 'Счет выставлен от лица, которое не совпадает с договорной стороной. Нужны подтверждающие документы.', WalletCards, 'risk'],
    ],
    facts: [
      ['Договор и счет', 'В документах указан разный получатель платежа.', 'Материалы клиента'],
      ['Судебный спор', 'Выявлен один хозяйственный спор, требующий уточнения статуса.', 'Судебные материалы'],
      ['Владение', 'Данные руководителя и участников согласованы между источниками.', 'Официальные реестры'],
    ],
    questions: ['Получить письмо о праве принимать платеж за поставщика.', 'Запросить актуальные реквизиты и основание для их изменения.', 'Уточнить предмет и статус судебного спора.'],
  },
  candidate: {
    label: 'Демонстрационная справка по кандидату',
    subject: 'Алексей Воронов',
    type: 'Кандидат на должность с доступом к закупкам',
    decision: 'Провести интервью по двум фактам',
    decisionText: 'Критичных стоп-факторов в демонстрационной проверке нет. Перед предложением стоит уточнить период работы в двух организациях и возможный конфликт интересов.',
    status: 'Нужно уточнить',
    categories: [
      ['Биография', 'Нужно уточнить', 'В одном периоде работы есть расхождение между резюме и открытыми сведениями.', FileCheck2, 'neutral'],
      ['Судебный фон', 'Подтверждено', 'Критичных личных споров в демонстрационной проверке не найдено.', Scale, 'good'],
      ['Связи', 'Нужно уточнить', 'Есть пересечение с бывшим поставщиком работодателя.', Network, 'neutral'],
      ['Доступ и роль', 'Подтверждено', 'Для должности нужны разграничение полномочий и стандартная проверка рекомендаций.', ShieldCheck, 'good'],
    ],
    facts: [
      ['Период работы', 'Один месяц в резюме не подтверждается доступными источниками.', 'Резюме и открытые данные'],
      ['Связь с поставщиком', 'Бывший коллега связан с поставщиком прошлой компании.', 'Корпоративные сведения'],
      ['Судебный фон', 'Существенных совпадений по заданным данным не найдено.', 'Официальные источники'],
    ],
    questions: ['Попросить кандидата пояснить расхождение в периоде работы.', 'Уточнить характер связи с бывшим поставщиком.', 'Получить рекомендации с двух последних мест работы.'],
  },
  ownership: {
    label: 'Демонстрационная справка по бенефициарам',
    subject: 'Группа «Северный Контур»',
    type: 'Проверка структуры владения перед сделкой',
    decision: 'Расширить проверку структуры',
    decisionText: 'В демонстрационной структуре есть несколько звеньев, которые требуют документов о контроле. Без них нельзя подтвердить конечного бенефициара и оценить условия сделки полностью.',
    status: 'Требует расширения',
    categories: [
      ['Структура владения', 'Риск для сделки', 'Одно звено владения требует документального подтверждения.', Network, 'risk'],
      ['Суды', 'Подтверждено', 'Критичных корпоративных споров по основному обществу не найдено.', Scale, 'good'],
      ['Финансы', 'Нужно уточнить', 'Нужна свежая отчетность по одному из обществ группы.', Landmark, 'neutral'],
      ['Документы', 'Риск для сделки', 'Предоставленный пакет не подтверждает конечный контроль.', FileSearch, 'risk'],
    ],
    facts: [
      ['Цепочка владения', 'Одно юридическое лицо из цепочки не раскрыто в пакете документов.', 'Документы клиента'],
      ['Корпоративные связи', 'Зафиксирована связь двух участников через общего руководителя.', 'Официальные реестры'],
      ['Отчетность', 'По одному обществу требуется более свежая финансовая отчетность.', 'Публичные сведения'],
    ],
    questions: ['Запросить схему группы и документы о конечном контроле.', 'Получить актуальную отчетность по отмеченному обществу.', 'Сверить полномочия лиц, подписывающих документы по сделке.'],
  },
}

const toneClass = {
  good: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100',
  neutral: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
  risk: 'border-rose-300/25 bg-rose-300/10 text-rose-100',
}

export default function DemoReportPage() {
  const router = useRouter()
  const key = typeof router.query.type === 'string' ? router.query.type : 'company'
  const report = variants[key] || variants.company

  return (
    <>
      <Head>
        <title>{`Демо-справка: ${report.subject} - HEIMDALL`}</title>
        <meta name="description" content="Демонстрационный одностраничный формат справки HEIMDALL: решение, категории проверки, факты, вопросы и источники." />
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_17%_8%,rgba(37,99,235,0.2),transparent_28%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-5 md:py-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-white/52">
            <div className="inline-flex items-center gap-2"><FileCheck2 className="h-4 w-4 text-sky-200" /> {report.label}</div>
            <div>Вымышленный объект. Формат демонстрирует структуру результата.</div>
          </div>

          <article className="border border-white/12 bg-[#07101f]/90 shadow-2xl backdrop-blur-2xl">
            <header className="grid gap-6 border-b border-white/10 p-6 md:grid-cols-[1fr_auto] md:items-start md:p-8">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-sky-200">Объект проверки</div>
                <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{report.subject}</h1>
                <p className="mt-3 text-sm leading-7 text-white/60">{report.type}</p>
              </div>
              <div className={`w-fit border px-4 py-3 text-sm font-semibold ${toneClass[report.status === 'Требует расширения' ? 'risk' : 'neutral']}`}>{report.status}</div>
            </header>

            <section className="grid gap-5 border-b border-white/10 p-6 md:grid-cols-[0.7fr_1.3fr] md:p-8">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-[#F7D784]">Решение по сделке</div>
                <div className="mt-3 flex items-center gap-3 text-2xl font-semibold text-[#F7D784]"><AlertTriangle className="h-6 w-6" />{report.decision}</div>
              </div>
              <p className="text-base leading-8 text-white/75">{report.decisionText}</p>
            </section>

            <section className="p-6 md:p-8">
              <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-sky-200" /><h2 className="text-xl font-semibold">Чек-лист проверки</h2></div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {report.categories.map(([title, status, text, Icon, tone]) => (
                  <div key={title} className="border border-white/10 bg-black/20 p-5">
                    <div className="flex items-start justify-between gap-3"><Icon className="h-5 w-5 text-sky-200" /><span className={`border px-2 py-1 text-xs ${toneClass[tone]}`}>{status}</span></div>
                    <h3 className="mt-5 font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 border-t border-white/10 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
              <div>
                <h2 className="flex items-center gap-3 text-xl font-semibold"><FileSearch className="h-5 w-5 text-sky-200" /> Факты и источники</h2>
                <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                  {report.facts.map(([title, text, source]) => (
                    <div key={title} className="grid gap-2 py-4 md:grid-cols-[0.28fr_1fr_auto] md:items-center"><div className="font-semibold">{title}</div><p className="text-sm leading-6 text-white/60">{text}</p><div className="text-xs text-sky-200">{source}</div></div>
                  ))}
                </div>
              </div>
              <div className="border border-[#D6A84F]/25 bg-[#D6A84F]/[0.07] p-5">
                <h2 className="flex items-center gap-3 text-xl font-semibold"><CircleHelp className="h-5 w-5 text-[#F7D784]" /> Что запросить дальше</h2>
                <ol className="mt-5 grid gap-3 text-sm leading-6 text-white/70">{report.questions.map((question, index) => <li key={question} className="flex gap-3"><span className="font-semibold text-[#F7D784]">0{index + 1}</span><span>{question}</span></li>)}</ol>
              </div>
            </section>
          </article>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/55">
            <p>В отчете отделяются подтвержденные факты, вопросы и риски для решения. Демонстрационный объект вымышлен.</p>
            <Link href="/proverka-kontragenta" className="inline-flex items-center gap-2 bg-sky-500 px-5 py-3 font-semibold text-white">Проверить контрагента <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
