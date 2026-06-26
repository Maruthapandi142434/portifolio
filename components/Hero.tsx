'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: any;

    // Small delay to ensure standard React mounting is finished before setting up GSAP
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add({
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)"
        }, (context) => {
          const { isMobile } = context.conditions as any;
          const shiftX = isMobile ? window.innerWidth * 0.4 : 180;
          const shiftY = isMobile ? 30 : 50;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: '+=100%', // pinned scroll duration
              invalidateOnRefresh: true,
            },
          });

          // Name moves left-to-right
          tl.to('.hero-title-1', {
            x: shiftX,
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut',
          }, 0);

          // Subtitle/Role moves right-to-left
          tl.to('.hero-title-2', {
            x: -shiftX,
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut',
          }, 0);

          // Full Stack Developer moves left-to-right
          tl.to('.hero-title-3', {
            x: shiftX,
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut',
          }, 0);

          // Details section fades and slides down
          tl.to('.hero-details', {
            y: shiftY,
            opacity: 0,
            duration: 1.2,
            ease: 'power1.inOut',
          }, 0);

          // Profile card straightens from a 3D tilted state, lifts slightly, and fades out
          tl.fromTo('.hero-image-wrapper', 
            {
              transform: isMobile 
                ? 'perspective(1000px) rotateX(10deg) rotateY(-10deg) scale(0.95) translateZ(-30px)' 
                : 'perspective(1200px) rotateX(15deg) rotateY(-15deg) scale(0.9) translateZ(-60px)',
              opacity: 1,
            },
            {
              transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1.1) translateZ(0px)',
              y: -30,
              opacity: 0,
              duration: 1.5,
              ease: 'power2.out',
            },
            0
          );

          // Parallax shift on the image inside the card
          tl.to('.hero-parallax-img', {
            y: '5%',
            ease: 'none',
            duration: 1.5,
          }, 0);
        });
      }, sectionRef);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-[100dvh] flex flex-col items-start justify-start md:justify-center overflow-hidden bg-black px-4 md:px-8 lg:px-16 pt-16 md:pt-0"
    >
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute top-8 right-8 flex flex-col items-center gap-2 z-20 hidden md:flex"
      >
        <span className="text-xs tracking-widest text-white/50 font-mono">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-base"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Foreground Content with integrated image for mobile flow */}
      <div className="w-full select-none relative z-20 flex flex-col justify-start md:justify-center items-start pl-2 sm:pl-6 md:pl-16 xl:pl-24 pr-4 md:min-h-screen mt-4 md:mt-0">
        <div className="relative flex flex-col items-start justify-start md:justify-center text-left w-full max-w-none">
          
          {/* Top border line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0, duration: 0.8 }}
            className="h-px bg-white/20 mb-8 origin-left w-32 md:w-48"
          />

          {/* Name and Subtitle headings */}
          <div className="space-y-2 md:space-y-4 w-full">
            <div className="hero-title-1 w-full flex justify-start overflow-visible">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="font-extrabold text-[3.5rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] tracking-tighter text-white uppercase whitespace-nowrap"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                MARUTHA
              </motion.h1>
            </div>
            <div className="hero-title-2 w-full flex justify-start overflow-visible">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="font-extrabold text-[3.5rem] leading-[0.9] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] tracking-tighter text-transparent uppercase whitespace-nowrap"
                style={{ 
                  fontFamily: 'var(--font-syne)',
                  WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.35)'
                }}
              >
                PANDI
              </motion.h1>
            </div>
            <div className="hero-title-3 w-full flex justify-start overflow-visible">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-extrabold text-lg sm:text-2xl md:text-3xl lg:text-[2.5rem] xl:text-[3rem] mt-2 md:mt-0 leading-none tracking-tighter text-white/70 uppercase whitespace-nowrap"
                style={{ 
                  fontFamily: 'var(--font-syne)'
                }}
              >
                FULL STACK DEVELOPER
              </motion.h1>
            </div>
          </div>

          {/* Profile Image centerpiece (Flows inline on mobile, absolutely positioned on desktop) */}
          <div className="relative md:absolute md:left-auto md:-right-8 lg:right-0 md:top-1/2 md:-translate-y-[45%] w-[110%] -ml-[5%] md:ml-0 md:w-[55%] h-[45vh] md:h-[80vh] max-w-[600px] max-h-[600px] z-10 pointer-events-none flex items-center justify-center my-2 md:my-0 self-center">
            <div className="hero-image-wrapper relative w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/dev-bg.png"
                  alt="Marutha Pandi M"
                  fill
                  priority
                  className="hero-parallax-img w-full h-full object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Sub-info block and CTA button */}
          <div className="hero-details flex flex-col md:flex-row items-start md:items-center gap-6 mt-4 md:mt-12 w-full justify-start relative z-30">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-6 py-3 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-mono tracking-widest text-white/70 uppercase">
                Chennai, Tamil Nadu • Available for projects
              </span>
            </div>

            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-3.5 border border-white/20 text-white bg-white/[0.03] hover:bg-white hover:text-black hover:border-white transition-all duration-500 font-semibold text-xs tracking-widest uppercase rounded-full cursor-pointer overflow-hidden backdrop-blur-md shadow-lg"
            >
              <span className="relative z-10">VIEW PROJECTS ↓</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
