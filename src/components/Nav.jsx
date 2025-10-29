import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-colors ${scrolled ? 'backdrop-blur-sm/0 bg-neutral-950/70 border-b border-neutral-900/60' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">Agency</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-300">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#clients" className="hover:text-white transition-colors">Clients</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="sm:hidden p-2 text-neutral-300 hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center relative">
            <motion.span
              className="w-5 h-0.5 bg-current block absolute"
              animate={mobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
            <motion.span
              className="w-5 h-0.5 bg-current block absolute"
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-current block absolute"
              animate={mobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="sm:hidden bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-900/60"
          >
            <nav className="px-6 py-4 space-y-4">
              <a
                href="#about"
                onClick={closeMobileMenu}
                className="block text-neutral-300 hover:text-white transition-colors py-2"
              >
                About
              </a>
              <a
                href="#work"
                onClick={closeMobileMenu}
                className="block text-neutral-300 hover:text-white transition-colors py-2"
              >
                Work
              </a>
              <a
                href="#clients"
                onClick={closeMobileMenu}
                className="block text-neutral-300 hover:text-white transition-colors py-2"
              >
                Clients
              </a>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="block text-neutral-300 hover:text-white transition-colors py-2"
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ scaleX }} className="h-0.5 origin-left accent-gradient" />
    </header>
  );
}


