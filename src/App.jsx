import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Clients from './components/Clients.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import IntroOverlay from './components/IntroOverlay.jsx';

function App() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '120deg']);
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ rotate }}
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_60%,rgba(167,139,250,0.15),rgba(34,211,238,0.12),transparent_60%)]" />
      </motion.div>
      <IntroOverlay />
      <Cursor />
      <Nav />
      <div className="snap-y snap-mandatory">
        <Hero />
        <About />
        <Work />
        <Clients />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;


