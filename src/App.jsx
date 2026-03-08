import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav.jsx';
import IntroOverlay from './components/IntroOverlay.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';

function HomePage() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], ['0deg', '120deg']);
  
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
      <IntroOverlay />
      <Nav />
      <div className="snap-y snap-mandatory">
        <Hero />
        <About />
        <Work />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;


