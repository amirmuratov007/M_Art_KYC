import '@/styles/globals.css'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import AnimatedCursor from '@/components/AnimatedCursor'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import HeimdallAnalytics from '@/components/HeimdallAnalytics'

const COOKIE_CONSENT_KEY = 'heimdall_cookie_consent'
const COOKIE_CONSENT_EVENT = 'heimdall-cookie-consent-change'

export default function App({ Component, pageProps }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const ymId = process.env.NEXT_PUBLIC_YM_ID
  const isTelegramMiniApp = Boolean(Component.isTelegramMiniApp)
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false)

  useEffect(() => {
    const readConsent = () => {
      try {
        setAnalyticsAllowed(window.localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted')
      } catch (error) {
        setAnalyticsAllowed(false)
      }
    }

    readConsent()

    const onConsentChange = (event) => {
      setAnalyticsAllowed(event.detail === 'accepted')
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChange)
  }, [])

  return (
    <>
      {analyticsAllowed && gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { send_page_view: false });
            `}
          </Script>
        </>
      )}

      {analyticsAllowed && ymId && (
        <>
          <Script src="https://mc.yandex.ru/metrika/tag.js" strategy="afterInteractive" />
          <Script id="yandex-metrika" strategy="afterInteractive">
            {`
              window.ym = window.ym || function(){(window.ym.a = window.ym.a || []).push(arguments)};
              window.ym.l = Date.now();
              ym(${ymId}, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: false,
                defer: true,
                sendTitle: false
              });
            `}
          </Script>
        </>
      )}

      {!isTelegramMiniApp && (
        <Script id="heimdall-service-worker" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              var registerHeimdallWorker = function () {
                navigator.serviceWorker.register('/sw.js').catch(function () {});
              };

              if (document.readyState === 'complete') {
                registerHeimdallWorker();
              } else {
                window.addEventListener('load', registerHeimdallWorker);
              }
            }
          `}
        </Script>
      )}

      {!isTelegramMiniApp && <AnimatedCursor />}
      {!isTelegramMiniApp && <HeimdallAnalytics analyticsAllowed={analyticsAllowed} />}
      <Component {...pageProps} />
      {!isTelegramMiniApp && <CookieConsentBanner />}
    </>
  )
}
