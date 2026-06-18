import { useState } from 'react'
import Link from 'next/link'
import { reportDrafts } from '@/data/reportBuilderMockData'
import { CheckCircle2, Download, FileText, Send } from 'lucide-react'

export default function ReportBuilder({ caseId = 'HMD-2026-001' }) {
  const draft = reportDrafts[caseId] || reportDrafts['HMD-2026-001']
  const [sections, setSections] = useState(draft.sections)
  const [checked, setChecked] = useState({})
  const [status, setStatus] = useState('Черновик')

  const allChecked = draft.checklist.every((item) => checked[item])

  const updateSection = (index, value) => {
    setSections((current) => current.map((section, i) => i === index ? [section[0], value] : section))
  }

  const toggleCheck = (item) => {
    setChecked((current) => ({ ...current, [item]: !current[item] }))
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[34px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-7">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Сборка отчета</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{draft.title}</h2>
            <p className="mt-4 text-white/60">{draft.subject} · {draft.client}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-red-300/25 bg-red-300/10 px-3 py-1 text-sm font-semibold text-red-200">
              {draft.riskLevel} · {draft.riskScore}/100
            </span>
            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-sm font-semibold text-sky-100">
              {status}
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-5">
          {sections.map(([title, content], index) => (
            <section key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
              <div className="mb-4 flex items-center gap-3">
                <FileText className="h-5 w-5 text-sky-300" />
                <h3 className="text-xl font-semibold">{title}</h3>
              </div>

              <textarea
                value={content}
                onChange={(event) => updateSection(index, event.target.value)}
                className="min-h-40 w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-7 text-white outline-none focus:border-sky-300/40"
              />
            </section>
          ))}
        </div>

        <aside className="grid h-fit gap-5 xl:sticky xl:top-6">
          <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="text-sm uppercase tracking-[0.22em] text-sky-300/80">Чек-лист аналитика</div>

            <div className="mt-5 grid gap-3">
              {draft.checklist.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleCheck(item)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    checked[item]
                      ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'
                      : 'border-white/10 bg-black/20 text-white/65'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
            <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Действия</div>

            <div className="mt-5 grid gap-3">
              <button onClick={() => alert('Экспорт отчета будет подключен на следующем этапе')} className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 font-semibold text-white">
                <Download className="h-4 w-4" />
                Экспортировать отчет
              </button>

              <button disabled={!allChecked} onClick={() => setStatus('Согласовано')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-5 py-4 font-semibold text-white disabled:opacity-45">
                <CheckCircle2 className="h-4 w-4" />
                Согласовать отчет
              </button>

              <button disabled={status !== 'Согласовано'} onClick={() => setStatus('Готово для клиента')} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-5 py-4 font-semibold text-[#050816] disabled:opacity-45">
                <Send className="h-4 w-4" />
                Отметить готовым для клиента
              </button>

              <Link href={`/analyst/ai/${draft.caseId}`} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-center text-sm font-semibold text-white/75">
                Назад к черновику ИИ
              </Link>
            </div>

            {!allChecked && (
              <p className="mt-4 text-xs leading-6 text-white/45">
                Заполните чек-лист перед согласованием отчета.
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  )
}
