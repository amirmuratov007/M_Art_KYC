
import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import HeimdallIntelligencePlatform from '@/components/HeimdallIntelligencePlatform'

export default function IntelligencePlatformPreview() {
  return (
    <>
      <Head>
        <title>Аналитическая платформа | HEIMDALL</title>
        <meta
          name="description"
          content="Премиальная аналитическая платформа HEIMDALL для проверки контрагентов, владельцев, санкционных рисков и руководителей."
        />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" />
        </div>

        <HeimdallNav language="ru" />
        <HeimdallIntelligencePlatform />
        <HeimdallFooter />
      </main>
    </>
  )
}
