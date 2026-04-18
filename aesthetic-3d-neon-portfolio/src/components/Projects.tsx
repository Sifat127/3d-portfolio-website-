import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'NeoCypher Dashboard',
    category: 'Full Stack',
    description:
      'A cyberpunk-themed analytics platform with real-time data visualization, AI-powered insights, and immersive 3D charts built with Three.js.',
    tags: ['React', 'Three.js', 'Node.js', 'MongoDB'],
    color: '#00d4ff',
    gradient: 'from-[#001a40] to-[#020b18]',
    icon: '◈',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Quantum Commerce',
    category: 'E-Commerce',
    description:
      'Next-gen shopping experience with AR product preview, AI recommendations, and seamless checkout flow built on Next.js.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    color: '#7b2fff',
    gradient: 'from-[#1a003a] to-[#020b18]',
    icon: '◉',
    github: '#',
    live: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'NeuralChat AI',
    category: 'AI/ML',
    description:
      'Real-time AI chat application with voice recognition, sentiment analysis, and multi-model LLM support.',
    tags: ['Python', 'FastAPI', 'WebSocket', 'OpenAI'],
    color: '#00ffff',
    gradient: 'from-[#001a1a] to-[#020b18]',
    icon: '◆',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'AstroVault NFT',
    category: 'Web3',
    description:
      'NFT marketplace with blockchain integration, digital art showcase, and decentralized auction system.',
    tags: ['Web3.js', 'Solidity', 'React', 'IPFS'],
    color: '#00d4ff',
    gradient: 'from-[#001040] to-[#020b18]',
    icon: '◈',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Orbital DevOps',
    category: 'DevOps',
    description:
      'Cloud infrastructure management tool with CI/CD pipelines visualization, Kubernetes monitoring, and automated deployments.',
    tags: ['Docker', 'K8s', 'AWS', 'Terraform'],
    color: '#7b2fff',
    gradient: 'from-[#1a0030] to-[#020b18]',
    icon: '◉',
    github: '#',
    live: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'SynthWave Music',
    category: 'Creative',
    description:
      'Interactive music visualizer with WebGL audio-reactive animations, 3D waveforms, and beat detection.',
    tags: ['Three.js', 'Web Audio API', 'GLSL', 'React'],
    color: '#00ffff',
    gradient: 'from-[#001520] to-[#020b18]',
    icon: '◆',
    github: '#',
    live: '#',
    featured: false,
  },
];

const filters = ['All', 'Full Stack', 'E-Commerce', 'AI/ML', 'Web3', 'DevOps', 'Creative'];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

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
    <section id="projects" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-64 blur-3xl opacity-10"
          style={{ background: 'radial-gradient(ellipse, #00d4ff, transparent)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 section-enter">
          <p
            className="text-[#00d4ff] text-xs tracking-[8px] mb-3 neon-text-sm"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            &gt;_ WHAT I'VE BUILT
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black gradient-text"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            PROJECTS
          </h2>
          <div className="mt-4 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 section-enter">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-4 py-2 text-xs rounded-full transition-all duration-300"
              style={{
                fontFamily: 'Share Tech Mono, monospace',
                border: `1px solid ${activeFilter === filter ? '#00d4ff' : 'rgba(0,212,255,0.2)'}`,
                color: activeFilter === filter ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                background: activeFilter === filter ? 'rgba(0,212,255,0.1)' : 'transparent',
                boxShadow: activeFilter === filter ? '0 0 10px rgba(0,212,255,0.3)' : 'none',
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 section-enter">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`relative glass-card rounded-2xl overflow-hidden project-card cursor-pointer`}
              style={{
                border: `1px solid ${hoveredId === project.id ? project.color : project.color + '33'}`,
                boxShadow: hoveredId === project.id
                  ? `0 0 20px ${project.color}44, 0 0 40px ${project.color}22`
                  : 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Top gradient bar */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
                  boxShadow: `0 0 10px ${project.color}`,
                }}
              />

              {/* Card header */}
              <div className={`bg-gradient-to-br ${project.gradient} p-6 pb-4`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span
                      className="text-xs tracking-widest opacity-60"
                      style={{ fontFamily: 'Share Tech Mono, monospace', color: project.color }}
                    >
                      {project.category}
                    </span>
                    <h3
                      className="text-lg font-bold text-white mt-1"
                      style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem' }}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className="text-3xl"
                    style={{
                      color: project.color,
                      textShadow: `0 0 15px ${project.color}`,
                    }}
                  >
                    {project.icon}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mt-3 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="px-6 py-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded"
                    style={{
                      fontFamily: 'Share Tech Mono, monospace',
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}33`,
                      color: project.color,
                      fontSize: '0.65rem',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="px-6 pb-5 flex gap-4">
                <a
                  href={project.github}
                  className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                  style={{ fontFamily: 'Share Tech Mono, monospace' }}
                >
                  <span style={{ color: project.color }}>{'<'}</span>
                  Code
                  <span style={{ color: project.color }}>{'>'}</span>
                </a>
                <a
                  href={project.live}
                  className="flex items-center gap-2 text-xs transition-all"
                  style={{ fontFamily: 'Share Tech Mono, monospace', color: project.color }}
                >
                  ↗ Live Demo
                </a>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r" style={{ borderColor: project.color, opacity: 0.4 }} />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l" style={{ borderColor: project.color, opacity: 0.4 }} />
            </div>
          ))}
        </div>

        {/* View All button */}
        <div className="text-center mt-12 section-enter">
          <a href="#" className="btn-neon">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}
