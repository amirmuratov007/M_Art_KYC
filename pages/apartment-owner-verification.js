import PurchaseSellerCheckPage from '@/components/PurchaseSellerCheckPage'

const content = {
  language: 'en',
  icon: 'home',
  canonical: 'https://www.heimdall-group.ru/apartment-owner-verification',
  alternate: { hrefLang: 'ru', href: 'https://www.heimdall-group.ru/proverka-sobstvennika-kvartiry' },
  metaTitle: 'Apartment Owner Verification Before Purchase | HEIMDALL',
  metaDescription: 'Verification of an apartment seller before purchase: seller profile, litigation, debt exposure, related parties, pressure indicators and transaction risk.',
  breadcrumb: 'Apartment owner verification',
  kicker: 'Real estate purchase risk',
  title: 'Apartment owner verification before purchase',
  description: 'HEIMDALL checks not only the property context, but also the person selling it. A buyer needs to understand who stands behind the transaction, whether there are debt, litigation, nominee, pressure or dispute risks that may affect the purchase.',
  cta: 'Request seller verification',
  secondaryCta: 'Review scope',
  cardLabel: 'For apartment buyers',
  cardItems: [
    'seller profile, litigation and public risk background',
    'debt, enforcement and bankruptcy-related indicators',
    'related parties, representatives and possible hidden beneficiaries',
    'pressure, urgent sale, power of attorney or unusual payment indicators',
    'reputation and digital signals relevant to the transaction'
  ],
  scopeKicker: 'Review scope',
  scopeTitle: 'The property may look clean, while the actual risk sits with the seller',
  scope: [
    { icon: 'seller', title: 'Seller identity', text: 'We review identity consistency, public traces, contact history, potential impersonation, nominee behavior or sale through third parties.' },
    { icon: 'file', title: 'Litigation and debts', text: 'We look for court disputes, enforcement proceedings, debt pressure, bankruptcy indicators and conflicts that may lead to future challenges.' },
    { icon: 'network', title: 'Related parties', text: 'We assess representatives, real estate agents, powers of attorney, shared addresses, phones, companies and other affiliation markers.' },
    { icon: 'warning', title: 'Pressure indicators', text: 'We flag urgent sale pressure, unusual settlement terms, requests to understate the price, complex transfers or other high-risk scenarios.' },
    { icon: 'shield', title: 'Reputation background', text: 'We review open sources, digital footprint, public conflicts, links to problematic companies and integrity-related signals.' },
    { icon: 'home', title: 'Property context', text: 'We compare the seller with the property context: ownership period, transaction frequency, role of intermediaries and hidden interests.' }
  ],
  processKicker: 'Process',
  processTitle: 'From documents to human and behavioral risk',
  processText: 'Legal review of the property is essential, but it does not answer whether the counterparty is safe. We add a risk intelligence layer focused on the seller and transaction context.',
  process: [
    { title: '1. Input data', text: 'Seller name, date of birth, phone, representative details, property address, transaction structure and any unusual circumstances.' },
    { title: '2. Signal collection', text: 'Litigation, debts, enforcement, bankruptcy indicators, public sources, companies, affiliations, digital footprint and reputation context.' },
    { title: '3. Risk map', text: 'We separate facts, assumptions and signals. Not every finding is a risk - the report highlights what actually matters to the buyer.' },
    { title: '4. Practical safeguards', text: 'We prepare recommendations on additional documents, settlement structure, notary checks and where a real estate lawyer should be involved.' }
  ],
  deliverablesKicker: 'Deliverables',
  deliverablesTitle: 'A decision report before deposit or closing',
  deliverables: [
    'executive conclusion on the seller and risk level',
    'verified facts without unnecessary personal details',
    'debt, litigation, reputation and behavioral risk signals',
    'relationship map: representatives, relatives, companies, intermediaries and repeated contacts',
    'questions for the seller, agent, notary or lawyer',
    'recommendations on settlement safety and further checks'
  ],
  boundariesKicker: 'Boundaries',
  boundariesTitle: 'What this service does not replace',
  boundaries: [
    'HEIMDALL does not replace legal review of the sale agreement or registry documents.',
    'We do not guarantee absolute transaction safety. We identify risk signals around the seller and transaction environment.',
    'The report does not assert guilt, illegality or bad faith without verified grounds.',
    'For high-risk cases, we recommend involving a real estate lawyer and a notary.'
  ],
  faqKicker: 'FAQ',
  faqTitle: 'Common questions from apartment buyers',
  faq: [
    { question: 'When should I verify the seller?', answer: 'Before paying a deposit or signing preliminary documents. Early risk detection gives the buyer more room to change terms or walk away.' },
    { question: 'Can you start with only a name and phone?', answer: 'Yes, but the result is stronger with date of birth, representative data, property address, draft documents and the communication history.' },
    { question: 'Do you check the property itself?', answer: 'We focus on seller and transaction risk. Registry rights, encumbrances and title chain should be checked separately by a legal specialist.' },
    { question: 'What is a warning signal?', answer: 'Debt pressure, court conflicts, bankruptcy indicators, unexplained power of attorney, urgent sale, price understatement, complex settlements or opaque intermediaries.' }
  ],
  finalKicker: 'Request',
  finalTitle: 'Check the seller before paying a deposit',
  finalText: 'Describe the property, seller, price, settlement terms and what seems unusual. We will suggest the right verification scope.'
}

export default function ApartmentOwnerCheckEn() {
  return <PurchaseSellerCheckPage content={content} />
}
