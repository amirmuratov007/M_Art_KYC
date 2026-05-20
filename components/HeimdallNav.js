import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'

export default function HeimdallNav({ language = 'ru' }) {
  const ru = language === 'ru'
  const links = ru
    ? [['Платформа','/intelligence-dashboard'],['Методология','/methodology'],['Кейсы','/cases'],['Журнал','/journal'],['Отрасли','/sectors'],['Прайс-лист','/pricing']]
    : [['Platform','/intelligence-dashboard-en'],['Methodology','/methodology-en'],['Cases','/cases-en'],['Journal','/journal-en'],['Sectors','/sectors-en'],['Pricing','/pricing-en']]

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <HeimdallLogo />

        <nav className="hidden gap-6 lg:flex">
          {links.map(([name, href]) => (
            <Link key={href} href={href} className="text-sm text-white/60 transition hover:text-[#F7D784]">
              {name}
            </Link>
          ))}
        </nav>

        <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white">
          {ru ? 'Связаться' : 'Contact'}
        </Link>
      </div>
    </header>
  )
}
