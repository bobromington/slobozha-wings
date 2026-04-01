import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import bgRed from '@/assets/bg-red.png';

export default function Fund() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          <img src={bgRed} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-background/90" />
        </div>
        <div className="container relative z-10">
          <motion.h1
            className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          >
            {lang === 'ua' ? 'Благодійний фонд' : 'Charity Fund'}
          </motion.h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-3">
                {lang === 'ua' ? 'Напрямки зборів' : 'Fundraising Directions'}
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {(lang === 'ua'
                  ? ['Закупівля БПЛА', 'Запчастини та комплектуючі', 'Засоби РЕБ', 'Тепловізори та оптика', 'Транспорт та логістика']
                  : ['UAV procurement', 'Spare parts & components', 'EW equipment', 'Thermal imagers & optics', 'Transport & logistics']
                ).map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded p-6">
              <h2 className="font-heading text-2xl font-bold text-primary mb-3">
                {lang === 'ua' ? 'Реквізити' : 'Bank Details'}
              </h2>
              <div className="space-y-2 text-muted-foreground text-sm font-mono">
                <p>IBAN: UA00 0000 0000 0000 0000 0000 00000</p>
                <p>{lang === 'ua' ? 'Отримувач' : 'Recipient'}: БФ «Слобода»</p>
                <p>ЄДРПОУ: 00000000</p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button variant="hero" size="xl">
                {lang === 'ua' ? 'Зробити донат' : 'Make a Donation'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
