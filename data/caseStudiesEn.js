export const caseStudiesEn = [
  {
    slug: 'counterparty-180m-contract',
    title: 'Counterparty review before a major equipment contract',
    category: 'Counterparty Intelligence',
    risk: 'High',
    summary: 'HEIMDALL identified hidden affiliation, repeated litigation and asset-transfer indicators before the agreement was signed.',
    situation: 'The client was preparing to sign a large equipment supply contract. On the surface, the supplier looked operational: website, commercial proposal, clear terms and active communication.',
    signals: [
      'the supplier director was linked to a former owner of a distressed company',
      'the wider group had repeated litigation history',
      'assets were being moved to related legal entities',
      'contact traces overlapped with companies from the same network'
    ],
    result: 'The client paused signing, requested additional guarantees and refused advance payment before enhanced review was completed.',
    cta: 'Review a counterparty',
    serviceHref: '/corporate-intelligence'
  },
  {
    slug: 'cfo-screening',
    title: 'CFO candidate screening for a sensitive role',
    category: 'Executive Screening',
    risk: 'Elevated',
    summary: 'The review identified conflict-of-interest indicators, hidden business ties and inconsistencies in the professional profile.',
    situation: 'The candidate was at the final stage for a CFO role with access to payments, reporting, financial controls and management data.',
    signals: [
      'participation in a company connected to a competitor',
      'inconsistencies between CV and actual career timeline',
      'litigation episodes not disclosed by the candidate',
      'financial pressure and conflict-of-interest indicators'
    ],
    result: 'The client cancelled the appointment and changed the screening procedure for sensitive positions.',
    cta: 'Screen an executive',
    serviceHref: '/executive-background-check-en'
  },
  {
    slug: 'hidden-beneficiary-chain',
    title: 'Hidden beneficial owner through a corporate chain',
    category: 'Beneficial Ownership',
    risk: 'High',
    summary: 'Formal ownership did not match practical control. The relationship map led to a person with reputation and sanctions exposure.',
    situation: 'The client was evaluating a partnership with a company whose ownership structure looked formally clean but showed nominee indicators.',
    signals: [
      'repeated addresses and representatives across legal entities',
      'nominee participants without clear business logic',
      'family and business ties to the actual controller',
      'indirect sanctions and reputation exposure'
    ],
    result: 'The transaction structure was changed and the client requested beneficial ownership disclosure and additional warranties.',
    cta: 'Verify beneficial ownership',
    serviceHref: '/ubo-verification-en'
  },
  {
    slug: 'investment-due-diligence',
    title: 'Due diligence before acquiring a business stake',
    category: 'Due Diligence',
    risk: 'Medium',
    summary: 'The review revealed undisclosed obligations, litigation claims and overvaluation of selected assets.',
    situation: 'An investor was preparing to acquire a stake in a business. The seller provided a financial model and presentation, but several risks were not disclosed.',
    signals: [
      'unresolved obligations to counterparties',
      'litigation claims missing from deal materials',
      'revenue dependency on a limited number of clients',
      'overvaluation of selected assets'
    ],
    result: 'The client revised the valuation, changed the transaction terms and added protective provisions.',
    cta: 'Request due diligence',
    serviceHref: '/due-diligence-dubai'
  }
]

export default caseStudiesEn
