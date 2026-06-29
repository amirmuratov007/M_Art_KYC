import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import HeimdallConversionPanel from '@/components/HeimdallConversionPanel'
import HeimdallRiskTest from '@/components/HeimdallRiskTest'
import HeimdallRiskFloatingPlugin from '@/components/HeimdallRiskFloatingPlugin'
import {
  ArrowRight,
  Building2,
  Car,
  ShieldCheck,
  FileSearch,
  Home,
  LockKeyhole,
  Network,
  Gauge,
  Bell,
  Newspaper,
  CheckCircle2,
  Sparkles,
  ClipboardCheck,
  Radar,
  ScanSearch
} from 'lucide-react'

const core = [
  ['Проверка контрагентов', 'Суды, бенефициары, санкционные риски, связанные лица и репутационные сигналы.', '/proverka-kontragenta', FileSearch],
  ['Проверка кандидатов', 'Конфликт интересов, репутация, финансовая нагрузка и чувствительные роли.', '/proverka-kandidatov', ShieldCheck],
  ['Due Diligence', 'Комплексная проверка бизнеса, партнёров, сделок и международных структур.', '/due-diligence-russia', Network],
  ['Примеры отчётов', 'Показываем, как выглядит аналитический вывод HEIMDALL.', '/sample-reports', Gauge]
]

const decisionMoments = [
  ['Перед сделкой', 'Проверить владельцев, судебный фон, репутацию и признаки номинальности до подписания.'],
  ['Перед оплатой поставщику', 'Увидеть фиктивность, аффилированность, санкционную экспозицию и конфликтные связи.'],
  ['Перед наймом', 'Снизить риск допуска к деньгам, данным, закупкам и управленческим решениям.'],
  ['Перед партнерством', 'Понять, кто реально стоит за компанией и какие риски придут вместе с партнером.']
]

const purchaseChecks = [
  ['Проверка собственника квартиры', 'Продавец, долги, суды, посредники, доверенности, давление и риск оспаривания сделки.', '/proverka-sobstvennika-kvartiry', Building2],
  ['Проверка собственника дачи или дома', 'Земля, дом, продавец, наследники, представители, споры, долги и нестандартные условия расчета.', '/proverka-sobstvennika-dachi', Home],
  ['Проверка собственника автомобиля', 'Продавец авто, долги, суды, перекупы, доверенности, спорное владение и признаки проблемной сделки.', '/proverka-sobstvennika-avtomobilya', Car]
]

const trustProof = [
  ['Методология', 'Не просто справки из баз, а аналитический вывод с логикой риска.', '/methodology'],
  ['Источники данных', 'Открытые реестры, суды, медиа, корпоративные связи и комплаенс-сигналы.', '/data-sources'],
  ['Конфиденциальность', 'Задачи, документы и результаты проверки не раскрываются третьим лицам.', '/privacy']
]

