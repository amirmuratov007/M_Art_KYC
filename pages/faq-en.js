import Head from 'next/head'
import HeimdallNav from '@/components/HeimdallNav'
import HeimdallFooter from '@/components/HeimdallFooter'
import { HelpCircle } from 'lucide-react'

const questions = [
  ['How long does a review take?', 'A baseline review usually takes 24 to 72 hours. Complex due diligence depends on the volume of data, jurisdictions and required depth.'],
  ['What does the client receive?', 'The client receives an analytical report with facts, a risk summary, key findings and practical recommendations.'],
  ['Can HEIMDALL review an individual?', 'Yes, when the review has a legitimate purpose: hiring, partnership, access to sensitive information or business reputation assessment.'],
  ['Do you review foreign companies?', 'Yes. HEIMDALL works with cross-border reviews, sanctions exposure, ownership analysis and international corporate structures.'],
  ['Can we order ongoing support?', 'Yes. Business support is suitable for companies that need ongoing monitoring of counterparties, procurement, candidates and corporate risk.'],
  ['Do you guarantee the absence of risk?', 'No. A proper review does not guarantee the absence of risk. It identifies known and likely red flags as of the analysis date.'],
  ['How is confidentiality protected?', 'Client information and review details are not published. Reports and results are shared only with agreed recipients.'],
  ['Can we see a sample report?', 'Yes. The website includes sample reports that show demonstration formats of analytical materials.'],
]

export default function FAQEnPage() {
  return (
    <>
      <Head>
        <title>FAQ | HEIMDALL</title>
        <meta name="description" content="Frequently asked questions about HEIMDALL reviews: timing, reports, due diligence, candidate screening, privacy and business support." />
        <link rel="canonical" href="https://www.heimdall-group.ru/faq-en" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: questions.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
        }) }} />
      </Head>

      <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="fixed inset-0 pointer-events-none"><div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(214,168,79,0.12),transparent_30%),linear-gradient(135deg,#050816_0%,#08111f_48%,#050816_100%)]" /></div>
        <HeimdallNav language="en" />
        <section className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-5">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-2 text-xs uppercase tracking-[0.24em] text-[#F7D784]"><HelpCircle className="h-4 w-4" /> FAQ</div>
            <h1 className="mt-9 text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-8xl">Frequently asked questions</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/64 md:text-xl md:leading-9">Short answers about HEIMDALL workflows, reviews, reports, timing and confidentiality.</p>
          </div>
          <div className="mt-16 grid gap-5">
            {questions.map(([q, a]) => (
              <div key={q} className="rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl">
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{q}</h2>
                <p className="mt-4 text-sm leading-7 text-white/62">{a}</p>
              </div>
            ))}
          </div>
        </section>
        <HeimdallFooter language="en" />
      </main>
    </>
  )
}
