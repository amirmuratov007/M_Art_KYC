export const reportDrafts = {
  'HMD-2026-001': {
    caseId: 'HMD-2026-001',
    title: 'Counterparty Intelligence Report',
    subject: 'Northbridge Supply LLC',
    client: 'Meridian Capital Group',
    status: 'Draft',
    riskScore: 82,
    riskLevel: 'High',
    sections: [
      ['Executive Summary', 'Northbridge Supply LLC demonstrates elevated operational and compliance risk before long-term supplier onboarding. The strongest concerns are undisclosed intermediaries in the supply chain, recurring arbitration disputes and indirect sanctions exposure.'],
      ['Subject Profile', 'The company is presented as a supplier of industrial equipment with regional and cross-border logistics activity. The provided documents do not fully explain the actual supply chain and payment route.'],
      ['Key Risks', 'Key risks include undisclosed intermediaries, repeated delivery-related disputes, possible sanctions exposure through logistics partners and weak transparency of the supplier chain.'],
      ['HEIMDALL Recommendation', 'Proceed only after enhanced due diligence, full chain disclosure, sanctions review of all logistics participants and protective contractual controls.']
    ],
    checklist: ['Source references checked', 'No unsupported claims', 'Risk score reviewed', 'Recommendation approved', 'Client-ready language checked']
  },
  'HMD-2026-002': {
    caseId: 'HMD-2026-002',
    title: 'Candidate Screening Report',
    subject: 'Ilya Sorokin',
    client: 'Meridian Capital Group',
    status: 'Draft',
    riskScore: 74,
    riskLevel: 'Medium',
    sections: [
      ['Executive Summary', 'The candidate is professionally relevant for a procurement role, but the profile contains risk indicators requiring clarification before access to sensitive procurement processes.'],
      ['Candidate Profile', 'The candidate is linked to a procurement background and has experience relevant to the proposed role. Several biography and relationship signals require additional review.'],
      ['Key Risks', 'Key concerns include a possible conflict of interest with a supplier-side contact, financial pressure indicators and inconsistencies in the career timeline.'],
      ['HEIMDALL Recommendation', 'Do not approve for sensitive procurement access before additional interview, written disclosure of supplier relationships and HR review.']
    ],
    checklist: ['Identity verified', 'Conflict of interest reviewed', 'Financial pressure checked', 'Recommendation approved', 'Client-ready language checked']
  }
}
