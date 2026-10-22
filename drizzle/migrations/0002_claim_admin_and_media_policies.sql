create or replace function public.claim_admin()
returns boolean language plpgsql security definer set search_path = public
as $$
declare _email text;
begin
  if auth.uid() is null then return false; end if;
  select email into _email from auth.users where id = auth.uid() and email_confirmed_at is not null;
  if _email is null then return false; end if;
  if exists (select 1 from public.admin_invites where lower(email) = lower(_email)) then
    insert into public.user_roles (user_id, role) values (auth.uid(), 'admin') on conflict do nothing;
  end if;
  return public.has_role(auth.uid(), 'admin');
end $$;
revoke execute on function public.claim_admin() from public, anon;
grant execute on function public.claim_admin() to authenticated;

create policy "Admins upload site media" on storage.objects for insert to authenticated
  with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update site media" on storage.objects for update to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete site media" on storage.objects for delete to authenticated
  using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));