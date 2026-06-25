'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RevealOnScroll } from './RevealOnScroll';
import { SpotlightCard } from './TechExpertise';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'SixthStar Technologies',
    period: 'Feb 2025 - Present',
    skills: ['Next.js', 'Node.js', 'Express.js', 'MySQL', 'PostgreSQL', 'Docker', 'Redis', 'PM2', 'Nginx', 'Linux VPS', 'JWT/RBAC', 'Chart.js'],
    bulletPoints: [
      'Designed a modular backend using the Repository Pattern, ensuring a decoupled, maintainable, and testable codebase.',
      'Implemented secure Role-Based Access Control (RBAC) with JWT and Redis rate limiting for enterprise-grade dashboards.',
      'Engineered a Profit & Margin Analysis engine that calculates real-time currency conversions and margins (Hotels, Tours, Packages).',
      'Automated Quotation and GST-compliant Invoice document generation, reducing manual paperwork by 60%.',
      'Optimized application response times using Single Page Architecture (SPA), lazy loading, and Redis caching.',
      'Managed end-to-end deployments on Linux VPS using PM2, Nginx, and automated GitHub Actions CI/CD pipelines.'
    ],
  },
  {
    title: 'Python Full Stack Developer',
    company: 'Birlasoft',
    period: 'Jan 2024 - Jan 2025',
    skills: ['Django', 'Python', 'PostgreSQL', 'RESTful APIs', 'Stripe', 'PayPal', 'Pandas', 'NumPy'],
    bulletPoints: [
      'Developed robust RESTful APIs using Django and managed complex relational datasets in PostgreSQL for the FinSmart web app.',
      'Integrated Stripe and PayPal payment gateways for secure, global multi-currency transaction processing.',
      'Built automated data processing pipelines with Pandas and NumPy, saving the finance team 8+ hours per week in manual reporting.',
      'Collaborated actively in an Agile Scrum environment, participating in sprints, daily stand-ups, and thorough peer code reviews.'
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ctx: any;

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Only run sticky card transition stack on desktop
        mm.add('(min-width: 768px)', () => {
          const cards = gsap.utils.toArray('.experience-card');
          if (cards.length <= 1) return;

          // Set initial state for hidden cards
          gsap.set(cards.slice(1), { opacity: 0, y: 60, pointerEvents: 'none' });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: '+=150%', // Pinned scroll distance
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;
                // Transition threshold is at 50% scroll progress (0.5)
                const activeIndex = progress < 0.5 ? 0 : 1;
                setActiveIdx((prev) => (prev !== activeIndex ? activeIndex : prev));
              },
            },
          });

          cards.forEach((card: any, idx) => {
            if (idx === 0) return;

            const prevCard = cards[idx - 1] as any;

            // Animate previous card out
            tl.to(prevCard, {
              opacity: 0,
              y: -60,
              pointerEvents: 'none',
              duration: 1.5,
              ease: 'power2.inOut',
            });

            // Animate current card in
            tl.to(card, {
              opacity: 1,
              y: 0,
              pointerEvents: 'auto',
              duration: 1.5,
              ease: 'power2.inOut',
            }, '<'); // run concurrently

            // Hold buffer state before unpinning
            tl.to({}, { duration: 0.8 });
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
      ref={sectionRef}
      className="relative w-full bg-black py-20 md:py-32 px-6 md:px-12 lg:px-24 border-t border-white/10"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Sticky Header Area (Desktop only) */}
          <div className="md:col-span-5 md:sticky md:top-24 space-y-4">
            <RevealOnScroll>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter uppercase leading-none"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Experience
              </h2>
              <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest font-mono mt-4">
                Professional Journey
              </p>
            </RevealOnScroll>

            {/* Sidebar Active Step Indicators */}
            <div className="hidden md:flex flex-col gap-5 pt-12 select-none">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 transition-all duration-300"
                >
                  <div
                    className={`h-[2px] transition-all duration-500 rounded-full ${
                      activeIdx === idx ? 'w-12 bg-white' : 'w-6 bg-white/20'
                    }`}
                  />
                  <span
                    className={`text-xs font-mono tracking-wider transition-colors duration-500 ${
                      activeIdx === idx ? 'text-white font-bold' : 'text-white/40'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')} — {exp.company.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Area (Mobile stacks vertically, Desktop stacks absolutely) */}
          <div className="md:col-span-7 relative flex flex-col md:block md:h-[620px] w-full">
            {experiences.map((exp, idx) => {
              const CardContent = (
                <SpotlightCard className="p-8 md:p-10 min-h-[460px] flex flex-col justify-between shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/5 md:border-white/10">
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-6 border-b border-white/5">
                      <div>
                        <h3
                          className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide"
                          style={{ fontFamily: 'var(--font-syne)' }}
                        >
                          {exp.title}
                        </h3>
                        <p className="text-gray-400 font-medium text-sm mt-1">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-gray-500 text-xs md:text-sm uppercase tracking-widest font-mono whitespace-nowrap self-start sm:mt-1.5">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400 font-light leading-relaxed">
                      {exp.bulletPoints.map((point, ptIdx) => (
                        <li key={ptIdx} className="hover:text-white transition-colors duration-200">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6">
                    {exp.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-2.5 py-1 border border-white/5 bg-white/[0.01] hover:border-white/20 text-xs text-gray-300 font-mono rounded-sm hover:text-white hover:bg-white/[0.04] transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              );

              return (
                <div
                  key={idx}
                  className="experience-card relative md:absolute md:top-0 md:left-0 w-full mb-8 md:mb-0"
                  style={{ zIndex: experiences.length - idx }}
                >
                  {/* On mobile, wrap in RevealOnScroll. On desktop, render directly to avoid library conflicts */}
                  <div className="md:hidden">
                    <RevealOnScroll delay={idx * 0.1}>
                      {CardContent}
                    </RevealOnScroll>
                  </div>
                  <div className="hidden md:block">
                    {CardContent}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
