import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = -100, mouseY = -100; // offscreen init
    let ringX = -100, ringY = -100;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const raf = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const onEnter = () => {
      if (!ring) return;
      ring.style.scale = '1.3';
      ring.style.background = 'rgba(255,255,255,0.08)';
    };
    const onLeave = () => {
      if (!ring) return;
      ring.style.scale = '1';
      ring.style.background = 'transparent';
    };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"], .interactive').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.querySelectorAll('a, button, [role="button"], .interactive').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[60] size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-700/80 transition-[scale,background] duration-200" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[61] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-200" />
    </>
  );
}


