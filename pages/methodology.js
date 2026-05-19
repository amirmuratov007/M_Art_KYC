import HeimdallPageShell from '@/components/HeimdallPageShell'
import { ArrowRight, Database, GitBranch, Gauge, UserCheck, FileText } from 'lucide-react'

const steps = [["Сбор данных", "Реестры, суды, санкции, adverse media, корпоративные связи."], ["Корреляция", "Сопоставление людей, компаний, адресов, директоров и юрисдикций."], ["Оценка риска", "Risk score по категориям: владение, суды, санкции, репутация, конфликты."], ["Проверка аналитиком", "Human review для исключения ложных совпадений и слабых сигналов."], ["Отчёт", "Краткое заключение, факты, тревожные сигналы и рекомендация."]]
const icons = [Database, GitBranch, Gauge, UserCheck, FileText]

export default function MethodologyPage() {
  return (
    <HeimdallPageShell title="Методология HEIMDALL" description="Методология проверки HEIMDALL: сбор данных, корреляция, оценка риска, аналитический вывод." switchHref="/methodology-en" switchLabel="EN">
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-5xl">
          <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">HEIMDALL Methodology</div>
          <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Методология, которая превращает сигналы в управленческий вывод</h1>
          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">HEIMDALL использует структурный подход: источники, связи, факты, риск-модель, проверка аналитиком и отчёт для принятия решений.</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32">
        <div className="grid gap-5">
          {steps.map(([title, text], index) => {
            const Icon = icons[index]
            return (
              <div key={title} className="grid gap-6 rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:grid-cols-[auto_1fr_auto] md:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200"><Icon className="h-7 w-7" /></div>
                <div><div className="text-sm text-sky-300">0{index + 1}</div><h2 className="mt-2 text-3xl font-semibold">{title}</h2><p className="mt-3 text-white/60">{text}</p></div>
                <ArrowRight className="hidden h-6 w-6 text-sky-300 md:block" />
              </div>
            )
          })}
        </div>
      </section>
    </HeimdallPageShell>
  )
}
