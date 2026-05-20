
import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { FileDown, ShieldCheck } from 'lucide-react'

const reports = [
  {
    title: 'Candidate Screening Report',
    badge: 'Executive Screening',
    text: 'Large fictional intelligence report covering conflict of interest, financial pressure, reputation signals and executive risk assessment.',
    file: '/reports/candidate-screening-premium-demo-en.pdf',
    image: '/report-previews/candidate-premium-preview.png'
  },
  {
    title: 'Counterparty Intelligence Report',
    badge: 'Due Diligence',
    text: 'Deep fictional supplier investigation with sanctions exposure, litigation history, ownership mapping and operational risk analysis.',
    file: '/reports/counterparty-intelligence-premium-demo-en.pdf',
    image: '/report-previews/counterparty-premium-preview.png'
  },
  {
    title: 'Beneficial Ownership Review',
    badge: 'UBO Investigation',
    text: 'Complex fictional beneficial ownership investigation with nominee structures, hidden control indicators and relationship mapping.',
    file: '/reports/beneficial-owner-premium-demo-en.pdf',
    image: '/report-previews/beneficial-owner-premium-preview.png'
  }
]

export default function SampleReportsEN() {
  return (
    <>
      <Head>
        <title>HEIMDALL Sample Reports</title>
        <meta name="description" content="Premium HEIMDALL demonstration reports in English." />
        <link rel="canonical" href="https://www.heimdall-group.ru/sample-reports-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex items-center gap-3">
              <Link href="/sample-reports" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">RU</Link>
              <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Request review</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <ShieldCheck className="h-4 w-4" />
              Demo Intelligence Reports
            </div>

            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Premium HEIMDALL Reports
            </h1>

            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Large fictional demonstration reports showing how HEIMDALL identifies operational, reputational and compliance risks.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-32 lg:grid-cols-3">
          {reports.map((report) => (
            <div key={report.title} className="overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.045] backdrop-blur-2xl transition hover:-translate-y-2 hover:border-sky-300/35">
              <div className="h-[460px] bg-[#07101f] p-5">
                <img src={report.image} alt={report.title} className="h-full w-full rounded-3xl object-cover object-top opacity-95" />
              </div>

              <div className="p-8">
                <div className="mb-4 inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs text-sky-200">
                  {report.badge}
                </div>

                <h2 className="text-2xl font-semibold tracking-[-0.03em]">
                  {report.title}
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/60">
                  {report.text}
                </p>

                <a
                  href={report.file}
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white"
                >
                  <FileDown className="h-4 w-4" />
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
