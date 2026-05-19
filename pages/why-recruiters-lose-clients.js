import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import HeimdallAnimatedBackground from '@/components/HeimdallAnimatedBackground'
import HeimdallTrustLayer from '@/components/HeimdallTrustLayer'
export default function Article() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <HeimdallAnimatedBackground />
      <HeimdallNav language="ru" />
      <article className="relative z-10 mx-auto max-w-4xl px-5 py-24">
        <Link href="/journal" className="text-sm text-sky-300">← Журнал</Link>
        <h1 className="mt-8 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">Скрытые бенефициары: почему сделка может измениться за один факт</h1>
        <p className="mt-8 text-xl leading-9 text-white/64">Неочевидный контролирующий интерес меняет профиль риска компании сильнее, чем формальные показатели.</p>
        <div className="mt-12 space-y-7 text-lg leading-9 text-white/70">
          <p>В корпоративной проверке риск редко выглядит как один очевидный сигнал. Чаще это набор слабых признаков: связи, документы, история поведения, судебные эпизоды, репутационный фон и структура владения.</p>
          <p>Задача HEIMDALL — не просто найти данные, а собрать их в управленческий вывод.</p>
          <p>Именно поэтому проверка становится частью risk management, а не формальной процедурой.</p>
        </div>
      </article>
      <HeimdallTrustLayer language="ru" />
      <HeimdallFooter language="ru" />
    </main>
  )
}
