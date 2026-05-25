import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, ShieldCheck, FileSearch, LockKeyhole, Network, Gauge, Bell, Newspaper, Smartphone, Send } from 'lucide-react'

const core = [
  ['Проверка контрагентов', 'Суды, бенефициары, санкционные риски, связанные лица и репутационные сигналы.', '/proverka-kontragenta', FileSearch],
  ['Проверка кандидатов', 'Конфликт интересов, репутация, финансовая нагрузка и чувствительные роли.', '/proverka-kandidatov', ShieldCheck],
  ['Due Diligence', 'Комплексная проверка бизнеса, партнёров, сделок и международных структур.', '/due-diligence-russia', Network],
  ['Примеры отчётов', 'Показываем, как выглядит аналитический вывод HEIMDALL.', '/sample-reports', Gauge]
]

export default function HomePage() {
  const [contactOpen, setContactOpen] = useState(false)
  const [topic, setTopic] = useState('Общий запрос')

  const openContact = (nextTopic = 'Общий запрос') => {
    setTopic(nextTopic)
    setContactOpen(true)
  }

  return (
    <>
      <Head>
        <title>HEIMDALL | корпоративная разведка и проверка рисков</title>
        <meta name="description" content="HEIMDALL помогает проверять контрагентов, кандидатов, бенефициаров и бизнес-риски до принятия решений." />
        <link rel="canonical" href="https://www.heimdall-group.ru/" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784] sm:px-5 sm:text-sm">
              <LockKeyhole className="h-4 w-4 shrink-0" />
              <span className="truncate">Corporate Intelligence</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">Проверки для принятия правильных решений</h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/64 sm:text-xl sm:leading-9">HEIMDALL помогает выявлять риски в контрагентах, кандидатах, бенефициарах и бизнес-структурах до сделки, найма или партнёрства.</p>

            <div className="mt-9 grid gap-4 sm:flex sm:flex-row sm:flex-wrap">
              <button onClick={() => openContact('Общий запрос')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">Связаться <ArrowRight className="h-4 w-4" /></button>
              <Link href="/business-support" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-6 py-4 font-semibold text-[#F7D784]">Комплексное сопровождение</Link>
              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white">Посмотреть отчёты</Link>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl shadow-2xl sm:rounded-[42px] sm:p-6">
            <div className="rounded-[26px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-5 sm:rounded-[34px] sm:p-7">
              <div className="text-xs uppercase tracking-[0.2em] text-[#F7D784]/80 sm:text-sm">Risk Intelligence Snapshot</div>
              <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                {[
                  ['Counterparty risk', '82/100'],
                  ['Hidden ownership', 'High'],
                  ['Sanctions exposure', 'Medium'],
                  ['Recommendation', 'Enhanced review']
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-4 sm:px-5">
                    <span className="min-w-0 text-sm text-white/55">{label}</span>
                    <span className="shrink-0 text-sm font-semibold text-[#F7D784] sm:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {core.map(([title, text, href, Icon]) => (
              <Link key={title} href={href} className="group rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 sm:rounded-[34px] sm:p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]"><Icon className="h-6 w-6" /></div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]"><Bell className="h-4 w-4" /> Новое направление</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Комплексное сопровождение бизнеса</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">Регулярные проверки контрагентов, кандидатов, поставщиков, бенефициаров, сделок и репутационных сигналов. Стоимость - от 200 000 ₽ в месяц.</p>
            </div>
            <div className="grid gap-3 sm:flex">
              <Link href="/business-support" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">Смотреть сопровождение <ArrowRight className="h-4 w-4" /></Link>
              <button onClick={() => openContact('Комплексное сопровождение')} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-black/20 px-6 py-4 font-semibold text-[#F7D784]">Оставить заявку</button>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-sky-200"><Newspaper className="h-4 w-4" /> Telegram-публикации</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Посты из канала HEIMDALL</h2>
              <p className="mt-5 text-base leading-8 text-white/64 sm:text-lg">Все аналитические публикации лежат в журнале сайта и открываются отдельными страницами.</p>
              <div className="mt-8 grid gap-3 sm:flex">
                <Link href="/journal" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">Открыть публикации <ArrowRight className="h-4 w-4" /></Link>
                <a href="https://t.me/heimdall_risk" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-sky-300/20 bg-black/20 px-6 py-4 font-semibold text-sky-100">Telegram-канал <Send className="h-4 w-4" /></a>
              </div>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.22em] text-white/70"><Smartphone className="h-4 w-4" /> Client App</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Клиентское приложение</h2>
              <p className="mt-5 text-base leading-8 text-white/64 sm:text-lg">Закрытый интерфейс для клиентов сопровождения: заявки, статусы проверок, отчёты и история задач.</p>
              <div className="mt-8 grid gap-3 sm:flex">
                <Link href="/client-app" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white">Смотреть приложение <ArrowRight className="h-4 w-4" /></Link>
                <button onClick={() => openContact('Клиентское приложение')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">Получить доступ</button>
              </div>
            </div>
          </div>
        </section>

        <section id="lead" className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5 sm:pb-32">
          <div className="rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-8 backdrop-blur-2xl md:p-14">
            <div className="max-w-4xl">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Заявка</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Опишите задачу - мы подберём формат проверки</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">Форма отправляет заявку в рабочий канал HEIMDALL. Можно указать Telegram, телефон или email.</p>
              <button onClick={() => openContact('Общий запрос')} className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">Заполнить заявку <ArrowRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic={topic} />
    </>
  )
}
