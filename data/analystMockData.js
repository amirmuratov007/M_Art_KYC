export const analystCases = [
  {
    id: 'HMD-2026-001',
    subject: 'Northbridge Supply LLC',
    client: 'Meridian Capital Group',
    type: 'Counterparty Intelligence',
    status: 'Analyst Review',
    priority: 'High',
    risk: 82,
    analyst: 'A. Karimov',
    deadline: '2026-05-24',
    summary: 'Supplier review with litigation load, hidden intermediary structure and indirect sanctions exposure.',
    findings: ['Unclear supply chain with undisclosed intermediaries.', 'Repeated arbitration disputes related to delivery timelines.', 'Possible second-level sanctions exposure through logistics partner.'],
    documents: ['corporate_registry_extract.pdf', 'litigation_export.xlsx', 'supplier_screening_notes.txt'],
    notes: 'Recommend enhanced review before any long-term supplier agreement.'
  },
  {
    id: 'HMD-2026-002',
    subject: 'Ilya Sorokin',
    client: 'Meridian Capital Group',
    type: 'Candidate Screening',
    status: 'Completed',
    priority: 'Medium',
    risk: 74,
    analyst: 'E. Markova',
    deadline: '2026-05-23',
    summary: 'Candidate for sensitive procurement role. Conflict of interest and financial pressure signals identified.',
    findings: ['Undisclosed link to supplier-side manager.', 'Financial pressure indicators detected.', 'Career timeline inconsistency requires clarification.'],
    documents: ['candidate_cv.pdf', 'background_screening_summary.docx'],
    notes: 'Do not approve for procurement access before additional interview.'
  },
  {
    id: 'HMD-2026-003',
    subject: 'Orion Trade Beneficial Network',
    client: 'Northstar Holdings',
    type: 'Beneficial Ownership Review',
    status: 'In Progress',
    priority: 'High',
    risk: 88,
    analyst: 'R. Vesnin',
    deadline: '2026-05-26',
    summary: 'Beneficial ownership review with nominee structure and hidden control indicators.',
    findings: ['Formal ownership does not explain actual control.', 'Nominee director pattern identified.', 'Conflict of interest with transaction adviser.'],
    documents: ['ownership_chart.png', 'ubo_declaration_draft.pdf'],
    notes: 'Request full UBO declaration and source of funds confirmation.'
  },
  {
    id: 'HMD-2026-004',
    subject: 'Baltic Freight Partners',
    client: 'Arden Group',
    type: 'Vendor Review',
    status: 'New',
    priority: 'Medium',
    risk: 61,
    analyst: 'Not assigned',
    deadline: '2026-05-27',
    summary: 'New vendor review pending document extraction.',
    findings: ['Pending registry review.', 'Pending litigation screening.', 'Pending reputation screening.'],
    documents: ['vendor_onboarding_form.pdf'],
    notes: 'Assign analyst and start registry extraction.'
  },
  {
    id: 'HMD-2026-005',
    subject: 'Ardent Holdings FZCO',
    client: 'Meridian Capital Group',
    type: 'Sanctions Screening',
    status: 'Analyst Review',
    priority: 'Medium',
    risk: 67,
    analyst: 'A. Karimov',
    deadline: '2026-05-25',
    summary: 'International entity sanctions screening with indirect exposure indicators.',
    findings: ['No direct sanctions match.', 'Potential indirect exposure through former director.', 'Requires enhanced relationship check.'],
    documents: ['sanctions_screening_export.xlsx'],
    notes: 'Check former directors and affiliated companies.'
  }
]

export const statuses = ['New', 'In Progress', 'Analyst Review', 'Approved', 'Client Ready', 'Completed']
export const checkTypes = ['Counterparty Intelligence', 'Candidate Screening', 'Beneficial Ownership Review', 'Sanctions Screening', 'Vendor Review', 'Business Support']
