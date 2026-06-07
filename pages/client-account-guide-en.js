import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import { ArrowRight, CheckCircle2, Clock3, FileText, FolderOpen, LockKeyhole, MessageSquareText, ShieldCheck, UserRound } from 'lucide-react'

const steps = [
  ['1', 'Sign in', 'The client signs in with email and password. The account shows only data linked to that client Supabase user_id.'],
  ['2', 'New request', 'The client describes the task: target, deadlines, initial information and expected outcome. The request goes to HEIMDALL.'],
  ['3', 'Check in progress', 'An analyst creates a check card, adds status, risk score and a short summary. The client sees updates in the account.'],
  ['4', 'Report and recommendations', 'When the work is completed, the account receives a report link and practical recommendations.']
]

const statuses = [
  ['New', 'The request has been accepted or a check card has been created. The team is clarifying inputs and preparing the work.'],
  ['In progress', 'HEIMDALL collects and analyzes data, links, risks, documents and digital traces.'],
  ['Review', 'Materials are undergoing internal review so the conclusions are accurate and not misleading.'],
  ['Completed', 'The report is ready. The client can open final materials, conclusions and recommendations.'],
  ['Paused', 'The work is temporarily paused: documents, inputs or additional approval are required.']
]

const sections = [
  ['My checks', 'All active and completed checks: counterparties, suppliers, candidates, due diligence, information security and internal investigations.', FileText],
  ['Reports', 'Fast access to checks where a final report link has already been published.', ShieldCheck],
  ['New request', 'A form for a new task. The request is sent through a protected API to Telegram and the request table.', MessageSquareText],
  ['Documents', 'A section prepared for input materials, final documents, NDA and future protected file upload.', FolderOpen]
]

export default function ClientAccountGuideEnPage() {
  return (
    <>
      <Head>
        <title>How the client account works | HEIMDALL</title>
        <meta name="description" content="Client guide for HEIMDALL account: sign in, checks, statuses, reports, documents and new requests." />
        <link rel="canonical" href="https://www.heimdall-group.ru/client-account-guide-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(37,99,235,0.26),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(214,168,79,0.13),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_52%,#050816_100%)]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Client account
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              How the HEIMDALL client account works
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              A simple guide for clients: where to view checks, what statuses mean, how to receive reports and how to send a new request to HEIMDALL.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Open account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                View services and pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-xl font-semibold text-[#F7D784]">{number}</div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <UserRound className="mb-7 h-9 w-9 text-sky-300" />
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">What the client sees</h2>
              <p className="mt-5 text-base leading-8 text-white/62">
                After signing in, the client sees only their own checks. Data is linked to the client account, reducing the risk of accidental access to other materials.
              </p>
              <div className="mt-7 grid gap-3">
                {['Number of checks and active tasks', 'Current statuses', 'Risk score for each check', 'Analyst summary', 'Links to ready reports'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections.map(([title, text, Icon]) => (
                <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <Icon className="mb-6 h-8 w-8 text-[#F7D784]" />
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.055] p-7 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <Clock3 className="mb-7 h-9 w-9 text-sky-300" />
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Check statuses</h2>
                <p className="mt-5 text-base leading-8 text-white/62">
                  A status shows the working stage of the task. Final conclusions appear only after completion and report publication.
                </p>
              </div>

              <div className="grid gap-4">
                {statuses.map(([title, text]) => (
                  <div key={title} className="rounded-[26px] border border-white/10 bg-black/25 p-5">
                    <div className="text-lg font-semibold text-white">{title}</div>
                    <p className="mt-2 text-sm leading-7 text-white/58">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">What not to send</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">
                Do not send passwords, access codes, banking keys, excessive personal data or materials that are not required for the task.
              </p>
            </div>
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">How to provide documents</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">
                Until protected upload is enabled, documents are transferred only through an agreed secure channel. The final report link is added to the account.
              </p>
            </div>
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">When to create a request</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">
                Create a new request when there is a new counterparty, supplier, candidate, incident, transaction or information security task.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-7 backdrop-blur-2xl md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Next step</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Sign in and create a request</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">
                If access has already been issued, use your email and password. If not, leave a request on the website or contact HEIMDALL.
              </p>
            </div>
            <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Open account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
