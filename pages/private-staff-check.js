import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, ShieldCheck, UserSearch, Home, Baby, Car, KeyRound, FileText, CheckCircle2, AlertTriangle, Scale, LockKeyhole } from 'lucide-react'

const staffTypes = [
  ['Няня или гувернантка', 'доступ к детям, дому, распорядку семьи и личной информации', Baby],
  ['Сиделка или помощник для пожилого родственника', 'доступ к уязвимому человеку, лекарствам, документам и быту', Home],
  ['Личный водитель', 'доступ к маршрутам, детям, автомобилю, графику и конфиденциальным разговорам', Car],
  ['Домработница, садовник, сторож, помощник', 'доступ к дому, ключам, имуществу, бытовой технике и личному пространству', KeyRound]
]

const checks = [
  ['Проверка предоставленных данных', 'сверяем анкету, документы, биографические сведения, заявленный опыт и очевидные несостыковки'],
  ['Открытые судебные и исполнительные признаки', 'смотрим публично доступные сигналы споров, долговых и имущественных конфликтов'],
  ['Публичный цифровой след', 'оцениваем открытые материалы, репутационные признаки, публичные профили и несоответствия'],
  ['Рекомендации и прошлый опыт', 'помогаем правильно проверить рекомендации, если кандидат их предоставил и согласовал'],
  ['Риск допуска к дому и семье', 'оцениваем, какие доступы человек получит и какие ограничения лучше предусмотреть'],
  ['Вопросы для собеседования', 'готовим список уточнений, которые стоит задать до допуска к дому, детям или пожилым родственникам']
]

const pricing = [
  {
    title: 'Базовая проверка',
    price: 'от 25 000 ₽',
    term: '1-3 рабочих дня',
    best: 'для первичного скрининга няни, помощника, садовника или домработницы',
    items: ['проверка предоставленных данных', 'открытые судебные и исполнительные признаки', 'публичный цифровой след', 'короткий вывод по красным флагам']
  },
  {
    title: 'Расширенная проверка',
    price: 'от 45 000 ₽',
    term: '2-5 рабочих дней',
    best: 'для няни, сиделки, водителя или человека с регулярным доступом к дому',
    items: ['все из базовой проверки', 'анализ биографии и несостыковок', 'проверка рекомендаций при наличии согласия', 'риск-профиль и вопросы для финального интервью']
  },
  {
    title: 'Доверенный персонал',
    price: 'от 75 000 ₽',
    term: '3-7 рабочих дней',
    best: 'для персонала с доступом к детям, пожилым родственникам, ключам, автомобилям, документам или деньгам',
    items: ['глубокий риск-профиль', 'карта доступов и ограничений', 'рекомендации по договору и испытательному периоду', 'закрытая консультация для семьи']
  }
]

const boundaries = [
  'Работа проводится только в правовом поле, без серых баз, незаконного доступа и скрытого сбора закрытых сведений.',
  'Мы не проверяем медицинские диагнозы, зависимости, частную жизнь, политические взгляды и иные чувствительные сведения без специальных законных оснований.',
  'Для проверки персональных данных требуется согласие кандидата или иной законный порядок обработки данных.',
  'HEIMDALL не дает абсолютных гарантий безопасности человека. Мы показываем красные флаги, несостыковки и управленческие риски до допуска к дому.'
]

function PriceCard({ plan }) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
      <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]/80">{plan.term}</div>
      <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{plan.title}</h3>
      <div className="mt-4 text-3xl font-semibold text-sky-100">{plan.price}</div>
      <p className="mt-4 text-sm leading-7 text-white/58">{plan.best}</p>
      <div className="mt-6 grid gap-3">
        {plan.items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/68">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PrivateStaffCheckPage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Проверка домашнего персонала | HEIMDALL</title>
        <meta name="description" content="Проверка няни, сиделки, водителя, домработницы, садовника, сторожа и другого домашнего персонала перед допуском к дому, детям, пожилым родственникам, имуществу и личной информации." />
        <link rel="canonical" href="https://www.heimdall-group.ru/private-staff-check" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <Home className="h-4 w-4" /> Семейная безопасность
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Проверка домашнего персонала перед допуском к семье и дому
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Няни, сиделки, водители, помощники, домработницы, садовники, сторожа и другой персонал получают доступ к дому, детям, пожилым родственникам, ключам, документам и личной информации. HEIMDALL помогает увидеть риски до найма.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Запросить проверку <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/risk-test?test=private_staff" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-7 py-4 font-semibold text-white/86 hover:border-[#D6A84F]/35">
                Пройти риск-тест
              </Link>
            </div>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="flex items-start gap-4 rounded-[28px] border border-red-300/20 bg-red-300/[0.08] p-5">
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-red-100" />
              <div>
                <div className="text-2xl font-semibold tracking-[-0.04em]">Главный риск - доверие без проверки</div>
                <p className="mt-3 text-sm leading-7 text-white/64">Частный найм часто строится на рекомендации, анкете и одном собеседовании. Этого мало, если человек получает доступ к ребенку, пожилому родственнику, ключам или имуществу.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {['допуск к дому и ключам', 'доступ к детям или пожилым родственникам', 'контакт с документами, автомобилем и имуществом', 'знание распорядка семьи и личной информации'].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {staffTypes.map(([title, text, Icon]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <Icon className="h-8 w-8 text-[#F7D784]" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12">
          <div className="rounded-[38px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl sm:p-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-sky-100">
                <UserSearch className="h-4 w-4" /> Что проверяем
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Смотрим не “личную жизнь”, а риски допуска</h2>
              <p className="mt-5 text-base leading-8 text-white/64">Цель проверки - помочь семье принять взвешенное решение: можно ли допускать человека к дому, детям, пожилым родственникам и личной информации, какие ограничения нужны и какие вопросы стоит задать до найма.</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {checks.map(([title, text]) => (
                <div key={title} className="rounded-[26px] border border-white/10 bg-[#050816]/70 p-5">
                  <CheckCircle2 className="h-5 w-5 text-[#F7D784]" />
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12" id="pricing">
          <div className="mb-8 max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
              <FileText className="h-4 w-4" /> Прайс
            </div>
            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Форматы проверки</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {pricing.map((plan) => <PriceCard key={plan.title} plan={plan} />)}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12">
          <div className="rounded-[34px] border border-emerald-300/15 bg-emerald-300/[0.07] p-6 backdrop-blur-2xl sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-emerald-100">
                  <Scale className="h-4 w-4" /> Правовые границы
                </div>
                <h2 className="mt-6 text-4xl font-semibold tracking-[-0.055em]">Честно и законно</h2>
                <p className="mt-4 text-base leading-8 text-white/64">Эта услуга специально сформулирована как законная оценка рисков перед частным наймом, а не как “пробив человека”.</p>
              </div>
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
                Обсудить проверку <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {boundaries.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/18 px-4 py-4 text-sm leading-7 text-white/68">
                  <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-emerald-100" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 py-12 pb-20">
          <div className="rounded-[34px] border border-white/10 bg-[#050816]/78 p-6 text-center backdrop-blur-2xl sm:p-10">
            <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Нужно проверить человека перед допуском к дому?</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/64">Опишите, кого планируете нанять и какие доступы будут у человека. Мы предложим безопасный формат проверки и список документов/согласий.</p>
            <button onClick={() => setContactOpen(true)} className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">
              Оставить заявку <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language="ru" />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic="Проверка домашнего персонала" />
      </main>
    </>
  )
}
