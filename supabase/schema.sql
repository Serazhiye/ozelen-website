-- Supabase schema for the Nord Botanic CMS content store.
-- Run this once in your Supabase project: SQL Editor → paste → Run.

create table if not exists public.content (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

-- Keep the table locked down: the app talks to it only from the server using
-- the service-role key, which bypasses RLS. Enabling RLS with no public
-- policies means the anon/public key cannot read or write this table.
alter table public.content enable row level security;

-- Optional: auto-touch updated_at on writes.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_touch_updated_at on public.content;
create trigger content_touch_updated_at
  before update on public.content
  for each row execute function public.touch_updated_at();
