import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import logo from '@/assets/logo.png';
import samosudov from '@/assets/samosudov.png';

export default function About() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen relative">
      {/* Fixed video background */}
      <video
        autoPlay muted loop playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/video/about-bg.mov"
      />
      <div className="fixed inset-0 z-0 bg-black/70" />

      <div className="relative z-10">
        <Header />

        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-end pt-32 pb-16">
          <div className="container">
            <motion.p
              className="font-heading text-sm tracking-[0.3em] text-primary mb-3"
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

        {/* Mission & Principles */}
        <section className="py-16 md:py-24">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-card/70 backdrop-blur-md border border-border/50 rounded p-8"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <img src={logo} alt="Слобода" className="w-32 h-32 mb-6" />
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4 uppercase">
                {lang === 'ua' ? 'Історія створення' : 'History'}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {lang === 'ua'
                  ? 'Загін прикриття повітряного простору «Слобода» був створений як відповідь на потребу в сучасних технологічних рішеннях на полі бою. Підрозділ увійшов до складу 11 Бригади Національної гвардії України та швидко став одним з найефективніших підрозділів.'
                  : 'Airspace Cover Detachment "Sloboda" was created in response to the need for modern technological solutions on the battlefield. The unit joined the 11th Brigade of the National Guard of Ukraine and quickly became one of the most effective units.'}
              </p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4 uppercase">
                {lang === 'ua' ? 'Місія' : 'Mission'}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {lang === 'ua'
                  ? 'Забезпечення технологічної переваги на полі бою шляхом ефективного використання безпілотних авіаційних систем для розвідки, ураження та захисту.'
                  : 'Ensuring technological superiority on the battlefield through effective use of unmanned aerial systems for reconnaissance, strike operations, and defense.'}
              </p>
            </motion.div>

            <motion.div
              className="bg-card/70 backdrop-blur-md border border-border/50 rounded p-8"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6 uppercase">
                {lang === 'ua' ? 'Принципи роботи' : 'Operating Principles'}
              </h2>
              <ul className="space-y-4 text-muted-foreground text-lg">
                {(lang === 'ua'
                  ? ['Технологічна перевага', 'Точність та ефективність', 'Постійний розвиток', 'Командна робота', 'Захист життів']
                  : ['Technological superiority', 'Precision & efficiency', 'Continuous development', 'Teamwork', 'Protecting lives']
                ).map((p, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Commander Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <img
                  src={samosudov}
                  alt="Тимур Самосудов"
                  className="w-full max-w-md mx-auto rounded"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {lang === 'ua' ? 'Тимур Самосудов' : 'Tymur Samosudov'}
                </h2>
                <p className="text-primary font-heading text-sm tracking-widest uppercase mb-6">
                  {lang === 'ua' ? 'Командир підрозділу' : 'Unit Commander'}
                </p>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {lang === 'ua'
                      ? 'Тимур Самосудов — командир загону прикриття повітряного простору спеціального призначення Національної гвардії України.'
                      : 'Tymur Samosudov is the commander of the special-purpose airspace cover detachment of the National Guard of Ukraine.'}
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
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
