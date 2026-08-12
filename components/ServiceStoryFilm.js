import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  Baby,
  Building2,
  CheckCircle2,
  Clock3,
  Factory,
  FileCheck2,
  Fingerprint,
  Globe2,
  Home,
  KeyRound,
  Landmark,
  MessageCircle,
  Network,
  PackageCheck,
  Pause,
  PhoneCall,
  Play,
  ScanSearch,
  ShieldCheck,
  Ship,
  Siren,
  UserCheck,
  UserRoundSearch,
  Video
} from 'lucide-react'

const stories = {
  nanny: {
    theme: 'care',
    eyebrow: 'История одной проверки',
    title: 'Как проверка няни превращает доверие в понятные условия',
    intro: 'Кандидат приходит по рекомендации. За четыре сцены видно, как подтверждается опыт, где появляется несостыковка и какие условия защищают семью.',
    ribbon: ['Анкета', 'Документы', 'Рекомендации', 'Опыт', 'Интервью', 'Цифровой след', 'Доступы', 'Вывод'],
    chapters: [
      { label: 'Кандидат', title: 'Анна приходит по рекомендации', text: 'Анкета, документы и заявленный опыт собраны в единое досье.' },
      { label: 'Опыт', title: 'Рекомендации проверяются независимо', text: 'Контакты прошлых работодателей сверяются с фактами и периодами работы.' },
      { label: 'Деталь', title: 'В датах обнаруживается расхождение', text: 'Спокойный уточняющий вопрос отделяет ошибку в анкете от реального риска.' },
      { label: 'Допуск', title: 'Семья получает условия безопасного найма', text: 'Испытательный срок, границы доступа и контрольные точки сформулированы заранее.' }
    ],
    intake: { Icon: Baby, name: 'Анна С.', role: 'Няня - 6 лет опыта', status: 'АНКЕТА ПОЛУЧЕНА', tags: ['Паспорт', 'Опыт', '2 рекомендации'] },
    sources: { core: 'Проверка опыта', count: '2 рекомендации подтверждены', items: [[PhoneCall, 'Работодатель'], [FileCheck2, 'Документы'], [Globe2, 'Открытые данные'], [MessageCircle, 'Интервью']] },
    trace: { nodes: [[Baby, 'Кандидат', 'анкета'], [PhoneCall, 'Рекомендация', 'контакт подтвержден'], [UserCheck, 'Работодатель', 'опыт подтвержден'], [AlertTriangle, 'Период работы', 'расхождение 2 месяца']], caption: 'Расхождение вынесено в вопросы для финального интервью' },
    outcome: { Icon: Home, subject: 'Кандидат: Анна С.', risk: 'ДОПУСК С УСЛОВИЯМИ', level: 42, findings: ['Рекомендации подтверждены', 'Уточнить период работы', 'Испытательный срок 30 дней'], stamp: 'УСЛОВИЯ\nДОПУСКА' }
  },
  china: {
    theme: 'china',
    eyebrow: 'Проверка до аванса',
    title: 'Путь поставщика от красивого предложения до подтвержденной фабрики',
    intro: 'Коммерческое предложение выглядит убедительно. Фильм показывает, как реестр, производство, экспортный след и реквизиты меняют условия оплаты.',
    ribbon: ['Компания', 'Лицензия', 'Фабрика', 'Сайт', 'Экспорт', 'Реквизиты', 'Логистика', 'Аванс'],
    chapters: [
      { label: 'Фабрика', title: 'Производственная линия работает', text: 'Площадка, сотрудники и выпуск продукции подтверждаются до переговоров об авансе.' },
      { label: 'Маршрут', title: 'Экспортный маршрут подтверждается', text: 'Видео, геометка, перевозка и порт складываются в проверяемую цепочку поставки.' },
      { label: 'Реквизиты', title: 'Получатель платежа оказывается другой компанией', text: 'Посредник сам по себе допустим, но его роль и полномочия должны быть подтверждены.' },
      { label: 'Поставка', title: 'Оплата разбивается на безопасные этапы', text: 'Образец, видеоаудит, документы и контроль отгрузки становятся условиями платежа.' }
    ],
    intake: { Icon: Factory, name: 'Guangzhou Huanli', role: 'Поставщик оборудования', status: 'ПРЕДЛОЖЕНИЕ ПОЛУЧЕНО', tags: ['Лицензия', 'Фабрика', 'Счет'] },
    sources: { core: 'Проверка фабрики', count: '18 совпадений в источниках', items: [[Landmark, 'Реестр'], [Video, 'Производство'], [Ship, 'Экспорт'], [Globe2, 'Сайт']] },
    trace: { nodes: [[Factory, 'Фабрика', 'производитель'], [PackageCheck, 'Экспорт', 'след подтвержден'], [Landmark, 'Получатель', 'торговая компания'], [AlertTriangle, 'Счет', 'новые реквизиты']], caption: 'Реквизиты принадлежат посреднику - нужна трехсторонняя фиксация' },
    outcome: { Icon: Ship, subject: 'Поставка: Guangzhou Huanli', risk: 'АВАНС ПО ЭТАПАМ', level: 55, findings: ['Фабрика подтверждена', 'Роль посредника раскрыта', 'Контроль перед отгрузкой'], stamp: 'ПЛАТЕЖ\nПО ЭТАПАМ' }
  },
  property: {
    theme: 'property',
    eyebrow: 'Сделка под наблюдением',
    title: 'Как история недвижимости и продавца складывается в безопасную сделку',
    intro: 'Документы на объект выглядят чисто. Дополнительная проверка показывает цепочку владения, полномочия представителя и давление долгов на продавца.',
    ribbon: ['Объект', 'Собственник', 'Переходы права', 'Суды', 'Долги', 'Представитель', 'Расчеты', 'Решение'],
    chapters: [
      { label: 'Объект', title: 'Недвижимость выходит на сделку', text: 'Адрес, продавец, основание права и условия расчетов собраны в карточку.' },
      { label: 'История', title: 'Восстанавливается цепочка владения', text: 'Срок владения, переходы права, семейный контур и споры сопоставляются по времени.' },
      { label: 'Продавец', title: 'Срочность продажи получает объяснение', text: 'Долговой спор и представитель по доверенности требуют дополнительных гарантий.' },
      { label: 'Сделка', title: 'Риск переводится в условия расчетов', text: 'Нотариальная проверка, раскрытие аккредитива и документы привязаны к контрольным точкам.' }
    ],
    intake: { Icon: Building2, name: 'Объект - 76 м²', role: 'Продавец и представитель', status: 'ОБЪЕКТ ПОЛУЧЕН', tags: ['Право', 'Продавец', 'Расчеты'] },
    sources: { core: 'История сделки', count: '11 событий сопоставлено', items: [[Home, 'Объект'], [UserRoundSearch, 'Продавец'], [FileCheck2, 'Документы'], [Network, 'Связи']] },
    trace: { nodes: [[Building2, 'Недвижимость', 'объект'], [Fingerprint, 'Собственник', 'личность подтверждена'], [KeyRound, 'Представитель', 'доверенность'], [AlertTriangle, 'Долговой спор', 'срочная продажа']], caption: 'Срочность объяснима, расчеты требуют усиленного контроля' },
    outcome: { Icon: KeyRound, subject: 'Объект - 76 м²', risk: 'СДЕЛКА С УСЛОВИЯМИ', level: 62, findings: ['Собственник подтвержден', 'Проверить доверенность', 'Расчеты через аккредитив'], stamp: 'УСЛОВИЯ\nСДЕЛКИ' }
  },
  security: {
    theme: 'security',
    eyebrow: 'Одна ночь внешней службы безопасности',
    title: '02:17. Платеж почти ушел не туда',
    intro: 'Небольшой оперативный фильм о том, как внешний контур HEIMDALL принимает сигнал, связывает события и успевает остановить риск до открытия банка.',
    ribbon: ['Сигнал', 'Дежурный', 'Почта', 'Домен', 'Подрядчик', 'Платеж', 'Блокировка', 'Отчет'],
    chapters: [
      { label: 'Тревога', title: 'В 02:17 меняются реквизиты поставщика', text: 'Письмо выглядит привычно, но домен отправителя отличается одной буквой.' },
      { label: 'Смена', title: 'Дежурный аналитик поднимает контур', text: 'Почта, домен, история поставщика и платежная заявка проверяются одновременно.' },
      { label: 'Развязка', title: 'След приводит к скомпрометированной почте', text: 'Настоящий поставщик не менял счет. Финансовый отдел получает подтверждение до оплаты.' },
      { label: 'Закрытие', title: 'Платеж остановлен, доступы обновлены', text: 'Инцидент закрывается отчетом, новыми правилами подтверждения и контрольным звонком.' }
    ],
    intake: { Icon: Siren, name: 'ПОДМЕНА РЕКВИЗИТОВ', role: 'Платежная заявка № 184', status: 'СИГНАЛ 02:17', tags: ['Письмо', 'Домен', '4,8 млн ₽'] },
    sources: { core: 'Оперативная смена', count: 'Ответ за 7 минут', items: [[MessageCircle, 'Почта'], [Globe2, 'Домен'], [UserCheck, 'Поставщик'], [Landmark, 'Платеж']] },
    trace: { nodes: [[Siren, 'Сигнал', '02:17'], [ScanSearch, 'Аналитик', 'сверка домена'], [PhoneCall, 'Поставщик', 'смены счета не было'], [ShieldCheck, 'Финансы', 'платеж остановлен']], caption: 'От сигнала до блокировки платежа - 19 минут' },
    outcome: { Icon: ShieldCheck, subject: 'Инцидент № 184', risk: 'РИСК ЗАКРЫТ', level: 18, findings: ['Платеж остановлен', 'Доступы обновлены', 'Регламент усилен'], stamp: 'ИНЦИДЕНТ\nЗАКРЫТ' }
  }
}

