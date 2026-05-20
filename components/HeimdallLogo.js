import Link from 'next/link'

export default function HeimdallLogo({ href = '/', compact = false }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-3">
      <img
        src="/heimdall-logo-mark.svg"
        alt="HEIMDALL"
        className="h-11 w-11 shrink-0 rounded-2xl shadow-[0_0_28px_rgba(214,168,79,0.18)]"
      />

      {!compact && (
        <div>
          <div className="text-xl font-semibold tracking-[0.34em] text-white transition group-hover:text-[#F7D784]">
            HEIMDALL
          </div>

          <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#D6A84F]/70">
            Intelligence Group
          </div>
        </div>
      )}
    </Link>
  )
}
