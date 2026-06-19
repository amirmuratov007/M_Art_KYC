import HeimdallPageShell from '@/components/HeimdallPageShell'

export default function RiskIntelligencePublicPage() {
  return (
    <HeimdallPageShell title="Центр риск-аналитики" description="HEIMDALL структурирует данные, связи и признаки риска в единую аналитическую картину." switchHref="/risk-intelligence-en" switchLabel="EN">
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-20">
        <div className="max-w-4xl">
          <div className="text-sm uppercase tracking-[0.28em] text-sky-300/80">HEIMDALL Intelligence Core</div>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Центр риск-аналитики HEIMDALL</h1>
          <p className="mt-7 text-xl leading-9 text-white/66">Мы собираем разрозненные данные, факты, связи и признаки риска в единую аналитическую картину, чтобы бизнес принимал решения до того, как риск станет ущербом.</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#lead" className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white">Оставить заявку</a>
            <a href="/analyst/risk-intelligence" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/80">Внутренний центр</a>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            ['Объекты проверки', 'Кандидаты, сотрудники, контрагенты, подрядчики, домашний персонал и внутренние инциденты.'],
            ['Карта связей', 'Люди, компании, телефоны, почты, домены, адреса, документы и пересечения между объектами.'],
            ['Риск-отчет', 'Факты, признаки, противоречия, зоны неопределенности и рекомендации для решения.']
          ].map(([title, text]) => (
            <div key={title} className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[34px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.04em]">Как работает подход</h2>
          <p className="mt-4 text-base leading-8 text-white/64">Аналитик создает карточку проверки, загружает большой массив данных из разных источников, система выделяет сущности, факты, связи, риски и противоречия. Финальный вывод всегда проверяет человек.</p>
        </div>
      </section>
    </HeimdallPageShell>
  )
}