function Person({ className = '', label }) {
  return <div className={`story-person ${className}`}><i /><b /><em /><span>{label}</span></div>
}

function Vehicle({ className = '', label }) {
  return <div className={`story-vehicle ${className}`}><b /><i /><i /><span>{label}</span></div>
}

function NannyArrivalScene() {
  return (
    <div className="story-scene story-nanny-arrival">
      <div className="story-home-cutaway"><div className="story-home-roof" /><div className="story-home-door"><KeyRound /></div><div className="story-home-window" /><span>первое знакомство</span></div>
      <Person className="story-parent" label="родитель" /><Person className="story-nanny" label="кандидат" /><Person className="story-child" label="ребенок" />
      <div className="story-nanny-bag"><FileCheck2 /><span>анкета</span></div>
      <div className="story-welcome-line"><i /></div>
    </div>
  )
}

function NannyReferencesScene() {
  return (
    <div className="story-scene story-nanny-calls">
      <div className="story-phone"><PhoneCall /><span>проверка рекомендаций</span><i /><i /><i /></div>
      <div className="story-reference-card story-reference-left"><Person label="семья 1" /><div><strong>Работала 3 года</strong><span>контакт подтвержден</span></div><CheckCircle2 /></div>
      <div className="story-reference-card story-reference-right"><Person label="семья 2" /><div><strong>Работала 2 года</strong><span>контакт подтвержден</span></div><CheckCircle2 /></div>
      <div className="story-call-wave story-call-wave-one" /><div className="story-call-wave story-call-wave-two" />
    </div>
  )
}

