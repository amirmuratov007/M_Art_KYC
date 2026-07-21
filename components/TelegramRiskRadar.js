import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck2,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  History,
  Home,
  House,
  Info,
  LockKeyhole,
  Medal,
  MessageCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  Target,
  UserRoundSearch,
  X
} from 'lucide-react'
import {
  RISK_RADAR_STORAGE_KEY,
  calculateRiskResult,
  calculateStreak,
  createEmptyRiskRadarProgress,
  getDailyRiskCase,
  getDateKey,
  getRiskLevelMeta,
  getRiskRank,
  normalizeRiskRadarProgress,
  riskRadarScenarios
} from '@/lib/riskRadar'

const iconMap = {
  building: Building2,
  user: UserRoundSearch,
  house: House,
  car: Car
}

const toneMap = {
  teal: 'border-teal-300/25 bg-teal-300/10 text-teal-100',
  coral: 'border-rose-300/25 bg-rose-300/10 text-rose-100',
  amber: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
  sky: 'border-sky-300/25 bg-sky-300/10 text-sky-100'
}

const levelMap = {
  low: {
    className: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100',
    bar: 'bg-emerald-300'
  },
  medium: {
    className: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
    bar: 'bg-amber-300'
  },
  high: {
    className: 'border-rose-300/25 bg-rose-300/10 text-rose-100',
    bar: 'bg-rose-300'
  }
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value))
  } catch (_) {
    return ''
  }
}

function triggerHaptic(webApp, type = 'selection') {
  if (!webApp || (!webApp.initData && webApp.platform === 'unknown')) return
  try {
    if (type === 'success') webApp?.HapticFeedback?.notificationOccurred('success')
    else if (type === 'warning') webApp?.HapticFeedback?.notificationOccurred('warning')
    else webApp?.HapticFeedback?.selectionChanged()
  } catch (_) {}
}

