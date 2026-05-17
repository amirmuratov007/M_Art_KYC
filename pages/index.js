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
} from 'lucide-react';

const copy = {
  ru: {
    nav: ['Услуги', 'Рекрутинг', 'Методология', 'Отчёт', 'Контакты'],
    heroKicker: 'Confidential Risk Intelligence · AML/KYC · Due Diligence',
    heroTitle: 'Проверка рисков до того, как они станут проблемой.',
    heroText:
      'M_Art_KYC проводит комплексные проверки контрагентов, кандидатов, сотрудников и иностранных компаний для банков, финтеха, инвесторов, юридических фирм и крупного бизнеса.',
    request: 'Запросить проверку',
    consult: 'Получить консультацию',
    trustedBy: 'Для решений, где цена ошибки измеряется деньгами, репутацией и доступом к рынкам.',
    metrics: [
      ['Confidential', 'режим обработки данных'],
      ['Risk-based', 'методология проверки'],
      ['Global', 'открытые и международные источники'],
    ],
    servicesTitle: 'Executive-level проверки для сложных решений',
    servicesText: 'Не платформа самообслуживания. Не dashboard. Это аналитическая услуга с выводами, рисками и рекомендациями.',
    recruitmentTitle: 'Для рекрутинговых агентств и executive search',
    recruitmentHeadline: 'Кандидат должен проходить проверку до оффера, а не после провала СБ клиента.',
    recruitmentText:
      'Агентства теряют недели работы, комиссию и доверие клиента, когда финальный кандидат не проходит внутреннюю проверку безопасности. M_Art_KYC помогает заранее выявить биографические, репутационные, корпоративные и международные риски.',
    pains: ['потеря времени команды', 'срыв закрытия вакансии', 'ухудшение отношений с клиентом', 'удар по репутации агентства'],
    benefits: ['снижение риска отказа после оффера', 'ускорение hiring process', 'больше доверия со стороны клиента', 'предварительный risk snapshot по кандидату'],
    checkCandidate: 'Проверить кандидата',
    howTitle: 'Как проходит работа',
    trustTitle: 'Методология, рассчитанная на enterprise-контекст',
    reportTitle: 'Preview confidential report',
    reportText: 'Клиент получает не поток сырых данных, а управленческий вывод: что найдено, насколько это критично и что делать дальше.',
    formTitle: 'Оставить заявку на проверку',
    formText: 'Опишите задачу. Мы свяжемся, уточним контекст и предложим формат проверки.',
    footer: 'Конфиденциальность, NDA и аккуратная работа с чувствительной информацией — базовый стандарт M_Art_KYC.',
    success: 'Заявка отправлена. Мы свяжемся с вами после первичного анализа запроса.',
    error: 'Не удалось отправить заявку. Проверьте данные или попробуйте позже.',
  },
  en: {
    nav: ['Services', 'Recruitment', 'Methodology', 'Report', 'Contacts'],
    heroKicker: 'Confidential Risk Intelligence · AML/KYC · Due Diligence',
    heroTitle: 'Risk checks before risks become problems.',
    heroText:
      'M_Art_KYC delivers counterparty checks, candidate screening, employee verification and foreign company due diligence for banks, fintech, investors, law firms and enterprise clients.',
    request: 'Request screening',
    consult: 'Get consultation',
    trustedBy: 'For decisions where mistakes cost money, reputation and market access.',
    metrics: [
      ['Confidential', 'data handling mode'],
      ['Risk-based', 'screening methodology'],
      ['Global', 'open and international sources'],
    ],
    servicesTitle: 'Executive-level checks for complex decisions',
    servicesText: 'Not self-service software. Not a dashboard. An expert analytical service with findings, risk logic and recommendations.',
    recruitmentTitle: 'For recruitment agencies and executive search',
    recruitmentHeadline: 'Candidates should be screened before the offer — not after failing client security review.',
    recruitmentText:
      'Agencies lose weeks of work, fees and client trust when a finalist fails internal security checks. M_Art_KYC helps detect biographical, reputational, corporate and international risks in advance.',
    pains: ['team time wasted', 'placement failure', 'damaged client relationship', 'agency reputation risk'],
    benefits: ['lower post-offer rejection risk', 'faster hiring process', 'stronger client trust', 'candidate risk snapshot'],
    checkCandidate: 'Screen a candidate',
    howTitle: 'How it works',
    trustTitle: 'Methodology for enterprise context',
    reportTitle: 'Preview confidential report',
    reportText: 'The client receives not raw data, but a management-level view: what was found, how critical it is and what to do next.',
    formTitle: 'Submit a screening request',
    formText: 'Describe the task. We will clarify the context and recommend the right screening format.',
    footer: 'Confidentiality, NDA and careful handling of sensitive information are the baseline M_Art_KYC standard.',
    success: 'Request submitted. We will contact you after an initial review.',
    error: 'Could not submit request. Please check your details or try again later.',
  },
};

