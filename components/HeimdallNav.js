import Link from 'next/link'

export default function HeimdallNav({ language = 'ru' }) {
  const ru = language === 'ru'
  const links = ru
    ? [['Платформа','/intelligence-dashboard'],['Методология','/methodology'],['Кейсы','/cases'],['Журнал','/journal'],['Отрасли','/sectors']]
    : [['Platform','/intelligence-dashboard-en'],['Methodology','/methodology-en'],['Cases','/cases-en'],['Journal','/journal-en'],['Sectors','/sectors-en']]

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link href="/" className="text-xl font-semibold tracking-[0.34em] text-white">HEIMDALL</Link>
        <nav className="hidden gap-6 lg:flex">
          {links.map(([name, href]) => <Link key={href} href={href} className="text-sm text-white/60 transition hover:text-sky-200">{name}</Link>)}
        </nav>
        <Link href="/#lead" className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white">{ru ? 'Связаться' : 'Contact'}</Link>
      </div>
    </header>
  )
}
