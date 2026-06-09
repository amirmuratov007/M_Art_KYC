import Head from 'next/head'
import { useRouter } from 'next/router'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import HeimdallRiskTest, { riskTestCatalog } from '@/components/HeimdallRiskTest'
import HeimdallRiskTestHub from '@/components/HeimdallRiskTestHub'

export default function RiskTestEnPage() {
  const router = useRouter()
  const selected = typeof router.query.test === 'string' ? router.query.test : ''
  const exists = riskTestCatalog.some((item) => item.id === selected)

  return (
    <>
      <Head>
        <title>Free HEIMDALL risk tests | Deals, suppliers, info security and internal risks</title>
        <meta name="description" content="Choose a HEIMDALL risk test: deal before payment, supplier, information security, internal misconduct or outsourced security. Get a preliminary risk profile." />
        <link rel="canonical" href="https://www.heimdall-group.ru/risk-test-en" />
      </Head>
      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.13),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </div>
        <HeimdallNav language="en" />
        {exists ? <HeimdallRiskTest language="en" testId={selected} /> : <HeimdallRiskTestHub language="en" />}
        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
