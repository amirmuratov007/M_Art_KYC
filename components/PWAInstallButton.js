import { useEffect, useState } from 'react'
import { Download, CheckCircle2 } from 'lucide-react'

export default function PWAInstallButton({ language = 'ru' }) {
  const ru = language === 'ru'
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isStandalone, setIsStandalone] = useState(false)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const standalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      window.navigator.standalone === true

    setIsStandalone(Boolean(standalone))

    const onBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setStatus('ready')
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    }
  }, [])

  async function install() {
    if (!deferredPrompt) {
      setStatus('manual')
      return
    }

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  if (isStandalone) {
    return (
      <div className="inline-flex items-center justify-center gap-3 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-6 py-4 font-semibold text-emerald-100">
        <CheckCircle2 className="h-5 w-5" />
        {ru ? 'Уже установлено' : 'Already installed'}
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-7 py-4 font-semibold text-white shadow-[0_0_45px_rgba(56,189,248,0.30)]"
      >
        <Download className="h-5 w-5" />
        {ru ? 'Установить на телефон' : 'Install on phone'}
      </button>

      {status === 'manual' && (
        <div className="rounded-2xl border border-[#D6A84F]/25 bg-[#D6A84F]/10 px-5 py-4 text-sm leading-6 text-[#F7D784]">
          {ru
            ? 'Android: меню браузера - Установить приложение. iPhone: Safari - Поделиться - На экран Домой.'
            : 'Android: browser menu - Install app. iPhone: Safari - Share - Add to Home Screen.'}
        </div>
      )}
    </div>
  )
}
