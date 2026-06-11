import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, ShieldCheck, UserSearch, Home, Baby, Car, KeyRound, FileText, CheckCircle2, AlertTriangle, Scale, LockKeyhole } from 'lucide-react'

const staffTypes = [
  ['Nanny or governess', 'access to children, home, family routine and personal information', Baby],
  ['Caregiver or elderly assistant', 'access to a vulnerable person, medication, documents and household routines', Home],
  ['Personal driver', 'access to routes, children, vehicles, schedule and confidential conversations', Car],
  ['Housekeeper, gardener, guard or assistant', 'access to the home, keys, property, equipment and private space', KeyRound]
]

const checks = [
  ['Provided data review', 'we compare the questionnaire, documents, experience, biography and visible inconsistencies'],
  ['Open litigation and enforcement indicators', 'we review public signals of disputes, debt and property-related conflicts'],
  ['Public digital footprint', 'we assess open materials, reputation signals, public profiles and inconsistencies'],
  ['References and prior experience', 'we help verify references correctly when they are provided and consented to'],
  ['Home and family access risk', 'we assess what access the person will have and what restrictions should be considered'],
  ['Interview questions', 'we prepare questions to clarify before giving access to home, children or elderly relatives']
]

const pricing = [
  {
    title: 'Basic review',
    price: 'from 25,000 RUB',
    term: '1-3 business days',
    best: 'for initial screening of a nanny, assistant, gardener or housekeeper',
    items: ['provided data review', 'open litigation and enforcement indicators', 'public digital footprint', 'short red-flag summary']
  },
  {
    title: 'Enhanced review',
    price: 'from 45,000 RUB',
    term: '2-5 business days',
    best: 'for a nanny, caregiver, driver or person with regular home access',
    items: ['everything in the basic review', 'biography and inconsistency analysis', 'reference review when consent is available', 'risk profile and final interview questions']
  },
  {
    title: 'Trusted household staff',
    price: 'from 75,000 RUB',
    term: '3-7 business days',
    best: 'for staff with access to children, elderly relatives, keys, vehicles, documents or money',
    items: ['deeper risk profile', 'access and restriction map', 'recommendations for agreement and trial period', 'confidential family consultation']
  }
]

const boundaries = [
  'We work only within a lawful framework, without grey databases, illegal access or hidden collection of closed information.',
  'We do not check medical diagnoses, addictions, private life, political views or other sensitive data without a specific lawful basis.',
  'Personal data checks require the candidate’s consent or another lawful processing basis.',
  'HEIMDALL does not provide absolute guarantees of safety. We identify red flags, inconsistencies and access risks before hiring.'
]

function PriceCard({ plan }) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
      <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]/80">{plan.term}</div>
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{plan.title}</h3>
      <div className="mt-4 text-3xl font-semibold text-sky-100">{plan.price}</div>
      <p className="mt-4 text-sm leading-7 text-white/58">{plan.best}</p>
      <div className="mt-6 grid gap-3">
        {plan.items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/68">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PrivateStaffCheckEnPage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Household Staff Background Check | HEIMDALL</title>
        <meta name="description" content="Nanny, caregiver, driver, housekeeper, gardener, guard and household staff background checks before granting access to home, children, elderly relatives, property and private information." />
        <link rel="canonical" href="https://www.heimdall-group.ru/private-staff-check-en" />
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
              <Home className="h-4 w-4" /> Family security
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Household staff checks before granting access to family and home
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Nannies, caregivers, drivers, assistants, housekeepers, gardeners and guards may receive access to the home, children, elderly relatives, keys, documents and private information. HEIMDALL helps identify risks before hiring.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Request a review <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/risk-test-en?test=private_staff" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-7 py-4 font-semibold text-white/86 hover:border-[#D6A84F]/35">
                Take the risk test
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="flex items-start gap-4 rounded-[28px] border border-red-300/20 bg-red-300/[0.08] p-5">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-red-100" />
              <div>
                <div className="text-2xl font-semibold tracking-[-0.04em]">The main risk is trust without verification</div>
                <p className="mt-3 text-sm leading-7 text-white/64">Private hiring is often based on a recommendation, a questionnaire and one interview. That is not enough when the person will access a child, elderly relative, keys or property.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {['access to home and keys', 'access to children or elderly relatives', 'contact with documents, vehicles and property', 'knowledge of family routine and private information'].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {staffTypes.map(([title, text, Icon]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <Icon className="h-8 w-8 text-[#F7D784]" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12">
          <div className="rounded-[38px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-sky-100">
                <UserSearch className="h-4 w-4" /> What we review
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">We review access risks, not private life</h2>
              <p className="mt-5 text-base leading-8 text-white/64">The purpose is to help a family make a reasoned decision: whether to grant access to the home, children, elderly relatives and private information, what restrictions are needed and what questions should be asked before hiring.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {checks.map(([title, text]) => (
                <div key={title} className="rounded-[26px] border border-white/10 bg-[#050816]/70 p-5">
                  <CheckCircle2 className="h-5 w-5 text-[#F7D784]" />
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12" id="pricing">
          <div className="mb-8 max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
              <FileText className="h-4 w-4" /> Pricing
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Review formats</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {pricing.map((plan) => <PriceCard key={plan.title} plan={plan} />)}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12">
          <div className="rounded-[34px] border border-emerald-300/15 bg-emerald-300/[0.07] p-6 backdrop-blur-2xl sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-100">
                  <Scale className="h-4 w-4" /> Legal boundaries
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em]">Clean and lawful</h2>
                <p className="mt-4 text-base leading-8 text-white/64">The service is designed as a lawful access-risk review before private hiring, not as a “person lookup” or illegal data search.</p>
              </div>
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
                Discuss a check <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {boundaries.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/18 px-4 py-4 text-sm leading-7 text-white/68">
                  <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-emerald-100" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12 pb-20">
          <div className="rounded-[34px] border border-white/10 bg-[#050816]/78 p-6 text-center backdrop-blur-2xl sm:p-10">
            <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Need to review a person before home access?</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/64">Describe whom you plan to hire and what access the person will receive. We will suggest a lawful review format and the required documents or consent process.</p>
            <button onClick={() => setContactOpen(true)} className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">
              Send request <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language="en" />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="en" defaultTopic="Household staff check" />
      </main>
    </>
  )
}
