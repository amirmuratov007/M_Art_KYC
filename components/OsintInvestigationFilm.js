import { useEffect, useRef, useState } from 'react'
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Database,
  FileCheck2,
  Fingerprint,
  Gavel,
  Globe2,
  Link2,
  Newspaper,
  Pause,
  Play,
  Search,
  ShieldCheck,
  UserRoundSearch
} from 'lucide-react'

const chapters = [
  { label: 'Объект', title: 'Получен объект проверки', text: 'Компания, человек или актив поступает в аналитический контур.' },
  { label: 'Источники', title: 'Открытые данные отвечают', text: 'Реестры, суды, публикации и цифровые следы собираются в одну картину.' },
  { label: 'Связи', title: 'Проявляется скрытая связь', text: 'Разрозненные факты складываются в понятную цепочку контроля и риска.' },
  { label: 'Вывод', title: 'Решение готово', text: 'Факты отделены от предположений, а риск переведен в конкретное действие.' }
]

function IntakeScene() {
  return (
    <div className="film-scene film-intake-scene">
      <div className="film-intake-beacon"><Search /></div>
      <div className="film-dossier">
        <div className="film-dossier-head">
          <Building2 />
          <div><strong>ООО «Север»</strong><span>Объект проверки</span></div>
          <span className="film-live-mark">ПОЛУЧЕНО</span>
        </div>
        <div className="film-dossier-lines"><i /><i /><i /></div>
        <div className="film-dossier-tags"><span>ИНН</span><span>Директор</span><span>Домен</span></div>
      </div>
      <div className="film-data-packet film-packet-a">01</div>
      <div className="film-data-packet film-packet-b">10</div>
      <div className="film-data-packet film-packet-c">11</div>
    </div>
  )
}

function SourcesScene() {
  const sources = [
    [Database, 'Реестры', 'film-source-a'],
    [Gavel, 'Суды', 'film-source-b'],
    [Newspaper, 'Публикации', 'film-source-c'],
    [Globe2, 'Сайты', 'film-source-d'],
    [Fingerprint, 'Цифровой след', 'film-source-e']
  ]

  return (
    <div className="film-scene film-sources-scene">
      <div className="film-source-core"><UserRoundSearch /><span>Сопоставление</span></div>
      <svg className="film-source-links" viewBox="0 0 800 440" preserveAspectRatio="none" aria-hidden="true">
        <path d="M400 220 L120 90" /><path d="M400 220 L675 80" /><path d="M400 220 L705 345" />
        <path d="M400 220 L115 350" /><path d="M400 220 L400 42" />
      </svg>
      {sources.map(([Icon, label, className]) => (
        <div key={label} className={`film-source ${className}`}><Icon /><span>{label}</span><b /></div>
      ))}
      <div className="film-stream-count">1 284 сигнала</div>
    </div>
  )
}

function LinksScene() {
  return (
    <div className="film-scene film-links-scene">
      <svg className="film-relationship-lines" viewBox="0 0 800 440" preserveAspectRatio="none" aria-hidden="true">
        <path className="film-safe-link" d="M180 220 C285 85 510 85 625 170" />
        <path className="film-safe-link" d="M180 220 C305 340 520 335 625 170" />
        <path className="film-risk-link" d="M625 170 C690 215 690 300 615 335" />
      </svg>
      <div className="film-entity film-entity-main"><Building2 /><strong>Компания</strong><span>проверяемая</span></div>
      <div className="film-entity film-entity-owner"><Fingerprint /><strong>Владелец</strong><span>подтвержден</span></div>
      <div className="film-entity film-entity-partner"><Link2 /><strong>Партнер</strong><span>связанное лицо</span></div>
      <div className="film-entity film-entity-risk"><AlertTriangle /><strong>Скрытая фирма</strong><span>судебный долг</span></div>
      <div className="film-risk-ping" />
      <div className="film-link-caption">Связь подтверждена тремя источниками</div>
    </div>
  )
}

