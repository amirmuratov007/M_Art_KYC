import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import SupportRequestForm from '@/components/SupportRequestForm'
import { ArrowRight, BrainCircuit, CheckCircle2, FileSearch, Gauge, Network, ShieldCheck, Users, Home, Building2, BriefcaseBusiness, AlertTriangle } from 'lucide-react'

const objects = [
  ['Candidates', 'sensitive roles, access to money, clients, analytics and commercial information', Users],
  ['Employees', 'conflicts of interest, internal incidents, access rights, leakage indicators and hidden affiliations', ShieldCheck],
  ['Contractors', 'access to CRM, advertising, websites, accounting, data and payment workflows', BriefcaseBusiness],
  ['Counterparties', 'litigation, ownership, affiliations, reputation, advance payments, sanctions and financial indicators', Building2],
  ['Household staff', 'nannies, assistants, drivers, gardeners and other people close to family, property and daily routines', Home],
  ['Incidents', 'suspicious events, data leaks, payment detail substitution, conflicts and internal warning signals', AlertTriangle]
]

const results = [
  'risk profile of the checked object',
  'links between people, companies, phones, domains and documents',
  'red flags with severity and confidence levels',
  'preliminary risk score for management decisions',
  'structured report without accusatory wording',
  'recommendations on what to clarify, verify or postpone'
]

const steps = [
  ['1. Object', 'We define who or what is being checked: a candidate, company, contractor, household staff member, employee or incident.'],
  ['2. Signals', 'We structure legal, financial, reputational, digital and behavioral risk indicators.'],
  ['3. Connections', 'We build a relationship map: people, companies, phones, emails, domains, documents and mentions.'],
  ['4. Assessment', 'The system calculates a risk score and helps analysts focus on the most important red flags.'],
  ['5. Report', 'HEIMDALL prepares a management report where facts, indicators, hypotheses and recommendations are separated.']
]

export default function RiskIntelligenceEnPage() {
  return (
    <>
      <Head>
        <title>Risk Intelligence Center | HEIMDALL</title>
        <meta name="description" content="HEIMDALL Risk Intelligence Center: a unified risk picture, relationship mapping, red flags, risk scoring and reports for candidates, employees, contractors, counterparties and household staff." />
        <link rel="canonical" href="https://www.heimdall-group.ru/risk-intelligence-en" />
        <link rel="alternate" hrefLang="ru" href="https://www.heimdall-group.ru/risk-intelligence" />
        <link rel="alternate" hrefLang="en" href="https://www.heimdall-group.ru/risk-intelligence-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <BrainCircuit className="h-4 w-4" /> Risk intelligence platform
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              HEIMDALL Risk Intelligence Center
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              We turn fragmented facts, relationships and risk signals into a single analytical picture. This helps companies make decisions on hiring, deals, contractors, employees and internal incidents before risk becomes damage.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#risk-request" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Request a risk check <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/sample-reports-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Sample reports
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-sky-300/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">What the system delivers</div>
              <div className="mt-8 grid gap-4">
                {results.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-6 text-white/72">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">What we analyze</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">One center for different risk objects</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {objects.map(([title, text, Icon]) => (
              <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[46px] border border-sky-300/20 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-sky-100">
                  <Network className="h-4 w-4" /> Relationship map
                </div>
                <h2 className="mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">From facts to connections and decisions</h2>
                <p className="mt-6 text-lg leading-8 text-white/64">HEIMDALL does not turn indicators into a chaotic list. We separate facts from hypotheses, show relationships and build a clear decision logic.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {steps.map(([title, text]) => (
                  <div key={title} className="rounded-[28px] border border-white/10 bg-black/22 p-6">
                    <div className="text-sm font-semibold text-[#F7D784]">{title}</div>
                    <p className="mt-3 text-sm leading-7 text-white/62">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [FileSearch, 'Lawful sources', 'Work is based on client-provided information, open sources, documents and agreed legal grounds for the check.'],
              [Gauge, 'Risk score', 'Scoring helps prioritize risks, but it does not replace analyst judgment or legal review.'],
              [ShieldCheck, 'Legal accuracy', 'Reports do not make accusations. Facts, indicators, hypotheses and recommendations are kept separate.']
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7">
                <Icon className="h-7 w-7 text-sky-300" />
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="risk-request" className="relative z-10 mx-auto max-w-5xl px-5 pb-24">
          <SupportRequestForm language="en" source="risk-intelligence-en" />
        </section>

        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
