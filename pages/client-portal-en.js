import HeimdallPageShell from '@/components/HeimdallPageShell'
import { FileSearch, MessageSquare, ShieldCheck } from 'lucide-react'

const rows = [["Counterparty Review", "72", "Enhanced review"], ["Candidate Screening", "18", "Completed"], ["Foreign Company", "81", "Documents requested"]]

export default function ClientPortalPage() {
  return (
    <HeimdallPageShell title="HEIMDALL Client Portal" description="Demo of the future HEIMDALL client portal for review statuses, reports and risks." switchHref="/client-portal" switchLabel="RU">
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-5xl"><div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">Client Portal Concept</div><h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">A future portal for statuses, reports and reviews</h1><p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">Client portal concept: requests, review stages, reports, risk score, communication and case archive.</p></div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
        <div className="rounded-[42px] border border-sky-300/20 bg-white/[0.045] p-7 backdrop-blur-2xl">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="rounded-[34px] border border-white/10 bg-[#07101f]/90 p-7">
              <ShieldCheck className="mb-6 h-8 w-8 text-sky-300" />
              <h2 className="text-3xl font-semibold">Confidential workspace</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">All reviews, statuses and reports in one secure environment.</p>
            </div>
            <div className="space-y-4">
              {rows.map(([name, score, status]) => (
                <div key={name} className="grid gap-4 rounded-3xl border border-white/10 bg-black/25 p-5 md:grid-cols-[1fr_auto_auto] md:items-center">
                  <div className="flex items-center gap-4"><FileSearch className="h-5 w-5 text-sky-300" /><span className="font-semibold">{name}</span></div>
                  <div className="text-3xl font-semibold text-sky-100">{score}</div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">{status}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-5"><MessageSquare className="mb-4 h-5 w-5 text-sky-300" /><div className="text-white/70">Secure messaging and analyst comments can be added in the future.</div></div>
        </div>
      </section>
    </HeimdallPageShell>
  )
}
