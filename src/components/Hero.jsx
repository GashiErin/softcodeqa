import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { textReveal, floatLoop, slideDown, morphing, floating, pulse, wiggle, explosion, spiral, wave } from '../utils/motion.js';
import { useRef } from 'react';
import Orb from './Orb.jsx';

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const headline = 'We design the future of digital experiences.';
  const words = headline.split(' ');
  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden snap-start bg-black">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.08),transparent),radial-gradient(800px_400px_at_10%_80%,rgba(120,119,198,0.08),transparent)]" />

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col lg:flex-row items-center gap-12">
        <motion.div style={{ y }} className="w-full lg:w-1/2 text-center lg:text-left will-change-transform gpu-accelerated">
          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] bg-clip-text text-transparent accent-gradient inline-flex flex-wrap justify-center lg:justify-start gap-x-2"
            initial="hidden"
            animate="visible"
          >
            {words.map((w, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <motion.span
                  className="inline-block"
                  variants={textReveal(i * 0.03)}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.h1>
          <motion.p
            variants={slideDown(0.15)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-neutral-300/80 max-w-2xl mx-auto lg:mx-0"
          >
            Driven by design. Powered by technology.
          </motion.p>
        </motion.div>

        <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px] relative">
          <Orb
            hoverIntensity={2}
            rotateOnHover
            hue={0}
            forceHoverState={false}
            backgroundColor="#000000"
          />
        </div>
      </div>

      {/* OPTIMIZED FLOATING SHAPES - Reduced for better performance */}
      <motion.div className="absolute -left-10 top-24 w-40 h-40 rounded-full bg-violet-500/10 blur-2xl" {...floating(0, 20, 6)} />
      <motion.div className="absolute right-0 bottom-24 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl" {...floating(0.6, 25, 8)} />
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-xs tracking-widest text-neutral-400">
          <span>SCROLL TO EXPLORE</span>
          <span className="mt-3 h-8 w-px bg-neutral-600 relative overflow-hidden">
            <span className="absolute inset-x-0 top-0 h-3 bg-neutral-300 animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}


