import { useEffect, useRef } from 'react';

const experiences = [
  {
    year: '2023 – Present',
    role: 'Senior Full Stack Engineer',
    company: 'CyberNova Labs',
    description: 'Leading development of AI-powered SaaS platforms, architecting microservices on AWS, and mentoring a team of 8 engineers.',
    tags: ['React', 'Node.js', 'AWS', 'K8s'],
    color: '#00d4ff',
    side: 'left',
  },
  {
    year: '2021 – 2023',
    role: 'Frontend Lead',
    company: 'Quantum Digital Agency',
    description: 'Built immersive 3D web experiences for Fortune 500 clients. Led UI architecture for 20+ projects.',
    tags: ['Three.js', 'Next.js', 'Figma'],
    color: '#7b2fff',
    side: 'right',
  },
  {
    year: '2019 – 2021',
    role: 'Full Stack Developer',
    company: 'NeuralTech Startup',
    description: 'Developed real-time dashboards, REST APIs, and ML model integration for an early-stage AI startup.',
    tags: ['React', 'Python', 'PostgreSQL'],
    color: '#00ffff',
    side: 'left',
  },
  {
    year: '2018 – 2019',
    role: 'Junior Developer',
    company: 'ByteForge Solutions',
    description: 'Contributed to enterprise web apps, built responsive UIs and integrated third-party payment systems.',
    tags: ['JavaScript', 'PHP', 'MySQL'],
    color: '#00d4ff',
    side: 'right',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #00d4ff, #7b2fff, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 section-enter">
          <p
            className="text-[#00d4ff] text-xs tracking-[8px] mb-3 neon-text-sm"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            &gt;_ MY JOURNEY
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black gradient-text"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            EXPERIENCE
          </h2>
          <div className="mt-4 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden lg:block"
            style={{
              background: 'linear-gradient(180deg, transparent, #00d4ff44, #7b2fff44, transparent)',
              boxShadow: '0 0 8px rgba(0,212,255,0.3)',
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`section-enter relative flex flex-col lg:flex-row gap-8 items-start ${
                  exp.side === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="lg:w-5/12">
                  <div
                    className="glass-card rounded-2xl p-6 project-card"
                    style={{ border: `1px solid ${exp.color}33` }}
                  >
                    {/* Top bar */}
                    <div
                      className="h-0.5 w-16 mb-4 rounded-full"
                      style={{
                        background: exp.color,
                        boxShadow: `0 0 8px ${exp.color}`,
                      }}
                    />

                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3
                          className="text-base font-bold text-white"
                          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.9rem' }}
                        >
                          {exp.role}
                        </h3>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: exp.color, fontFamily: 'Share Tech Mono, monospace' }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className="text-xs text-gray-500 whitespace-nowrap ml-3"
                        style={{ fontFamily: 'Share Tech Mono, monospace' }}
                      >
                        {exp.year}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded"
                          style={{
                            background: `${exp.color}15`,
                            border: `1px solid ${exp.color}33`,
                            color: exp.color,
                            fontFamily: 'Share Tech Mono, monospace',
                            fontSize: '0.65rem',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex lg:w-2/12 justify-center">
                  <div
                    className="w-4 h-4 rounded-full mt-6 relative"
                    style={{
                      background: exp.color,
                      boxShadow: `0 0 12px ${exp.color}, 0 0 24px ${exp.color}66`,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: exp.color, opacity: 0.3 }}
                    />
                  </div>
                </div>

                {/* Empty space for opposite side */}
                <div className="hidden lg:block lg:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
