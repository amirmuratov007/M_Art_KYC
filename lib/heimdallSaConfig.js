const DEFAULT_HEIMDALL_SA_BASE_URL = 'http://127.0.0.1:5188'
const PRODUCTION_HEIMDALL_SA_BASE_URL = 'https://45-141-78-148.nip.io'

export function getHeimdallSaBaseUrl() {
  let value = process.env.HEIMDALL_SA_BASE_URL || (process.env.NODE_ENV === 'production'
    ? PRODUCTION_HEIMDALL_SA_BASE_URL
    : DEFAULT_HEIMDALL_SA_BASE_URL)

  if (process.env.NODE_ENV === 'production') {
    try {
      const host = new URL(value).hostname
      if (host === '45.141.78.148' || host === 'sa.heimdall-group.ru') value = PRODUCTION_HEIMDALL_SA_BASE_URL
    } catch (_) {
      value = PRODUCTION_HEIMDALL_SA_BASE_URL
    }
  }

  return String(value).replace(/\/+$/, '')
}
