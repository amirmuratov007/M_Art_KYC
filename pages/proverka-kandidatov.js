import Head from 'next/head'

const faq = [["Зачем проверять кандидатов?", "Это снижает риск мошенничества и репутационных проблем."], ["Что проверяется?", "Биография, репутация, связи и конфликт интересов."]]

export default function SeoPage() {
  return (
    <>
      <Head>
        <title>Проверка кандидатов | HEIMDALL</title>
        <meta name="description" content="HEIMDALL помогает снизить риск найма проблемных сотрудников." />
      </Head>

      <main className="min-h-screen bg-[#050816] px-5 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
            HEIMDALL Intelligence
          </div>

          <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Проверка кандидатов перед наймом
          </h1>

          <p className="mt-10 text-xl leading-9 text-white/65">
            Проверка биографии, конфликтов интересов и репутационных сигналов.
          </p>

          <section className="mt-16 grid gap-5 md:grid-cols-2">
            ['Биография кандидата','Конфликты интересов','Репутационные сигналы','Executive screening'].map((item) => (
              <div key={item} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
                <div className="text-lg font-semibold text-sky-100">{item}</div>
              </div>
            ))
          </section>

          <section className="mt-20">
            <h2 className="text-3xl font-semibold">FAQ</h2>
            <div className="mt-8 space-y-5">
              {faq.map(([q,a]) => (
                <div key={q} className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
                  <div className="text-xl font-semibold">{q}</div>
                  <div className="mt-3 text-white/65 leading-7">{a}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
