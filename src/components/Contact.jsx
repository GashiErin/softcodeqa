import React from 'react';
import { motion } from 'framer-motion';
import { slideDown, morphing, floating, pulse, explosion, spiral, wave } from '../utils/motion.js';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-neutral-900/60 snap-start overflow-hidden">
      {/* CRAZY BACKGROUND EFFECTS */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-cyan-500/10 to-pink-500/10" {...morphing(0, 6)} />
      <motion.div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl" {...floating(1, 50, 8)} />
      <motion.div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-green-500/5 blur-3xl" {...wave(2, 40, 5)} />
      
      {/* FLOATING PARTICLES */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          {...spiral(i * 0.3, 3)}
          {...pulse(i * 0.2, 1.5, 2)}
        />
      ))}
      
      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={explosion(0)}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold"
        >
          Let's build something extraordinary together.
        </motion.h3>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={explosion(0.1)}
          className="mt-10"
        >
          <CrazyMagneticButton>Get in touch</CrazyMagneticButton>
        </motion.div>
      </div>
    </section>
  );
}


function CrazyMagneticButton({ children }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [hover, setHover] = React.useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const onLeave = () => {
    setPos({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      className="interactive relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neutral-100 to-neutral-300 text-neutral-900 px-8 py-3 font-medium transition-[box-shadow,transform] will-change-transform overflow-hidden"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* CRAZY SPARK EFFECTS */}
      <span className="pointer-events-none absolute -inset-1 rounded-full" aria-hidden>
        <motion.span 
          className={`absolute inset-0 rounded-full ${hover ? 'opacity-100' : 'opacity-0'}`} 
          style={{ boxShadow: '0 0 60px 20px rgba(255,255,255,0.25)' }}
          {...morphing(0, 1)}
        />
        <motion.span 
          className={`absolute inset-0 rounded-full ${hover ? 'opacity-100' : 'opacity-0'}`} 
          style={{ boxShadow: '0 0 40px 15px rgba(167,139,250,0.3)' }}
          {...pulse(0, 1.2, 0.8)}
        />
      </span>
      
      {/* FLOATING PARTICLES ON HOVER */}
      {hover && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/80 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          {...floating(i * 0.1, 30, 2)}
          {...pulse(i * 0.2, 1.5, 1)}
        />
      ))}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}


