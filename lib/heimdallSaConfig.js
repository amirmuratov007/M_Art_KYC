const DEFAULT_HEIMDALL_SA_BASE_URL = 'http://127.0.0.1:5188'

export function getHeimdallSaBaseUrl() {
  const value = process.env.HEIMDALL_SA_BASE_URL || DEFAULT_HEIMDALL_SA_BASE_URL
  return String(value).replace(/\/+$/, '')
}
