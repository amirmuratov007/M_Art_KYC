import Head from 'next/head'
import Link from 'next/link'

const palette = [
  ['#050816', 'Глубокий чёрный', 'основной фон'],
  ['#08111F', 'Полуночный синий', 'секции и карточки'],
  ['#1E3A5F', 'Стальной синий', 'границы и структура'],
  ['#93C5FD', 'Ледяной синий', 'акценты и ссылки'],
  ['#38BDF8', 'Исполнительный циан', 'CTA и интерактив']
]

const sections = [
  ['Позиционирование', 'HEIMDALL - премиальная компания в сфере корпоративной разведки, проверки рисков, due diligence и проверки кандидатов.'],
  ['Характер бренда', 'Спокойная сила, конфиденциальность, точность, стратегическое мышление и executive-level подача.'],
  ['Голос бренда', 'Кратко, уверенно, аналитично. Без шума, хайпа и дешёвых маркетинговых обещаний.'],
  ['Визуальный стиль', 'Dark finance, intelligence infrastructure, premium legal advisory и скандинавский минимализм.']
]

export default function BrandbookRu() {
  return (
    <>
      <Head>
        <title>Брендбук HEIMDALL</title>
        <meta name="description" content="Корпоративный брендбук HEIMDALL на русском языке." />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_45%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <Link href="/">
              <img src="/heimdall-logo-full.png" alt="HEIMDALL" className="h-12 w-auto" />
            </Link>
            <div className="flex gap-3">
              <Link href="/brandbook-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link>
              <a href="/heimdall-brandbook-ru.pdf" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold">Скачать PDF</a>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              Корпоративный брендбук
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              HEIMDALL
              <br />
              Интеллект. Риск. Доверие.
            </h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Визуальная и смысловая система бренда для премиальной компании в сфере корпоративной разведки и проверки рисков.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {sections.map(([title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Логотип</div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Знак наблюдения и структуры</h2>
                <p className="mt-6 text-lg leading-8 text-white/62">Монограмма H построена как строгий intelligence-symbol: вертикальные опоры, структура, контроль и точность.</p>
              </div>
              <div className="rounded-[34px] border border-sky-300/20 bg-[#07101f] p-10">
                <img src="/heimdall-logo-full.png" alt="HEIMDALL logo" className="w-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Цветовая система</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">Тёмная премиальная палитра</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-5">
            {palette.map(([hex, name, use]) => (
              <div key={hex} className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5">
                <div className="h-28 rounded-2xl border border-white/10" style={{ backgroundColor: hex }} />
                <div className="mt-5 font-semibold">{name}</div>
                <div className="mt-1 text-sm text-sky-200">{hex}</div>
                <div className="mt-3 text-xs leading-5 text-white/50">{use}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Финальное ощущение бренда</div>
            <h2 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              «Эти люди знают больше, чем говорят публично».
            </h2>
          </div>
        </section>
      </main>
    </>
  )
}