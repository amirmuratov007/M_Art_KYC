-- Run once in Supabase SQL Editor after the legacy risk-intelligence module is retired.
-- Existing data is preserved. Public and authenticated clients lose direct access.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'risk_objects',
    'risk_signals',
    'risk_connections',
    'risk_reports'
  ]
  loop
    if to_regclass('public.' || table_name) is not null then
      execute format('alter table public.%I enable row level security', table_name);
      execute format('revoke all on table public.%I from anon, authenticated', table_name);
    end if;
  end loop;
end $$;

