import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import { FileDown, ShieldCheck, ExternalLink } from 'lucide-react'

const reports = [
  {
    title: 'Отчёт по кандидату',
    badge: 'Candidate Screening',
    text: 'Демонстрационный отчёт по вымышленному кандидату: конфликт интересов, финансовая нагрузка, несоответствия в биографии, репутационные сигналы и итоговая рекомендация.',
    files: [
      '/reports/candidate-screening-premium-demo.pdf',
      '/reports/candidate-screening-demo.pdf',
      '/reports/candidate-screening.pdf',
      '/reports/candidate-report.pdf',
      '/reports/demo-candidate-report.pdf'
    ],
    previews: [
      '/report-previews/candidate-premium-preview.png',
      '/report-previews/candidate-screening-preview.png',
      '/report-previews/candidate-preview.png'
    ],
    fallback: '/demo-report'
  },
  {
    title: 'Отчёт по компании',
    badge: 'Counterparty Intelligence',
    text: 'Демонстрационный отчёт по вымышленному поставщику: цепочка поставок, судебная нагрузка, косвенная санкционная экспозиция, связанные компании и карта владения.',
    files: [
      '/reports/counterparty-intelligence-premium-demo.pdf',
      '/reports/counterparty-intelligence-demo.pdf',
      '/reports/counterparty-intelligence.pdf',
      '/reports/counterparty-report.pdf',
      '/reports/demo-counterparty-report.pdf'
    ],
    previews: [
      '/report-previews/counterparty-premium-preview.png',
      '/report-previews/counterparty-intelligence-preview.png',
      '/report-previews/counterparty-preview.png'
    ],
    fallback: '/demo-report'
  },
  {
    title: 'Отчёт по бенефициарам',
    badge: 'Beneficial Ownership Review',
    text: 'Демонстрационный отчёт по группе бенефициаров: скрытый контроль, номинальные лица, конфликт интересов, корпоративные споры и сеть связанных лиц.',
    files: [
      '/reports/beneficial-owner-premium-demo.pdf',
      '/reports/beneficial-ownership-premium-demo.pdf',
      '/reports/beneficial-owner-demo.pdf',
      '/reports/beneficial-ownership.pdf',
      '/reports/beneficiary-report.pdf'
    ],
    previews: [
      '/report-previews/beneficial-owner-premium-preview.png',
      '/report-previews/beneficial-ownership-preview.png',
      '/report-previews/beneficiary-preview.png'
    ],
    fallback: '/demo-report'
  }
]

function ReportCard({ report }) {
  const [file, setFile] = useState(report.files[0])
  const [preview, setPreview] = useState(report.previews[0])
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let alive = true

    async function findExisting(paths, fallback) {
      for (const path of paths) {
        try {
          const response = await fetch(path, { method: 'HEAD' })
          if (response.ok) return path
        } catch (error) {}
      }
      return fallback
    }

    Promise.all([
      findExisting(report.files, report.fallback),
      findExisting(report.previews, null)
    ]).then(([nextFile, nextPreview]) => {
      if (!alive) return
      setFile(nextFile)
      setPreview(nextPreview)
      setChecked(true)
    })

    return () => {
      alive = false
    }
  }, [report])

  const isPdf = file.endsWith('.pdf')

  return (
    <div className="overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl transition hover:-translate-y-2 hover:border-sky-300/35">
      <div className="h-[420px] bg-[#07101f] p-5">
        {preview ? (
          <img src={preview} alt={report.title} className="h-full w-full rounded-3xl object-cover object-top opacity-95" />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-3xl border border-white/10 bg-black/25 text-center text-sm leading-7 text-white/45">
            Предпросмотр PDF
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="mb-4 inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs text-sky-200">{report.badge}</div>
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">{report.title}</h2>
        <p className="mt-5 text-sm leading-7 text-white/60">{report.text}</p>

        <div className="mt-8 grid gap-3">
          <a href={file} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">
            {isPdf ? <FileDown className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
            {isPdf ? 'Открыть PDF' : 'Открыть демо-отчёт'}
          </a>

          {!checked && (
            <div className="text-center text-xs text-white/35">Проверяем файл отчёта...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SampleReportsPage() {
  return (
    <>
      <Head>
        <title>Примеры отчётов | HEIMDALL</title>
        <meta name="description" content="Демонстрационные отчёты HEIMDALL по кандидату, компании и бенефициарам." />
        <link rel="canonical" href="https://www.heimdall-group.ru/sample-reports" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <ShieldCheck className="h-4 w-4" />
              Demo Intelligence Reports
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Примеры отчётов HEIMDALL</h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Демонстрационные отчёты по вымышленным объектам: человек, компания и бенефициары. Каждый отчёт показывает, как HEIMDALL выявляет риски, связи и формирует управленческий вывод.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-20 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCard key={report.title} report={report} />
          ))}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-6 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Запрос</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Нужен отчёт по вашему объекту?</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">Оставьте заявку, и мы подберём формат проверки под вашу ситуацию.</p>
            </div>
            <Link href="/#lead" className="inline-flex items-center justify-center rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Оставить заявку
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
