import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useHeimdallAuth } from '@/components/HeimdallAuthProvider'
import { ArrowRight, AlertTriangle, CheckCircle2, Gauge, ShieldCheck, Sparkles } from 'lucide-react'

export const riskTestCatalog = [
  {
    id: 'deal',
    ruTitle: 'Риск сделки перед оплатой',
    enTitle: 'Deal risk before payment',
    ruShort: 'Для договоров, авансов, подрядчиков и B2B-сделок.',
    enShort: 'For contracts, prepayments, contractors and B2B deals.',
    ruService: 'Экспресс-оценка риска сделки',
    enService: 'Quick deal risk score',
    ruTag: 'Сделка',
    enTag: 'Deal',
    questions: {
      ru: [
        ['advance', 'Контрагент просит аванс или оплату до результата?', [['Нет, оплата после понятного этапа', 0], ['Да, частичный аванс', 9], ['Да, существенный аванс или полная предоплата', 17]]],
        ['pressure', 'Вас торопят с оплатой, подписанием или переводом денег?', [['Нет, сроки обычные', 0], ['Есть мягкое давление', 8], ['Сильно давят и обещают потерю условий', 16]]],
        ['requisites', 'Реквизиты, договор и переписка относятся к одной компании?', [['Да, все совпадает', 0], ['Есть мелкие расхождения', 10], ['Счет, договор или контакт от разных лиц/компаний', 22]]],
        ['identity', 'Понятно, кто подписывает документы и имеет ли он полномочия?', [['Да, полномочия понятны', 0], ['Пока не проверяли', 8], ['Подписант непонятен или избегает подтверждений', 16]]],
        ['digital', 'Есть сайт, корпоративная почта и проверяемые контакты?', [['Да, цифровой контур выглядит цельно', 0], ['Есть только часть признаков', 7], ['Только мессенджер, личная почта или новый домен', 15]]],
        ['documents', 'Контрагент спокойно дает документы и отвечает на вопросы?', [['Да, отвечает нормально', 0], ['Отвечает выборочно', 8], ['Уходит от вопросов или присылает формальные документы', 16]]],
        ['amount', 'Сумма сделки существенная для вашего бизнеса?', [['Нет, сумма некритичная', 0], ['Да, заметная сумма', 7], ['Да, ошибка будет болезненной', 14]]],
        ['inside', 'Кто-то внутри компании уже проверил сделку по регламенту?', [['Да, есть понятная проверка', 0], ['Проверили поверхностно', 7], ['Нет, решение принимается по переписке и обещаниям', 15]]]
      ],
      en: [
        ['advance', 'Does the counterparty ask for advance payment before a clear milestone?', [['No, payment is tied to a clear stage', 0], ['Yes, partial advance payment', 9], ['Yes, large advance or full prepayment', 17]]],
        ['pressure', 'Are you being pushed to pay, sign or transfer money quickly?', [['No, timing is normal', 0], ['There is some pressure', 8], ['Strong pressure and fear of losing terms', 16]]],
        ['requisites', 'Do the bank details, contract and communication belong to the same company?', [['Yes, everything matches', 0], ['There are minor inconsistencies', 10], ['Invoice, contract or contact comes from different entities', 22]]],
        ['identity', 'Is it clear who signs the documents and whether they are authorized?', [['Yes, authority is clear', 0], ['Not checked yet', 8], ['Signer is unclear or avoids confirmation', 16]]],
        ['digital', 'Is there a credible website, corporate email and verifiable contact pattern?', [['Yes, the digital footprint looks consistent', 0], ['Only some indicators are present', 7], ['Only messenger, personal email or a new domain', 15]]],
        ['documents', 'Does the counterparty provide documents and answer questions calmly?', [['Yes, they respond normally', 0], ['They answer selectively', 8], ['They avoid questions or provide formal documents only', 16]]],
        ['amount', 'Is the deal amount material for your business?', [['No, the amount is not critical', 0], ['Yes, the amount is meaningful', 7], ['Yes, a mistake would be painful', 14]]],
        ['inside', 'Has anyone inside your company checked the deal under a clear procedure?', [['Yes, there is a clear review', 0], ['Only a surface check was made', 7], ['No, decision is based on messages and promises', 15]]]
      ]
    }
  },
  {
    id: 'supplier',
    ruTitle: 'Поставщик и аванс',
    enTitle: 'Supplier and prepayment',
    ruShort: 'Для закупок, Китая, маркетплейсов, импорта и срочной предоплаты.',
    enShort: 'For procurement, China, marketplaces, import and urgent prepayment.',
    ruService: 'Риск-тест поставщика перед авансом',
    enService: 'Supplier prepayment risk test',
    ruTag: 'Поставщик',
    enTag: 'Supplier',
    questions: {
      ru: [
        ['advance', 'Поставщик просит оплату до подтверждения товара, склада или отгрузки?', [['Нет, есть понятные этапы', 0], ['Частично', 9], ['Да, требует существенный аванс', 18]]],
        ['company', 'Компания в договоре совпадает с реквизитами и контактом менеджера?', [['Да, все совпадает', 0], ['Есть неясности', 10], ['Нет, разные компании или посредники', 22]]],
        ['proof', 'Есть проверяемые доказательства товара, склада, производства или прошлых поставок?', [['Да, есть подтверждения', 0], ['Есть только фото/обещания', 8], ['Нет, подтвердить не могут', 17]]],
        ['price', 'Цена заметно ниже рынка?', [['Нет', 0], ['Ниже, но объяснимо', 7], ['Сильно ниже рынка', 15]]],
        ['communication', 'Поставщик использует корпоративную почту, сайт и понятные каналы связи?', [['Да', 0], ['Частично', 7], ['Только мессенджер или личная почта', 15]]],
        ['urgency', 'Вас торопят с оплатой, ссылаясь на дедлайн, склад или скидку?', [['Нет', 0], ['Есть давление', 8], ['Сильно торопят', 16]]],
        ['documents', 'Документы, сертификаты и инвойсы выглядят проверяемыми?', [['Да', 0], ['Нужна проверка', 7], ['Есть признаки чужих или формальных документов', 16]]],
        ['route', 'Понятна логистика, получатель денег и сторона договора?', [['Да', 0], ['Есть пробелы', 8], ['Нет, схема запутана', 17]]]
      ],
      en: [
        ['advance', 'Does the supplier request payment before product, warehouse or shipment proof?', [['No, clear milestones exist', 0], ['Partly', 9], ['Yes, large prepayment is required', 18]]],
        ['company', 'Does the company in the contract match payment details and manager contact?', [['Yes, all matches', 0], ['There are unclear points', 10], ['No, different entities or intermediaries', 22]]],
        ['proof', 'Is there verifiable proof of goods, warehouse, production or past shipments?', [['Yes, there is proof', 0], ['Only photos or promises', 8], ['No, they cannot confirm', 17]]],
        ['price', 'Is the price noticeably below market?', [['No', 0], ['Lower but explainable', 7], ['Far below market', 15]]],
        ['communication', 'Does the supplier use corporate email, website and clear channels?', [['Yes', 0], ['Partly', 7], ['Only messenger or personal email', 15]]],
        ['urgency', 'Are you being rushed to pay because of deadline, stock or discount?', [['No', 0], ['There is pressure', 8], ['Strong pressure', 16]]],
        ['documents', 'Do certificates, invoices and documents look verifiable?', [['Yes', 0], ['Needs review', 7], ['Signs of copied or formal documents', 16]]],
        ['route', 'Are logistics, payment recipient and contract party clear?', [['Yes', 0], ['There are gaps', 8], ['No, the scheme is confusing', 17]]]
      ]
    }
  },
  {
    id: 'infosec',
    ruTitle: 'Информационная безопасность',
    enTitle: 'Information security',
    ruShort: 'Для утечек, доступов, подрядчиков, фишинга и цифрового периметра.',
    enShort: 'For leaks, access rights, contractors, phishing and digital perimeter.',
    ruService: 'Экспресс-оценка ИБ-рисков',
    enService: 'Quick information security risk score',
    ruTag: 'ИБ',
    enTag: 'InfoSec',
    questions: {
      ru: [
        ['access', 'Есть актуальный список, кто имеет доступ к почте, CRM, облакам и админкам?', [['Да, список ведется', 0], ['Частично', 8], ['Нет, доступы разрознены', 18]]],
        ['offboarding', 'Доступы бывших сотрудников отключаются в день увольнения?', [['Да', 0], ['Не всегда', 9], ['Не контролируется', 18]]],
        ['mfa', 'Включена двухфакторная защита для ключевых сервисов?', [['Да, везде где нужно', 0], ['Частично', 8], ['Нет или неизвестно', 17]]],
        ['contractors', 'Подрядчики имеют только ограниченные и временные доступы?', [['Да', 0], ['Иногда', 8], ['Нет, доступы широкие или вечные', 17]]],
        ['phishing', 'Сотрудники знают, что делать при подозрительных письмах и ссылках?', [['Да, есть порядок', 0], ['На словах', 7], ['Нет', 15]]],
        ['backup', 'Есть резервные копии критичных данных и проверка восстановления?', [['Да', 0], ['Копии есть, восстановление не проверяли', 8], ['Нет понятной схемы', 17]]],
        ['leaks', 'Проверялись ли утечки доменной почты, паролей и публичных следов?', [['Да, регулярно', 0], ['Давно или частично', 8], ['Нет', 16]]],
        ['incident', 'Есть план действий при утечке, взломе или компрометации?', [['Да', 0], ['Частично', 7], ['Нет, будем решать по факту', 16]]]
      ],
      en: [
        ['access', 'Do you have an up-to-date list of who has access to email, CRM, clouds and admin panels?', [['Yes, it is maintained', 0], ['Partly', 8], ['No, access is fragmented', 18]]],
        ['offboarding', 'Are former employees disabled on the day they leave?', [['Yes', 0], ['Not always', 9], ['Not controlled', 18]]],
        ['mfa', 'Is two-factor authentication enabled for key services?', [['Yes, where needed', 0], ['Partly', 8], ['No or unknown', 17]]],
        ['contractors', 'Do contractors have limited and temporary access only?', [['Yes', 0], ['Sometimes', 8], ['No, access is broad or permanent', 17]]],
        ['phishing', 'Do employees know what to do with suspicious emails and links?', [['Yes, there is a procedure', 0], ['Informally', 7], ['No', 15]]],
        ['backup', 'Are critical backups and restore checks in place?', [['Yes', 0], ['Backups exist, restore not tested', 8], ['No clear scheme', 17]]],
        ['leaks', 'Have leaked domain emails, passwords and public traces been checked?', [['Yes, regularly', 0], ['Long ago or partly', 8], ['No', 16]]],
        ['incident', 'Is there an incident plan for leak, hack or compromise?', [['Yes', 0], ['Partly', 7], ['No, we will decide after the fact', 16]]]
      ]
    }
  },
  {
    id: 'internal',
    ruTitle: 'Внутренние нарушения',
    enTitle: 'Internal misconduct',
    ruShort: 'Для подозрений на откаты, утечки, конфликт интересов и злоупотребления.',
    enShort: 'For kickbacks, leaks, conflict of interest and abuse concerns.',
    ruService: 'Экспресс-оценка внутренних рисков',
    enService: 'Quick internal risk score',
    ruTag: 'Внутри компании',
    enTag: 'Internal',
    questions: {
      ru: [
        ['signals', 'Есть повторяющиеся сигналы: потери, странные закупки, жалобы, утечки?', [['Нет', 0], ['Есть отдельные сигналы', 9], ['Да, сигналы повторяются', 18]]],
        ['control', 'Есть разделение ролей в закупках, оплатах и согласованиях?', [['Да', 0], ['Частично', 8], ['Нет, все держится на 1-2 людях', 17]]],
        ['conflict', 'Проверялись ли связи сотрудников с поставщиками или подрядчиками?', [['Да', 0], ['Только точечно', 8], ['Нет', 17]]],
        ['access', 'Есть контроль доступа к коммерческой информации и клиентской базе?', [['Да', 0], ['Частично', 8], ['Нет', 16]]],
        ['evidence', 'Есть факты или документы, а не только слухи?', [['Да, есть факты', 7], ['Есть косвенные признаки', 9], ['Пока только подозрения', 5]]],
        ['reaction', 'Компания уже пыталась разбираться внутри?', [['Да, по процедуре', 0], ['Пыталась неформально', 8], ['Нет, боимся спугнуть людей', 16]]],
        ['damage', 'Потенциальный ущерб существенный?', [['Нет', 0], ['Да, заметный', 7], ['Да, может быть критичным', 15]]],
        ['legal', 'Есть готовность действовать законно, без серых методов и давления?', [['Да', 0], ['Нужно объяснить границы', 5], ['Ожидают быстрых неформальных методов', 16]]]
      ],
      en: [
        ['signals', 'Are there repeated signals: losses, strange purchases, complaints or leaks?', [['No', 0], ['Separate signals exist', 9], ['Yes, signals repeat', 18]]],
        ['control', 'Are roles separated in procurement, payments and approvals?', [['Yes', 0], ['Partly', 8], ['No, 1-2 people control everything', 17]]],
        ['conflict', 'Have employee links to suppliers or contractors been checked?', [['Yes', 0], ['Only selectively', 8], ['No', 17]]],
        ['access', 'Is commercial information and customer database access controlled?', [['Yes', 0], ['Partly', 8], ['No', 16]]],
        ['evidence', 'Are there facts or documents, not only rumors?', [['Yes, facts exist', 7], ['There are indirect signs', 9], ['Only suspicions so far', 5]]],
        ['reaction', 'Has the company tried to handle this internally?', [['Yes, under procedure', 0], ['Informally', 8], ['No, we are afraid to alert people', 16]]],
        ['damage', 'Is potential damage material?', [['No', 0], ['Yes, noticeable', 7], ['Yes, it can be critical', 15]]],
        ['legal', 'Are you ready to act legally, without grey methods or pressure?', [['Yes', 0], ['Need boundaries explained', 5], ['Expecting quick informal methods', 16]]]
      ]
    }
  },

  {
    id: 'private_staff',
    ruTitle: 'Домашний персонал',
    enTitle: 'Household staff',
    ruShort: 'Для няни, сиделки, водителя, помощника, садовника, сторожа и домработницы.',
    enShort: 'For a nanny, caregiver, driver, assistant, gardener, guard or housekeeper.',
    ruService: 'Риск-тест домашнего персонала',
    enService: 'Household staff risk test',
    ruTag: 'Домашний персонал',
    enTag: 'Household staff',
    questions: {
      ru: [
        ['children', 'Будет ли человек оставаться с детьми или пожилыми родственниками без постоянного контроля?', [['Нет', 0], ['Иногда', 10], ['Да, регулярно', 20]]],
        ['keys', 'Будет ли доступ к ключам, дому, автомобилю или отдельным помещениям?', [['Нет', 0], ['Ограниченный доступ', 8], ['Да, широкий доступ', 18]]],
        ['documents', 'Будет ли доступ к документам, деньгам, банковским картам или личной информации семьи?', [['Нет', 0], ['Возможен косвенный доступ', 10], ['Да, доступ будет', 20]]],
        ['references', 'Есть ли проверяемые рекомендации от прошлых работодателей?', [['Да, несколько проверяемых рекомендаций', 0], ['Есть, но не проверяли', 8], ['Нет или рекомендации неясные', 16]]],
        ['identity', 'Совпадают ли документы, анкета, опыт и рассказ кандидата?', [['Да, все выглядит последовательно', 0], ['Есть вопросы', 8], ['Есть заметные несостыковки', 18]]],
        ['agreement', 'Планируется ли договор, согласие на проверку и понятный испытательный период?', [['Да, все будет оформлено', 0], ['Частично', 8], ['Нет, договорились устно', 16]]],
        ['routine', 'Будет ли человек знать распорядок семьи, поездки, адреса, привычки и график отсутствия дома?', [['Нет', 0], ['Частично', 7], ['Да, будет знать регулярно', 15]]],
        ['urgency', 'Найм происходит срочно, без времени на проверку?', [['Нет, есть время проверить', 0], ['Есть умеренная срочность', 7], ['Да, нужно выпускать сразу', 15]]]
      ],
      en: [
        ['children', 'Will the person stay with children or elderly relatives without constant supervision?', [['No', 0], ['Sometimes', 10], ['Yes, regularly', 20]]],
        ['keys', 'Will the person have access to keys, home, vehicle or separate rooms?', [['No', 0], ['Limited access', 8], ['Yes, broad access', 18]]],
        ['documents', 'Will there be access to documents, money, bank cards or family private information?', [['No', 0], ['Indirect access is possible', 10], ['Yes, access will exist', 20]]],
        ['references', 'Are there verifiable references from previous employers?', [['Yes, several verifiable references', 0], ['There are references, not checked yet', 8], ['No or unclear references', 16]]],
        ['identity', 'Do documents, questionnaire, experience and candidate story match?', [['Yes, everything looks consistent', 0], ['There are questions', 8], ['There are noticeable inconsistencies', 18]]],
        ['agreement', 'Will there be an agreement, consent for review and a clear trial period?', [['Yes, everything will be formalized', 0], ['Partly', 8], ['No, verbal arrangement only', 16]]],
        ['routine', 'Will the person know family routines, trips, addresses, habits and absence schedule?', [['No', 0], ['Partly', 7], ['Yes, regularly', 15]]],
        ['urgency', 'Is the hire urgent, with no time for review?', [['No, there is time to check', 0], ['Moderate urgency', 7], ['Yes, needs to start immediately', 15]]]
      ]
    }
  },
  {
    id: 'outsourcing',
    ruTitle: 'Нужна ли внешняя СБ',
    enTitle: 'Do you need outsourced security',
    ruShort: 'Для собственников, у которых нет своей службы безопасности или она перегружена.',
    enShort: 'For owners without an internal security department or with overloaded teams.',
    ruService: 'Тест необходимости внешней службы безопасности',
    enService: 'Outsourced security need test',
    ruTag: 'Служба безопасности',
    enTag: 'Security team',
    questions: {
      ru: [
        ['owner', 'Кто сейчас проверяет контрагентов, поставщиков и кандидатов?', [['Есть ответственный процесс', 0], ['Разные люди по ситуации', 8], ['Никто системно не проверяет', 18]]],
        ['volume', 'Сколько рискованных решений в месяц принимает компания?', [['1-2', 3], ['3-10', 9], ['Больше 10', 16]]],
        ['regulation', 'Есть регламент проверки перед авансом, сделкой или наймом?', [['Да', 0], ['Частично', 8], ['Нет', 16]]],
        ['incidents', 'Были ли потери из-за контрагентов, сотрудников, утечек или ошибок доступа?', [['Нет', 0], ['Были отдельные случаи', 10], ['Да, проблема повторяется', 20]]],
        ['expertise', 'Есть ли внутри компетенции по Due Diligence, ИБ и внутренним расследованиям?', [['Да', 0], ['Частично', 8], ['Нет', 17]]],
        ['speed', 'Нужно ли получать выводы быстро, без найма штатной СБ?', [['Нет', 0], ['Иногда', 7], ['Да, регулярно', 15]]],
        ['budget', 'Компания готова платить за снижение рисков ежемесячно?', [['Пока нет', 2], ['Готовы к точечным задачам', 7], ['Да, нужен контур сопровождения', 13]]],
        ['growth', 'Компания растет, выходит в новые регионы, рынки или закупки?', [['Нет', 0], ['Планирует', 7], ['Да, уже идет рост', 15]]]
      ],
      en: [
        ['owner', 'Who checks counterparties, suppliers and candidates today?', [['There is a responsible process', 0], ['Different people ad hoc', 8], ['No systematic checks', 18]]],
        ['volume', 'How many risky decisions does the company make per month?', [['1-2', 3], ['3-10', 9], ['More than 10', 16]]],
        ['regulation', 'Is there a procedure before prepayment, deal or hiring?', [['Yes', 0], ['Partly', 8], ['No', 16]]],
        ['incidents', 'Were there losses due to counterparties, employees, leaks or access mistakes?', [['No', 0], ['Separate cases', 10], ['Yes, it repeats', 20]]],
        ['expertise', 'Do you have internal expertise in due diligence, info security and investigations?', [['Yes', 0], ['Partly', 8], ['No', 17]]],
        ['speed', 'Do you need quick conclusions without hiring an internal security team?', [['No', 0], ['Sometimes', 7], ['Yes, regularly', 15]]],
        ['budget', 'Is the company ready to pay monthly to reduce risk?', [['Not yet', 2], ['Ready for point tasks', 7], ['Yes, need ongoing support', 13]]],
        ['growth', 'Is the company growing, entering new regions, markets or procurement streams?', [['No', 0], ['Planning to', 7], ['Yes, growth is underway', 15]]]
      ]
    }
  }
]

