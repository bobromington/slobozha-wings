import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { aboutDefaults, commanderDefaults, fundDefaults } from './contentDefaults';

export type FundContent = typeof fundDefaults;
export type AboutContent = typeof aboutDefaults;
export type CommanderContent = typeof commanderDefaults;

const defaults = { fund: fundDefaults, about: aboutDefaults, commander: commanderDefaults };
export type ContentKey = keyof typeof defaults;

export function useSiteContent<K extends ContentKey>(key: K) {
  const q = useQuery({
    queryKey: ['site_content', key],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_content').select('data').eq('key', key).maybeSingle();
      if (error) throw error;
      return (data?.data ?? {}) as Partial<(typeof defaults)[K]>;
    },
    staleTime: 60_000,
  });
  const saved = q.data ?? {};
  const merged = { ...defaults[key] } as (typeof defaults)[K];
  for (const [k, v] of Object.entries(saved)) {
    if (typeof v === 'string' && v.trim() !== '') (merged as Record<string, unknown>)[k] = v;
  }
  return merged;
}

export const toParagraphs = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export type NewsRow = {
  id: string; title_ua: string; title_en: string; body_ua: string; body_en: string;
  image_url: string | null; published: boolean; published_at: string;
};

export function usePublishedNews() {
  return useQuery({
    queryKey: ['news', 'published'],
    queryFn: async () => {
      const { data, error } = await supabase.from('news').select('*').eq('published', true).order('published_at', { ascending: false });
      if (error) throw error;
      return data as NewsRow[];
    },
    staleTime: 60_000,
  });
}

export type VacancyRow = {
  id: string; category_ua: string; category_en: string; title_ua: string; title_en: string;
  active: boolean; sort_order: number;
};

export function useActiveVacancies() {
  return useQuery({
    queryKey: ['vacancies', 'active'],
    queryFn: async () => {
      const { data, error } = await supabase.from('vacancies').select('*').eq('active', true).order('sort_order').order('created_at');
      if (error) throw error;
      return data as VacancyRow[];
    },
    staleTime: 60_000,
  });
}

/** Groups vacancy rows into categories, preserving order. */
export function groupVacancies(rows: VacancyRow[], lang: 'ua' | 'en') {
  const map = new Map<string, { category: string; positions: string[] }>();
  for (const r of rows) {
    const key = r.category_ua || r.category_en;
    if (!map.has(key)) map.set(key, { category: lang === 'ua' ? r.category_ua : r.category_en || r.category_ua, positions: [] });
    map.get(key)!.positions.push(lang === 'ua' ? r.title_ua : r.title_en || r.title_ua);
  }
  return [...map.values()];
}
