import { useState } from 'react'
import { ShieldCheck, Search, Building2, Users, FileText, LockKeyhole, Globe2, BriefcaseBusiness, ArrowRight, Eye, RadioTower, Fingerprint, CheckCircle2 } from 'lucide-react'
import IntelligenceCursor from '@/components/IntelligenceCursor'

const services = [
  {
    icon: Building2,
    title: 'Проверка контрагентов',
    text: 'Анализ юридических лиц, связей, деловой репутации, судебных рисков и признаков недобросовестности.'
  },
  {
    icon: Users,
    title: 'Проверка кандидатов',
    text: 'Предварительная проверка благонадёжности, биографии, репутации и потенциальных рисков кандидата.'
  },
  {
    icon: ShieldCheck,
    title: 'AML/KYC проверки',
    text: 'Проверка санкционных, финансовых, комплаенс и регуляторных рисков перед началом сотрудничества.'
  },
  {
    icon: Search,
    title: 'Корпоративная разведка',
    text: 'Сбор и анализ открытых, международных и специализированных источников для принятия решений.'
  },
  {
    icon: Globe2,
    title: 'Иностранные компании',
    text: 'Проверка зарубежных юридических лиц, владельцев, структуры владения и репутационных факторов.'
  },
  {
    icon: BriefcaseBusiness,
    title: 'Комплексная проверка бизнеса',
    text: 'Глубокий анализ компании, собственников, финансового контура, судебной истории и скрытых связей.'
  },
  {
    icon: Fingerprint,
    title: 'Проверка топ-менеджеров',
    text: 'Аналитика биографии, конфликтов интересов, публичной репутации и управленческих рисков.'
  },
  {
    icon: FileText,
    title: 'Аналитический отчёт',
    text: 'Конфиденциальный документ с выводами, индексом риска, выявленными фактами и рекомендациями.'
  }
]

const trust = [
  'Конфиденциальность как базовый стандарт',
  'Ограниченный доступ к информации',
  'Методология проверки корпоративного уровня',
  'Международные источники данных',
  'Аналитики с опытом проверки рисков',
  'Индивидуальная оценка под задачу клиента'
]

const hiringPain = [
  'потеря времени рекрутера',
  'повторный поиск кандидата',
  'срыв выхода финалиста',
  'ухудшение отношений с клиентом',
  'репутационные риски агентства',
  'отказ после оффера'
]

const checkTypes = [
  'Проверка контрагента',
  'Проверка кандидата',
  'Проверка топ-менеджера',
  'AML/KYC проверка',
  'Комплексная проверка бизнеса',
  'Проверка иностранной компании',
  'Корпоративная разведка',
  'Другое'
]

