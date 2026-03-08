import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { projects } from './Work.jsx';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import Cursor from './Cursor.jsx';
import Prism from './Prism.jsx';
import Aurora from './Aurora.jsx';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '120deg']);
  
  const project = projects.find(p => p.id === parseInt(id));
  const projectPhotos = project?.photos || [];
  
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  
  const x = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);

  const openPhoto = (index) => {
    setSelectedPhotoIndex(index);
    setDirection(0);
    x.set(0);
  };

  const closePhoto = () => {
    setSelectedPhotoIndex(null);
    x.set(0);
  };

  const goToNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < projectPhotos.length - 1) {
      setDirection(1);
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
      x.set(0);
    }
  };

  const goToPrevious = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setDirection(-1);
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
      x.set(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      
      if (e.key === 'ArrowRight' && selectedPhotoIndex < projectPhotos.length - 1) {
        goToNext();
      }
      if (e.key === 'ArrowLeft' && selectedPhotoIndex > 0) {
        goToPrevious();
      }
      if (e.key === 'Escape') {
        closePhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPhotoIndex, projectPhotos.length]);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
      gestureOrientation: 'vertical',
      normalizeWheel: true,
    });

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { duration: 0 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Project not found</h1>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:from-violet-600 hover:to-cyan-600 transition-all"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <>
      <Nav />
      
      <div className="min-h-screen bg-neutral-950 text-white pt-14">
        {/* Hero Section */}
        <section className="relative pt-20 pb-14 sm:pt-24 sm:pb-16 border-b border-neutral-900/60 overflow-hidden">
          <div className="absolute inset-0 opacity-70">
            <div className="w-full h-full relative">
              <Prism
                animationType="rotate"
                timeScale={0.5}
                height={3.5}
                baseWidth={5.5}
                scale={3.6}
                hueShift={0}
                colorFrequency={1}
                noise={0}
                glow={1}
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950/80 to-neutral-950/95" />
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <div className="mx-auto max-w-6xl px-6 relative z-10">
            <motion.button
              onClick={() => navigate('/#work')}
              className="mb-8 text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: -5 }}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </motion.svg>
              Back to Work
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.span 
                  className="text-sm text-neutral-400 uppercase tracking-wide inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  {project.category}
                </motion.span>
              </motion.div>
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {project.title}
              </motion.h1>
              <motion.p 
                className="text-lg text-neutral-300/90 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                A detailed showcase of the project, including design process, challenges, and outcomes.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Project Photos Section with Aurora background */}
        <section className="relative pt-14 pb-24 sm:pt-16 sm:pb-28 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-0 opacity-80">
            <Aurora
              colorStops={['#7cff67', '#B19EEF', '#5227FF']}
              blend={0.5}
              amplitude={1.0}
              speed={1}
            />
          </div>

          <div className="mx-auto max-w-6xl px-6 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl font-semibold mb-12"
            >
              Project Gallery
            </motion.h2>

            {projectPhotos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectPhotos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative overflow-hidden rounded-2xl bg-neutral-900/70 border border-neutral-800/80 cursor-pointer backdrop-blur-sm"
                    onClick={() => openPhoto(idx)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                      >
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </motion.div>
                    </div>
                    <motion.img
                      src={photo}
                      alt={`${project.title} - Screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center py-16 border border-neutral-800 rounded-2xl bg-neutral-900/50 backdrop-blur-sm"
              >
                <p className="text-neutral-300 text-lg">Project photos will be displayed here</p>
                <p className="text-neutral-500 text-sm mt-2">Add photos to the project data to see them here</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Project Details Section (no Aurora) */}
        <section className="relative py-24 sm:py-32 border-t border-neutral-900/60">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="prose prose-invert max-w-none"
            >
              <motion.h2
                className="text-3xl font-semibold mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Project Overview
              </motion.h2>
              <motion.p
                className="text-neutral-300/90 text-lg leading-relaxed mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Detailed case study content will go here. This section can include information about the project goals,
                challenges faced, solutions implemented, and the final results.
              </motion.p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { title: 'Category', value: project.category },
                  { title: 'Year', value: '2025' },
                  { title: 'Status', value: 'Completed' },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-violet-500/50 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-neutral-400">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Photo Gallery Modal */}
      <AnimatePresence initial={false} custom={direction}>
        {selectedPhotoIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePhoto}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Close Button */}
            <motion.button
              onClick={closePhoto}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Navigation Arrows */}
            {selectedPhotoIndex > 0 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-6 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}

            {selectedPhotoIndex < projectPhotos.length - 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-6 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}

            {/* Photo Container */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full flex items-center justify-center p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={selectedPhotoIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.3 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000) {
                      goToNext();
                    } else if (swipe > 10000) {
                      goToPrevious();
                    }
                  }}
                  className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                >
                  <motion.img
                    src={projectPhotos[selectedPhotoIndex]}
                    alt={`${project.title} - Screenshot ${selectedPhotoIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{ x: xSpring }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Photo Counter */}
            <motion.div
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              {selectedPhotoIndex + 1} / {projectPhotos.length}
            </motion.div>

            {/* Thumbnail Strip */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              {projectPhotos.map((photo, idx) => (
                <motion.button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(idx > selectedPhotoIndex ? 1 : -1);
                    setSelectedPhotoIndex(idx);
                    x.set(0);
                  }}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === selectedPhotoIndex
                      ? 'border-white scale-110'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                  whileHover={{ scale: idx === selectedPhotoIndex ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={photo}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === selectedPhotoIndex && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      layoutId="selectedThumbnail"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

