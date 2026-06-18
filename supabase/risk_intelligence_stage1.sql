-- HEIMDALL Risk Intelligence Stage 1
-- Safe schema draft for the next integration step. Do not run blindly on production without checking current RLS/auth rules.

create table if not exists public.risk_objects (
  id uuid primary key default gen_random_uuid(),
  object_type text not null,
  name text not null,
  description text,
  status text default 'new',
  risk_level text default 'low',
  risk_score integer default 0,
  source_request_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.risk_signals (
  id uuid primary key default gen_random_uuid(),
  object_id uuid references public.risk_objects(id) on delete cascade,
  category text,
  title text not null,
  description text,
  severity text default 'medium',
  confidence text default 'medium',
  source text,
  created_at timestamptz default now()
);

create table if not exists public.risk_connections (
  id uuid primary key default gen_random_uuid(),
  object_id uuid references public.risk_objects(id) on delete cascade,
  target_name text not null,
  target_type text,
  relation_type text,
  strength text default 'medium',
  description text,
  created_at timestamptz default now()
);

create table if not exists public.risk_reports (
  id uuid primary key default gen_random_uuid(),
  object_id uuid references public.risk_objects(id) on delete cascade,
  report_type text default 'draft',
  content jsonb,
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
create index if not exists risk_signals_object_id_idx on public.risk_signals(object_id);
create index if not exists risk_connections_object_id_idx on public.risk_connections(object_id);
create index if not exists risk_reports_object_id_idx on public.risk_reports(object_id);

-- RLS note:
-- If production CRM already uses RLS, enable RLS and add policies matching your existing admin/auth model.
-- Stage 1 UI does not write to these tables yet, so this SQL can be applied later during the Supabase integration stage.
