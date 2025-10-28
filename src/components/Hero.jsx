import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { textReveal, floatLoop, slideDown, morphing, floating, pulse, wiggle, explosion, spiral, wave } from '../utils/motion.js';
import { useRef } from 'react';

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
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden snap-start">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(255,255,255,0.08),transparent),radial-gradient(800px_400px_at_10%_80%,rgba(120,119,198,0.08),transparent)]" />
      <div className="absolute inset-0 opacity-25">
        <video className="w-full h-full object-cover" src="https://cdn.coverr.co/videos/coverr-night-city-traffic-2127/1080p.mp4" autoPlay loop muted playsInline />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div style={{ y }} className="relative z-10 w-full max-w-6xl px-6 text-center">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] bg-clip-text text-transparent accent-gradient inline-flex flex-wrap justify-center gap-x-2"
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
          className="mt-6 text-neutral-300/80 max-w-2xl mx-auto"
        >
          Driven by design. Powered by technology.
        </motion.p>
      </motion.div>

      {/* CRAZY FLOATING SHAPES */}
      <motion.div className="absolute -left-10 top-24 w-40 h-40 rounded-full bg-violet-500/10 blur-2xl" {...morphing(0, 4)} />
      <motion.div className="absolute right-0 bottom-24 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl" {...floating(0.6, 30, 5)} />
      <motion.div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-pink-500/20 blur-xl" {...spiral(1, 3)} />
      <motion.div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-yellow-500/15 blur-2xl" {...wave(2, 25, 4)} />
      <motion.div className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full bg-green-500/20 blur-xl" {...pulse(1.5, 1.3, 2.5)} />
      
      {/* PARTICLE SYSTEM */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          {...wiggle(i * 0.2, 15, 0.8)}
          {...floating(i * 0.3, 40, 6)}
        />
      ))}

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