function ReportScene() {
  return (
    <div className="film-scene film-report-scene">
      <div className="film-report-shadow" />
      <div className="film-report-sheet">
        <div className="film-report-top"><ShieldCheck /><span>HEIMDALL</span><b>СПРАВКА</b></div>
        <div className="film-report-subject">ООО «Север»</div>
        <div className="film-report-risk"><span>Уровень риска</span><strong>СРЕДНИЙ</strong></div>
        <div className="film-report-bar"><i /></div>
        <div className="film-report-findings">
          <span><CheckCircle2 /> Собственник подтвержден</span>
          <span><AlertTriangle /> Обнаружена связанная компания</span>
          <span><FileCheck2 /> Факты собраны в отчет</span>
        </div>
      </div>
      <div className="film-decision-stamp">ПРОВЕРИТЬ<br />УСЛОВИЯ</div>
      <div className="film-report-ready"><CheckCircle2 /> Вывод сформирован</div>
    </div>
  )
}

const sceneComponents = [IntakeScene, SourcesScene, LinksScene, ReportScene]

export default function OsintInvestigationFilm() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const stageRef = useRef(null)

  useEffect(() => {
    if (paused || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => setActive((current) => (current + 1) % chapters.length), 4400)
    return () => window.clearInterval(interval)
  }, [inView, paused])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const onPointerMove = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    stageRef.current?.style.setProperty('--film-rotate-y', `${x * 3.5}deg`)
    stageRef.current?.style.setProperty('--film-rotate-x', `${y * -3}deg`)
  }

  const resetTilt = () => {
    stageRef.current?.style.setProperty('--film-rotate-y', '0deg')
    stageRef.current?.style.setProperty('--film-rotate-x', '0deg')
  }

  return (
    <section className="relative z-10 overflow-hidden border-y border-white/10 bg-[#030711]/80 py-16 sm:py-24">
      <div className="film-band-glow" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-5">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <div className="text-sm uppercase text-[#F7D784]/80">Цифровое расследование</div>
            <h2 className="mt-5 text-3xl font-semibold sm:text-5xl">Как разрозненные следы превращаются в решение</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/62 sm:text-lg">Короткая история одной проверки. Четыре этапа показывают, где возникает факт, как обнаруживается связь и почему итоговый вывод можно проверить.</p>

            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.label}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`film-chapter-button ${active === index ? 'film-chapter-active' : ''}`}
                  aria-pressed={active === index}
                >
                  <span>0{index + 1}</span>{chapter.label}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={stageRef}
            className="film-stage-shell"
            onPointerMove={onPointerMove}
            onPointerLeave={resetTilt}
          >
            <div className="film-stage">
              <div className="film-stage-noise" aria-hidden="true" />
              <div className="film-stage-scan" aria-hidden="true" />
              {sceneComponents.map((Scene, index) => (
                <div key={chapters[index].label} className={`film-scene-wrap ${active === index ? 'film-scene-active' : ''}`} aria-hidden={active !== index}>
                  <Scene />
                </div>
              ))}
              <div className="film-caption">
                <div><span>0{active + 1} / 04</span><strong>{chapters[active].title}</strong></div>
                <p>{chapters[active].text}</p>
              </div>
              <button type="button" className="film-play-button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Продолжить анимацию' : 'Остановить анимацию'}>
                {paused ? <Play /> : <Pause />}
              </button>
              <div className="film-progress"><i key={active} /></div>
            </div>
          </div>
        </div>

        <div className="film-evidence-ribbon" aria-hidden="true">
          <div className="film-evidence-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="film-evidence-set">
                {['Реестры', 'Суды', 'Бенефициары', 'Публикации', 'Санкции', 'Домены', 'Связи', 'Репутация'].map((item) => (
                  <span key={`${copy}-${item}`}><i />{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
