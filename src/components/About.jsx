import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, slideRight, slideUp, slideLeft, explosion } from '../utils/motion.js';
import Section from './Section.jsx';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-neutral-900/60 snap-start">
      <Section>
      <motion.div
        variants={staggerContainer(0.08, 0)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-10"
      >
        <motion.h2 className="md:col-span-5 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight" variants={slideRight(0)}>
          Building experiences for tomorrow.
        </motion.h2>
        <motion.p className="md:col-span-7 text-neutral-300/90 leading-relaxed" variants={slideLeft(0.1)}>
          We craft world-class digital products and brands for leading companies and ambitious startups. Our team blends strategy, design, and engineering to deliver work that feels inevitable.
        </motion.p>

        {/* CRAZY STATS WITH FLOATING BACKGROUNDS */}
        <motion.div className="md:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4" variants={slideUp(0.15)}>
          {[
            { k: 'Projects', v: 120, color: 'violet' },
            { k: 'Clients', v: 48, color: 'cyan' },
            { k: 'Awards', v: 15, color: 'pink' },
            { k: 'Years', v: 7, color: 'yellow' },
          ].map((s, i) => (
            <CrazyCounter key={s.k} label={s.k} value={s.v} delay={0.2 + i * 0.05} color={s.color} />
          ))}
        </motion.div>
        
        {/* OPTIMIZED BACKGROUND ELEMENTS */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl" />
      </motion.div>
      </Section>
    </section>
  );
}


function CrazyCounter({ label, value, delay = 0, color = 'violet' }) {
  const colorClasses = {
    violet: 'bg-violet-500/20 border-violet-500/30',
    cyan: 'bg-cyan-500/20 border-cyan-500/30',
    pink: 'bg-pink-500/20 border-pink-500/30',
    yellow: 'bg-yellow-500/20 border-yellow-500/30',
  };
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={explosion(delay)}
      className={`rounded-2xl border p-5 relative overflow-hidden group ${colorClasses[color]}`}
    >
      {/* STATIC BACKGROUND */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${color}-500/10 to-transparent`} />
      <AnimatedNumber to={value} delay={delay + 0.1} className="text-2xl font-semibold relative z-10" />
      <div className="text-xs mt-1 text-neutral-400 relative z-10">{label}</div>
    </motion.div>
  );
}

function AnimatedNumber({ to = 0, duration = 1.2, delay = 0, className = '' }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      let rafId;
      let start;
      const step = (t) => {
        if (start === undefined) start = t;
        const p = Math.min(1, (t - start) / (duration * 1000));
        const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // easeInOutQuad
        const val = Math.round(to * eased);
        setN(val);
        if (p < 1) rafId = requestAnimationFrame(step);
      };
      rafId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(rafId);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [to, duration, delay]);

  return <div ref={ref} className={className}>{n}</div>;
}


