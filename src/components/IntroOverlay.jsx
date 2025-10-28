import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-neutral-950"
          initial={{ y: 0 }}
          animate={{ y: '-100%', transition: { delay: 0.7, duration: 0.8, ease: [0.22,1,0.36,1] } }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-400 text-xs tracking-widest">Initializing experience…</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


