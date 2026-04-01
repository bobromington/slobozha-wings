import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import logo from '@/assets/logo.png';
import bgFire from '@/assets/bg-fire.png';
import bgRed from '@/assets/bg-red.png';
import bgWhite from '@/assets/bg-white.png';
import bgWhite1 from '@/assets/bg-white1.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0, 0, 0.2, 1] as const },
  }),
};

const newsData = [
  {
    id: 1,
    date: '2024-03-15',
    titleUA: 'Успішна операція на східному напрямку',
    titleEN: 'Successful operation on the eastern front',
    image: bgFire,
  },
  {
    id: 2,
    date: '2024-03-10',
    titleUA: 'Нове обладнання для підрозділу',
    titleEN: 'New equipment for the unit',
    image: bgRed,
  },
  {
    id: 3,
    date: '2024-03-05',
    titleUA: 'Тренування нових операторів БПЛА',
    titleEN: 'Training new UAV operators',
    image: bgWhite1,
  },
];

export default function Index() {
  const { lang } = useLanguage();
  const tr = t(lang);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/video/hero-bg.mov"
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
        
        <div className="relative z-10 text-center px-4">
          <motion.img
            src={logo}
            alt="Слобода"
            className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.p
            className="font-heading text-sm md:text-base tracking-[0.3em] text-primary mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {tr.hero.subtitle}
          </motion.p>
          <motion.h1
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {tr.hero.title}
          </motion.h1>
          <motion.p
            className="font-heading text-xs md:text-sm tracking-[0.4em] text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {tr.hero.brigade}
          </motion.p>
          <motion.p
            className="text-base md:text-lg text-foreground/80 max-w-xl mx-auto mb-10 font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {tr.hero.description}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <Link to="/vacancies">
              <Button variant="hero" size="xl">{tr.hero.joinBtn}</Button>
            </Link>
            <Link to="/fund">
              <Button variant="heroOutline" size="xl">{tr.hero.supportBtn}</Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0}
          >
            <p className="font-heading text-sm tracking-[0.3em] text-primary mb-3">{tr.about.subtitle}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">{tr.about.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">{tr.about.description}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {tr.about.facts.map((fact, i) => (
              <motion.div
                key={i}
                className="text-center p-6 bg-card border border-border rounded"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary mb-2">{fact.number}</div>
                <div className="text-sm text-muted-foreground">{fact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Directions — full-width */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img src={bgWhite} alt="БПЛА" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <motion.div
            className="mr-auto w-full md:w-1/2 p-8 md:p-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8 uppercase">
              {lang === 'ua' ? 'Основні напрямки' : 'Key Directions'}
            </h2>
            <ul className="space-y-5">
              {tr.about.directions.map((dir, i) => (
                <li key={i} className="flex items-center gap-4 text-foreground/90 text-lg">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0" />
                  {dir}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Recruiting Section */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img src={bgFire} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <motion.div
            className="mr-auto w-full md:w-1/2 p-8 md:p-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            <p className="font-heading text-sm tracking-[0.3em] text-primary mb-3">{tr.recruit.subtitle}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">{tr.recruit.title}</h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">{tr.recruit.description}</p>
            <Link to="/vacancies">
              <Button variant="hero" size="lg">{tr.recruit.btn}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img src={bgRed} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <motion.div
            className="mr-auto w-full md:w-1/2 p-8 md:p-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            <p className="font-heading text-sm tracking-[0.3em] text-primary mb-3">{tr.support.subtitle}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">{tr.support.title}</h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">{tr.support.description}</p>
            <Link to="/fund">
              <Button variant="hero" size="lg">{tr.support.btn}</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          >
            <p className="font-heading text-sm tracking-[0.3em] text-primary mb-3">{tr.news.subtitle}</p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{tr.news.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.map((news, i) => (
              <motion.article
                key={news.id}
                className="bg-card border border-border rounded overflow-hidden group cursor-pointer"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={news.image}
                    alt={lang === 'ua' ? news.titleUA : news.titleEN}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <time className="text-xs text-muted-foreground font-heading tracking-wider">{news.date}</time>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {lang === 'ua' ? news.titleUA : news.titleEN}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
