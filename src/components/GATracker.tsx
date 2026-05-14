import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageview } from '@/lib/gtag';

export default function GATracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    pageview(pathname, document.title);
  }, [pathname]);

  return null;
}
