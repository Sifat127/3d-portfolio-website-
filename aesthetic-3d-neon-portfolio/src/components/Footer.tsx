export default function Footer() {
  return (
    <footer className="relative py-10 border-t border-[rgba(0,212,255,0.1)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top divider glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
            boxShadow: '0 0 10px #00d4ff',
          }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border border-[#00d4ff] flex items-center justify-center"
              style={{ boxShadow: '0 0 10px rgba(0,212,255,0.5)' }}
            >
              <span
                className="text-[#00d4ff] font-black text-xs"
                style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 6px #00d4ff' }}
              >
                AX
              </span>
            </div>
            <span
              className="text-gray-400 text-xs tracking-widest"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ALEX MORGAN
            </span>
          </div>

          {/* Copyright */}
          <p
            className="text-gray-600 text-xs"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            © {new Date().getFullYear()} ALEX.DEV — ALL RIGHTS RESERVED
          </p>

          {/* Links */}
          <div className="flex gap-6">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-gray-600 hover:text-[#00d4ff] transition-colors text-xs uppercase tracking-widest"
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom credits */}
        <div className="text-center mt-8">
          <p
            className="text-gray-700 text-xs"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            CRAFTED WITH ❤ USING REACT + THREE.JS + TAILWIND CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
