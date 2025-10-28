import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { morphing, floating, pulse, explosion, flip3D, spiral, wave } from '../utils/motion.js';

const projects = [
  { id: 1, title: 'Astra Banking', category: 'Fintech', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, title: 'Nova Health', category: 'Healthcare', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, title: 'Orbit Travel', category: 'Travel', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, title: 'Echo Media', category: 'Entertainment', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, title: 'Flux Mobility', category: 'Automotive', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, title: 'Quanta Cloud', category: 'SaaS', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const cardVariants = {
  hidden: (i = 0) => ({
    opacity: 0,
    x: i % 2 === 0 ? 100 : -100,
    rotate: i % 2 === 0 ? 15 : -15,
    scale: 0.8,
    rotateY: i % 2 === 0 ? 45 : -45,
  }),
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    rotateY: 0,
    transition: { 
      delay: i * 0.08, 
      duration: 1.2, 
      ease: [0.22, 1, 0.36, 1],
      type: "spring",
      stiffness: 100,
      damping: 15
    },
  }),
};

export default function Work() {
  const [active, setActive] = useState(null);
  return (
    <section id="work" className="relative py-24 sm:py-32 border-t border-neutral-900/60 snap-start">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <h3 className="text-2xl sm:text-3xl font-semibold">Selected Work</h3>
          <span className="text-neutral-500 text-sm">2022 — 2025</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => {
            return (
            <TiltCard key={p.id} idx={idx} onClick={() => setActive(p)}>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-neutral-400">{p.category}</div>
                </div>
                <div className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs text-neutral-300">View project →</div>
              </div>
            </TiltCard>
          );})}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="max-w-3xl w-full rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { duration: 0.25 } }}
              exit={{ scale: 0.96, opacity: 0, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[16/9] overflow-hidden bg-neutral-900">
                <video
                  className="w-full h-full object-cover"
                  src="https://cdn.coverr.co/videos/coverr-city-lights-2074/1080p.mp4"
                  poster={active.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold">{active.title}</h4>
                <p className="mt-2 text-neutral-300/90">Case Study placeholder. Describe the challenge, approach, and outcome with crisp visuals and metrics. Coming soon.</p>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setActive(null)} className="px-4 py-2 rounded-full bg-neutral-200 text-neutral-900 text-sm font-medium hover:bg-white transition-colors">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


// Tilt card with 3D hover and glow
function TiltCard({ children, idx, onClick }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateX = (py - 0.5) * -10; // tilt up/down
    const rotateY = (px - 0.5) * 10;  // tilt left/right
    setTilt({ rotateX, rotateY });
  };

  const onLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <motion.button
      ref={ref}
      style={{ transformStyle: 'preserve-3d' }}
      custom={idx}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group text-left relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600"
    >
      {/* CRAZY GLOW EFFECTS */}
      <div className="pointer-events-none absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden>
        <div className="absolute inset-0 blur-3xl bg-[conic-gradient(from_0deg_at_50%_50%,rgba(167,139,250,0.12),rgba(34,211,238,0.12),transparent_60%)]" />
        <motion.div 
          className="absolute inset-0 blur-2xl bg-gradient-to-r from-pink-500/20 to-yellow-500/20"
          {...morphing(0, 2)}
        />
      </div>
      
      {/* FLOATING PARTICLES ON HOVER */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            {...floating(i * 0.1, 20, 2)}
            {...pulse(i * 0.2, 1.5, 1)}
          />
        ))}
      </div>
      <motion.div
        style={{
          transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}

