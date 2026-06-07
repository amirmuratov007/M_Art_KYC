import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import SupportRequestForm from '@/components/SupportRequestForm'
import { ArrowRight, AlertTriangle, Bell, Building2, CheckCircle2, FileSearch, Gauge, LockKeyhole, Network, ShieldCheck, UserSearch } from 'lucide-react'

const problems = [
  ['No internal security department', 'Deals, hiring, advance payments and partnerships are approved without an independent risk review.'],
  ['Internal team is overloaded', 'Security staff handles urgent incidents and cannot deeply review the external business perimeter.'],
  ['Confidentiality is critical', 'Some tasks should not be routed through employees, vendors or people inside a conflict chain.'],
  ['The company operates internationally', 'Suppliers, intermediaries, beneficial owners and payment routes are spread across jurisdictions.']
]

const coverage = [
  ['Counterparties and suppliers', 'litigation, ownership, related companies, shell indicators, sanctions and reputation signals', FileSearch],
  ['Sensitive-role candidates', 'procurement, finance, sales, data access, conflict of interest and reputation risks', UserSearch],
  ['Beneficial owners and links', 'actual control, nominee ownership, affiliations and hidden conflicts', Network],
  ['Deals and partnerships', 'due diligence before acquisitions, investments, joint projects or major contracts', Building2],
  ['Information security', 'external risk perimeter, leaks, digital footprint, access, vendors, domains and compromise indicators', LockKeyhole],
  ['Continuous monitoring', 'repeat checks, alerts, changes in litigation, sanctions, media and reputation signals', Bell]
]

const infosec = [
  ['Company digital footprint', 'We review what is visible from the outside: domains, websites, public traces, leaks, mentions and technical or reputational signals.'],
  ['Vendor and access risk', 'We review external contractors, IT providers, integrators and people with access to data or money.'],
  ['Phishing and social engineering', 'We identify brand imitation, suspicious domains, suspicious contact patterns and pressure schemes targeting employees.'],
  ['Trade secrets', 'We help reduce leakage risks through employees, contractors, negotiations, procurement and counterparties.'],
  ['Incident review', 'We analyze suspicious situations: data leaks, conflicts of interest, unusual counterparty behavior or employee activity.'],
  ['Security rules', 'We define a practical perimeter: who to review, when to deepen checks and which red flags are critical.']
]

const formats = [
  ['Starter security perimeter', 'for companies without a security department', 'on-demand reviews, basic rules and initial risk filtering'],
  ['Operational support', 'for recurring deals, procurement and hiring', 'monthly review capacity, priority tasks and a single risk history'],
  ['External security department', 'for owners and executives', 'confidential perimeter, complex reviews, information security and crisis tasks']
]

export default function SecurityOutsourcingEnPage() {
  return (
    <>
      <Head>
        <title>Security Outsourcing | HEIMDALL</title>
        <meta name="description" content="HEIMDALL as an outsourced security department for business: counterparty checks, candidate screening, supplier review, beneficial ownership, deal risk, monitoring and information security." />
        <link rel="canonical" href="https://www.heimdall-group.ru/security-outsourcing-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" /> Outsourced Security Department
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              HEIMDALL can replace an internal security department
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              If a company does not have its own security department, the function can be outsourced. HEIMDALL covers counterparty checks, candidate screening, supplier review, beneficial ownership, transactions and information security risks without hiring a separate team.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#security-request" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Discuss security scope <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/sample-reports-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                View reports
              </Link>
              <Link href="/business-support-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Business support
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">What we replace</div>
              <div className="mt-8 grid gap-4">
                {['counterparty checks', 'candidate screening', 'supplier control', 'information security', 'risk monitoring', 'confidential owner tasks'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">When it is needed</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">An external security perimeter instead of chaotic checks</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {problems.map(([title, text]) => (
              <div key={title} className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-100">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Responsibility area</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">What HEIMDALL takes over</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {coverage.map(([title, text, Icon]) => (
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
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-sky-100">
                  <LockKeyhole className="h-4 w-4" /> Information Security
                </div>
                <h2 className="mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">
                  A large section for data, access and digital-perimeter protection
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/64">
                  For an owner, risk often starts not in court or a registry, but in access rights, vendors, communications, domains, leaks and people who see commercial information. That is why information security is built into HEIMDALL support.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {infosec.map(([title, text]) => (
                  <div key={title} className="rounded-[28px] border border-white/10 bg-black/25 p-6">
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-sky-100">{title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Work formats</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">From one-off tasks to an external security department</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {formats.map(([name, audience, text], index) => (
              <div key={name} className={`rounded-[38px] border p-8 backdrop-blur-2xl ${index === 1 ? 'border-sky-300/30 bg-sky-300/10' : 'border-white/10 bg-white/[0.045]'}`}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-[#F7D784]">
                  <Gauge className="h-5 w-5" />
                </div>
                <h3 className="text-3xl font-semibold tracking-[-0.04em]">{name}</h3>
                <p className="mt-4 text-sm font-semibold text-sky-100">{audience}</p>
                <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="security-request" className="relative z-10 mx-auto max-w-4xl scroll-mt-28 px-5 pb-32">
          <SupportRequestForm language="en" />
        </section>

        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
