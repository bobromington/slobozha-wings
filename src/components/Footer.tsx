import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import logo from '@/assets/logo.png';
import slobodaWide from '@/assets/sloboda-wide.png';
import samosudTeam from '@/assets/samosud-team.png';

const socialLinks = [
  { name: 'Instagram', url: '#', icon: 'IG' },
  { name: 'Telegram', url: '#', icon: 'TG' },
  { name: 'Facebook', url: '#', icon: 'FB' },
  { name: 'YouTube', url: '#', icon: 'YT' },
  { name: 'X', url: '#', icon: 'X' },
  { name: 'TikTok', url: '#', icon: 'TT' },
];

export default function Footer() {
  const { lang } = useLanguage();
  const tr = t(lang);

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <img src={logo} alt="Слобода" className="h-12 w-auto" />
              <div className="flex flex-col gap-1">
                <img src={slobodaWide} alt="СЛОБОДА" className="h-5 w-auto" />
                <img src={samosudTeam} alt="Samosud Team" className="h-3 w-auto brightness-[2]" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === 'ua' ? 'Загін прикриття повітряного простору. 11 Бригада НГУ.' : 'Airspace Cover Detachment. 11th Brigade NGU.'}
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
              <span>info@sloboda.army</span>
              <span>+380 XX XXX XX XX</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm tracking-widest text-foreground mb-4">{tr.footer.social}</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border rounded text-xs font-heading text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          {tr.footer.rights}
        </div>
      </div>
    </footer>
  );
}
