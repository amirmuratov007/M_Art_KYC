# HEIMDALL Premium B2B Website

Production-ready Next.js project for HEIMDALL Group.

## Stack
- Next.js App Router
- React
- Tailwind CSS
- Supabase server insert with service role key
- Telegram Bot API sendMessage
- Vercel-ready API routes

## ENV variables in Vercel
Add these in **Vercel → Project → Settings → Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
TG_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
TG_CHAT_ID=5725224978
```

## Supabase
Run `supabase.sql` in Supabase SQL Editor.

Table used by API: `public.leads`.

## Important routes
- Website: `/`
- Lead API: `/api/lead`
- Health check: `/api/health`

## Form stability
The form uses a direct button `onClick` handler and also keeps `onSubmit` as fallback. Native form submit is not required for the button to work.

## Debugging in Vercel
Open Vercel → Project → Logs and filter for:

```text
[HEIMDALL_FORM]
[HEIMDALL_LEAD]
```

Expected successful flow:
1. Browser console: `[HEIMDALL_FORM] submit clicked`
2. Browser console: `[HEIMDALL_FORM] api response`
3. Vercel logs: `[HEIMDALL_LEAD] POST start`
4. Vercel logs: `[HEIMDALL_LEAD] Telegram sent`
5. Vercel logs: `[HEIMDALL_LEAD] Success`
6. Supabase row appears in `public.leads`
7. Telegram receives the message

## Deploy
```bash
npm install
npm run build
npm run start
```

For Vercel: upload/push the repository, set ENV variables, deploy.
