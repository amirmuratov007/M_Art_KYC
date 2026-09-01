import { useEffect, useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'

export default function JournalArticleTools({ title, url }) {
  const [progress, setProgress] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('[data-journal-article]')
      if (!article) return

      const rect = article.getBoundingClientRect()
      const readable = Math.max(article.offsetHeight - window.innerHeight, 1)
      setProgress(Math.min(Math.max((-rect.top / readable) * 100, 0), 100))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (_) {
      setCopied(false)
    }
  }

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (_) {
        return
      }
    }
    await copyLink()
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[9500] h-0.5 bg-white/5" aria-hidden="true">
        <div className="h-full bg-[#D6A84F] transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-white/10 py-4">
        <span className="mr-auto text-sm text-white/48">Сохраните материал или отправьте коллеге</span>
        <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white/78 transition hover:border-sky-300/30 hover:text-white">
          {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Ссылка скопирована' : 'Копировать ссылку'}
        </button>
        <button type="button" onClick={share} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-500 px-4 text-sm font-semibold text-white transition hover:bg-sky-400">
          <Share2 className="h-4 w-4" />
          Поделиться
        </button>
        <span className="sr-only" aria-live="polite">{copied ? 'Ссылка скопирована' : ''}</span>
      </div>
    </>
  )
}
