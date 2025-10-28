export const fadeUp = (delay = 0, distance = 24, duration = 0.8) => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
});


// Additional directional slides
export const slideUp = (delay = 0, distance = 32, duration = 0.8) => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

export const slideDown = (delay = 0, distance = 32, duration = 0.8) => ({
  hidden: { opacity: 0, y: -distance },
  visible: { opacity: 1, y: 0, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

export const slideLeft = (delay = 0, distance = 40, duration = 0.8) => ({
  hidden: { opacity: 0, x: distance },
  visible: { opacity: 1, x: 0, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

export const slideRight = (delay = 0, distance = 40, duration = 0.8) => ({
  hidden: { opacity: 0, x: -distance },
  visible: { opacity: 1, x: 0, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

// Blur in utility
export const blurIn = (delay = 0, amount = 8, duration = 0.7) => ({
  hidden: { opacity: 0, filter: `blur(${amount}px)` },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

// Text reveal (word-by-word)
export const textReveal = (delay = 0, duration = 0.6) => ({
  hidden: { y: '100%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

// Floating loop for decorative shapes
export const floatLoop = (range = 12, duration = 4, delay = 0) => ({
  animate: {
    y: [0, -range, 0, range, 0],
    x: [0, range * 0.5, 0, -range * 0.5, 0],
    transition: { delay, duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

// Marquee helper
export const marquee = (speed = 60, from = 0, to = -50) => ({
  animate: {
    x: [`${from}%`, `${to}%`],
    transition: { duration: speed, ease: 'linear', repeat: Infinity },
  },
});

// Rotational entrances
export const rotateIn = (delay = 0, angle = 8, distance = 40, duration = 0.8) => ({
  hidden: { opacity: 0, rotate: angle, x: distance },
  visible: { opacity: 1, rotate: 0, x: 0, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

export const rotateInLeft = (delay = 0, angle = -8, distance = -40, duration = 0.8) => ({
  hidden: { opacity: 0, rotate: angle, x: distance },
  visible: { opacity: 1, rotate: 0, x: 0, transition: { delay, duration, ease: [0.22, 1, 0.36, 1] } },
});

// CRAZY ANIMATIONS
export const morphing = (delay = 0, duration = 3) => ({
  animate: {
    scale: [1, 1.2, 0.8, 1.1, 1],
    rotate: [0, 180, 360, 180, 0],
    borderRadius: ['0%', '50%', '25%', '75%', '0%'],
    transition: { delay, duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

export const floating = (delay = 0, range = 20, duration = 4) => ({
  animate: {
    y: [0, -range, range, -range/2, 0],
    x: [0, range/2, -range/2, range, 0],
    rotate: [0, 90, -90, 180, 0],
    transition: { delay, duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

export const pulse = (delay = 0, scale = 1.1, duration = 2) => ({
  animate: {
    scale: [1, scale, 1],
    opacity: [0.5, 1, 0.5],
    transition: { delay, duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

export const wiggle = (delay = 0, intensity = 10, duration = 0.5) => ({
  animate: {
    x: [0, -intensity, intensity, -intensity/2, intensity/2, 0],
    transition: { delay, duration, repeat: Infinity, ease: 'easeInOut' },
  },
});

export const explosion = (delay = 0) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: [0, 1.5, 1], 
    opacity: [0, 1, 0.8],
    transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
});

export const flip3D = (delay = 0, duration = 0.8) => ({
  hidden: { rotateY: -90, opacity: 0 },
  visible: { 
    rotateY: 0, 
    opacity: 1,
    transition: { delay, duration, ease: [0.22, 1, 0.36, 1] }
  },
});

export const spiral = (delay = 0, duration = 2) => ({
  animate: {
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    transition: { delay, duration, repeat: Infinity, ease: 'linear' },
  },
});

export const wave = (delay = 0, amplitude = 20, duration = 3) => ({
  animate: {
    y: [0, -amplitude, amplitude, -amplitude/2, 0],
    transition: { delay, duration, repeat: Infinity, ease: 'easeInOut' },
  },
});


