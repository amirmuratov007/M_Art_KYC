create table if not exists public.heimdall_company_crm (
  id text primary key,
  name text not null,
  contact text default '',
  source text default '',
  status text default 'Новая заявка',
  note text default '',
  checks jsonb not null default '[]'::jsonb,
  lead jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists heimdall_company_crm_updated_at_idx
  on public.heimdall_company_crm (updated_at desc);

alter table public.heimdall_company_crm enable row level security;

drop policy if exists "service role manages heimdall_company_crm" on public.heimdall_company_crm;
create policy "service role manages heimdall_company_crm"
  on public.heimdall_company_crm
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