function NannyTimelineScene() {
  return (
    <div className="story-scene story-nanny-timeline">
      <div className="story-timeline-person"><Person label="кандидат" /></div>
      <div className="story-care-timeline"><i /><span className="story-date-one">2019</span><span className="story-date-two">2022</span><span className="story-date-three">2024</span><span className="story-date-four">2026</span><b /></div>
      <div className="story-job-card story-job-one"><Home /><strong>Семья 1</strong><span>2019 - 2022</span></div>
      <div className="story-job-card story-job-two"><Home /><strong>Семья 2</strong><span>2022 - 2024</span></div>
      <div className="story-date-gap"><AlertTriangle /><strong>2 месяца</strong><span>уточнить на интервью</span></div>
    </div>
  )
}

function NannyAccessScene() {
  return (
    <div className="story-scene story-nanny-access">
      <div className="story-access-house"><div><Baby /><span>детская</span><b /></div><div><KeyRound /><span>ключи</span><b /></div><div><Globe2 /><span>цифровой доступ</span><b /></div></div>
      <Person className="story-access-person" label="допуск" />
      <div className="story-access-list"><span><CheckCircle2 /> Испытательный срок</span><span><CheckCircle2 /> Границы доступа</span><span><CheckCircle2 /> Контрольная встреча</span></div>
      <div className="story-access-key"><KeyRound /></div>
    </div>
  )
}

