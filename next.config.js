import Head from 'next/head';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  Fingerprint,
  Globe2,
  Landmark,
  LockKeyhole,
  Mail,
  Phone,
  Radar,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Eye,
  ScanLine,
} from 'lucide-react';

const copy = {
  ru: {
    nav: ['Услуги', 'Рекрутинг', 'Методология', 'Отчёт', 'Контакты'],
    heroKicker: 'Конфиденциальная проверка рисков · Комплексная аналитика · Деловая разведка',
    heroTitle: 'Комплексная проверка рисков для бизнеса, финансового сектора и кадровых решений.',
    heroText:
      'M_Art_KYC проводит проверки контрагентов, кандидатов, сотрудников, иностранных компаний и деловой репутации для банков, инвесторов, юридических фирм, рекрутинговых агентств и крупного бизнеса.',
    request: 'Запросить проверку',
    consult: 'Получить консультацию',
    trustedBy: 'Для решений, где цена ошибки измеряется деньгами, репутацией, сроками сделки и доверием клиента.',
    metrics: [
      ['24 часа', 'первичная обработка заявки'],
      ['10+ источников', 'для многоуровневой проверки'],
      ['NDA', 'по запросу клиента'],
    ],
    servicesTitle: 'Проверки для решений, где нельзя ошибиться',
    servicesText: 'Не программа для самостоятельных проверок. Не личный кабинет. Это экспертная аналитическая услуга с выводами, рисками и рекомендациями.',
    recruitmentTitle: 'Для рекрутинговых агентств, кадровых компаний и executive search',
    recruitmentHeadline: 'Кандидат прошёл интервью — но не прошёл службу безопасности клиента?',
    recruitmentText:
      'Агентства теряют недели работы, комиссию и доверие клиента, когда финальный кандидат не проходит внутреннюю проверку безопасности. M_Art_KYC помогает выявлять биографические, репутационные, корпоративные и международные риски до передачи кандидата клиенту.',
    painsTitle: 'Что теряет агентство',
    valueTitle: 'Что даёт предварительная проверка',
    pains: ['потеря времени рекрутера', 'срыв закрытия вакансии', 'повторный поиск кандидата', 'испортенные отношения с клиентом', 'репутационные риски агентства', 'потеря комиссии'],
    benefits: ['меньше отказов после оффера', 'ускорение найма', 'выше доверие клиента', 'предварительный профиль риска', 'сильнее позиция агентства', 'меньше неожиданных проблем'],
    checkCandidate: 'Проверить кандидата',
    howTitle: 'Как проходит проверка',
    trustTitle: 'Почему нам доверяют',
    confidentialityTitle: 'Конфиденциальность как стандарт',
    confidentialityText: 'Каждая проверка проводится с ограниченным доступом к информации, аккуратной коммуникацией и фокусом на защиту интересов клиента.',
    reportTitle: 'Пример аналитического отчёта',
    reportHeadline: 'Не поток сырых данных, а управленческий вывод',
    reportText: 'Клиент получает краткую картину риска: что найдено, насколько это критично, какие вопросы требуют уточнения и какие действия рекомендуются.',
    formTitle: 'Оставить заявку на проверку',
    formText: 'Опишите задачу. Мы свяжемся, уточним контекст и предложим формат проверки.',
    footer: 'Конфиденциальность, NDA и аккуратная работа с чувствительной информацией — базовый стандарт M_Art_KYC.',
    success: 'Заявка отправлена. Мы свяжемся с вами после первичного анализа запроса.',
    error: 'Не удалось отправить заявку. Проверьте данные или попробуйте позже.',
    sending: 'Отправляем...',
    formLabel: 'Заявка',
    name: 'Имя',
    company: 'Компания',
    phone: 'Телефон',
    comment: 'Комментарий',
    footerNda: 'NDA по запросу · Конфиденциальная коммуникация',
  },
  en: {
    nav: ['Services', 'Recruitment', 'Methodology', 'Report', 'Contacts'],
    heroKicker: 'Confidential Risk Intelligence · Due Diligence · Business Screening',
    heroTitle: 'Risk checks for business, financial sector and hiring decisions.',
    heroText:
      'M_Art_KYC delivers counterparty checks, candidate screening, employee verification, foreign company due diligence and reputation analysis for banks, investors, law firms, recruitment agencies and enterprise clients.',
    request: 'Request screening',
    consult: 'Get consultation',
    trustedBy: 'For decisions where mistakes cost money, reputation, transaction timing and client trust.',
    metrics: [
      ['24 hours', 'initial request processing'],
      ['10+ sources', 'for multi-layer verification'],
      ['NDA', 'available on request'],
    ],
    servicesTitle: 'Screening for decisions where mistakes are expensive',
    servicesText: 'Not self-service software. Not a dashboard. An expert analytical service with findings, risk logic and recommendations.',
    recruitmentTitle: 'For recruitment agencies, staffing firms and executive search',
    recruitmentHeadline: 'The candidate passed interviews — but failed the client security review?',
    recruitmentText:
      'Agencies lose weeks of work, fees and client trust when a finalist fails internal security checks. M_Art_KYC helps detect biographical, reputational, corporate and international risks before the candidate is submitted to the client.',
    painsTitle: 'What agencies lose',
    valueTitle: 'What pre-screening gives',
    pains: ['recruiter time wasted', 'placement failure', 'candidate search restarted', 'damaged client relationship', 'agency reputation risk', 'lost fee'],
    benefits: ['lower post-offer rejection risk', 'faster hiring process', 'stronger client trust', 'candidate risk snapshot', 'stronger agency positioning', 'fewer late-stage surprises'],
    checkCandidate: 'Screen a candidate',
    howTitle: 'How it works',
    trustTitle: 'Why clients trust us',
    confidentialityTitle: 'Confidentiality by default',
    confidentialityText: 'Every check is conducted with restricted information access, careful communication and a focus on protecting the client’s interests.',
    reportTitle: 'Sample analytical report',
    reportHeadline: 'Not raw data — an executive-level conclusion',
    reportText: 'The client receives a concise risk view: what was found, how critical it is, what requires clarification and what actions are recommended.',
    formTitle: 'Submit a screening request',
    formText: 'Describe the task. We will clarify the context and recommend the right screening format.',
    footer: 'Confidentiality, NDA and careful handling of sensitive information are the baseline M_Art_KYC standard.',
    success: 'Request submitted. We will contact you after an initial review.',
    error: 'Could not submit request. Please check your details or try again later.',
    sending: 'Sending...',
    formLabel: 'Lead form',
    name: 'Name',
    company: 'Company',
    phone: 'Phone',
    comment: 'Comment',
    footerNda: 'NDA-ready · Confidential communication',
  },
};

