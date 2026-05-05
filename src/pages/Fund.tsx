import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import pattern from '@/assets/sloboda-pattern.png';

export default function Fund() {
  const { lang } = useLanguage();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], ['0%', '25%']);

  return (
    <div className="min-h-screen bg-background relative">
      <motion.div
        aria-hidden
        className="fixed inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
          top: '-15%',
          height: '130%',
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, hsl(var(--background) / 0.75) 78%, hsl(var(--background)) 100%)',
        }}
      />
      <div className="relative z-10">
      <Header />
      <section className="relative pt-20 md:pt-32 pb-4 md:pb-8">
        <div className="container max-w-3xl relative z-10">
          <motion.h1
            className="font-heading font-bold text-foreground mb-4 whitespace-nowrap text-[clamp(1.1rem,6.2vw,4.5rem)]"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          >
            {lang === 'ua' ? 'Благодійний фонд' : 'Charity Fund'}
          </motion.h1>
        </div>
      </section>

      <section className="pt-4 pb-16 md:pt-4 md:pb-16">
        <div className="container max-w-3xl">
          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div className="bg-card border border-border rounded p-6">
              <h2 className="font-heading text-2xl font-bold text-primary mb-3">
                {lang === 'ua' ? 'Напрямки зборів' : 'Fundraising Directions'}
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {(lang === 'ua'
                  ? ['Закупівля БПЛА', 'Запчастини та комплектуючі', 'Засоби РЕБ', 'Тепловізори та оптика', 'Транспорт та логістика']
                  : ['UAV procurement', 'Spare parts & components', 'EW equipment', 'Thermal imagers & optics', 'Transport & logistics']
                ).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded p-6">
              <h2 className="font-heading text-2xl font-bold text-primary mb-3">
                {lang === 'ua' ? 'Реквізити' : 'Bank Details'}
              </h2>
              <div className="space-y-2 text-muted-foreground text-sm font-mono">
                <p>{lang === 'ua' ? 'Картка' : 'Card'}: 5375 4112 2192 1567</p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button variant="hero" size="xl" asChild>
                <a
                  href="https://send.monobank.ua/jar/3MvSNZbPmH"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {lang === 'ua' ? 'Зробити донат' : 'Make a Donation'}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      </div>
    </div>
  );
}
