import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, ShieldCheck, FileSearch, UserSearch, Building2, SearchCheck, Clock3, CheckCircle2, AlertTriangle, Scale, BriefcaseBusiness, Home } from 'lucide-react'

const oneTimeServices = [
  {
    title: 'Counterparty Check',
    price: 'from 45,000 RUB',
    term: 'usually 2-5 business days',
    text: 'For decisions before contracts, prepayments, deferred payment terms, partnerships or sensitive deals.',
    includes: ['litigation, enforcement and bankruptcy signals', 'owners, affiliations, links and nominee indicators', 'reputational, sanctions and financial red flags', 'clear conclusion: proceed, control or stop'],
    icon: FileSearch,
    href: '/corporate-intelligence'
  },
  {
    title: 'China Supplier Verification',
    price: 'from 85,000 RUB',
    term: 'usually 4-10 business days',
    text: 'For procurement, prepayments, first shipments, supplier changes or work through intermediaries.',
    includes: ['company, website, documents and payment details review', 'manufacturer substitution, shell-trader and fraud indicators', 'red flags in correspondence, invoices, terms and logistics', 'recommendations for safer payment and next steps'],
    icon: Building2,
    href: '/china-supplier-verification-en'
  },
  {
    title: 'Candidate Screening',
    price: 'from 35,000 RUB',
    term: 'usually 2-5 business days',
    text: 'For positions with access to money, procurement, documents, clients, internal systems or trade secrets.',
    includes: ['biography, business reputation and public footprint review', 'conflicts of interest, links to counterparties and risk indicators', 'fit assessment for the role and access level', 'decision-ready summary for HR, owner or security team'],
    icon: UserSearch,
    href: '/executive-background-check-en'
  },

  {
    title: 'Household Staff Check',
    price: 'from 25,000 RUB',
    term: 'typically 1-7 business days',
    text: 'For hiring a nanny, caregiver, driver, housekeeper, gardener, guard or assistant with access to home, children, keys and property.',
    includes: ['provided data and open risk indicators', 'public digital footprint, litigation and enforcement signals', 'references and biography inconsistencies when consent is available', 'family-facing conclusion: risks and recommended restrictions'],
    icon: Home,
    href: '/private-staff-check-en'
  },
  {
    title: 'Deal Due Diligence',
    price: 'from 180,000 RUB',
    term: 'usually 7-15 business days',
    text: 'For share acquisitions, partnerships, investments, large contracts or high-prepayment deals.',
    includes: ['ownership structure, UBOs, related persons and assets', 'litigation, debt, sanctions and corporate risks', 'public history, business reputation and conflict review', 'management report with a risk map and recommendations'],
    icon: Scale,
    href: '/business-intelligence-support-en'
  }
]

const infosecPlans = [
  {
    title: 'InfoSec Start',
    price: 'from 75,000 RUB',
    term: 'one-time diagnostics',
    best: 'for owners who need to understand where the business is exposed',
    includes: ['external digital perimeter map', 'domains, website, public footprint and leak review', 'phishing, brand imitation and weak-point indicators', 'short action plan for critical risks']
  },
  {
    title: 'InfoSec Perimeter',
    price: 'from 150,000 RUB',
    term: 'extended review',
    best: 'for companies with contractors, CRM, advertising, remote staff and sensitive data',
    includes: ['everything from InfoSec Start', 'contractor and access review', 'trade secret and data transfer risk assessment', 'access rules and management report']
  },
  {
    title: 'InfoSec Support',
    price: 'from 220,000 RUB / month',
    term: 'ongoing support',
    best: 'for businesses with regular deals, employees, contractors and leak exposure',
    includes: ['monthly external signal monitoring', 'new contractor access review', 'suspicious situation and incident analysis', 'risk register updates and priority contact']
  }
]

const outsourcingPlans = [
  {
    title: 'Security Perimeter',
    price: 'from 180,000 RUB / month',
    term: 'basic support',
    best: 'for companies without an internal security department',
    includes: ['up to 10 checks per month', 'counterparties, candidates and suppliers', 'single risk register', 'short management conclusions', 'red-flag consultations']
  },
  {
    title: 'Outsourced Security Department',
    price: 'from 350,000 RUB / month',
    term: 'regular perimeter',
    best: 'for companies with procurement, hiring, prepayments and international counterparties',
    includes: ['up to 25 checks per month', 'extended checks and link analysis', 'InfoSec Perimeter included', 'monitoring of key objects', 'priority tasks for the owner']
  },
  {
    title: 'Corporate Risk Desk',
    price: 'from 650,000 RUB / month',
    term: 'closed format',
    best: 'for owners, groups of companies, complex deals and sensitive conflicts',
    includes: ['individual task pool', 'complex checks and investigations', 'crisis situations and incidents', 'closed communication perimeter', 'monthly management report']
  }
]

const investigationPlans = [
  {
    title: 'Internal Screening',
    price: 'from 250,000 RUB',
    term: 'targeted review',
    includes: ['initial situation assessment', 'documents, events and digital traces review', 'map of possible participants and vulnerable processes', 'recommendations to reduce damage']
  },
  {
    title: 'Corporate Investigation',
    price: 'from 600,000 RUB',
    term: 'full cycle',
    includes: ['investigation plan and hypotheses', 'interviews, documents and link analysis', 'conflict of interest, collusion or leak indicators', 'report for management and legal decisions']
  },
  {
    title: 'Preventive Perimeter',
    price: 'from 450,000 RUB / month',
    term: 'preventive work',
    includes: ['continuous analysis of internal signals', 'review of risky processes and roles', 'recommendations for rules and controls', 'closed communication with the owner']
  }
]

