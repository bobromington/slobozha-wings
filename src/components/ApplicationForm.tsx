import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

function buildSchemas(tr: ReturnType<typeof t>['application']) {
  const e = tr.errors;
  const base = {
    firstName: z.string().trim().min(2, e.nameLen).max(50, e.nameLen),
    lastName: z.string().trim().min(2, e.nameLen).max(50, e.nameLen),
    phone: z.string().regex(/^0(39|50|63|66|67|68|73|91|92|93|94|95|96|97|98|99)\d{7}$/, e.phone),
    email: z.string().trim().email(e.email).max(255),
    day: z.string().regex(/^\d{1,2}$/, e.date),
    month: z.string().regex(/^\d{1,2}$/, e.date),
    year: z.string().regex(/^\d{4}$/, e.date),
    comment: z.string().max(1000).optional().or(z.literal('')),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
  };

  const dateRefine = (data: { day: string; month: string; year: string }, ctx: z.RefinementCtx) => {
    const d = parseInt(data.day, 10);
    const m = parseInt(data.month, 10);
    const y = parseInt(data.year, 10);
    const dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) {
      ctx.addIssue({ code: 'custom', message: e.date, path: ['day'] });
      return;
    }
    const age = (Date.now() - dt.getTime()) / (365.25 * 24 * 3600 * 1000);
    if (age < 18 || age > 65) {
      ctx.addIssue({ code: 'custom', message: e.age, path: ['day'] });
    }
  };

  const civilian = z.object(base).superRefine(dateRefine);
  const military = z.object({ ...base, branch: z.string().min(1, e.required) }).superRefine(dateRefine);
  return { civilian, military };
}

type FormMode = 'civilian' | 'military';

function ApplicationFormInner({ mode }: { mode: FormMode }) {
  const { lang } = useLanguage();
  const tr = t(lang).application;
  const { civilian, military } = buildSchemas(tr);
  const schema = mode === 'civilian' ? civilian : military;

  const form = useForm<z.infer<typeof military>>({
    resolver: zodResolver(schema as never),
    defaultValues: {
      firstName: '', lastName: '', phone: '', email: '',
      day: '', month: '', year: '', comment: '',
      branch: '', consent: false as unknown as true,
    },
  });

  const onSubmit = async (values: z.infer<typeof military>) => {
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'application-submission',
          idempotencyKey: `application-${id}`,
          templateData: { mode, lang, ...values },
        },
      });
      if (error) throw error;
      toast.success(tr.success);
      form.reset();
    } catch (e) {
      console.error('application submit failed', e);
      toast.error(tr.errorSubmit);
    }
  };

  const branchKeys = ['zsu', 'tro', 'ngu', 'dpsu', 'mp', 'dshv', 'sso', 'other'] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="firstName" render={({ field }) => (
            <FormItem>
              <FormLabel>{tr.fields.firstName} *</FormLabel>
              <FormControl><Input {...field} maxLength={50} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem>
              <FormLabel>{tr.fields.lastName} *</FormLabel>
              <FormControl><Input {...field} maxLength={50} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>{tr.fields.phone} *</FormLabel>
            <FormControl>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-secondary text-foreground text-sm">+38</span>
                <Input {...field} inputMode="numeric" maxLength={10} placeholder="0XXXXXXXXX"
                  className="rounded-l-none"
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 10))} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>{tr.fields.email} *</FormLabel>
            <FormControl><Input type="email" {...field} maxLength={255} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormItem>
          <FormLabel>{tr.fields.birthDate} *</FormLabel>
          <div className="grid grid-cols-3 gap-3">
            <FormField control={form.control} name="day" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} inputMode="numeric" maxLength={2} placeholder="DD"
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 2))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="month" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} inputMode="numeric" maxLength={2} placeholder="MM"
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 2))} />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="year" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} inputMode="numeric" maxLength={4} placeholder="YYYY"
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 4))} />
                </FormControl>
              </FormItem>
            )} />
          </div>
        </FormItem>

        {mode === 'military' && (
          <FormField control={form.control} name="branch" render={({ field }) => (
            <FormItem>
              <FormLabel>{tr.fields.branch} *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger><SelectValue placeholder={tr.fields.branchPlaceholder} /></SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branchKeys.map((k) => (
                    <SelectItem key={k} value={k}>{tr.branches[k]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={form.control} name="comment" render={({ field }) => (
          <FormItem>
            <FormLabel>{tr.fields.comment}</FormLabel>
            <FormControl><Textarea {...field} rows={4} maxLength={1000} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="consent" render={({ field }) => (
          <FormItem>
            <div className="flex items-start gap-3">
              <FormControl>
                <Checkbox checked={field.value as unknown as boolean}
                  onCheckedChange={(v) => field.onChange(v === true)} className="mt-1" />
              </FormControl>
              <FormLabel className="leading-snug font-normal cursor-pointer">
                {tr.fields.consent} *
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
          {tr.submit}
        </Button>
      </form>
    </Form>
  );
}

export default function ApplicationForm() {
  const { lang } = useLanguage();
  const tr = t(lang).application;
  const [mode, setMode] = useState<FormMode>('civilian');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="bg-card/70 backdrop-blur-md border border-border/50 rounded p-6 md:p-10"
    >
      <div className="text-center mb-8">
        <p className="font-heading text-sm tracking-[0.3em] text-primary-bright mb-3">{tr.subtitle}</p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase text-foreground">{tr.title}</h2>
      </div>

      <p className="font-heading text-xs tracking-[0.3em] text-muted-foreground text-center mb-4 uppercase">
        {tr.statusLabel}
      </p>

      <Tabs value={mode} onValueChange={(v) => setMode(v as FormMode)} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="civilian" className="font-heading uppercase tracking-widest">
            {tr.tabs.civilian}
          </TabsTrigger>
          <TabsTrigger value="military" className="font-heading uppercase tracking-widest">
            {tr.tabs.military}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="civilian" forceMount hidden={mode !== 'civilian'}>
          <ApplicationFormInner mode="civilian" key={`civ-${lang}`} />
        </TabsContent>
        <TabsContent value="military" forceMount hidden={mode !== 'military'}>
          <ApplicationFormInner mode="military" key={`mil-${lang}`} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
