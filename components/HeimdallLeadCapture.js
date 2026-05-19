import Link from 'next/link'
import { ArrowRight, FileDown } from 'lucide-react'
export default function HeimdallLeadCapture({ language = 'ru' }) {
  const ru = language === 'ru'
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{ru ? 'Следующий шаг' : 'Next step'}</div><h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">{ru ? 'Получите предварительную оценку формата проверки' : 'Request an initial review scope assessment'}</h2></div>
        <div className="flex flex-col gap-3"><Link href="/#lead" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold">{ru ? 'Оставить заявку' : 'Submit request'} <ArrowRight className="h-4 w-4" /></Link><a href={ru ? '/heimdall-presentation-ru.pdf' : '/heimdall-presentation-en.pdf'} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold"><FileDown className="h-4 w-4" />{ru ? 'Скачать презентацию' : 'Download deck'}</a></div>
      </div>
    </section>
  )
}
