import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { Database, FileSearch, ShieldCheck } from 'lucide-react'

const groups = [
  ['Официальные реестры', 'Регистрационные сведения, корпоративные записи, статусы юридических лиц, изменения в управлении и структуре.'],
  ['Судебные и долговые данные', 'Судебные споры, исполнительные производства, банкротные эпизоды и признаки долговой нагрузки.'],
  ['Санкционные и комплаенс-источники', 'Санкционные списки, PEP-сигналы, AML/KYC-контекст и cross-border exposure.'],
  ['Публичная репутация', 'СМИ, отраслевые публикации, adverse media, публичные конфликты и репутационные сигналы.'],
  ['Связи и ownership', 'Связанные компании, директора, бенефициары, номинальные признаки и фактический контроль.'],
  ['OSINT и аналитический контекст', 'Открытые источники, цифровые следы, поведенческие сигналы и сопоставление данных.'],
]

export default function DataSourcesPage() {
  return (
    <>
      <Head>
        <title>Источники данных | HEIMDALL</title>
        <meta name="description" content="Какие категории источников использует HEIMDALL: реестры, судебные данные, санкционные списки, СМИ, OSINT и корпоративные сведения." />
        <link rel="canonical" href="https://heimdall-group.ru/data-sources" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>
        <HeimdallNav language="ru" />
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]"><Database className="h-4 w-4" /> Data Sources</div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Источники данных</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">HEIMDALL использует комбинацию открытых, официальных, коммерческих и аналитических источников. Мы не раскрываем внутренние методы полностью, но показываем категории данных, которые формируют основу проверки.</p>
          </div>
        </section>
        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-32 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([title, text]) => (
            <div key={title} className="rounded-[36px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-200"><FileSearch className="h-6 w-6" /></div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
              <p className="mt-5 text-sm leading-7 text-white/60">{text}</p>
            </div>
          ))}
        </section>
        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/10 p-8 backdrop-blur-2xl">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-[#F7D784]" />
              <p className="max-w-4xl text-base leading-8 text-white/70">Источники не заменяют аналитическую оценку. Ключевая ценность HEIMDALL - сопоставление данных и перевод разрозненных сигналов в понятный risk summary для клиента.</p>
            </div>
          </div>
        </section>
        <HeimdallFooter />
      </main>
    </>
  )
}
