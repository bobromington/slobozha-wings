import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's automatic scroll restoration on back/forward
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Instant jump to top on every route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