const steps = [
  ['1. Task review', 'We identify what needs protection: money, deal, procurement, hiring, data, reputation or management control.'],
  ['2. Format selection', 'We propose a one-time check, InfoSec review, investigation or monthly security perimeter. No unnecessary upsell.'],
  ['3. Work and report', 'We collect facts, test hypotheses, document red flags and prepare a decision-ready conclusion.'],
  ['4. Decision and support', 'We help decide what to do next: proceed, limit access, request documents, stop the deal or strengthen control.']
]

const notes = [
  'Prices are starting points. Final cost depends on jurisdiction, urgency, number of objects, depth of review and document volume.',
  'HEIMDALL does not provide illegal services, does not perform law-enforcement activity and does not promise access to closed government databases.',
  'Work is based on contract, lawful sources, client documents, open data, analytics, interviews and agreed corporate procedures.',
  'Sensitive tasks may include an NDA, a separate communication perimeter and individual access rules for materials.'
]

function PlanCard({ plan, featured = false }) {
  return (
    <div className={`flex h-full flex-col rounded-[34px] border p-7 backdrop-blur-2xl ${featured ? 'border-[#D6A84F]/35 bg-[#D6A84F]/[0.08] shadow-[0_0_70px_rgba(214,168,79,0.12)]' : 'border-white/10 bg-white/[0.045]'}`}>
      <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/85">{plan.term}</div>
      <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{plan.title}</h3>
      <div className="mt-5 text-3xl font-semibold text-sky-100">{plan.price}</div>
      {plan.best && <p className="mt-4 text-sm leading-7 text-white/58">{plan.best}</p>}
      <div className="mt-7 grid gap-3">
        {plan.includes.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PricingEnPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('Pricing and service selection')
  const openContact = (value) => {
    setTopic(value)
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>HEIMDALL Pricing - checks, InfoSec, investigations and security outsourcing</title>
        <meta name="description" content="HEIMDALL pricing: counterparty checks, supplier and candidate screening, due diligence, information security, internal investigations and outsourced security department." />
        <link rel="canonical" href="https://www.heimdall-group.ru/pricing-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <BriefcaseBusiness className="h-4 w-4" /> Commercial showcase
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              HEIMDALL Pricing
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Checks, information security, internal investigations and outsourced security support. Choose the format by risk, budget and urgency.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openContact('Select service by pricing')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Select a service <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#recurring" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Monthly support
              </a>
              <Link href="/security-outsourcing-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Security outsourcing
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Available formats</div>
              <div className="mt-8 grid gap-4">
                {['one-time decision check', 'information security', 'internal investigation', 'outsourced security department', 'closed format for owners'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="one-time" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">One-time services</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">When a decision is needed quickly</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Use this when you need to check a specific counterparty, supplier, candidate, UBO or deal.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {oneTimeServices.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]"><Icon className="h-6 w-6" /></div>
                  <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">{service.term}</div>
                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.05em]">{service.title}</h3>
                  <div className="mt-4 text-3xl font-semibold text-sky-100">{service.price}</div>
                  <p className="mt-5 text-sm leading-7 text-white/60">{service.text}</p>
                  <div className="mt-7 grid gap-3">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />{item}</div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={service.href} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">Details</Link>
                    <button onClick={() => openContact(service.title)} className="rounded-2xl bg-[#D6A84F] px-4 py-3 text-sm font-semibold text-[#050816]">Order</button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section id="infosec" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Information security</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">InfoSec as a management product</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Not an abstract technical audit, but identification of risks that can lead to leaks, financial loss, brand abuse, account takeover or contractor conflict.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {infosecPlans.map((plan, index) => <PlanCard key={plan.title} plan={plan} featured={index === 1} />)}
          </div>
        </section>

        <section id="investigations" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Internal investigations</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">When the problem is already inside</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">For leaks, collusion, conflicts of interest, suspicious procurement, abuse or hidden internal risks.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {investigationPlans.map((plan, index) => <PlanCard key={plan.title} plan={plan} featured={index === 1} />)}
          </div>
        </section>

        <section id="recurring" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Monthly support</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">HEIMDALL as an outsourced security department</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">For companies that need regular checks, risk control, InfoSec, closed owner tasks and a single responsible perimeter without hiring a department.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {outsourcingPlans.map((plan, index) => <PlanCard key={plan.title} plan={plan} featured={index === 1} />)}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-100"><Clock3 className="h-6 w-6" /></div>
              <h2 className="mt-7 text-4xl font-semibold tracking-[-0.05em]">How the format is selected</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">The goal is not to sell the most expensive package, but to choose a sufficient level of review for a confident management decision.</p>
            </div>
            <div className="grid gap-4">
              {steps.map(([title, text]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#F7D784]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-[#D6A84F]/25 bg-[#D6A84F]/[0.07] p-7 md:p-10 backdrop-blur-2xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]"><AlertTriangle className="h-4 w-4" /> Important</div>
                <h2 className="mt-7 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Clear boundaries</h2>
              </div>
              <div className="grid gap-3">
                {notes.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-7 text-white/68">
                    <SearchCheck className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-sky-300/20 bg-sky-300/[0.08] p-8 md:p-10 text-center backdrop-blur-2xl">
            <div className="mx-auto max-w-3xl">
              <div className="text-sm uppercase tracking-[0.24em] text-sky-200/80">Request</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Not sure which package fits?</h2>
              <p className="mt-6 text-lg leading-8 text-white/62">Briefly describe the situation. HEIMDALL will propose the right format: one-time check, InfoSec, investigation or outsourced security support.</p>
              <button onClick={() => openContact('Pricing package selection')} className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-8 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Get proposal <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <HeimdallFooter />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="en" defaultTopic={topic} />
    </>
  )
}
