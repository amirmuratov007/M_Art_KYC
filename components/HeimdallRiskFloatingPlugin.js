import Link from 'next/link'
import { useEffect, useState } from 'react'
import { X, Gauge, ArrowRight } from 'lucide-react'

export default function HeimdallRiskFloatingPlugin({ language = 'ru' }) {
  const ru = language !== 'en'
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem('heimdall-risk-plugin-closed') === '1') {
        setClosed(true)
        return
      }
    } catch (_) {}
    const timer = window.setTimeout(() => setVisible(true), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  function closePlugin(event) {
    event.preventDefault()
    event.stopPropagation()
    setClosed(true)
    setVisible(false)
    try { window.localStorage.setItem('heimdall-risk-plugin-closed', '1') } catch (_) {}
  }

  if (closed || !visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-[9200] max-w-[calc(100vw-2rem)] sm:bottom-6 sm:right-6">
      <Link href={ru ? '/risk-test#risk-tests' : '/risk-test-en#risk-tests'} className="group block w-[330px] max-w-full rounded-[28px] border border-[#D6A84F]/35 bg-[#050816]/96 p-4 text-white shadow-[0_24px_90px_rgba(0,0,0,0.6)] ring-1 ring-sky-300/10 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-[#F7D784]/70">
        <button onClick={closePlugin} aria-label={ru ? 'Закрыть риск-тест' : 'Close risk test'} className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 p-1.5 text-white/55 hover:text-white">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-3 pr-8">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D6A84F] text-[#050816] shadow-[0_0_35px_rgba(214,168,79,0.28)]">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#F7D784]">{ru ? 'Бесплатно' : 'Free'}</div>
            <div className="mt-1 text-lg font-semibold leading-6 tracking-[-0.035em]">{ru ? 'Пройдите риск-тест под вашу ситуацию' : 'Take a risk test for your situation'}</div>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/62">{ru ? 'Сделка, поставщик, ИБ, внутренние нарушения или внешняя служба безопасности.' : 'Deal, supplier, info security, internal misconduct or outsourced security.'}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-100">
          {ru ? 'Выбрать тест' : 'Choose test'} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  )
}
