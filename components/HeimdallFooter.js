import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'

export default function HeimdallFooter({ language = 'ru' }) {
  const ru = language === 'ru'

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050816] px-5 py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <HeimdallLogo href={ru ? '/' : '/en'} />
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/58 sm:text-base">
            {ru
              ? 'Корпоративная разведка, проверка рисков, due diligence, информационная безопасность и конфиденциальная аналитика для сделок, закупок, найма и партнерств.'
              : 'Corporate intelligence, risk review, due diligence, information security and confidential analytics for deals, procurement, hiring and partnerships.'}
          </p>

          <div className="mt-6 grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.045] p-5 text-sm leading-7 text-white/64">
            <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]">{ru ? 'Контакты' : 'Contacts'}</div>
            <a href="tel:+79686384959" className="break-words transition hover:text-sky-200">8 968 638-49-59</a>
            <a href="mailto:a.muradov@heimdall-group.ru" className="break-words transition hover:text-sky-200">a.muradov@heimdall-group.ru</a>
            <div className="text-white/45">{ru ? 'Временные контакты для связи и обработки обращений.' : 'Temporary contacts for requests and communications.'}</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/62 sm:text-sm">
            {(ru
              ? ['1000+ источников', '24-72 часа', 'Конфиденциальный формат', 'Trust Center']
              : ['1000+ sources', '24-72 hours', 'Confidential workflow', 'Trust Center']
            ).map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="grid content-start gap-3 text-sm">
            <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]">{ru ? 'Материалы' : 'Resources'}</div>
            <Link href={ru ? '/cases' : '/cases-en'} className="text-white/58 transition hover:text-sky-200">{ru ? 'Кейсы' : 'Cases'}</Link>
            <Link href={ru ? '/journal' : '/journal-en'} className="text-white/58 transition hover:text-sky-200">Journal</Link>
            <a href="https://t.me/heimdall_risk" target="_blank" rel="noreferrer" className="text-white/58 transition hover:text-sky-200">{ru ? 'Telegram-канал' : 'Telegram channel'}</a>
            {ru && <Link href="/security-checklist" className="text-white/58 transition hover:text-sky-200">50 пунктов безопасности</Link>}
            {ru && <Link href="/security-audit" className="text-white/58 transition hover:text-sky-200">Аудит безопасности</Link>}
            <Link href={ru ? '/methodology' : '/methodology-en'} className="text-white/58 transition hover:text-sky-200">{ru ? 'Методология' : 'Methodology'}</Link>
            <Link href={ru ? '/trust-center' : '/trust-center-en'} className="text-white/58 transition hover:text-sky-200">{ru ? 'Центр доверия' : 'Trust Center'}</Link>
          </div>

          <div className="grid content-start gap-3 text-sm">
            <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]">{ru ? 'Доверие' : 'Trust'}</div>
            <Link href={ru ? '/data-sources' : '/data-sources-en'} className="text-white/58 transition hover:text-sky-200">{ru ? 'Источники данных' : 'Data Sources'}</Link>
            {ru && <Link href="/risk-command-center" className="text-white/58 transition hover:text-sky-200">Центр управления рисками</Link>}
            <Link href={ru ? '/proverka-prodavca-pered-pokupkoy' : '/services-en'} className="text-white/58 transition hover:text-sky-200">{ru ? 'Проверка продавца' : 'Seller check'}</Link>
            <Link href={ru ? '/privacy' : '/privacy-en'} className="text-white/58 transition hover:text-sky-200">{ru ? 'Конфиденциальность' : 'Privacy'}</Link>
            <Link href={ru ? '/faq' : '/faq-en'} className="text-white/58 transition hover:text-sky-200">FAQ</Link>
            <Link href={ru ? '/sample-reports' : '/sample-reports-en'} className="text-white/58 transition hover:text-sky-200">{ru ? 'Примеры отчётов' : 'Sample reports'}</Link>
          </div>

          <div className="grid content-start gap-3 text-sm">
            <div className="text-xs uppercase tracking-[0.22em] text-[#F7D784]">{ru ? 'Документы' : 'Legal'}</div>
            <Link href="/personal-data-policy" className="text-white/58 transition hover:text-sky-200">{ru ? 'Персональные данные' : 'Personal data'}</Link>
            <Link href="/privacy" className="text-white/58 transition hover:text-sky-200">{ru ? 'Политика конфиденциальности' : 'Privacy policy'}</Link>
            <Link href="/requisites" className="text-white/58 transition hover:text-sky-200">{ru ? 'Реквизиты' : 'Company details'}</Link>
            <Link href="/nda-template" className="text-white/58 transition hover:text-sky-200">{ru ? 'Пример NDA' : 'NDA template'}</Link>
            {ru && <Link href="/contact" className="text-white/58 transition hover:text-sky-200">Контакты</Link>}
            <Link href="/terms" className="text-white/58 transition hover:text-sky-200">{ru ? 'Условия сайта' : 'Terms'}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
