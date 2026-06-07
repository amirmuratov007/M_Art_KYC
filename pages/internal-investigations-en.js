import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, AlertTriangle, CheckCircle2, ClipboardCheck, FileSearch, LockKeyhole, Scale, ShieldCheck, UserCheck } from 'lucide-react'

const signals = [
  ['Corporate fraud', 'suspicious procurement, kickbacks, sham vendors, inflated pricing and conflicts of interest'],
  ['Leaks and insider risk', 'commercial secret leaks, client-base export, unauthorized document access and unusual data movement'],
  ['Internal collusion', 'informal influence groups, pressure on staff, blocked decisions and hidden loyalty to suppliers'],
  ['Process violations', 'bypassing approvals, manual payment control, document substitution and work outside approved procedures'],
  ['Reputation threats', 'actions by employees or contractors that create risk for leadership, brand and negotiation position']
]

const stages = [
  ['1. Legal frame', 'We define the legal basis, client authority, scope, confidentiality regime and personal-data boundaries before any work starts.'],
  ['2. Risk hypotheses', 'We identify where the issue may sit: procurement, sales, finance, warehouse, accesses, contractors, negotiations or information leaks.'],
  ['3. Data review', 'We review documents, permitted communications, open sources, corporate traces, payment and contract logic.'],
  ['4. Interviews and verification', 'We conduct structured interviews, fact checks, contradiction analysis and control questions without pressure or provocation.'],
  ['5. Temporary process participation', 'If needed, a HEIMDALL specialist may be legally included in the client project team or process under a contract and agreed rules, without unlawful covert penetration.'],
  ['6. Report and prevention', 'We provide findings, evidence map, violation list and recommendations for HR, legal, information-security and process measures.']
]

const allowed = [
  'internal audit of documents, actions and business processes',
  'conflict-of-interest, collusion and affiliation review',
  'supplier, contractor and employee checks within a lawful framework',
  'digital-trace, access, log and leakage-indicator analysis when a legal basis exists',
  'interviews, explanations, fact comparison and evidence mapping',
  'temporary participation of specialists in a client process under an official contractual framework'
]

const prohibited = [
  'we do not conduct law-enforcement operative-search activities as a private service',
  'we do not intercept calls, hack accounts or unlawfully access third-party systems',
  'we do not provoke employees into violations or create artificial incidents',
  'we do not collect sensitive personal data without a legal basis',
  'we do not use pressure, threats, blackmail or unlawful surveillance',
  'we do not replace law enforcement and do not promise a criminal-procedure result'
]

const packages = [
  ['Internal Screening', 'from ₽250,000', '7-10 business days', ['initial risk map', 'document and participant review', 'violation hypotheses', 'short management report']],
  ['Corporate Investigation', 'from ₽600,000', '2-4 weeks', ['full process or department review', 'interviews and fact checks', 'relationship and conflict-of-interest map', 'violation-stop recommendations']],
  ['Prevention Perimeter', 'from ₽450,000 / month', 'monthly', ['ongoing monitoring of sensitive processes', 'supplier and employee checks within the law', 'confidential tasks for leadership', 'violation-prevention plan']]
]

