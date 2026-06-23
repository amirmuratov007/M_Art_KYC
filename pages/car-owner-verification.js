import PurchaseSellerCheckPage from '@/components/PurchaseSellerCheckPage'

const content = {
  language: 'en',
  icon: 'car',
  canonical: 'https://www.heimdall-group.ru/car-owner-verification',
  alternate: { hrefLang: 'ru', href: 'https://www.heimdall-group.ru/proverka-sobstvennika-avtomobilya' },
  metaTitle: 'Car Owner Verification Before Purchase | HEIMDALL',
  metaDescription: 'Verification of a car seller before purchase: seller identity, debt and litigation risk, resellers, nominee sale, fraud indicators and transaction safety.',
  breadcrumb: 'Car owner verification',
  kicker: 'Vehicle purchase risk',
  title: 'Car owner verification before purchase',
  description: 'HEIMDALL helps buyers evaluate not only the vehicle, but also the person selling it. The risk may come from debts, disputes, resellers, powers of attorney, pledges, contested ownership or an attempt to quickly move an asset.',
  cta: 'Verify car seller',
  secondaryCta: 'Review scope',
  cardLabel: 'For car buyers',
  cardItems: [
    'seller identity and match with the vehicle owner',
    'debts, litigation, enforcement and bankruptcy indicators',
    'links to resellers, service shops, parking lots or problematic companies',
    'urgent sale, power of attorney, pledge or contested ownership signals',
    'seller reputation and digital footprint'
  ],
  scopeKicker: 'Review scope',
  scopeTitle: 'Before buying a car, check not only the VIN, but also the seller',
  scope: [
    { icon: 'seller', title: 'Seller and owner', text: 'We check whether the seller matches the owner and whether there is an unclear intermediary, power of attorney, nominee sale or grey transaction structure.' },
    { icon: 'file', title: 'Debts and disputes', text: 'We look for enforcement proceedings, litigation, bankruptcy indicators and risks of claims against the asset.' },
    { icon: 'car', title: 'Vehicle context', text: 'We review ownership history together with the seller context: frequent resale, ownership changes, disputed periods and commercial turnover signals.' },
    { icon: 'network', title: 'Related parties', text: 'We identify links to resellers, service shops, parking sites, companies and contacts that may reveal the seller’s real role.' },
    { icon: 'warning', title: 'Fraud indicators', text: 'We flag time pressure, advance payment requests, refusal to show documents, complex settlements and sale by someone other than the owner.' },
    { icon: 'shield', title: 'Reputation background', text: 'We review open digital traces, public listings, contact overlaps, reviews, conflicts and patterns of repeated sales.' }
  ],
  processKicker: 'Process',
  processTitle: 'We treat the seller as the counterparty to the transaction',
  processText: 'Vehicle diagnostics and VIN checks do not answer whether it is safe to buy from this specific person. We add a risk intelligence layer around the seller and transaction behavior.',
  process: [
    { title: '1. Transaction data', text: 'Seller name, phone, vehicle details, VIN, price, documents, chat history, payment structure and sale circumstances.' },
    { title: '2. Seller review', text: 'Litigation, debts, enforcement, bankruptcy indicators, open sources, digital footprint, related parties and contacts.' },
    { title: '3. Vehicle match', text: 'We compare the seller’s role with ownership history, listings, contacts and reseller or nominee indicators.' },
    { title: '4. Buyer recommendations', text: 'We prepare conditions: what documents to request, how to pay safely, what to verify before signing and when to stop the deal.' }
  ],
  deliverablesKicker: 'Deliverables',
  deliverablesTitle: 'A clear report before paying for the car',
  deliverables: [
    'executive conclusion on seller and transaction risk',
    'verified facts about the seller and related parties',
    'debt, litigation, reputation and behavioral risk signals',
    'assessment of seller-owner match and actual role in the deal',
    'questions to ask before transferring money',
    'recommendations on payment, documents and safe closing'
  ],
  boundariesKicker: 'Boundaries',
  boundariesTitle: 'What should be checked separately',
  boundaries: [
    'HEIMDALL does not replace technical vehicle diagnostics.',
    'Legal restrictions, pledges and registration actions should be checked separately through relevant vehicle sources and documents.',
    'We analyze seller identity, affiliations, behavior and transaction risk.',
    'Findings are preliminary and should be used together with document-based checks.'
  ],
  faqKicker: 'FAQ',
  faqTitle: 'Common questions from car buyers',
  faq: [
    { question: 'Why check the seller if the car was checked?', answer: 'The problem may be the person, not the car: debts, disputes, nominee sale, reseller schemes, power of attorney, fraud behavior or future challenge risk.' },
    { question: 'What data is needed?', answer: 'Seller name, phone, VIN, listing link, documents, price, payment terms and any unusual communication details.' },
    { question: 'Can you check a reseller?', answer: 'Yes. We review repeated contacts, listings, affiliations, companies, reputation background and professional resale indicators.' },
    { question: 'What should I do in a high-risk case?', answer: 'Do not transfer a deposit, do not understate the price, request additional documents, check restrictions and consider walking away.' }
  ],
  finalKicker: 'Request',
  finalTitle: 'Verify the car seller before payment',
  finalText: 'Send the seller data, vehicle details, price, transaction terms and listing link. We will assess the seller risk and provide practical recommendations.'
}

export default function CarOwnerCheckEn() {
  return <PurchaseSellerCheckPage content={content} />
}
