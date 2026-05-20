import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { ArrowRight, ShieldCheck, FileSearch } from 'lucide-react'

const cases = [["Скрытый бенефициар", "Цепочка владения через несколько компаний и связь с участником корпоративного конфликта.", "Сделка остановлена до подписания.", "Владение", "Высокий"], ["Кандидат-финалист", "Проверка выявила долговую нагрузку, конфликтные эпизоды и репутационные сигналы.", "Агентство не передало кандидата клиенту.", "Кандидаты", "Повышенный"], ["Санкционный след", "Прямого совпадения не было, но анализ связей показал пересечение с ограниченной группой.", "Клиент запросил дополнительные документы.", "Санкции", "Средний"], ["Проблемный подрядчик", "Судебные споры, исполнительные производства и частая смена юридических лиц.", "Риск выявлен до аванса.", "Контрагенты", "Высокий"], ["Конфликт интересов", "Руководитель поставщика оказался связан с лицом, участвовавшим в выборе подрядчика.", "Процедура закупки пересмотрена.", "Связи", "Повышенный"], ["Иностранная компания", "Обнаружены расхождения в директорах, адресах и структуре владения.", "Назначена расширенная проверка.", "Международная проверка", "Средний"]]

export default function CasesPage() {
  return (
    <>
      <Head><title>Кейсы HEIMDALL — HEIMDALL</title><meta name="description" content="Кейсы показывают типы рисков, которые HEIMDALL помогает выявлять до сделки, найма, партнёрства или платежа." /></Head>
      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
        </div>
        <header className="relative z-10 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <HeimdallLogo />
            <div className="flex gap-3"><Link href="/cases-en" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">EN</Link><Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold">Запросить проверку</Link></div>
          </div>
        </header>
        <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200"><FileSearch className="h-4 w-4" /> Intelligence Case Files</div>
            <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Анонимные истории рисков, которые лучше увидеть до решения</h1>
            <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">Кейсы показывают типы рисков, которые HEIMDALL помогает выявлять до сделки, найма, партнёрства или платежа.</p>
          </div>
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map(([name, text, result, category, risk], i) => (
              <div key={name} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-sky-300/35">
                <div className="mb-7 flex justify-between"><span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sm text-sky-200">{String(i+1).padStart(2,'0')}</span><span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm text-amber-200">{risk}</span></div>
                <h2 className="text-2xl font-semibold">{name}</h2><p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
                <div className="mt-7 rounded-2xl border border-white/10 bg-black/25 p-4"><div className="text-xs uppercase tracking-[0.2em] text-sky-300/70">Результат</div><div className="mt-2 text-sm leading-6 text-white/72">{result}</div></div>
                <div className="mt-5 flex items-center gap-2 text-sm text-white/45"><ShieldCheck className="h-4 w-4 text-sky-300" /><span>{category}</span></div>
              </div>
            ))}
          </div>
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-32"><div className="rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-10 backdrop-blur-2xl md:p-16"><h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">Каждый кейс начинается с вопроса: что мы ещё не знаем?</h2><Link href="/#lead" className="mt-10 inline-flex rounded-2xl bg-sky-500 px-7 py-4 font-semibold">Запросить проверку <ArrowRight className="ml-2 h-4 w-4" /></Link></div></section>
      </main>
    </>
  )
}
