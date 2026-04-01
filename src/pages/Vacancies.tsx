import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import bgWhite1 from '@/assets/bg-white1.png';

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
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          <img src={bgWhite1} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="container relative z-10">
          <motion.h1
            className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          >
            {tr.vacancies.title}
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container space-y-8">
          {data.map((cat, ci) => (
            <motion.div
              key={ci}
              className="bg-card border border-border rounded p-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: ci * 0.1 }}
            >
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">{cat.category}</h2>
              <div className="space-y-3">
                {cat.positions.map((pos, pi) => (
                  <div key={pi} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                    <span className="text-foreground">{pos}</span>
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
      <Footer />
    </div>
  );
}
