import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { Send, ArrowRight, ShieldCheck } from 'lucide-react'

export default function TelegramPage() {
  return (
    <>
      <Head>
        <title>Telegram-канал HEIMDALL | корпоративная разведка и проверка рисков</title>
        <meta name="description" content="Telegram-канал HEIMDALL: ежедневные заметки о проверке контрагентов, кандидатов, due diligence, санкциях и корпоративных рисках." />
        <meta property="og:title" content="Telegram-канал HEIMDALL" />
        <meta property="og:description" content="Корпоративная разведка, проверка контрагентов, кандидатов и скрытых рисков." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Связаться</Link>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <Send className="h-4 w-4" />
              HEIMDALL Telegram
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Telegram-канал о рисках, которые лучше увидеть заранее</h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Ежедневные заметки о проверке контрагентов, кандидатов, скрытых бенефициаров, санкционных рисках и корпоративной безопасности.
            </p>
            <a href="https://t.me/heimdall_risk" className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">
              Открыть Telegram
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 pb-32 md:grid-cols-3">
          {['Проверка контрагентов', 'Проверка кандидатов', 'Due diligence', 'Санкционные риски', 'Скрытые бенефициары', 'Корпоративная разведка'].map((item) => (
            <div key={item} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <ShieldCheck className="mb-5 h-5 w-5 text-sky-300" />
              <div className="text-xl font-semibold">{item}</div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
