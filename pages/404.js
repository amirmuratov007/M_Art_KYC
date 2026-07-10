import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, Search, ShieldCheck } from 'lucide-react'
import HeimdallLogo from '@/components/HeimdallLogo'

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Страница не найдена | HEIMDALL</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <main className="min-h-screen bg-[#050816] px-5 text-white">
        <header className="mx-auto flex max-w-6xl items-center justify-between py-6">
          <HeimdallLogo />
          <Link href="/" aria-label="На главную" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </header>

        <section className="mx-auto flex min-h-[72vh] max-w-6xl items-center py-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <ShieldCheck className="h-5 w-5" />
              Ошибка 404
            </div>
            <h1 className="mt-7 text-5xl font-semibold leading-tight md:text-7xl">Такой страницы нет</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Адрес мог измениться. Вернитесь на главную или откройте каталог проверок HEIMDALL.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-[#D6A84F] px-5 py-3 font-semibold text-[#050816]">
                <ArrowLeft className="h-4 w-4" />
                На главную
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-3 font-semibold text-white/80">
                <Search className="h-4 w-4" />
                Все услуги
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
