import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, FileSearch, ShieldCheck, Network, UserSearch, Scale, Building2 } from 'lucide-react'

const services = [
  {
    title: 'Corporate Intelligence',
    text: 'Counterparty, ownership, litigation, reputation and sanctions risk review.',
    href: '/corporate-intelligence',
    icon: FileSearch
  },
  {
    title: 'Background Check',
    text: 'Candidate screening for sensitive positions, conflicts of interest and reputational signals.',
    href: '/background-check',
    icon: ShieldCheck
  },
  {
    title: 'Beneficial Ownership Review',
    text: 'Actual control, nominee ownership, hidden links and corporate conflicts.',
    href: '/proverka-beneficiarov',
    icon: UserSearch
  },
  {
    title: 'AML / KYC',
    text: 'Compliance review for clients, counterparties and transactions.',
    href: '/aml-kyc',
    icon: Scale
  },
  {
    title: 'Due Diligence Dubai',
    text: 'Enhanced due diligence for transactions, partners, assets and cross-border structures.',
    href: '/due-diligence-dubai',
    icon: Network
  },
  {
    title: 'Business Support',
    text: 'Monthly intelligence support for counterparties, candidates, suppliers and corporate risks.',
    href: '/business-support-en',
    icon: Building2
  }
]

const scenarios = [
  ['Transaction or acquisition', 'Ownership structure, litigation history, hidden links and red flags before signing.'],
  ['Supplier or contractor', 'Shell-company indicators, related-party risks, sanctions exposure and payment risk.'],
  ['Sensitive hire', 'Reputation, conflicts of interest, financial pressure and links to competitors or suppliers.'],
  ['Foreign company', 'Cross-border review, beneficial owners, local registries, adverse media and compliance signals.']
]

const deliverables = [
  'Clear decision summary: proceed, stop or deepen the review',
  'Risk and relationship map',
  'Source and review-scope summary',
  'Recommended next actions'
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
        <meta name="description" content="HEIMDALL services: corporate intelligence, background checks, beneficial ownership review, AML/KYC, due diligence and business support." />
        <link rel="canonical" href="https://www.heimdall-group.ru/services-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              Intelligence Services
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Corporate intelligence and risk review services
            </h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Choose a task or submit a request. We will suggest the right format: quick screening, enhanced report or ongoing support.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => openContact('Review scope assessment')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Request scope <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/sample-reports-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                View sample report
              </Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-32 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <div key={service.href} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 hover:bg-white/[0.07]">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{service.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{service.text}</p>
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