const serviceSets = {
  ru: [
    ['Проверка контрагентов', 'Финансовые, правовые, репутационные и корпоративные риски партнёра.', Building2],
    ['Проверка сотрудников', 'Оценка благонадёжности персонала для чувствительных ролей.', UserCheck],
    ['Комплексная проверка бизнеса', 'Аналитика перед сделкой, партнёрством или инвестиционным решением.', FileSearch],
    ['Проверка клиентов и партнёров', 'Санкционные, комплаенс и деловые риски в одном отчёте.', Fingerprint],
    ['Проверка иностранных компаний', 'Структура владения, связи, юрисдикции и международный контекст.', Globe2],
    ['Корпоративная разведка', 'Скрытые связи, конфликт интересов, репутационные сигналы.', Radar],
    ['Проверка благонадёжности кандидатов', 'Предварительная проверка до передачи кандидата клиенту.', Users],
    ['Проверка руководителей', 'Проверка топ-менеджеров, директоров и ключевых лиц.', BriefcaseBusiness],
  ],
  en: [
    ['Counterparty checks', 'Financial, legal, reputational and corporate risks of a partner.', Building2],
    ['Employee screening', 'Reliability screening for sensitive positions and internal security.', UserCheck],
    ['Business due diligence', 'Analysis before a deal, partnership or investment decision.', FileSearch],
    ['Client and partner checks', 'Sanctions, compliance and business risks in one report.', Fingerprint],
    ['Foreign company checks', 'Ownership structure, links, jurisdictions and international context.', Globe2],
    ['Corporate intelligence', 'Hidden connections, conflicts of interest and reputation signals.', Radar],
    ['Candidate background screening', 'Pre-screening before the candidate is submitted to the client.', Users],
    ['Executive screening', 'Checks of executives, directors and key decision makers.', BriefcaseBusiness],
  ],
};

