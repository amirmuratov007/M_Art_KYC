import Link from 'next/link'
import { ArrowRight, Gauge, ShieldCheck, Sparkles } from 'lucide-react'
import { riskTestCatalog } from '@/components/HeimdallRiskTest'

export default function HeimdallRiskTestHub({ language = 'ru' }) {
  const ru = language !== 'en'
  return (
    <section id="risk-tests" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-24">
      <div className="rounded-[38px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
            <Sparkles className="h-4 w-4" />
            {ru ? 'Бесплатные риск-тесты' : 'Free risk tests'}
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl">
            {ru ? 'Выберите ситуацию и получите быстрый риск-профиль' : 'Choose a situation and get a quick risk profile'}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/64 sm:text-lg">
            {ru ? 'Это не расследование и не юридическое заключение. Тесты помогают быстро понять, есть ли красные флаги и нужна ли ручная проверка HEIMDALL.' : 'These tests are not investigations or legal opinions. They help identify red flags and whether a manual HEIMDALL review is needed.'}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {riskTestCatalog.map((test) => {
            const href = `${ru ? '/risk-test' : '/risk-test-en'}?test=${test.id}`
            return (
              <Link key={test.id} href={href} className="group rounded-[30px] border border-white/10 bg-[#050816]/78 p-5 transition hover:-translate-y-1 hover:border-[#D6A84F]/45 hover:bg-[#07101f]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sky-100">
                  <Gauge className="h-5 w-5" />
                </div>
                <div className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">{ru ? test.ruTitle : test.enTitle}</div>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/62">{ru ? test.ruShort : test.enShort}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F7D784]">
                  {ru ? 'Пройти тест' : 'Start test'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 rounded-[26px] border border-emerald-300/15 bg-emerald-300/[0.07] p-5 text-sm leading-7 text-emerald-100">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0" />
            <p>{ru ? 'После прохождения теста результат можно отправить в HEIMDALL. Если вы уже авторизованы, контактные данные повторно вводить не придется.' : 'After completing a test, you can send the result to HEIMDALL. If you are signed in, you will not need to enter contact details again.'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
