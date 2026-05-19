import Head from 'next/head'
import Link from 'next/link'
import { ShieldCheck, ArrowRight, LockKeyhole } from 'lucide-react'

const plans = [
  {
    title: 'Candidate Screening',
    price: '$290',
    time: '1–2 days',
    features: [
      'Background review',
      'Reputation signals',
      'Conflict of interest review',
      'Analytical conclusion'
    ]
  },
  {
    title: 'Counterparty Intelligence',
    price: '$590',
    time: '2 days',
    featured: true,
    features: [
      'Litigation review',
      'Sanctions exposure',
      'Beneficial ownership',
      'Reputation analysis',
      'Risk summary'
    ]
  },
  {
    title: 'Enhanced Due Diligence',
    price: '$1,200',
    time: '2–4 days',
    features: [
      'International sources',
      'Deep relationship mapping',
      'Enhanced analytics',
      'Executive summary',
      'Confidential workflow'
    ]
  }
]

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing | HEIMDALL</title>
        <meta
          name="description"
          content="HEIMDALL pricing: candidate screening, counterparty intelligence and enhanced due diligence."
        />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <ShieldCheck className="h-4 w-4" />
              HEIMDALL Pricing
            </div>

            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Intelligence & Due Diligence Pricing
            </h1>

            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Fixed core formats for candidate screening, counterparty intelligence and enhanced due diligence.
              Complex international and confidential matters are scoped individually.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-24 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-[42px] border p-8 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 ${
                plan.featured
                  ? 'border-sky-300/30 bg-sky-300/10 shadow-[0_0_60px_rgba(56,189,248,0.15)]'
                  : 'border-white/10 bg-white/[0.045]'
              }`}
            >
              <div className="text-sm uppercase tracking-[0.22em] text-sky-200/80">
                {plan.time}
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">
                {plan.title}
              </h2>

              <div className="mt-8 text-6xl font-semibold tracking-[-0.06em] text-sky-100">
                {plan.price}
              </div>

              <div className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70"
                  >
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href="/#lead"
                className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.24)]"
              >
                Request review
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-white/10 bg-white/[0.045] p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
                Custom engagements
              </div>

              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                NDA and secure workflow available on request
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/64">
                International investigations, deep due diligence, sanctions reviews
                and sensitive corporate matters are scoped individually.
              </p>
            </div>

            <div className="rounded-[34px] border border-sky-300/20 bg-sky-300/10 p-8">
              <LockKeyhole className="mb-6 h-7 w-7 text-sky-300" />

              <div className="text-2xl font-semibold">
                Custom Intelligence Engagements
              </div>

              <div className="mt-5 text-white/65 leading-8">
                International investigations, deep due diligence, sanctions reviews
                and confidential projects — starting from $2,000.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
