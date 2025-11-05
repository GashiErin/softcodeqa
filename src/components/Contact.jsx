import React from 'react';
import { motion } from 'framer-motion';
import { slideDown, slideUp, slideRight, explosion, staggerContainer } from '../utils/motion.js';

export default function Contact() {

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-neutral-900/60 snap-start overflow-hidden">
      {/* OPTIMIZED BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-cyan-500/5 to-pink-500/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-green-500/5 blur-3xl" />
      
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={slideDown(0)}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
        >
          Let's build something extraordinary together.
          </motion.h2>
          <motion.p
            variants={slideUp(0.1)}
            className="text-neutral-300/90 text-lg max-w-2xl mx-auto"
          >
            Ready to bring your vision to life? Get in touch and let's create something amazing.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">

          {/* Contact Information */}
        <motion.div
            variants={slideRight(0.2)}
          initial="hidden"
          whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>
            
            {/* Email */}
            <motion.div
              variants={slideUp(0.3)}
              className="group p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <a 
                    href="mailto:softcodeea@gmail.com" 
                    className="text-neutral-300 hover:text-violet-400 transition-colors"
                  >
                    softcodeea@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={slideUp(0.4)}
              className="group p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <div className="flex flex-col">
                    <a 
                      href="tel:+38345219333" 
                      className="text-neutral-300 hover:text-violet-400 transition-colors"
                    >
                      +383 45 219 333
                    </a>
                    <a 
                      href="tel:+38344526537" 
                      className="text-neutral-300 hover:text-violet-400 transition-colors"
                    >
                      +383 44 526 537
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div
              variants={slideUp(0.5)}
              className="group p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Instagram</h4>
                  <a 
                    href="https://instagram.com/softcodeea" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-neutral-300 hover:text-violet-400 transition-colors"
                  >
                    @softcodeea
                  </a>
                </div>
              </div>
            </motion.div>

        </motion.div>
        </div>
      </div>
    </section>
  );
}


