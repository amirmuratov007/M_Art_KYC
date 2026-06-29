import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import ContactModal from '@/components/ContactModal'
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone, ShieldCheck } from 'lucide-react'

const reasons = [
  'срочная проверка контрагента, продавца, кандидата или подрядчика',
  'аудит безопасности, доступов, подрядчиков и цифрового следа',
  'постоянное сопровождение собственника или компании',
  'внутреннее расследование, конфликт интересов или подозрение на мошенничество'
]

const contacts = [
  ['Телефон', '8 968 638-49-59', 'tel:+79686384959', Phone],
  ['Email', 'a.muradov@heimdall-group.ru', 'mailto:a.muradov@heimdall-group.ru', Mail],
  ['Telegram-канал', '@heimdall_risk', 'https://t.me/heimdall_risk', MessageCircle]
]

export default function ContactPage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Контакты | HEIMDALL</title>
        <meta name="description" content="Связаться с HEIMDALL: проверка контрагентов, кандидатов, продавцов недвижимости и авто, аудит безопасности, due diligence и сопровождение бизнеса." />
        <link rel="canonical" href="https://www.heimdall-group.ru/contact" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 py-20 md:py-24 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-[#F7D784]">
              <ShieldCheck className="h-4 w-4" /> Контакты HEIMDALL
            </div>
            <h1 className="mt-9 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">
              Опишите риск, мы предложим формат проверки
            </h1>
            <p className="mt-9 max-w-3xl text-xl leading-9 text-white/64">
              Напишите, кого или что нужно проверить: компанию, человека, продавца, подрядчика, сделку, доступы или цифровой периметр. Для старта достаточно короткого описания.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.28)]">
                Оставить заявку <ArrowRight className="h-4 w-4" />
              </button>
              <Link href="/services" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-7 py-4 font-semibold text-[#F7D784]">
                Все услуги
              </Link>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="grid gap-4">
              {contacts.map(([label, value, href, Icon]) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="flex items-start gap-4 rounded-[28px] border border-white/10 bg-black/20 p-5 transition hover:border-sky-300/35">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-[#F7D784]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm uppercase tracking-[0.18em] text-white/45">{label}</span>
                    <span className="mt-2 block break-words text-lg font-semibold text-white">{value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24">
          <div className="grid gap-8 rounded-[42px] border border-[#D6A84F]/20 bg-[#D6A84F]/[0.07] p-8 backdrop-blur-2xl md:p-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[#F7D784]/80">Когда писать</div>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Лучше спросить до оплаты, доступа или подписи</h2>
            </div>
            <div className="grid gap-3">
              {reasons.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/72">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} language="ru" defaultTopic="Запрос с контактной страницы" />
    </>
  )
}
