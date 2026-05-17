import { ArrowRight, BadgeCheck, Building2, Eye, Globe2, ShieldCheck, UsersRound } from "lucide-react";
import LeadForm from "@/components/LeadForm";

const services = [
  ["Counterparty Intelligence", "Проверка контрагентов, бенефициаров, деловой репутации, судебных и финансовых рисков."],
  ["Client KYC & Risk Screening", "Оценка клиентов до сделки: санкции, связи, публичные следы, конфликтные маркеры."],
  ["Employee Background Checks", "Проверка сотрудников и кандидатов перед доступом к деньгам, данным и критичным процессам."],
  ["Recruitment Agency Shield", "Отдельный контур для рекрутинговых агентств: предварительный аудит кандидатов до передачи заказчику."],
];

const metrics = ["20+ risk vectors", "RU / EN reports", "B2B confidential", "OSINT + legal sources"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-radial-cinematic">
      <div className="pointer-events-none fixed inset-0 grid-mask opacity-50" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyanice/30 bg-cyanice/10 font-black text-cyanice shadow-glow">H</div>
          <div>
            <div className="text-sm font-black tracking-[0.32em]">HEIMDALL</div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400">Enterprise Intelligence</div>
          </div>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#recruitment" className="hover:text-white">Recruitment</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <a href="#contact" className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">Request</a>
      </header>

      <section id="top" className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.15fr_.85fr] md:pb-28 md:pt-24">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyanice">Premium B2B due diligence</div>
          <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Intelligence before trust becomes risk.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            HEIMDALL помогает компаниям проверять контрагентов, клиентов, сотрудников и кандидатов до того, как решение превращается в финансовый, репутационный или операционный риск.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Bilingual RU/EN reports, confidential workflow, enterprise-grade intake and actionable risk summary for decision makers.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="btn-primary inline-flex items-center justify-center gap-3 px-7 py-4">Start screening <ArrowRight size={18} /></a>
            <a href="#services" className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 font-bold text-white hover:bg-white/10">View services</a>
          </div>
        </div>
        <div className="glass relative rounded-[36px] p-6 md:p-8">
          <div className="absolute -right-14 -top-14 h-56 w-56 rounded-full bg-cyanice/20 blur-3xl" />
          <div className="relative">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Risk command</p>
                <h2 className="mt-2 text-2xl font-black">HEIMDALL Console</h2>
              </div>
              <ShieldCheck className="text-cyanice" />
            </div>
            <div className="space-y-4">
              {metrics.map((m, i) => <div key={m} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"><span className="text-slate-300">{m}</span><span className="text-cyanice">0{i + 1}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 py-12">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-gold">Capabilities</p>
            <h2 className="text-3xl font-black md:text-5xl">Проверки для решений с высокой ценой ошибки</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, text]) => (
            <article key={title} className="glass rounded-[28px] p-6">
              <Eye className="mb-8 text-cyanice" />
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="recruitment" className="relative z-10 mx-auto max-w-7xl px-5 py-16">
        <div className="glass grid gap-8 rounded-[34px] p-7 md:grid-cols-[.9fr_1.1fr] md:p-10">
          <div>
            <UsersRound className="mb-6 text-gold" />
            <h2 className="text-3xl font-black md:text-5xl">Special block for recruitment agencies</h2>
            <p className="mt-5 text-slate-300 leading-8">Рекрутинговые агентства теряют время и доверие заказчика, когда кандидат не проходит проверку службы безопасности из-за прошлого, конфликтов, долговых, судебных или репутационных маркеров.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Pre-screen candidates before client handoff", "Reduce rejected finalists", "Protect agency reputation", "Add premium verification service"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><BadgeCheck className="mb-4 text-cyanice" /><p className="font-bold">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-5 py-8 md:grid-cols-3">
        <div className="glass rounded-[28px] p-6"><Building2 className="mb-5 text-cyanice" /><h3 className="text-xl font-black">Enterprise</h3><p className="mt-3 text-sm leading-7 text-slate-300">Для компаний, которым нужен понятный риск-профиль перед сделкой или наймом.</p></div>
        <div className="glass rounded-[28px] p-6"><Globe2 className="mb-5 text-cyanice" /><h3 className="text-xl font-black">RU / EN</h3><p className="mt-3 text-sm leading-7 text-slate-300">Двуязычная коммуникация и отчеты для локальных и международных процессов.</p></div>
        <div className="glass rounded-[28px] p-6"><ShieldCheck className="mb-5 text-cyanice" /><h3 className="text-xl font-black">Confidential</h3><p className="mt-3 text-sm leading-7 text-slate-300">Без публичных кабинетов и лишнего шума: заявка → проверка → отчет.</p></div>
      </section>

      <LeadForm />
      <footer className="relative z-10 mx-auto max-w-7xl px-5 pb-10 text-sm text-slate-500">© {new Date().getFullYear()} HEIMDALL Group. Enterprise intelligence & due diligence.</footer>
    </main>
  );
}
