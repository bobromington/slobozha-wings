import { motion } from 'framer-motion';
import { useParallaxY } from '@/hooks/useParallaxY';
import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import bgFire from '@/assets/bg-fire.png';
import bgRed from '@/assets/bg-red.png';
import newsSting from '@/assets/news-sting.png';
import pattern from '@/assets/sloboda-pattern.png';

const newsItems = [
  { id: 1, date: '2024-03-15', titleUA: 'Успішна операція на східному напрямку', titleEN: 'Successful operation on the eastern front', image: bgFire, descUA: 'Підрозділ успішно виконав завдання з повітряної розвідки та ураження ворожих позицій.', descEN: 'The unit successfully completed aerial reconnaissance and strike missions against enemy positions.' },
  { id: 2, date: '2024-03-10', titleUA: 'Нове обладнання для підрозділу', titleEN: 'New equipment for the unit', image: bgRed, descUA: 'Завдяки благодійному фонду підрозділ отримав нові безпілотні системи.', descEN: 'Thanks to the charity fund, the unit received new unmanned systems.' },
  { id: 3, date: '2024-03-05', titleUA: 'Тренування нових операторів', titleEN: 'Training new operators', image: newsSting, descUA: 'Завершено чергову програму підготовки операторів БПЛА.', descEN: 'Another UAV operator training program has been completed.' },
];

export default function News() {
  const { lang } = useLanguage();
  const bgY = useParallaxY(1000, '6%');

  return (
    <div className="min-h-screen bg-background relative">
      <motion.div
        aria-hidden
        className="fixed inset-0 z-0 will-change-transform"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: '115%',
          backgroundPosition: 'center',
          y: bgY,
          top: '-20%',
          height: '140%',
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
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <section className="pt-32 pb-16">
          <div className="container">
            <motion.h1
              className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-12"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            >
              {lang === 'ua' ? 'Новини' : 'News'}
            </motion.h1>

            <div className="space-y-8">
              {newsItems.map((n, i) => (
                <motion.article
                  key={n.id}
                  className="bg-card border border-border rounded overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                >
                  <div className="h-48 md:h-auto">
                    <img src={n.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="md:col-span-2 p-6 flex flex-col justify-center">
                    <h2 className="font-heading text-xl font-bold text-foreground mt-2 mb-3">
                      {lang === 'ua' ? 'Підрозділ працює — новини незабаром' : 'The unit is at work — news coming soon'}
                    </h2>
                    <p className="text-muted-foreground">{lang === 'ua' ? n.descUA : n.descEN}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
