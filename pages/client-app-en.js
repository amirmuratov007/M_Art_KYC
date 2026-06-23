import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ArrowRight, Smartphone, ShieldCheck, Bell, FileText, Gauge, LockKeyhole, Send, Download } from 'lucide-react'

const features = [
  ['Dashboard', 'Support status, active checks, risk index and notifications.'],
  ['Checks', 'Counterparties, candidates, beneficial owners, suppliers and sanctions checks.'],
  ['Reports', 'Access to PDF reports, key findings and analyst recommendations.'],
  ['Risk signals', 'New litigation, sanctions, reputation and structural changes.'],
  ['Request check', 'The client can quickly submit a new subject for review.'],
  ['Private access', 'The application is available only to retained support clients.']
]

const screens = [
  ['Dashboard', Gauge],
  ['Checks', ShieldCheck],
  ['Reports', FileText],
  ['Signals', Bell],
  ['Request', Send]
]

const accessNotes = [
  ['Access', 'HEIMDALL issues login and password after contract signing'],
  ['Working entry', 'The app opens the real client account']
]

export default function ClientAppEnPage() {
  return (
    <>
      <Head>
        <title>Client Application | HEIMDALL</title>
        <meta name="description" content="HEIMDALL client app: mobile access to checks, statuses, reports and new client requests." />
        <link rel="canonical" href="https://www.heimdall-group.ru/client-app-en" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.16),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="en" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-5 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <Smartphone className="h-4 w-4" />
              HEIMDALL Client App
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Mobile client workspace for HEIMDALL
            </h1>

            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Not just a page. This is a private mobile client interface for checks, reports, risk signals and fast requests under an active support contract.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/app-download-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Download app
                <Download className="h-4 w-4" />
              </Link>
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Open account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Sign in
              </Link>
            </div>

            <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
              {accessNotes.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/38">{label}</div>
                  <div className="mt-2 text-sm leading-6 text-[#F7D784]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm rounded-[48px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl">
            <div className="rounded-[38px] border border-[#D6A84F]/20 bg-[#07101f] p-5 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]/80">Client Access</div>
                  <div className="mt-1 text-xl font-semibold">Meridian Capital</div>
                </div>
                <LockKeyhole className="h-5 w-5 text-sky-300" />
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="text-sm text-white/45">Risk index</div>
                <div className="mt-2 text-5xl font-semibold text-[#F7D784]">64</div>
                <div className="mt-2 text-sm text-white/45">Enhanced Business Support</div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[64%] rounded-full bg-[#D6A84F]" />
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {screens.map(([name, Icon]) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-sky-300" />
                      <span className="text-sm">{name}</span>
                    </div>
                    <span className="text-xs text-white/35">open</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                Test account active
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Capabilities</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              The app looks like a product, not a set of pages
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <ShieldCheck className="mb-6 h-6 w-6 text-sky-300" />
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="request" className="relative z-10 mx-auto max-w-7xl px-4 pb-32 sm:px-5">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Install</div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                The install link is active
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
                Open the download page on a phone and install the PWA. When the native app is rebuilt, this page can be used as the download hub.
              </p>
            </div>
            <Link href="/app-download-en" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Go to download
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