function ChinaFactoryScene() {
  return (
    <div className="story-scene story-china-factory">
      <div className="story-factory"><div className="story-chimney"><i /><i /><i /></div><Factory /><strong>GUANGZHOU HUANLI</strong><span>производственная площадка</span></div>
      <div className="story-conveyor"><div className="story-belt">{[0, 1, 2, 3, 4].map((item) => <PackageCheck key={item} />)}</div></div>
      <Vehicle className="story-forklift" label="погрузчик" />
      <Person className="story-factory-worker" label="контроль" />
    </div>
  )
}

function ChinaRouteScene() {
  return (
    <div className="story-scene story-china-route">
      <div className="story-route-map"><Globe2 /><span className="story-city story-city-one">Гуанчжоу</span><span className="story-city story-city-two">Шэньчжэнь</span><span className="story-city story-city-three">порт</span><i /></div>
      <Vehicle className="story-route-truck" label="груз" />
      <div className="story-route-ship"><Ship /><span>экспортный след подтвержден</span></div>
      <div className="story-video-proof"><Video /><div><strong>Видео с линии</strong><span>геометка совпала</span></div><CheckCircle2 /></div>
    </div>
  )
}

function ChinaPaymentScene() {
  return (
    <div className="story-scene story-china-payment">
      <div className="story-invoice story-invoice-main"><Factory /><strong>Производитель</strong><span>Guangzhou Huanli</span><b>ДОГОВОР</b></div>
      <div className="story-payment-arrow"><span>аванс</span><i /></div>
      <div className="story-invoice story-invoice-risk"><Landmark /><strong>Получатель</strong><span>Shenzhen Trade Ltd.</span><b>СЧЕТ</b></div>
      <div className="story-payment-alert"><AlertTriangle /><span>Компании не совпадают</span></div>
      <Person className="story-payment-analyst" label="аналитик" />
    </div>
  )
}

function ChinaShippingScene() {
  return (
    <div className="story-scene story-china-shipping">
      <div className="story-shipping-sky"><i /><i /></div>
      <div className="story-container-ship"><div className="story-containers">{[0, 1, 2, 3, 4, 5].map((item) => <i key={item} />)}</div><Ship /><span>контрольная отгрузка</span></div>
      <div className="story-sea"><i /><i /><i /></div>
      <div className="story-shipping-steps"><span><CheckCircle2 /> образец</span><span><CheckCircle2 /> аудит</span><span><CheckCircle2 /> отгрузка</span><span><CheckCircle2 /> остаток</span></div>
    </div>
  )
}

function PropertyArrivalScene() {
  return (
    <div className="story-scene story-property-arrival">
      <div className="story-apartment-building"><Building2 /><div>{Array.from({ length: 12 }, (_, item) => <i key={item} />)}</div><span>объект - 76 м²</span></div>
      <Vehicle className="story-property-car" label="просмотр" />
      <Person className="story-property-buyer" label="покупатель" /><Person className="story-property-seller" label="продавец" />
      <div className="story-property-pin"><Home /><span>объект получен</span></div>
    </div>
  )
}

