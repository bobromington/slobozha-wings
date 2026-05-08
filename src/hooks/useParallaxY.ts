import { useEffect, useRef, useState } from 'react';
import {
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';

/**
 * Detect a "low-end" device to reduce parallax update frequency.
 * Uses navigator.hardwareConcurrency, deviceMemory and a coarse-pointer hint.
 */
function detectLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const coarse =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches;
  return cores <= 4 || memory <= 4 || coarse;
}

/**
 * Vertical parallax offset that respects `prefers-reduced-motion`.
 *
 * - Uses framer-motion's `useScroll` (already rAF-driven) on capable devices.
 * - On low-end devices, samples scroll position via a single rAF loop and
 *   throttles updates to ~30fps to cut layout/paint cost.
 * - Returns a static '0%' when the user requested reduced motion.
 */
export function useParallaxY(
  distance: number = 1500,
  offset: string = '8%'
): MotionValue<string> | string {
  const prefersReducedMotion = useReducedMotion();
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    setIsLowEnd(detectLowEndDevice());
  }, []);

  // High-end path: framer-motion's optimized scroll tracking.
  const { scrollY } = useScroll();
  const smoothY = useTransform(scrollY, [0, distance], ['0%', offset]);

  // Low-end path: manual rAF loop, throttled to ~30fps.
  const throttledY = useMotionValue('0%');
  const rafRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    if (!isLowEnd || prefersReducedMotion) return;

    const FRAME_MS = 1000 / 30; // ~30fps

    const tick = (now: number) => {
      const scroll = window.scrollY;
      if (scroll !== lastScrollRef.current && now - lastUpdateRef.current >= FRAME_MS) {
        lastScrollRef.current = scroll;
        lastUpdateRef.current = now;
        const ratio = Math.max(0, Math.min(1, scroll / distance));
        // Parse numeric portion of offset (e.g. '-8%' -> -8).
        const numeric = parseFloat(offset);
        const unit = offset.replace(/[-0-9.]/g, '') || '%';
        throttledY.set(`${(numeric * ratio).toFixed(2)}${unit}`);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isLowEnd, prefersReducedMotion, distance, offset, throttledY]);

  if (prefersReducedMotion) return '0%';
  return isLowEnd ? throttledY : smoothY;
}
