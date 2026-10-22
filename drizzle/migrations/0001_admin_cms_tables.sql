create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "Users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create table public.admin_invites (
  email text primary key,
  created_at timestamptz not null default now()
);
grant select, insert, delete on public.admin_invites to authenticated;
grant all on public.admin_invites to service_role;
alter table public.admin_invites enable row level security;
create policy "Admins manage invites" on public.admin_invites for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "Anyone reads content" on public.site_content for select to anon, authenticated using (true);
create policy "Admins write content" on public.site_content for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title_ua text not null default '',
  title_en text not null default '',
  body_ua text not null default '',
  body_en text not null default '',
  image_url text,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.news to anon, authenticated;
grant insert, update, delete on public.news to authenticated;
grant all on public.news to service_role;
alter table public.news enable row level security;
create policy "Public reads published news" on public.news for select to anon, authenticated
  using (published or public.has_role(auth.uid(), 'admin'));
create policy "Admins write news" on public.news for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.vacancies (
  id uuid primary key default gen_random_uuid(),
  category_ua text not null default '',
  category_en text not null default '',
  title_ua text not null default '',
  title_en text not null default '',
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.vacancies to anon, authenticated;
grant insert, update, delete on public.vacancies to authenticated;
grant all on public.vacancies to service_role;
alter table public.vacancies enable row level security;
create policy "Public reads active vacancies" on public.vacancies for select to anon, authenticated
  using (active or public.has_role(auth.uid(), 'admin'));
create policy "Admins write vacancies" on public.vacancies for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));