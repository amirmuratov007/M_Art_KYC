import Head from 'next/head'
import Link from 'next/link'
import HeimdallLogo from '@/components/HeimdallLogo'
import { useState } from 'react'

const copy = {
  ru: {
    title: 'Политика конфиденциальности',
    updated: 'Дата обновления: 18 мая 2026',
    intro: 'Настоящая политика описывает, как HEIMDALL обрабатывает данные, которые пользователь передаёт через сайт heimdall-group.ru.',
    sections: [
      ['1. Какие данные мы получаем', 'Через форму заявки пользователь может передать имя, компанию, email, телефон, тип проверки и комментарий. Также могут обрабатываться технические данные посещения сайта, необходимые для безопасности и корректной работы сервиса.'],
      ['2. Цели обработки', 'Данные используются для обработки входящей заявки, связи с пользователем, уточнения задачи, подготовки коммерческого предложения и обеспечения конфиденциальной коммуникации.'],
      ['3. Конфиденциальность', 'HEIMDALL рассматривает переданную информацию как конфиденциальную и не публикует её. Доступ к информации ограничивается лицами, участвующими в обработке запроса.'],
      ['4. Передача третьим лицам', 'Данные не продаются и не передаются третьим лицам для рекламных целей. Передача возможна только если это требуется законом или необходимо для технической обработки заявки.'],
      ['5. Хранение данных', 'Данные хранятся в защищённых системах, используемых для обработки заявок. Пользователь может запросить удаление или уточнение данных, связавшись с HEIMDALL.'],
      ['6. Связь', 'По вопросам конфиденциальности можно обратиться через контактные данные, указанные на сайте.']
    ],
    back: 'Вернуться на сайт',
    switch: 'EN'
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 18, 2026',
    intro: 'This policy explains how HEIMDALL processes data submitted through heimdall-group.ru.',
    sections: [
      ['1. Data we receive', 'Through the request form, a user may submit name, company, email, phone number, review type and comments. Technical website data may also be processed for security and service operation.'],
      ['2. Purposes of processing', 'Data is used to process incoming requests, contact the user, clarify the case, prepare a commercial proposal and support confidential communication.'],
      ['3. Confidentiality', 'HEIMDALL treats submitted information as confidential and does not publish it. Access is limited to personnel involved in processing the request.'],
      ['4. Third-party disclosure', 'Data is not sold or transferred to third parties for advertising purposes. Disclosure may occur only where legally required or technically necessary to process the request.'],
      ['5. Data storage', 'Data is stored in protected systems used for request processing. Users may request deletion or clarification of their data by contacting HEIMDALL.'],
      ['6. Contact', 'Privacy-related questions can be addressed through the contact details listed on the website.']
    ],
    back: 'Back to website',
    switch: 'RU'
  }
}

export default function Privacy() {
  const [language, setLanguage] = useState('ru')
  const t = copy[language]

  return (
    <>
      <Head>
        <title>{t.title} — HEIMDALL</title>
        <meta name="description" content="HEIMDALL privacy policy and data processing information." />
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
