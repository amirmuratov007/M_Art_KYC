import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>AML / KYC проверка | HEIMDALL</title>
        <meta name="description" content="Проверка клиентов, санкций, PEP и репутационных рисков." />
      </Head>

      <main className="min-h-screen bg-[#050816] text-white px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
            HEIMDALL Intelligence
          </div>

          <h1 className="mt-10 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
            AML / KYC проверка
          </h1>

          <p className="mt-10 text-xl leading-9 text-white/65">
            Проверка клиентов, санкций, PEP и репутационных рисков.
          </p>

          <section className="mt-16 grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold">Что входит</h2>
              <ul className="mt-5 space-y-3 text-white/65">
                <li>• Проверка судебной истории</li>
                <li>• Санкционные риски</li>
                <li>• Репутационные сигналы</li>
                <li>• Связанные лица</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-2xl font-semibold">Когда это нужно</h2>
              <p className="mt-5 leading-8 text-white/65">
                Перед сделкой, наймом, инвестициями, партнёрством или выходом на новую юрисдикцию.
              </p>
            </div>
          </section>

          <section className="mt-20">
            <h2 className="text-3xl font-semibold">FAQ</h2>

            <div className="mt-8 space-y-5">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xl font-semibold">Зачем нужна проверка?</div>
                <div className="mt-3 text-white/65 leading-7">
                  Для снижения юридических, финансовых и репутационных рисков.
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                <div className="text-xl font-semibold">Что получает клиент?</div>
                <div className="mt-3 text-white/65 leading-7">
                  Структурированный аналитический отчёт с выводами и рекомендацией.
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
