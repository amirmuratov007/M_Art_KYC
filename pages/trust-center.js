
import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ShieldCheck, LockKeyhole, FileSearch, Network, AlertTriangle, Eye } from 'lucide-react'

const blocks = [
  ['Конфиденциальность', 'Работа с чувствительными проверками, бенефициарами, кандидатами и сделками без публичного раскрытия деталей.', LockKeyhole],
  ['Методология', 'Сбор данных, карта связей, sanctions screening, adverse media, судебные сигналы и аналитическая проверка выводов.', FileSearch],
  ['Связи и контроль', 'Анализ владельцев, директоров, номинальных лиц, связанных компаний и признаков фактического контроля.', Network],
  ['Риск-сигналы', 'Выявление судебных, санкционных, репутационных, закупочных и корпоративных red flags.', AlertTriangle],
  ['Проверка источников', 'Сопоставление данных из разных контуров, устранение шума и отделение фактов от предположений.', Eye],
  ['Управленческий вывод', 'Итог не в виде набора ссылок, а в виде понятного risk summary для решения клиента.', ShieldCheck]
]

export default function TrustCenterPage() {
  return (
    <>
      <Head>
        <title>Центр доверия | HEIMDALL</title>
        <meta name="description" content="Центр доверия HEIMDALL: конфиденциальность, методология, проверка источников, карта связей и управленческий risk summary." />
        <link rel="canonical" href="https://www.heimdall-group.ru/trust-center" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" />
              Trust Architecture
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Центр доверия HEIMDALL
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Страница для клиентов, которые хотят понимать, как устроена проверка, почему ей можно доверять и как HEIMDALL работает с чувствительной информацией.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-32 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map(([title, text, Icon]) => (
            <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200">
                <Icon className="h-6 w-6" />
              </div>

              <h2 className="text-3xl font-semibold tracking-[-0.04em]">
                {title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/60">
                {text}
              </p>
            </div>
          ))}
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
