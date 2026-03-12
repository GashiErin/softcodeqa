import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900/60 py-8 snap-none">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
        <div className="flex items-center gap-2">
          <img src="/logo-softcode.png" alt="SoftCodeEA" className="h-5 w-auto" />
          <span>© 2026 SoftCodeEA</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="#" className="hover:text-neutral-200">Home</a>
          <a href="#work" className="hover:text-neutral-200">Work</a>
          <a href="#contact" className="hover:text-neutral-200">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Twitter" className="hover:text-neutral-200">TW</a>
          <a href="#" aria-label="Instagram" className="hover:text-neutral-200">IG</a>
          <a href="#" aria-label="LinkedIn" className="hover:text-neutral-200">IN</a>
        </div>
      </div>
    </footer>
  );
}


