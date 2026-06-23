import PurchaseSellerCheckPage from '@/components/PurchaseSellerCheckPage'

const content = {
  language: 'en',
  icon: 'seller',
  canonical: 'https://www.heimdall-group.ru/seller-verification-before-purchase',
  alternate: { hrefLang: 'ru', href: 'https://www.heimdall-group.ru/proverka-prodavca-pered-pokupkoy' },
  metaTitle: 'Seller Verification Before Purchase | HEIMDALL',
  metaDescription: 'Seller verification for buyers before purchasing an apartment, car or high-value asset: identity, debts, litigation, affiliations, fraud indicators and transaction risk.',
  breadcrumb: 'Seller verification before purchase',
  kicker: 'Buyer-side seller verification',
  title: 'Seller verification before buying an apartment, car or high-value asset',
  description: 'Buyers often check the asset but forget to check the person selling it. HEIMDALL reviews the seller, affiliations, behavior and transaction risk before deposit, advance payment or signing documents.',
  cta: 'Verify seller',
  secondaryCta: 'How it works',
  cardLabel: 'When to use',
  cardItems: [
    'the seller pressures for a deposit or unusual payment structure',
    'the sale goes through an intermediary, power of attorney or third party',
    'the price is materially below market or looks too good',
    'there are doubts about identity, authority or seller motivation',
    'the buyer is purchasing property, a car, equipment or another valuable asset'
  ],
  scopeKicker: 'Review scope',
  scopeTitle: 'Seller verification reduces the risk of losing money before the transaction begins',
  scope: [
    { icon: 'seller', title: 'Seller identification', text: 'We assess whether the declared seller matches the actual transaction party and whether there are signs of impersonation, nominee behavior or hidden representation.' },
    { icon: 'file', title: 'Litigation, debts, bankruptcy', text: 'We review court and debt background, enforcement proceedings, bankruptcy indicators and conflicts that may affect transaction safety.' },
    { icon: 'network', title: 'Affiliations and environment', text: 'We identify representatives, relatives, companies, repeated contacts, intermediaries and possible hidden beneficiaries.' },
    { icon: 'warning', title: 'Behavioral signals', text: 'We flag time pressure, inconsistencies, advance payment requests, lack of transparency and other signs of a possible fraud scenario.' },
    { icon: 'shield', title: 'Reputation context', text: 'We collect public and digital signals: listings, contacts, reviews, public conflicts, repeated patterns and links to problematic companies.' },
    { icon: 'home', title: 'Asset context', text: 'We compare the seller with the asset: how long they owned it, why they sell, who negotiates, why the price is set and who receives the money.' }
  ],
  processKicker: 'Method',
  processTitle: 'We treat the seller as a standalone transaction risk',
  processText: 'The purpose is not to collect compromising material, but to understand whether the buyer can safely proceed, which terms must change and where concessions are dangerous.',
  process: [
    { title: '1. Context capture', text: 'What is being purchased, who sells it, price, negotiation behavior, who asks for money, what documents were shown and what looks unusual.' },
    { title: '2. Seller review', text: 'Identity, litigation, debts, enforcement, companies, affiliations, digital footprint and reputation indicators.' },
    { title: '3. Version comparison', text: 'We compare the seller’s statements with documents, public data, ownership period, contacts and intermediary roles.' },
    { title: '4. Decision support', text: 'We provide a practical conclusion: proceed, proceed only with safeguards, or stop the deal.' }
  ],
  deliverablesKicker: 'Report format',
  deliverablesTitle: 'A concise buyer-side decision report',
  deliverables: [
    'overall seller and transaction risk level',
    'verified facts without unnecessary personal details',
    'key risk signals and why they matter',
    'inconsistencies in data, documents or seller behavior',
    'questions to ask before paying a deposit',
    'recommendations on settlement, documents, meeting format, notary involvement and further checks'
  ],
  boundariesKicker: 'Important',
  boundariesTitle: 'Seller verification complements legal and technical checks',
  boundaries: [
    'For real estate, a lawyer should separately review title, encumbrances and contracts.',
    'For vehicles, technical diagnostics and checks for restrictions, pledges and vehicle history are separate tasks.',
    'HEIMDALL checks the seller, affiliations, behavior, reputation background and transaction risk environment.',
    'The report helps decide whether to proceed, change terms or walk away.'
  ],
  faqKicker: 'FAQ',
  faqTitle: 'Common buyer questions',
  faq: [
    { question: 'Is this only for apartments and cars?', answer: 'No. Seller verification is useful for any high-value asset: real estate, vehicles, equipment, commercial assets, shares or valuable items.' },
    { question: 'Can it be done before the deposit?', answer: 'That is the best moment. After payment, the buyer is in a weaker negotiation position and may be forced to accept risky terms.' },
    { question: 'What data is needed?', answer: 'Name, phone, listing link, documents, chat history, price, payment terms and a short note on what seems suspicious.' },
    { question: 'What if the risk is high?', answer: 'Do not transfer money, do not sign in a hurry, request additional proof, change the settlement structure or reject the transaction.' }
  ],
  finalKicker: 'Request',
  finalTitle: 'Verify the seller before paying a deposit',
  finalText: 'Send seller details, asset description and transaction terms. We will show the risk signals and the safeguards to use before payment.'
}

export default function SellerCheckBeforePurchaseEn() {
  return <PurchaseSellerCheckPage content={content} />
}
