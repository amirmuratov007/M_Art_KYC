-- HEIMDALL Risk Intelligence Stage 2
-- Apply in Supabase SQL Editor before using live storage.
-- The module uses SUPABASE_SERVICE_ROLE_KEY only from server-side API routes.

create extension if not exists pgcrypto;

create table if not exists public.risk_objects (
  id uuid primary key default gen_random_uuid(),
  object_type text not null check (object_type in ('person', 'company', 'contractor', 'employee', 'candidate', 'household_staff', 'incident')),
  name text not null,
  description text,
  status text default 'new' check (status in ('new', 'in_progress', 'review', 'completed', 'archived')),
  risk_level text default 'low' check (risk_level in ('low', 'medium', 'high', 'critical')),
  risk_score integer default 0 check (risk_score >= 0 and risk_score <= 100),
  source_request_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.risk_signals (
  id uuid primary key default gen_random_uuid(),
  object_id uuid not null references public.risk_objects(id) on delete cascade,
  category text default 'other',
  title text not null,
  description text,
  severity text default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  confidence text default 'medium' check (confidence in ('low', 'medium', 'high')),
  source text,
  created_at timestamptz default now()
);

create table if not exists public.risk_connections (
  id uuid primary key default gen_random_uuid(),
  object_id uuid not null references public.risk_objects(id) on delete cascade,
  target_name text not null,
  target_type text default 'other',
  relation_type text default 'other',
  strength text default 'medium' check (strength in ('weak', 'medium', 'strong')),
  description text,
  created_at timestamptz default now()
);

create table if not exists public.risk_reports (
  id uuid primary key default gen_random_uuid(),
  object_id uuid not null references public.risk_objects(id) on delete cascade,
  report_type text default 'template_draft',
  content jsonb not null,
  created_at timestamptz default now()
);

create table if not exists public.risk_activity_log (
  id uuid primary key default gen_random_uuid(),
  object_id uuid references public.risk_objects(id) on delete cascade,
  action text not null,
  details jsonb,
  created_at timestamptz default now()
);

create index if not exists risk_objects_status_idx on public.risk_objects(status);
create index if not exists risk_objects_type_idx on public.risk_objects(object_type);
create index if not exists risk_objects_created_at_idx on public.risk_objects(created_at desc);
create index if not exists risk_signals_object_id_idx on public.risk_signals(object_id);
create index if not exists risk_connections_object_id_idx on public.risk_connections(object_id);
create index if not exists risk_reports_object_id_idx on public.risk_reports(object_id);
create index if not exists risk_activity_log_object_id_idx on public.risk_activity_log(object_id);

create or replace function public.set_risk_objects_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists risk_objects_updated_at on public.risk_objects;
create trigger risk_objects_updated_at
before update on public.risk_objects
for each row execute function public.set_risk_objects_updated_at();

-- Optional seed data. Run only if you want examples in the live table.
insert into public.risk_objects (object_type, name, description, status, risk_level, risk_score, source_request_id)
select 'candidate', 'Кандидат на руководящую роль', 'Проверка кандидата на позицию с доступом к клиентской базе, аналитике и коммерческим условиям.', 'in_progress', 'low', 0, 'CRM-LEAD-001'
where not exists (select 1 from public.risk_objects limit 1);

-- RLS note:
-- This MVP is intended for server-side access through SUPABASE_SERVICE_ROLE_KEY.
-- Do not expose service role key to browser code. If later you add user-authenticated access, enable RLS and create strict policies for admin users only.
