async function loadHeimdallDashboardData() {
  const token = window.HEIMDALL_CLIENT_TOKEN || new URLSearchParams(window.location.search).get('token') || ''

  if (!/^[a-f0-9]{64}$/i.test(token)) {
    throw new Error('Client access token is required')
  }

  const response = await fetch('/api/client-dashboard', {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
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
