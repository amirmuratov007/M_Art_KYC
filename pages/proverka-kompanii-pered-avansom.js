import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, CheckCircle2, FileSearch, ShieldCheck, AlertTriangle } from 'lucide-react'

const signals = ["признаки технической компании или посредника без активов", "связи с проблемными юридическими лицами", "история споров, долгов и неисполненных обязательств", "несостыковки в документах, реквизитах и коммуникации"]
const useCases = ["перед предоплатой новому поставщику", "перед оплатой импортной поставки", "если контрагент давит на срочный перевод"]

export default function Page() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Проверка компании перед авансом | HEIMDALL</title>
        <meta name="description" content="Проверка компании перед авансом: признаки фиктивности, судебные риски, владельцы, связи, платежный риск и документы." />
        <link rel="canonical" href="https://www.heimdall-group.ru/proverka-kompanii-pered-avansom" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-5 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" />
              Аванс / платежный риск
            </div>

            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Проверка компании перед авансовым платежом
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">
              Аванс часто становится точкой невозврата. Проверяем компанию до того, как деньги уйдут.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                Получить консультацию
                <ArrowRight className="h-4 w-4" />
              </button>

              <Link href="/sample-reports" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Пример отчета
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <div className="text-sm uppercase tracking-[0.25em] text-[#F7D784]/80">
                Что проверяем
              </div>

              <div className="mt-8 grid gap-4">
                {signals.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm leading-6 text-white/70">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F7D784]" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1fr]">
            <div className="rounded-[36px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl">
              <AlertTriangle className="h-8 w-8 text-[#F7D784]" />
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em]">Когда нужна проверка</h2>
              <div className="mt-8 grid gap-4">
                {useCases.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/72">{item}</div>
                ))}
              </div>
            </div>

            <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-2xl">
              <FileSearch className="h-8 w-8 text-sky-200" />
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.05em]">Что получает клиент</h2>
              <p className="mt-5 text-lg leading-8 text-white/64">Структурированный вывод по риску: что найдено, почему это важно и какое управленческое решение безопаснее.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/cases/china-supplier-advance-payment" className="inline-flex items-center gap-2 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-3 text-sm font-semibold text-[#F7D784]">
                  Читать связанный кейс: Кейс: остановленный авансовый платеж <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/trust-center" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                  Trust Center
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
                  Все услуги
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-28 sm:px-5">
          <div className="grid gap-6 rounded-[42px] border border-sky-300/20 bg-sky-300/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Нужно проверить объект перед решением?</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/64">Оставьте заявку и коротко опишите ситуацию. Мы предложим формат проверки, срок и перечень необходимых данных.</p>
            </div>
            <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
              Получить консультацию
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>

      <ContactModal open={open} onClose={() => setOpen(false)} language="ru" defaultTopic="Проверка компании перед авансом" />
    </>
  )
}
