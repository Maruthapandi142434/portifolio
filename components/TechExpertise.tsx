'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Cpu, 
  Database, 
  Cloud, 
  ShieldCheck, 
  TrendingUp, 
  Blocks, 
  ArrowRight 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    title: 'Frontend Development',
    description: 'Developing high-fidelity, interactive, and responsive user interfaces with modern React frameworks and type-safe systems.',
    icon: Code2,
    skills: ['React.js', 'Next.js 14/15', 'TypeScript', 'JavaScript (ES6+)', 'Redux Toolkit', 'Tailwind CSS', 'HTML5/CSS3'],
  },
  {
    title: 'Backend Architecture',
    description: 'Architecting modular, highly maintainable server applications utilizing the Repository Pattern and enterprise design patterns.',
    icon: Cpu,
    skills: ['Node.js', 'Express.js', 'RESTful API Design', 'Python (Django, Flask)', 'Repository Pattern'],
  },
  {
    title: 'Database & ORM',
    description: 'Designing structured relational and non-relational databases, optimizing queries, and managing schema migrations.',
    icon: Database,
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase', 'Prisma ORM', 'Sequelize'],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Configuring secure VPS servers, containerizing environments with Docker, and setting up automated CI/CD pipelines.',
    icon: Cloud,
    skills: ['AWS EC2/S3/RDS', 'Docker & Compose', 'Nginx', 'PM2', 'Linux (Ubuntu)', 'Hetzner VPS', 'GitHub Actions CI/CD'],
  },
  {
    title: 'Security & Real-Time',
    description: 'Securing API endpoints with JWT authentication and RBAC, handling webhooks, and enabling real-time communications.',
    icon: ShieldCheck,
    skills: ['JWT & OAuth2.0', 'bcrypt', 'Socket.io', 'Webhooks', 'RBAC Authentication'],
  },
  {
    title: 'SEO & Performance',
    description: 'Optimizing rendering pathways (SSR/SSG/ISR), improving Lighthouse metrics, and implementing code splitting.',
    icon: TrendingUp,
    skills: ['SSR, SSG, ISR', 'Core Web Vitals', 'Lighthouse Opt.', 'Lazy Loading', 'Code Splitting'],
  },
  {
    title: 'Integrations & Tools',
    description: 'Connecting third-party platforms, mapping APIs, secure payment gateways, and backend visualizers.',
    icon: Blocks,
    skills: ['Razorpay', 'Shiprocket', 'Stripe & PayPal', 'Google Maps API', 'Chart.js / Recharts', 'Postman'],
  },
];

export function SpotlightCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.01] transition-all duration-500 hover:border-white/20 ${className}`}
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255, 255, 255, 0.05), transparent 40%)`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function TechExpertise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!section || !track) return;

    let ctx: any;

    // Small delay to ensure the DOM layout has fully settled and all fonts/styles are loaded
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add({
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)"
        }, (context) => {
          const getScrollAmount = () => track.scrollWidth - window.innerWidth;

          gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              invalidateOnRefresh: true,
            },
          });

          if (progressBar) {
            gsap.fromTo(
              progressBar,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  scrub: true,
                  start: 'top top',
                  end: () => `+=${getScrollAmount()}`,
                },
              }
            );
          }
        });
      }, sectionRef);

      // Force GSAP ScrollTrigger to refresh and recalculate layout coordinates
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
      className="relative w-full bg-black border-t border-white/10 overflow-hidden"
    >
      {/* Scroll indicator bar at bottom (hidden on mobile, fixed at bottom on desktop) */}
      <div className="absolute bottom-6 left-12 right-12 h-[2px] bg-white/10 overflow-hidden rounded-full hidden md:block z-20">
        <div
          ref={progressBarRef}
          className="h-full bg-white origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div
        ref={trackRef}
        className="flex flex-row h-[100dvh] w-max items-center gap-12 md:gap-24 px-6 md:px-24"
      >
        {/* Intro Slide */}
        <div className="w-[85vw] md:w-[75vw] lg:w-[60vw] max-w-[800px] shrink-0 flex flex-col justify-center h-full select-none">
          <span className="text-xs text-gray-500 font-mono tracking-[0.2em] uppercase mb-4">
            Domain Competence
          </span>
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight uppercase leading-none"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-white/30">
              Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-xl font-light tracking-wide leading-relaxed max-w-2xl mt-6">
            A comprehensive catalog of programming languages, architectures, databases, cloud DevOps pipelines, and tools that I build with.
          </p>
          <div className="flex items-center gap-3 mt-10 md:mt-16 text-xs md:text-sm font-mono text-white/50 tracking-wider">
            <span>SCROLL DOWN TO EXPLORE</span>
            <ArrowRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Skill Panels */}
        {skillGroups.map((group, idx) => {
          const Icon = group.icon;
          const panelNum = String(idx + 1).padStart(2, '0');

          return (
              <div
              key={idx}
              className="w-[85vw] md:w-[75vw] lg:w-[60vw] max-w-[900px] shrink-0 flex flex-col justify-center h-full py-6 md:py-0"
            >
              <SpotlightCard className="p-6 md:p-12 min-h-[480px] md:min-h-[520px] flex flex-col justify-between relative shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/5 md:border-white/10">
                {/* Huge decorative number in background */}
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-[8rem] md:text-[14rem] font-bold text-white/[0.02] select-none pointer-events-none font-mono">
                  {panelNum}
                </div>

                {/* Top Section */}
                <div className="space-y-6 z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                        CATEGORY {panelNum}
                      </span>
                      <h3
                        className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase"
                        style={{ fontFamily: 'var(--font-syne)' }}
                      >
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-2xl">
                    {group.description}
                  </p>
                </div>

                {/* Skills Grid */}
                <div className="z-10 mt-8 md:mt-12">
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block mb-4">
                    Technologies & Skills
                  </span>
                  
                  <div className="flex flex-wrap gap-2.5 md:gap-3">
                    {group.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-center gap-2.5 px-3.5 py-2 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-lg hover:bg-white hover:text-black transition-all duration-300 cursor-default group/skill"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover/skill:bg-black transition-colors shrink-0" />
                        <span className="font-mono text-xs md:text-sm font-medium tracking-wide">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}
