import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { FileText, ShieldCheck, LockKeyhole, Building2 } from 'lucide-react'

const iconMap = {
  file: FileText,
  shield: ShieldCheck,
  lock: LockKeyhole,
  building: Building2
}

export default function HeimdallLegalLayout({
  language = 'ru',
  title,
  description,
  canonical,
  badge,
  lead,
  updated,
  sections = [],
  notice,
  icon = 'file'
}) {
  const ru = language === 'ru'
  const Icon = iconMap[icon] || FileText

  return (
    <>
      <Head>
        <title>{title} | HEIMDALL</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language={language} />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-5 sm:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.22em] text-[#F7D784]">
              <Icon className="h-4 w-4" /> {badge}
            </div>
            <h1 className="mt-8 break-words text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl md:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-8 text-white/64 sm:text-lg sm:leading-9">
              {lead}
            </p>
            {updated && <div className="mt-6 text-sm uppercase tracking-[0.18em] text-sky-200/70">{updated}</div>}
          </div>
        </section>

        {notice && (
          <section className="relative z-10 mx-auto max-w-7xl px-4 pb-8 sm:px-5">
            <div className="rounded-[32px] border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-6 text-sm leading-7 text-white/72 backdrop-blur-2xl sm:p-8">
              {notice}
            </div>
          </section>
        )}

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5 sm:pb-32">
          <div className="grid gap-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-8">
                <h2 className="text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{section.title}</h2>
                {section.text && <p className="mt-4 text-sm leading-7 text-white/62 sm:text-base sm:leading-8">{section.text}</p>}
                {section.items && (
                  <div className="mt-5 grid gap-3">
                    {section.items.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-white/68 sm:text-base">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                {section.links && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <Link key={link.href} href={link.href} className="rounded-2xl border border-sky-300/20 bg-sky-300/10 px-5 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-300/40">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <HeimdallFooter language={language} />
      </main>
    </>
  )
}
