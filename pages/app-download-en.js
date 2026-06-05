import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import PWAInstallButton from '@/components/PWAInstallButton'
import { ArrowRight, Smartphone, Download, KeyRound } from 'lucide-react'

const steps = [
  ['1', 'PWA installs to phone now', 'Open this page on a phone and tap the install button.'],
  ['2', 'Mobile source is available', 'The mobile app source archive is hosted and downloadable.'],
  ['3', 'APK/TestFlight can be added later', 'When APK or TestFlight link is ready, the download button will point there directly.']
]

const credentials = [
  ['Email', 'demo@heimdall-group.ru'],
  ['Password', 'HeimdallDemo2026!'],
  ['Company', 'Meridian Capital Demo']
]

const downloads = [
  ['Mobile app source archive', '/downloads/heimdall-client-mobile-source.zip', 'ZIP'],
  ['iOS trial package', '/downloads/heimdall-ios-trial-site-package.zip', 'ZIP'],
  ['Windows demo', '/downloads/HeimdallCabinet-Windows-demo.exe', 'EXE']
]

export default function AppDownloadEnPage() {
  return (
    <>
      <Head>
        <title>Download Client App | HEIMDALL</title>
        <meta name="description" content="Install the HEIMDALL client app on a phone: PWA access, test account, mobile source archive and demo dashboard." />
        <link rel="canonical" href="https://www.heimdall-group.ru/app-download-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.16),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-5 sm:py-24 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <Download className="h-4 w-4" />
              HEIMDALL Client App
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Client app install and files
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              The uploaded archive does not contain an APK or IPA, so I am not creating a fake APK button. PWA install is active now, and the mobile source and trial packages are available for download.
            </p>

            <div className="mt-10 max-w-xl">
              <PWAInstallButton language="en" />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link href="/demo-client-app-en" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Open demo account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Real client account
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]/80">Test Access</div>
                  <div className="mt-2 text-2xl font-semibold">Test account</div>
                </div>
                <KeyRound className="h-6 w-6 text-sky-300" />
              </div>

              <div className="mt-7 grid gap-3">
                {credentials.map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/38">{label}</div>
                    <div className="mt-2 select-all font-mono text-sm text-[#F7D784]">{value}</div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-7 text-white/58">
                These details can be used as test access in the native app after rebuild. The site also includes a demo dashboard without touching Supabase.
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Application files</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Downloads are active
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {downloads.map(([title, href, type]) => (
              <a key={href} href={href} download className="group rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[#D6A84F]/35">
                <div className="inline-flex rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-sm font-semibold text-[#F7D784]">{type}</div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                  Download <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(([num, title, text]) => (
              <div key={num} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-lg font-semibold text-[#F7D784]">{num}</div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <Smartphone className="mb-6 h-8 w-8 text-sky-200" />
              <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Ready for APK/TestFlight</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">
                When you rebuild the app and send an APK or TestFlight link, I will replace the button with direct installer download.
              </p>
            </div>
            <Link href="/client-app-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">
              About the app <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