function PropertyHistoryScene() {
  const cards = [['2014', 'покупка'], ['2019', 'наследство'], ['2026', 'продажа']]
  return (
    <div className="story-scene story-property-history">
      <div className="story-property-gallery">{cards.map(([year, label], index) => <div key={year} className={`story-property-photo story-photo-${index + 1}`}><Building2 /><strong>{year}</strong><span>{label}</span></div>)}</div>
      <div className="story-history-rail"><i /><b /><b /><b /></div>
      <div className="story-history-caption"><FileCheck2 /> Три перехода права восстановлены по времени</div>
    </div>
  )
}

function PropertySellerScene() {
  return (
    <div className="story-scene story-property-seller-scene">
      <Person className="story-seller-main" label="собственник" /><Person className="story-seller-agent" label="представитель" />
      <div className="story-power-card"><KeyRound /><strong>Доверенность</strong><span>полномочия проверяются</span></div>
      <div className="story-debt-card"><AlertTriangle /><strong>Долговой спор</strong><span>объясняет срочность</span></div>
      <svg className="story-seller-links" viewBox="0 0 800 360" preserveAspectRatio="none"><path d="M190 190 C330 40 460 55 610 172" /><path d="M190 190 C350 330 510 315 610 172" /></svg>
    </div>
  )
}

function PropertyDealScene() {
  return (
    <div className="story-scene story-property-deal">
      <div className="story-deal-table"><FileCheck2 /><span>аккредитив открыт</span></div>
      <Person className="story-deal-buyer" label="покупатель" /><Person className="story-deal-seller" label="продавец" />
      <div className="story-moving-key"><KeyRound /></div>
      <div className="story-deal-shield"><ShieldCheck /><strong>Сделка с условиями</strong><span>контрольные точки выполнены</span></div>
    </div>
  )
}

function SecurityAlertScene() {
  return (
    <div className="story-scene story-alert-scene">
      <div className="story-alert-clock"><Clock3 /><strong>02:17</strong><span>ночная смена</span></div>
      <div className="story-office"><div className="story-office-roof" /><div className="story-office-windows">{Array.from({ length: 18 }, (_, index) => <i key={index} className={index === 11 ? 'story-window-alert' : ''} />)}</div><span>ФИНАНСОВЫЙ ОТДЕЛ</span></div>
      <div className="story-alert-card"><Siren /><div><b>ПОДМЕНА РЕКВИЗИТОВ</b><span>Платежная заявка № 184</span></div><em>СИГНАЛ 02:17</em></div>
      <div className="story-alert-wave story-alert-wave-one" /><div className="story-alert-wave story-alert-wave-two" />
    </div>
  )
}

function SecurityOpsScene() {
  return (
    <div className="story-scene story-security-ops">
      <div className="story-ops-wall"><div><MessageCircle /><span>почта</span></div><div><Globe2 /><span>домен</span></div><div><Landmark /><span>платеж</span></div></div>
      <div className="story-ops-desk story-desk-one"><i /><Person label="дежурный" /></div><div className="story-ops-desk story-desk-two"><i /><Person label="аналитик" /></div>
      <div className="story-ops-signal"><ScanSearch /><span>сверка за 7 минут</span></div>
      <div className="story-data-fly story-data-one">ДОМЕН</div><div className="story-data-fly story-data-two">СЧЕТ</div><div className="story-data-fly story-data-three">ПОЧТА</div>
    </div>
  )
}

function SecurityTraceScene() {
  return (
    <div className="story-scene story-security-trace">
      <div className="story-mail-card"><MessageCircle /><strong>supplier-co.ru</strong><span>ожидаемый домен</span></div>
      <div className="story-mail-card story-mail-fake"><AlertTriangle /><strong>suppller-co.ru</strong><span>подмена одной буквы</span></div>
      <div className="story-security-call"><PhoneCall /><div><strong>Контрольный звонок</strong><span>счет не менялся</span></div><CheckCircle2 /></div>
      <div className="story-trace-beam"><i /></div>
      <Person className="story-trace-analyst" label="сверка" />
    </div>
  )
}

