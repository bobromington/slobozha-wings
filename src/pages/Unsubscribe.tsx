import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = 'loading' | 'valid' | 'already' | 'invalid' | 'success' | 'error';

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    if (!token) { setState('invalid'); return; }
    (async () => {
      try {
        const r = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
          headers: { apikey: SUPABASE_ANON },
        });
        const d = await r.json();
        if (d.valid) setState('valid');
        else if (d.reason === 'already_unsubscribed') setState('already');
        else setState('invalid');
      } catch { setState('error'); }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState('loading');
    const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', { body: { token } });
    if (error) setState('error');
    else if (data?.success) setState('success');
    else if (data?.reason === 'already_unsubscribed') setState('already');
    else setState('error');
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="max-w-md w-full text-center bg-card/70 border border-border/50 rounded p-8">
        <h1 className="font-heading text-3xl uppercase mb-4 text-foreground">Відписка</h1>
        {state === 'loading' && <p className="text-muted-foreground">Завантаження…</p>}
        {state === 'valid' && (
          <>
            <p className="text-muted-foreground mb-6">Підтвердіть, що бажаєте відписатися від листів.</p>
            <Button variant="hero" onClick={confirm}>Підтвердити відписку</Button>
          </>
        )}
        {state === 'success' && <p className="text-foreground">Ви успішно відписалися.</p>}
        {state === 'already' && <p className="text-foreground">Ви вже відписані.</p>}
        {state === 'invalid' && <p className="text-destructive">Посилання недійсне або застаріле.</p>}
        {state === 'error' && <p className="text-destructive">Сталася помилка. Спробуйте пізніше.</p>}
      </div>
    </main>
  );
}
