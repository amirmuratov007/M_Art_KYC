import HeimdallServiceLanding from '@/components/HeimdallServiceLanding'

export default function InternalInvestigationsEnPage() {
  return (
    <HeimdallServiceLanding
      language="en"
      title="Internal Corporate Investigations | HEIMDALL"
      description="HEIMDALL internal investigations for fraud, leaks, conflicts of interest, procurement schemes and process violations within a lawful corporate framework."
      canonical="https://www.heimdall-group.ru/internal-investigations-en"
      eyebrow="Internal investigations"
      heroTitle="Investigate internal risk without creating a new legal problem"
      heroText="HEIMDALL helps owners and executives review fraud signals, leaks, procurement collusion, access abuse, conflicts of interest and process violations within a lawful corporate framework."
      primaryCta="Discuss investigation"
      secondaryCta={{ label: 'Security outsourcing', href: '/security-outsourcing-en' }}
      price="from $2,500"
      timing="7-20 business days"
      audience={[
        'Owners, CEOs and legal teams',
        'Companies facing fraud, leaks or procurement irregularities',
        'Executives who need a fact-based picture before escalation'
      ]}
      pain={[
        ['Fraud or collusion signal', 'Suspicious vendors, inflated prices, kickbacks or informal influence groups.'],
        ['Leak or access abuse', 'Commercial secrets, client bases, documents or data may have left the company.'],
        ['Conflict of interest', 'Employees, contractors or suppliers may be connected in a way that distorts decisions.'],
        ['Process breakdown', 'Approvals, payments, documents or access rights no longer match the approved procedure.']
      ]}
      includes={[
        'Legal framing of scope, authority and personal-data boundaries',
        'Document, contract, payment and process review',
        'Conflict-of-interest, affiliation and relationship mapping',
        'Allowed digital-trace, access and leak-indicator analysis',
        'Structured interviews and fact comparison where appropriate',
        'Clear boundary: no hacking, interception, pressure or provocation'
      ]}
      deliverables={[
        'Fact-based investigation report for leadership',
        'Evidence and source map with uncertainty notes',
        'List of people, processes and control points requiring attention',
        'Recommendations for HR, legal, information-security and process action',
        'Prevention plan to reduce repeated violations'
      ]}
      process={[
        ['01', 'Legal frame', 'We define authority, scope, confidentiality, data boundaries and report usage before work starts.'],
        ['02', 'Hypotheses', 'We locate where the issue may sit: procurement, sales, finance, access, vendors or information flow.'],
        ['03', 'Fact review', 'We examine documents, permitted communications, open sources, traces, contracts and payment logic.'],
        ['04', 'Decision report', 'Leadership receives findings, evidence map, violations, limits and prevention steps.']
      ]}
      related={[
        ['Security outsourcing', 'Ongoing external security department for recurring risk tasks.', '/security-outsourcing-en'],
        ['Business support', 'Monthly support for checks and risk register maintenance.', '/business-support-en'],
        ['Trust center', 'Confidentiality, legality and operating boundaries.', '/trust-center-en']
      ]}
      topic="Internal investigation request"
    />
  )
}
