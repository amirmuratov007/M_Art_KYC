
async function validateHeimdallPaidAccess() {
  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  if (!token) {
    document.body.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#050816;color:white;font-family:Inter,Arial;padding:24px">
        <div style="max-width:620px;border:1px solid rgba(255,255,255,.12);border-radius:32px;padding:36px;background:rgba(255,255,255,.05)">
          <div style="color:#F7D784;text-transform:uppercase;letter-spacing:.22em;font-size:12px">HEIMDALL Access</div>
          <h1 style="font-size:42px;line-height:1;margin:20px 0">Доступ не найден</h1>
          <p style="color:rgba(255,255,255,.65);line-height:1.7">Откройте персональную ссылку, которую вы получили после оплаты.</p>
        </div>
      </div>
    `
    return false
  }

  try {
    const response = await fetch(`/api/validate-client-access?token=${encodeURIComponent(token)}`)
    const data = await response.json()

    if (!response.ok || data.ok === false) {
      throw new Error(data.error || 'Access denied')
    }

    window.HEIMDALL_CLIENT_ACCESS = data.client

    const accessBadge = document.querySelector('[data-heimdall-access-client]')
    if (accessBadge) {
      accessBadge.textContent = `${data.client.company || data.client.name || 'HEIMDALL Client'} · ${data.client.plan || 'Client Access'}`
    }

    return true
  } catch (error) {
    document.body.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#050816;color:white;font-family:Inter,Arial;padding:24px">
        <div style="max-width:620px;border:1px solid rgba(255,255,255,.12);border-radius:32px;padding:36px;background:rgba(255,255,255,.05)">
          <div style="color:#F7D784;text-transform:uppercase;letter-spacing:.22em;font-size:12px">HEIMDALL Access</div>
          <h1 style="font-size:42px;line-height:1;margin:20px 0">Доступ закрыт</h1>
          <p style="color:rgba(255,255,255,.65);line-height:1.7">${error.message}</p>
        </div>
      </div>
    `
    return false
  }
}

window.validateHeimdallPaidAccess = validateHeimdallPaidAccess

document.addEventListener('DOMContentLoaded', validateHeimdallPaidAccess)
