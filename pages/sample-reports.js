import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ArrowRight, FileCheck2, FileSearch, Network, UserRoundCheck } from 'lucide-react'

const reports = [
  {
    title: 'Проверка контрагента',
    text: 'Решение по авансу, финансы, суды, владельцы, платежный контур и вопросы к документам.',
    href: '/demo-report?type=company',
    icon: FileSearch,
  },
  {
    title: 'Проверка кандидата',
    text: 'Биография, судебный фон, связи, доступ к чувствительным процессам и вопросы для интервью.',
    href: '/demo-report?type=candidate',
    icon: UserRoundCheck,
  },
  {
    title: 'Проверка бенефициаров',
    text: 'Цепочка владения, подтверждение контроля, документы и факты, влияющие на условия сделки.',
    href: '/demo-report?type=ownership',
    icon: Network,
  },
]

export default function SampleReportsPage() {
  return (
    <>
      <Head>
        <title>Примеры справок | HEIMDALL</title>
        <meta name="description" content="Одностраничные демонстрационные справки HEIMDALL по контрагенту, кандидату и бенефициарам." />
        <link rel="canonical" href="https://www.heimdall-group.ru/sample-reports" />
      </Head>
      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm uppercase tracking-[0.18em] text-sky-200"><FileCheck2 className="h-4 w-4" /> Формат результата</div>
            <h1 className="mt-7 text-4xl font-semibold leading-tight md:text-6xl">Одностраничная справка для решения</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">Вместо длинного массива находок клиент видит решение, четыре категории проверки, факты с источниками и вопросы, которые нужно закрыть до сделки.</p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-16 lg:grid-cols-3">
          {reports.map((report) => {
            const Icon = report.icon
            return (
              <Link key={report.title} href={report.href} className="group border border-white/10 bg-white/[0.045] p-7 transition hover:border-sky-300/35 hover:bg-white/[0.07]">
                <Icon className="h-7 w-7 text-sky-200" />
                <h2 className="mt-7 text-2xl font-semibold">{report.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/60">{report.text}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">Открыть пример <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></div>
              </Link>
            )
          })}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 border-y border-[#D6A84F]/25 py-10 md:grid-cols-3">
            {[
              ['1', 'Решение', 'Коротко показывает, что делать с платежом, договором или кандидатом.'],
              ['2', 'Факты', 'Отделяет подтвержденные сведения от того, что нужно уточнить.'],
              ['3', 'Следующий шаг', 'Перечисляет документы и вопросы, которые реально меняют решение.'],
            ].map(([number, title, text]) => <div key={number}><div className="text-sm font-semibold text-[#F7D784]">0{number}</div><h2 className="mt-3 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-white/60">{text}</p></div>)}
          </div>
        </section>
        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
