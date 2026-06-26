'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealOnScroll } from './RevealOnScroll';
import { SpotlightCard } from './TechExpertise';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'SS WORLD TRAVEL CRM',
    category: 'ENTERPRISE SYSTEM',
    description:
      'A comprehensive travel management CRM. Engineered a decoupled Repository Pattern backend, implemented role-based access control (RBAC), and designed a real-time Profit & Margin engine for currency conversion and service margin analysis.',
    tech: ['Node.js', 'Express.js', 'PostgreSQL', 'Chart.js', 'Repository Pattern'],
    link: 'https://github.com/Maruthapandi142434',
    glowColor: 'bg-cyan-500/10',
  },
  {
    id: 2,
    title: 'FINTRACK PRO DASHBOARD',
    category: 'FINANCIAL CRM',
    description:
      'An advanced sales dashboard and CRM with a robust MySQL backend. Implemented JWT/RBAC security, Redis rate limiting, automated GST invoicing, dynamic PDF generation, and automated client billing workflows.',
    tech: ['Next.js', 'MySQL', 'Redis', 'Nginx', 'PM2', 'Tailwind CSS'],
    link: 'https://github.com/Maruthapandi142434',
    glowColor: 'bg-emerald-500/10',
  },
  {
    id: 3,
    title: 'NEXT.JS E-COMMERCE ECOSYSTEM',
    category: 'RETAIL PLATFORM',
    description:
      'A high-performance retail platform. Utilized Next.js Server-Side Rendering (SSR) for a 95+ Lighthouse score. Integrated Razorpay API with webhooks, Shiprocket API for shipping logistics, and Prisma ORM with Supabase.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma ORM', 'Razorpay', 'Shiprocket', 'Redux Toolkit'],
    link: 'https://github.com/Maruthapandi142434',
    glowColor: 'bg-violet-500/10',
  },
  {
    id: 4,
    title: 'FINSMART ANALYTICS',
    category: 'FINANCIAL WEB APP',
    description:
      'A financial analytics tool designed to track investments. Developed Django RESTful APIs, managed PostgreSQL databases, integrated Stripe/PayPal payment systems, and built an automated Pandas/NumPy reporting pipeline.',
    tech: ['Django', 'Python', 'PostgreSQL', 'Stripe', 'PayPal', 'Pandas', 'NumPy'],
    link: 'https://github.com/Maruthapandi142434',
    glowColor: 'bg-indigo-500/10',
  },
  {
    id: 5,
    title: 'AMC SUPPORT & DEPLOYMENTS',
    category: 'WEBSITE OPERATIONS',
    description:
      'Handled maintenance, bug fixes, performance optimizations, and deployments for 30+ client web applications. Built business booking platforms and optimized SEO configurations under strict AMC SLAs.',
    tech: ['Next.js', 'React.js', 'Node.js', 'PHP', 'WordPress', 'Linux VPS'],
    link: 'https://github.com/Maruthapandi142434',
    glowColor: 'bg-orange-500/10',
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: any;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add({
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)"
        }, (context) => {
          const { isMobile } = context.conditions as any;
          const cards = gsap.utils.toArray('.project-card');
          if (cards.length <= 1) return;

          cards.forEach((card: any, idx) => {
            // Last card doesn't shrink when scrolling down
            if (idx === cards.length - 1) return;

            const nextCard = cards[idx + 1] as any;
            const endOffset = isMobile ? 'top 80px' : 'top 140px';

            gsap.to(card, {
              scale: 0.94 - (cards.length - idx - 2) * 0.015, // Nested stacking perspective scaling
              opacity: isMobile ? 0.6 : 0.35,
              y: -15, // Slight vertical parallax lift
              transformOrigin: 'top center',
              ease: 'none',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 80%', // start shrinking card i when card i+1 starts approaching viewport top
                end: endOffset, // finished shrinking card i when card i+1 hits its sticky position
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });
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
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-black py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/10"
    >
      <div className="container mx-auto max-w-5xl">
        <RevealOnScroll>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase leading-none mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Projects
          </h2>
          <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest font-mono mb-16 md:mb-24">
            Production-Ready Systems & Enterprise Platforms
          </p>
        </RevealOnScroll>

        {/* Project Cards Stacking Container */}
        <div className="relative flex flex-col gap-12 md:gap-0 w-full select-none">
          {projects.map((project, idx) => {
            const CardContent = (
              <SpotlightCard className="w-full bg-zinc-950/40 border border-white/10 rounded-3xl p-8 md:p-12 min-h-[380px] md:min-h-[400px] flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5 md:border-white/10 hover:border-white/20 transition-all duration-300">
                {/* Background glow color circle */}
                <div className={`absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none ${project.glowColor}`} />

                {/* Decorative background outline index number */}
                <div className="absolute top-6 right-8 text-[6rem] md:text-[11rem] font-bold text-white/[0.015] select-none pointer-events-none font-mono leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Two-column layout content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 w-full">
                  
                  {/* Left Column: Details */}
                  <div className="lg:col-span-8 space-y-4">
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                      {project.category}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide leading-tight mt-1"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed max-w-xl pt-2">
                      {project.description}
                    </p>

                    <div className="pt-6">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs md:text-sm text-white font-semibold tracking-wider uppercase font-mono group/link-btn cursor-pointer"
                      >
                        VIEW CODE
                        <ArrowUpRight className="w-4 h-4 group-hover/link-btn:translate-x-0.5 group-hover/link-btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Tech stack */}
                  <div className="lg:col-span-4 space-y-4">
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block">
                      Technologies & Stack
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {project.tech.map((tech, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3 py-1.5 border border-white/5 bg-white/[0.01] hover:border-white/20 text-xs text-gray-350 font-mono rounded-md hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </SpotlightCard>
            );

            return (
              <div
                key={project.id}
                className="project-card sticky top-[80px] md:top-[140px] mb-12 md:mb-24 w-full py-2"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
