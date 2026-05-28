async function loadHeimdallDashboardData(options = {}) {
  const params = new URLSearchParams()

  if (options.userId) params.set('user_id', options.userId)
  if (options.contact) params.set('contact', options.contact)

  const url = params.toString()
    ? `/api/client-dashboard?${params.toString()}`
    : '/api/client-dashboard'

  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(data.error || 'Failed to load dashboard data')
  }

  return data
}

window.loadHeimdallDashboardData = loadHeimdallDashboardData

document.addEventListener('DOMContentLoaded', async () => {
  const root = document.querySelector('[data-heimdall-dashboard]')

  if (!root) return

  try {
    const data = await loadHeimdallDashboardData()

    root.innerHTML = `
      <div style="display:grid;gap:16px">
        <div>Проверок всего: ${data.summary.checks_total}</div>
        <div>Активных проверок: ${data.summary.active_checks}</div>
        <div>Завершено: ${data.summary.completed_checks}</div>
      </div>
    `
  } catch (error) {
    root.innerHTML = `Не удалось загрузить данные: ${error.message}`
  }
})
