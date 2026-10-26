import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useSiteContent, type ContentKey, type NewsRow, type VacancyRow } from '@/lib/content';

function AuthForm() {
  const [mode, setMode] = useState<'in' | 'up' | 'forgot'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === 'in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === 'up') {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) throw error;
        toast.success('Перевірте пошту та підтвердіть адресу, потім увійдіть.');
        setMode('in');
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        toast.success('Лист для зміни пароля надіслано.');
        setMode('in');
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto bg-card border border-border rounded p-6 space-y-4">
      <h1 className="font-heading text-2xl font-bold">
        {mode === 'in' ? 'Вхід в адмінку' : mode === 'up' ? 'Реєстрація' : 'Відновлення пароля'}
      </h1>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {mode !== 'forgot' && (
        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      <Button type="submit" variant="hero" className="w-full" disabled={busy}>
        {mode === 'in' ? 'Увійти' : mode === 'up' ? 'Зареєструватися' : 'Надіслати лист'}
      </Button>
      <div className="flex justify-between text-sm text-muted-foreground">
        <button type="button" onClick={() => setMode(mode === 'up' ? 'in' : 'up')} className="hover:text-foreground">
          {mode === 'up' ? 'Вже є акаунт' : 'Реєстрація'}
        </button>
        <button type="button" onClick={() => setMode('forgot')} className="hover:text-foreground">Забули пароль?</button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {multiline ? (
        <Textarea rows={10} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ContentEditor<K extends ContentKey>({ contentKey, fields }: { contentKey: K; fields: { name: string; label: string; multiline?: boolean }[] }) {
  const current = useSiteContent(contentKey) as Record<string, string>;
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const values = draft ?? current;

  const save = async () => {
    const { error } = await supabase.from('site_content').upsert({ key: contentKey, data: values, updated_at: new Date().toISOString() });
    if (error) return toast.error(error.message);
    toast.success('Збережено');
    setDraft(null);
    qc.invalidateQueries({ queryKey: ['site_content', contentKey] });
  };

  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <Field key={f.name} label={f.label} multiline={f.multiline} value={values[f.name] ?? ''} onChange={(v) => setDraft({ ...values, [f.name]: v })} />
      ))}
      <p className="text-xs text-muted-foreground">У великих текстах абзаци розділяйте порожнім рядком.</p>
      <Button variant="hero" onClick={save}>Зберегти</Button>
    </div>
  );
}

async function uploadImage(file: File) {
  const path = `news/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const { error } = await supabase.storage.from('site-media').upload(path, file);
  if (error) throw error;
  const { data, error: e2 } = await supabase.storage.from('site-media').createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2) throw e2;
  return data.signedUrl;
}

const emptyNews = { title_ua: '', title_en: '', body_ua: '', body_en: '', image_url: null as string | null, published: true };

function NewsEditor() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['news', 'admin'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*').order('published_at', { ascending: false });
      if (error) throw error;
      return data as NewsRow[];
    },
  });
  const [editing, setEditing] = useState<(typeof emptyNews & { id?: string }) | null>(null);
  const [busy, setBusy] = useState(false);
  const refresh = () => qc.invalidateQueries({ queryKey: ['news'] });

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    const { id, ...row } = editing;
    const { error } = id ? await supabase.from('news').update(row).eq('id', id) : await supabase.from('news').insert(row);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success('Збережено');
    setEditing(null);
    refresh();
  };

  const remove = async (id: string) => {
    if (!confirm('Видалити новину?')) return;
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) return toast.error(error.message);
    refresh();
  };

  if (editing) {
    const set = (patch: Partial<typeof editing>) => setEditing({ ...editing, ...patch });
    return (
      <div className="space-y-4">
        <Field label="Заголовок (UA)" value={editing.title_ua} onChange={(v) => set({ title_ua: v })} />
        <Field label="Заголовок (EN)" value={editing.title_en} onChange={(v) => set({ title_en: v })} />
        <Field label="Текст (UA)" multiline value={editing.body_ua} onChange={(v) => set({ body_ua: v })} />
        <Field label="Текст (EN)" multiline value={editing.body_en} onChange={(v) => set({ body_en: v })} />
        <div className="space-y-2">
          <Label>Фото</Label>
          {editing.image_url && <img src={editing.image_url} alt="" className="h-32 rounded object-cover" />}
          <Input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBusy(true);
              try { set({ image_url: await uploadImage(f) }); } catch (err) { toast.error((err as Error).message); }
              setBusy(false);
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={editing.published} onCheckedChange={(v) => set({ published: v })} />
          <span>Опубліковано</span>
        </div>
        <div className="flex gap-3">
          <Button variant="hero" onClick={save} disabled={busy}>Зберегти</Button>
          <Button variant="outline" onClick={() => setEditing(null)}>Скасувати</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button variant="hero" onClick={() => setEditing({ ...emptyNews })}>+ Додати новину</Button>
      {list.data?.length === 0 && <p className="text-muted-foreground">Новин ще немає — на сайті показуються заглушки.</p>}
      {list.data?.map((n) => (
        <div key={n.id} className="flex items-center gap-4 border border-border rounded p-3">
          {n.image_url && <img src={n.image_url} alt="" className="w-16 h-16 object-cover rounded" />}
          <div className="flex-1">
            <p className="font-semibold">{n.title_ua || '(без заголовка)'}</p>
            <p className="text-xs text-muted-foreground">{n.published ? 'Опубліковано' : 'Чернетка'} · {new Date(n.published_at).toLocaleDateString('uk-UA')}</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setEditing({ ...n })}>Редагувати</Button>
          <Button size="sm" variant="destructive" onClick={() => remove(n.id)}>Видалити</Button>
        </div>
      ))}
    </div>
  );
}

function VacanciesEditor() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['vacancies', 'admin'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vacancies').select('*').order('sort_order').order('created_at');
      if (error) throw error;
      return data as VacancyRow[];
    },
  });
  const [rows, setRows] = useState<VacancyRow[] | null>(null);
  const data = rows ?? list.data ?? [];
  const refresh = () => { setRows(null); qc.invalidateQueries({ queryKey: ['vacancies'] }); };
  const update = (id: string, patch: Partial<VacancyRow>) => setRows(data.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const saveRow = async (r: VacancyRow) => {
    const { id, ...rest } = r;
    const { error } = await supabase.from('vacancies').update(rest).eq('id', id);
    if (error) return toast.error(error.message);
    toast.success('Збережено');
    refresh();
  };
  const add = async () => {
    const last = data[data.length - 1];
    const { error } = await supabase.from('vacancies').insert({
      category_ua: last?.category_ua ?? '', category_en: last?.category_en ?? '',
      title_ua: 'Нова посада', title_en: 'New position', sort_order: (last?.sort_order ?? 0) + 1,
    });
    if (error) return toast.error(error.message);
    refresh();
  };
  const remove = async (id: string) => {
    if (!confirm('Видалити вакансію?')) return;
    const { error } = await supabase.from('vacancies').delete().eq('id', id);
    if (error) return toast.error(error.message);
    refresh();
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Посади з однаковою категорією об'єднуються в один блок. Порядок — за номером.</p>
      {data.map((r) => (
        <div key={r.id} className="border border-border rounded p-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input placeholder="Категорія (UA)" value={r.category_ua} onChange={(e) => update(r.id, { category_ua: e.target.value })} />
          <Input placeholder="Категорія (EN)" value={r.category_en} onChange={(e) => update(r.id, { category_en: e.target.value })} />
          <Input placeholder="Посада (UA)" value={r.title_ua} onChange={(e) => update(r.id, { title_ua: e.target.value })} />
          <Input placeholder="Посада (EN)" value={r.title_en} onChange={(e) => update(r.id, { title_en: e.target.value })} />
          <div className="flex items-center gap-3 md:col-span-2">
            <Input type="number" className="w-24" value={r.sort_order} onChange={(e) => update(r.id, { sort_order: Number(e.target.value) })} />
            <Switch checked={r.active} onCheckedChange={(v) => update(r.id, { active: v })} />
            <span className="text-sm">{r.active ? 'Показується' : 'Прихована'}</span>
            <div className="ml-auto flex gap-2">
              <Button size="sm" variant="hero" onClick={() => saveRow(r)}>Зберегти</Button>
              <Button size="sm" variant="destructive" onClick={() => remove(r.id)}>Видалити</Button>
            </div>
          </div>
        </div>
      ))}
      <Button variant="hero" onClick={add}>+ Додати вакансію</Button>
    </div>
  );
}

function AdminsEditor() {
  const list = useQuery({
    queryKey: ['admin_invites'],
    queryFn: async () => {
      const { data, error } = await supabase.from('admin_invites').select('*').order('created_at');
      if (error) throw error;
      return data;
    },
  });
  const [email, setEmail] = useState('');
  const add = async () => {
    const { error } = await supabase.from('admin_invites').insert({ email: email.trim().toLowerCase() });
    if (error) return toast.error(error.message);
    setEmail('');
    list.refetch();
  };
  const remove = async (e: string) => {
    const { error } = await supabase.from('admin_invites').delete().eq('email', e);
    if (error) return toast.error(error.message);
    list.refetch();
  };
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Додайте email людини. Вона реєструється на цій сторінці, підтверджує пошту і отримує доступ.
      </p>
      <div className="flex gap-2">
        <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button variant="hero" onClick={add} disabled={!email}>Додати</Button>
      </div>
      {list.data?.map((i) => (
        <div key={i.email} className="flex items-center justify-between border border-border rounded p-3">
          <span>{i.email}</span>
          <Button size="sm" variant="outline" onClick={() => remove(i.email)}>Прибрати</Button>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.rpc('claim_admin').then(({ data, error }) => setIsAdmin(!error && data === true));
  }, [session]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="font-heading text-xl font-bold">SLOBODA · Адмінка</Link>
          {session && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground hidden sm:inline">{session.user.email}</span>
              <Button size="sm" variant="outline" onClick={() => supabase.auth.signOut()}>Вийти</Button>
            </div>
          )}
        </div>
      </header>
      <main className="container py-10">
        {!ready ? null : !session ? (
          <AuthForm />
        ) : isAdmin === null ? (
          <p className="text-muted-foreground">Перевірка доступу…</p>
        ) : !isAdmin ? (
          <p className="text-muted-foreground max-w-md">
            У цього акаунта немає доступу до адмінки. Попросіть адміністратора додати ваш email.
          </p>
        ) : (
          <Tabs defaultValue="fund" className="max-w-4xl">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="fund">Реквізити</TabsTrigger>
              <TabsTrigger value="news">Новини</TabsTrigger>
              <TabsTrigger value="vacancies">Вакансії</TabsTrigger>
              <TabsTrigger value="about">Про загін</TabsTrigger>
              <TabsTrigger value="commander">Командир</TabsTrigger>
              <TabsTrigger value="admins">Адміністратори</TabsTrigger>
            </TabsList>
            <div className="mt-6">
              <TabsContent value="fund">
                <ContentEditor contentKey="fund" fields={[
                  { name: 'recipient', label: 'Отримувач' },
                  { name: 'card', label: 'Номер картки' },
                  { name: 'iban', label: 'IBAN' },
                  { name: 'jarUrl', label: 'Посилання для кнопки «Зробити донат» (порожньо — без посилання)' },
                ]} />
              </TabsContent>
              <TabsContent value="news"><NewsEditor /></TabsContent>
              <TabsContent value="vacancies"><VacanciesEditor /></TabsContent>
              <TabsContent value="about">
                <ContentEditor contentKey="about" fields={[
                  { name: 'historyUA', label: 'Історія (UA)', multiline: true },
                  { name: 'historyEN', label: 'History (EN)', multiline: true },
                ]} />
              </TabsContent>
              <TabsContent value="commander">
                <ContentEditor contentKey="commander" fields={[
                  { name: 'nameUA', label: "Ім'я (UA)" },
                  { name: 'nameEN', label: 'Name (EN)' },
                  { name: 'roleUA', label: 'Посада (UA)' },
                  { name: 'roleEN', label: 'Role (EN)' },
                  { name: 'bioUA', label: 'Біографія (UA)', multiline: true },
                  { name: 'bioEN', label: 'Biography (EN)', multiline: true },
                ]} />
              </TabsContent>
              <TabsContent value="admins"><AdminsEditor /></TabsContent>
            </div>
          </Tabs>
        )}
      </main>
    </div>
  );
}
