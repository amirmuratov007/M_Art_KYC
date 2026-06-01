import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { HelpCircle } from 'lucide-react'

const questions = [
  ['Сколько занимает проверка?', 'Базовая проверка обычно занимает от 24 до 72 часов. Комплексный due diligence зависит от объема данных, юрисдикций и глубины проверки.'],
  ['Что получает клиент?', 'Клиент получает аналитический отчет с фактами, risk summary, ключевыми выводами и рекомендацией по дальнейшим действиям.'],
  ['Можно ли проверить физическое лицо?', 'Да, если проверка проводится в законных целях: найм, партнерство, допуск к чувствительной информации или оценка деловой репутации.'],
  ['Проверяете ли вы иностранные компании?', 'Да. HEIMDALL работает с cross-border проверками, санкционными рисками, ownership analysis и международными корпоративными структурами.'],
  ['Можно ли заказать постоянное сопровождение?', 'Да. Формат business support подходит компаниям, которым нужен постоянный мониторинг контрагентов, закупок, кандидатов и корпоративных рисков.'],
  ['Вы даете гарантию отсутствия риска?', 'Нет. Корректная проверка не гарантирует отсутствие риска, а выявляет известные и вероятные red flags на дату анализа.'],
  ['Как защищается конфиденциальность?', 'Информация клиента и детали проверки не публикуются. Отчеты и результаты передаются только согласованным получателям.'],
  ['Можно ли получить пример отчета?', 'Да. На сайте есть раздел sample reports с демонстрационными форматами аналитических материалов.'],
]

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ | HEIMDALL</title>
        <meta name="description" content="Частые вопросы о проверках HEIMDALL: сроки, отчеты, due diligence, проверка кандидатов, конфиденциальность и сопровождение бизнеса." />
        <link rel="canonical" href="https://heimdall-group.ru/faq" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: questions.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
        }) }} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <HeimdallNav language="ru" />
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]"><HelpCircle className="h-4 w-4" /> FAQ</div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Частые вопросы</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">Короткие ответы о формате работы HEIMDALL, проверках, отчетах, сроках и конфиденциальности.</p>
          </div>
          <div className="mt-16 grid gap-5">
            {questions.map(([q, a]) => (
              <div key={q} className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{q}</h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{a}</p>
              </div>
            ))}
          </div>
        </section>
        <HeimdallFooter />
      </main>
    </>
  )
}
