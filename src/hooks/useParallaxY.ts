import { useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

/**
 * Vertical parallax offset that respects `prefers-reduced-motion`.
 * Returns a static '0%' when the user requested reduced motion.
 */
export function useParallaxY(
  distance: number = 1500,
  offset: string = '8%'
): MotionValue<string> | string {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, distance], ['0%', offset]);
  return prefersReducedMotion ? '0%' : y;
}
