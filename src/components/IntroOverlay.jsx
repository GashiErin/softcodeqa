import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-neutral-950 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.3 }
          }}
          exit={{ 
            opacity: 0,
            transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {/* Logo Container */}
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -20,
              transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          >
            {/* Logo Image with Glow Effect */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0,
                transition: {
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3
                }
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 }
              }}
            >
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute inset-0 -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-pink-500/20 rounded-full blur-2xl" />
              </motion.div>
              
              <motion.img
                src="/logo-softcode.png"
                alt="SoftCodeEA"
                className="h-24 sm:h-32 md:h-40 w-auto relative z-10"
                style={{ filter: 'drop-shadow(0 0 30px rgba(167, 139, 250, 0.3))' }}
              />
            </motion.div>

            {/* Company Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.8
                }
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.2 }
              }}
              className="mt-6"
            >
              <motion.span
                className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent tracking-tight"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1 }
                }}
              >
                Build Your Website With US
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Animated Background Elements */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