const recruitmentServices = {
  ru: [
    'Проверка благонадёжности кандидата',
    'Проверка руководителей и топ-менеджеров',
    'Проверка биографии кандидата',
    'Проверка репутационных рисков',
    'Проверка конфликта интересов',
    'Проверка иностранного опыта работы',
    'Проверка чувствительных должностей',
    'Предварительный профиль риска',
  ],
  en: [
    'Background Screening',
    'Executive Background Check',
    'Candidate Biography Review',
    'Reputation Risk Review',
    'Conflict of Interest Check',
    'Foreign Work Experience Review',
    'Sensitive Positions Screening',
    'Preliminary Risk Snapshot',
  ],
};

const steps = {
  ru: ['Клиент оставляет заявку', 'Аналитики проводят проверку', 'Формируется конфиденциальный отчёт', 'Клиент получает выводы и рекомендации'],
  en: ['Client submits a request', 'Analysts conduct screening', 'Confidential report is prepared', 'Client receives findings and recommendations'],
};

const trustItems = {
  ru: [
    [LockKeyhole, 'Конфиденциальность', 'Ограниченный доступ, аккуратная коммуникация, NDA по запросу.'],
    [Landmark, 'Корпоративная методология', 'Подход для банков, инвесторов, юридических фирм и крупного бизнеса.'],
    [BadgeCheck, 'Экспертные аналитики', 'Не автоматическая выгрузка, а ручная интерпретация найденных рисков.'],
    [Globe2, 'Международный контекст', 'Проверка иностранных компаний, связей, юрисдикций и публичных следов.'],
    [ShieldCheck, 'Риск-ориентированный подход', 'Фокус не на объёме данных, а на значимости для решения клиента.'],
  ],
  en: [
    [LockKeyhole, 'Confidentiality', 'Restricted access, careful communication, NDA available on request.'],
    [Landmark, 'Enterprise methodology', 'Designed for banks, investors, law firms and enterprise clients.'],
    [BadgeCheck, 'Expert analysts', 'Not an automated export, but human interpretation of risk findings.'],
    [Globe2, 'International context', 'Checks of foreign companies, links, jurisdictions and public traces.'],
    [ShieldCheck, 'Risk-based approach', 'Focus not on data volume, but on relevance to the client’s decision.'],
  ],
};

const checkTypes = {
  ru: [
    ['counterparty', 'Проверка контрагента'],
    ['employee', 'Проверка сотрудника'],
    ['due_diligence', 'Комплексная проверка бизнеса'],
    ['aml_kyc', 'Проверка клиента или партнёра'],
    ['foreign_company', 'Проверка иностранной компании'],
    ['risk_intelligence', 'Корпоративная разведка'],
    ['background_screening', 'Проверка кандидата'],
    ['executive_screening', 'Проверка руководителя'],
    ['consultation', 'Консультация'],
  ],
  en: [
    ['counterparty', 'Counterparty check'],
    ['employee', 'Employee screening'],
    ['due_diligence', 'Business due diligence'],
    ['aml_kyc', 'Client or partner check'],
    ['foreign_company', 'Foreign company check'],
    ['risk_intelligence', 'Corporate intelligence'],
    ['background_screening', 'Candidate screening'],
    ['executive_screening', 'Executive screening'],
    ['consultation', 'Consultation'],
  ],
};

function SectionLabel({ children }) {
  return <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-semibold uppercase tracking-[.24em] text-signal">{children}</div>;
}

