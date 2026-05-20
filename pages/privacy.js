import Head from 'next/head'

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Политика конфиденциальности | HEIMDALL</title>
        <meta name="description" content="Политика конфиденциальности HEIMDALL." />
        <link rel="canonical" href="https://www.heimdall-group.ru/privacy" />
      </Head>

      <main className="min-h-screen bg-[#050816] px-5 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-5xl font-semibold tracking-[-0.05em]">Политика конфиденциальности</h1>
          <p className="mt-8 leading-8 text-white/65">
            HEIMDALL обрабатывает обращения и контактные данные только для связи с клиентом и оценки запроса.
          </p>
          <p className="mt-6 leading-8 text-white/65">
            Основной сайт: https://www.heimdall-group.ru
          </p>
        </div>
      </main>
    </>
  )
}