function SecurityCloseScene() {
  return (
    <div className="story-scene story-security-close">
      <div className="story-bank-gate"><Landmark /><strong>ПЛАТЕЖ</strong><span>4,8 млн ₽</span></div>
      <div className="story-payment-packet">₽<i /></div>
      <div className="story-shield-gate"><ShieldCheck /><span>ОСТАНОВЛЕН</span></div>
      <Vehicle className="story-security-car" label="реагирование" />
      <div className="story-close-report"><FileCheck2 /><div><strong>Инцидент закрыт</strong><span>доступы и регламент обновлены</span></div><CheckCircle2 /></div>
    </div>
  )
}

const storyScenes = {
  nanny: [NannyArrivalScene, NannyReferencesScene, NannyTimelineScene, NannyAccessScene],
  china: [ChinaFactoryScene, ChinaRouteScene, ChinaPaymentScene, ChinaShippingScene],
  property: [PropertyArrivalScene, PropertyHistoryScene, PropertySellerScene, PropertyDealScene],
  security: [SecurityAlertScene, SecurityOpsScene, SecurityTraceScene, SecurityCloseScene]
}

export default function ServiceStoryFilm({ variant }) {
  const story = stories[variant]
  const sceneComponents = storyScenes[variant] || []
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const stageRef = useRef(null)

  useEffect(() => {
    if (!story || paused || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => setActive((current) => (current + 1) % story.chapters.length), 4800)
    return () => window.clearInterval(interval)
  }, [inView, paused, story])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  if (!story) return null

  const onPointerMove = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    stageRef.current?.style.setProperty('--story-rotate-y', `${x * 3}deg`)
    stageRef.current?.style.setProperty('--story-rotate-x', `${y * -2.5}deg`)
  }

  const resetTilt = () => {
    stageRef.current?.style.setProperty('--story-rotate-y', '0deg')
    stageRef.current?.style.setProperty('--story-rotate-x', '0deg')
  }

  return (
    <section className={`story-film story-theme-${story.theme}`}>
      <div className="story-film-glow" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <div className="story-film-eyebrow">{story.eyebrow}</div>
            <h2 className="mt-5 max-w-xl text-3xl font-semibold sm:text-5xl">{story.title}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/62 sm:text-lg">{story.intro}</p>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
              {story.chapters.map((chapter, index) => (
                <button key={chapter.label} type="button" onClick={() => setActive(index)} className={`story-chapter-button ${active === index ? 'story-chapter-active' : ''}`} aria-pressed={active === index}>
                  <span>0{index + 1}</span>{chapter.label}
                </button>
              ))}
            </div>
          </div>

          <div ref={stageRef} className="story-stage-shell" onPointerMove={onPointerMove} onPointerLeave={resetTilt}>
            <div className="story-stage">
              <div className="story-stage-grid" aria-hidden="true" /><div className="story-stage-scan" aria-hidden="true" />
              {sceneComponents.map((Scene, index) => (
                <div key={story.chapters[index].label} className={`story-scene-wrap ${active === index ? 'story-scene-active' : ''}`} aria-hidden={active !== index}>
                  <Scene story={story} />
                </div>
              ))}
              <div className="story-caption"><div><span>0{active + 1} / 04</span><strong>{story.chapters[active].title}</strong></div><p>{story.chapters[active].text}</p></div>
              <button type="button" className="story-play-button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Продолжить анимацию' : 'Остановить анимацию'}>{paused ? <Play /> : <Pause />}</button>
              <div className="story-progress"><i key={active} /></div>
            </div>
          </div>
        </div>

        <div className="story-ribbon" aria-hidden="true"><div className="story-ribbon-track">{[0, 1].map((copy) => <div key={copy} className="story-ribbon-set">{story.ribbon.map((item) => <span key={`${copy}-${item}`}><i />{item}</span>)}</div>)}</div></div>
      </div>
    </section>
  )
}
