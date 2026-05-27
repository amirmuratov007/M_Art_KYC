
import { ShieldCheck, Clock3, FileText, AlertTriangle, Lock } from 'lucide-react'

const cases = [
  {
    company: 'Northbridge Industrial',
    status: 'В процессе',
    risk: 'Medium',
    progress: 72,
  },
  {
    company: 'Orion Trade Group',
    status: 'Завершено',
    risk: 'Low',
    progress: 100,
  },
]

export default function HeimdallClientDashboard() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
            <Lock className="h-4 w-4" />
            Client Intelligence Portal
          </div>

          <h2 className="mt-8 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
            Личный кабинет клиента
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
            Защищенный intelligence workspace для корпоративных проверок и due diligence.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/[0.045] px-7 py-5 backdrop-blur-2xl">
          <div className="text-xs uppercase tracking-[0.24em] text-white/40">
            Активные проверки
          </div>

          <div className="mt-3 text-5xl font-semibold tracking-[-0.05em]">
            12
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                Intelligence Cases
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                Текущие проверки
              </h3>
            </div>

            <ShieldCheck className="h-7 w-7 text-sky-300" />
          </div>

          <div className="mt-10 grid gap-5">
            {cases.map((item) => (
              <div
                key={item.company}
                className="rounded-[28px] border border-white/10 bg-black/20 p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="text-xl font-semibold tracking-[-0.03em]">
                      {item.company}
                    </div>

                    <div className="mt-3 flex items-center gap-5 text-sm text-white/50">
                      <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        {item.status}
                      </div>

                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Risk: {item.risk}
                      </div>
                    </div>
                  </div>

                  <div className="w-full max-w-[240px]">
                    <div className="mb-3 flex items-center justify-between text-sm text-white/50">
                      <span>Прогресс</span>
                      <span>{item.progress}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-sky-400"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                  Risk Summary
                </div>

                <div className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                  Medium Exposure
                </div>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D6A84F]/10">
                <AlertTriangle className="h-7 w-7 text-[#F7D784]" />
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/60">
              Обнаружены procurement и ownership риски у части контрагентов.
            </p>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                  Reports Center
                </div>

                <div className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                  28 Reports
                </div>
              </div>

              <FileText className="h-8 w-8 text-sky-300" />
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                Executive Screening.pdf
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                Supplier Due Diligence.pdf
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
