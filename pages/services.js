import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import { ArrowRight, FileSearch, ShieldCheck, Network, UserSearch, Scale, Building2 } from 'lucide-react'

const services = [
  {
    title: 'Проверка контрагентов',
    text: 'Суды, владельцы, связанные компании, репутация, санкционные и финансовые сигналы.',
    href: '/proverka-kontragenta',
    icon: FileSearch
  },
  {
    title: 'Проверка кандидатов',
    text: 'Риски для чувствительных должностей: конфликт интересов, репутация, биография и связи.',
    href: '/proverka-kandidatov',
    icon: ShieldCheck
  },
  {
    title: 'Проверка бенефициаров',
    text: 'Фактический контроль, номинальные владельцы, скрытые связи и корпоративные конфликты.',
    href: '/proverka-beneficiarov',
    icon: UserSearch
  },
  {
    title: 'AML / KYC',
    text: 'Комплаенс-проверка клиентов, контрагентов и сделок с учётом санкционной экспозиции.',
    href: '/aml-kyc-russia',
    icon: Scale
  },
  {
    title: 'Due Diligence',
    text: 'Комплексная проверка компании, сделки, партнёра, актива или международной структуры.',
    href: '/due-diligence-russia',
    icon: Network
  },
  {
    title: 'Комплексное сопровождение',
    text: 'Постоянная проверка контрагентов, кандидатов, поставщиков и корпоративных рисков.',
    href: '/business-support',
    icon: Building2
  }
]

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Услуги | HEIMDALL</title>
        <meta name="description" content="Услуги HEIMDALL: проверка контрагентов, кандидатов, бенефициаров, AML/KYC, due diligence и комплексное сопровождение бизнеса." />
        <link rel="canonical" href="https://www.heimdall-group.ru/services" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              Intelligence Services
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Услуги корпоративной разведки и проверки рисков
            </h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              HEIMDALL помогает принимать решения до сделки, найма, партнёрства или допуска к чувствительной информации.
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
                  Открыть
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
