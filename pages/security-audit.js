import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, AlertTriangle, CheckCircle2, ClipboardCheck, Eye, Fingerprint, KeyRound, LockKeyhole, Radar, ShieldCheck, UserCog } from 'lucide-react'

const auditZones = [
  ['Доступы и роли', 'Кто имеет доступ к деньгам, CRM, сайту, рекламе, почте, документам, клиентским базам и внутренним чатам.', KeyRound],
  ['Подрядчики', 'Маркетологи, бухгалтеры, IT, интеграторы, фрилансеры и внешние исполнители, которые могут повлиять на данные или деньги.', UserCog],
  ['Цифровой след', 'Домены, сайты, публичные контакты, поддельные страницы, похожие названия, утечки и репутационные следы.', Fingerprint],
  ['Коммерческая тайна', 'Что может уйти наружу: цены, закупки, база клиентов, финансовые условия, внутренние документы и переписка.', LockKeyhole],
  ['Фишинг и подмена', 'Риски писем от имени руководства, подмены реквизитов, похожих доменов, ложных аккаунтов и давления через мессенджеры.', Eye],
  ['Реакция на инцидент', 'Что делать, если уже есть подозрение: утечка, странная активность сотрудника, конфликт интересов или попытка мошенничества.', AlertTriangle]
]

const checkpoints = [
  'Разделить доступы владельца, администратора, подрядчика и рядового сотрудника',
  'Проверить, кто управляет доменами, сайтом, почтой, CRM и рекламными кабинетами',
  'Закрыть лишние публичные контакты, документы, старые страницы и забытые сервисы',
  'Проверить подрядчиков, которые имеют доступ к деньгам, данным или клиентским каналам',
  'Настроить правило подтверждения платежей, реквизитов и срочных переводов',
  'Зафиксировать порядок увольнения и отключения доступов',
  'Сделать карту активов и назначить ответственных за каждый критичный сервис',
  'Проверить признаки утечек, похожих доменов, фишинга и имитации бренда'
]

const result = [
  ['Карта риска', 'Показываем, где слабые места: доступы, подрядчики, цифровой след, данные, платежи, люди.'],
  ['Приоритеты', 'Разделяем находки на критичные, важные и наблюдаемые, чтобы не тратить силы на второстепенное.'],
  ['План закрытия', 'Что отключить, кому ограничить доступ, что проверить, какие правила ввести и что мониторить.'],
  ['Регламент', 'Короткий порядок для собственника и команды: платежи, реквизиты, подрядчики, доступы, документы и инциденты.']
]

export default function SecurityAuditPage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Аудит безопасности бизнеса | HEIMDALL</title>
        <meta name="description" content="Аудит безопасности бизнеса HEIMDALL: доступы, подрядчики, цифровой след, утечки, фишинг, коммерческая тайна, платежные риски и управленческий план закрытия уязвимостей." />
        <link rel="canonical" href="https://www.heimdall-group.ru/security-audit" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" /> Security Audit
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Аудит безопасности бизнеса без технического тумана
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Проверяем не только сайт или компьютеры. Смотрим весь управленческий контур: люди, доступы, подрядчики, платежи, данные, публичный цифровой след и сценарии мошенничества.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Заказать аудит <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/security-checklist" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                50 пунктов безопасности
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">Быстрый результат</div>
              <div className="mt-8 grid gap-3">
                {checkpoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-6 text-white/72">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-sky-300/80">Зоны аудита</div>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Где бизнес чаще всего теряет контроль</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {auditZones.map(([title, text, Icon]) => (
              <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-8 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-sky-200">
                <ClipboardCheck className="h-4 w-4" /> На выходе
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Не список страшилок, а план действий</h2>
              <p className="mt-5 text-base leading-8 text-white/64">Аудит нужен не для отчета в папке. Его задача - быстро снизить шанс потери денег, данных, контроля над каналами и доверия клиентов.</p>
            </div>
            <div className="grid gap-4">
              {result.map(([title, text]) => (
                <div key={title} className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <h3 className="text-xl font-semibold tracking-[-0.03em] text-sky-100">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-28">
          <div className="grid gap-6 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
                <Radar className="h-4 w-4" /> Следующий шаг
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Начнем с карты доступов и подрядчиков</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">Этого достаточно, чтобы увидеть первые критичные риски и быстро закрыть самые опасные точки.</p>
            </div>
            <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Оставить заявку <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic="Аудит безопасности бизнеса" />
    </>
  )
}
