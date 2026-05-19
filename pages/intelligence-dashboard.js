import HeimdallPageShell from '@/components/HeimdallPageShell'
import { Activity, AlertTriangle, Network, ShieldCheck } from 'lucide-react'

const nodes = ["Компания", "Бенефициар", "Директор", "Оффшор", "Поставщик"]
const metrics = [["72", "общий риск"], ["14", "связей"], ["3", "тревожных сигнала"], ["5", "юрисдикций"]]
const alerts = ["Связь с проблемным поставщиком", "Непрозрачная структура владения", "Негативный репутационный сигнал"]

export default function IntelligenceDashboard() {
  return (
    <HeimdallPageShell title="Интерактивная аналитическая панель" description="Демонстрационная панель HEIMDALL с картой связей, санкционным монитором и risk signals." switchHref="/intelligence-dashboard-en" switchLabel="EN">
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-sky-200">
            <Activity className="h-4 w-4" /> HEIMDALL Platform
          </div>
          <h1 className="mt-10 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Панель, которая показывает риск как систему связей</h1>
          <p className="mt-10 max-w-3xl text-xl leading-9 text-white/64">Демонстрационный интерфейс показывает, как HEIMDALL соединяет данные о компаниях, людях, юрисдикциях, судебных сигналах и репутационных факторах.</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-5 md:grid-cols-4">
          {metrics.map(([value, label]) => (
            <div key={label} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
              <div className="text-5xl font-semibold tracking-[-0.06em] text-sky-100">{value}</div>
              <div className="mt-3 text-sm text-white/50">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-24 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[560px] overflow-hidden rounded-[42px] border border-sky-300/20 bg-white/[0.045] p-8 backdrop-blur-2xl">
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]" />
          {nodes.map((node, index) => (
            <div
              key={node}
              className="absolute flex h-28 w-28 items-center justify-center rounded-full border border-sky-300/30 bg-[#07101f]/90 p-4 text-center text-sm font-semibold shadow-[0_0_45px_rgba(56,189,248,0.16)]"
              style={{ left: `${12 + (index % 3) * 32}%`, top: `${18 + Math.floor(index / 3) * 38 + (index % 2) * 8}%` }}
            >
              {node}
            </div>
          ))}
          <svg className="absolute inset-0 h-full w-full opacity-50">
            <line x1="20%" y1="30%" x2="52%" y2="38%" stroke="#38BDF8" strokeWidth="2" />
            <line x1="52%" y1="38%" x2="84%" y2="30%" stroke="#38BDF8" strokeWidth="2" />
            <line x1="20%" y1="30%" x2="20%" y2="68%" stroke="#38BDF8" strokeWidth="2" />
            <line x1="52%" y1="38%" x2="52%" y2="76%" stroke="#38BDF8" strokeWidth="2" />
            <line x1="84%" y1="30%" x2="52%" y2="76%" stroke="#FBBF24" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[34px] border border-amber-300/20 bg-amber-300/10 p-7 backdrop-blur-2xl">
            <div className="flex items-center gap-3 text-amber-200"><AlertTriangle className="h-5 w-5" /> Сигналы риска</div>
            <div className="mt-6 space-y-4">
              {alerts.map((a) => <div key={a} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-white/70">{a}</div>)}
            </div>
          </div>
          <div className="rounded-[34px] border border-sky-300/20 bg-sky-300/10 p-7 backdrop-blur-2xl">
            <ShieldCheck className="mb-5 h-6 w-6 text-sky-300" />
            <h2 className="text-2xl font-semibold">Рекомендация аналитика</h2>
            <p className="mt-4 text-sm leading-7 text-white/64">Запросить подтверждение бенефициаров и провести расширенную проверку связанных сторон.</p>
          </div>
        </div>
      </section>
    </HeimdallPageShell>
  )
}
