import { useEffect, useRef } from 'react';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'Awards Won' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = sectionRef.current?.querySelectorAll('.section-enter');
    children?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 section-enter">
          <p
            className="text-[#00d4ff] text-xs tracking-[8px] mb-3 neon-text-sm"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            &gt;_ WHO AM I
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black gradient-text"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            ABOUT ME
          </h2>
          <div className="mt-4 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image / 3D card */}
          <div className="section-enter relative flex justify-center">
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              {/* Outer rotating rings */}
              <div
                className="absolute inset-0 rounded-full border border-[rgba(0,212,255,0.3)]"
                style={{ animation: 'rotateBorder 8s linear infinite' }}
              />
              <div
                className="absolute -inset-4 rounded-full border border-[rgba(123,47,255,0.2)]"
                style={{ animation: 'rotateBorder 12s linear infinite reverse' }}
              />
              <div
                className="absolute -inset-8 rounded-full border border-[rgba(0,212,255,0.1)]"
                style={{ animation: 'rotateBorder 20s linear infinite' }}
              />

              {/* Profile card */}
              <div className="absolute inset-0 rounded-2xl glass-card overflow-hidden neon-border">
                {/* Avatar placeholder */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,20,60,0.9) 0%, rgba(2,11,24,0.9) 100%)',
                  }}
                >
                  {/* SVG Avatar */}
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="58" stroke="#00d4ff" strokeWidth="0.5" opacity="0.5" />
                    <circle cx="60" cy="42" r="22" fill="rgba(0,212,255,0.15)" stroke="#00d4ff" strokeWidth="1" />
                    <path d="M20 100 Q20 75 60 75 Q100 75 100 100" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" strokeWidth="1" />
                    <circle cx="60" cy="42" r="16" fill="rgba(0,212,255,0.2)" />
                    <text x="60" y="48" textAnchor="middle" fill="#00d4ff" fontSize="20" fontFamily="Orbitron" fontWeight="bold">AM</text>
                  </svg>

                  <div className="mt-3 text-center">
                    <p className="text-white font-bold text-lg" style={{ fontFamily: 'Orbitron, sans-serif' }}>Alex Morgan</p>
                    <p className="text-[#00d4ff] text-xs tracking-widest mt-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>FULL STACK DEV</p>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#00d4ff]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#00d4ff]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#00d4ff]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#00d4ff]" />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6 section-enter">
            <h3
              className="text-2xl lg:text-3xl font-bold text-white"
              style={{ fontFamily: 'Orbitron, sans-serif', lineHeight: '1.4' }}
            >
              Building Digital{' '}
              <span className="gradient-text">Experiences</span>{' '}
              of Tomorrow
            </h3>

            <p className="text-gray-400 leading-relaxed text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              I'm a passionate full-stack developer with over 5 years of experience creating 
              stunning web applications. I specialize in bridging the gap between beautiful 
              design and powerful functionality.
            </p>

            <p className="text-gray-400 leading-relaxed text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              My expertise spans from crafting pixel-perfect UIs with{' '}
              <span className="text-[#00d4ff]">React & Three.js</span> to architecting robust 
              backends with <span className="text-[#7b2fff]">Node.js & Python</span>. 
              I thrive on challenges and love turning complex ideas into elegant solutions.
            </p>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { label: 'Name', value: 'Alex Morgan' },
                { label: 'Location', value: 'San Francisco, CA' },
                { label: 'Email', value: 'alex@dev.io' },
                { label: 'Availability', value: 'Open to Work' },
              ].map((item) => (
                <div key={item.label} className="flex gap-2">
                  <span className="text-[#00d4ff] text-sm" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {item.label}:
                  </span>
                  <span className="text-gray-300 text-sm truncate">{item.value}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-neon inline-block mt-4">
              Download CV
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 section-enter">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card neon-border rounded-xl p-6 text-center project-card"
            >
              <div
                className="text-3xl lg:text-4xl font-black gradient-text mb-2"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm tracking-widest" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {stat.label}
              </div>
              {/* Decorative line */}
              <div className="mt-3 mx-auto w-10 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
