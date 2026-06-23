import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import SupportRequestForm from '@/components/SupportRequestForm'
import { AlertTriangle, ArrowRight, Car, CheckCircle2, FileSearch, Home, Network, ShieldCheck, UserSearch } from 'lucide-react'

const iconMap = {
  home: Home,
  car: Car,
  seller: UserSearch,
  file: FileSearch,
  network: Network,
  shield: ShieldCheck,
  warning: AlertTriangle
}

export default function PurchaseSellerCheckPage({ content }) {
  const HeroIcon = iconMap[content.icon] || ShieldCheck
  const language = content.language || 'ru'
  const leadHref = language === 'ru' ? '/#lead' : '/?lang=en#lead'
  const homeHref = language === 'ru' ? '/' : '/?lang=en'

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={content.canonical} />
        {content.alternate && <link rel="alternate" hrefLang={content.alternate.hrefLang} href={content.alternate.href} />}
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language={language} />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pt-8 text-sm text-white/45">
          <Link href={homeHref} className="transition hover:text-sky-200">
            {language === 'ru' ? 'Главная' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/70">{content.breadcrumb}</span>
        </div>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <HeroIcon className="h-4 w-4" /> {content.kicker}
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
              {content.title}
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              {content.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={leadHref} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)] transition hover:bg-sky-400">
                {content.cta} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#scope" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784] transition hover:border-[#D6A84F]/45">
                {content.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">{content.cardLabel}</div>
              <div className="mt-8 grid gap-4">
                {content.cardItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm text-white/72">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="scope" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">{content.scopeKicker}</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{content.scopeTitle}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.scope.map((item) => {
              const Icon = iconMap[item.icon] || FileSearch
              return (
                <div key={item.title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/60">{item.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[46px] border border-sky-300/20 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.065),rgba(255,255,255,0.025))] p-6 backdrop-blur-2xl md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-sky-100">
                  <ShieldCheck className="h-4 w-4" /> {content.processKicker}
                </div>
                <h2 className="mt-7 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-6xl">
                  {content.processTitle}
                </h2>
                <p className="mt-6 text-lg leading-8 text-white/64">{content.processText}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {content.process.map((item) => (
                  <div key={item.title} className="rounded-[28px] border border-white/10 bg-black/25 p-6">
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-sky-100">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/60">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">{content.deliverablesKicker}</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">{content.deliverablesTitle}</h2>
              <div className="mt-8 grid gap-4">
                {content.deliverables.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">{content.boundariesKicker}</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">{content.boundariesTitle}</h2>
              <div className="mt-8 grid gap-4">
                {content.boundaries.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">{content.faqKicker}</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{content.faqTitle}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {content.faq.map((item) => (
              <div key={item.question} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <h3 className="text-xl font-semibold tracking-[-0.04em]">{item.question}</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="purchase-check-request" className="relative z-10 mx-auto max-w-7xl px-5 pb-28">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">{content.finalKicker}</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">{content.finalTitle}</h2>
              <p className="mt-6 text-base leading-8 text-white/62">{content.finalText}</p>
            </div>
            <SupportRequestForm />
          </div>
        </section>

        <HeimdallFooter language={language} />
      </main>
    </>
  )
}
