import { Database, FileKey2, Fingerprint, Globe2, Landmark, Search } from 'lucide-react'

const signals = [
  { className: 'signal-node signal-node-person', label: 'Лицо', Icon: Fingerprint },
  { className: 'signal-node signal-node-company', label: 'Компания', Icon: Landmark },
  { className: 'signal-node signal-node-source', label: 'Источник', Icon: Globe2 },
  { className: 'signal-node signal-node-record', label: 'Документ', Icon: FileKey2 },
  { className: 'signal-node signal-node-data', label: 'Реестр', Icon: Database }
]

export default function OsintSignalMap() {
  return (
    <div className="osint-signal-map" aria-label="Анимация анализа открытых источников">
      <div className="osint-map-grid" />
      <div className="osint-map-radar" />
      <div className="osint-map-radar osint-map-radar-delayed" />

      <svg className="osint-map-links" viewBox="0 0 800 500" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M400 250 L155 135" />
        <path pathLength="1" d="M400 250 L655 105" />
        <path pathLength="1" d="M400 250 L690 365" />
        <path pathLength="1" d="M400 250 L160 380" />
        <path pathLength="1" d="M400 250 L420 75" />
      </svg>

      <div className="osint-core">
        <Search className="h-7 w-7" />
        <span>HEIMDALL</span>
        <small>анализ связей</small>
      </div>

      {signals.map(({ className, label, Icon }) => (
        <div key={label} className={className}>
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
      ))}

      <div className="osint-map-status">
        <span className="osint-status-dot" />
        Сопоставление источников
      </div>
      <div className="osint-map-sweep" />
    </div>
  )
}
