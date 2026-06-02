import Link from 'next/link'
export default function HeimdallFooter({ language = 'ru' }) {
  const ru = language === 'ru'
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050816] px-5 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="text-2xl font-semibold tracking-[0.34em]">HEIMDALL</div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">{ru ? 'Корпоративная разведка, проверка рисков и конфиденциальная аналитика.' : 'Corporate intelligence, risk review and confidential analytics.'}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Link href={ru ? '/cases' : '/cases-en'} className="text-white/55 hover:text-sky-200">{ru ? 'Кейсы' : 'Cases'}</Link>
          <Link href={ru ? '/journal' : '/journal-en'} className="text-white/55 hover:text-sky-200">{ru ? 'Журнал' : 'Journal'}</Link>
          <Link href={ru ? '/methodology' : '/methodology-en'} className="text-white/55 hover:text-sky-200">{ru ? 'Методология' : 'Methodology'}</Link>
          <Link href={ru ? '/trust-center' : '/trust-center-en'} className="text-white/55 hover:text-sky-200">{ru ? 'Центр доверия' : 'Trust Center'}</Link>
          <Link href={ru ? '/data-sources' : '/data-sources-en'} className="text-white/55 hover:text-sky-200">{ru ? 'Источники данных' : 'Data Sources'}</Link>
          <Link href={ru ? '/privacy' : '/privacy-en'} className="text-white/55 hover:text-sky-200">{ru ? 'Конфиденциальность' : 'Privacy'}</Link>
          <Link href={ru ? '/faq' : '/faq-en'} className="text-white/55 hover:text-sky-200">FAQ</Link>
          <Link href={ru ? '/sample-reports' : '/sample-reports-en'} className="text-white/55 hover:text-sky-200">{ru ? 'Примеры отчётов' : 'Sample reports'}</Link>
        </div>
      </div>
    </footer>
  )
}
