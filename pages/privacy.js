import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { LockKeyhole, ShieldCheck, FileText, UserCheck } from 'lucide-react'

const blocks = [
  ['Что обрабатывается', 'Контактные данные, описание запроса, материалы клиента, сведения для подготовки проверки и результаты аналитической работы.'],
  ['Зачем это нужно', 'Для связи с клиентом, оценки запроса, подготовки предложения, выполнения проверки, передачи отчета и сопровождения проекта.'],
  ['Как защищается доступ', 'Материалы проверки и отчеты передаются только согласованным получателям. Публичное раскрытие деталей проверки не производится.'],
  ['Принцип минимизации', 'HEIMDALL стремится использовать и хранить только те данные, которые нужны для конкретной деловой задачи и аналитического вывода.'],
]

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Конфиденциальность | HEIMDALL</title>
        <meta name="description" content="Политика конфиденциальности HEIMDALL: обработка обращений, клиентских материалов, отчетов и данных в рамках корпоративной аналитики." />
        <link rel="canonical" href="https://www.heimdall-group.ru/privacy" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <HeimdallNav language="ru" />
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]"><LockKeyhole className="h-4 w-4" /> Privacy</div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Конфиденциальность</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">HEIMDALL работает с чувствительными деловыми запросами. Поэтому конфиденциальность клиента, материалов проверки и итоговых отчетов является частью самой услуги.</p>
          </div>
        </section>
        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-5 md:grid-cols-2">
          {blocks.map(([title, text], index) => {
            const Icon = [FileText, UserCheck, ShieldCheck, LockKeyhole][index]
            return <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl"><div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200"><Icon className="h-6 w-6" /></div><h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2><p className="mt-5 text-sm leading-7 text-white/60">{text}</p></div>
          })}
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 sm:px-5">
          <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-8 backdrop-blur-2xl">
            <p className="max-w-5xl text-base leading-8 text-white/72">Эта страница описывает публичные принципы обработки данных на сайте HEIMDALL. Конкретные условия проекта, сроки хранения, состав материалов и порядок передачи отчетов могут отдельно фиксироваться в коммерческом предложении, договоре или согласованной переписке.</p>
          </div>
        </section>
        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
