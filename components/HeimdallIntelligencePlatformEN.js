
import {
  Activity,
  ShieldAlert,
  Network,
  Globe2,
  Radar,
  FileSearch,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'

const activityFeed = [
  'New affiliated company detected',
  'Supplier ownership structure changed',
  'Adverse media signal identified',
  'Procurement red flag detected',
]

const sanctions = [
  ['OFAC', 'Low Risk'],
  ['EU', 'Clear'],
  ['United Kingdom', 'Monitoring'],
  ['PEP', 'Requires Review'],
]

export default function HeimdallIntelligencePlatformEN() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
      <div className="max-w-5xl">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
          <Radar className="h-4 w-4" />
          Intelligence Platform
        </div>

        <h2 className="mt-8 text-5xl font-semibold tracking-[-0.06em] md:text-8xl">
          Corporate Intelligence Platform
        </h2>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
          Premium HEIMDALL interface for counterparty due diligence,
          ownership analysis, sanctions monitoring and executive screening.
        </p>
      </div>

      <div className="mt-16 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6">
          <div className="rounded-[40px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                  Risk Heatmap
                </div>

                <div className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                  Corporate Risk Exposure
                </div>
              </div>

              <ShieldAlert className="h-8 w-8 text-[#F7D784]" />
            </div>

            <div className="mt-10 grid grid-cols-5 gap-3">
              {[...Array(25)].map((_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-2xl ${
                    index % 5 === 0
                      ? 'bg-red-500/40'
                      : index % 4 === 0
                      ? 'bg-[#D6A84F]/40'
                      : 'bg-sky-400/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[40px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                    Ownership Intelligence
                  </div>

                  <div className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
                    Ownership Graph
                  </div>
                </div>

                <Network className="h-8 w-8 text-sky-300" />
              </div>

              <div className="relative mt-12 flex h-[260px] items-center justify-center">
                <div className="absolute h-24 w-24 rounded-full border border-sky-300/30 bg-sky-300/10 backdrop-blur-xl" />

                <div className="absolute left-10 top-12 h-16 w-16 rounded-full border border-white/10 bg-white/10" />
                <div className="absolute right-10 top-12 h-16 w-16 rounded-full border border-white/10 bg-white/10" />
                <div className="absolute bottom-8 h-16 w-16 rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10" />

                <div className="absolute left-[90px] top-[95px] h-px w-24 bg-white/20" />
                <div className="absolute right-[90px] top-[95px] h-px w-24 bg-white/20" />
                <div className="absolute bottom-[90px] h-20 w-px bg-white/20" />
              </div>
            </div>

            <div className="rounded-[40px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                    Sanctions Monitoring
                  </div>

                  <div className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
                    Compliance Signals
                  </div>
                </div>

                <Globe2 className="h-8 w-8 text-sky-300" />
              </div>

              <div className="mt-10 grid gap-4">
                {sanctions.map(([name, status]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
                  >
                    <div className="text-sm font-medium text-white/80">
                      {name}
                    </div>

                    <div className="rounded-full border border-[#D6A84F]/20 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#F7D784]">
                      {status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[40px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                  Activity Feed
                </div>

                <div className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
                  Intelligence Signals
                </div>
              </div>

              <Activity className="h-8 w-8 text-sky-300" />
            </div>

            <div className="mt-10 grid gap-4">
              {activityFeed.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-5 py-5 text-sm leading-7 text-white/60"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[40px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">
                  Summary
                </div>

                <div className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
                  Risk Overview
                </div>
              </div>

              <TrendingUp className="h-8 w-8 text-[#F7D784]" />
            </div>

            <div className="mt-10 grid gap-5">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-5">
                <div className="flex items-center gap-3 text-sm font-medium text-red-200">
                  <AlertTriangle className="h-4 w-4" />
                  Elevated procurement exposure
                </div>
              </div>

              <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 px-5 py-5">
                <div className="flex items-center gap-3 text-sm font-medium text-sky-100">
                  <FileSearch className="h-4 w-4" />
                  Ownership structure verified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
