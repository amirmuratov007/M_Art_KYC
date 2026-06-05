import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ArrowRight, Bell, CheckCircle2, FileText, Gauge, LockKeyhole, Plus, ShieldAlert, Smartphone } from 'lucide-react'


const checks = [
  ['China supplier verification', 'High risk', 'Completed', 'Advance payment stopped'],
  ['Meridian CFO screening', 'Elevated', 'In review', 'Conflict-of-interest check'],
  ['Procurement contractor', 'High', 'Active', 'Affiliation map'],
  ['Sanctions context', 'Medium', 'Monitoring', 'Indirect exposure']
]

const signals = [
  ['New litigation signal', 'A connected entity received a new court claim.'],
  ['Ownership update', 'Beneficial ownership confirmation requested.'],
  ['Report ready', 'Supplier verification report is ready for review.']
]


export default function DemoClientAppPage() {
  return (
    <>
      <Head>
        <title>Демо клиентского приложения | HEIMDALL</title>
        <meta name="description" content="Демо-кабинет клиентского приложения HEIMDALL: проверки, отчеты, риск-сигналы и запросы." />
        <link rel="canonical" href="https://www.heimdall-group.ru/demo-client-app" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.16),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-20">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
                <Smartphone className="h-4 w-4" />
                Demo Client App
              </div>
              <h1 className="mt-7 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
                Тестовый кабинет клиента
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/62">
                Демо-интерфейс для телефона: проверки, риск-индекс, отчеты и быстрый запрос аналитика. Не трогает Supabase и реальные клиентские данные.
              </p>
            </div>
            <Link href="/app-download" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white">
              Установить на телефон <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-6 backdrop-blur-2xl">
              <div className="rounded-[34px] border border-white/10 bg-[#07101f] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]/80">Meridian Capital Demo</div>
                    <div className="mt-2 text-2xl font-semibold">Risk Control</div>
                  </div>
                  <LockKeyhole className="h-6 w-6 text-sky-300" />
                </div>

                <div className="mt-7 rounded-[30px] border border-white/10 bg-black/25 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-sm text-white/45">Risk index</div>
                      <div className="mt-2 text-6xl font-semibold text-[#F7D784]">64</div>
                    </div>
                    <Gauge className="h-10 w-10 text-sky-300" />
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[64%] rounded-full bg-[#D6A84F]" />
                  </div>
                  <div className="mt-3 text-sm text-white/48">Enhanced Business Support</div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ['4', 'активные проверки'],
                    ['2', 'отчета готовы'],
                    ['7', 'риск-сигналов'],
                    ['24ч', 'SLA ответа']
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                      <div className="text-2xl font-semibold text-sky-200">{value}</div>
                      <div className="mt-1 text-xs leading-5 text-white/45">{label}</div>
                    </div>
                  ))}
                </div>

                <button className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white">
                  <Plus className="h-5 w-5" />
                  Новый запрос проверки
                </button>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <div className="mb-5 flex items-center gap-3">
                  <ShieldAlert className="h-6 w-6 text-[#F7D784]" />
                  <h2 className="text-3xl font-semibold tracking-[-0.04em]">Проверки</h2>
                </div>
                <div className="grid gap-3">
                  {checks.map(([name, risk, status, detail]) => (
                    <div key={name} className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold">{name}</div>
                          <div className="mt-1 text-sm text-white/45">{detail}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-[#F7D784]">{risk}</div>
                          <div className="mt-1 text-xs text-sky-200">{status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                  <div className="mb-5 flex items-center gap-3">
                    <Bell className="h-6 w-6 text-sky-300" />
                    <h2 className="text-2xl font-semibold tracking-[-0.04em]">Сигналы</h2>
                  </div>
                  <div className="grid gap-3">
                    {signals.map(([title, text]) => (
                      <div key={title} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                        <div className="text-sm font-semibold text-[#F7D784]">{title}</div>
                        <div className="mt-1 text-sm leading-6 text-white/55">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                  <div className="mb-5 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-sky-300" />
                    <h2 className="text-2xl font-semibold tracking-[-0.04em]">Отчеты</h2>
                  </div>
                  <div className="grid gap-3">
                    {['Supplier verification PDF', 'CFO screening summary', 'Procurement risk map'].map((item) => (
                      <div key={item} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm">
                        <span>{item}</span>
                        <CheckCircle2 className="h-4 w-4 text-[#F7D784]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
