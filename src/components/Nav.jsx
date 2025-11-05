import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight group">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.5
              }
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.img 
              src="/logo-softcode.png" 
              alt="SoftCodeEA" 
              className="h-8 w-auto"
              whileHover={{ 
                filter: 'drop-shadow(0 0 10px rgba(167, 139, 250, 0.5))',
                transition: { duration: 0.2 }
              }}
            />
          </motion.div>
          <motion.span 
            className="hidden sm:inline bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.7
              }
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            SoftCodeEA
          </motion.span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-300">
          {[
            { label: 'About', href: '#about' },
            { label: 'Work', href: '#work' },
            { label: 'Clients', href: '#clients' },
            { label: 'Contact', href: '#contact' }
          ].map((item, idx) => {
            const href = location.pathname === '/' ? item.href : `/${item.href}`;
            return (
              <motion.a
                key={item.label}
                href={href}
                className="hover:text-white transition-colors relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 1.8 + idx * 0.1
                  }
                }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            );
          })}
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
                href={location.pathname === '/' ? '#about' : '/#about'}
                onClick={closeMobileMenu}
                className="block text-neutral-300 hover:text-white transition-colors py-2"
              >
                About
              </a>
              <a
                href={location.pathname === '/' ? '#work' : '/#work'}
                onClick={closeMobileMenu}
                className="block text-neutral-300 hover:text-white transition-colors py-2"
              >
                Work
              </a>
              <a
                href={location.pathname === '/' ? '#clients' : '/#clients'}
                onClick={closeMobileMenu}
                className="block text-neutral-300 hover:text-white transition-colors py-2"
              >
                Clients
              </a>
              <a
                href={location.pathname === '/' ? '#contact' : '/#contact'}
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


