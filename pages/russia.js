import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { ArrowRight, ShieldCheck } from 'lucide-react'

const pages = [
  ['Проверка поставщика', '/proverka-postavshchika'],
  ['Проверка подрядчика', '/proverka-podryadchika'],
  ['Проверка партнера по бизнесу', '/proverka-partnera-po-biznesu'],
  ['Проверка инвестора', '/proverka-investora'],
  ['Проверка учредителя', '/proverka-uchreditelya'],
  ['Проверка директора', '/proverka-direktora'],
  ['Проверка перед договором', '/proverka-kontragenta-pered-dogovorom'],
  ['Проверка на банкротство', '/proverka-kompanii-na-bankrotstvo'],
  ['Проверка закупок', '/proverka-zakupok'],
  ['Проверка руководителя', '/proverka-kandidata-na-rukovodyashchuyu-dolzhnost'],
  ['Проверка сотрудника СБ', '/proverka-sotrudnika-sluzhboy-bezopasnosti'],
  ['Due Diligence бизнеса', '/due-diligence-biznesa-v-rossii']
]

export default function RussiaGrowthHub() {
  return (
    <>
      <Head>
        <title>Проверки бизнеса в России | HEIMDALL</title>
        <meta name="description" content="Проверка контрагентов, поставщиков, подрядчиков, кандидатов, директоров, учредителей и бизнеса в России." />
        <link rel="canonical" href="https://www.heimdall-group.ru/russia" />
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
              Россия
            </div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Проверки бизнеса в России
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Единый раздел HEIMDALL для проверки контрагентов, поставщиков, подрядчиков, кандидатов, директоров, учредителей, закупок и сделок в России.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-7xl gap-5 px-4 pb-32 sm:px-5 md:grid-cols-2 lg:grid-cols-3">
          {pages.map(([title, href]) => (
            <Link key={href} href={href} className="group rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-[#D6A84F]/35">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
              <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
                Открыть направление
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </section>

        <HeimdallFooter />
      </main>
    </>
  )
}
