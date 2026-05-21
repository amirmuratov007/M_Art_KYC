import Link from 'next/link'
import Head from 'next/head'
import HeimdallLogo from '@/components/HeimdallLogo'
import { LayoutDashboard, FolderKanban, PlusCircle, ArrowRight, FileText, UploadCloud } from 'lucide-react'

export function AnalystLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} | HEIMDALL Analyst Console</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className="min-h-screen bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/analyst" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Dashboard</Link>
              <Link href="/analyst/cases" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">Cases</Link>
              <Link href="/analyst/new-case" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold">New Case</Link>
            </div>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[30px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl lg:sticky lg:top-6 lg:h-fit">
            <div className="mb-4 px-3 text-xs uppercase tracking-[0.22em] text-[#F7D784]/80">Analyst Console</div>
            <nav className="grid gap-2">
              {[
                ['Dashboard', '/analyst', LayoutDashboard],
                ['Cases', '/analyst/cases', FolderKanban],
                ['New Case', '/analyst/new-case', PlusCircle]
              ].map(([name, href, Icon]) => (
                <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/7 hover:text-[#F7D784]">
                  <Icon className="h-4 w-4" />
                  {name}
                </Link>
              ))}
            </nav>
          </aside>

          <section>{children}</section>
        </div>
      </main>
    </>
  )
}

export function StatusBadge({ status }) {
  const cls = status === 'Analyst Review'
    ? 'border-[#D6A84F]/30 bg-[#D6A84F]/10 text-[#F7D784]'
    : status === 'Completed' || status === 'Approved'
      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'
      : status === 'In Progress'
        ? 'border-sky-300/20 bg-sky-300/10 text-sky-200'
        : 'border-white/10 bg-white/5 text-white/70'

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{status}</span>
}

export function RiskBadge({ score }) {
  const level = score >= 80 ? 'High' : score >= 55 ? 'Medium' : 'Low'
  const cls = score >= 80
    ? 'border-red-300/25 bg-red-300/10 text-red-200'
    : score >= 55
      ? 'border-amber-300/25 bg-amber-300/10 text-amber-200'
      : 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{level} · {score}/100</span>
}

export function CaseCard({ item }) {
  return (
    <Link href={`/analyst/cases/${item.id}`} className="group block rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-sky-300/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusBadge status={item.status} />
        <RiskBadge score={item.risk} />
      </div>
      <div className="mt-6 text-sm text-white/40">{item.id}</div>
      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{item.subject}</h3>
      <p className="mt-3 text-sm text-sky-200/70">{item.type}</p>
      <p className="mt-4 text-sm leading-7 text-white/58">{item.summary}</p>
      <div className="mt-6 grid gap-2 text-sm text-white/50">
        <div>Client: <span className="text-white/75">{item.client}</span></div>
        <div>Analyst: <span className="text-white/75">{item.analyst}</span></div>
        <div>Deadline: <span className="text-white/75">{item.deadline}</span></div>
      </div>
      <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
        Open case
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export function DocumentList({ documents = [] }) {
  return (
    <div className="grid gap-3">
      {documents.map((name) => (
        <div key={name} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-sky-300" />
            <div>
              <div className="font-medium text-white/85">{name}</div>
              <div className="mt-1 text-xs text-white/40">Mock document · upload storage pending</div>
            </div>
          </div>
          <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">Open</button>
        </div>
      ))}
    </div>
  )
}

export function UploadBox() {
  return (
    <div className="rounded-[30px] border border-dashed border-sky-300/25 bg-sky-300/5 p-8 text-center">
      <UploadCloud className="mx-auto h-9 w-9 text-sky-300" />
      <div className="mt-4 text-xl font-semibold">Upload documents</div>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/55">PDF, Excel, Word, TXT, screenshots and archives. Upload is mock in this MVP.</p>
      <button onClick={() => alert('File upload will be connected to storage in the next stage')} className="mt-5 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white">Select files</button>
    </div>
  )
}
