'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealOnScroll } from './RevealOnScroll';
import { GraduationCap, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import { SpotlightCard } from './TechExpertise';
import { motion } from 'framer-motion';

const softSkills = [
  { name: 'Analytical Problem Solving', desc: 'Deconstructing complex bugs & algorithms' },
  { name: 'API Architecture Design', desc: 'Clean, decoupled RESTful APIs' },
  { name: 'Team Collaboration', desc: 'Agile standups & thorough code reviews' },
  { name: 'Agile Development', desc: 'Sprints, timeline targets & milestones' },
  { name: 'Technical Documentation', desc: 'API specs, guides & clean code bases' },
  { name: 'Time Management', desc: 'Managing 30+ client sites under SLA' },
];

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numVal = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasPlus = value.includes('+');
  const hasPercent = value.includes('%');

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numVal)) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: numVal,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          const formatted = Number.isInteger(numVal)
            ? Math.floor(obj.val)
            : obj.val.toFixed(1);
          el.innerText = `${formatted}${hasPlus ? '+' : ''}${hasPercent ? '%' : ''}`;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [numVal, hasPlus, hasPercent]);

  return <span ref={ref}>0{hasPlus ? '+' : ''}{hasPercent ? '%' : ''}</span>;
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: isMobile ? '+=100%' : '+=150%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Animate sentences
          const targets = gsap.utils.toArray('.reveal-sentence');
          targets.forEach((target: any, idx) => {
            tl.to(target, {
              opacity: 1,
              duration: 1.5,
              ease: 'power1.out',
            }, idx * (isMobile ? 1.0 : 1.5)); 
          });
        });
      }, containerRef);

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  const sentences = [
    "I am a performance-driven Full Stack Engineer with 2+ years of experience building scalable, enterprise-grade CRM, ERP, and E-commerce platforms.",
    "I specialize in architecting secure backend APIs using the Repository Pattern, configuring robust database schemas with PostgreSQL and MySQL, and setting up containerized workflows with Docker.",
    "My work extends from creating high-converting, SEO-optimized Next.js frontends with 95+ Lighthouse scores to handling continuous deployments on Linux VPS (Hetzner, AWS) utilizing Nginx, PM2, and SSL encryption."
  ];

  return (
    <section className="relative w-full bg-black">
      {/* Scroll track for GSAP sticky pinning */}
      <div ref={containerRef} className="relative w-full">
        {/* Sticky content wrapper */}
        <div className="h-[100dvh] w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-5xl mx-auto overflow-hidden">
          <RevealOnScroll>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 md:mb-12 tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              ABOUT
            </h2>
          </RevealOnScroll>

          <div className="max-w-4xl">
            <p className="text-lg md:text-2xl lg:text-3xl text-white font-light tracking-wide leading-relaxed font-sans flex flex-wrap gap-x-2 gap-y-3">
              {sentences.map((sentence, idx) => (
                <span
                  key={idx}
                  className="reveal-sentence inline transition-colors"
                  style={{ opacity: 0.3 }}
                >
                  {sentence}{' '}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Non-sticky content that scrolls up naturally */}
      <div className="container mx-auto max-w-5xl py-20 md:py-32 px-6 md:px-12 lg:px-24 space-y-16 md:space-y-24 border-t border-white/10 relative z-10 bg-black">
        
        {/* Bento Grid Section */}
        <div className="space-y-10">
          <RevealOnScroll>
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase block">
                Foundation & Core
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                Education & Mindset
              </h3>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* Left: Education Card (col-span-7) */}
            <div className="md:col-span-7">
              <RevealOnScroll delay={0.1}>
                <SpotlightCard className="p-6 sm:p-8 md:p-10 min-h-[380px] h-full flex flex-col justify-between relative overflow-hidden group/edu">
                  {/* Faint ambient glow */}
                  <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full blur-[100px] opacity-10 bg-white pointer-events-none group-hover/edu:opacity-15 transition-opacity duration-500" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">
                          Academic Qualification
                        </span>
                        <h4 className="text-lg md:text-xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
                          Education Details
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-white/5">
                      <h5 className="text-lg font-bold text-white tracking-wide">
                        Bachelor of Engineering (CSE)
                      </h5>
                      <p className="text-sm text-gray-400 font-light leading-relaxed">
                        N.S.N. College of Engineering & Technology, Karur
                      </p>
                      <div className="flex justify-between text-xs text-gray-500 pt-3 border-t border-white/5 mt-4 font-mono">
                        <span>GRADUATED 2024</span>
                        <span>SCORE: 79%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-6">
                    <div className="flex justify-between text-[10px] font-mono text-gray-500">
                      <span>ACADEMIC PERFORMANCE</span>
                      <span>79% (CGPA)</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 0.79 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            </div>

            {/* Right: Mindset Card (col-span-5) */}
            <div className="md:col-span-5">
              <RevealOnScroll delay={0.2}>
                <SpotlightCard className="p-6 sm:p-8 md:p-10 min-h-[380px] h-full flex flex-col justify-between relative overflow-hidden group/mind">
                  <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full blur-[100px] opacity-10 bg-white pointer-events-none group-hover/mind:opacity-15 transition-opacity duration-500" />

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">
                          Execution Philosophy
                        </span>
                        <h4 className="text-lg md:text-xl font-bold text-white uppercase" style={{ fontFamily: 'var(--font-syne)' }}>
                          Mindset Details
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-6 border-t border-white/5 select-none">
                      {softSkills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 group/skill cursor-default"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/40 group-hover/skill:bg-white transition-colors shrink-0 mt-1.5" />
                          <div>
                            <span className="text-xs font-mono text-gray-300 group-hover/skill:text-white transition-colors font-medium">
                              {skill.name}
                            </span>
                            <span className="block text-[10px] text-gray-500 font-light mt-0.5 group-hover/skill:text-gray-400 transition-colors">
                              {skill.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            </div>

          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-10 pt-12 border-t border-white/10">
          <RevealOnScroll>
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-gray-500 uppercase block">
                Metrics & Scale
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                Performance Metrics
              </h3>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 select-none">
            <RevealOnScroll delay={0.05}>
              <SpotlightCard className="p-6 md:p-8 flex flex-col justify-between min-h-[160px] relative overflow-hidden group/stat border border-white/5 md:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-5 bg-cyan-500 pointer-events-none group-hover/stat:opacity-10 transition-opacity duration-500" />
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">
                  EXPERIENCE
                </span>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-6" style={{ fontFamily: 'var(--font-syne)' }}>
                  <AnimatedNumber value="2+" />
                </p>
                <span className="text-xs text-gray-400 font-light mt-2">
                  Years Professional Tenure
                </span>
              </SpotlightCard>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <SpotlightCard className="p-6 md:p-8 flex flex-col justify-between min-h-[160px] relative overflow-hidden group/stat border border-white/5 md:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-5 bg-emerald-500 pointer-events-none group-hover/stat:opacity-10 transition-opacity duration-500" />
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">
                  PROJECTS
                </span>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-6" style={{ fontFamily: 'var(--font-syne)' }}>
                  <AnimatedNumber value="30+" />
                </p>
                <span className="text-xs text-gray-400 font-light mt-2">
                  Client Sites Managed
                </span>
              </SpotlightCard>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <SpotlightCard className="p-6 md:p-8 flex flex-col justify-between min-h-[160px] relative overflow-hidden group/stat border border-white/5 md:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-5 bg-violet-500 pointer-events-none group-hover/stat:opacity-10 transition-opacity duration-500" />
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">
                  ACADEMICS
                </span>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-6" style={{ fontFamily: 'var(--font-syne)' }}>
                  <AnimatedNumber value="79%" />
                </p>
                <span className="text-xs text-gray-400 font-light mt-2">
                  B.E. CSE Final Score
                </span>
              </SpotlightCard>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <SpotlightCard className="p-6 md:p-8 flex flex-col justify-between min-h-[160px] relative overflow-hidden group/stat border border-white/5 md:border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-5 bg-orange-500 pointer-events-none group-hover/stat:opacity-10 transition-opacity duration-500" />
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">
                  CODE QUALITY
                </span>
                <p className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-6" style={{ fontFamily: 'var(--font-syne)' }}>
                  <AnimatedNumber value="100%" />
                </p>
                <span className="text-xs text-gray-400 font-light mt-2">
                  SLA & Standards Delivery
                </span>
              </SpotlightCard>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
