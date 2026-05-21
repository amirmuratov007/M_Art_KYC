import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { ArrowRight, ShieldCheck, LockKeyhole, CheckCircle2 } from 'lucide-react'

const packages = [
  {
    name: 'Essential Business Support',
    price: 'from $2,500 / month',
    best: false,
    description: 'For companies that need continuous review of counterparties, candidates and core business risks.',
    features: [
      'up to 8 reviews per month',
      'counterparty and candidate screening',
      'short analytical conclusions',
      'monthly risk overview',
      'priority communication'
    ]
  },
  {
    name: 'Enhanced Business Support',
    price: 'from $4,500 / month',
    best: true,
    description: 'For businesses making regular decisions on transactions, partners, hiring and suppliers.',
    features: [
      'up to 18 reviews per month',
      'enhanced reports on companies and people',
      'sanctions and reputation checks',
      'ownership and relationship maps',
      'weekly risk digest',
      'client application access'
    ]
  },
  {
    name: 'Strategic Intelligence Support',
    price: 'from $7,500 / month',
    best: false,
    description: 'For owners, holdings, investors and companies with sensitive international matters.',
    features: [
      'custom review volume',
      'corporate intelligence support',
      'foreign company reviews',
      'beneficial ownership monitoring',
      'transaction and negotiation support',
      'confidential workflow and NDA'
    ]
  }
]

const benefits = [
  ['Continuous risk control', 'The company receives a regular analytical risk layer around deals, hiring and partnerships.'],
  ['Faster decisions', 'Management sees a clear conclusion: proceed, proceed with controls or stop.'],
  ['Lower losses', 'Review before the decision helps avoid toxic counterparties, weak candidates and hidden conflicts.'],
  ['Confidential workflow', 'Work can be handled under NDA, with restricted access and secure communication.']
]

const workflow = [
  ['01', 'Onboarding', 'We define business goals, sensitive areas and reporting format.'],
  ['02', 'Regular reviews', 'We review counterparties, candidates, suppliers, beneficial owners and related structures.'],
  ['03', 'Risk monitoring', 'We track signals, changes, new litigation and reputation events.'],
  ['04', 'Reports and recommendations', 'We deliver conclusions, relationship maps, risk index and decision recommendations.']
]

export default function BusinessSupportPageEN() {
  return (
    <>
      <Head>
        <title>Business Support | HEIMDALL</title>
        <meta name="description" content="HEIMDALL business support: continuous counterparty intelligence, candidate screening, beneficial ownership review and corporate risk monitoring." />
        <link rel="canonical" href="https://www.heimdall-group.ru/business-support-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex items-center gap-3">
              <Link href="/business-support" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">RU</Link>
              <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Discuss support</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Business Support
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Continuous protection from hidden business risks
            </h1>

            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              HEIMDALL supports companies on a monthly basis: reviewing counterparties, candidates, suppliers, beneficial owners, transactions and reputation risks before they become problems.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/#lead" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Request proposal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sample-reports-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                View reports
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Client receives</div>
              <div className="mt-8 grid gap-4">
                {[
                  ['Reviews', 'counterparties, candidates, beneficial owners'],
                  ['Monitoring', 'litigation, sanctions, reputation'],
                  ['Reports', 'conclusions and recommendations'],
                  ['Application', 'access for retained support clients']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                    <div className="text-sm text-white/45">{label}</div>
                    <div className="mt-1 font-semibold text-[#F7D784]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Benefits</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Not a one-time check, but a continuous risk layer</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <ShieldCheck className="mb-6 h-6 w-6 text-sky-300" />
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Workflow</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">From onboarding to continuous protection</h2>
          </div>

          <div className="grid gap-5">
            {workflow.map(([number, title, text]) => (
              <div key={number} className="grid gap-5 rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl md:grid-cols-[90px_1fr] md:items-center">
                <div className="text-4xl font-semibold text-[#F7D784]">{number}</div>
                <div>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Pricing</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Monthly support pricing</h2>
            <p className="mt-6 text-lg leading-8 text-white/60">Final pricing depends on review volume, report depth, jurisdictions, response speed and confidentiality requirements.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((plan) => (
              <div key={plan.name} className={`rounded-[42px] border p-8 backdrop-blur-2xl ${plan.best ? 'border-sky-300/30 bg-sky-300/10 shadow-[0_0_60px_rgba(56,189,248,0.15)]' : 'border-white/10 bg-white/[0.045]'}`}>
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">{plan.best ? 'Recommended' : 'Format'}</div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{plan.name}</h3>
                <p className="mt-5 text-sm leading-7 text-white/60">{plan.description}</p>
                <div className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-sky-100">{plan.price}</div>
                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Client application</div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Application access is included in support</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">Clients will see review statuses, reports, risk signals, notifications and business support history.</p>
            </div>
            <Link href="/#lead" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
              Discuss access
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
