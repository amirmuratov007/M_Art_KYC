const EVENT_PREFIX = 'event:'

export const conversionEventNames = [
  'express_product_click',
  'lead_form_open',
  'lead_form_submit',
  'lead_submit_success',
  'lead_submit_error',
  'phone_click',
  'telegram_click',
  'sample_report_open'
]

const allowedEvents = new Set(conversionEventNames)

export function normalizeConversionEvent(value) {
  const event = String(value || '').trim().toLowerCase()
  return allowedEvents.has(event) ? event : ''
}

export function conversionEventTitle(value) {
  const event = normalizeConversionEvent(value)
  return event ? `${EVENT_PREFIX}${event}` : ''
}

export function getConversionEventFromTitle(value) {
  const title = String(value || '')
  if (!title.startsWith(EVENT_PREFIX)) return ''
  return normalizeConversionEvent(title.slice(EVENT_PREFIX.length))
}
