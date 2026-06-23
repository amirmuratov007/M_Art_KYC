import HeimdallServiceLanding from '@/components/HeimdallServiceLanding'

export default function CorporateIntelligencePage() {
  return (
    <HeimdallServiceLanding
      language="en"
      title="Corporate Intelligence | HEIMDALL"
      description="HEIMDALL corporate intelligence for deals, counterparties, ownership, sanctions exposure, reputation and hidden business risks."
      canonical="https://www.heimdall-group.ru/corporate-intelligence"
      eyebrow="Corporate intelligence"
      heroTitle="Know who you are dealing with before the decision is irreversible"
      heroText="HEIMDALL reviews companies, owners, links, litigation, sanctions exposure and reputation signals, then turns scattered facts into a management conclusion."
      primaryCta="Request intelligence review"
      secondaryCta={{ label: 'View sample reports', href: '/sample-reports-en' }}
      price="from $450"
      timing="24-72 hours"
      audience={[
        'Owners, CEOs and investment teams',
        'Legal, compliance and procurement teams',
        'Companies entering sensitive deals or new markets'
      ]}
      pain={[
        ['Before a deal', 'Understand hidden ownership, litigation, reputation and related-party risk before signing.'],
        ['Before advance payment', 'Check shell patterns, payment-substitution risk, supplier credibility and delivery exposure.'],
        ['Before partnership', 'Assess real control, affiliates, sanctions exposure and potential conflicts of interest.'],
        ['Before escalation', 'Structure facts and links before legal action, negotiation or internal decision.']
      ]}
      includes={[
        'Company profile, registration logic and operating footprint',
        'Shareholders, beneficial-owner signals and related companies',
        'Litigation, enforcement, bankruptcy and debt-risk indicators',
        'Sanctions, PEP, adverse media and reputation exposure',
        'Digital footprint, website, contacts and document consistency',
        'Conclusion: proceed, limit exposure, request more documents or stop'
      ]}
      deliverables={[
        'Executive risk summary for decision makers',
        'Fact map with sources, links and uncertainty notes',
        'Red flags prioritized by business impact',
        'Recommended next step and control measures'
      ]}
      process={[
        ['01', 'Object framing', 'We define the company, people, documents, bank details, websites and related entities to review.'],
        ['02', 'Source review', 'We check public registries, courts, media, sanctions lists, corporate links and digital traces.'],
        ['03', 'Risk correlation', 'We connect facts into a coherent picture instead of listing unrelated database hits.'],
        ['04', 'Decision brief', 'You receive a concise conclusion with risk level, limitations and recommended next action.']
      ]}
      related={[
        ['Business support', 'Continuous review perimeter for recurring checks and risk monitoring.', '/business-support-en'],
        ['Security outsourcing', 'External security department for deals, hiring, suppliers and information security.', '/security-outsourcing-en'],
        ['Internal investigations', 'Lawful corporate investigations for fraud, leaks and conflicts of interest.', '/internal-investigations-en']
      ]}
      topic="Corporate intelligence request"
    />
  )
}