export default function InternalInvestigationsEnPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('Internal investigation')
  const openContact = (nextTopic) => {
    setTopic(nextTopic || 'Internal investigation')
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>Internal Corporate Investigations | HEIMDALL</title>
        <meta name="description" content="HEIMDALL internal investigations: fraud, conflicts of interest, leaks, collusion, procurement violations and risk prevention within a lawful corporate framework." />
        <link rel="canonical" href="https://www.heimdall-group.ru/internal-investigations-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(214,168,79,0.18),transparent_34%),radial-gradient(circle_at_88%_16%,rgba(56,189,248,0.12),transparent_32%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              Internal investigations
            </div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
              Detect internal misconduct before it becomes a criminal case, loss or public scandal
            </h1>
            <p className="mt-8 max-w-4xl text-lg leading-9 text-white/64 md:text-xl">
              HEIMDALL helps owners and executives investigate internal risks: collusion, leaks, conflicts of interest, procurement schemes, access abuse and process violations. The service is built as a lawful corporate investigation, not as a grey-area operation.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openContact('Internal investigation')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816] shadow-[0_0_45px_rgba(214,168,79,0.24)]">
                Discuss investigation <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/security-outsourcing-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Security outsourcing
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-6 backdrop-blur-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">Core principle</h2>
            <p className="mt-5 text-sm leading-7 text-white/64">
              An investigation must help the business make a decision without creating a new legal risk. We define what may be reviewed, which data is lawful, who may access materials and how the final report is used.
            </p>
            <div className="mt-6 grid gap-3">
              {['Legal framework before start', 'Confidential report', 'No provocation or pressure', 'Focus on damage prevention'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F7D784]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">When it is needed</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Signals that justify an internal investigation</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {signals.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <AlertTriangle className="h-6 w-6 text-[#F7D784]" />
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[38px] border border-sky-300/15 bg-sky-300/[0.055] p-6 backdrop-blur-2xl md:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-4xl">
                <div className="text-sm uppercase tracking-[0.24em] text-sky-200/80">Important</div>
                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">We do not sell law-enforcement operations</h2>
                <p className="mt-6 text-base leading-8 text-white/64 md:text-lg">
                  A private company must not replace law enforcement. HEIMDALL does not offer unlawful infiltration, interception, hacking, provocation or data collection without a legal basis. We work as a corporate investigation and external risk perimeter under contract, agreed rules and confidentiality.
                </p>
              </div>
              <Scale className="h-14 w-14 shrink-0 text-sky-200/70" />
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Method</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">How the investigation works</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {stages.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <ClipboardCheck className="h-6 w-6 text-[#F7D784]" />
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-24 lg:grid-cols-2">
          <div className="rounded-[34px] border border-emerald-300/15 bg-emerald-300/[0.055] p-6 backdrop-blur-2xl md:p-8">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">What we can do</h2>
            <div className="mt-6 grid gap-3">
              {allowed.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[34px] border border-red-300/15 bg-red-300/[0.045] p-6 backdrop-blur-2xl md:p-8">
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">What we do not do</h2>
            <div className="mt-6 grid gap-3">
              {prohibited.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66">
                  <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-red-200" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Pricing</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Internal investigation pricing</h2>
            <p className="mt-6 text-base leading-8 text-white/60">Final pricing depends on the number of processes, departments, documents, participants and required depth.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map(([title, price, timing, items]) => (
              <div key={title} className="rounded-[34px] border border-[#D6A84F]/18 bg-[#D6A84F]/[0.055] p-7 backdrop-blur-2xl">
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">{timing}</div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
                <div className="mt-4 text-2xl font-semibold text-white">{price}</div>
                <div className="mt-6 grid gap-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/62">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                      {item}
                    </div>
                  ))}
                </div>
                <button onClick={() => openContact(title)} className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-5 py-4 font-semibold text-[#050816]">
                  Request estimate <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <UserCheck className="h-10 w-10 text-[#F7D784]" />
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">What leadership receives</h2>
              </div>
              <div className="grid gap-4 text-sm leading-7 text-white/64 md:grid-cols-2">
                {['fact-based picture without rumours or emotions', 'list of people, processes and control points requiring attention', 'recommendations for HR, contract and organisational actions', 'plan to prevent repeated violations', 'basis for legal or law-enforcement escalation if needed', 'confidential workflow without public internal conflict'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-[#D6A84F]/25 bg-[#D6A84F]/[0.07] p-7 text-center backdrop-blur-2xl md:p-10">
            <FileSearch className="mx-auto h-10 w-10 text-[#F7D784]" />
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Is there a suspected internal risk?</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/62">Describe the situation briefly. We will suggest a safe review format and immediately mark what can be done and what should be handled with legal counsel or law enforcement.</p>
            <button onClick={() => openContact('Confidential internal investigation')} className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Send confidential request <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language="en" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="en" defaultTopic={topic} />
    </>
  )
}
