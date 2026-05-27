
import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'

export default function BusinessSupportCleanPage() {
  return (
    <>
      <Head>
        <title>Комплексное сопровождение бизнеса | HEIMDALL</title>
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              HEIMDALL Retainer
            </div>

            <h1 className="mt-9 text-6xl font-semibold leading-[0.92] tracking-[-0.07em] md:text-8xl">
              Комплексное сопровождение бизнеса
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-white/64">
              Постоянный intelligence и risk advisory контур для компаний,
              работающих с чувствительными сделками, контрагентами,
              закупками и управленческими рисками.
            </p>

            <div className="mt-10 rounded-[32px] border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-8 py-7 backdrop-blur-2xl">
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                Стоимость сопровождения
              </div>

              <div className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
                от 200 000 ₽ / месяц
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
                Формат долгосрочного сопровождения для компаний,
                которым необходим постоянный контроль рисков,
                проверка контрагентов и аналитическая поддержка.
              </p>
            </div>
          </div>
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
