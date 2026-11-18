import { useRef, useState } from 'react';
import { ArrowUpRight, BrainCircuit, ChevronLeft, ChevronRight, Flame, ScanLine } from 'lucide-react';

const projects = [
  {
    id: 'alpa',
    number: '01',
    codename: 'A—01 / COGNITIVE SYSTEM',
    title: 'AlpaGenAI',
    label: 'AI-based assistant',
    kicker: 'Less digital noise. More useful intelligence.',
    description:
      'A natural-language assistant concept designed to make daily work feel lighter—not louder. It brings scheduling, reminders, summarization, mindfulness, and focus into one adaptive interface.',
    details: [
      'Learns user habits for personalized interactions',
      'Modular architecture for multi-platform integration',
      'Human-centered UI designed to reduce digital fatigue',
    ],
    tech: ['NLP', 'Python', 'Automation', 'Adaptive UX'],
    icon: BrainCircuit,
    accent: 'cyan',
    signal: '92.8',
  },
  {
    id: 'fire',
    number: '02',
    codename: 'F—02 / INDUSTRIAL SAFETY',
    title: 'Fire Discharge System',
    label: 'Preventive safety system',
    kicker: 'Detect the risk before ignition.',
    description:
      'A smart prevention and response concept for factories and industrial environments. The system combines automated detection with established fire-safety methods for reliable, real-time protection.',
    details: [
      'Surfaces potential hazards at an early stage',
      'Triggers an automated response when risk is detected',
      'Designed around safety, reliability, and prevention',
    ],
    tech: ['Sensors', 'Automation', 'Safety Logic', 'Real-time'],
    icon: Flame,
    accent: 'lime',
    signal: '97.4',
  },
];

function ProjectGlyph({ project }) {
  const isFire = project.id === 'fire';
  return (
    <div className={`project-glyph ${isFire ? 'is-fire' : ''}`} aria-hidden="true">
      <div className="glyph-ring glyph-ring-a" />
      <div className="glyph-ring glyph-ring-b" />
      <div className="glyph-reticle"><ScanLine size={18} /></div>
      <svg viewBox="0 0 320 320" role="presentation">
        <defs>
          <linearGradient id={`beam-${project.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={isFire ? '#caff3d' : '#37ffe4'} stopOpacity="0.1" />
            <stop offset="0.5" stopColor={isFire ? '#caff3d' : '#37ffe4'} stopOpacity="1" />
            <stop offset="1" stopColor="#ff4ea7" stopOpacity="0.2" />
          </linearGradient>
          <filter id={`glow-${project.id}`}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="160" cy="160" r="110" fill="none" stroke="rgba(255,255,255,.06)" strokeDasharray="4 9" />
        {isFire ? (
          <>
            <path d="M160 62 C190 105 229 127 220 182 C213 226 181 251 159 258 C127 246 97 219 97 180 C97 142 120 126 129 97 C139 115 147 126 153 142 C167 120 169 94 160 62Z" fill="none" stroke={`url(#beam-${project.id})`} strokeWidth="3" filter={`url(#glow-${project.id})`} />
            <path d="M161 139 C181 167 187 183 178 205 C171 222 155 229 143 215 C130 199 137 178 151 158Z" fill="rgba(202,255,61,.08)" stroke="#caff3d" strokeWidth="2" />
            {[[-74,-46],[70,-66],[-86,54],[86,48]].map(([x,y], i) => <circle key={i} cx={160+x} cy={160+y} r="4" fill="#caff3d" />)}
          </>
        ) : (
          <>
            <path d="M96 166 C98 122 123 95 160 95 C202 95 227 126 224 167 C221 204 197 228 160 229 C121 227 95 204 96 166Z" fill="rgba(55,255,228,.035)" stroke={`url(#beam-${project.id})`} strokeWidth="2.5" filter={`url(#glow-${project.id})`} />
            <path d="M118 130 L150 153 L181 121 L208 160 L179 197 L139 190 L118 130Z" fill="none" stroke="#37ffe4" strokeWidth="1.6" />
            {[[118,130],[150,153],[181,121],[208,160],[179,197],[139,190],[160,164]].map(([x,y], i) => <circle key={i} cx={x} cy={y} r={i === 6 ? 7 : 4} fill={i === 6 ? '#eaffe8' : '#37ffe4'} />)}
            <line x1="150" y1="153" x2="160" y2="164" stroke="#37ffe4" />
            <line x1="181" y1="121" x2="160" y2="164" stroke="#37ffe4" />
            <line x1="179" y1="197" x2="160" y2="164" stroke="#37ffe4" />
          </>
        )}
      </svg>
      <div className="glyph-data glyph-data-top">SYNC / {project.signal}%</div>
      <div className="glyph-data glyph-data-bottom">LIVE PROTOTYPE</div>
    </div>
  );
}

export default function ProjectLab() {
  const [active, setActive] = useState(0);
  const cardRef = useRef(null);
  const project = projects[active];
  const Icon = project.icon;

  const selectProject = (index) => setActive((index + projects.length) % projects.length);
  const handleMove = (event) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty('--tilt-x', `${y * -3.2}deg`);
    cardRef.current.style.setProperty('--tilt-y', `${x * 4.2}deg`);
    cardRef.current.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    cardRef.current.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  };
  const resetTilt = () => {
    cardRef.current?.style.setProperty('--tilt-x', '0deg');
    cardRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div className="project-lab">
      <div className="project-switcher" aria-label="Choose a project">
        {projects.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === active ? 'active' : ''}
            onClick={() => selectProject(index)}
            aria-pressed={index === active}
          >
            <span>{item.number}</span>
            <strong>{item.title}</strong>
            <small>{item.label}</small>
          </button>
        ))}
      </div>

      <article
        key={project.id}
        ref={cardRef}
        className={`project-case accent-${project.accent}`}
        onPointerMove={handleMove}
        onPointerLeave={resetTilt}
      >
        <div className="case-glow" />
        <div className="case-topline">
          <span><i className="status-light" /> CASE FILE {project.number}</span>
          <span>CLASS / PERSONAL R&amp;D</span>
          <span>STATUS / CONCEPT</span>
        </div>

        <div className="case-grid">
          <div className="case-copy">
            <div className="project-code"><Icon size={16} /> {project.codename}</div>
            <h3>{project.title}</h3>
            <p className="project-kicker">{project.kicker}</p>
            <p className="project-description">{project.description}</p>
            <ul>
              {project.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
            <div className="tag-row">
              {project.tech.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="case-visual">
            <ProjectGlyph project={project} />
          </div>
        </div>

        <div className="case-footer">
          <div><span>ROLE</span><strong>Concept · Design · Research</strong></div>
          <div><span>DOMAIN</span><strong>{project.id === 'fire' ? 'Industrial IoT' : 'Applied AI'}</strong></div>
          <div className="case-controls">
            <button type="button" onClick={() => selectProject(active - 1)} aria-label="Previous project"><ChevronLeft /></button>
            <span>{String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => selectProject(active + 1)} aria-label="Next project"><ChevronRight /></button>
          </div>
        </div>
      </article>

      <a className="project-brief-link" href="#contact">
        Interested in the thinking behind these systems? <span>Start a conversation <ArrowUpRight size={15} /></span>
      </a>
    </div>
  );
}
