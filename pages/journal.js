import Head from 'next/head'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import telegramPosts from '@/data/telegramPosts'
import { Search, Send, ArrowRight } from 'lucide-react'

const categories = ['Все', ...Array.from(new Set(telegramPosts.map((post) => post.category)))]

export default function JournalPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Все')

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase()
    return telegramPosts.filter((post) => {
      const byCategory = category === 'Все' || post.category === category
      const searchText = [post.title, post.text, post.category, ...(post.body || [])].join(' ').toLowerCase()
      const byQuery = !q || searchText.includes(q)
      return byCategory && byQuery
    })
  }, [query, category])

  return (
    <>
      <Head>
        <title>Публикации Telegram | HEIMDALL</title>
        <meta name="description" content="Публикации HEIMDALL из Telegram-канала о проверке контрагентов, кандидатов, бенефициаров, санкционных рисках и due diligence." />
        <link rel="canonical" href="https://www.heimdall-group.ru/journal" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
              <Send className="h-4 w-4" />
              HEIMDALL Telegram Feed
            </div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Публикации из Telegram-канала
            </h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">
              Здесь собраны публикации HEIMDALL о проверке контрагентов, кандидатов, бенефициаров, санкционных рисках, due diligence и корпоративной безопасности.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-10">
          <div className="grid gap-5 rounded-[34px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl md:grid-cols-[1fr_auto] md:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск по публикациям" className="w-full rounded-2xl border border-white/10 bg-black/25 px-12 py-4 text-white outline-none placeholder:text-white/35 focus:border-sky-300/40" />
            </div>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1 md:pb-0">
              {categories.map((item) => (
                <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${category === item ? 'border-sky-300/40 bg-sky-300/15 text-sky-100' : 'border-white/10 bg-white/5 text-white/55 hover:text-white'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="group rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07]">
                <div className="mb-7 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sm text-sky-200">{post.category}</span>
                  <span className="text-sm text-white/40">{post.date}</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">{post.title}</h2>
                <p className="mt-5 text-sm leading-7 text-white/60">{post.text}</p>
                <Link href={`/journal/${post.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                  Читать публикацию
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-10 text-center text-white/55">
              Публикации не найдены.
            </div>
          )}
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Telegram HEIMDALL</div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Подписывайтесь на канал</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
                Читайте короткие заметки о проверке контрагентов, кандидатов, бенефициаров и корпоративных рисках.
              </p>
            </div>
            <a href="https://t.me/heimdall_risk" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
              Открыть канал
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