const operatingSystem = [
  ['Сделки и авансы', 'Проверяем компанию, владельцев, платежный маршрут, суды, санкционные связи и признаки номинальности до оплаты.', FileSearch],
  ['Люди с доступом', 'Смотрим кандидатов, партнеров, подрядчиков и домашних сотрудников перед доступом к деньгам, детям, объектам и данным.', ShieldCheck],
  ['Цифровой периметр', 'Ищем утечки, поддельные домены, открытые следы, риск подрядчиков и точки, через которые бизнес можно атаковать.', Radar],
  ['Единый риск-реестр', 'Собираем выводы в понятную очередь решений: что остановить, что усилить, что мониторить и кому ограничить доступ.', ClipboardCheck]
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
        <title>HEIMDALL | Корпоративная разведка и проверка рисков</title>
        <meta name="description" content="HEIMDALL помогает компаниям проверять контрагентов, кандидатов, бенефициаров и бизнес-риски до сделки, найма или партнерства." />
        <link rel="canonical" href="https://www.heimdall-group.ru/" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784] sm:px-5 sm:text-sm">
              <LockKeyhole className="h-4 w-4 shrink-0" />
              <span className="truncate">Risk Control &amp; Business Intelligence</span>
            </div>

            <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">
              Корпоративная разведка и проверка рисков до сделки, найма и партнерства
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/64 sm:text-xl sm:leading-9">
              HEIMDALL помогает быстро понять, с кем вы имеете дело: кто стоит за компанией, где скрыты связи, судебные и санкционные риски, конфликт интересов и репутационные красные флаги.
            </p>

            <div className="mt-9 grid gap-4 sm:flex sm:flex-row">
              <button onClick={() => openContact('Проверка контрагента')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                Проверить контрагента <ArrowRight className="h-4 w-4" />
              </button>

              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-6 py-4 font-semibold text-[#F7D784]">
                Получить пример отчета
              </Link>

              <Link href="/trust-center" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-semibold text-white">
                Почему нам доверяют
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/62">
              {['Сделка', 'Закупка', 'Найм', 'Партнерство', 'Инвестиции'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2">{item}</span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['1000+ источников', 'Реестры, суды, adverse media и корпоративные связи.'],
                ['24-72 часа', 'Первичный вывод по стандартным проверкам и ускоренный старт.'],
                ['Конфиденциально', 'Задачи и результаты проверки остаются внутри клиентского контура.']
              ].map(([title, text]) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl">
                  <div className="text-sm font-semibold text-[#F7D784]">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-white/58">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl shadow-2xl sm:rounded-[42px] sm:p-6">
            <div className="rounded-[28px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-5 sm:rounded-[34px] sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
                  <ShieldCheck className="h-4 w-4" /> Brand Signal
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-sky-200">
                  <Gauge className="h-4 w-4" /> HEIMDALL Snapshot
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,79,0.12),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-5 sm:p-7">
                <img src="/heimdall-logo-full.png" alt="HEIMDALL" className="mx-auto w-full max-w-[520px]" />
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  'Контрагенты, бенефициары и связанные лица',
                  'Executive screening, конфликт интересов и чувствительные роли',
                  'Санкции, суды, репутационные сигналы и корпоративные связи'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F7D784]" />
                    <span className="text-sm leading-6 text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ['Риск контрагента', '82/100'],
                  ['Рекомендация', 'Расширенная проверка'],
                  ['Trust Center', 'Методология и privacy'],
                  ['Формат доступа', 'Telegram + кабинет']
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
                    <div className="mt-2 text-sm font-semibold text-[#F7D784] sm:text-base">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-5 lg:grid-cols-4">
            {decisionMoments.map(([title, text]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Когда нужен HEIMDALL</div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-sky-200"><Sparkles className="h-4 w-4" /> Быстрый старт</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Опишите объект проверки - мы подскажем формат</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">Компания, человек, поставщик, инвестор или партнер. Достаточно названия, ИНН, сайта, профиля или короткого описания ситуации.</p>
            </div>
            <button onClick={() => openContact('Подбор формата проверки')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.25)]">Подобрать проверку <ArrowRight className="h-4 w-4" /></button>
          </div>
        </section>


        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="mb-8 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Покупка недвижимости и авто</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Проверка продавца до аванса и сделки
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/62">
              Отдельный контур HEIMDALL для личных покупок: квартира, дача, дом или автомобиль. Смотрим не только объект, но и человека, который продает.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {purchaseChecks.map(([title, text, href, Icon]) => (
              <Link key={href} href={href} className="group rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35 hover:bg-white/[0.07] sm:p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">
                  Подробнее <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <HeimdallRiskTest language="ru" compact />

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-8 rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
                <ScanSearch className="h-4 w-4" /> Новый контур
              </div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Risk Control Center: единая точка контроля сделок, людей и цифровых рисков
              </h2>
              <p className="mt-5 text-base leading-8 text-white/64 sm:text-lg">
                Для собственника важен не список справок, а спокойная картина: где можно платить, кого можно допускать, какие связи опасны и что делать прямо сейчас. Мы собрали это в отдельный операционный формат.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/risk-command-center" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">
                  Открыть центр рисков <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/security-audit" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-sky-300/20 bg-sky-300/10 px-6 py-4 font-semibold text-sky-100">
                  Аудит безопасности
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {operatingSystem.map(([title, text, Icon]) => (
                <div key={title} className="rounded-[28px] border border-white/10 bg-black/20 p-5">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {trustProof.map(([title, text, href]) => (
              <Link key={href} href={href} className="rounded-[30px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-7 backdrop-blur-2xl transition hover:border-[#D6A84F]/40">
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/60">{text}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">Открыть <ArrowRight className="h-4 w-4" /></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]"><Bell className="h-4 w-4" /> Новый сервис</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Business Support</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">Постоянное сопровождение по корпоративной разведке, due diligence и проверке рисков для компаний, работающих в чувствительных юрисдикциях. От 200 000 рублей в месяц.</p>
            </div>
            <Link href="/business-support" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">Смотреть сопровождение <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24">
          <div className="grid gap-6 rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-6 backdrop-blur-2xl sm:rounded-[42px] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/25 bg-black/20 px-4 py-2 text-sm uppercase tracking-[0.22em] text-sky-200"><Newspaper className="h-4 w-4" /> Journal</div>
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Аналитические публикации HEIMDALL</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">Кейсы, red flags, корпоративные риски, скрытые бенефициары и проверки чувствительных позиций.</p>
            </div>
            <Link href="/journal" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">Открыть Journal <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
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

        <HeimdallConversionPanel language="ru" />

        <HeimdallRiskFloatingPlugin language="ru" />
        <HeimdallFooter language="ru" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic={topic} />
    </>
  )
}
