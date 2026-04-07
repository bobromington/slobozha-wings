import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { t } from '@/lib/i18n';
import logo from '@/assets/logo.png';
import slobodaWide from '@/assets/sloboda-wide.png';
import samosudTeam from '@/assets/samosud-team-header.png';

export default function Header() {
  const { lang, setLang } = useLanguage();
  const tr = t(lang);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: tr.nav.home },
    { to: '/vacancies', label: tr.nav.vacancies },
    { to: '/about', label: tr.nav.about },
    { to: '/fund', label: tr.nav.fund },
    { to: '/news', label: tr.nav.news },
    { to: '/blog', label: tr.nav.blog },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Слобода" className="h-10 md:h-14 w-auto" />
          <div className="flex flex-col gap-1">
            <img src={slobodaWide} alt="СЛОБОДА" className="block shrink-0 h-7 md:h-8 w-auto" />
            <img src={samosudTeam} alt="Samosud Team" className="block shrink-0 w-24 md:w-28 h-auto" />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-heading text-sm tracking-widest uppercase transition-colors hover:text-primary ${
                location.pathname === l.to ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
            className="font-heading text-sm tracking-widest border border-border px-3 py-1.5 rounded hover:border-primary hover:text-primary transition-colors text-foreground"
          >
            {lang === 'ua' ? 'EN' : 'UA'}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-foreground"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 font-heading text-sm tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
