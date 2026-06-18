create extension if not exists pgcrypto;

create table if not exists public.risk_intelligence_objects (
  id uuid primary key default gen_random_uuid(),
  title text not null default 'Новый объект проверки',
  object_type text not null default 'candidate',
  status text not null default 'draft',
  risk_level text not null default 'unknown',
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.risk_intelligence_signals (
  id uuid primary key default gen_random_uuid(),
  object_id uuid not null references public.risk_intelligence_objects(id) on delete cascade,
  title text not null default 'Сигнал риска',
  description text,
  severity text not null default 'medium',
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.risk_intelligence_connections (
  id uuid primary key default gen_random_uuid(),
  object_id uuid not null references public.risk_intelligence_objects(id) on delete cascade,
  from_label text not null default 'Объект',
  to_label text not null default 'Связанный объект',
  relation_type text default 'связь',
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.risk_intelligence_reports (
  id uuid primary key default gen_random_uuid(),
  object_id uuid not null references public.risk_intelligence_objects(id) on delete cascade,
  title text not null default 'Шаблонный отчет',
  report_text text not null default '',
  created_at timestamptz not null default now()
);

alter table public.risk_intelligence_objects enable row level security;
alter table public.risk_intelligence_signals enable row level security;
alter table public.risk_intelligence_connections enable row level security;
alter table public.risk_intelligence_reports enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'risk_intelligence_objects' and policyname = 'service role full access risk objects'
  ) then
    create policy "service role full access risk objects" on public.risk_intelligence_objects for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'risk_intelligence_signals' and policyname = 'service role full access risk signals'
  ) then
    create policy "service role full access risk signals" on public.risk_intelligence_signals for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'risk_intelligence_connections' and policyname = 'service role full access risk connections'
  ) then
    create policy "service role full access risk connections" on public.risk_intelligence_connections for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'risk_intelligence_reports' and policyname = 'service role full access risk reports'
  ) then
    create policy "service role full access risk reports" on public.risk_intelligence_reports for all using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
end $$;

create index if not exists risk_intelligence_objects_updated_at_idx on public.risk_intelligence_objects(updated_at desc);
create index if not exists risk_intelligence_signals_object_id_idx on public.risk_intelligence_signals(object_id);
create index if not exists risk_intelligence_connections_object_id_idx on public.risk_intelligence_connections(object_id);
create index if not exists risk_intelligence_reports_object_id_idx on public.risk_intelligence_reports(object_id);
