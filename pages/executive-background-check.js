
import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'

export default function Page() {
  return (
    <>
      <Head>
        <title>Executive Background Check | HEIMDALL</title>
        <meta name="description" content="Executive intelligence and leadership screening." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_50%,#050816_100%)]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              HEIMDALL Intelligence
            </div>

            <h1 className="mt-8 text-5xl font-semibold tracking-[-0.06em] leading-[0.95] md:text-8xl">
              Executive Background Check
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64">
              Executive intelligence and leadership screening.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-sky-300">
                Risk Layer
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                Beneficial ownership analysis
              </h3>

              <p className="mt-4 text-white/60 leading-7">
                HEIMDALL conducts structured intelligence verification with institutional-level methodology.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-sky-300">
                Intelligence
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                Sanctions and PEP screening
              </h3>

              <p className="mt-4 text-white/60 leading-7">
                Cross-jurisdiction intelligence analysis and hidden exposure detection.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.22em] text-sky-300">
                Due Diligence
              </div>

              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                Institutional verification process
              </h3>

              <p className="mt-4 text-white/60 leading-7">
                Multi-source verification with analytical reporting and risk scoring.
              </p>
            </div>
          </div>
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
