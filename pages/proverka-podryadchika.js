import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck } from 'lucide-react'

const signals = ["история споров, долгов и проблемных проектов", "связанные лица, массовые адреса и повторяющиеся директора", "риски срыва сроков, субподрядных схем и технических компаний"]
const useCases = ["перед допуском подрядчика на объект или в проект", "перед авансированием работ", "при выборе между несколькими подрядчиками"]

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Проверка подрядчика | HEIMDALL</title>
        <meta name="description" content="Проверка подрядчиков перед работами, авансами и доступом к объектам: корпоративные связи, судебные риски, репутация и финансовые сигналы." />
        <link rel="canonical" href="https://www.heimdall-group.ru/proverka-podryadchika" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-5 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" />
              Россия / корпоративные риски
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Проверка подрядчика до допуска к проекту
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Проверка подрядчиков перед работами, авансами и доступом к объектам: корпоративные связи, судебные риски, репутация и финансовые сигналы.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]"
              >
                Получить консультацию
                <ArrowRight className="h-4 w-4" />
              </button>

              <Link
                href="/sample-reports"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white"
              >
                Примеры отчетов
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">
                <FileSearch className="h-4 w-4" />
                Что проверяем
              </div>

              <div className="mt-8 grid gap-4">
                {signals.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-6 text-white/70">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="mb-10 max-w-4xl">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">
              Когда это нужно
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Проверка до решения дешевле ошибки после сделки
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {useCases.map((item) => (
              <div key={item} className="rounded-[34px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <ShieldCheck className="mb-6 h-7 w-7 text-sky-300" />
                <p className="text-sm leading-7 text-white/64">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-32 sm:px-5">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">
                HEIMDALL
              </div>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                Получите аналитический вывод до сделки, найма или допуска
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/64">
                Мы показываем не только факты, но и практический риск: что может повлиять на деньги, репутацию, безопасность и управленческое решение.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-7 py-4 font-semibold text-[#050816]"
            >
              Оставить заявку
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter />
        <ContactModal open={open} onClose={() => setOpen(false)} language="ru" defaultTopic="Проверка подрядчика" />
      </main>
    </>
  )
}
