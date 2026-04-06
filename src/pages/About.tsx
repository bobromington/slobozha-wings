import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import bgWhite from '@/assets/bg-white.png';
import bgFire from '@/assets/bg-fire.png';
import logo from '@/assets/logo.png';
import samosudov from '@/assets/samosudov.png';

export default function About() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          <img src={bgWhite} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="container relative z-10">
          <motion.h1
            className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          >
            {lang === 'ua' ? 'Про батальйон' : 'About the Battalion'}
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={logo} alt="Слобода" className="w-48 h-48 mx-auto md:mx-0 mb-8" />
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              {lang === 'ua' ? 'Історія створення' : 'History'}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {lang === 'ua'
                ? 'Батальйон безпілотних систем «Слобода» був створений як відповідь на потребу в сучасних технологічних рішеннях на полі бою. Підрозділ увійшов до складу 11 Бригади Національної гвардії України та швидко став одним з найефективніших підрозділів БПЛА.'
                : 'The Unmanned Systems Battalion "Sloboda" was created in response to the need for modern technological solutions on the battlefield. The unit joined the 11th Brigade of the National Guard of Ukraine and quickly became one of the most effective UAV units.'}
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              {lang === 'ua' ? 'Місія' : 'Mission'}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {lang === 'ua'
                ? 'Забезпечення технологічної переваги на полі бою шляхом ефективного використання безпілотних авіаційних систем для розвідки, ураження та захисту.'
                : 'Ensuring technological superiority on the battlefield through effective use of unmanned aerial systems for reconnaissance, strike operations, and defense.'}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded overflow-hidden mb-8 h-64">
              <img src={bgFire} alt="" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              {lang === 'ua' ? 'Принципи роботи' : 'Operating Principles'}
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {(lang === 'ua'
                ? ['Технологічна перевага', 'Точність та ефективність', 'Постійний розвиток', 'Командна робота', 'Захист життів']
                : ['Technological superiority', 'Precision & efficiency', 'Continuous development', 'Teamwork', 'Protecting lives']
              ).map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
