export function HeimdallFrame({ children, className = '' }) {
  return (
    <main className={`min-h-screen overflow-hidden bg-[#0b0f14] text-white ${className}`}>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b0f14_0%,#111827_52%,#0b0f14_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[linear-gradient(115deg,rgba(214,168,79,0.18),transparent_28%,rgba(56,189,248,0.12)_58%,transparent_80%)]" />
        <div className="absolute inset-x-0 top-[560px] h-px bg-gradient-to-r from-transparent via-[#d6a84f]/35 to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </main>
  )
}

export function SectionHeader({ eyebrow, title, text, dark = false }) {
  return (
    <div className="mx-auto mb-10 max-w-4xl text-center">
      {eyebrow ? (
        <div className={`text-xs font-semibold uppercase tracking-[0.24em] ${dark ? 'text-[#d6a84f]' : 'text-[#8b6a24]'}`}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className={`mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl ${dark ? 'text-white' : 'text-[#111827]'}`}>
        {title}
      </h2>
      {text ? (
        <p className={`mt-5 text-base leading-8 sm:text-lg ${dark ? 'text-white/64' : 'text-slate-600'}`}>
          {text}
        </p>
      ) : null}
    </div>
  )
}

export function DecisionCard({ title, text, meta }) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      {meta ? <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6a24]">{meta}</div> : null}
      <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#111827]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  )
}
