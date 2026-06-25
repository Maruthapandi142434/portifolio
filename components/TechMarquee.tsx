'use client';

import { motion } from 'framer-motion';
import { 
  Atom, 
  Cpu, 
  Database, 
  Cloud, 
  Zap, 
  Terminal, 
  CreditCard, 
  Wind, 
  Github, 
  Code2, 
  Server,
  FileCode,
  Globe,
  Layers
} from 'lucide-react';

const technologies = [
  { name: 'Next.js', icon: Globe },
  { name: 'Node.js', icon: Cpu },
  { name: 'Express.js', icon: Server },
  { name: 'React.js', icon: Atom },
  { name: 'TypeScript', icon: FileCode },
  { name: 'PostgreSQL', icon: Database },
  { name: 'MongoDB', icon: Database },
  { name: 'MySQL', icon: Database },
  { name: 'Docker', icon: Layers },
  { name: 'Linux', icon: Terminal },
  { name: 'AWS EC2', icon: Cloud },
  { name: 'Redis', icon: Zap },
  { name: 'Django', icon: Code2 },
  { name: 'Python', icon: Code2 },
  { name: 'Razorpay', icon: CreditCard },
  { name: 'Stripe', icon: CreditCard },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'Git/GitHub', icon: Github },
];

const marqueeItems = [...technologies, ...technologies];

export function TechMarquee() {
  return (
    <section className="w-full bg-black border-y border-white/10 py-12 md:py-16 overflow-hidden">
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-8 md:gap-12 whitespace-nowrap py-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {marqueeItems.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 text-2xl md:text-5xl font-bold text-white tracking-tight min-w-max"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                <Icon className="w-6 h-6 md:w-10 md:h-10 text-white shrink-0 opacity-80" />
                <span>{tech.name}</span>
                <span className="mx-6 md:mx-8 text-white/30">•</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
