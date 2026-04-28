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
      >
        <source src="/video/about-bg.mp4" type="video/mp4" />
      </video>
      

      <div className="relative z-10">
        <Header />

        {/* Hero */}
        <section className="relative pt-32 pb-10">
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

        {/* History & Mission */}
        <section className="py-10 md:py-16">
          <div className="container max-w-6xl space-y-8 md:space-y-10">
            {/* History — dark plate */}
            <motion.div
              className="relative bg-background/85 backdrop-blur-md border border-border text-foreground rounded-lg p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 flex md:flex-col items-center md:items-start gap-6">
                  <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-foreground overflow-hidden shadow-lg shrink-0 ring-2 ring-primary/40">
                    <img src={logo} alt="Слобода" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-heading text-xs tracking-[0.3em] text-primary mb-2">01</p>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase leading-tight">
                      {lang === 'ua' ? 'Історія створення' : 'History'}
                    </h2>
                  </div>
                </div>
                <div className="md:col-span-8 md:border-l md:border-border md:pl-10">
                  <p className="leading-relaxed text-lg text-foreground/90">
                    {lang === 'ua'
                      ? 'Загін прикриття повітряного простору «Слобода» був створений як відповідь на потребу в сучасних технологічних рішеннях на полі бою. Підрозділ увійшов до складу 11 Бригади Національної гвардії України та швидко став одним з найефективніших підрозділів.'
                      : 'Airspace Cover Detachment "Sloboda" was created in response to the need for modern technological solutions on the battlefield. The unit joined the 11th Brigade of the National Guard of Ukraine and quickly became one of the most effective units.'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission — dark featured statement */}
            <motion.div
              className="relative bg-background/85 backdrop-blur-md border border-border text-foreground rounded-lg p-10 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
              <p className="font-heading text-xs tracking-[0.3em] text-primary mb-3">02</p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-6">
                {lang === 'ua' ? 'Місія' : 'Mission'}
              </h2>
              <p className="leading-relaxed text-xl md:text-2xl font-light max-w-4xl text-foreground/90">
                {lang === 'ua'
                  ? 'Забезпечення технологічної переваги на полі бою шляхом ефективного використання безпілотних авіаційних систем для розвідки, ураження та захисту.'
                  : 'Ensuring technological superiority on the battlefield through effective use of unmanned aerial systems for reconnaissance, strike operations, and defense.'}
              </p>
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
