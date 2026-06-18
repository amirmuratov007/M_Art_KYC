export const severityScoreMap = {
  low: 10,
  medium: 25,
  high: 45,
  critical: 70
}

export const confidenceModifierMap = {
  low: 0.6,
  medium: 0.85,
  high: 1
}

export function calculateRiskScore(signals = []) {
  const score = signals.reduce((sum, signal) => {
    const severityScore = severityScoreMap[signal.severity] || severityScoreMap.medium
    const confidenceModifier = confidenceModifierMap[signal.confidence] || confidenceModifierMap.medium
    return sum + severityScore * confidenceModifier
  }, 0)

  return Math.min(100, Math.round(score))
}

export function getRiskLevel(score = 0) {
  if (score >= 75) return 'critical'
  if (score >= 50) return 'high'
  if (score >= 25) return 'medium'
  return 'low'
}

export function getRiskLevelLabel(level) {
  const labels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
    critical: 'Критический'
  }

  return labels[level] || labels.low
}

export function buildFallbackRiskReport({ riskObject, signals = [], connections = [], notes = '' }) {
  const riskScore = calculateRiskScore(signals)
  const riskLevel = getRiskLevel(riskScore)
  const redFlags = signals.filter((signal) => ['high', 'critical'].includes(signal.severity))
  const keySignals = signals.length ? signals : [{ title: 'Сигналы пока не добавлены', description: 'Для полноценного отчета аналитик должен добавить подтвержденные признаки риска.' }]

  return {
    executiveSummary: `${riskObject.name} - предварительный риск-профиль сформирован на основании добавленных аналитиком сигналов, связей и рабочих заметок. Текущая оценка риска: ${getRiskLevelLabel(riskLevel).toLowerCase()} (${riskScore}/100).`,
    riskLevel,
    riskScore,
    keyFindings: keySignals.map((signal) => signal.description ? `${signal.title}: ${signal.description}` : signal.title),
    redFlags: redFlags.length ? redFlags.map((signal) => signal.title) : ['Критические красные флаги в текущей карточке не выделены.'],
    connectionsSummary: connections.length ? connections.map((connection) => `${connection.target_name} - ${connection.description || connection.relation_type}`).join('\n') : 'Связи пока не добавлены.',
    recommendedActions: [
      'Отделить подтвержденные факты от гипотез и непроверенных признаков.',
      'Запросить у клиента документы и контекст, которые подтверждают основание проверки.',
      'Проверить высокие и критические сигналы через дополнительные законные источники.',
      'Не принимать юридически значимое решение только на основании предварительного черновика.'
    ],
    clientReportDraft: `Предварительный риск-отчет HEIMDALL\n\nОбъект проверки: ${riskObject.name}\nТип объекта: ${riskObject.object_type}\nУровень риска: ${getRiskLevelLabel(riskLevel)} (${riskScore}/100)\n\nКраткое резюме\n${riskObject.description || 'Описание объекта пока не заполнено.'}\n\nКлючевые выявленные признаки\n${keySignals.map((signal, index) => `${index + 1}. ${signal.title}${signal.description ? ` - ${signal.description}` : ''}`).join('\n')}\n\nКарта связей\n${connections.length ? connections.map((connection, index) => `${index + 1}. ${connection.target_name} - ${connection.description || connection.relation_type}`).join('\n') : 'Связи пока не добавлены.'}\n\nЗаметки аналитика\n${notes || 'Заметки пока не добавлены.'}\n\nРекомендации\n- Уточнить основания и объем проверки.\n- Проверить приоритетные сигналы через дополнительные законные источники.\n- Зафиксировать подтвержденные факты отдельно от аналитических гипотез.\n\nЮридическая оговорка\nНастоящий отчет является аналитическим документом и не содержит утверждений о виновности, нарушении закона или недобросовестности лица либо организации. Выводы основаны на предоставленных данных, открытых признаках и аналитической оценке. Для принятия юридически значимых решений рекомендуется дополнительная проверка и консультация профильного специалиста.`
  }
}
