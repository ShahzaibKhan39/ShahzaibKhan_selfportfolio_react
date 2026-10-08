import React, { useState } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import './Sidebar.css';

const links = [
  { label: 'About', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop floating vertical rail */}
      <aside className="sidebar-rail d-none d-lg-flex fixed left-0 top-0 h-screen z-50 flex-col items-center justify-between py-10">
        <a href="#top" className="sidebar-brand text-xs font-semibold uppercase text-ink cursor-pointer">
          Shahzaib Khan
        </a>

        <nav className="flex flex-col items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="sidebar-link text-xs uppercase font-medium text-steel"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <span className="text-[10px] uppercase tracking-widest text-steel" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          MERN Engineer
        </span>

        {/* Small admin button, bottom-left corner of the rail */}
        <a href="/login" className="sidebar-admin" aria-label="Admin login" title="Admin">
          <ShieldCheck className="w-4 h-4" />
        </a>
      </aside>

      {/* Mobile top bar */}
      <header className="mobile-topbar d-flex d-lg-none fixed top-0 left-0 w-full z-50 items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-bold uppercase tracking-widest text-ink">
          Shahzaib Khan
        </a>
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className="p-2 border-hair"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {open && (
        <div className="d-lg-none fixed inset-0 z-40 bg-fog pt-24 px-6">
          <nav className="flex flex-col gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-2xl font-serif border-b border-hair pb-4"
              >
                {link.label}
              </a>
            ))}
            <a href="/login" className="text-sm uppercase tracking-widest text-steel">
              Admin
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;