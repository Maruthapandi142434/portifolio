'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Linkedin, Github } from 'lucide-react';

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

        // 3D Scroll Zoom & Parallax only on desktop/tablet screens >= 768px
        mm.add('(min-width: 768px)', () => {
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

          // Massive name rows slide apart and fade out
          tl.to('.hero-title-1', {
            x: -250,
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut',
          }, 0);

          tl.to('.hero-title-2', {
            x: 250,
            opacity: 0,
            duration: 1.5,
            ease: 'power1.inOut',
          }, 0);

          // Details section fades and slides down
          tl.to('.hero-details', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power1.inOut',
          }, 0);

          // Profile card straightens from a 3D tilted state and lifts slightly
          tl.fromTo('.hero-image-wrapper', 
            {
              transform: 'perspective(1200px) rotateX(15deg) rotateY(-15deg) scale(0.9) translateZ(-60px)',
            },
            {
              transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)',
              y: -30,
              duration: 1.5,
              ease: 'power2.out',
            },
            0
          );
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
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

      <div className="max-w-7xl w-full mx-auto px-4 md:px-8 py-20 md:py-0 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center min-h-screen">
          
          {/* Left column - Text content */}
          <div className="lg:col-span-6 z-10">
            {/* Top border line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0, duration: 0.8 }}
              className="h-px bg-white/20 mb-8 origin-left"
            />

            {/* Main name heading */}
            <div className="space-y-1 mb-8 overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="hero-title-1 font-extrabold text-5xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-white uppercase"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                MARUTHA
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ delay: 0.15, duration: 0.8 }}
                className="hero-title-2 font-extrabold text-5xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30 uppercase"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                PANDI M
              </motion.h1>
            </div>

            {/* Group details wrapper for GSAP scroll fades */}
            <div className="hero-details space-y-8">
              
              {/* Professional title with left border */}
              <div className="flex items-start gap-4 pl-4 border-l-2 border-white">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <p className="text-base md:text-lg font-medium text-white tracking-wide">
                    Full Stack Developer
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1.5 tracking-widest font-mono font-semibold">
                    NODE.JS • NEXT.JS • PERN & MERN STACK
                  </p>
                </motion.div>
              </div>

              {/* Contacts & Location Badge Grid */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs md:text-sm font-mono border border-white/10 p-5 bg-white/[0.01]"
              >
                <div className="flex items-center gap-2.5 text-gray-400">
                  <MapPin className="w-4 h-4 text-white shrink-0" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
                <a href="tel:+917604889776" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <span>+91 7604889776</span>
                </a>
                <a href="mailto:maruthapandi1409@gmail.com" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-300">
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <span>maruthapandi1409@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/marutha-pandi-m-47a274343" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-300">
                  <Linkedin className="w-4 h-4 text-white shrink-0" />
                  <span>linkedin.com/in/marutha-pandi-m</span>
                </a>
                <a href="https://github.com/Maruthapandi142434" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-300 sm:col-span-2">
                  <Github className="w-4 h-4 text-white shrink-0" />
                  <span>github.com/Maruthapandi142434</span>
                </a>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-lg"
              >
                <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light font-sans">
                  Performance-oriented Full Stack Engineer with 2+ years of experience building scalable enterprise-grade CRM, ERP, and E-commerce platforms using Next.js, Node.js, and the MERN/PERN stack. Skilled in VPS hosting, Docker deployments, Linux server management, and SEO optimization.
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.35, duration: 0.8 }}
              >
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-6 md:px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-medium text-xs md:text-sm tracking-widest uppercase cursor-pointer"
                >
                  View My Work
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Right column - Profile image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end pt-8 lg:pt-0 z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hero-image-wrapper relative w-full max-w-sm aspect-square"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Main border frame */}
              <div 
                className="relative w-full h-full border-2 border-white bg-black overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                style={{ transform: 'translateZ(20px)' }}
              >
                {/* Inner border accent */}
                <div className="absolute inset-0 border border-gray-800/40 m-1" />
                
                {/* Image container */}
                <div className="relative w-full h-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12e79e0a-3fbe-4ac4-b22e-07ed26137732.png"
                    alt="Marutha Pandi M - Full Stack Developer"
                    fill
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Accent corner lines - top right */}
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-white" />

              {/* Accent corner lines - bottom left */}
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-white" />

              {/* Professional badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                <p className="text-[10px] text-gray-500 tracking-widest font-mono font-medium">
                  AVAILABLE FOR PROJECTS
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
