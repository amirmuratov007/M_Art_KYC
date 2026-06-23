import HeimdallServiceLanding from '@/components/HeimdallServiceLanding'

export default function BusinessSupportEnPage() {
  return (
    <HeimdallServiceLanding
      language="en"
      title="Business Support | HEIMDALL"
      description="HEIMDALL business support: continuous counterparty intelligence, candidate screening, beneficial ownership review and risk monitoring."
      canonical="https://www.heimdall-group.ru/business-support-en"
      eyebrow="Business support"
      heroTitle="A permanent risk-review perimeter without hiring an internal team"
      heroText="HEIMDALL supports companies on a monthly basis: counterparties, candidates, suppliers, beneficial owners, transactions, information security signals and urgent owner tasks."
      primaryCta="Request support scope"
      secondaryCta={{ label: 'See security outsourcing', href: '/security-outsourcing-en' }}
      price="from $2,500 / month"
      timing="monthly support"
      audience={[
        'Companies with recurring procurement, hiring and partner checks',
        'Owners who need confidential external risk capacity',
        'Teams that need a single history of risk decisions'
      ]}
      pain={[
        ['Too many checks', 'The business has recurring decisions, but no unified risk memory or review standard.'],
        ['Sensitive tasks', 'Some checks should not be routed through employees, suppliers or people inside a conflict chain.'],
        ['International exposure', 'Suppliers, intermediaries, beneficial owners and payment routes sit across jurisdictions.'],
        ['No owner-level view', 'Reports exist as fragments, while leadership needs a clear risk register and next actions.']
      ]}
      includes={[
        'Counterparty and supplier checks',
        'Candidate and sensitive-role screening',
        'Beneficial-owner and affiliation review',
        'Monthly risk register and management summary',
        'Priority handling for urgent deal or payment decisions',
        'Confidential communication channel and report archive'
      ]}
      deliverables={[
        'Monthly review capacity agreed by scope',
        'Risk register with status, owners and recommended action',
        'Short executive conclusions for urgent decisions',
        'Expanded reports for high-risk objects',
        'Priority consultation for red flags and incidents'
      ]}
      process={[
        ['01', 'Scope design', 'We define recurring check types, urgency rules, data flow, confidentiality and report format.'],
        ['02', 'Intake rhythm', 'Your team sends objects through an agreed channel with context and decision deadline.'],
        ['03', 'Risk review', 'HEIMDALL checks facts, links, sanctions, reputation, conflicts and digital signals.'],
        ['04', 'Ongoing memory', 'Each result updates the risk register so the company does not restart from zero every time.']
      ]}
      related={[
        ['Corporate intelligence', 'One-off company and partner intelligence before sensitive decisions.', '/corporate-intelligence'],
        ['Security outsourcing', 'A broader external security department with InfoSec and incident tasks.', '/security-outsourcing-en'],
        ['Pricing', 'Compare retained support and one-off review formats.', '/pricing-en']
      ]}
      topic="Business support request"
    />
  )
}
