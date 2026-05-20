import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { FileDown, ShieldCheck } from 'lucide-react'

const reports = [
  {
    title: 'Пример отчёта по кандидату',
    text: 'Демонстрационный отчёт по вымышленному кандидату: биография, репутационные сигналы, риск-индикаторы и рекомендация.',
    file: '/reports/candidate-screening-demo.pdf',
    image: '/report-previews/candidate-preview.png'
  },
  {
    title: 'Пример отчёта по компании',
    text: 'Демонстрационный отчёт по вымышленной компании: структура, судебная история, комплаенс-риски и вывод аналитика.',
    file: '/reports/counterparty-intelligence-demo.pdf',
    image: '/report-previews/company-preview.png'
  },
  {
    title: 'Пример отчёта по бенефициару',
    text: 'Демонстрационный отчёт по вымышленному бенефициару: связи, владение, репутационные сигналы и рекомендация.',
    file: '/reports/beneficial-owner-review-demo.pdf',
    image: '/report-previews/beneficial-owner-preview.png'
  }
]

export default function SampleReportsPage() {
  return (
    <>
      <Head>
        <title>Примеры отчётов | HEIMDALL</title>
        <meta name="description" content="Примеры демонстрационных отчётов HEIMDALL по кандидату, компании и бенефициару." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex items-center gap-3">
              <Link href="/sample-reports-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link>
              <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Запросить проверку</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <ShieldCheck className="h-4 w-4" />
              Demo Reports
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Примеры отчётов HEIMDALL</h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Три демонстрационных отчёта по вымышленным объектам: человек, компания и бенефициар. Их можно скачать и посмотреть формат аналитики.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-32 lg:grid-cols-3">
          {reports.map((report) => (
            <div key={report.title} className="overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl transition hover:-translate-y-2 hover:border-sky-300/35">
              <div className="h-64 bg-[#07101f] p-8">
                <img src={report.image} alt={report.title} className="h-full w-full rounded-3xl object-cover opacity-90" />
              </div>
              <div className="p-8">
                <div className="mb-4 inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs text-sky-200">Fictional demo</div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">{report.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{report.text}</p>
                <a href={report.file} className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">
                  <FileDown className="h-4 w-4" />
                  Скачать PDF
                </a>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
