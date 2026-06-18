import { calculateRiskScore, getRiskLevel } from '@/lib/riskScoring'

export const riskObjectTypes = [
  ['person', 'Физическое лицо'],
  ['company', 'Компания'],
  ['contractor', 'Подрядчик'],
  ['employee', 'Сотрудник'],
  ['candidate', 'Кандидат'],
  ['household_staff', 'Домашний персонал'],
  ['incident', 'Инцидент']
]

export const riskStatuses = [
  ['new', 'Новый'],
  ['in_progress', 'В работе'],
  ['review', 'На проверке'],
  ['completed', 'Исполнено'],
  ['archived', 'Архив']
]

export const signalCategories = [
  ['legal', 'Юридический риск'],
  ['financial', 'Финансовый риск'],
  ['reputation', 'Репутация'],
  ['employment', 'Трудовая история'],
  ['sanctions', 'Санкции'],
  ['conflict_of_interest', 'Конфликт интересов'],
  ['behavioral', 'Поведенческий риск'],
  ['documents', 'Документы'],
  ['digital_trace', 'Цифровой след'],
  ['other', 'Другое']
]

export const severityOptions = [
  ['low', 'Низкая'],
  ['medium', 'Средняя'],
  ['high', 'Высокая'],
  ['critical', 'Критическая']
]

export const confidenceOptions = [
  ['low', 'Низкая'],
  ['medium', 'Средняя'],
  ['high', 'Высокая']
]

export const connectionTargetTypes = [
  ['person', 'Человек'],
  ['company', 'Компания'],
  ['phone', 'Телефон'],
  ['email', 'Почта'],
  ['domain', 'Домен'],
  ['address', 'Адрес'],
  ['social_profile', 'Соцпрофиль'],
  ['document', 'Документ'],
  ['incident', 'Инцидент'],
  ['other', 'Другое']
]

export const relationTypes = [
  ['works_at', 'Работает в'],
  ['owns', 'Владеет'],
  ['affiliated_with', 'Аффилирован'],
  ['contacted_by', 'Контактировал'],
  ['same_phone', 'Общий телефон'],
  ['same_email', 'Общая почта'],
  ['mentioned_together', 'Упоминается вместе'],
  ['family_or_close_relation', 'Близкая связь'],
  ['contractor_of', 'Подрядчик'],
  ['other', 'Другое']
]

export const strengthOptions = [
  ['weak', 'Слабая'],
  ['medium', 'Средняя'],
  ['strong', 'Сильная']
]

export const riskSignals = [
  {
    id: 'sig-001',
    object_id: 'rio-001',
    category: 'conflict_of_interest',
    title: 'Возможный конфликт интересов',
    description: 'У объекта есть признаки пересечения с поставщиком, который участвует в закупочной цепочке клиента.',
    severity: 'high',
    confidence: 'medium',
    source: 'Аналитическая заметка'
  },
  {
    id: 'sig-002',
    object_id: 'rio-001',
    category: 'reputation',
    title: 'Негативный публичный контекст',
    description: 'В открытых упоминаниях встречаются признаки спора вокруг прежнего проекта.',
    severity: 'medium',
    confidence: 'low',
    source: 'Открытые источники'
  },
  {
    id: 'sig-003',
    object_id: 'rio-002',
    category: 'financial',
    title: 'Авансовая модель с повышенным риском',
    description: 'Контрагент настаивает на существенном авансе до подтверждения производственных возможностей.',
    severity: 'high',
    confidence: 'high',
    source: 'Документы клиента'
  },
  {
    id: 'sig-004',
    object_id: 'rio-003',
    category: 'documents',
    title: 'Неполный пакет документов',
    description: 'По объекту не хватает подтверждения опыта, рекомендаций и согласованных оснований проверки.',
    severity: 'medium',
    confidence: 'medium',
    source: 'Заявка клиента'
  }
]

export const riskConnections = [
  {
    id: 'con-001',
    object_id: 'rio-001',
    target_name: 'ООО “Северный Контур”',
    target_type: 'company',
    relation_type: 'affiliated_with',
    strength: 'medium',
    description: 'Компания встречается в цепочке закупки, которую объект мог согласовывать.'
  },
  {
    id: 'con-002',
    object_id: 'rio-001',
    target_name: 'procurement.example.ru',
    target_type: 'domain',
    relation_type: 'mentioned_together',
    strength: 'weak',
    description: 'Домен упоминается в материалах по закупочному проекту.'
  },
  {
    id: 'con-003',
    object_id: 'rio-002',
    target_name: 'Shanghai North Bridge Trading',
    target_type: 'company',
    relation_type: 'contractor_of',
    strength: 'strong',
    description: 'Заявленный поставщик оборудования.'
  }
]

const baseObjects = [
  {
    id: 'rio-001',
    object_type: 'candidate',
    name: 'Кандидат на руководящую роль',
    description: 'Проверка кандидата на позицию с доступом к клиентской базе, аналитике и коммерческим условиям.',
    status: 'in_progress',
    source_request_id: 'CRM-LEAD-001',
    created_at: '2026-06-18'
  },
  {
    id: 'rio-002',
    object_type: 'company',
    name: 'Поставщик оборудования из Китая',
    description: 'Проверка контрагента перед авансом и заключением договора поставки.',
    status: 'review',
    source_request_id: 'CRM-LEAD-002',
    created_at: '2026-06-17'
  },
  {
    id: 'rio-003',
    object_type: 'household_staff',
    name: 'Кандидат в домашний персонал',
    description: 'Предварительная проверка няни перед выходом в семью клиента.',
    status: 'new',
    source_request_id: 'CRM-LEAD-003',
    created_at: '2026-06-16'
  }
]

export const riskObjects = baseObjects.map((object) => {
  const objectSignals = riskSignals.filter((signal) => signal.object_id === object.id)
  const risk_score = calculateRiskScore(objectSignals)

  return {
    ...object,
    risk_score,
    risk_level: getRiskLevel(risk_score),
    red_flags_count: objectSignals.filter((signal) => ['high', 'critical'].includes(signal.severity)).length
  }
})

export function getRiskObjectById(id) {
  return riskObjects.find((object) => object.id === id) || riskObjects[0]
}

export function getSignalsByObjectId(id) {
  return riskSignals.filter((signal) => signal.object_id === id)
}

export function getConnectionsByObjectId(id) {
  return riskConnections.filter((connection) => connection.object_id === id)
}