const services = [
  ['Проверка контрагентов', 'Counterparty Checks', Building2],
  ['Проверка сотрудников', 'Employee Screening', UserCheck],
  ['Due Diligence', 'Due Diligence', FileSearch],
  ['AML / KYC', 'AML / KYC', Fingerprint],
  ['Проверка иностранных компаний', 'Foreign Company Checks', Globe2],
  ['Корпоративная разведка', 'Corporate Intelligence', Radar],
  ['Background Screening', 'Background Screening', Users],
  ['Executive Screening', 'Executive Screening', BriefcaseBusiness],
];

const recruitmentServices = [
  'Background Screening',
  'Executive Background Check',
  'Проверка топ-менеджеров',
  'Проверка биографии кандидата',
  'Проверка репутационных рисков',
  'Проверка конфликтов интересов',
  'Проверка иностранного опыта работы',
  'Screening для sensitive positions',
];

const stepsRu = ['Клиент оставляет заявку', 'Аналитики проводят проверку', 'Формируется confidential report', 'Клиент получает выводы и рекомендации'];
const stepsEn = ['Client submits a request', 'Analysts conduct screening', 'Confidential report is prepared', 'Client receives findings and recommendations'];

const checkTypes = [
  ['counterparty', 'Проверка контрагента / Counterparty'],
  ['employee', 'Проверка сотрудника / Employee'],
  ['due_diligence', 'Due Diligence'],
  ['aml_kyc', 'AML / KYC'],
  ['foreign_company', 'Иностранная компания / Foreign company'],
  ['risk_intelligence', 'Risk Intelligence'],
  ['background_screening', 'Background Screening'],
  ['executive_screening', 'Executive Screening'],
  ['consultation', 'Консультация / Consultation'],
];

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

