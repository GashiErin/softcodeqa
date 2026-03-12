import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LogoLoop from './LogoLoop.jsx';

export const projects = [
  { id: 1, title: 'EdaSolar', category: 'Solar Panels', image: '/edalogo.png', photos: ['/eda1.png', '/eda2.png', '/eda3.png', '/eda4.png'], isLogo: true },
  { id: 2, title: 'Novatex', category: 'Fiberglass Mesh', image: '/LOGONOVATEX.png', photos: ['/novatex-screenshot-1.png', '/novatex-screenshot-2.png'] },
  { id: 3, title: 'Aurum', category: 'Perfumes', image: '/parfum1.png', photos: ['/parfum1.png', '/parfum2.png', '/parfum3.png', '/parfum4.png'] },
  { id: 4, title: 'Sahgri', category: 'Plastering & Painting', image: '/sahgrilogo.jpg', photos: ['/sahgri1.png', '/sahgri2.png', '/sahgri3.png'], isLogo: true, description: 'Swiss company specializing in plastering and painting; offers project consulting and execution for large public and private buildings.' },
  { id: 5, title: 'Velour Artisan Gelato', category: 'Luxury E-commerce', image: '/velour-hero.jpg', photos: ['/velour-hero.jpg', '/velour-products.jpg', '/velour-products1.jpg'] },
  { id: 6, title: 'Harvest', category: 'Product Showcase', image: '/fruta1.png', photos: ['/fruta1.png', '/fruta2.png', '/fruta3.png'] },
   { id: 7, title: 'AirTruking', category: 'Logistics', image: '/truck1.png', photos: ['/truck1.png', '/truck2.png', '/truck3.png'] },
   { id: 8, title: 'Villa', category: 'Real Estate', image: '/villa1.png', photos: ['/villa1.png', '/villa2.png', '/villa3.png', '/villa4.png'] },
  { id: 9, title: 'GreenCare', category: 'Body Care', image: '/krema1.png', photos: ['/krema1.png', '/krema2.png', '/krema3.png', '/krema4.png'] },
   { id: 10, title: 'ORA-TEK Engineering', category: 'Watch Parts', image: '/oratek-logo.jpg', photos: ['/ora1.png', '/ora2.png', '/ora3.png'] },
   { id: 11, title: 'Fundo', category: 'Furniture Industry', image: '/mob1.png', photos: ['/mob1.png', '/mob2.png', '/mob3.png', '/mob4.png'] },
      { id: 12, title: 'Stride', category: 'Sneaker Store ', image: '/pat1.png', photos: ['/pat1.png', '/pat2.png', '/pat3.png', '/pat4.png'] },
];

const cardVariants = {
  hidden: (i = 0) => ({
    opacity: 0,
    y: 24,
    scale: 0.98,
  }),
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Work() {
  const [active, setActive] = useState(null);
  const [activeConceptId, setActiveConceptId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const conceptProjects = [
   // { id: 'concept-1', title: 'Concept 01', image: '/scr1.png' },
   // { id: 'concept-2', title: 'Concept 02', image: '/scr2.png' },
   // { id: 'concept-3', title: 'Concept 03', image: '/scr3.png' },
  ];

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projects.length;
  const workLogos = [
    { node: <i className="fa-brands fa-docker" aria-hidden="true" />, title: 'Docker' },
    { node: <i className="fa-brands fa-github" aria-hidden="true" />, title: 'GitHub' },
    { node: <i className="fa-solid fa-bolt-lightning" aria-hidden="true" />, title: 'Lightning' },
    { node: <i className="fa-brands fa-react" aria-hidden="true" />, title: 'React' },
    { node: <i className="fa-solid fa-database" aria-hidden="true" />, title: 'Database' },
    { node: <i className="fa-brands fa-aws" aria-hidden="true" />, title: 'AWS' },
    { node: <i className="fa-brands fa-google-drive" aria-hidden="true" />, title: 'Google Drive' },
    { node: <i className="fa-solid fa-globe" aria-hidden="true" />, title: 'Globe' },
    { node: <i className="fa-solid fa-s" aria-hidden="true" />, title: 'S' },
  ];

  return (
    <section id="work" className="relative pt-24 sm:pt-32 pb-8 sm:pb-12 border-t border-neutral-900/60 snap-start">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <h3 className="text-2xl sm:text-3xl font-semibold">Selected Work</h3>
          <span className="text-neutral-500 text-sm">2022 - 2025</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((p, idx) => {
            // Use explicit flags: isLogo for white-logo treatment, highlight for emphasized projects.
            const isLogo = !!p.isLogo;
            const isHighlighted = !!p.highlight;
            return (
              <TiltCard key={p.id} idx={idx} onClick={() => setActive(p)}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_58%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-neutral-700/80 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-neutral-300 backdrop-blur-sm">
                  <span>{`0${idx + 1}`.slice(-2)}</span>
                  <span className="text-neutral-500">/</span>
                  <span>{p.category}</span>
                </div>
                <div className={`aspect-[4/3] overflow-hidden ${isLogo ? 'bg-white flex items-center justify-center' : isHighlighted ? 'bg-neutral-900 flex items-center justify-center' : ''}`}>
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className={
                      isLogo
                        ? 'max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 p-4'
                        : isHighlighted
                          ? 'max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 p-4'
                          : 'h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                    }
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-90" />
                </div>
                <div className="relative z-10 p-5 flex items-end justify-between gap-4 border-t border-neutral-800/80 bg-neutral-950/80 backdrop-blur-sm">
                  <div className="min-w-0">
                    <div className="font-medium text-base text-neutral-100 truncate">{p.title}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.14em] text-neutral-400">{p.category}</div>
                  </div>
                  <div className="shrink-0 inline-flex h-9 items-center rounded-full border border-neutral-700 bg-black/45 px-3 text-xs font-medium text-neutral-200 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    View project -&gt;
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {hasMoreProjects && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="rounded-full border border-neutral-700 bg-neutral-900/80 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600"
            >
              Show 6 More Work
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-14">
        <LogoLoop
          logos={workLogos}
          speed={70}
          direction="left"
          logoHeight={56}
          gap={28}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#0a0a0a"
          ariaLabel="Selected work logos"
        />
      </div>

      {/* Concept Projects Section */}
      <div className="mx-auto max-w-6xl px-6 mt-0 pt-0 border-t border-neutral-900/60">
        <div className="mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2"></h3>
          <p className="text-neutral-400 text-sm"></p>
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
                    <p className="text-xs text-cyan-400 mt-1">Click to view -&gt;</p>
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
                    View full project -&gt;
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
                  src={conceptProjects.find((p) => p.id === activeConceptId)?.image}
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
                  <h4 className="text-2xl font-bold text-white">{conceptProjects.find((p) => p.id === activeConceptId)?.title}</h4>
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
  return (
    <motion.button
      custom={idx}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -3 }}
      viewport={{ once: true, amount: 0.2 }}
      onClick={onClick}
      className="group text-left relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800/80 shadow-[0_10px_28px_rgba(0,0,0,0.4)] transition-colors duration-300 hover:border-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600"
    >
      {/* OPTIMIZED GLOW EFFECTS */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/6 to-cyan-500/6" />
      </div>
      <div>
        {children}
      </div>
    </motion.button>
  );
}
