import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-colors ${scrolled ? 'backdrop-blur-sm/0 bg-neutral-950/70 border-b border-neutral-900/60' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">Agency</a>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-300">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#clients" className="hover:text-white">Clients</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
      <motion.div style={{ scaleX }} className="h-0.5 origin-left accent-gradient" />
    </header>
  );
}


