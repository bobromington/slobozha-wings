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
                ? 'Загін прикриття повітряного простору «Слобода» був створений як відповідь на потребу в сучасних технологічних рішеннях на полі бою. Підрозділ увійшов до складу 11 Бригади Національної гвардії України та швидко став одним з найефективніших підрозділів.'
                : 'Airspace Cover Detachment "Sloboda" was created in response to the need for modern technological solutions on the battlefield. The unit joined the 11th Brigade of the National Guard of Ukraine and quickly became one of the most effective units.'}
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

      {/* Commander Section */}
      <section className="py-16 bg-secondary">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={samosudov}
              alt="Тимур Самосудов"
              className="w-full max-w-md mx-auto rounded"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
              {lang === 'ua' ? 'Тимур Самосудов' : 'Tymur Samosudov'}
            </h2>
            <p className="text-primary font-heading text-sm tracking-widest uppercase mb-6">
              {lang === 'ua'
                ? 'Командир підрозділу'
                : 'Unit Commander'}
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {lang === 'ua'
                  ? 'Тимур Самосудов — командир підрозділу ударних безпілотних систем спеціального призначення Національної гвардії України.'
                  : 'Tymur Samosudov is the commander of the special-purpose strike unmanned systems unit of the National Guard of Ukraine.'}
              </p>
              <p>
                {lang === 'ua'
                  ? 'З початком повномасштабного вторгнення у березні 2022 року він добровільно став до строю. Свій бойовий шлях розпочав із базових завдань — працював водієм, забезпечуючи підрозділ на передовій, і паралельно шукав можливості бути максимально ефективним у бойових умовах.'
                  : 'When the full-scale invasion began in March 2022, he voluntarily enlisted. He started with basic tasks — working as a driver supporting the unit on the front line, while looking for ways to be maximally effective in combat.'}
              </p>
              <p>
                {lang === 'ua'
                  ? 'Згодом перейшов до роботи з безпілотними системами та став одним із тих, хто фактично з нуля формував напрямок ударних дронів. Завдяки практичному досвіду, ініціативі та здатності швидко ухвалювати рішення, Самосудов очолив підрозділ, який сьогодні виконує завдання на найскладніших ділянках фронту.'
                  : 'He later transitioned to working with unmanned systems and became one of those who built the strike drone capability from scratch. Through practical experience, initiative, and quick decision-making, Samosudov took command of a unit that now operates on the most challenging frontline sectors.'}
              </p>
              <p>
                {lang === 'ua'
                  ? 'Під його керівництвом команда спеціалізується на точковому знищенні техніки та живої сили противника. Підрозділ демонструє високу результативність, поєднуючи технологічність, дисципліну та постійну адаптацію до умов сучасної війни.'
                  : 'Under his leadership, the team specializes in precision strikes against enemy equipment and personnel, combining technology, discipline, and constant adaptation to modern warfare.'}
              </p>
              <p>
                {lang === 'ua'
                  ? 'Його підхід — це особиста залученість, відповідальність за результат і робота пліч-о-пліч із бійцями.'
                  : 'His approach is personal involvement, accountability for results, and working shoulder to shoulder with his soldiers.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
