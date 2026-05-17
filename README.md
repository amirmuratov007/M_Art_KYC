# HEIMDALL — Production Ready Website

Premium B2B landing page for HEIMDALL corporate intelligence and risk advisory.

## Stack

- Next.js
- React
- Tailwind CSS
- Supabase
- Telegram Bot API
- Vercel

## Important form architecture

The lead form uses a direct button click handler:

- button: `type="button"`
- handler: `onClick={submitLead}`
- form also has `onSubmit={submitLead}` only as fallback

This means the button works even when native browser form submit behavior is broken or blocked.

## Required Vercel Environment Variables

Add these in Vercel → Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
TG_TOKEN=your_telegram_bot_token
TG_CHAT_ID=5725224978
```

Do **not** expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code. It is used only inside `/api/lead`.

## Supabase setup

Run `supabase.sql` in Supabase SQL Editor.

Required table: `public.leads`.

## API routes

### POST `/api/lead`

Receives lead data, validates name and phone, inserts into Supabase, sends Telegram notification, returns JSON.

Response example:

```json
{
  "ok": true,
  "saved": true,
  "lead_id": 1,
  "telegram": { "ok": true }
}
```

### GET `/api/health`

Checks whether required ENV variables are present.

Open after deploy:

```txt
https://your-domain.com/api/health
```

Expected result:

```json
{
  "ok": true,
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": true,
    "SUPABASE_SERVICE_ROLE_KEY": true,
    "TG_TOKEN": true,
    "TG_CHAT_ID": true
  }
}
```

## Vercel debugging logs

Search logs for:

- `[HEIMDALL_FORM]` in browser console
- `[HEIMDALL_API_LEAD]` in Vercel Function Logs
- `[HEIMDALL_API_HEALTH]` in Vercel Function Logs

## Local commands

```bash
npm install
npm run dev
npm run build
npm run start
```

## Deployment

1. Upload this project to GitHub.
2. Import GitHub repo into Vercel.
3. Add ENV variables.
4. Deploy.
5. Check `/api/health`.
6. Submit a test lead from the page.
7. Confirm:
   - success message appears on the page
   - Vercel logs show `/api/lead`
   - Supabase has a new row in `leads`
   - Telegram receives the message
