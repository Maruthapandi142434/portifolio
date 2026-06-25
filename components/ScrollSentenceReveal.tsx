'use client';

import { motion, useTransform } from 'framer-motion';

interface ScrollSentenceRevealProps {
  sentences: string[];
  progress: any; // MotionValue<number>
}

export function ScrollSentenceReveal({ sentences, progress }: ScrollSentenceRevealProps) {
  const total = sentences.length;

  return (
    <div className="select-none max-w-4xl">
      <p className="text-lg md:text-2xl lg:text-3xl text-white font-light tracking-wide leading-relaxed font-sans">
        {sentences.map((sentence, idx) => {
          // Calculate scroll range window for this specific sentence
          const step = 1.0 / total;
          const start = idx * step;
          const end = start + step;

          // Map scroll progress to opacity: 30% (dimmed) to 100% (bright white)
          // Clamped automatically outside of the range.
          const opacity = useTransform(progress, [start, end], [0.3, 1.0]);

          return (
            <motion.span
              key={idx}
              style={{ opacity }}
              className="inline transition-colors duration-150 mr-1.5"
            >
              {sentence}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}
