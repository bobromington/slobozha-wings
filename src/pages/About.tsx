import { motion } from 'framer-motion';
import { useParallaxY } from '@/hooks/useParallaxY';
import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import logo from '@/assets/logo.png';
import samosudov from '@/assets/samosudov-cropped.png';
import { useSiteContent, toParagraphs } from '@/lib/content';

export default function About() {
  const { lang } = useLanguage();
  const about = useSiteContent('about');
  const cmd = useSiteContent('commander');
  const paragraphs = toParagraphs(lang === 'ua' ? about.historyUA : about.historyEN);
  const bio = toParagraphs(lang === 'ua' ? cmd.bioUA : cmd.bioEN);
  const bgY = useParallaxY(1500, '-8%');

  return (
    <div className="min-h-screen relative">
      <Seo
        title="Про нас — Батальйон Слобода"
        description="Історія, структура та командир Загону прикриття повітряного простору «Слобода» 11 Бригади Національної гвардії України."
        path="/about"
      />
      {/* Fixed video background with parallax */}
      <motion.video
        autoPlay muted loop playsInline
        preload="auto"
        poster="/video/about-bg-poster.webp"
        className="fixed inset-0 w-full h-[140%] object-cover z-0 will-change-transform scale-110"
        style={{ y: bgY, top: '-20%' }}
      >
        <source src="/video/about-bg.webm" type="video/webm" />
        <source src="/video/about-bg.mp4" type="video/mp4" />
      </motion.video>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-10">
          <div className="container max-w-6xl">
            <motion.p
              className="font-heading text-sm tracking-[0.3em] text-primary-bright mb-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            >
              {lang === 'ua' ? 'НАША ІСТОРІЯ' : 'OUR STORY'}
            </motion.p>
            <motion.h1
              className="font-heading text-5xl md:text-7xl font-bold text-foreground"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            >
              {lang === 'ua' ? 'Про загін' : 'About the Detachment'}
            </motion.h1>
          </div>
        </section>

        {/* Content plates */}
        <section className="py-10 md:py-16">
          <div className="container max-w-6xl space-y-8 md:space-y-10">

            {/* History — moved to top */}
            <motion.div
              className="relative bg-background/85 backdrop-blur-md border border-border text-foreground rounded-lg p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-foreground overflow-hidden shadow-lg shrink-0 ring-2 ring-primary/40">
                  <img src={logo} alt="Слобода" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase leading-tight">
                    {lang === 'ua' ? 'Історія створення' : 'History'}
                  </h2>
                </div>
              </div>
              <div className="md:border-l md:border-border md:pl-10 space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* Commander */}
            <motion.div
              id="commander"
              className="relative bg-background/85 backdrop-blur-md border border-border text-foreground rounded-lg p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden scroll-mt-24"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
                <div className="md:order-1 order-2">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2 uppercase">
                    {lang === 'ua' ? cmd.nameUA : cmd.nameEN}
                  </h2>
                  <p className="text-primary font-heading text-sm tracking-widest uppercase mb-6">
                    {lang === 'ua' ? cmd.roleUA : cmd.roleEN}
                  </p>
                  <div className="space-y-4 text-foreground/90 leading-relaxed">
                    {bio.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
                <div className="md:order-2 order-1">
                  <img
                    src={samosudov}
                    alt="Тимур Самосудов"
                    className="w-full max-w-md mx-auto rounded"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
