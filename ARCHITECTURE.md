# HEIMDALL architecture

## Active production services

- Next.js on Vercel serves the public site, analyst workspace and server-side APIs.
- Supabase stores CRM, client cabinet and consent-based pageview data with RLS enabled.
- Heimdall-SA runs as a private Python service behind Nginx and is reached only through signed site APIs.

## Private boundaries

- `/analyst/**`, `/admin-crm` and `/admin-client-checks` require an analyst session.
- `/app` receives client access tokens in the URL fragment, removes the fragment immediately and validates by POST header.
- `/api/heimdall-sa/analyze` streams uploads without buffering the whole request in Vercel.
- Heimdall-SA publicly exposes only `/health`, signed `/api/analyze` and signed `/reports/**`.
- SBIS credentials and maintenance endpoints remain on the Heimdall-SA host and are never sent to the browser.

## Analytics

- Analytics starts only after explicit consent.
- Query strings, fragments and private workspace paths are not stored.
- IP addresses are HMAC-pseudonymized with `ANALYTICS_HASH_SALT` or `HEIMDALL_ANALYST_SECRET`.
- The protected report is available at `/analyst/analytics`.

## Telegram Mini App

- `/risk-radar` is the mobile-first HEIMDALL Risk Radar for Telegram and regular browsers.
- Assessment answers and progress remain in local browser storage; only an explicit service request is sent to the backend.
- `/api/telegram-miniapp-lead` validates signed Telegram `initData` when it is present, rate-limits requests and never stores the raw signed payload.
- The Mini App does not request passports, document numbers or other sensitive identifiers.
- The route has a dedicated CSP that permits Telegram Web embedding without relaxing the framing policy for the rest of the site.

## Required environment variables

- `HEIMDALL_ANALYST_LOGIN`
- `HEIMDALL_ANALYST_PASSWORD`
- `HEIMDALL_ANALYST_SECRET`
- `HEIMDALL_ADMIN_SECRET` (recommended; Heimdall-SA signing falls back to the analyst session secret)
- `NEXT_PUBLIC_YM_ID`
- Supabase URL, anon key and service-role key

Optional overrides:

- `ANALYTICS_HASH_SALT`
- `ANALYTICS_READ_TOKEN`
- `HEIMDALL_SA_SIGNING_SECRET`
- `HEIMDALL_SA_BASE_URL`
