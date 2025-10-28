import React from 'react';
import { motion } from 'framer-motion';

export default function Section({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}


