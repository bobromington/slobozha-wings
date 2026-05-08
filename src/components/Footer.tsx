import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import logo from '@/assets/logo.png';
import slobodaSamosud from '@/assets/sloboda-samosud-hor.png';

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/sloboda_unit/', icon: 'IG' },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61560196424655', icon: 'FB' },
  { name: 'YouTube', url: 'https://www.youtube.com/@SLOBODA_UNIT', icon: 'YT' },
  { name: 'X', url: 'https://x.com/SlobodaUnit', icon: 'X' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@slobodaunit', icon: 'TT' },
];

export default function Footer() {
  const { lang } = useLanguage();
  const tr = t(lang);

  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 lg:[grid-template-columns:1.5fr_1fr_1fr_1fr] items-start">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Слобода" className="h-12 w-auto" />
              <img src={slobodaSamosud} alt="СЛОБОДА Samosud Team" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === 'ua' ? (
                <>Загін прикриття повітряного простору.<br /><a href="https://11brigade.com.ua/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-bright transition-colors">11 Бригада НГУ.</a></>
              ) : (
                <>Airspace Cover Detachment.<br /><a href="https://11brigade.com.ua/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-bright transition-colors">11th Brigade NGU.</a></>
              )}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-widest text-foreground mb-4">{tr.footer.links}</h4>
            <div className="flex flex-col gap-2">
              <Link to="/vacancies" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tr.nav.vacancies}</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tr.nav.about}</Link>
              <Link to="/fund" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tr.nav.fund}</Link>
              <Link to="/news" className="text-sm text-muted-foreground hover:text-primary transition-colors">{tr.nav.news}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-widest text-foreground mb-4">{tr.footer.contacts}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>slobodangu@gmail.com</span>
              
              <span>{lang === 'ua' ? 'м. Одеса' : 'Odesa'}</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-widest text-foreground mb-4">{tr.footer.social}</h4>
            <div className="grid grid-cols-3 gap-2 w-fit -translate-x-[2px]">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-border rounded text-xs font-heading text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
