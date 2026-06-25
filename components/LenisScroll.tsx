'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface LenisScrollProps {
  children: ReactNode;
}

export function LenisScroll({ children }: LenisScrollProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    } catch (error) {
      console.error('[v0] Lenis initialization error:', error);
    }
  }, [isReady]);

  return <>{children}</>;
}
