import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { LockKeyhole, ShieldCheck, FileText, UserCheck } from 'lucide-react'

const blocks = [
  ['What is processed', 'Contact details, request descriptions, client materials, information required for the review and the results of analytical work.'],
  ['Why it is needed', 'To contact the client, assess the request, prepare a proposal, perform the review, deliver the report and support the project.'],
  ['How access is protected', 'Review materials and reports are shared only with agreed recipients. Details of a review are not publicly disclosed.'],
  ['Data minimisation', 'HEIMDALL aims to use and retain only the data needed for the specific business task and analytical conclusion.'],
]

export default function PrivacyEnPage() {
  return (
    <>
      <Head>
        <title>Privacy | HEIMDALL</title>
        <meta name="description" content="HEIMDALL privacy principles for client requests, project materials, reports and corporate intelligence workflows." />
        <link rel="canonical" href="https://www.heimdall-group.ru/privacy-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <HeimdallNav language="en" />
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]"><LockKeyhole className="h-4 w-4" /> Privacy</div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Privacy</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">HEIMDALL handles sensitive business requests. Confidentiality of client materials, review workflows and final reports is part of the service itself.</p>
          </div>
        </section>
        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-5 md:grid-cols-2">
          {blocks.map(([title, text], index) => { const Icon = [FileText, UserCheck, ShieldCheck, LockKeyhole][index]; return <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl"><div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200"><Icon className="h-6 w-6" /></div><h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2><p className="mt-5 text-sm leading-7 text-white/60">{text}</p></div> })}
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 sm:px-5"><div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-8 backdrop-blur-2xl"><p className="max-w-5xl text-base leading-8 text-white/72">This page describes public data handling principles for the HEIMDALL website. Project-specific terms, retention periods, material scope and report delivery procedures may be defined separately in a proposal, contract or agreed correspondence.</p></div></section>
        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