function normalizeQuestions(items) {
  return items.map(([id, text, answers]) => ({ id, text, answers }))
}

function getRiskLevel(score, ru, testId) {
  const outsourcing = testId === 'outsourcing'
  if (score >= 76) {
    return {
      label: outsourcing ? (ru ? 'Сильная потребность во внешней СБ' : 'Strong need for outsourced security') : (ru ? 'Критический риск' : 'Critical risk'),
      tone: 'border-red-300/35 bg-red-300/10 text-red-100',
      cta: outsourcing ? (ru ? 'Лучше обсудить постоянный контур сопровождения.' : 'Ongoing support should be discussed.') : (ru ? 'Не принимайте решение без ручной проверки.' : 'Do not proceed without manual review.'),
      description: outsourcing
        ? (ru ? 'Ответы показывают, что компания регулярно принимает рискованные решения без устойчивого контура безопасности.' : 'Answers indicate regular risky decisions without a stable security function.')
        : (ru ? 'В ответах есть набор сильных красных флагов. Нужна ручная проверка специалистом HEIMDALL.' : 'The answers contain several strong red flags. A manual HEIMDALL review is recommended.')
    }
  }
  if (score >= 50) {
    return {
      label: outsourcing ? (ru ? 'Потребность высокая' : 'High need') : (ru ? 'Высокий риск' : 'High risk'),
      tone: 'border-orange-300/35 bg-orange-300/10 text-orange-100',
      cta: ru ? 'Лучше разобрать ситуацию до оплаты, подписания или внутреннего решения.' : 'It is better to review the situation before payment, signing or internal action.',
      description: ru ? 'Ситуация не выглядит безопасной по быстрым признакам. Стоит провести ручную проверку и зафиксировать план действий.' : 'The situation does not look safe based on quick indicators. A manual review and action plan are recommended.'
    }
  }
  if (score >= 25) {
    return {
      label: ru ? 'Умеренный риск' : 'Moderate risk',
      tone: 'border-[#D6A84F]/35 bg-[#D6A84F]/10 text-[#F7D784]',
      cta: ru ? 'Проверьте спорные места до принятия решения.' : 'Review the questionable points before deciding.',
      description: ru ? 'Критических сигналов может не быть, но есть неопределенность. Минимум стоит проверить ключевые факты.' : 'There may be no critical signal, but uncertainty remains. Key facts should be checked at minimum.'
    }
  }
  return {
    label: ru ? 'Низкий быстрый риск' : 'Low quick risk',
    tone: 'border-emerald-300/35 bg-emerald-300/10 text-emerald-100',
    cta: ru ? 'Для существенных решений все равно нужна ручная проверка.' : 'Material decisions may still require manual review.',
    description: ru ? 'По быстрым ответам риск выглядит ниже среднего. Это не заключение, а предварительный скрининг по вашим ответам.' : 'Based on quick answers, risk appears below average. This is a preliminary screening based on your answers, not a conclusion.'
  }
}

