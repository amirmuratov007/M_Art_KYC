import Head from 'next/head'
import Link from 'next/link'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import PWAInstallButton from '@/components/PWAInstallButton'
import { ArrowRight, CheckCircle2, Download, KeyRound, ShieldCheck, Smartphone } from 'lucide-react'

const installSteps = [
  ['1', 'Откройте на телефоне', 'Перейдите на эту страницу с iPhone или Android. На компьютере можно проверить вход, но установка нужна именно на телефоне.'],
  ['2', 'Установите приложение', 'Нажмите кнопку установки. Если браузер не показывает системную кнопку, используйте меню браузера или кнопку “Поделиться” в Safari.'],
  ['3', 'Войдите по договору', 'Клиент вводит email и пароль, которые HEIMDALL выдает после заключения договора сопровождения.']
]

export default function AppDownloadPage() {
  return (
    <>
      <Head>
        <title>Установить клиентское приложение | HEIMDALL</title>
        <meta name="description" content="Клиентское приложение HEIMDALL: вход по договору, проверки, статусы, отчеты и новые запросы с телефона." />
        <link rel="canonical" href="https://www.heimdall-group.ru/app-download" />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.24),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.16),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>

        <HeimdallNav language="ru" />

        <section className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-sm uppercase tracking-[0.24em] text-[#F7D784]">
              <Download className="h-4 w-4" />
              HEIMDALL Client App
            </div>

            <h1 className="mt-8 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl">
              Установить клиентское приложение
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/64 sm:text-xl sm:leading-9">
              Рабочий вход для клиентов HEIMDALL: проверки, статусы, отчеты и новые запросы. Приложение устанавливается на телефон как PWA и открывает реальный личный кабинет.
            </p>

            <div className="mt-9 grid max-w-xl gap-4 sm:grid-cols-2">
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]">
                Открыть приложение
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/account" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-7 py-4 font-semibold text-white">
                Войти в кабинет
              </Link>
            </div>

            <div className="mt-6 max-w-xl">
              <PWAInstallButton language="ru" />
            </div>

            <div className="mt-6 grid max-w-xl gap-3 text-sm leading-7 text-white/62">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <KeyRound className="mt-1 h-4 w-4 shrink-0 text-[#F7D784]" />
                Логин и пароль выдает HEIMDALL после заключения договора сопровождения.
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-sky-300" />
                Клиент видит только свои проверки, отчеты и заявки.
              </div>
            </div>
          </div>

          <div className="rounded-[42px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
            <div className="rounded-[34px] border border-[#D6A84F]/20 bg-[#07101f]/90 p-7">
              <img src="/heimdall-logo-mark.png" alt="HEIMDALL" className="mx-auto w-full max-w-[360px]" />
              <div className="mt-7 grid gap-3">
                {installSteps.map(([step, title, text]) => (
                  <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-sm font-semibold text-[#F7D784]">{step}</div>
                    <div>
                      <div className="font-semibold text-white">{title}</div>
                      <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-5">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['iPhone', 'Safari -> Поделиться -> На экран “Домой”.', Smartphone],
              ['Android', 'Chrome -> Установить приложение.', Download],
              ['Данные клиента', 'Email, пароль и проверки создаются администратором HEIMDALL.', CheckCircle2]
            ].map(([title, text, Icon]) => (
              <div key={title} className="rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl">
                <Icon className="h-6 w-6 text-sky-300" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <HeimdallFooter language="ru" />
      </main>
    </>
  )
}
