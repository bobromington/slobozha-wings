import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApplicationForm from '@/components/ApplicationForm';
import { Button } from '@/components/ui/button';

const vacancyDataUA = [
  { category: 'Оператори БПЛА', positions: ['Оператор FPV-дрона', 'Оператор розвідувального БПЛА', 'Оператор бомбардувального БПЛА'] },
  { category: 'Технічні спеціалісти', positions: ['Технік з обслуговування БПЛА', 'Інженер-конструктор', 'Фахівець з ремонту'] },
  { category: 'Аналітики', positions: ['Аналітик розвідданих', 'Спеціаліст з обробки даних'] },
  { category: 'IT-спеціалісти', positions: ['Розробник ПЗ для БПЛА', 'Системний адміністратор'] },
  { category: 'Забезпечення', positions: ['Логіст', 'Фахівець із забезпечення'] },
];

const vacancyDataEN = [
  { category: 'UAV Operators', positions: ['FPV Drone Operator', 'Reconnaissance UAV Operator', 'Bomber UAV Operator'] },
  { category: 'Technical Specialists', positions: ['UAV Maintenance Technician', 'Design Engineer', 'Repair Specialist'] },
  { category: 'Analysts', positions: ['Intelligence Analyst', 'Data Processing Specialist'] },
  { category: 'IT Specialists', positions: ['UAV Software Developer', 'System Administrator'] },
  { category: 'Logistics', positions: ['Logistics Specialist', 'Supply Specialist'] },
];

export default function Vacancies() {
  const { lang } = useLanguage();
  const tr = t(lang);
  const data = lang === 'ua' ? vacancyDataUA : vacancyDataEN;

  return (
    <div className="min-h-screen relative">
      {/* Fixed video background */}
      <video
        autoPlay muted loop playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/video/vacancies-bg.mov"
      />
      <div className="fixed inset-0 z-0 bg-black/70" />

      <div className="relative z-10">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-10">
          <div className="container">
            <motion.p
              className="font-heading text-sm tracking-[0.3em] text-primary mb-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            >
              {lang === 'ua' ? 'ПРИЄДНУЙСЯ ДО НАС' : 'JOIN US'}
            </motion.p>
            <motion.h1
              className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            >
              {tr.vacancies.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button variant="hero" size="lg" asChild>
                <a href="#application-form">
                  {lang === 'ua' ? 'Заповнити анкету' : 'Fill out application'}
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Vacancies list */}
        <section className="py-10 md:py-16">
          <div className="container space-y-6">
            {data.map((cat, ci) => (
              <motion.div
                key={ci}
                className="bg-card/70 backdrop-blur-md border border-border/50 rounded p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: ci * 0.1 }}
              >
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-5 uppercase tracking-wider">
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.positions.map((pos, pi) => (
                    <div key={pi} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0">
                      <span className="text-foreground text-lg">{pos}</span>
                      <Button variant="outline" size="sm">
                        {lang === 'ua' ? 'Детальніше' : 'Details'}
                      </Button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Application form */}
        <section id="application-form" className="py-16 md:py-24 scroll-mt-24">
          <div className="container max-w-3xl">
            <ApplicationForm />
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
