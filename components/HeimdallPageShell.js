import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { HeimdallFrame } from '@/components/HeimdallFrame'

export default function HeimdallPageShell({ title, description, switchHref, switchLabel, children }) {
  const language = switchLabel === 'RU' ? 'en' : 'ru'

  return (
    <>
      <Head>
        <title>{title} | HEIMDALL</title>
        <meta name="description" content={description} />
      </Head>

      <HeimdallFrame>
        <HeimdallNav language={language} />
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f3d58a]">HEIMDALL workspace</div>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl">{title}</h1>
              {description ? <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">{description}</p> : null}
            </div>
            {switchHref ? (
              <Link href={switchHref} className="rounded-xl border border-white/[0.12] bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white">
                {switchLabel}
              </Link>
            ) : null}
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.055] p-5 shadow-2xl backdrop-blur-2xl sm:p-8">
            {children}
          </div>
        </section>
        <HeimdallFooter language={language} />
      </HeimdallFrame>
    </>
  )
}
