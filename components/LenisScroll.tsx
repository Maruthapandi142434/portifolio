'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
        syncTouch: true,
        touchMultiplier: 2,
      });

      // Synchronize Lenis scroll with GSAP ScrollTrigger updates
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP's ticker to drive Lenis RAF
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    } catch (error) {
      console.error('[v0] Lenis initialization error:', error);
    }
  }, [isReady]);

  return <>{children}</>;
}
