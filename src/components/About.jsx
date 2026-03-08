import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, slideRight, slideUp, slideLeft, explosion } from '../utils/motion.js';
import Section from './Section.jsx';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  const stats = [
    { k: 'Projects', v: 50, color: 'violet', suffix: '', caption: 'Launched brand & product experiences.' },
    { k: 'Clients', v: 25, color: 'cyan', suffix: '', caption: 'Partners across Europe & beyond.' },
    { k: 'Delivered', v: 99, color: 'pink', suffix: '%', caption: 'On-time, on-budget delivery rate.' },
    { k: 'Countries', v: 5, color: 'yellow', suffix: '+', caption: 'Work shipped to different markets.' },
  ];

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 border-t border-neutral-900/60 snap-start overflow-hidden"
    >
      {/* soft background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-10 w-64 h-64 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <Section>
        <motion.div
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-6xl px-6 space-y-10"
        >
          {/* heading / copy */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <motion.div
              variants={slideRight(0)}
              className="md:col-span-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                Building experiences for tomorrow.
              </h2>
            </motion.div>
            <motion.div
              variants={slideLeft(0.1)}
              className="md:col-span-6 text-neutral-300/90 leading-relaxed text-sm sm:text-base"
            >
              <p>
                SoftCodeEA is a design-driven studio crafting cinematic digital brands, products, and interfaces. We
                blend motion, storytelling, and engineering to create work that feels alive, intentional, and
                unmistakably modern.
              </p>
              <p className="mt-4 text-neutral-400 text-sm">
                From early-stage startups to established teams, we help you move from vague ideas to crisp, shippable
                experiences that people actually remember.
              </p>
            </motion.div>
          </div>

          {/* horizontal stats slider */}
          <motion.div variants={slideUp(0.15)}>
            <div className="flex items-center justify-between mb-4 gap-4">
              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400">
                Studio highlights
              </p>
              <span className="hidden sm:inline text-[11px] text-neutral-500">
                Drag / scroll sideways
              </span>
            </div>

            <div className="relative -mx-4 sm:mx-0 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-neutral-950 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-neutral-950 to-transparent" />

              <motion.div
                className="flex gap-4 sm:gap-6 pb-2 px-4 sm:px-0"
                initial={{ x: '0%' }}
                animate={{ x: '-35%' }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {[...stats, ...stats].map((s, i) => (
                  <div
                    key={`${s.k}-${i}`}
                    className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px]"
                  >
                    <CrazyCounter
                      label={s.k}
                      value={s.v}
                      delay={0.2 + (i % stats.length) * 0.05}
                      color={s.color}
                      suffix={s.suffix}
                    />
                    <p className="mt-3 text-xs sm:text-sm text-neutral-400">
                      {s.caption}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </section>
  );
}


function CrazyCounter({ label, value, delay = 0, color = 'violet', suffix = '' }) {
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
      <div className="text-2xl font-semibold relative z-10 flex items-baseline gap-1">
        <AnimatedNumber to={value} delay={delay + 0.1} className="text-2xl font-semibold" />
        {suffix && <span className="text-lg text-neutral-400">{suffix}</span>}
      </div>
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


