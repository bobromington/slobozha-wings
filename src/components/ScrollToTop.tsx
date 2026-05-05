import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_DURATION = 600; // ms

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const smoothScrollToTop = (duration: number) => {
  const start = window.scrollY;
  if (start === 0) return;
  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - easeInOutCubic(progress)));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    smoothScrollToTop(SCROLL_DURATION);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
