import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(2,11,24,0.9)] backdrop-blur-lg border-b border-[rgba(0,212,255,0.2)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <div
              className="absolute inset-0 rounded-full border-2 border-[#00d4ff] pulse-glow"
              style={{ boxShadow: '0 0 15px #00d4ff, 0 0 30px rgba(0,212,255,0.4)' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-orbitron font-black text-[#00d4ff] text-sm"
                style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 10px #00d4ff' }}
              >
                AX
              </span>
            </div>
          </div>
          <span
            className="text-xl font-bold tracking-widest gradient-text hidden sm:block"
            style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem' }}
          >
            ALEX.DEV
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link ${active === link.label ? 'active' : ''}`}
              onClick={() => setActive(link.label)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a href="#contact" className="hidden md:block btn-neon text-xs py-2 px-5">
          Hire Me
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block h-0.5 bg-[#00d4ff] transition-all duration-300 ${
                i === 0 ? 'w-6' : i === 1 ? `w-4 ${menuOpen ? 'w-6' : ''}` : 'w-5'
              }`}
              style={{ boxShadow: '0 0 5px #00d4ff' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[rgba(2,11,24,0.95)] backdrop-blur-xl border-b border-[rgba(0,212,255,0.2)] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link ${active === link.label ? 'active' : ''}`}
              onClick={() => {
                setActive(link.label);
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