export default function Home() {
  const [lang, setLang] = useState('ru');
  const [status, setStatus] = useState('idle');
  const t = copy[lang];
  const steps = lang === 'ru' ? stepsRu : stepsEn;
  const serviceCards = useMemo(() => services.map(([ru, en, Icon]) => ({ title: lang === 'ru' ? ru : en, Icon })), [lang]);

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
        <title>M_Art_KYC — Premium Risk Intelligence & Due Diligence</title>
        <meta name="description" content="Confidential counterparty checks, AML/KYC, due diligence and background screening for enterprise clients." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="noise min-h-screen overflow-hidden bg-radial-premium text-white">
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

        <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <a href="#top" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[.06] shadow-glow"><ShieldCheck className="h-5 w-5 text-signal" /></div>
              <div><div className="font-display text-lg font-extrabold tracking-tight">M_Art_KYC</div><div className="text-[10px] uppercase tracking-[.22em] text-steel">Risk Intelligence</div></div>
            </a>
            <nav className="hidden items-center gap-7 text-sm text-platinum/80 lg:flex">
              {t.nav.map((item, i) => <a key={item} href={['#services','#recruitment','#methodology','#report','#contact'][i]} className="hover:text-white">{item}</a>)}
            </nav>
            <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="rounded-full border border-white/15 bg-white/[.04] px-4 py-2 text-xs font-bold text-white">{lang.toUpperCase()} / {lang === 'ru' ? 'EN' : 'RU'}</button>
          </div>
        </header>

        <section id="top" className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 lg:pb-28 lg:pt-28">
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
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }} className="glass relative rounded-[2rem] p-5 shadow-premium">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-signal/20 blur-3xl" />
              <div className="rounded-[1.5rem] border border-white/10 bg-ink/70 p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><div className="text-xs uppercase tracking-[.25em] text-steel">Confidential brief</div><div className="mt-2 text-2xl font-bold">Risk Intelligence Case</div></div><LockKeyhole className="h-8 w-8 text-signal" /></div>
                <div className="mt-6 space-y-4">
                  {['Ultimate Beneficial Ownership', 'Sanctions / AML Exposure', 'Litigation & Reputation', 'Employment & Biography Signals'].map((x, i) => <div key={x} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.035] p-4"><span className="text-sm text-platinum/80">{x}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${i === 1 ? 'bg-amber-400/15 text-amber-200' : 'bg-emerald-400/15 text-emerald-200'}`}>{i === 1 ? 'Review' : 'Clear'}</span></div>)}
                </div>
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-white/[.10] to-white/[.03] p-5"><div className="text-xs uppercase tracking-[.22em] text-steel">Recommendation</div><p className="mt-2 text-sm leading-6 text-platinum/80">Proceed with enhanced controls, documented rationale and executive approval.</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20">
          <SectionLabel>{lang === 'ru' ? 'Услуги' : 'Services'}</SectionLabel>
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-[-.04em] md:text-5xl">{t.servicesTitle}</h2><p className="max-w-lg text-platinum/70">{t.servicesText}</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map(({ title, Icon }) => <div key={title} className="group glass rounded-3xl p-6 transition hover:-translate-y-1 hover:bg-white/[.08]"><Icon className="h-7 w-7 text-signal" /><h3 className="mt-8 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-steel">{lang === 'ru' ? 'Аналитическая проверка с risk-based выводами и рекомендациями.' : 'Analytical screening with risk-based findings and recommendations.'}</p><ChevronRight className="mt-6 h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-white" /></div>)}
          </div>
        </section>

        <section id="recruitment" className="mx-auto max-w-7xl px-5 py-20">
          <div className="glass overflow-hidden rounded-[2rem] p-6 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
              <div><SectionLabel>{t.recruitmentTitle}</SectionLabel><h2 className="font-display text-4xl font-extrabold tracking-[-.04em] md:text-6xl">{t.recruitmentHeadline}</h2><p className="mt-6 text-lg leading-8 text-platinum/75">{t.recruitmentText}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><PremiumButton href="#contact">{t.checkCandidate}</PremiumButton><PremiumButton href="#contact" secondary>{t.consult}</PremiumButton></div></div>
              <div className="grid gap-4">
                <div className="rounded-3xl border border-red-300/15 bg-red-400/[.06] p-6"><h3 className="text-xl font-bold">Pain points</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.pains.map(x => <div key={x} className="flex items-start gap-3 text-sm text-platinum/75"><span className="mt-1 h-2 w-2 rounded-full bg-red-300" />{x}</div>)}</div></div>
                <div className="rounded-3xl border border-emerald-300/15 bg-emerald-400/[.06] p-6"><h3 className="text-xl font-bold">Business value</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{t.benefits.map(x => <div key={x} className="flex items-start gap-3 text-sm text-platinum/75"><CheckCircle2 className="mt-.5 h-4 w-4 shrink-0 text-emerald-200" />{x}</div>)}</div></div>
                <div className="rounded-3xl border border-white/10 bg-ink/50 p-6"><h3 className="text-xl font-bold">Screening services</h3><div className="mt-5 flex flex-wrap gap-2">{recruitmentServices.map(x => <span key={x} className="rounded-full border border-white/10 bg-white/[.05] px-3 py-2 text-xs text-platinum/75">{x}</span>)}</div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="methodology" className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div><SectionLabel>{t.howTitle}</SectionLabel><div className="space-y-4">{steps.map((s, i) => <div key={s} className="glass flex gap-5 rounded-3xl p-5"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-ink font-bold">0{i+1}</div><div><h3 className="text-lg font-bold">{s}</h3><p className="mt-1 text-sm leading-6 text-steel">{lang === 'ru' ? 'Чёткий процесс без клиентского dashboard: заявка, аналитика, отчёт, рекомендации.' : 'A clear process without client dashboards: request, analysis, report, recommendations.'}</p></div></div>)}</div></div>
            <div><SectionLabel>{t.trustTitle}</SectionLabel><div className="grid gap-4">{[[LockKeyhole,'Confidentiality'],[Landmark,'Enterprise methodology'],[BadgeCheck,'Expert analysts'],[Globe2,'International sources'],[ShieldCheck,'Risk-based approach']].map(([Icon,title]) => <div key={title} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[.04] p-5"><Icon className="h-6 w-6 text-signal" /><div className="font-bold">{title}</div></div>)}</div></div>
          </div>
        </section>

        <section id="report" className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div><SectionLabel>{t.reportTitle}</SectionLabel><h2 className="font-display text-4xl font-extrabold tracking-[-.04em] md:text-5xl">Confidential Report Preview</h2><p className="mt-5 text-lg leading-8 text-platinum/70">{t.reportText}</p></div>
            <div className="glass rounded-[2rem] p-5">
              <div className="rounded-[1.5rem] bg-platinum p-6 text-ink shadow-premium">
                <div className="flex items-start justify-between border-b border-ink/10 pb-5"><div><div className="text-xs font-bold uppercase tracking-[.24em] text-ink/45">M_Art_KYC confidential</div><h3 className="mt-2 text-2xl font-extrabold">Risk Assessment Report</h3></div><div className="rounded-2xl bg-ink px-4 py-3 text-center text-white"><div className="text-xs text-white/55">Risk Score</div><div className="text-3xl font-extrabold">72</div></div></div>
                <div className="mt-6 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-white p-4"><div className="text-xs font-bold uppercase text-ink/45">Executive Summary</div><p className="mt-2 text-sm text-ink/70">Enhanced review recommended due to ownership opacity and reputation signals.</p></div><div className="rounded-2xl bg-white p-4"><div className="text-xs font-bold uppercase text-ink/45">Findings</div><p className="mt-2 text-sm text-ink/70">Corporate links, litigation traces, sanctions proximity and media exposure.</p></div></div>
                <div className="mt-4 rounded-2xl bg-ink p-5 text-white"><div className="text-xs font-bold uppercase tracking-[.22em] text-white/45">Recommendation</div><p className="mt-2 text-sm leading-6 text-white/75">Proceed only with enhanced due diligence, contractual safeguards and documented approval.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div><SectionLabel>{lang === 'ru' ? 'Заявка' : 'Lead form'}</SectionLabel><h2 className="font-display text-4xl font-extrabold tracking-[-.04em] md:text-5xl">{t.formTitle}</h2><p className="mt-5 text-lg leading-8 text-platinum/70">{t.formText}</p><div className="mt-8 space-y-3 text-sm text-steel"><div className="flex items-center gap-3"><Mail className="h-4 w-4 text-signal" /> contact@mart-kyc.com</div><div className="flex items-center gap-3"><Phone className="h-4 w-4 text-signal" /> Telegram: @mart_kyc</div></div></div>
            <form onSubmit={submitLead} className="glass rounded-[2rem] p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2"><input required name="name" placeholder="Имя / Name" className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /><input name="company" placeholder="Компания / Company" className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /><input required type="email" name="email" placeholder="Email" className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /><input name="phone" placeholder="Телефон / Phone" className="rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" /></div>
              <select name="checkType" className="mt-4 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 text-white outline-none focus:border-signal">{checkTypes.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select>
              <textarea name="comment" rows="5" placeholder="Комментарий / Comment" className="mt-4 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-4 outline-none focus:border-signal" />
              <button disabled={status === 'loading'} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-bold text-ink transition hover:bg-platinum disabled:opacity-60">{status === 'loading' ? 'Sending...' : t.request}<Sparkles className="h-4 w-4" /></button>
              {status === 'success' && <p className="mt-4 text-sm text-emerald-200">{t.success}</p>}
              {status === 'error' && <p className="mt-4 text-sm text-red-200">{t.error}</p>}
            </form>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-steel md:flex-row"><div><div className="font-display text-xl font-extrabold text-white">M_Art_KYC</div><p className="mt-2 max-w-2xl">{t.footer}</p></div><div className="space-y-1 md:text-right"><div>contact@mart-kyc.com</div><div>Telegram: @mart_kyc</div><div>NDA-ready · Confidential by design</div></div></div>
        </footer>
      </main>
    </>
  );
}
