create table if not exists public.leads (
  id bigint generated always as identity primary key,
  name text not null,
  company text,
  email text,
  phone text not null,
  check_type text,
  comment text,
  locale text default 'ru',
  source text default 'heimdall-website-production',
  created_at timestamptz default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Client browser never writes directly. /api/lead uses SUPABASE_SERVICE_ROLE_KEY on the server.
-- Service role bypasses RLS, so no public insert policy is required.
