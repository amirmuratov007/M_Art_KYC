import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#050816" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HEIMDALL — Corporate Intelligence & Risk Advisory" />
        <meta property="og:description" content="Корпоративная разведка, проверка рисков, AML/KYC, due diligence и проверка кандидатов." />
        <meta property="og:url" content="https://heimdall-group.ru" />
        <meta property="og:image" content="https://heimdall-group.ru/og-cover.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HEIMDALL — Corporate Intelligence" />
        <meta name="twitter:description" content="Enterprise-grade due diligence, AML/KYC and candidate screening." />
        <meta name="twitter:image" content="https://heimdall-group.ru/og-cover.jpg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