function AppHeader({ telegramUser, isInsideTelegram, onReset }) {
  const firstName = telegramUser?.first_name || ''

  return (
    <header className="sticky z-30 border-b border-white/10 bg-[#050816]/95 px-4 py-3 backdrop-blur-xl" style={{ top: 'var(--tg-content-safe-area-inset-top, 0px)' }}>
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
        <button type="button" onClick={onReset} className="flex min-w-0 items-center gap-3 text-left" aria-label="На главный экран">
          <img src="/heimdall-logo-mark.png" alt="" className="h-9 w-9 shrink-0 object-contain" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">HEIMDALL Риск-радар</span>
            <span className="block truncate text-xs text-white/45">{firstName ? `${firstName}, проверим решение` : 'Проверим решение до действия'}</span>
          </span>
        </button>
        <div className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium ${isInsideTelegram ? 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100' : 'border-sky-300/20 bg-sky-300/10 text-sky-100'}`}>
          <span className={`h-2 w-2 rounded-full ${isInsideTelegram ? 'bg-emerald-300' : 'bg-sky-300'}`} />
          {isInsideTelegram ? 'Telegram' : 'Веб-режим'}
        </div>
      </div>
    </header>
  )
}

function BottomTabs({ active, onChange }) {
  const tabs = [
    ['home', Home, 'Радар'],
    ['daily', Target, 'Кейс дня'],
    ['history', History, 'История']
  ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050816]/96 px-3 pt-2 backdrop-blur-xl"
      style={{ paddingBottom: 'max(8px, var(--tg-content-safe-area-inset-bottom, 8px))' }}
      aria-label="Разделы приложения"
    >
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-1">
        {tabs.map(([id, Icon, label]) => {
          const selected = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition ${selected ? 'bg-white/10 text-white' : 'text-white/45 hover:bg-white/[0.05] hover:text-white/75'}`}
              aria-current={selected ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function HomeView({ progress, dailyCompleted, onScenario, onDaily }) {
  const completed = progress.assessments.length
  const streak = calculateStreak(Object.keys(progress.daily))
  const rank = getRiskRank(progress.xp)

  return (
    <div className="mx-auto max-w-xl px-4 pb-28 pt-5">
      <section className="border-b border-white/10 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F7D784]">Экспресс-оценка</div>
            <h1 className="mt-2 !text-2xl !leading-tight !tracking-normal font-semibold text-white">Что проверяем сегодня</h1>
            <p className="mt-2 text-sm leading-6 text-white/55">Выберите ситуацию. Ответы останутся на этом устройстве.</p>
          </div>
          <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-teal-200" />
        </div>
      </section>

      <section className="grid grid-cols-3 border-b border-white/10 py-4" aria-label="Прогресс">
        <div className="border-r border-white/10 px-2 text-center">
          <div className="text-xl font-semibold text-white">{completed}</div>
          <div className="mt-1 text-[11px] text-white/45">проверок</div>
        </div>
        <div className="border-r border-white/10 px-2 text-center">
          <div className="text-xl font-semibold text-white">{streak}</div>
          <div className="mt-1 text-[11px] text-white/45">дней подряд</div>
        </div>
        <div className="px-2 text-center">
          <div className="truncate text-xs font-semibold text-[#F7D784]">{rank.title}</div>
          <div className="mt-1 text-[11px] text-white/45">{progress.xp} баллов</div>
        </div>
      </section>

      <section className="py-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {riskRadarScenarios.map((scenario) => {
            const Icon = iconMap[scenario.icon] || Activity
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => onScenario(scenario.id)}
                className="group flex min-h-[132px] items-start gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-4 text-left transition hover:border-white/20 hover:bg-white/[0.075] active:scale-[0.99]"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${toneMap[scenario.color]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold text-white">{scenario.title}</span>
                  <span className="mt-2 block text-xs leading-5 text-white/50">{scenario.short}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#F7D784]">
                    Начать <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="rounded-lg border border-[#D6A84F]/25 bg-[#D6A84F]/10 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D6A84F] text-[#06101e]">
            <Target className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-medium text-[#F7D784]">
              Кейс дня
              {dailyCompleted && <CheckCircle2 className="h-4 w-4" />}
            </div>
            <div className="mt-1 text-base font-semibold text-white">Одно решение без права на подсказку</div>
            <p className="mt-2 text-xs leading-5 text-white/55">Практическая ситуация, объяснение ответа и баллы к вашему званию.</p>
            <button type="button" onClick={onDaily} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
              {dailyCompleted ? 'Посмотреть разбор' : 'Принять решение'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="mt-5 flex items-start gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-xs leading-5 text-white/45">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-teal-200" />
        Экспресс-оценка не заменяет юридическое заключение или полноценную проверку HEIMDALL.
      </div>
    </div>
  )
}

function ScenarioFlow({ scenario, step, answers, result, onAnswer, onNext, onBack, onRestart, onLead, onShare }) {
  if (result) {
    const meta = getRiskLevelMeta(result.level)
    const tone = levelMap[result.level]

    return (
      <div className="mx-auto max-w-xl px-4 pb-28 pt-4">
        <button type="button" onClick={onBack} className="mb-5 inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-white/65">
          <ArrowLeft className="h-4 w-4" /> На главный экран
        </button>

        <section className="border-b border-white/10 pb-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">{scenario.title}</div>
              <div className="mt-2 text-4xl font-semibold text-white">{result.score}<span className="text-lg text-white/35"> / 100</span></div>
            </div>
            <BarChart3 className="h-9 w-9 text-[#F7D784]" />
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${Math.max(result.score, 4)}%` }} />
          </div>
          <div className={`mt-4 rounded-lg border px-4 py-3 ${tone.className}`}>
            <div className="text-sm font-semibold">{meta.label}</div>
            <div className="mt-1 text-xs leading-5 opacity-75">{meta.short}</div>
          </div>
          <p className="mt-4 text-sm leading-6 text-white/60">{meta.recommendation}</p>
        </section>

        <section className="py-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="!text-lg !leading-tight !tracking-normal font-semibold text-white">Риск-сигналы</h2>
            <span className="text-xs text-white/40">{result.signals.length}</span>
          </div>
          {result.signals.length ? (
            <div className="mt-3 grid gap-2">
              {result.signals.map((signal) => (
                <div key={signal} className="flex items-start gap-3 rounded-lg border border-rose-300/15 bg-rose-300/[0.07] px-3 py-3 text-sm leading-5 text-rose-50">
                  <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-200" />
                  {signal}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-3 text-sm leading-5 text-emerald-50">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
              Существенных сигналов в ответах нет. Сохраните подтверждающие документы.
            </div>
          )}
        </section>

        <section className="border-t border-white/10 py-5">
          <h2 className="!text-lg !leading-tight !tracking-normal font-semibold text-white">Что сделать дальше</h2>
          <div className="mt-3 grid gap-3">
            {(result.actions.length ? result.actions : ['Завершить стандартную проверку по официальным источникам', 'Сохранить документы и подтверждения, на которых основано решение']).map((action, index) => (
              <div key={action} className="flex items-start gap-3 text-sm leading-6 text-white/65">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal-300/25 bg-teal-300/10 text-xs font-semibold text-teal-100">{index + 1}</span>
                {action}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-3 border-t border-white/10 pt-5">
          <button type="button" onClick={onLead} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#D6A84F] px-4 py-3 text-sm font-semibold text-[#06101e] transition hover:bg-[#F7D784]">
            <ShieldCheck className="h-5 w-5" /> Заказать полную проверку
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={onShare} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 text-sm text-white/75">
              <Send className="h-4 w-4" /> Поделиться
            </button>
            <button type="button" onClick={onRestart} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 text-sm text-white/75">
              <RotateCcw className="h-4 w-4" /> Ещё раз
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = scenario.questions[step]
  const selected = answers[question.id]
  const percent = Math.round(((step + 1) / scenario.questions.length) * 100)

  return (
    <div className="mx-auto max-w-xl px-4 pb-28 pt-4">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-white/65">
          <ArrowLeft className="h-4 w-4" /> Назад
        </button>
        <div className="text-xs font-medium text-white/45">{step + 1} из {scenario.questions.length}</div>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-teal-300 transition-all" style={{ width: `${percent}%` }} />
      </div>

      <section className="pt-8">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F7D784]">{scenario.title}</div>
        <h1 className="mt-3 !text-2xl !leading-snug !tracking-normal font-semibold text-white">{question.text}</h1>
        <p className="mt-3 text-sm leading-6 text-white/50">Выберите вариант, который точнее всего описывает текущую ситуацию.</p>
      </section>

      <div className="mt-6 grid gap-3" role="radiogroup" aria-label={question.text}>
        {question.options.map((option) => {
          const active = selected === option.id
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onAnswer(question.id, option.id)}
              className={`flex min-h-[62px] items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm leading-5 transition active:scale-[0.99] ${active ? 'border-teal-300/60 bg-teal-300/12 text-white' : 'border-white/10 bg-white/[0.045] text-white/68 hover:border-white/20'}`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${active ? 'border-teal-200 bg-teal-300 text-[#06101e]' : 'border-white/20'}`}>
                {active && <Check className="h-4 w-4" />}
              </span>
              {option.label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!selected}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#D6A84F] px-4 py-3 text-sm font-semibold text-[#06101e] transition hover:bg-[#F7D784] disabled:cursor-not-allowed disabled:opacity-35"
      >
        {step === scenario.questions.length - 1 ? 'Показать результат' : 'Следующий вопрос'}
        <ArrowRight className="h-4 w-4" />
      </button>

      <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-white/35">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        Не вводите ФИО, номера документов и другие персональные данные.
      </div>
    </div>
  )
}

function DailyView({ dailyCase, saved, selected, onSelect, onCheck, onShare }) {
  const completed = Boolean(saved)
  const choice = completed ? saved.choice : selected
  const correct = completed ? saved.correct : false

  return (
    <div className="mx-auto max-w-xl px-4 pb-28 pt-5">
      <section className="border-b border-white/10 pb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F7D784]">Кейс дня</div>
            <h1 className="mt-2 !text-2xl !leading-tight !tracking-normal font-semibold text-white">{dailyCase.title}</h1>
          </div>
          <CalendarCheck2 className="h-8 w-8 text-teal-200" />
        </div>
      </section>

      <p className="py-5 text-base leading-7 text-white/72">{dailyCase.story}</p>

      <div className="grid gap-3">
        {dailyCase.options.map((option) => {
          const active = choice === option.id
          const isCorrect = completed && option.id === dailyCase.correct
          const isWrong = completed && active && !correct
          return (
            <button
              key={option.id}
              type="button"
              disabled={completed}
              onClick={() => onSelect(option.id)}
              className={`flex min-h-[64px] items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm leading-5 transition ${isCorrect ? 'border-emerald-300/50 bg-emerald-300/10 text-emerald-50' : isWrong ? 'border-rose-300/45 bg-rose-300/10 text-rose-50' : active ? 'border-teal-300/55 bg-teal-300/10 text-white' : 'border-white/10 bg-white/[0.045] text-white/68'}`}
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${isCorrect ? 'border-emerald-200 bg-emerald-300 text-[#06101e]' : isWrong ? 'border-rose-200 bg-rose-300 text-[#06101e]' : active ? 'border-teal-200 bg-teal-300 text-[#06101e]' : 'border-white/20'}`}>
                {(active || isCorrect) && <Check className="h-4 w-4" />}
              </span>
              {option.label}
            </button>
          )
        })}
      </div>

      {!completed && (
        <button type="button" disabled={!selected} onClick={onCheck} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#D6A84F] px-4 py-3 text-sm font-semibold text-[#06101e] disabled:opacity-35">
          Проверить решение <Target className="h-4 w-4" />
        </button>
      )}

      {completed && (
        <section className={`mt-6 rounded-lg border p-4 ${correct ? 'border-emerald-300/25 bg-emerald-300/[0.08]' : 'border-amber-300/25 bg-amber-300/[0.08]'}`}>
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            {correct ? <CheckCircle2 className="h-5 w-5 text-emerald-200" /> : <CircleAlert className="h-5 w-5 text-amber-200" />}
            {correct ? 'Верное решение. +20 баллов' : 'Не самый безопасный вариант. +8 баллов за разбор'}
          </div>
          <p className="mt-3 text-sm leading-6 text-white/65">{dailyCase.explanation}</p>
          <button type="button" onClick={onShare} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-white/75">
            <Send className="h-4 w-4" /> Поделиться результатом
          </button>
        </section>
      )}

      <div className="mt-5 flex items-start gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-xs leading-5 text-white/45">
        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
        Новый кейс открывается каждый день. За правильный ответ начисляется 20 баллов.
      </div>
    </div>
  )
}

function HistoryView({ progress }) {
  const rank = getRiskRank(progress.xp)
  const streak = calculateStreak(Object.keys(progress.daily))
  const nextProgress = rank.nextAt ? Math.min(100, Math.round((progress.xp / rank.nextAt) * 100)) : 100
  const dailyAnswers = Object.values(progress.daily)
  const correctDaily = dailyAnswers.filter((item) => item.correct).length

  return (
    <div className="mx-auto max-w-xl px-4 pb-28 pt-5">
      <section className="border-b border-white/10 pb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F7D784]">Личный прогресс</div>
            <h1 className="mt-2 !text-2xl !leading-tight !tracking-normal font-semibold text-white">{rank.title}</h1>
          </div>
          <Medal className="h-9 w-9 text-[#F7D784]" />
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#D6A84F]" style={{ width: `${nextProgress}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-white/40">
          <span>{progress.xp} баллов</span>
          <span>{rank.nextAt ? `${rank.nextAt} до нового звания` : 'Высшее звание'}</span>
        </div>
      </section>

      <section className="grid grid-cols-3 border-b border-white/10 py-4">
        <div className="border-r border-white/10 px-2 text-center">
          <div className="text-xl font-semibold text-white">{progress.assessments.length}</div>
          <div className="mt-1 text-[11px] text-white/45">оценок</div>
        </div>
        <div className="border-r border-white/10 px-2 text-center">
          <div className="text-xl font-semibold text-white">{correctDaily}</div>
          <div className="mt-1 text-[11px] text-white/45">кейсов верно</div>
        </div>
        <div className="px-2 text-center">
          <div className="text-xl font-semibold text-white">{streak}</div>
          <div className="mt-1 text-[11px] text-white/45">серия дней</div>
        </div>
      </section>

      <section className="py-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="!text-lg !leading-tight !tracking-normal font-semibold text-white">Последние проверки</h2>
          <Activity className="h-5 w-5 text-teal-200" />
        </div>

        {progress.assessments.length ? (
          <div className="mt-3 grid gap-2">
            {progress.assessments.slice(0, 10).map((item) => {
              const meta = getRiskLevelMeta(item.level)
              const tone = levelMap[item.level]
              return (
                <div key={item.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold ${tone.className}`}>{item.score}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1 truncate text-xs text-white/40">{meta.label} · {formatDate(item.createdAt)}</div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="mt-3 rounded-lg border border-dashed border-white/15 px-4 py-7 text-center">
            <History className="mx-auto h-7 w-7 text-white/30" />
            <div className="mt-3 text-sm font-medium text-white/70">История пока пуста</div>
            <p className="mt-2 text-xs leading-5 text-white/40">Завершите первую экспресс-оценку, и результат появится здесь.</p>
          </div>
        )}
      </section>

      <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-xs leading-5 text-white/45">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-teal-200" />
        История хранится локально в браузере Telegram и не содержит введённых персональных данных.
      </div>
    </div>
  )
}

function LeadSheet({ open, scenario, result, telegram, form, status, error, onChange, onClose, onSubmit }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 px-2 pt-10 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-labelledby="lead-title">
      <div className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-lg border border-white/12 bg-[#08111f] p-4 shadow-[0_-24px_80px_rgba(0,0,0,0.45)] sm:rounded-lg sm:p-5">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F7D784]">HEIMDALL</div>
            <h2 id="lead-title" className="mt-2 !text-xl !leading-tight !tracking-normal font-semibold text-white">Запросить полную проверку</h2>
            <p className="mt-2 text-xs leading-5 text-white/45">{scenario?.title || 'Индивидуальная задача'}{result ? ` · риск ${result.score}/100` : ''}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/55" aria-label="Закрыть">
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto h-11 w-11 text-emerald-200" />
            <div className="mt-4 text-lg font-semibold text-white">Запрос принят</div>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/55">Мы получили результат и свяжемся с вами по указанному контакту.</p>
            <button type="button" onClick={onClose} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#D6A84F] px-5 text-sm font-semibold text-[#06101e]">Готово</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3 pt-4">
            <label className="grid gap-1.5 text-xs font-medium text-white/55">
              Имя
              <input required value={form.name} onChange={(event) => onChange('name', event.target.value)} className="h-12 rounded-lg border border-white/10 bg-black/25 px-3 text-base text-white outline-none focus:border-teal-300/45" autoComplete="name" />
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-white/55">
              Телефон, email или Telegram
              <input required value={form.contact} onChange={(event) => onChange('contact', event.target.value)} className="h-12 rounded-lg border border-white/10 bg-black/25 px-3 text-base text-white outline-none focus:border-teal-300/45" autoComplete="email" />
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-white/55">
              Компания, если есть
              <input value={form.company} onChange={(event) => onChange('company', event.target.value)} className="h-12 rounded-lg border border-white/10 bg-black/25 px-3 text-base text-white outline-none focus:border-teal-300/45" autoComplete="organization" />
            </label>
            <label className="grid gap-1.5 text-xs font-medium text-white/55">
              Короткий комментарий
              <textarea value={form.comment} onChange={(event) => onChange('comment', event.target.value)} rows={3} className="resize-none rounded-lg border border-white/10 bg-black/25 px-3 py-3 text-base text-white outline-none focus:border-teal-300/45" placeholder="Что проверяем и какое решение нужно принять" />
            </label>
            <input tabIndex={-1} aria-hidden="true" value={form.website} onChange={(event) => onChange('website', event.target.value)} className="hidden" autoComplete="off" />

            <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-[11px] leading-5 text-white/40">
              <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Не отправляйте паспорта, номера карт и другие чувствительные данные. Для документов мы предложим защищённый канал.
            </div>

            {error && <div className="rounded-lg border border-rose-300/20 bg-rose-300/10 px-3 py-2.5 text-xs leading-5 text-rose-100">{error}</div>}

            <button disabled={status === 'loading'} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#D6A84F] px-4 text-sm font-semibold text-[#06101e] disabled:opacity-50">
              {status === 'loading' ? 'Отправляем...' : 'Отправить запрос'} <MessageCircle className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function TelegramRiskRadar() {
  const [tab, setTab] = useState('home')
  const [scenarioId, setScenarioId] = useState('')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [progress, setProgress] = useState(createEmptyRiskRadarProgress)
  const [progressReady, setProgressReady] = useState(false)
  const [dailyChoice, setDailyChoice] = useState('')
  const [telegram, setTelegram] = useState({ webApp: null, initData: '', user: null, isInside: false })
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadStatus, setLeadStatus] = useState('idle')
  const [leadError, setLeadError] = useState('')
  const [leadForm, setLeadForm] = useState({ name: '', contact: '', company: '', comment: '', website: '' })

  const todayKey = getDateKey()
  const dailyCase = useMemo(() => getDailyRiskCase(), [])
  const dailySaved = progress.daily[todayKey] || null
  const scenario = riskRadarScenarios.find((item) => item.id === scenarioId) || null

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RISK_RADAR_STORAGE_KEY)
      setProgress(normalizeRiskRadarProgress(stored ? JSON.parse(stored) : null))
    } catch (_) {
      setProgress(createEmptyRiskRadarProgress())
    } finally {
      setProgressReady(true)
    }
  }, [])

  useEffect(() => {
    if (!progressReady) return
    try {
      window.localStorage.setItem(RISK_RADAR_STORAGE_KEY, JSON.stringify(progress))
    } catch (_) {}
  }, [progress, progressReady])

  useEffect(() => {
    let cancelled = false

    const initialize = () => {
      if (cancelled) return
      const webApp = window.Telegram?.WebApp
      if (!webApp) return

      const isInside = Boolean(webApp.initData) || webApp.platform !== 'unknown'

      if (isInside) {
        try {
          webApp.ready()
          webApp.expand()
          webApp.setHeaderColor('#050816')
          webApp.setBackgroundColor('#050816')
          webApp.setBottomBarColor?.('#050816')
        } catch (_) {}
      }

      const user = webApp.initDataUnsafe?.user || null
      setTelegram({
        webApp,
        initData: webApp.initData || '',
        user,
        isInside
      })
      setLeadForm((current) => ({
        ...current,
        name: current.name || [user?.first_name, user?.last_name].filter(Boolean).join(' '),
        contact: current.contact || (user?.username ? `@${user.username}` : '')
      }))
    }

    const existing = document.querySelector('script[data-heimdall-telegram-webapp]')
    if (existing) {
      if (window.Telegram?.WebApp) initialize()
      else existing.addEventListener('load', initialize, { once: true })
    } else {
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-web-app.js?63'
      script.async = true
      script.dataset.heimdallTelegramWebapp = 'true'
      script.addEventListener('load', initialize, { once: true })
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
    }
  }, [])

  const resetHome = () => {
    setTab('home')
    setScenarioId('')
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  const handleBack = () => {
    if (leadOpen) {
      setLeadOpen(false)
      return
    }
    if (result) {
      resetHome()
      return
    }
    if (scenarioId && step > 0) {
      setStep((current) => current - 1)
      return
    }
    if (scenarioId) {
      resetHome()
      return
    }
    if (tab !== 'home') setTab('home')
  }

  useEffect(() => {
    const backButton = telegram.isInside ? telegram.webApp?.BackButton : null
    if (!backButton) return undefined
    const shouldShow = leadOpen || Boolean(scenarioId) || tab !== 'home'
    if (shouldShow) backButton.show()
    else backButton.hide()
    backButton.onClick(handleBack)
    return () => backButton.offClick(handleBack)
  }, [leadOpen, result, scenarioId, step, tab, telegram.isInside, telegram.webApp])

  const openScenario = (id) => {
    triggerHaptic(telegram.webApp)
    setScenarioId(id)
    setStep(0)
    setAnswers({})
    setResult(null)
    setTab('home')
  }

  const chooseAnswer = (questionId, optionId) => {
    triggerHaptic(telegram.webApp)
    setAnswers((current) => ({ ...current, [questionId]: optionId }))
  }

  const nextQuestion = () => {
    if (!scenario) return
    const currentQuestion = scenario.questions[step]
    if (!answers[currentQuestion.id]) return

    if (step < scenario.questions.length - 1) {
      setStep((current) => current + 1)
      return
    }

    const calculated = calculateRiskResult(scenario, answers)
    const assessment = {
      id: `${Date.now()}-${scenario.id}`,
      scenarioId: scenario.id,
      title: scenario.title,
      score: calculated.score,
      level: calculated.level,
      signals: calculated.signals.length,
      createdAt: new Date().toISOString()
    }

    setResult(calculated)
    setProgress((current) => ({
      ...current,
      xp: current.xp + 10,
      assessments: [assessment, ...current.assessments].slice(0, 30)
    }))
    triggerHaptic(telegram.webApp, calculated.level === 'high' ? 'warning' : 'success')
  }

  const restartScenario = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  const checkDaily = () => {
    if (!dailyChoice || dailySaved) return
    const correct = dailyChoice === dailyCase.correct
    setProgress((current) => ({
      ...current,
      xp: current.xp + (correct ? 20 : 8),
      daily: {
        ...current.daily,
        [todayKey]: {
          caseId: dailyCase.id,
          choice: dailyChoice,
          correct,
          completedAt: new Date().toISOString()
        }
      }
    }))
    triggerHaptic(telegram.webApp, correct ? 'success' : 'warning')
  }

  const share = (kind) => {
    const text = kind === 'daily'
      ? `Я прошёл кейс дня в HEIMDALL Риск-радаре. Результат: ${dailySaved?.correct ? 'верное решение' : 'разобрал новую ошибку'}.`
      : `Моя экспресс-оценка «${scenario?.title || 'Риск'}» в HEIMDALL Риск-радаре: ${result?.score || 0} из 100.`
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent('https://www.heimdall-group.ru/risk-radar')}&text=${encodeURIComponent(text)}`
    if (telegram.webApp?.openTelegramLink) telegram.webApp.openTelegramLink(shareUrl)
    else window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  const changeTab = (nextTab) => {
    triggerHaptic(telegram.webApp)
    setScenarioId('')
    setResult(null)
    setTab(nextTab)
  }

  const openLead = () => {
    setLeadStatus('idle')
    setLeadError('')
    setLeadOpen(true)
  }

  const updateLead = (field, value) => {
    setLeadForm((current) => ({ ...current, [field]: value }))
  }

  const submitLead = async (event) => {
    event.preventDefault()
    setLeadStatus('loading')
    setLeadError('')

    try {
      const response = await fetch('/api/telegram-miniapp-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          initData: telegram.initData,
          scenario: scenario?.subject || 'Общий запрос из Риск-радара',
          riskScore: result?.score ?? null,
          riskLevel: result?.level || '',
          signals: result?.signals || []
        })
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok) throw new Error(data.error || 'Не удалось отправить запрос')
      setLeadStatus('success')
      triggerHaptic(telegram.webApp, 'success')
    } catch (requestError) {
      setLeadStatus('error')
      setLeadError(requestError.message || 'Не удалось отправить запрос')
      triggerHaptic(telegram.webApp, 'warning')
    }
  }

  const activeTab = scenarioId ? 'home' : tab

  return (
    <main
      className="telegram-miniapp min-h-[100dvh] bg-[#050816] text-white"
      style={{
        paddingTop: 'var(--tg-content-safe-area-inset-top, 0px)',
        paddingLeft: 'var(--tg-content-safe-area-inset-left, 0px)',
        paddingRight: 'var(--tg-content-safe-area-inset-right, 0px)'
      }}
    >
      <AppHeader telegramUser={telegram.user} isInsideTelegram={telegram.isInside} onReset={resetHome} />

      {scenario ? (
        <ScenarioFlow
          scenario={scenario}
          step={step}
          answers={answers}
          result={result}
          onAnswer={chooseAnswer}
          onNext={nextQuestion}
          onBack={handleBack}
          onRestart={restartScenario}
          onLead={openLead}
          onShare={() => share('assessment')}
        />
      ) : tab === 'daily' ? (
        <DailyView
          dailyCase={dailyCase}
          saved={dailySaved}
          selected={dailyChoice}
          onSelect={(value) => {
            triggerHaptic(telegram.webApp)
            setDailyChoice(value)
          }}
          onCheck={checkDaily}
          onShare={() => share('daily')}
        />
      ) : tab === 'history' ? (
        <HistoryView progress={progress} />
      ) : (
        <HomeView progress={progress} dailyCompleted={Boolean(dailySaved)} onScenario={openScenario} onDaily={() => changeTab('daily')} />
      )}

      <BottomTabs active={activeTab} onChange={changeTab} />

      <LeadSheet
        open={leadOpen}
        scenario={scenario}
        result={result}
        telegram={telegram}
        form={leadForm}
        status={leadStatus}
        error={leadError}
        onChange={updateLead}
        onClose={() => setLeadOpen(false)}
        onSubmit={submitLead}
      />
    </main>
  )
}
