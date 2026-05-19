
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'

const servicesRu = [
  {
    title: 'Корпоративная разведка',
    text: 'Проверка контрагентов, структур владения и скрытых рисков.',
    href: '/proverka-kontragenta'
  },
  {
    title: 'Проверка кандидатов',
    text: 'Проверка кандидатов и ключевых должностей перед наймом.',
    href: '/proverka-kandidatov'
  },
  {
    title: 'AML / KYC проверка',
    text: 'Санкционные, репутационные и комплаенс-проверки.',
    href: '/aml-kyc-russia'
  },
  {
    title: 'Расширенная проверка бизнеса',
    text: 'Расширенная аналитика для международных кейсов и сложных сделок.',
    href: '/due-diligence-russia'
  },
  {
    title: 'Проверка иностранных компаний',
    text: 'Проверка иностранных компаний и международных структур.',
    href: '/due-diligence-dubai'
  },
  {
    title: 'Проверка руководителей',
    text: 'Проверка руководителей и ключевых фигур бизнеса.',
    href: '/executive-screening'
  }
]

const servicesEn = [
  {
    title: 'Corporate Intelligence',
    text: 'Counterparty intelligence, ownership structures and hidden risks.',
    href: '/corporate-intelligence'
  },
  {
    title: 'Candidate Screening',
    text: 'Background checks for candidates and sensitive positions.',
    href: '/background-check'
  },
  {
    title: 'AML / KYC Review',
    text: 'Sanctions, reputation and compliance reviews.',
    href: '/aml-kyc-russia'
  },
  {
    title: 'Enhanced Due Diligence',
    text: 'Enhanced intelligence reviews for complex transactions.',
    href: '/due-diligence-dubai'
  },
  {
    title: 'International Company Review',
    text: 'Review of foreign companies and international structures.',
    href: '/due-diligence-dubai'
  },
  {
    title: 'Executive Screening',
    text: 'Executive and key-person intelligence reviews.',
    href: '/executive-screening'
  }
]

export default function HeimdallServices({ language = 'ru' }) {
  const ru = language === 'ru'
  const services = ru ? servicesRu : servicesEn

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
          <ShieldCheck className="h-4 w-4" />
          HEIMDALL Solutions
        </div>

        <h2 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
          {ru
            ? 'Аналитические решения для бизнеса'
            : 'Intelligence Solutions for Business'}
        </h2>

        <p className="mt-8 max-w-3xl text-xl leading-9 text-white/64">
          {ru
            ? 'HEIMDALL помогает снижать юридические, финансовые и репутационные риски перед наймом, сделками и партнёрствами.'
            : 'HEIMDALL helps reduce legal, financial and reputation risks before hiring, transactions and partnerships.'}
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group rounded-[36px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07]"
          >
            <div className="text-2xl font-semibold tracking-[-0.03em] text-white">
              {service.title}
            </div>

            <p className="mt-5 text-sm leading-7 text-white/60">
              {service.text}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
              {ru ? 'Подробнее' : 'Learn more'}

              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
