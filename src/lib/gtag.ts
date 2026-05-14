export const GA_ID = 'G-46MBTDR75Z';

type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'update';
type GtagFunction = (
  command: GtagCommand,
  action: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFunction;
  }
}

/* Page view — called on every route change */
export function pageview(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: title || document.title,
    send_to: GA_ID,
  });
}

/* Generic event helper */
export function event(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    send_to: GA_ID,
    ...params,
  });
}

/* Predefined CTA events */
export const trackCTA = (label: string, location?: string) =>
  event('cta_click', { cta_label: label, cta_location: location || 'unknown' });

export const trackSocial = (platform: string) =>
  event('social_click', { platform });

export const trackFormSubmit = (formName: string) =>
  event('form_submit', { form_name: formName });
