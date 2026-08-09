create table if not exists public.site_settings (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  company_name text,
  project_type text not null,
  project_location text not null,
  estimated_budget text,
  target_timeline text,
  project_scope_details text,
  attachment_name text,
  has_architectural_plans boolean not null default false
);

alter table public.site_settings enable row level security;
alter table public.quote_requests enable row level security;
revoke all on public.site_settings, public.quote_requests from anon, authenticated;
