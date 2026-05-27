
import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'

export default function ProverkaKontragentaBusiness() {
  return (
    <>
      <Head>
        <title>Проверка контрагентов для бизнеса | HEIMDALL</title>

        <meta
          name="description"
          content="Проверка контрагентов, анализ владельцев, судебных рисков и связей компаний. Корпоративная разведка и due diligence от HEIMDALL."
        />

        <link
          rel="canonical"
          href="https://heimdall-group.ru/proverka-kontragentov-dlya-biznesa"
        />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              Corporate Intelligence
            </div>

            <h1 className="mt-8 text-6xl font-semibold tracking-[-0.07em] md:text-8xl">
              Проверка контрагентов для бизнеса
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-white/64">
              Анализ владельцев, судебных рисков, связей, санкционных сигналов
              и корпоративной структуры компаний.
            </p>
          </div>
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
