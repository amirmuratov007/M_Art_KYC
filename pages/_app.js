import '@/styles/globals.css'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import AnimatedCursor from '@/components/AnimatedCursor'
import CookieConsentBanner from '@/components/CookieConsentBanner'

const COOKIE_CONSENT_KEY = 'heimdall_cookie_consent'
const COOKIE_CONSENT_EVENT = 'heimdall-cookie-consent-change'

export default function App({ Component, pageProps }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const ymId = process.env.NEXT_PUBLIC_YM_ID
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
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {analyticsAllowed && ymId && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) { return; }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(${ymId}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      )}

      <Script id="heimdall-service-worker-cleanup" strategy="afterInteractive">
        {`
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
              registrations.forEach(function (registration) { registration.unregister(); });
            }).catch(function () {});
          }
          if ('caches' in window) {
            caches.keys().then(function (keys) {
              keys.forEach(function (key) {
                if (key.indexOf('heimdall') === 0) caches.delete(key);
              });
            }).catch(function () {});
          }
        `}
      </Script>

      <AnimatedCursor />
      <Component {...pageProps} />
      <CookieConsentBanner />
    </>
  )
}
