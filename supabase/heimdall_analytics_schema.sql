create table if not exists public.heimdall_pageviews (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  path text not null,
  title text,
  referrer text,
  language text,
  timezone text,
  screen text,
  user_agent text,
  ip_hash text
);

create index if not exists heimdall_pageviews_created_at_idx
  on public.heimdall_pageviews (created_at desc);

create index if not exists heimdall_pageviews_path_idx
  on public.heimdall_pageviews (path);

alter table public.heimdall_pageviews enable row level security;
