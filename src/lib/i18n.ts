export type Lang = 'ua' | 'en';

export const translations = {
  ua: {
    nav: {
      home: 'Головна',
      vacancies: 'Вакансії',
      about: 'Про батальйон',
      fund: 'Благодійний фонд',
      news: 'Новини',
      blog: 'Блог',
    },
    hero: {
      subtitle: 'БАТАЛЬЙОН БЕЗПІЛОТНИХ СИСТЕМ',
      title: 'СЛОБОДА',
      brigade: '11 БРИГАДА НГУ',
      description: 'Ми формуємо майбутнє поля бою. Технології, точність, перемога.',
      joinBtn: 'Стати частиною батальйону',
      supportBtn: 'Підтримати',
    },
    about: {
      title: 'Про батальйон',
      subtitle: 'СИЛА В ТЕХНОЛОГІЯХ',
      description: 'Батальйон безпілотних систем «Слобода» — це високотехнологічний підрозділ, що спеціалізується на розвідці, ураженні та аналітиці за допомогою БПЛА.',
      facts: [
        { number: '500+', label: 'Операторів БПЛА' },
        { number: '1000+', label: 'Успішних місій' },
        { number: '24/7', label: 'Бойове чергування' },
        { number: '10+', label: 'Типів БПЛА' },
      ],
      directions: [
        'Повітряна розвідка',
        'Ударні операції',
        'Технічне обслуговування',
        'Аналітика та обробка даних',
      ],
    },
    recruit: {
      title: 'Приєднуйся до команди',
      subtitle: 'СТАНЬ ЧАСТИНОЮ ТЕХНОЛОГІЧНОЇ ЕЛІТИ',
      description: 'Ми шукаємо мотивованих фахівців, які готові захищати Україну за допомогою сучасних технологій. Операторів БПЛА, IT-спеціалістів, аналітиків та техніків.',
      btn: 'Переглянути вакансії',
    },
    support: {
      title: 'Підтримка',
      subtitle: 'БЛАГОДІЙНИЙ ФОНД',
      description: 'Ваша підтримка — це дрони в небі, які захищають життя наших воїнів. Кожна гривня наближає перемогу.',
      btn: 'Підтримати фонд',
    },
    news: {
      title: 'Останні новини',
      subtitle: 'БОЙОВИЙ ЖУРНАЛ',
    },
    footer: {
      contacts: 'Контакти',
      links: 'Посилання',
      social: 'Соціальні мережі',
      rights: '© 2024 Батальйон «Слобода». Всі права захищені.',
    },
    vacancies: {
      title: 'Вакансії',
      categories: {
        operators: 'Оператори БПЛА',
        tech: 'Технічні спеціалісти',
        analysts: 'Аналітики',
        it: 'IT-спеціалісти',
        supply: 'Забезпечення',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      vacancies: 'Vacancies',
      about: 'About',
      fund: 'Charity Fund',
      news: 'News',
      blog: 'Blog',
    },
    hero: {
      subtitle: 'UNMANNED SYSTEMS BATTALION',
      title: 'SLOBODA',
      brigade: '11TH BRIGADE NGU',
      description: 'We shape the future of the battlefield. Technology, precision, victory.',
      joinBtn: 'Join the Battalion',
      supportBtn: 'Support Us',
    },
    about: {
      title: 'About the Battalion',
      subtitle: 'STRENGTH IN TECHNOLOGY',
      description: 'Unmanned Systems Battalion "Sloboda" is a high-tech unit specializing in reconnaissance, strike operations, and analytics using UAVs.',
      facts: [
        { number: '500+', label: 'UAV Operators' },
        { number: '1000+', label: 'Successful Missions' },
        { number: '24/7', label: 'Combat Readiness' },
        { number: '10+', label: 'UAV Types' },
      ],
      directions: [
        'Aerial Reconnaissance',
        'Strike Operations',
        'Technical Maintenance',
        'Analytics & Data Processing',
      ],
    },
    recruit: {
      title: 'Join the Team',
      subtitle: 'BECOME PART OF THE TECH ELITE',
      description: 'We are looking for motivated professionals ready to defend Ukraine with modern technology. UAV operators, IT specialists, analysts, and technicians.',
      btn: 'View Vacancies',
    },
    support: {
      title: 'Support',
      subtitle: 'CHARITY FUND',
      description: 'Your support means drones in the sky protecting the lives of our warriors. Every hryvnia brings victory closer.',
      btn: 'Support the Fund',
    },
    news: {
      title: 'Latest News',
      subtitle: 'COMBAT JOURNAL',
    },
    footer: {
      contacts: 'Contacts',
      links: 'Links',
      social: 'Social Media',
      rights: '© 2024 Battalion "Sloboda". All rights reserved.',
    },
    vacancies: {
      title: 'Vacancies',
      categories: {
        operators: 'UAV Operators',
        tech: 'Technical Specialists',
        analysts: 'Analysts',
        it: 'IT Specialists',
        supply: 'Logistics',
      },
    },
  },
} as const;

export function t(lang: Lang) {
  return translations[lang];
}
