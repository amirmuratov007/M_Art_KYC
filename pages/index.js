
export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-30"></div>
      <div className="scan-line"></div>

      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="text-2xl tracking-[0.3em] font-semibold">
              HEIMDALL
            </div>
            <div className="text-sm text-blue-200/70 mt-1">
              Корпоративная разведка и проверка рисков
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-white/70">
            <a href="#services">Услуги</a>
            <a href="#recruitment">Кадровым агентствам</a>
            <a href="#reports">Аналитические отчёты</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border border-blue-400/20 bg-blue-400/10 rounded-full px-4 py-2 text-sm text-blue-200 mb-8">
            Конфиденциальная аналитика • Due Diligence • AML/KYC
          </div>

          <h1 className="text-6xl md:text-8xl leading-none font-semibold tracking-tight">
            Выявляем риски
            <br />
            <span className="text-blue-400">
              до того, как они становятся проблемой
            </span>
          </h1>

          <p className="mt-8 text-xl text-white/70 leading-relaxed max-w-3xl">
            HEIMDALL проводит комплексные проверки бизнеса,
            проверку кандидатов, корпоративную разведку и
            анализ рисков для банков, инвесторов и кадровых агентств.
          </p>

          <div className="flex flex-wrap gap-4 mt-12">
            <button className="bg-blue-500 hover:bg-blue-400 transition-all rounded-2xl px-8 py-4 text-lg font-medium shadow-[0_0_40px_rgba(59,130,246,0.35)]">
              Запросить проверку
            </button>

            <button className="border border-white/10 hover:border-blue-400/40 bg-white/5 backdrop-blur-xl rounded-2xl px-8 py-4 text-lg">
              Получить консультацию
            </button>
          </div>
        </div>
      </section>

      <section className="ticker border-y border-white/10 py-4 text-white/60 text-sm">
        <div className="ticker-track">
          Проверка контрагентов • Проверка кандидатов • AML/KYC • Корпоративная разведка • Проверка иностранных компаний • Комплексная проверка бизнеса •
        </div>
      </section>

      <section id="services" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Проверка контрагентов",
            "Проверка кандидатов",
            "Корпоративная разведка",
            "Комплексная проверка бизнеса",
            "AML/KYC проверки",
            "Проверка иностранных компаний",
            "Проверка топ-менеджеров",
            "Репутационные риски"
          ].map((item) => (
            <div
              key={item}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]"
            >
              <div className="text-xl font-medium leading-snug">
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="recruitment" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-[40px] border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-2xl p-12">
          <div className="text-blue-300 text-sm tracking-[0.2em] uppercase mb-6">
            Для кадровых агентств
          </div>

          <h2 className="text-5xl leading-tight font-semibold max-w-4xl">
            Ваш кандидат прошёл интервью.
            <br />
            Но пройдёт ли он внутреннюю проверку?
          </h2>

          <p className="mt-8 text-xl text-white/70 max-w-3xl leading-relaxed">
            HEIMDALL помогает кадровым агентствам выявлять
            потенциальные риски кандидатов до передачи
            финалиста клиенту.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-10">
            {[
              "Снижение риска отказа после оффера",
              "Проверка биографии кандидата",
              "Проверка иностранного опыта работы",
              "Проверка репутационных рисков"
            ].map((item) => (
              <div key={item} className="border border-white/10 rounded-2xl p-5 bg-black/20">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contacts" className="border-t border-white/10 py-12 px-6 text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="text-2xl tracking-[0.3em] text-white font-semibold">
              HEIMDALL
            </div>
            <div className="mt-3">
              Корпоративная разведка и проверка рисков
            </div>
          </div>

          <div className="space-y-2">
            <div>NDA по запросу</div>
            <div>Конфиденциальная аналитика</div>
            <div>Защищённая коммуникация</div>
            <div>Международные источники данных</div>
          </div>
        </div>
      </footer>
    </main>
  )
}
