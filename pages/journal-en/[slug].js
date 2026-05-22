import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import telegramPosts from '@/data/telegramPosts'
import { ArrowLeft, Send } from 'lucide-react'

export async function getStaticPaths() {
  return {
    paths: telegramPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const post = telegramPosts.find((item) => item.slug === params.slug)
  return { props: { post } }
}

export default function JournalPostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | HEIMDALL</title>
        <meta name="description" content={post.text} />
        <link rel="canonical" href={`https://www.heimdall-group.ru/journal-en/${post.slug}`} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <Link href="/journal-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">All publications</Link>
          </div>
        </header>

        <article className="relative z-10 mx-auto max-w-4xl px-5 py-20">
          <Link href="/journal-en" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
            <ArrowLeft className="h-4 w-4" />
            Back to publications
          </Link>

          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
            <Send className="h-4 w-4" />
            {post.category}
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] md:text-7xl">
            {post.title}
          </h1>

          <div className="mt-6 text-sm text-white/40">{post.date}</div>

          <div className="mt-10 rounded-[34px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
            {(post.body || [post.text]).map((paragraph) => (
              <p key={paragraph} className="mb-6 text-lg leading-9 text-white/70 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
    </>
  )
}
