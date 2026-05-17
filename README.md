# M_Art_KYC Premium Website

Premium B2B lead-generation website for corporate due diligence, AML/KYC, background screening and risk intelligence services.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Vercel Environment Variables

Add these in Vercel → Project → Settings → Environment Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
TG_TOKEN
TG_CHAT_ID
NEXT_PUBLIC_SITE_URL
```

## Supabase SQL

Run in Supabase SQL editor:

```sql
create table if not exists leads (
  id bigint generated always as identity primary key,
  name text not null,
  company text,
  email text not null,
  phone text,
  check_type text,
  comment text,
  locale text default 'ru',
  source text default 'website',
  created_at timestamptz default now()
);

alter table leads enable row level security;

create policy "service role can manage leads"
on leads
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
```

The API route uses `SUPABASE_SERVICE_ROLE_KEY`, so never expose it in client code.

## Deploy

Push this folder to GitHub and import it into Vercel. Add environment variables and deploy.
