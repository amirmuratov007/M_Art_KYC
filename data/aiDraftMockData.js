export const aiDrafts = {
  'HMD-2026-001': {
    subject: 'Northbridge Supply LLC',
    reportType: 'Counterparty Intelligence',
    riskScore: 82,
    riskLevel: 'High',
    executiveSummary: [
      'Northbridge Supply LLC demonstrates elevated operational and compliance risk.',
      'Key concerns include undisclosed intermediaries, litigation and indirect sanctions exposure.',
      'HEIMDALL recommends enhanced due diligence before long-term onboarding.'
    ],
    entities: [
      { type: 'Company', name: 'Northbridge Supply LLC', confidence: 0.96 },
      { type: 'Company', name: 'Baltic Freight Partners', confidence: 0.81 }
    ],
    findings: [
      {
        severity: 'High',
        category: 'Supply chain',
        title: 'Undisclosed intermediary structure',
        description: 'The declared supplier chain does not fully match the logistics and invoice trail.',
        source: 'corporate_registry_extract.pdf',
        recommendation: 'Request full supplier chain disclosure.'
      },
      {
        severity: 'Medium',
        category: 'Sanctions',
        title: 'Possible indirect exposure',
        description: 'A logistics partner appears connected to a higher-risk trade network.',
        source: 'sanctions_screening_export.xlsx',
        recommendation: 'Perform enhanced sanctions review.'
      }
    ],
    timeline: [
      ['2019', 'Company appears in commercial supply chain records'],
      ['2023', 'Arbitration disputes increase'],
      ['2026', 'Client onboarding request submitted']
    ],
    finalRecommendation: 'Proceed only after enhanced due diligence and protective contract controls.'
  },
  'HMD-2026-002': {
    subject: 'Ilya Sorokin',
    reportType: 'Candidate Screening',
    riskScore: 74,
    riskLevel: 'Medium',
    executiveSummary: [
      'The candidate is professionally relevant but contains risk indicators.',
      'Key concerns include possible conflict of interest and financial pressure.',
      'HEIMDALL recommends additional HR review before sensitive access.'
    ],
    entities: [
      { type: 'Person', name: 'Ilya Sorokin', confidence: 0.98 },
      { type: 'Company', name: 'Vector Processing JSC', confidence: 0.84 }
    ],
    findings: [
      {
        severity: 'High',
        category: 'Conflict of interest',
        title: 'Undisclosed supplier connection',
        description: 'The candidate appears indirectly connected to a supplier-side manager.',
        source: 'background_screening_summary.docx',
        recommendation: 'Request written disclosure.'
      }
    ],
    timeline: [
      ['2018', 'Procurement career track begins'],
      ['2026', 'Candidate submitted for sensitive role']
    ],
    finalRecommendation: 'Do not approve for sensitive procurement access before additional review.'
  }
}
