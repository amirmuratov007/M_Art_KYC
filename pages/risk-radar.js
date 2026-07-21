import Head from 'next/head'
import TelegramRiskRadar from '@/components/TelegramRiskRadar'

export default function RiskRadarPage() {
  return (
    <>
      <Head>
        <title>HEIMDALL Риск-радар</title>
        <meta name="description" content="Интерактивная экспресс-оценка рисков контрагента, сотрудника, недвижимости и автомобиля." />
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="theme-color" content="#050816" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <link rel="canonical" href="https://www.heimdall-group.ru/risk-radar" />
      </Head>
      <TelegramRiskRadar />
    </>
  )
}

RiskRadarPage.isTelegramMiniApp = true
