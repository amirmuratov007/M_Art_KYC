import HeimdallServiceLanding from '@/components/HeimdallServiceLanding'

export default function SecurityOutsourcingEnPage() {
  return (
    <HeimdallServiceLanding
      language="en"
      title="Security Outsourcing | HEIMDALL"
      description="HEIMDALL as an outsourced security department: counterparty checks, candidate screening, supplier review, risk monitoring, investigations and information security."
      canonical="https://www.heimdall-group.ru/security-outsourcing-en"
      eyebrow="Outsourced security department"
      heroTitle="An external security department for companies that cannot afford blind spots"
      heroText="HEIMDALL can take over the practical risk function: deals, procurement, candidates, suppliers, beneficial owners, investigations, information security signals and confidential owner tasks."
      primaryCta="Discuss security scope"
      secondaryCta={{ label: 'View business support', href: '/business-support-en' }}
      price="from $4,500 / month"
      timing="ongoing"
      audience={[
        'Companies without an internal security department',
        'Owners who need an independent risk perimeter',
        'Groups with suppliers, staff, vendors, payments and sensitive data'
      ]}
      pain={[
        ['No internal security function', 'Deals, hiring and supplier payments are approved without independent review.'],
        ['Internal team is overloaded', 'Existing staff handle incidents, while external risks remain under-reviewed.'],
        ['Confidentiality is critical', 'The task cannot be routed through people who may be part of the conflict chain.'],
        ['Digital exposure grows', 'Vendors, access rights, domains, leaks and payment-detail substitution become business risks.']
      ]}
      includes={[
        'Counterparty, supplier and contractor checks',
        'Sensitive-role candidate screening',
        'Beneficial-owner, affiliation and conflict-of-interest review',
        'Information-security perimeter review: domains, leaks, vendors and access risks',
        'Internal incident and suspicious-activity review',
        'Monthly executive risk summary and recommendations'
      ]}
      deliverables={[
        'External security function with agreed task capacity',
        'Risk register covering counterparties, people, vendors and incidents',
        'InfoSec exposure map with priority actions',
        'Executive reports without technical fog',
        'Escalation logic for legal, HR and owner decisions'
      ]}
      process={[
        ['01', 'Security model', 'We define what HEIMDALL takes over, who can request tasks and how confidential information moves.'],
        ['02', 'Perimeter map', 'We map counterparties, vendors, employees, access points, domains, documents and sensitive processes.'],
        ['03', 'Operational checks', 'We review new objects, monitor critical changes and investigate suspicious signals.'],
        ['04', 'Owner control', 'Leadership receives a concise register: what is safe, what needs control and what should stop.']
      ]}
      related={[
        ['Internal investigations', 'Investigate fraud, leaks, collusion and process violations lawfully.', '/internal-investigations-en'],
        ['Business support', 'A lighter retained format for recurring checks.', '/business-support-en'],
        ['Trust center', 'How HEIMDALL handles confidentiality, limits and sources.', '/trust-center-en']
      ]}
      topic="Security outsourcing request"
    />
  )
}
