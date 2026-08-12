import Link from 'next/link'
import { useRouter } from 'next/router'
import { detectSiteLanguage } from '@/lib/languageRoutes.mjs'

export default function GlobalHomeEmblem() {
  const router = useRouter()
  const language = detectSiteLanguage(router.pathname, router.asPath)

  return (
    <Link href={language === 'en' ? '/en' : '/'} className="global-home-emblem" aria-label={language === 'en' ? 'HEIMDALL home' : 'HEIMDALL - на главную'}>
      <img src="/heimdall-logo-mark.png" alt="" />
    </Link>
  )
}
