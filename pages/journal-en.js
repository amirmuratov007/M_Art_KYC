import Head from 'next/head'
import Link from 'next/link'
import { ArrowRight, BookOpen, ShieldCheck } from 'lucide-react'

const posts = [["Why candidate screening is no longer HR, but risk management", "A candidate may look perfect in interviews but still be risky for a sensitive role. The issue is not the CV, but what remains invisible without screening.", "Candidates", "5 min"], ["One hidden beneficial owner can change the entire transaction", "A company may look clean on the surface. But if there is a non-obvious controlling interest behind it, the risk profile changes completely.", "Counterparties", "4 min"], ["Sanctions risk rarely starts with a direct match", "More often it appears through affiliations, suppliers, former directors, corporate groups and ownership chains.", "Sanctions", "6 min"], ["Why recruitment agencies lose clients after final interviews", "When a candidate fails the client’s internal review, the agency loses more than time. It loses trust.", "Recruitment", "5 min"], ["A counterparty’s litigation history matters beyond legal teams", "Litigation history shows how a company behaves: how it pays, disputes, performs obligations and exits conflicts.", "Litigation", "4 min"], ["Reputation risk is not about rumours", "It is about signals that affect clients, banks, investors, partners and regulators.", "Reputation", "3 min"]]
const categories = ["Counterparties", "Candidates", "Due Diligence", "AML/KYC", "Reputation"]

export default function JournalPage() {
  return (
    <>
      <Head>
        <title>HEIMDALL Journal — HEIMDALL</title>
        <meta name="description" content="HEIMDALL analytical notes on counterparty checks, candidate screening, due diligence and corporate risk." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <Link href="/" className="text-xl font-semibold tracking-[0.34em]">HEIMDALL</Link>
            <div className="flex items-center gap-3">
              <Link href="/journal" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">RU</Link>
              <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Request a review</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <BookOpen className="h-4 w-4" />
              HEIMDALL Journal
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Risk intelligence companies often notice too late</h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">Short analytical notes, stories and practical observations on counterparty checks, candidate screening, hidden links, sanctions and reputation risks.</p>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(([title, text, category, read]) => (
              <article key={title} className="group rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07]">
                <div className="mb-7 flex items-center justify-between">
                  <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sm text-sky-200">{category}</span>
                  <span className="text-sm text-white/40">{read}</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                  Read note
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">For Telegram and SEO</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                This section can grow from HEIMDALL Telegram content
              </h2>
              <p className="mt-6 text-lg leading-8 text-white/64">
                Each strong Telegram post can become a short analytical note on the website.
              </p>
            </div>
            <div className="grid gap-4">
              {categories.map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-5">
                  <ShieldCheck className="h-5 w-5 text-sky-300" />
                  <span className="text-white/75">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
