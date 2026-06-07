import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, FileSearch, ShieldCheck, Network, UserSearch, Scale, Building2, CheckCircle2, AlertTriangle, LockKeyhole } from 'lucide-react'

const services = [
  {
    title: 'Corporate Intelligence',
    text: 'Counterparty, ownership, litigation, reputation and sanctions risk review.',
    href: '/counterparty-check-before-deal',
    icon: FileSearch,
    bestFor: 'before a contract, advance payment, payment deferral or partnership'
  },
  {
    title: 'China Supplier Verification',
    text: 'Manufacturer, trading company, bank details, website, documents and shell indicators.',
    href: '/china-supplier-verification',
    icon: Building2,
    bestFor: 'before advance payment, first shipment or supplier replacement'
  },

  {
    title: 'Security Outsourcing',
    text: 'External security perimeter for companies without an internal department: reviews, monitoring, confidential tasks and information security.',
    href: '/security-outsourcing-en',
    icon: LockKeyhole,
    bestFor: 'when a company needs to replace or reinforce security without hiring a department'
  },
  {
    title: 'Background Check',
    text: 'Candidate screening for sensitive positions, conflicts of interest and reputational signals.',
    href: '/background-check',
    icon: ShieldCheck,
    bestFor: 'CFO, procurement, security, sales, access to money and data'
  },
  {
    title: 'Beneficial Ownership Review',
    text: 'Actual control, nominee ownership, hidden links and corporate conflicts.',
    href: '/ubo-verification-en',
    icon: UserSearch,
    bestFor: 'when formal ownership does not explain practical control'
  },
  {
    title: 'AML / KYC',
    text: 'Compliance review for clients, counterparties and transactions.',
    href: '/compliance-counterparty-check',
    icon: Scale,
    bestFor: 'sanctions, PEP, payment route, compliance and reputation'
  },
  {
    title: 'Due Diligence',
    text: 'Enhanced due diligence for transactions, partners, assets and cross-border structures.',
    href: '/due-diligence-dubai',
    icon: Network,
    bestFor: 'stake acquisition, investment, M&A and major partnerships'
  },
  {
    title: 'Business Support',
    text: 'Monthly intelligence support for counterparties, candidates, suppliers and corporate risks.',
    href: '/business-support-en',
    icon: Building2,
    bestFor: 'recurring reviews, procurement, hiring flow and risk monitoring'
  }
]

const scenarios = [
  ['Transaction or acquisition', 'Ownership structure, litigation history, hidden links and red flags before signing.'],
  ['Supplier or contractor', 'Shell-company indicators, related-party risks, sanctions exposure and payment risk.'],
  ['Sensitive hire', 'Reputation, conflicts of interest, financial pressure and links to competitors or suppliers.'],
  ['Foreign company', 'Cross-border review, beneficial owners, local registries, adverse media and compliance signals.']
]

const packages = [
  ['Screening', 'Fast initial risk conclusion on a review object.', '24-48 hours', ['red flags', 'basic link analysis', 'sanctions and litigation signals']],
  ['Enhanced report', 'Deeper review with risk logic and recommendations.', '48-72 hours', ['relationship map', 'source summary', 'management conclusion']],
  ['Support', 'Ongoing review perimeter for business operations.', 'monthly', ['recurring reviews', 'priority tasks', 'single risk history']]
]

const deliverables = [
  'Clear decision summary: proceed, stop or deepen the review',
  'Risk and relationship map',
  'Source and review-scope summary',
  'Recommended next actions'
]

const caseLinks = [
  ['China supplier', 'how advance-payment risk was stopped', '/cases-en/china-supplier-advance-payment'],
  ['Procurement conflict', 'hidden contractor and intermediary link', '/cases-en/procurement-conflict-of-interest'],
  ['Sanctions risk', 'no direct match, but risk was present', '/cases-en/sanctions-risk-without-direct-match']
]

export default function ServicesEnPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('General request')
  const openContact = (nextTopic) => {
    setTopic(nextTopic || 'General request')
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>Services | HEIMDALL</title>
        <meta name="description" content="HEIMDALL services: corporate intelligence, China supplier verification, background checks, beneficial ownership review, AML/KYC, due diligence and business support." />
        <link rel="canonical" href="https://www.heimdall-group.ru/services-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              Intelligence Services
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Choose the review for the actual risk
            </h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              We do not sell abstract file extracts. We match the review format to the decision: pay, hire, sign, acquire, partner or stop.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openContact('Review scope assessment')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Request scope <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/cases-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                View cases
              </Link>
              <Link href="/sample-reports-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Sample report
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-6 backdrop-blur-2xl">
            <img src="/heimdall-logo-mark.png" alt="HEIMDALL" className="mx-auto w-full max-w-[420px]" />
            <div className="mt-6 grid gap-3">
              {['Counterparty before contract', 'Supplier before advance', 'Candidate before access', 'Partner before transaction'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#F7D784]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-24 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <div key={service.href} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 hover:bg-white/[0.07]">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{service.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{service.text}</p>
                <p className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/58">
                  <span className="text-[#F7D784]">Best for:</span> {service.bestFor}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={service.href} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                    Details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                  <button onClick={() => openContact(service.title)} className="inline-flex items-center gap-2 rounded-2xl bg-[#D6A84F] px-4 py-3 text-sm font-semibold text-[#050816]">
                    Request
                  </button>
                </div>
              </div>
            )
          })}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Formats</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Three working review modes</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {packages.map(([title, text, timing, items]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]">{timing}</div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                <div className="mt-6 grid gap-3">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/60">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Use cases</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">When screening is more than a formality</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {scenarios.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Outcome</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">A risk decision, not just a file extract</h2>
              <p className="mt-6 text-base leading-8 text-white/64">A HEIMDALL report shows not only what was found, but what it means for the deal, hire, supplier approval or partnership.</p>
            </div>
            <div className="grid gap-3">
              {deliverables.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/72">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Cases</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Example assignments</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {caseLinks.map(([title, text, href]) => (
              <Link key={href} href={href} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:border-[#D6A84F]/35">
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">Read <ArrowRight className="h-4 w-4" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-28">
          <div className="grid gap-6 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Need a review today?</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">Leave a contact and briefly describe the object. We will respond with the recommended format and timing.</p>
            </div>
            <button onClick={() => openContact('Urgent review')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">Submit request <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>

        <HeimdallFooter language="en" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="en" defaultTopic={topic} />
    </>
  )
}
