
import { ChevronDown } from 'lucide-react'

const faq = [
  {
    q: 'Что включает проверка контрагента?',
    a: 'Проверку владельцев, директоров, судебной истории, связей, репутации, санкционных сигналов и корпоративных рисков.'
  },
  {
    q: 'Для кого подходит HEIMDALL?',
    a: 'Для бизнеса, инвесторов, юридических фирм, служб безопасности, procurement и compliance команд.'
  },
  {
    q: 'Проверяете ли вы руководителей и кандидатов?',
    a: 'Да. HEIMDALL проводит executive screening и background intelligence для чувствительных позиций.'
  },
  {
    q: 'Можно ли работать в формате сопровождения?',
    a: 'Да. Доступен формат долгосрочного сопровождения бизнеса и постоянного risk monitoring.'
  }
]

export default function HeimdallFAQAuthority() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-5">
      <div className="text-center">
        <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
          FAQ / Intelligence
        </div>

        <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
          Частые вопросы клиентов
        </h2>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/64">
          SEO-блок для Google, AI search и повышения доверия клиентов.
        </p>
      </div>

      <div className="mt-14 grid gap-5">
        {faq.map((item) => (
          <div
            key={item.q}
            className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-6">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                {item.q}
              </h3>

              <ChevronDown className="h-5 w-5 text-sky-300" />
            </div>

            <p className="mt-5 text-sm leading-7 text-white/60">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
