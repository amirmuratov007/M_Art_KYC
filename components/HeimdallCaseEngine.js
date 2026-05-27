
import { ShieldCheck, AlertTriangle, Network, FileSearch } from 'lucide-react'

const cases = [
  {
    title: 'Скрытая аффилированность поставщика',
    risk: 'High',
    text: 'Связь подрядчика с сотрудником закупочного отдела через родственников и связанные компании.'
  },
  {
    title: 'Номинальный директор',
    risk: 'Medium',
    text: 'Участие руководителя в десятках юридических лиц и признаки формального управления.'
  },
  {
    title: 'Репутационный риск партнера',
    risk: 'Medium',
    text: 'Негативные публикации, судебная активность и конфликт интересов.'
  }
]

export default function HeimdallCaseEngine() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
      <div className="max-w-5xl">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
          <FileSearch className="h-4 w-4" />
          Intelligence Cases
        </div>

        <h2 className="mt-8 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
          Примеры risk intelligence
        </h2>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/64">
          Реалистичные сценарии корпоративных рисков,
          которые выявляются в процессе проверки контрагентов,
          кандидатов и партнеров.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {cases.map((item) => (
          <div
            key={item.title}
            className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                <Network className="h-6 w-6" />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#F7D784]">
                <AlertTriangle className="h-3 w-3" />
                {item.risk}
              </div>
            </div>

            <h3 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">
              {item.title}
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/60">
              {item.text}
            </p>

            <div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
              HEIMDALL Analysis
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
