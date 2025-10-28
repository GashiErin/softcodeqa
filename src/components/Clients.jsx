import React from 'react';
import { motion } from 'framer-motion';
import { marquee, slideDown, morphing, floating, pulse, explosion, spiral } from '../utils/motion.js';

const logos = [
  { id: 1, name: 'Alpha', src: 'https://dummyimage.com/200x60/111/aaa&text=Alpha' },
  { id: 2, name: 'Beta', src: 'https://dummyimage.com/200x60/111/aaa&text=Beta' },
  { id: 3, name: 'Gamma', src: 'https://dummyimage.com/200x60/111/aaa&text=Gamma' },
  { id: 4, name: 'Delta', src: 'https://dummyimage.com/200x60/111/aaa&text=Delta' },
  { id: 5, name: 'Epsilon', src: 'https://dummyimage.com/200x60/111/aaa&text=Epsilon' },
  { id: 6, name: 'Zeta', src: 'https://dummyimage.com/200x60/111/aaa&text=Zeta' },
  { id: 7, name: 'Eta', src: 'https://dummyimage.com/200x60/111/aaa&text=Eta' },
  { id: 8, name: 'Theta', src: 'https://dummyimage.com/200x60/111/aaa&text=Theta' },
];

export default function Clients() {
  return (
    <section id="clients" className="relative py-24 sm:py-32 border-t border-neutral-900/60 snap-start">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h3 className="text-2xl sm:text-3xl font-semibold mb-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={slideDown(0)}>
          <span className="accent-gradient bg-clip-text text-transparent">Trusted</span> by leading teams
        </motion.h3>

        {/* CRAZY MARQUEE WITH FLOATING BACKGROUNDS */}
        <div className="overflow-hidden relative">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-cyan-500/5 to-pink-500/5" {...morphing(0, 8)} />
          <motion.div className="flex gap-8 items-center py-4 will-change-transform relative z-10" {...marquee(30, 0, -50)}>
            {[...logos, ...logos].map((l, i) => (
              <CrazyLogo key={`m1-${i}`} logo={l} i={i} />
            ))}
          </motion.div>
        </div>

        {/* Marquee row 2 (reverse) with particles */}
        <div className="overflow-hidden relative">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-yellow-500/5 to-green-500/5" {...floating(1, 30, 6)} />
          <motion.div className="flex gap-8 items-center py-4 will-change-transform relative z-10" {...marquee(32, -50, 0)}>
            {[...logos, ...logos].map((l, i) => (
              <CrazyLogo key={`m2-${i}`} logo={l} i={i} />
            ))}
          </motion.div>
          
          {/* FLOATING PARTICLES */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${i * 20}%`,
                top: `${50 + (i % 2) * 20}%`,
              }}
              {...spiral(i * 0.5, 4)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CrazyLogo({ logo, i }) {
  return (
    <motion.a 
      href="#" 
      className="shrink-0 rounded-xl border border-neutral-800 bg-neutral-900/60 px-8 py-4 group relative overflow-hidden"
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* FLOATING BACKGROUND ON HOVER */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
        {...morphing(0, 2)}
      />
      <img 
        src={logo.src} 
        alt={logo.name} 
        className="h-8 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 relative z-10" 
      />
      
      {/* PARTICLE TRAIL */}
      <motion.div 
        className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full"
        {...pulse(i * 0.1, 1.5, 1)}
      />
    </motion.a>
  );
}


