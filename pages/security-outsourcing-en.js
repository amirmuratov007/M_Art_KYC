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
  ['External digital perimeter diagnostics', 'We look at the company from the outside: domains, websites, subdomains, open services, public traces, technical issues and reputational signals.'],
  ['Leaks and compromise signals', 'We check public signs of leaked corporate emails, phones, domains, documents, bank details and traces that can be used for pressure, phishing or fraud.'],
  ['Vendors and access rights', 'We assess IT vendors, integrators, marketing teams, accountants, remote contractors and other people with access to data, money, CRM, website, ads or correspondence.'],
  ['Phishing and brand imitation', 'We look for lookalike domains, similar names, suspicious contacts, payment-detail substitution schemes and emails sent as if from executives.'],
  ['Trade secrets and internal risks', 'We help reduce the risk of leaks involving commercial proposals, customer bases, deal terms, purchase prices, counterparty data and internal correspondence.'],
  ['Incident review', 'We analyze suspicious employee activity, leaks, conflicts of interest, payment-detail substitution, pressure from suppliers or unusual digital activity around the company.']
]

const infosecProcess = [
  ['1. Asset map', 'We identify domains, websites, public channels, key emails, external vendors, services, entry points and people with sensitive access.'],
  ['2. External-signal review', 'We collect open-source traces: leaks, lookalike domains, negative mentions, public documents, technical issues, reputation and fraud signals.'],
  ['3. Risk prioritization', 'We split findings into critical, material and observed items. The client receives a sequence of actions, not a list of scary technical terms.'],
  ['4. Remediation plan', 'We prepare a management plan: what to disable, restrict, review, regulate and monitor continuously.']
]

const infosecDeliverables = [
  'Digital-perimeter map: domains, public assets, external services, vendors and sensitive access points',
  'Information-security risk register with priority: critical, important, monitor',
  'Review of leaks, lookalike domains, public traces and phishing signals',
  'Access recommendations: what to close, restrict and separate by role',
  'Management rules for access approvals, vendors, payments and data transfer',
  'Executive report without technical fog'
]

const infosecBoundaries = [
  'We do not sell the illusion of absolute security. HEIMDALL identifies risks, gives a plan and helps build a manageable security perimeter.',
  'We do not replace a full-time system administrator or 24/7 SOC when real-time infrastructure monitoring is required.',
  'We do not perform malicious actions or attack third-party systems. Work is based on legal checks, open sources, client documents and agreed testing.',
  'When needed, technical specialists can be engaged for a separate task: website audit, email, domains, cloud access and workflow hardening.'
]

const infoSecPricing = [
  { name: 'InfoSec Start', price: 'from 75,000 RUB', period: 'one-off diagnostics', best: 'for small businesses and owners who need to understand current exposure', includes: ['external digital-perimeter map', 'domain, website, public-trace and leak review', 'phishing and brand-imitation signals', 'short plan for critical-risk closure'] },
  { name: 'InfoSec Perimeter', price: 'from 150,000 RUB', period: 'expanded one-off review', best: 'for companies with vendors, CRM, ads, remote staff and sensitive data', includes: ['everything in InfoSec Start', 'vendor and access-right review', 'trade-secret risk assessment', 'access and data-transfer rules', 'executive report with priorities'] },
  { name: 'InfoSec Support', price: 'from 220,000 RUB / month', period: 'ongoing work', best: 'for businesses with recurring deals, employees, vendors and leak exposure', includes: ['monthly external-signal monitoring', 'new vendor checks for sensitive access', 'suspicious-incident review', 'risk-register updates', 'priority communication on InfoSec incidents'] }
]

const outsourcingPricing = [
  { name: 'Security Perimeter', price: 'from 180,000 RUB / month', best: 'for companies without an internal security department', includes: ['up to 10 checks per month', 'counterparties, candidates and suppliers', 'single risk register', 'short executive conclusions', 'red-flag consultations'] },
  { name: 'External Security Department', price: 'from 350,000 RUB / month', best: 'for companies with recurring procurement, hiring, advances and international counterparties', includes: ['up to 25 checks per month', 'expanded reviews and connections', 'InfoSec Perimeter included', 'key-object monitoring', 'owner-priority tasks'] },
  { name: 'Corporate Risk Office', price: 'from 650,000 RUB / month', best: 'for owners, groups of companies, complex deals and sensitive conflicts', includes: ['individual task capacity', 'complex checks and investigations', 'crisis situations and incidents', 'closed communication perimeter', 'monthly executive report'] }
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
              <a href="#pricing" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Pricing and formats
              </a>
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
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">How InfoSec work is done</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">The client gets a clear perimeter, not technical noise</h2>
              <p className="mt-6 text-base leading-8 text-white/62">
                We describe information security in owner-level language: where the company is exposed, through whom a leak can happen, which access rights are dangerous, where payment details can be substituted and what must be fixed first.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {infosecProcess.map(([title, text]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/25 p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">What the client receives</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">Concrete InfoSec deliverables</h2>
              <div className="mt-8 grid gap-4">
                {infosecDeliverables.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Responsibility boundaries</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">We clearly show what is included and what is not</h2>
              <div className="mt-8 grid gap-4">
                {infosecBoundaries.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-5 pb-24">
          <div className="mb-10 max-w-5xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Pricing</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Separate pricing for InfoSec and full outsourced security support</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/62">
              Prices are starting points. Final scope depends on the number of objects, employees and vendors, international exposure, urgency and depth of analysis.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="mb-5 text-3xl font-semibold tracking-[-0.04em] text-sky-100">Information Security</h3>
            <div className="grid gap-5 lg:grid-cols-3">
              {infoSecPricing.map((plan, index) => (
                <div key={plan.name} className={`rounded-[36px] border p-7 backdrop-blur-2xl ${index === 1 ? 'border-sky-300/35 bg-sky-300/10' : 'border-white/10 bg-white/[0.045]'}`}>
                  <div className="text-sm uppercase tracking-[0.2em] text-white/42">{plan.period}</div>
                  <h4 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{plan.name}</h4>
                  <div className="mt-4 text-3xl font-semibold text-[#F7D784]">{plan.price}</div>
                  <p className="mt-4 text-sm leading-7 text-white/60">{plan.best}</p>
                  <div className="mt-7 grid gap-3">
                    {plan.includes.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-200" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-3xl font-semibold tracking-[-0.04em] text-[#F7D784]">Full outsourced security department</h3>
            <div className="grid gap-5 lg:grid-cols-3">
              {outsourcingPricing.map((plan, index) => (
                <div key={plan.name} className={`rounded-[36px] border p-7 backdrop-blur-2xl ${index === 1 ? 'border-[#D6A84F]/35 bg-[#D6A84F]/10' : 'border-white/10 bg-white/[0.045]'}`}>
                  <h4 className="text-3xl font-semibold tracking-[-0.04em]">{plan.name}</h4>
                  <div className="mt-4 text-3xl font-semibold text-[#F7D784]">{plan.price}</div>
                  <p className="mt-4 text-sm leading-7 text-white/60">{plan.best}</p>
                  <div className="mt-7 grid gap-3">
                    {plan.includes.map((item) => (
                      <div key={item} className="flex gap-3 text-sm leading-6 text-white/70">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[32px] border border-white/10 bg-black/25 p-7 text-sm leading-7 text-white/60">
            One-off counterparty, candidate, supplier or beneficial-owner checks can be ordered separately. The pricing above is for information security and the ongoing outsourced security perimeter.
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
