import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import PWAInstallButton from '@/components/PWAInstallButton'
import { ArrowRight, Download } from 'lucide-react'

export default function AppDownloadEnPage() {
  return (
    <>
      <Head>
        <title>Client App | HEIMDALL</title>
        <meta name="description" content="HEIMDALL client app." />
        <link rel="canonical" href="https://www.heimdall-group.ru/app-download-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.16),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 sm:py-24 lg:grid-cols-[1fr_0.7fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <Download className="h-4 w-4" />
              HEIMDALL App
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Client app
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Open the app or add it to your phone home screen.
            </p>

            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
              <Link href="/demo-client-app-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                Open app
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Sign in
              </Link>
            </div>

            <div className="mt-6 max-w-xl">
              <PWAInstallButton language="en" />
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <img src="/heimdall-logo-mark.png" alt="HEIMDALL" className="mx-auto w-full max-w-[360px]" />
            </div>
          </div>
        </section>

        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
