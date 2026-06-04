import Link from 'next/link'

export default function HeimdallLogo({ href = '/', compact = false }) {
  const src = compact ? '/heimdall-logo-mark.png' : '/heimdall-logo-full.png'

  return (
    <Link href={href} className="group inline-flex items-center">
      <img
        src={src}
        alt="HEIMDALL"
        className={compact ? 'h-11 w-auto shrink-0' : 'h-12 w-auto shrink-0 sm:h-14'}
      />
    </Link>
  )
}
