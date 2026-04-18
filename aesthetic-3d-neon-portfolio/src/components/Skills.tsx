import { useEffect, useRef, useState } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: '◈',
    color: '#00d4ff',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Three.js / WebGL', level: 82 },
      { name: 'Tailwind CSS', level: 93 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: '◉',
    color: '#7b2fff',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Python / Django', level: 80 },
      { name: 'GraphQL', level: 78 },
      { name: 'REST APIs', level: 95 },
      { name: 'PostgreSQL', level: 85 },
    ],
  },
  {
    title: 'Tools & Cloud',
    icon: '◆',
    color: '#00ffff',
    skills: [
      { name: 'Docker / K8s', level: 75 },
      { name: 'AWS / GCP', level: 80 },
      { name: 'Git / CI-CD', level: 92 },
      { name: 'Firebase', level: 85 },
      { name: 'MongoDB', level: 82 },
    ],
  },
];

const techStack = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Three.js',
  'Next.js', 'GraphQL', 'Docker', 'AWS', 'MongoDB',
  'PostgreSQL', 'Redis', 'Tailwind', 'Git', 'Figma',
];

function SkillBar({ name, level, color, visible }: { name: string; level: number; color: string; visible: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-300 text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.95rem' }}>
          {name}
        </span>
        <span
          className="text-xs font-bold"
          style={{ fontFamily: 'Share Tech Mono, monospace', color }}
        >
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}88, 0 0 16px ${color}44`,
            transitionDelay: '200ms',
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      const children = sectionRef.current.querySelectorAll('.section-enter');
      children.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #7b2fff, transparent)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 section-enter">
          <p
            className="text-[#00d4ff] text-xs tracking-[8px] mb-3 neon-text-sm"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            &gt;_ MY ARSENAL
          </p>
          <h2
            className="text-4xl lg:text-5xl font-black gradient-text"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            SKILLS
          </h2>
          <div className="mt-4 mx-auto w-32 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
        </div>

        {/* Skill Categories */}
        <div className="grid lg:grid-cols-3 gap-8 section-enter">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="glass-card rounded-2xl p-6 project-card"
              style={{ border: `1px solid ${category.color}33` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" style={{ color: category.color, textShadow: `0 0 10px ${category.color}` }}>
                  {category.icon}
                </span>
                <h3
                  className="text-lg font-bold"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    color: category.color,
                    textShadow: `0 0 10px ${category.color}44`,
                  }}
                >
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="space-y-5">
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    visible={visible}
                  />
                ))}
              </div>

              {/* Corner decoration */}
              <div
                className="absolute bottom-3 right-3 w-6 h-6 border-b border-r"
                style={{ borderColor: category.color, opacity: 0.4 }}
              />
            </div>
          ))}
        </div>

        {/* Tech Stack Bubbles */}
        <div className="mt-16 section-enter">
          <p
            className="text-center text-gray-500 text-xs tracking-[6px] mb-8"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            TECH STACK
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <div
                key={tech}
                className="px-4 py-2 glass-card rounded-full border border-[rgba(0,212,255,0.2)] text-gray-300 text-sm cursor-default transition-all duration-300 hover:border-[#00d4ff] hover:text-[#00d4ff]"
                style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  animationDelay: `${i * 0.1}s`,
                  fontSize: '0.8rem',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 10px rgba(0,212,255,0.4), 0 0 20px rgba(0,212,255,0.2)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                  (e.currentTarget as HTMLElement).style.transform = '';
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