export default function Home() {
  const [language, setLanguage] = useState('ru')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    check_type: 'Проверка контрагента',
    comment: ''
  })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const isRu = language === 'ru'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          locale: language
        })
      })

      const data = await response.json()

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Ошибка отправки')
      }

      setStatus('success')
      setMessage(isRu ? 'Заявка отправлена. Мы свяжемся с вами.' : 'Request sent. We will contact you.')
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        check_type: 'Проверка контрагента',
        comment: ''
      })
    } catch (error) {
      setStatus('error')
      setMessage(isRu ? 'Не удалось отправить заявку. Попробуйте позже.' : 'Could not send request. Please try again later.')
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <IntelligenceCursor />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.28),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_50%,#050816_100%)]" />
        <div className="absolute inset-0 hero-grid opacity-70" />
        <div className="scan-line" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050816]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="group">
            <div className="text-xl font-semibold tracking-[0.34em] text-white">
              HEIMDALL
            </div>
            <div className="mt-1 text-[11px] text-sky-200/70">
              Корпоративная разведка и проверка рисков
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/68 lg:flex">
            <a className="transition hover:text-white" href="#services">Услуги</a>
            <a className="transition hover:text-white" href="#recruitment">Кадровым агентствам</a>
            <a className="transition hover:text-white" href="#process">Как проходит проверка</a>
            <a className="transition hover:text-white" href="#report">Отчёт</a>
            <a className="transition hover:text-white" href="#contacts">Контакты</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 transition hover:border-sky-300/40 hover:bg-white/10"
            >
              {language === 'ru' ? 'RU / EN' : 'EN / RU'}
            </button>
            <a
              href="#lead"
              className="hidden rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_40px_rgba(56,189,248,0.28)] transition hover:bg-sky-400 md:block"
            >
              {isRu ? 'Запросить проверку' : 'Request check'}
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-36 md:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="reveal inline-flex items-center gap-3 rounded-full border border-sky-300/20 bg-sky-300/8 px-4 py-2 text-sm text-sky-100/80 shadow-[0_0_35px_rgba(37,99,235,0.14)]">
              <Eye className="h-4 w-4 text-sky-300" />
              {isRu ? 'Конфиденциальная аналитика для корпоративных решений' : 'Confidential intelligence for enterprise decisions'}
            </div>

            <h1 className="reveal delay-1 mt-8 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white md:text-7xl xl:text-8xl">
              {isRu ? (
                <>
                  Выявляем риски
                  <br />
                  <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                    до того, как они становятся проблемой
                  </span>
                </>
              ) : (
                <>
                  We reveal risks
                  <br />
                  <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                    before they become a problem
                  </span>
                </>
              )}
            </h1>

            <p className="reveal delay-2 mt-8 max-w-3xl text-lg leading-8 text-white/68 md:text-xl">
              {isRu
                ? 'HEIMDALL проводит комплексные проверки бизнеса, AML/KYC анализ, проверку кандидатов и корпоративную разведку для банков, инвесторов, юридических фирм и кадровых агентств.'
                : 'HEIMDALL provides due diligence, AML/KYC analysis, candidate checks and corporate intelligence for banks, investors, law firms and recruitment agencies.'}
            </p>

            <div className="reveal delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#lead" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 text-base font-semibold text-white shadow-[0_0_55px_rgba(56,189,248,0.35)] transition hover:-translate-y-1 hover:bg-sky-400">
                {isRu ? 'Запросить проверку' : 'Request check'}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#contacts" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-semibold text-white/90 backdrop-blur-xl transition hover:-translate-y-1 hover:border-sky-300/35 hover:bg-white/10">
                {isRu ? 'Получить консультацию' : 'Get consultation'}
              </a>
            </div>

            <div className="reveal delay-4 mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ['24ч', isRu ? 'быстрый старт проверки' : 'fast review start'],
                ['NDA', isRu ? 'по запросу клиента' : 'on request'],
                ['10+', isRu ? 'типов источников' : 'source types'],
                ['Risk', isRu ? 'подход на основе риска' : 'risk-based approach']
              ].map(([num, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                  <div className="text-2xl font-semibold text-white">{num}</div>
                  <div className="mt-1 text-xs leading-5 text-white/55">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal delay-2 relative">
            <div className="absolute -inset-8 rounded-[50px] bg-sky-500/15 blur-3xl" />
            <div className="light-sweep relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.055] p-5 shadow-premium backdrop-blur-2xl">
              <div className="rounded-[26px] border border-white/10 bg-[#07101f]/90 p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-sky-200/70">
                      HEIMDALL SCAN
                    </div>
                    <div className="mt-2 text-2xl font-semibold">
                      Индекс риска
                    </div>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-200">
                    Конфиденциально
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-sky-400 to-blue-600 shadow-[0_0_25px_rgba(56,189,248,0.7)]" />
                    </div>
                    <div className="mt-3 text-sm text-white/55">
                      Обнаружены факторы, требующие дополнительного анализа
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-semibold text-sky-300">68</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40">из 100</div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    ['Структура владения', 'Нужна проверка'],
                    ['Санкционные риски', 'Совпадений нет'],
                    ['Судебная история', 'Есть сигналы'],
                    ['Репутационный фон', 'Средний риск']
                  ].map(([a, b]) => (
                    <div key={a} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                      <span className="text-white/72">{a}</span>
                      <span className="text-sm text-sky-200/72">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-sky-300/20 bg-sky-300/8 p-4 text-sm leading-6 text-white/70">
                  Итоговый отчёт содержит выявленные факты, краткое аналитическое заключение и рекомендации по дальнейшим действиям.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.025] py-4">
        <div className="ticker text-sm text-white/55">
          <div className="ticker-track gap-8">
            <span>Проверка контрагентов • Проверка кандидатов • AML/KYC • Корпоративная разведка • Проверка иностранных компаний • Комплексная проверка бизнеса • Репутационные риски • Проверка топ-менеджеров •</span>
            <span>Проверка контрагентов • Проверка кандидатов • AML/KYC • Корпоративная разведка • Проверка иностранных компаний • Комплексная проверка бизнеса • Репутационные риски • Проверка топ-менеджеров •</span>
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-5 py-24">
        <div className="mb-12 max-w-3xl">
          <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Услуги</div>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Проверки для решений, где ошибка стоит дорого
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="light-sweep group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-sky-300/35 hover:bg-white/[0.07] hover:shadow-[0_0_60px_rgba(56,189,248,0.14)]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200 transition group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold leading-tight text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{service.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section id="recruitment" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="overflow-hidden rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-400/12 via-white/[0.045] to-transparent p-6 backdrop-blur-2xl md:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-200">
                Для кадровых и рекрутинговых агентств
              </div>
              <h2 className="mt-8 text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl">
                Ваш кандидат прошёл интервью.
                <br />
                Но пройдёт ли он внутреннюю проверку?
              </h2>
              <p className="mt-7 text-lg leading-8 text-white/68">
                HEIMDALL помогает заранее выявлять риски кандидатов до передачи финалиста клиенту: биография, деловая репутация, конфликт интересов, иностранный опыт, чувствительные должности и скрытые факторы отказа.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#lead" className="rounded-2xl bg-sky-500 px-7 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:-translate-y-1 hover:bg-sky-400">
                  Проверить кандидата
                </a>
                <a href="#lead" className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-semibold transition hover:border-sky-300/35 hover:bg-white/10">
                  Получить консультацию
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {hiringPain.map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
                  <CheckCircle2 className="mb-4 h-5 w-5 text-sky-300" />
                  <div className="text-lg font-medium">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Как проходит проверка</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Простой процесс без личного кабинета и лишней сложности
            </h2>
          </div>

          <div className="grid gap-4">
            {[
              ['01', 'Вы оставляете заявку', 'Мы уточняем задачу, тип проверки, сроки и формат результата.'],
              ['02', 'Аналитики проводят проверку', 'Изучаются источники, связи, биография, юридические и репутационные факторы.'],
              ['03', 'Формируется конфиденциальный отчёт', 'Отчёт содержит выводы, выявленные факты и краткие рекомендации.'],
              ['04', 'Вы получаете решение по рискам', 'Мы помогаем понять, можно ли продолжать сделку, найм или сотрудничество.']
            ].map(([num, title, text]) => (
              <div key={num} className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl">
                <div className="text-sm text-sky-300">{num}</div>
                <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Аналитический отчёт</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Не поток данных, а понятные выводы для решения
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              Клиент получает конфиденциальный отчёт с индексом риска, кратким аналитическим заключением, выявленными фактами и рекомендацией.
            </p>
          </div>

          <div className="relative rounded-[34px] border border-white/10 bg-white/[0.055] p-5 shadow-premium backdrop-blur-2xl">
            <div className="absolute right-8 top-8 rotate-12 rounded-xl border border-red-300/30 px-4 py-2 text-xs uppercase tracking-[0.22em] text-red-200/80">
              Конфиденциально
            </div>
            <div className="rounded-[28px] bg-[#07101f] p-8">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">HEIMDALL REPORT</div>
              <h3 className="mt-4 text-3xl font-semibold">Итоговая оценка риска</h3>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  ['Индекс риска', 'Средний'],
                  ['Краткое заключение', 'Готово'],
                  ['Выявленные факты', '12'],
                  ['Рекомендация', 'Требуется анализ']
                ].map(([a, b]) => (
                  <div key={a} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="text-sm text-white/45">{a}</div>
                    <div className="mt-2 text-xl font-semibold text-white">{b}</div>
                  </div>
                ))}
              </div>
              <div className="mt-7 space-y-3">
                <div className="h-3 w-full rounded-full bg-white/10" />
                <div className="h-3 w-4/5 rounded-full bg-white/10" />
                <div className="h-3 w-2/3 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl md:p-12">
          <div className="flex items-start gap-5">
            <LockKeyhole className="mt-2 h-8 w-8 text-sky-300" />
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                Конфиденциальность как стандарт
              </h2>
              <p className="mt-5 max-w-4xl text-lg leading-8 text-white/64">
                Каждая проверка проводится с соблюдением принципов конфиденциальности, ограниченного доступа к информации и методологии оценки рисков корпоративного уровня.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {trust.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-5 text-white/75">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="lead" className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
        <div className="grid gap-12 rounded-[42px] border border-sky-300/20 bg-gradient-to-br from-sky-500/12 via-white/[0.04] to-transparent p-6 backdrop-blur-2xl md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">Заявка</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
              Запросить проверку
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/64">
              Опишите задачу. Мы свяжемся с вами, уточним детали и предложим формат проверки.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Имя" className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
              <input name="company" value={form.company} onChange={handleChange} placeholder="Компания" className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Телефон" className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />
            </div>
            <select name="check_type" value={form.check_type} onChange={handleChange} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition focus:border-sky-300/45">
              {checkTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Комментарий" rows={5} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-sky-300/45" />

            <button disabled={status === 'loading'} className="rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)] transition hover:bg-sky-400 disabled:opacity-60">
              {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
            </button>

            {message && (
              <div className={`rounded-2xl border px-5 py-4 text-sm ${status === 'success' ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100' : 'border-red-300/25 bg-red-300/10 text-red-100'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </section>

      <footer id="contacts" className="relative z-10 border-t border-white/10 bg-black/20 px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <div className="text-2xl font-semibold tracking-[0.34em]">HEIMDALL</div>
            <div className="mt-3 text-white/55">
              Корпоративная разведка и проверка рисков
            </div>
          </div>
          <div className="space-y-3 text-white/60">
            <div>NDA по запросу</div>
            <div>Конфиденциальная аналитика</div>
            <div>Международные источники данных</div>
            <div>Ограниченный доступ к информации</div>
          </div>
          <div className="space-y-3 text-white/60">
            <div>Email: contact@heimdall-risk.com</div>
            <div>Telegram: @heimdall_risk</div>
            <div>Защищённая коммуникация по запросу</div>
          </div>
        </div>

        <a href="#lead" className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl bg-sky-500 px-6 py-4 text-center font-semibold shadow-[0_0_45px_rgba(56,189,248,0.34)] md:hidden">
          Запросить проверку
        </a>
      </footer>
    </main>
  )
}
