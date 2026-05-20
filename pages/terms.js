import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { useState } from 'react'

const copy = {
  ru: {
    title: 'Условия использования',
    updated: 'Дата обновления: 18 мая 2026',
    intro: 'Настоящие условия регулируют использование сайта HEIMDALL и отправку заявок через форму обратной связи.',
    sections: [
      ['1. Назначение сайта', 'Сайт носит информационный характер и предназначен для представления услуг корпоративной разведки, due diligence, AML/KYC и проверки кандидатов.'],
      ['2. Не является публичной офертой', 'Материалы сайта не являются публичной офертой, юридическим заключением, финансовой рекомендацией или гарантией результата проверки. Условия оказания услуг согласуются индивидуально.'],
      ['3. Отправка заявки', 'Отправляя форму, пользователь подтверждает, что предоставленные данные актуальны и могут быть использованы для связи и уточнения запроса.'],
      ['4. Ограничение ответственности', 'HEIMDALL не несёт ответственности за решения, принятые пользователем исключительно на основании материалов сайта без индивидуальной консультации и согласованной проверки.'],
      ['5. Конфиденциальность', 'Информация, переданная через сайт, обрабатывается с учётом политики конфиденциальности. По запросу возможно взаимодействие под NDA.'],
      ['6. Изменение условий', 'HEIMDALL может обновлять условия использования сайта. Актуальная версия публикуется на этой странице.']
    ],
    back: 'Вернуться на сайт',
    switch: 'EN'
  },
  en: {
    title: 'Terms of Use',
    updated: 'Last updated: May 18, 2026',
    intro: 'These terms govern the use of the HEIMDALL website and submission of requests through the contact form.',
    sections: [
      ['1. Purpose of the website', 'The website is informational and presents corporate intelligence, due diligence, AML/KYC and candidate screening services.'],
      ['2. No public offer', 'Website materials do not constitute a public offer, legal opinion, financial recommendation or guarantee of review results. Service terms are agreed individually.'],
      ['3. Request submission', 'By submitting the form, the user confirms that the provided data is current and may be used for contact and request clarification.'],
      ['4. Limitation of liability', 'HEIMDALL is not responsible for decisions made solely on the basis of website materials without individual consultation and agreed review scope.'],
      ['5. Confidentiality', 'Information submitted through the website is processed in accordance with the privacy policy. NDA-based communication is available on request.'],
      ['6. Changes to terms', 'HEIMDALL may update these website terms. The current version is published on this page.']
    ],
    back: 'Back to website',
    switch: 'RU'
  }
}

export default function Terms() {
  const [language, setLanguage] = useState('ru')
  const t = copy[language]

  return (
    <>
      <Head>
        <title>{t.title} — HEIMDALL</title>
        <meta name="description" content="HEIMDALL website terms of use." />
      </Head>

      <main className="min-h-screen bg-[#050816] px-5 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 flex items-center justify-between">
            <HeimdallLogo />
            <button onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
              {t.switch}
            </button>
          </div>

          <div className="rounded-[36px] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:p-12">
            <div className="text-sm uppercase tracking-[0.25em] text-sky-300/80">{t.updated}</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">{t.title}</h1>
            <p className="mt-6 text-lg leading-8 text-white/68">{t.intro}</p>

            <div className="mt-10 space-y-7">
              {t.sections.map(([title, text]) => (
                <section key={title}>
                  <h2 className="text-2xl font-semibold">{title}</h2>
                  <p className="mt-3 leading-7 text-white/64">{text}</p>
                </section>
              ))}
            </div>

            <Link href="/" className="mt-10 inline-flex rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white">
              {t.back}
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
