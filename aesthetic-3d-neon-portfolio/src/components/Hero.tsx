import { useEffect, useState } from 'react';
import HeroScene from './HeroScene';

const roles = [
  'Full Stack Developer',
  'UI/UX Designer',
  '3D Web Enthusiast',
  'Creative Coder',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
      }, 40);
    } else {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 z-0" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #7b2fff, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-20 pb-10">

          {/* Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 neon-border rounded-full glass-card">
              <span
                className="w-2 h-2 rounded-full bg-[#00d4ff] pulse-glow"
                style={{ boxShadow: '0 0 6px #00d4ff, 0 0 12px #00d4ff' }}
              />
              <span
                className="text-xs tracking-widest text-[#00d4ff]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                AVAILABLE FOR WORK
              </span>
            </div>

            {/* Name */}
            <div>
              <p
                className="text-[#00d4ff] text-sm tracking-[6px] mb-3 neon-text-sm"
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              >
                &gt; Hello, I'm
              </p>
              <h1
                className="text-6xl lg:text-7xl font-black leading-none mb-2"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <span className="gradient-text">ALEX</span>
              </h1>
              <h1
                className="text-6xl lg:text-7xl font-black leading-none text-white"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  textShadow: '0 0 30px rgba(0,212,255,0.3)',
                }}
              >
                MORGAN
              </h1>
            </div>

            {/* Typewriter Role */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                I'm a{' '}
              </span>
              <span
                className="text-xl font-semibold text-[#00d4ff] border-r-2 border-[#00d4ff] pr-1"
                style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  textShadow: '0 0 10px #00d4ff',
                  minWidth: '220px',
                  display: 'inline-block',
                }}
              >
                {displayed}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Crafting immersive digital experiences where{' '}
              <span className="text-[#00d4ff]">cutting-edge technology</span> meets{' '}
              <span className="text-[#7b2fff]">aesthetic design</span>. Building the future, one pixel at a time.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-neon">
                View My Work
              </a>
              <a
                href="#contact"
                className="btn-neon"
                style={{
                  borderColor: '#7b2fff',
                  color: '#7b2fff',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = 'rgba(123,47,255,0.1)';
                  (e.target as HTMLElement).style.boxShadow = '0 0 15px #7b2fff, 0 0 30px rgba(123,47,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = 'transparent';
                  (e.target as HTMLElement).style.boxShadow = 'none';
                }}
              >
                Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-2">
              {[
                { icon: 'GH', label: 'GitHub', href: '#' },
                { icon: 'LI', label: 'LinkedIn', href: '#' },
                { icon: 'TW', label: 'Twitter', href: '#' },
                { icon: 'DR', label: 'Dribbble', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center glass-card neon-border transition-all duration-300 hover:scale-110 hover:neon-border"
                  style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px #00d4ff, 0 0 30px rgba(0,212,255,0.4)';
                    (e.currentTarget as HTMLElement).style.color = '#00d4ff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                    (e.currentTarget as HTMLElement).style.color = '';
                  }}
                >
                  <span className="text-[#00d4ff]">{s.icon}</span>
                </a>
              ))}
              <div className="h-px flex-1 bg-gradient-to-r from-[rgba(0,212,255,0.5)] to-transparent max-w-24" />
            </div>
          </div>

          {/* 3D Scene */}
          <div className="relative h-[500px] lg:h-[600px]">
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #00d4ff 0%, #7b2fff 50%, transparent 70%)' }}
            />
            <HeroScene />

            {/* Stats floating cards */}
            <div
              className="absolute top-8 right-4 glass-card neon-border rounded-xl px-4 py-3 text-center float-anim"
              style={{ animationDelay: '0s' }}
            >
              <div className="text-2xl font-black gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>5+</div>
              <div className="text-xs text-gray-400 tracking-widest">YEARS EXP</div>
            </div>
            <div
              className="absolute bottom-16 left-4 glass-card neon-border rounded-xl px-4 py-3 text-center float-anim"
              style={{ animationDelay: '1s' }}
            >
              <div className="text-2xl font-black gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>50+</div>
              <div className="text-xs text-gray-400 tracking-widest">PROJECTS</div>
            </div>
            <div
              className="absolute bottom-8 right-16 glass-card neon-border rounded-xl px-4 py-3 text-center float-anim"
              style={{ animationDelay: '2s' }}
            >
              <div className="text-2xl font-black gradient-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>30+</div>
              <div className="text-xs text-gray-400 tracking-widest">CLIENTS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest text-gray-500" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          SCROLL
        </span>
        <div
          className="w-0.5 h-12 bg-gradient-to-b from-[#00d4ff] to-transparent"
          style={{ boxShadow: '0 0 8px #00d4ff' }}
        />
      </div>
    </section>
  );
}
