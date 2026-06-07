import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import { ArrowRight, CheckCircle2, Clock3, FileText, FolderOpen, LockKeyhole, MessageSquareText, RefreshCw, ShieldCheck, UserRound } from 'lucide-react'

const steps = [
  ['1', 'Вход в кабинет', 'Клиент входит по email и паролю. Кабинет показывает только данные, привязанные к его Supabase user_id.'],
  ['2', 'Новый запрос', 'Клиент описывает задачу: объект проверки, сроки, вводные данные, желаемый результат. Запрос уходит команде HEIMDALL.'],
  ['3', 'Проверка в работе', 'Аналитик создает карточку проверки, указывает статус, риск-оценку и краткое резюме. Клиент видит обновления в кабинете.'],
  ['4', 'Отчет и рекомендации', 'Когда работа завершена, в кабинете появляется ссылка на отчет и рекомендации по дальнейшим действиям.']
]

const statuses = [
  ['Новая', 'Запрос принят или карточка проверки создана. Команда уточняет вводные и готовит старт работы.'],
  ['В работе', 'HEIMDALL собирает и анализирует данные, проверяет связи, риски, документы и цифровые следы.'],
  ['На проверке', 'Материалы проходят внутреннюю сверку, чтобы выводы были аккуратными и не вводили клиента в заблуждение.'],
  ['Завершено', 'Отчет готов. Клиент может открыть финальные материалы, выводы и рекомендации.'],
  ['Приостановлено', 'Работа временно остановлена: не хватает документов, вводных данных или требуется согласование.']
]

const sections = [
  ['Мои проверки', 'Все активные и завершенные проверки клиента: контрагенты, поставщики, кандидаты, Due Diligence, ИБ и внутренние расследования.', FileText],
  ['Отчеты', 'Быстрый доступ к тем проверкам, по которым уже опубликована ссылка на финальный отчет.', ShieldCheck],
  ['Новый запрос', 'Форма для новой задачи. Запрос отправляется в защищенный API, Telegram и таблицу заявок.', MessageSquareText],
  ['Документы', 'Раздел под вводные материалы, финальные документы, NDA и будущую защищенную загрузку файлов.', FolderOpen]
]

export default function ClientAccountGuidePage() {
  return (
    <>
      <Head>
        <title>Как работает личный кабинет клиента | HEIMDALL</title>
        <meta name="description" content="Инструкция для клиентов HEIMDALL: вход, проверки, статусы, отчеты, документы и новые запросы в личном кабинете." />
        <link rel="canonical" href="https://www.heimdall-group.ru/client-account-guide" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(37,99,235,0.26),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(214,168,79,0.13),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_52%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 sm:py-24">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <LockKeyhole className="h-4 w-4" />
              Клиентский кабинет
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Как работает личный кабинет HEIMDALL
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Простая схема для клиента: где смотреть проверки, что означают статусы, как получить отчет и как отправить новую задачу команде HEIMDALL.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Перейти в кабинет
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Смотреть услуги и цены
              </Link>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-xl font-semibold text-[#F7D784]">{number}</div>
                <h2 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl md:p-10">
              <UserRound className="mb-7 h-9 w-9 text-sky-300" />
              <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Что видит клиент</h2>
              <p className="mt-5 text-base leading-8 text-white/62">
                После входа клиент видит не общую базу, а только свои проверки. Данные привязаны к учетной записи клиента. Это снижает риск случайного доступа к чужим материалам.
              </p>
              <div className="mt-7 grid gap-3">
                {['Количество проверок и активных задач', 'Текущие статусы', 'Risk score по каждой проверке', 'Краткое резюме аналитика', 'Ссылки на готовые отчеты'].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections.map(([title, text, Icon]) => (
                <div key={title} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                  <Icon className="mb-6 h-8 w-8 text-[#F7D784]" />
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.055] p-7 backdrop-blur-2xl md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <Clock3 className="mb-7 h-9 w-9 text-sky-300" />
                <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Статусы проверки</h2>
                <p className="mt-5 text-base leading-8 text-white/62">
                  Статус показывает не юридический итог, а рабочую стадию задачи. Финальные выводы появляются только после завершения проверки и публикации отчета.
                </p>
              </div>

              <div className="grid gap-4">
                {statuses.map(([title, text]) => (
                  <div key={title} className="rounded-[26px] border border-white/10 bg-black/25 p-5">
                    <div className="text-lg font-semibold text-white">{title}</div>
                    <p className="mt-2 text-sm leading-7 text-white/58">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">Что не нужно отправлять</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">
                Не отправляйте пароли, коды доступа, банковские ключи, лишние персональные данные и материалы, которые не нужны для задачи.
              </p>
            </div>
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">Как передавать документы</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">
                До включения закрытой загрузки файлов документы передаются только через согласованный защищенный канал. Ссылка на финальный отчет добавляется в кабинет.
              </p>
            </div>
            <div className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">Когда писать новый запрос</h3>
              <p className="mt-4 text-sm leading-7 text-white/58">
                Создавайте новый запрос, если появился новый контрагент, поставщик, кандидат, инцидент, сделка или задача по информационной безопасности.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-7 backdrop-blur-2xl md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Следующий шаг</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Войдите в кабинет и создайте запрос</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">
                Если доступ уже выдан, используйте email и пароль. Если доступа нет, оставьте заявку на сайте или напишите команде HEIMDALL.
              </p>
            </div>
            <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]">
              Открыть кабинет
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
