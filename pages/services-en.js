import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
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

export default function ServicesEnPage() {
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
              HEIMDALL helps clients make decisions before transactions, hiring, partnerships or access to sensitive information.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-32 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <Link key={service.href} href={service.href} className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 hover:bg-white/[0.07]">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{service.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{service.text}</p>
                <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">
                  Open
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </section>
      </main>
    </>
  )
}
