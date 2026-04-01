import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const blogPosts = [
  { id: 1, date: '2024-03-12', titleUA: 'Як FPV-дрони змінюють тактику сучасного бою', titleEN: 'How FPV drones change modern combat tactics', tagUA: 'Технології', tagEN: 'Technology' },
  { id: 2, date: '2024-03-08', titleUA: 'Історія нашого оператора: від IT до поля бою', titleEN: 'Our operator\'s story: from IT to the battlefield', tagUA: 'Історії', tagEN: 'Stories' },
  { id: 3, date: '2024-03-01', titleUA: 'Аналітика: ефективність БПЛА на різних ділянках фронту', titleEN: 'Analytics: UAV effectiveness across different front sectors', tagUA: 'Аналітика', tagEN: 'Analytics' },
];

export default function Blog() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-16">
        <div className="container">
          <motion.h1
            className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-12"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          >
            {lang === 'ua' ? 'Блог' : 'Blog'}
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                className="bg-card border border-border rounded p-6 group cursor-pointer hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <span className="inline-block font-heading text-xs tracking-widest text-primary border border-primary/30 px-2 py-1 rounded mb-4">
                  {lang === 'ua' ? post.tagUA : post.tagEN}
                </span>
                <time className="block text-xs text-muted-foreground font-heading tracking-wider mb-2">{post.date}</time>
                <h2 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {lang === 'ua' ? post.titleUA : post.titleEN}
                </h2>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
