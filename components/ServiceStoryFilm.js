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
      { label: 'Предложение', title: 'Поставщик присылает цену и документы', text: 'Входные данные фиксируются до переговоров о крупном авансе.' },
      { label: 'Фабрика', title: 'Производственный след собирается из источников', text: 'Регистрация, адрес, сайт, видео и экспортные сигналы сопоставляются между собой.' },
      { label: 'Реквизиты', title: 'Получатель платежа оказывается другой компанией', text: 'Посредник сам по себе допустим, но его роль и полномочия должны быть подтверждены.' },
      { label: 'Контракт', title: 'Оплата разбивается на безопасные этапы', text: 'Образец, видеоаудит, документы и контроль отгрузки становятся условиями платежа.' }
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

function IntakeScene({ story }) {
  const { Icon, name, role, status, tags } = story.intake
  if (story.theme === 'security') {
    return (
      <div className="story-scene story-alert-scene">
        <div className="story-alert-clock"><Clock3 /><strong>02:17</strong><span>ночная смена</span></div>
        <div className="story-office">
          <div className="story-office-roof" />
          <div className="story-office-windows">{Array.from({ length: 18 }, (_, index) => <i key={index} className={index === 11 ? 'story-window-alert' : ''} />)}</div>
          <span>ФИНАНСОВЫЙ ОТДЕЛ</span>
        </div>
        <div className="story-alert-card"><Siren /><div><b>{name}</b><span>{role}</span></div><em>{status}</em></div>
        <div className="story-alert-wave story-alert-wave-one" /><div className="story-alert-wave story-alert-wave-two" />
      </div>
    )
  }

  return (
    <div className="story-scene story-intake-scene">
      <div className="story-intake-orbit story-orbit-one" /><div className="story-intake-orbit story-orbit-two" />
      <div className="story-intake-card">
        <div className="story-intake-head"><span><Icon /></span><div><strong>{name}</strong><small>{role}</small></div><b>{status}</b></div>
        <div className="story-intake-lines"><i /><i /><i /></div>
        <div className="story-intake-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className="story-packet story-packet-one">01</div><div className="story-packet story-packet-two">10</div><div className="story-packet story-packet-three">11</div>
    </div>
  )
}

function SourcesScene({ story }) {
  return (
    <div className="story-scene story-sources-scene">
      <svg className="story-source-lines" viewBox="0 0 800 440" preserveAspectRatio="none" aria-hidden="true">
        <path d="M400 214 L126 92" /><path d="M400 214 L674 92" /><path d="M400 214 L674 346" /><path d="M400 214 L126 346" />
      </svg>
      <div className="story-source-core"><ScanSearch /><strong>{story.sources.core}</strong><span>сопоставление</span></div>
      {story.sources.items.map(([Icon, label], index) => <div key={label} className={`story-source-node story-source-${index + 1}`}><Icon /><span>{label}</span><i /></div>)}
      <div className="story-source-count"><CheckCircle2 /> {story.sources.count}</div>
    </div>
  )
}

function TraceScene({ story }) {
  return (
    <div className="story-scene story-trace-scene">
      <svg className="story-trace-line" viewBox="0 0 860 390" preserveAspectRatio="none" aria-hidden="true"><path d="M86 198 C200 48 270 340 410 194 S630 54 778 196" /></svg>
      {story.trace.nodes.map(([Icon, title, text], index) => (
        <div key={title} className={`story-trace-node story-trace-${index + 1} ${index === story.trace.nodes.length - 1 ? 'story-trace-risk' : ''}`}>
          <span><Icon /></span><strong>{title}</strong><small>{text}</small>
        </div>
      ))}
      <div className="story-trace-runner"><ScanSearch /></div>
      <div className="story-trace-caption">{story.trace.caption}</div>
    </div>
  )
}

function OutcomeScene({ story }) {
  const { Icon, subject, risk, level, findings, stamp } = story.outcome
  return (
    <div className="story-scene story-outcome-scene">
      <div className="story-report-glow" />
      <div className="story-report">
        <div className="story-report-head"><ShieldCheck /><b>HEIMDALL</b><span>ОПЕРАТИВНАЯ СПРАВКА</span></div>
        <div className="story-report-subject"><Icon /><strong>{subject}</strong></div>
        <div className="story-report-risk"><span>Решение</span><b>{risk}</b></div>
        <div className="story-report-meter"><i style={{ width: `${level}%` }} /></div>
        <div className="story-report-findings">{findings.map((item) => <span key={item}><CheckCircle2 />{item}</span>)}</div>
      </div>
      <div className="story-report-stamp">{stamp.split('\n').map((line) => <span key={line}>{line}</span>)}</div>
      <div className="story-report-ready"><CheckCircle2 /> Решение передано клиенту</div>
    </div>
  )
}

const sceneComponents = [IntakeScene, SourcesScene, TraceScene, OutcomeScene]

export default function ServiceStoryFilm({ variant }) {
  const story = stories[variant]
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
