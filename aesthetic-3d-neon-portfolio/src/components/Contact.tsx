import { useEffect, useRef, useState } from 'react';

const contactInfo = [
  {
    icon: '◈',
    label: 'Email',
    value: 'alex@dev.io',
    href: 'mailto:alex@dev.io',
    color: '#00d4ff',
  },
  {
    icon: '◉',
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
    color: '#7b2fff',
  },
  {
    icon: '◆',
    label: 'Availability',
    value: 'Open for Projects',
    href: '#',
    color: '#00ffff',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const children = sectionRef.current?.querySelectorAll('.section-enter');
    children?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const inputClass = `
    w-full bg-[rgba(0,15,40,0.6)] border border-[rgba(0,212,255,0.2)] rounded-lg px-4 py-3
    text-white text-sm outline-none transition-all duration-300
    placeholder-gray-600 focus:border-[#00d4ff] focus:shadow-[0_0_10px_rgba(0,212,255,0.3)]
  `;

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-1/4 bottom-0 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #7b2fff, transparent)' }}
        />
        <div
          className="absolute right-1/4 top-0 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 section-enter">
          <p
            className="text-[#00d4ff] text-xs tracking-[8px] mb-3 neon-text-sm"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            &gt;_ GET IN TOUCH
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black gradient-text"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            CONTACT
          </h2>
          <div className="mt-4 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
          <p className="text-gray-400 mt-6 max-w-lg mx-auto" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Have a project in mind? Let's build something extraordinary together. 
            I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6 section-enter">
            <h3
              className="text-xl font-bold text-white mb-6"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem' }}
            >
              Let's <span className="gradient-text">Connect</span>
            </h3>

            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 glass-card rounded-xl p-4 project-card group"
                style={{ border: `1px solid ${item.color}33` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}44`,
                    color: item.color,
                    textShadow: `0 0 10px ${item.color}`,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest mb-1"
                    style={{ fontFamily: 'Share Tech Mono, monospace', color: item.color }}
                  >
                    {item.label}
                  </p>
                  <p className="text-white text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="pt-4">
              <p
                className="text-xs tracking-[4px] text-gray-500 mb-4"
                style={{ fontFamily: 'Share Tech Mono, monospace' }}
              >
                FIND ME ON
              </p>
              <div className="flex gap-3">
                {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-3 py-2 glass-card rounded-lg text-xs text-gray-400 hover:text-[#00d4ff] transition-all duration-300 hover:border-[#00d4ff]"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      border: '1px solid rgba(0,212,255,0.2)',
                      fontSize: '0.7rem',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(0,212,255,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '';
                    }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 section-enter">
            <form
              onSubmit={handleSubmit}
              className="glass-card neon-border rounded-2xl p-8 space-y-5"
            >
              {/* Header decoration */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#ff5555]" />
                <div className="w-2 h-2 rounded-full bg-[#ffaa00]" />
                <div className="w-2 h-2 rounded-full bg-[#00d4ff] pulse-glow" style={{ boxShadow: '0 0 6px #00d4ff' }} />
                <div className="flex-1 h-px bg-[rgba(0,212,255,0.1)]" />
                <span
                  className="text-xs text-gray-600"
                  style={{ fontFamily: 'Share Tech Mono, monospace' }}
                >
                  message.send()
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-xs mb-2 text-[#00d4ff]"
                    style={{ fontFamily: 'Share Tech Mono, monospace' }}
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs mb-2 text-[#00d4ff]"
                    style={{ fontFamily: 'Share Tech Mono, monospace' }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs mb-2 text-[#00d4ff]"
                  style={{ fontFamily: 'Share Tech Mono, monospace' }}
                >
                  SUBJECT
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Project Discussion"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>

              <div>
                <label
                  className="block text-xs mb-2 text-[#00d4ff]"
                  style={{ fontFamily: 'Share Tech Mono, monospace' }}
                >
                  MESSAGE
                </label>
                <textarea
                  rows={5}
                  className={inputClass}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  style={{ fontFamily: 'Rajdhani, sans-serif', resize: 'none' }}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">
                {sent ? (
                  <div
                    className="w-full py-3 text-center rounded-lg text-sm"
                    style={{
                      border: '1px solid #00ff88',
                      color: '#00ff88',
                      background: 'rgba(0,255,136,0.1)',
                      fontFamily: 'Share Tech Mono, monospace',
                      boxShadow: '0 0 15px rgba(0,255,136,0.3)',
                    }}
                  >
                    ✓ MESSAGE TRANSMITTED SUCCESSFULLY
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full btn-neon"
                    style={{ opacity: sending ? 0.7 : 1 }}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">◈</span>
                        TRANSMITTING...
                      </span>
                    ) : (
                      'SEND MESSAGE →'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