function PremiumButton({ href, children, secondary = false }) {
  return (
    <a href={href} className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${secondary ? 'border border-white/15 bg-white/[.04] text-white hover:bg-white/[.09]' : 'bg-white text-ink hover:bg-platinum'}`}>
      {children}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  );
}

function IntelligenceOrb({ lang }) {
  const labels = lang === 'ru'
    ? ['санкции', 'репутация', 'связи', 'биография', 'юрисдикции', 'риск']
    : ['sanctions', 'reputation', 'links', 'biography', 'jurisdictions', 'risk'];

  return (
    <div className="glass scan-shell relative min-h-[520px] overflow-hidden rounded-[2rem] p-5 shadow-premium">
      <div className="scan-grid" />
      <div className="scan-beam" />
      <div className="radar-sweep" />
      <div className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-ink/60 px-4 py-2 text-xs uppercase tracking-[.22em] text-steel">
        <Eye className="h-4 w-4 text-signal" /> {lang === 'ru' ? 'режим анализа' : 'analysis mode'}
      </div>
      <div className="relative z-10 flex min-h-[470px] items-center justify-center">
        <div className="scan-orb">
          <div className="scan-core"><ScanLine className="h-10 w-10 text-white/80" /></div>
          {labels.map((label, i) => (
            <span key={label} className={`scan-label scan-label-${i}`}>{label}</span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 left-5 right-5 z-10 rounded-3xl border border-white/10 bg-ink/70 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="text-xs uppercase tracking-[.24em] text-steel">M_Art_KYC</div>
            <div className="mt-1 text-xl font-bold">{lang === 'ru' ? 'Закрытый аналитический контур' : 'Confidential intelligence loop'}</div>
          </div>
          <LockKeyhole className="h-6 w-6 text-signal" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-platinum/70">
          <div className="rounded-2xl bg-white/[.05] p-3">{lang === 'ru' ? 'Сигналы' : 'Signals'}</div>
          <div className="rounded-2xl bg-white/[.05] p-3">{lang === 'ru' ? 'Контекст' : 'Context'}</div>
          <div className="rounded-2xl bg-white/[.05] p-3">{lang === 'ru' ? 'Вывод' : 'Decision'}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState('ru');
  const [status, setStatus] = useState('idle');
  const t = copy[lang];
  const serviceCards = useMemo(() => serviceSets[lang].map(([title, text, Icon]) => ({ title, text, Icon })), [lang]);

  async function submitLead(event) {
    event.preventDefault();
    setStatus('loading');
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.locale = lang;
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? 'success' : 'error');
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <>
      <Head>
        <title>M_Art_KYC — Premium Risk Intelligence</title>
        <meta name="description" content="Confidential counterparty checks, risk intelligence, business due diligence and candidate screening for enterprise clients." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="noise min-h-screen overflow-hidden bg-radial-premium text-white">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
        <div className="cursor-glow hidden lg:block" />

        <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[.06] shadow-glow"><ShieldCheck className="h-5 w-5 text-signal" /></div>
              <div><div className="font-display text-lg font-extrabold tracking-tight">M_Art_KYC</div><div className="text-[10px] uppercase tracking-[.22em] text-steel">{lang === 'ru' ? 'Аналитика рисков' : 'Risk Intelligence'}</div></div>
            </a>
            <nav className="hidden items-center gap-7 text-sm text-platinum/80 lg:flex">
              {t.nav.map((item, i) => <a key={item} href={['#services','#recruitment','#methodology','#report','#contact'][i]} className="hover:text-white">{item}</a>)}
            </nav>
            <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-xs font-bold text-white">{lang.toUpperCase()} / {lang === 'ru' ? 'EN' : 'RU'}</button>
          </div>
        </header>

        <section id="top" className="relative mx-auto max-w-7xl px-5 pb-16 pt-16 lg:pb-24 lg:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
              <SectionLabel>{t.heroKicker}</SectionLabel>
              <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[.95] tracking-[-.05em] text-balance md:text-7xl">{t.heroTitle}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-platinum/75">{t.heroText}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><PremiumButton href="#contact">{t.request}</PremiumButton><PremiumButton href="#contact" secondary>{t.consult}</PremiumButton></div>
              <p className="mt-8 max-w-xl text-sm leading-6 text-steel">{t.trustedBy}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {t.metrics.map(([big, small]) => <div key={big} className="glass rounded-2xl p-4"><div className="text-lg font-bold">{big}</div><div className="mt-1 text-xs text-steel">{small}</div></div>)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}>
              <IntelligenceOrb lang={lang} />
            </motion.div>
          </div>
        </section>

        <div className="ticker-wrap border-y border-white/10 bg-white/[.03] py-3">
          <div className="ticker text-sm uppercase tracking-[.22em] text-platinum/60">
            <span>{lang === 'ru' ? 'Проверка контрагентов • Проверка кандидатов • Корпоративная разведка • Санкционные риски • Проверка иностранных компаний • Проверка руководителей • ' : 'Counterparty checks • Candidate screening • Corporate intelligence • Sanctions risk • Foreign company checks • Executive screening • '}</span>
            <span>{lang === 'ru' ? 'Проверка контрагентов • Проверка кандидатов • Корпоративная разведка • Санкционные риски • Проверка иностранных компаний • Проверка руководителей • ' : 'Counterparty checks • Candidate screening • Corporate intelligence • Sanctions risk • Foreign company checks • Executive screening • '}</span>
          </div>
        </div>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20">
          <SectionLabel>{lang === 'ru' ? 'Услуги' : 'Services'}</SectionLabel>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-[-.04em] md:text-5xl">{t.servicesTitle}</h2><p className="max-w-lg text-platinum/70">{t.servicesText}</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map(({ title, text, Icon }, index) => <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }} key={title} className="group glass service-card rounded-3xl p-6 transition hover:-translate-y-1 hover:bg-white/[.08]"><Icon className="h-7 w-7 text-signal" /><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-steel">{text}</p><ChevronRight className="mt-6 h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" /></motion.div>)}
          </div>
        </section>

        <section id="recruitment" className="mx-auto max-w-7xl px-5 py-20">
          <div className="glass overflow-hidden rounded-[2rem] p-6 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
              <div><SectionLabel>{t.recruitmentTitle}</SectionLabel><h2 className="font-display text-4xl font-extrabold tracking-[-.04em] md:text-6xl">{t.recruitmentHeadline}</h2><p className="mt-6 text-lg leading-8 text-platinum/75">{t.recruitmentText}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><PremiumButton href="#contact">{t.checkCandidate}</PremiumButton><PremiumButton href="#contact" secondary>{t.consult}</PremiumButton></div></div>
              <div className="grid gap-4">
                <div className="rounded-3xl border border-red-300/15 bg-red-400/[.06] p-6"><h3 className="text-xl font-bold">{t.painsTitle}</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.pains.map(x => <div key={x} className="flex items-start gap-3 text-sm text-platinum/75"><span className="mt-1 h-2 w-2 rounded-full bg-red-300" />{x}</div>)}</div></div>
                <div className="rounded-3xl border border-emerald-300/15 bg-emerald-400/[.06] p-6"><h3 className="text-xl font-bold">{t.valueTitle}</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.benefits.map(x => <div key={x} className="flex items-start gap-3 text-sm text-platinum/75"><CheckCircle2 className="mt-.5 h-4 w-4 shrink-0 text-emerald-200" />{x}</div>)}</div></div>
                <div className="rounded-3xl border border-white/10 bg-ink/50 p-6"><h3 className="text-xl font-bold">{lang === 'ru' ? 'Услуги для подбора персонала' : 'Screening services'}</h3><div className="mt-5 flex flex-wrap gap-2">{recruitmentServices[lang].map(x => <span key={x} className="rounded-full border border-white/10 bg-white/[.05] px-3 py-2 text-xs text-platinum/75">{x}</span>)}</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-4 md:grid-cols-4">
            {(lang === 'ru' ? ['Заявки обрабатываются быстро', 'Международные источники', 'Конфиденциальные отчёты', 'Риск-ориентированный подход'] : ['Fast request processing', 'International sources', 'Confidential reports', 'Risk-based methodology']).map((x, i) => (
              <div key={x} className="glass rounded-3xl p-6"><div className="text-3xl font-extrabold text-white">{['24ч','10+','NDA','360°'][i]}</div><div className="mt-2 text-sm leading-6 text-steel">{x}</div></div>
            ))}
          </div>
        </section>

        <section id="methodology" className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div><SectionLabel>{t.howTitle}</SectionLabel><div className="space-y-4">{steps[lang].map((s, i) => <div key={s} className="glass flex gap-5 rounded-3xl p-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-ink font-bold">0{i+1}</div><div><h3 className="text-lg font-bold">{s}</h3><p className="mt-1 text-sm leading-6 text-steel">{lang === 'ru' ? 'Чёткий процесс без личного кабинета: заявка, аналитика, отчёт, рекомендации.' : 'A clear process without client dashboards: request, analysis, report, recommendations.'}</p></div></div>)}</div></div>
            <div><SectionLabel>{t.trustTitle}</SectionLabel><div className="grid gap-4">{trustItems[lang].map(([Icon,title,text]) => <div key={title} className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[.04] p-5"><Icon className="mt-1 h-6 w-6 shrink-0 text-signal" /><div><div className="font-bold">{title}</div><p className="mt-1 text-sm leading-6 text-steel">{text}</p></div></div>)}</div></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="glass grid gap-8 rounded-[2rem] p-8 md:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div><SectionLabel>{t.confidentialityTitle}</SectionLabel><p className="text-lg leading-8 text-platinum/75">{t.confidentialityText}</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {(lang === 'ru' ? ['NDA по запросу', 'Ограниченный доступ аналитиков', 'Конфиденциальная коммуникация', 'Отчёт только для клиента'] : ['NDA on request', 'Restricted analyst access', 'Confidential communication', 'Client-only report']).map(x => <div key={x} className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm text-platinum/75">{x}</div>)}
            </div>
          </div>
        </section>

        <section id="report" className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div><SectionLabel>{t.reportTitle}</SectionLabel><h2 className="font-display text-4xl font-extrabold tracking-[-.04em] md:text-5xl">{t.reportHeadline}</h2><p className="mt-5 text-lg leading-8 text-platinum/70">{t.reportText}</p></div>
            <div className="glass report-glow rounded-[2rem] p-5">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-platinum p-6 text-ink shadow-premium">
                <div className="watermark">CONFIDENTIAL</div>
                <div className="light-reflection" />
                <div className="relative flex items-start justify-between border-b border-ink/10 pb-5"><div><div className="text-xs font-bold uppercase tracking-[.24em] text-ink/45">M_Art_KYC</div><h3 className="mt-2 text-2xl font-extrabold">{lang === 'ru' ? 'Аналитический отчёт по рискам' : 'Risk Assessment Report'}</h3></div><div className="rounded-2xl bg-ink px-4 py-3 text-center text-white"><div className="text-xs text-white/55">{lang === 'ru' ? 'Оценка риска' : 'Risk Score'}</div><div className="text-3xl font-extrabold">72</div></div></div>
                <div className="relative mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-white p-4"><div className="text-xs font-bold uppercase text-ink/45">{lang === 'ru' ? 'Краткий вывод' : 'Executive Summary'}</div><p className="mt-2 text-sm text-ink/70">{lang === 'ru' ? 'Рекомендована углублённая проверка из-за непрозрачной структуры и репутационных сигналов.' : 'Enhanced review recommended due to ownership opacity and reputation signals.'}</p></div><div className="rounded-2xl bg-white p-4"><div className="text-xs font-bold uppercase text-ink/45">{lang === 'ru' ? 'Найденные факторы' : 'Findings'}</div><p className="mt-2 text-sm text-ink/70">{lang === 'ru' ? 'Связи, судебные следы, санкционная близость и публичные упоминания.' : 'Corporate links, litigation traces, sanctions proximity and media exposure.'}</p></div></div>
                <div className="relative mt-4 rounded-2xl bg-ink p-5 text-white"><div className="text-xs font-bold uppercase tracking-[.22em] text-white/45">{lang === 'ru' ? 'Рекомендация' : 'Recommendation'}</div><p className="mt-2 text-sm leading-6 text-white/75">{lang === 'ru' ? 'Продолжать взаимодействие только после уточнений, дополнительных гарантий и документированного решения.' : 'Proceed only with enhanced due diligence, contractual safeguards and documented approval.'}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div><SectionLabel>{t.formLabel}</SectionLabel><h2 className="font-display text-4xl font-extrabold tracking-[-.04em] md:text-5xl">{t.formTitle}</h2><p className="mt-5 text-lg leading-8 text-platinum/70">{t.formText}</p><div className="mt-8 space-y-3 text-sm text-steel"><div className="flex items-center gap-3"><Mail className="h-4 w-4 text-signal" /> contact@mart-kyc.com</div><div className="flex items-center gap-3"><Phone className="h-4 w-4 text-signal" /> Telegram: @mart_kyc</div></div></div>
            <form onSubmit={submitLead} className="glass rounded-[2rem] p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2"><input required name="name" placeholder={t.name} className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /><input name="company" placeholder={t.company} className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /><input required type="email" name="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /><input name="phone" placeholder={t.phone} className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /></div>
              <select name="checkType" className="mt-4 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 text-white outline-none focus:border-signal">{checkTypes[lang].map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select>
              <textarea name="comment" rows="5" placeholder={t.comment} className="mt-4 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" />
              <button disabled={status === 'loading'} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-ink transition hover:bg-platinum disabled:opacity-60">{status === 'loading' ? t.sending : t.request}<Sparkles className="h-4 w-4" /></button>
              {status === 'success' && <p className="mt-4 text-sm text-emerald-200">{t.success}</p>}
              {status === 'error' && <p className="mt-4 text-sm text-red-200">{t.error}</p>}
            </form>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-10 pb-24 md:pb-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-steel md:flex-row"><div><div className="font-display text-xl font-extrabold text-white">M_Art_KYC</div><p className="mt-2 max-w-2xl">{t.footer}</p></div><div className="space-y-1 md:text-right"><div>contact@mart-kyc.com</div><div>Telegram: @mart_kyc</div><div>{t.footerNda}</div></div></div>
        </footer>

        <a href="#contact" className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-white px-5 py-4 text-center text-sm font-extrabold text-ink shadow-premium md:hidden">{t.request}</a>
      </main>
    </>
  );
}
