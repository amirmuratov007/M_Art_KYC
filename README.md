# HEIMDALL — Final Working Project

Production-ready bilingual landing website.

## Required Vercel Environment Variables

Add these in Vercel → Project → Settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
TG_TOKEN=
TG_CHAT_ID=
```

## Supabase SQL

```sql
create table if not exists leads (
  id bigint generated always as identity primary key,
  name text,
  company text,
  email text,
  phone text,
  check_type text,
  comment text,
  locale text,
  source text,
  created_at timestamp default now()
);
```
