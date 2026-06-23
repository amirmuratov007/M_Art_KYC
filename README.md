# HEIMDALL

Next.js website with public landing pages, client access pages, CRM endpoints and a protected analyst workspace.

## Local setup

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
npm run build
```

## Required Vercel environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

HEIMDALL_ADMIN_SECRET=
HEIMDALL_ANALYST_LOGIN=
HEIMDALL_ANALYST_PASSWORD=
HEIMDALL_ANALYST_SECRET=

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
SUPABASE_LEADS_TABLE=heimdall_leads
```

Legacy `TG_TOKEN` and `TG_CHAT_ID` are still supported by some API routes, but use `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` for new deployments.

Optional AI analysis variables:

```env
AI_PROVIDER=
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=
```

## Supabase SQL

Apply the SQL files from `supabase/` in this order when enabling all product areas:

1. `client_account_schema.sql`
2. `client_access_links.sql`
3. `heimdall_crm_schema.sql`
4. `risk_intelligence_stage1.sql`
5. `risk_intelligence_stage2.sql`

## Security notes

Do not pass `HEIMDALL_ADMIN_SECRET` in query strings. Admin API routes accept it via `x-heimdall-admin-secret` or `Authorization: Bearer ...`.

Keep `SUPABASE_SERVICE_ROLE_KEY`, Telegram credentials, admin credentials and AI provider keys server-side only.
