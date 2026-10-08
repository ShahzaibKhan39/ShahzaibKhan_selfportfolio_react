import React from 'react';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import './Footer.css';

const socials = [
  { label: 'Facebook', icon: FaFacebookF, href: 'https://www.facebook.com/Rao.Shahzaib.khan.7' },
  { label: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/rao_shahzaib.khan/' },
  { label: 'GitHub', icon: FaGithub, href: 'https://github.com/ShahzaibKhan39' },
  { label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/shahzaib-khan-3401ab294/?isSelfProfile=true' },
];

const navLinks = [
  { label: 'About', href: '#contact' },
  { label: 'Services', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  return (
    <footer className="footer-animate-up footer-grid-bg bg-ink text-gray-400 border-t border-white/10 px-6 lg:pl-32 lg:pr-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div>
            <span className="text-white font-serif text-2xl">Shahzaib Khan</span>
            <p className="text-sm mt-3 max-w-xs">
              Digital product designer and full-stack engineer building across the MERN ecosystem.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Connect</p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="footer-social-link border-hair-light p-2.5"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 mt-6 border-hair-light px-3 py-2">
              <span className="status-dot w-2 h-2 rounded-full bg-accent" />
              <span className="text-xs uppercase tracking-wide text-gray-300">MERN Backend Powered</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-xs text-gray-500">
          <p>© 2026 Shahzaib Khan. All rights reserved.</p>
          <p>Built with React · Node.js · Express · MongoDB</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;