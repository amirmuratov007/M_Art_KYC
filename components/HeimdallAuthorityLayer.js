
import { ShieldCheck, Building2, Lock, Globe2 } from 'lucide-react'

const items = [
  {
    title: 'Корпоративная разведка',
    text: 'Проверка контрагентов, ownership analysis и due diligence.',
    icon: ShieldCheck,
  },
  {
    title: 'Sensitive Positions',
    text: 'Executive screening и background intelligence.',
    icon: Building2,
  },
  {
    title: 'Конфиденциальность',
    text: 'Закрытый формат взаимодействия и защищенная работа с данными.',
    icon: Lock,
  },
  {
    title: 'International Intelligence',
    text: 'Санкционные, репутационные и cross-border риски.',
    icon: Globe2,
  },
]

export default function HeimdallAuthorityLayer() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
      <div className="max-w-4xl">
        <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
          HEIMDALL
        </div>

        <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
          Intelligence-grade проверка рисков
        </h2>

        <p className="mt-7 text-lg leading-8 text-white/64">
          HEIMDALL помогает бизнесу принимать решения до сделки, найма,
          партнерства или допуска к чувствительной информации.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.04em]">
                {item.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-white/60">
                {item.text}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
