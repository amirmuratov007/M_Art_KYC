import Link from 'next/link'

export default function HeimdallLogo({ href = '/', compact = false }) {
  const src = compact ? '/heimdall-logo-mark.png' : '/heimdall-logo-full.png'

  return (
    <Link href={href} className="group inline-flex items-center">
      <img
        src={src}
        alt="HEIMDALL"
        className={compact ? 'h-11 w-auto max-w-[64px] shrink-0' : 'h-10 w-auto max-w-[190px] shrink-0 sm:h-14 sm:max-w-[260px] lg:max-w-none'}
      />
    </Link>
  )
}
