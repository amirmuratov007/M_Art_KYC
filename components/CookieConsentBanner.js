import Link from 'next/link'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'heimdall_cookie_consent'
const CONSENT_EVENT = 'heimdall-cookie-consent-change'

export function getHeimdallCookieConsent() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    return null
  }
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = getHeimdallCookieConsent()
    if (!saved) setVisible(true)
  }, [])

  const saveConsent = (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
    } catch (error) {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-3 pb-3 sm:flex sm:justify-end sm:px-5 sm:pb-5">
      <div className="w-full max-w-xl overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#07101f]/95 text-white shadow-[0_24px_90px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
        <div className="grid gap-4 p-4 sm:p-5">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F7D784]">
                  Cookies и аналитика
                </div>
                <p className="mt-2 max-w-2xl text-xs leading-6 text-white/68 sm:text-sm">
                  Мы используем обязательные технические данные для работы сайта, а также можем использовать cookie и аналитические инструменты для улучшения сайта и оценки эффективности страниц. Вы можете принять или отклонить необязательные cookie. Подробнее - в политике конфиденциальности и политике обработки персональных данных.
                </p>
              </div>

              <button
                type="button"
                onClick={() => saveConsent('declined')}
                aria-label="Закрыть и отклонить необязательные cookie"
                className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] p-2 text-white/64 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/54">
              <Link href="/privacy" className="underline decoration-white/20 underline-offset-4 transition hover:text-sky-200">
                Политика конфиденциальности
              </Link>
              <Link href="/personal-data-policy" className="underline decoration-white/20 underline-offset-4 transition hover:text-sky-200">
                Персональные данные
              </Link>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_34px_rgba(56,189,248,0.24)] transition hover:bg-sky-400"
            >
              Принять
            </button>
            <button
              type="button"
              onClick={() => saveConsent('declined')}
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"
            >
              Отклонить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
