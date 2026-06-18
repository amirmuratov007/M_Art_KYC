import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Network, FileText, Trash2 } from 'lucide-react'
import { getRiskLevelLabel } from '@/lib/riskScoring'
import { riskObjectTypes, riskStatuses, signalCategories, severityOptions, confidenceOptions, connectionTargetTypes, relationTypes, strengthOptions } from '@/data/riskIntelligenceMockData'

export function getOptionLabel(options, value) {
  return options.find(([key]) => key === value)?.[1] || value
}

export function RiskLevelBadge({ level, score }) {
  const cls = level === 'critical'
    ? 'border-red-300/30 bg-red-300/10 text-red-100'
    : level === 'high'
      ? 'border-orange-300/30 bg-orange-300/10 text-orange-100'
      : level === 'medium'
        ? 'border-amber-300/30 bg-amber-300/10 text-amber-100'
        : 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{getRiskLevelLabel(level)} · {score}/100</span>
}

export function RiskStatusBadge({ status }) {
  const cls = status === 'completed'
    ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100'
    : status === 'review'
      ? 'border-[#D6A84F]/30 bg-[#D6A84F]/10 text-[#F7D784]'
      : status === 'in_progress'
        ? 'border-sky-300/25 bg-sky-300/10 text-sky-100'
        : 'border-white/10 bg-white/5 text-white/70'

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${cls}`}>{getOptionLabel(riskStatuses, status)}</span>
}

export function RiskObjectCard({ item }) {
  return (
    <Link href={`/analyst/risk-intelligence/${item.id}`} className="group block rounded-[32px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-sky-300/30">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <RiskStatusBadge status={item.status} />
        <RiskLevelBadge level={item.risk_level} score={item.risk_score} />
      </div>
      <div className="mt-6 text-sm text-white/40">{item.source_request_id || item.id}</div>
      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{item.name}</h3>
      <p className="mt-3 text-sm text-sky-200/70">{getOptionLabel(riskObjectTypes, item.object_type)}</p>
      <p className="mt-4 text-sm leading-7 text-white/58">{item.description}</p>
      <div className="mt-6 grid gap-2 text-sm text-white/50">
        <div>Красные флаги: <span className="text-white/75">{item.red_flags_count}</span></div>
        <div>Создано: <span className="text-white/75">{item.created_at}</span></div>
      </div>
      <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
        Открыть объект
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm text-white/55">
      {label}
      {children}
    </label>
  )
}

export function SelectField({ value, onChange, options }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className="rounded-2xl border border-white/10 bg-[#07101f] p-4 text-white outline-none focus:border-sky-300/40">
      {options.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
    </select>
  )
}

export function SignalForm({ onAdd }) {
  const empty = { category: 'reputation', title: '', description: '', severity: 'medium', confidence: 'medium', source: '' }
  const [form, setForm] = useState(empty)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
      <div className="text-sm uppercase tracking-[0.22em] text-sky-300/80">Добавить сигнал риска</div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Категория"><SelectField value={form.category} onChange={(value) => update('category', value)} options={signalCategories} /></Field>
        <Field label="Источник"><input value={form.source} onChange={(event) => update('source', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Документ, открытый источник, заметка" /></Field>
        <Field label="Значимость"><SelectField value={form.severity} onChange={(value) => update('severity', value)} options={severityOptions} /></Field>
        <Field label="Уверенность"><SelectField value={form.confidence} onChange={(value) => update('confidence', value)} options={confidenceOptions} /></Field>
        <Field label="Название"><input value={form.title} onChange={(event) => update('title', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Например: возможный конфликт интересов" /></Field>
        <Field label="Описание"><input value={form.description} onChange={(event) => update('description', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Кратко и без обвинительных формулировок" /></Field>
      </div>
      <button type="button" onClick={() => { if (!form.title.trim()) return; onAdd(form); setForm(empty) }} className="mt-5 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white">Добавить сигнал</button>
    </div>
  )
}

export function ConnectionForm({ onAdd }) {
  const empty = { target_name: '', target_type: 'company', relation_type: 'affiliated_with', strength: 'medium', description: '' }
  const [form, setForm] = useState(empty)
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6">
      <div className="text-sm uppercase tracking-[0.22em] text-[#F7D784]/80">Добавить связь</div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Связанный объект"><input value={form.target_name} onChange={(event) => update('target_name', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Компания, телефон, домен, человек" /></Field>
        <Field label="Тип"><SelectField value={form.target_type} onChange={(value) => update('target_type', value)} options={connectionTargetTypes} /></Field>
        <Field label="Связь"><SelectField value={form.relation_type} onChange={(value) => update('relation_type', value)} options={relationTypes} /></Field>
        <Field label="Сила связи"><SelectField value={form.strength} onChange={(value) => update('strength', value)} options={strengthOptions} /></Field>
        <div className="md:col-span-2"><Field label="Описание"><input value={form.description} onChange={(event) => update('description', event.target.value)} className="w-full rounded-2xl border border-white/10 bg-black/25 p-4 text-white outline-none focus:border-sky-300/40" placeholder="Почему эта связь важна для анализа" /></Field></div>
      </div>
      <button type="button" onClick={() => { if (!form.target_name.trim()) return; onAdd(form); setForm(empty) }} className="mt-5 rounded-2xl bg-[#D6A84F] px-6 py-3 text-sm font-semibold text-[#050816]">Добавить связь</button>
    </div>
  )
}

export function SignalsList({ signals, onRemove }) {
  return (
    <div className="grid gap-3">
      {signals.map((signal) => (
        <div key={signal.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-white/88">{signal.title}</div>
              <div className="mt-2 text-xs text-sky-200/70">{getOptionLabel(signalCategories, signal.category)} · значимость: {getOptionLabel(severityOptions, signal.severity)} · уверенность: {getOptionLabel(confidenceOptions, signal.confidence)}</div>
            </div>
            <button type="button" onClick={() => onRemove(signal.id)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 hover:text-red-200"><Trash2 className="h-4 w-4" /></button>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/60">{signal.description}</p>
          {signal.source && <div className="mt-3 text-xs text-white/38">Источник: {signal.source}</div>}
        </div>
      ))}
    </div>
  )
}

export function ConnectionsMap({ connections, onRemove }) {
  return (
    <div className="grid gap-3">
      {connections.map((connection) => (
        <div key={connection.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]"><Network className="h-4 w-4" /></div>
              <div>
                <div className="font-semibold text-white/88">{connection.target_name}</div>
                <div className="mt-2 text-xs text-sky-200/70">{getOptionLabel(connectionTargetTypes, connection.target_type)} · {getOptionLabel(relationTypes, connection.relation_type)} · {getOptionLabel(strengthOptions, connection.strength)}</div>
              </div>
            </div>
            <button type="button" onClick={() => onRemove(connection.id)} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 hover:text-red-200"><Trash2 className="h-4 w-4" /></button>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/60">{connection.description}</p>
        </div>
      ))}
    </div>
  )
}

export function ReportPreview({ report }) {
  return (
    <div className="rounded-[30px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.06] p-6">
      <div className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[#F7D784]/80"><FileText className="h-4 w-4" /> Шаблонный отчет</div>
      <pre className="max-h-[620px] overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/72">{report.clientReportDraft}</pre>
    </div>
  )
}
