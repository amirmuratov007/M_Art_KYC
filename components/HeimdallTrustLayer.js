import { LockKeyhole, ShieldCheck, UserCheck, FileText } from 'lucide-react'
export default function HeimdallTrustLayer({ language = 'ru' }) {
  const ru = language === 'ru'
  const items = ru
    ? [['NDA по запросу','Работа с чувствительной информацией под соглашением о конфиденциальности.'],['Ограниченный доступ','Материалы доступны только вовлечённым аналитикам.'],['Проверка аналитиком','Human review перед передачей результата.'],['Отчёт для решения','Факты, тревожные сигналы и рекомендация.']]
    : [['NDA on request','Sensitive information can be handled under NDA.'],['Restricted access','Materials are limited to involved analysts.'],['Analyst review','Human review before delivery.'],['Decision report','Facts, red flags and recommendation.']]
  const icons = [LockKeyhole, ShieldCheck, UserCheck, FileText]
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 max-w-4xl">
        <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{ru ? 'Архитектура доверия' : 'Trust Architecture'}</div>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{ru ? 'Конфиденциальность встроена в процесс' : 'Confidentiality built into the process'}</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        {items.map(([title, text], i) => {
          const Icon = icons[i]
          return <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl"><Icon className="mb-5 h-6 w-6 text-sky-300" /><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-white/55">{text}</p></div>
        })}
      </div>
    </section>
  )
}
