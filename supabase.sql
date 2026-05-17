create table if not exists public.leads (
  id bigint generated always as identity primary key,
  name text not null,
  company text not null,
  segment text,
  email text,
  phone text,
  service text,
  language text default 'RU',
  message text,
  source text,
  telegram_sent boolean default false,
  user_agent text,
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

-- API uses SUPABASE_SERVICE_ROLE_KEY on the server, so RLS does not block inserts.
-- Do NOT expose SUPABASE_SERVICE_ROLE_KEY in browser code.
