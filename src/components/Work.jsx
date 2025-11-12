import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const projects = [
  { id: 1, title: 'Novatex', category: 'Fiberglass Mesh', image: '/LOGONOVATEX.png', photos: ['/novatex-screenshot-1.png', '/novatex-screenshot-2.png'] },
  { id: 2, title: 'EdaSolar', category: 'Solar Panels', image: '/edalogo.png', photos: ['/eda1.png', '/eda2.png', '/eda3.png', '/eda4.png'], isLogo: true },
  { id: 3, title: 'ORA-TEK Engineering', category: 'Watch Parts', image: '/oratek-logo.jpg', photos: ['/ora1.png', '/ora2.png', '/ora3.png'] },
  { id: 4, title: 'Sahgri', category: 'Plastering & Painting', image: '/sahgrilogo.jpg', photos: ['/sahgri1.png', '/sahgri2.png', '/sahgri3.png'], isLogo: true, description: 'Swiss company specializing in plastering and painting; offers project consulting and execution for large public and private buildings.' },
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
  const [activeConceptId, setActiveConceptId] = useState(null);
  const navigate = useNavigate();
  const conceptProjects = [
    { id: 'concept-1', title: 'Concept 01', image: '/scr1.png' },
    { id: 'concept-2', title: 'Concept 02', image: '/scr2.png' },
    { id: 'concept-3', title: 'Concept 03', image: '/scr3.png' },
  ];

  return (
    <section id="work" className="relative py-24 sm:py-32 border-t border-neutral-900/60 snap-start">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <h3 className="text-2xl sm:text-3xl font-semibold">Selected Work</h3>
          <span className="text-neutral-500 text-sm">2022 — 2025</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => {
            // Use explicit flags: isLogo for white-logo treatment, highlight for emphasized projects.
            const isLogo = !!p.isLogo;
            const isHighlighted = !!p.highlight;
            return (
            <TiltCard key={p.id} idx={idx} onClick={() => setActive(p)}>
              <div className={`aspect-[4/3] overflow-hidden ${isLogo ? 'bg-white flex items-center justify-center' : isHighlighted ? 'bg-neutral-900 flex items-center justify-center' : ''}`}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className={isLogo
                    ? "max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-110 p-4"
                    : isHighlighted
                      ? "max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-110 p-4"
                      : "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  }
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

      {/* Concept Projects Section */}
      <div className="mx-auto max-w-6xl px-6 mt-24 pt-24 border-t border-neutral-900/60">
        <div className="mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">Concept Projects</h3>
          <p className="text-neutral-400 text-sm">Experimental designs & prototypes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {conceptProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8, type: 'spring', stiffness: 100 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative cursor-pointer"
              onClick={() => setActiveConceptId(project.id)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />
              <div className="relative h-80 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse transform -skew-x-12 group-hover:translate-x-full transition duration-700 -z-10" />
                
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h4 className="text-xl font-semibold">{project.title}</h4>
                    <p className="text-xs text-cyan-400 mt-1">Click to view →</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
                <div className="mt-6 flex justify-between items-center">
                  <button 
                    onClick={() => {
                      setActive(null);
                      navigate(`/project/${active.id}`);
                    }} 
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-sm font-medium hover:from-violet-600 hover:to-cyan-600 transition-all duration-300"
                  >
                    View full project →
                  </button>
                  <button onClick={() => setActive(null)} className="px-4 py-2 rounded-full bg-neutral-200 text-neutral-900 text-sm font-medium hover:bg-white transition-colors">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Concept Project Modal */}
        {activeConceptId && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveConceptId(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-cyan-600/20 rounded-3xl blur-2xl" />
              
              <div className="relative rounded-3xl overflow-hidden bg-black border border-neutral-800">
                <img
                  src={conceptProjects.find(p => p.id === activeConceptId)?.image}
                  alt="Concept"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Close button with animation */}
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  onClick={() => setActiveConceptId(null)}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-white hover:bg-neutral-800 hover:border-neutral-600 transition-all group"
                >
                  <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Project info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8"
                >
                  <h4 className="text-2xl font-bold text-white">
                    {conceptProjects.find(p => p.id === activeConceptId)?.title}
                  </h4>
                  <p className="text-cyan-400 text-sm mt-2">Experimental Design Concept</p>
                </motion.div>
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
      {/* OPTIMIZED GLOW EFFECTS */}
      <div className="pointer-events-none absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
        <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-violet-500/10 to-cyan-500/10" />
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