export default function HeimdallRiskTest({ language = 'ru', compact = false, testId = 'deal' }) {
  const ru = language !== 'en'
  const test = riskTestCatalog.find((item) => item.id === testId) || riskTestCatalog[0]
  const allQuestions = normalizeQuestions(test.questions[ru ? 'ru' : 'en'])
  const visibleQuestions = compact ? allQuestions.slice(0, 4) : allQuestions
  const { user, refreshSession } = useHeimdallAuth()
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ name: user?.user_metadata?.full_name || user?.email || '', company: '', contact: user?.email || '', details: '', website: '' })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const title = ru ? test.ruTitle : test.enTitle
  const service = ru ? test.ruService : test.enService
  const answeredCount = Object.keys(answers).length
  const score = useMemo(() => Object.values(answers).reduce((sum, value) => sum + Number(value || 0), 0), [answers])
  const maxScore = useMemo(() => visibleQuestions.reduce((sum, question) => sum + Math.max(...question.answers.map((answer) => Number(answer[1] || 0))), 0), [visibleQuestions])
  const normalizedScore = maxScore > 0 ? Math.min(100, Math.round((score / maxScore) * 100)) : 0
  const risk = getRiskLevel(normalizedScore, ru, test.id)
  const isComplete = answeredCount === visibleQuestions.length
  const isAuthenticated = Boolean(user)

  const selectedLabels = visibleQuestions.map((question) => {
    const selected = question.answers.find((answer) => String(answer[1]) === String(answers[question.id]))
    return `${question.text}: ${selected ? selected[0] : ru ? 'не отвечено' : 'not answered'}`
  })

  const updateContact = (key, value) => setContact((current) => ({ ...current, [key]: value }))

  async function submit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')

    try {
      if (!isComplete) {
        throw new Error(ru ? 'Ответьте на все вопросы теста.' : 'Please answer all test questions.')
      }

      const detailsText = [
        ru ? `Риск-тест: ${title}` : `Risk test: ${title}`,
        ru ? `Результат: ${risk.label}` : `Result: ${risk.label}`,
        ru ? `Балл риска: ${normalizedScore}/100` : `Risk score: ${normalizedScore}/100`,
        '',
        ru ? 'Ответы:' : 'Answers:',
        ...selectedLabels,
        '',
        ru ? 'Комментарий клиента:' : 'Client note:',
        contact.details || (ru ? 'Не указан' : 'Not provided')
      ].join('\n')

      let response

      if (isAuthenticated) {
        const currentSession = await refreshSession()
        const accessToken = currentSession?.access_token
        if (!accessToken) throw new Error(ru ? 'Сессия истекла. Войдите в кабинет заново.' : 'Session expired. Please sign in again.')

        response = await fetch('/api/client-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify({
            service,
            urgency: normalizedScore >= 50 ? (ru ? 'Срочная' : 'Urgent') : (ru ? 'Обычная' : 'Normal'),
            subject: ru ? `${title}: ${risk.label}` : `${title}: ${risk.label}`,
            details: detailsText,
            company: contact.company,
            contact: contact.contact || user?.email || '',
            fullName: contact.name || user?.user_metadata?.full_name || user?.email || '',
            website: contact.website
          })
        })
      } else {
        response = await fetch('/api/contact-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contact.name,
            company: contact.company,
            contact: contact.contact,
            topic: ru ? `${title}: ${risk.label}` : `${title}: ${risk.label}`,
            language: ru ? 'ru' : 'en',
            source: compact ? `homepage_risk_test_${test.id}` : `risk_test_${test.id}`,
            message: detailsText,
            website: contact.website
          })
        })
      }

      const data = await response.json().catch(() => ({}))
      if (!response.ok || data.ok === false) throw new Error(data.error || (ru ? 'Не удалось отправить результат.' : 'Could not submit the result.'))
      setStatus('success')
      setContact((current) => ({ ...current, details: '' }))
    } catch (submitError) {
      setStatus('error')
      setError(submitError.message || (ru ? 'Не удалось отправить результат.' : 'Could not submit the result.'))
    }
  }

  return (
    <section className={compact ? 'relative z-10 mx-auto max-w-7xl px-4 pb-16 sm:px-5 sm:pb-24' : 'relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-5 md:py-24'}>
      <div className={`grid gap-7 rounded-[36px] border border-sky-300/20 bg-sky-300/[0.07] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[42px] sm:p-8 ${compact ? 'lg:grid-cols-[0.88fr_1.12fr]' : 'lg:grid-cols-[0.82fr_1.18fr]'}`}>
        <div className="min-w-0">
          <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#F7D784]">
            <Gauge className="h-4 w-4 shrink-0" />
            <span className="truncate">{ru ? 'Бесплатный риск-тест' : 'Free risk test'}</span>
          </div>
          <h2 className="mt-6 text-3xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
            {compact ? (ru ? 'Выберите риск-тест под свою ситуацию' : 'Choose a risk test for your situation') : title}
          </h2>
          <p className="mt-5 text-base leading-8 text-white/64 sm:text-lg">
            {ru ? 'Это предварительный скоринг по вашим ответам. Не расследование, не юридическое заключение и не полная проверка.' : 'This is a preliminary score based on your answers. It is not an investigation, legal opinion or full verification.'}
          </p>
          <div className="mt-6 grid gap-3">
            {[
              ru ? 'результат сразу на экране' : 'instant result on screen',
              ru ? 'без документов и без регистрации' : 'no documents and no registration',
              ru ? 'результат можно отправить в HEIMDALL' : 'result can be sent to HEIMDALL'
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white/70">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                {item}
              </div>
            ))}
          </div>
          {compact && (
            <Link href={ru ? '/risk-test#risk-tests' : '/risk-test-en#risk-tests'} className="mt-7 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D6A84F] px-6 py-4 font-semibold text-[#050816]">
              {ru ? 'Открыть меню тестов' : 'Open test menu'} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <form onSubmit={submit} className="min-w-0 rounded-[30px] border border-white/10 bg-[#050816]/72 p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-sky-100">{ru ? test.ruTag : test.enTag}</div>
            {!compact && (
              <Link href={ru ? '/risk-test#risk-tests' : '/risk-test-en#risk-tests'} className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/60 hover:text-white">
                {ru ? 'Выбрать другой тест' : 'Choose another test'}
              </Link>
            )}
          </div>
          <div className="grid gap-4">
            {visibleQuestions.map((question, index) => (
              <div key={question.id} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D6A84F]/25 bg-[#D6A84F]/10 text-sm font-semibold text-[#F7D784]">{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold leading-6 text-white">{question.text}</div>
                    <div className="mt-3 grid gap-2">
                      {question.answers.map(([label, points]) => (
                        <button key={`${question.id}-${points}`} type="button" onClick={() => setAnswers((current) => ({ ...current, [question.id]: points }))} className={`rounded-2xl border px-4 py-3 text-left text-sm leading-6 transition ${String(answers[question.id]) === String(points) ? 'border-[#D6A84F]/55 bg-[#D6A84F]/15 text-[#F7D784]' : 'border-white/10 bg-black/20 text-white/68 hover:border-sky-300/30 hover:text-white'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-5 rounded-[24px] border p-5 ${risk.tone}`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <div className="text-xl font-semibold tracking-[-0.03em]">{isComplete ? risk.label : (ru ? 'Ответьте на вопросы' : 'Answer the questions')}</div>
                <p className="mt-2 text-sm leading-6 opacity-85">{isComplete ? risk.description : (ru ? 'После заполнения тест покажет предварительный риск-профиль.' : 'After completion, the test will show a preliminary risk profile.')}</p>
                {isComplete && <div className="mt-3 text-sm font-semibold opacity-95">{ru ? `Балл риска: ${normalizedScore}/100` : `Risk score: ${normalizedScore}/100`}</div>}
              </div>
            </div>
          </div>

          {isComplete && (
            <div className="mt-5 grid gap-3 rounded-[24px] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#F7D784]" />
                <span>{risk.cta}</span>
              </div>
              <input aria-hidden="true" tabIndex="-1" autoComplete="off" value={contact.website} onChange={(event) => updateContact('website', event.target.value)} className="hidden" placeholder="Website" />
              {!isAuthenticated && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <input value={contact.name} onChange={(event) => updateContact('name', event.target.value)} required className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Имя' : 'Name'} />
                  <input value={contact.contact} onChange={(event) => updateContact('contact', event.target.value)} required className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Телефон, email или Telegram' : 'Phone, email or Telegram'} />
                </div>
              )}
              {isAuthenticated && <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-3 text-sm leading-6 text-emerald-100">{ru ? `Вы вошли как ${user?.email}. Контакт повторно вводить не нужно.` : `Signed in as ${user?.email}. No need to enter contact details again.`}</div>}
              <input value={contact.company} onChange={(event) => updateContact('company', event.target.value)} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Компания, если есть' : 'Company, if any'} />
              <textarea value={contact.details} onChange={(event) => updateContact('details', event.target.value)} rows={3} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white placeholder:text-white/35 outline-none focus:border-[#D6A84F]/50" placeholder={ru ? 'Коротко опишите ситуацию' : 'Briefly describe the situation'} />
              <button disabled={status === 'loading'} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white shadow-[0_0_35px_rgba(56,189,248,0.25)] disabled:cursor-not-allowed disabled:opacity-60">
                {status === 'loading' ? (ru ? 'Отправляем...' : 'Sending...') : (ru ? 'Отправить результат HEIMDALL' : 'Send result to HEIMDALL')}
                <ArrowRight className="h-4 w-4" />
              </button>
              {status === 'success' && <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm leading-6 text-emerald-100">{ru ? 'Результат отправлен. Мы увидим его в CRM и сможем предложить ручную проверку.' : 'Result sent. We will see it in CRM and can suggest a manual review.'}</div>}
              {status === 'error' && <div className="rounded-2xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm leading-6 text-red-100">{error}</div>}
            </div>
          )}
          <p className="mt-4 text-xs leading-5 text-white/42">{ru ? 'Результат теста не является юридическим заключением, расследованием или полной проверкой. Для вывода требуется ручная проверка специалистом HEIMDALL.' : 'The result is not a legal opinion, investigation or full verification. A manual HEIMDALL review is required for a reliable conclusion.'}</p>
        </form>
      </div>
    </section>
  )
}
