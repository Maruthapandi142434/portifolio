'use client';

import { motion } from 'framer-motion';
import { RevealOnScroll } from './RevealOnScroll';
import { Phone, Mail, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'GitHub (Maruthapandi142434)', href: 'https://github.com/Maruthapandi142434', icon: Github },
    { label: 'LinkedIn (marutha-pandi-m-47a274343)', href: 'https://linkedin.com/in/marutha-pandi-m-47a274343', icon: Linkedin },
    { label: 'Email (maruthapandi1409@gmail.com)', href: 'mailto:maruthapandi1409@gmail.com', icon: Mail },
    { label: 'Phone (+91 7604889776)', href: 'tel:+917604889776', icon: Phone },
  ];

  return (
    <footer className="relative w-full bg-black border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-7xl">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-16 md:mb-24">
            {/* Left side - CTA */}
            <div className="space-y-6">
              <h2
                className="text-5xl md:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                LET&apos;S BUILD SOMETHING GREAT
              </h2>
              <p className="text-base md:text-lg text-gray-400 font-light">
                Ready to start your next project? Let&apos;s collaborate.
              </p>
              <motion.a
                href="mailto:maruthapandi1409@gmail.com"
                whileHover={{ scale: 1.05 }}
                className="inline-block px-8 md:px-12 py-4 md:py-5 border border-white text-white font-semibold tracking-wide hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-xs uppercase tracking-widest"
              >
                Get in Touch
              </motion.a>
            </div>

            {/* Right side - Social Links */}
            <div className="space-y-6">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 font-light mb-8">
                Connect
              </h3>
              <div className="space-y-5">
                {socialLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white hover:text-gray-400 transition-colors duration-300 group font-mono text-xs md:text-sm"
                      whileHover={{ x: 4 }}
                    >
                      <Icon className="w-4 h-4 text-white group-hover:text-gray-400 transition-colors shrink-0" />
                      <span className="font-light">{link.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom section */}
        <RevealOnScroll>
          <div className="border-t border-white/10 pt-12 md:pt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h4
                className="text-lg md:text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                MARUTHA PANDI M
              </h4>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-light">
                Full Stack Developer • Backend Architect
              </p>
            </div>

            <div className="space-y-2 text-right">
              <p className="text-sm text-gray-500">
                © {currentYear} Marutha Pandi M. All rights reserved.
              </p>
              <p className="text-xs text-gray-600 font-light">
                Designed & Built with Framer Motion + Next.js 14
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
}
