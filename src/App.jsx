import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  Code2,
  Download,
  DraftingCompass,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Palette,
  Phone,
  Radio,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import CyberScene from './components/CyberScene';
import ProjectLab from './components/ProjectLab';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  ['Competitive Programming', 'Developing problem-solving skills through competitive programming at CPS Academy.'],
  ['Programming Fundamentals', 'Building a foundation in computer science, algorithms, and software development.'],
  ['Leadership', 'Leading event coordination and contributing to student organizations and volunteer programs.'],
  ['Communication', 'Communicating clearly across academic, volunteer, and event environments.'],
  ['Team Collaboration', 'Working actively with university clubs and community groups toward shared goals.'],
  ['Community Engagement', 'Supporting volunteering, environmental awareness, and student orientation initiatives.'],
];

const education = [
  {
    period: 'IN PROGRESS',
    title: 'Bachelor of Science in Computer Science',
    school: 'Daffodil International University',
    meta: 'General member, DIU CPC Club · Competitive Programming course, CPS Academy',
    current: true,
  },
  {
    period: '2023',
    title: 'Higher Secondary Certificate · Science',
    school: 'Chandpur Government College',
    meta: 'GPA 5.00 / 5.00',
  },
];

const achievements = [
  {
    year: '2023',
    rank: 'MERIT',
    title: 'Merit Scholarship',
    text: 'Awarded by Chandpur Government College on the basis of HSC examination results.',
  },
];

function LoadingScreen({ done }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const value = Math.min(100, Math.round(((now - start) / 1450) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(tick);
      else setTimeout(done, 220);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [done]);

  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader-noise" />
      <div className="loader-mark"><span>S</span><i /></div>
      <div className="loader-copy">
        <span>INITIALIZING PORTFOLIO / 2066</span>
        <strong>{String(progress).padStart(3, '0')}%</strong>
      </div>
      <div className="loader-track"><i style={{ width: `${progress}%` }} /></div>
      <p>CALIBRATING CREATIVE INTELLIGENCE</p>
    </div>
  );
}

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    let x = -50;
    let y = -50;
    let rx = -50;
    let ry = -50;
    let frame;
    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      dot.current?.style.setProperty('transform', `translate3d(${x}px, ${y}px, 0)`);
    };
    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      ring.current?.style.setProperty('transform', `translate3d(${rx}px, ${ry}px, 0)`);
      frame = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    loop();
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <><span ref={ring} className="cursor-ring" /><span ref={dot} className="cursor-dot" /></>;
}

function SectionHeading({ index, label, title, aside }) {
  return (
    <div className="section-heading reveal">
      <div className="section-kicker"><span>{index}</span> {label}</div>
      <h2>{title}</h2>
      {aside && <p>{aside}</p>}
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fxOn, setFxOn] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [copied, setCopied] = useState(false);
  const root = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) setFxOn(false);
  }, []);

  useEffect(() => {
    if (!loaded) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.92,
    });
    lenis.on('scroll', ScrollTrigger.update);
    return () => lenis.destroy();
  }, [loaded]);

  useEffect(() => {
    if (!loaded || !root.current) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.hero .eyebrow, .hero-title span, .hero-copy, .hero-actions, .hero-metrics', {
        y: 34,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: 'power3.out',
      });
      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.from(item, {
          y: 46,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);
    return () => ctx.revert();
  }, [loaded]);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-38% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [loaded]);

  const closeMenu = () => setMenuOpen(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('252-15-304@diu.edu.bd');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = 'mailto:252-15-304@diu.edu.bd';
    }
  };
  const sendMessage = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.get('name')}`);
    const body = encodeURIComponent(`Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`);
    window.location.href = `mailto:252-15-304@diu.edu.bd?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {!loaded && <LoadingScreen done={() => setLoaded(true)} />}
      <div ref={root} className={`site-shell ${loaded ? 'is-loaded' : 'is-loading'} ${fxOn ? '' : 'fx-off'}`}>
        <Cursor />
        <CyberScene enabled={fxOn} />
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        <div ref={progressRef} className="scroll-progress" />

        <header className="site-header">
          <a className="brand" href="#home" aria-label="Imteaz Hossain, home">
            <span className="brand-mark">I<i /></span>
            <span className="brand-name">IMTEAZ<small>HOSSAIN</small></span>
          </a>
          <nav className={menuOpen ? 'open' : ''} aria-label="Primary navigation">
            {['home', 'about', 'work', 'journey', 'contact'].map((item, index) => (
              <a key={item} href={`#${item}`} onClick={closeMenu} className={activeSection === item ? 'active' : ''}>
                <span>0{index + 1}</span>{item === 'work' ? 'projects' : item}
              </a>
            ))}
          </nav>
          <div className="header-tools">
            <button type="button" className="fx-toggle" onClick={() => setFxOn((value) => !value)} aria-pressed={fxOn} title="Toggle 3D effects">
              <Radio size={14} /> FX {fxOn ? 'ON' : 'OFF'}
            </button>
            <a className="header-cta" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        <main id="main">
          <section id="home" className="hero">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="eyebrow"><span className="pulse" /> ONLINE / CHANDPUR, BD <i>LOCAL TIME · GMT+6</i></div>
                <h1 className="hero-title">
                  <span>DESIGNING</span>
                  <span className="outline">INTELLIGENCE</span>
                  <span>THAT FEELS <em>HUMAN.</em></span>
                </h1>
                <p className="hero-copy">
                  I’m <strong>Imteaz Hossain</strong>—a Computer Science undergraduate and aspiring software developer building a foundation in programming and problem-solving.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#work"><span>Explore projects</span><ArrowDown size={17} /></a>
                  <a className="button button-ghost" href="/Imteaz-Hossain-CV.pdf" download><Download size={17} /><span>Download CV</span></a>
                </div>
                <div className="hero-metrics" aria-label="Quick profile facts">
                  <div><strong>CS</strong><span>Daffodil International University</span></div>
                  <div><strong>02</strong><span>University communities</span></div>
                  <div><strong>2026</strong><span>Student volunteer activity</span></div>
                </div>
              </div>

              <div className="hero-visual" aria-label="Portrait of Imteaz Hossain">
                <div className="portrait-card">
                  <div className="portrait-corners" />
                  <img src="/imteaz-portfolio-photo.png" alt="Imteaz Hossain" />
                  <div className="portrait-scan" />
                  <span className="portrait-index">2066 / 01</span>
                </div>
                <div className="visual-note visual-note-a"><span>CORE</span><strong>HUMAN-CENTERED</strong></div>
                <div className="visual-note visual-note-b"><span>FOCUS</span><strong>APPLIED AI</strong></div>
              </div>
            </div>
            <div className="hero-footer">
              <span><MousePointer2 size={14} /> MOVE TO INTERACT</span>
              <span>SCROLL TO ENTER <ArrowDown size={14} /></span>
              <span>PORTFOLIO SYSTEM v1.0.6</span>
            </div>
          </section>

          <section id="about" className="about section-pad">
            <SectionHeading
              index="01"
              label="IDENTITY"
              title="Curiosity is the operating system."
              aside="I combine analytical thinking with visual sensitivity—because the best technology should work brilliantly and feel effortless."
            />

            <div className="about-lead reveal">
              <p>
                I’m a Computer Science undergraduate at Daffodil International University, developing a foundation in <em>competitive programming, problem-solving, and software development.</em>
              </p>
              <div className="about-aside">
                <span>MISSION LOG / 2026</span>
                <p>Learn deeply. Design clearly. Build technology that improves how people think, work, and stay safe.</p>
              </div>
            </div>

            <div className="bento-grid">
              <article className="bento bento-profile reveal">
                <div className="bento-icon"><BrainCircuit /></div>
                <span className="bento-number">01 / MINDSET</span>
                <h3>Engineer’s logic.<br />Designer’s eye.</h3>
                <p>I’m actively strengthening my technical and organizational abilities through university programming communities and structured learning.</p>
                <div className="signal-bars"><i /><i /><i /><i /><i /><i /></div>
              </article>
              <article className="bento bento-now reveal">
                <span className="live-dot">LIVE</span>
                <h3>Currently exploring</h3>
                <ul>
                  <li>Competitive programming</li>
                  <li>Software development fundamentals</li>
                  <li>Technical problem-solving</li>
                </ul>
                <div className="orbit-mini"><i /><i /><span /></div>
              </article>
              <article className="bento bento-location reveal">
                <MapPin />
                <div>
                  <span>BASED IN</span>
                  <strong>Chandpur Sadar, Chandpur, Bangladesh</strong>
                  <p>Open to collaborative projects and meaningful opportunities.</p>
                </div>
                <svg viewBox="0 0 220 80" aria-hidden="true"><path d="M0 65 C45 20 62 74 101 36 S171 17 220 45" /><circle cx="161" cy="23" r="4" /></svg>
              </article>
              <article className="bento bento-language reveal">
                <span className="bento-number">LANG / 02</span>
                <div><strong>বাংলা</strong><small>FLUENT</small></div>
                <div><strong>English</strong><small>INTERMEDIATE</small></div>
              </article>
            </div>
          </section>

          <section className="capabilities section-pad" id="capabilities">
            <SectionHeading
              index="02"
              label="CAPABILITY MATRIX"
              title="Built at the intersection of logic and experience."
            />
            <div className="skill-grid">
              {skills.map(([title, description], index) => (
                <article key={title} className="skill-card reveal">
                  <div className="skill-top"><span>{String(index + 1).padStart(2, '0')}</span>{index === 2 ? <DraftingCompass /> : index === 3 ? <Palette /> : index === 4 ? <Code2 /> : <Zap />}</div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="skill-line"><i style={{ '--level': `${83 - index * 4}%` }} /></div>
                </article>
              ))}
            </div>
            <div className="course-strip reveal">
              <span><Sparkles size={16} /> SPECIALIST TRAINING</span>
              <strong>Competitive Programming</strong>
              <strong>CPS Academy</strong>
              <i>CONTINUOUS LEARNING / ACTIVE</i>
            </div>
          </section>

          <section id="work" className="projects section-pad">
            <SectionHeading
              index="03"
              label="SELECTED SYSTEMS"
              title="Ideas with a job to do."
              aside="Two concept projects shaped around real human needs: better focus and safer environments. Select a case file to inspect the system."
            />
            <div className="reveal"><ProjectLab /></div>
          </section>

          <section id="journey" className="journey section-pad">
            <SectionHeading
              index="04"
              label="TRAJECTORY"
              title="Learning in public. Building with intent."
            />
            <div className="journey-grid">
              <div className="timeline reveal">
                <div className="timeline-head"><GraduationCap /><span>EDUCATION LOG</span></div>
                {education.map((item) => (
                  <article key={item.period} className={item.current ? 'current' : ''}>
                    <div className="time-rail"><i /><span>{item.period}</span></div>
                    <div>
                      {item.current && <small>ACTIVE PROGRAM</small>}
                      <h3>{item.title}</h3>
                      <strong>{item.school}</strong>
                      <p>{item.meta}</p>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="experience-stack reveal">
                <div className="stack-head"><Palette /><span>FIELD EXPERIENCE</span></div>
                <article>
                  <span>2023</span>
                  <h3>Event Coordinator</h3>
                  <p>Coordinated logistics and on-the-ground execution for multiple college events, gaining practical experience in planning and event management.</p>
                  <div><i>Coordination</i><i>Planning</i><i>Events</i></div>
                </article>
                <article>
                  <span>2026</span>
                  <h3>Volunteer</h3>
                  <p>Contributed to environmental conservation and community awareness activities, and participated in orientation for the IAUP Semi-Annual Meeting 2026 at Daffodil International University.</p>
                  <div><i>Volunteering</i><i>Community</i><i>Awareness</i></div>
                </article>
              </aside>
            </div>
          </section>

          <section className="achievements section-pad" id="achievements">
            <SectionHeading
              index="05"
              label="RECOGNITION"
              title="Proof of curiosity in motion."
            />
            <div className="achievement-list">
              {achievements.map((item) => (
                <article key={`${item.year}-${item.rank}`} className="reveal">
                  <span className="ach-year">{item.year}</span>
                  <span className="ach-rank">{item.rank}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  <Award />
                </article>
              ))}
            </div>
            <div className="achievement-foot reveal">
              <span>2026 / COMMUNITY SERVICE</span>
              <p>Volunteering with Bangladesh Red Crescent Society activities supporting environmental conservation awareness in the local community.</p>
            </div>
          </section>

          <section id="contact" className="contact section-pad">
            <div className="contact-shell reveal">
              <div className="contact-copy">
                <span className="section-kicker"><span>06</span> TRANSMISSION OPEN</span>
                <h2>Let’s build something <em>meaningful.</em></h2>
                <p>Have a project, research idea, internship, or collaboration in mind? I’d be glad to hear the brief.</p>
                <div className="contact-links">
                  <button type="button" onClick={copyEmail}><Mail /> <span><small>EMAIL</small>252-15-304@diu.edu.bd</span>{copied ? <Check /> : <ArrowUpRight />}</button>
                  <a href="tel:+8801980316445"><Phone /><span><small>CALL</small>01980-316445</span><ArrowUpRight /></a>
                </div>
              </div>
              <form onSubmit={sendMessage} className="contact-form">
                <div className="form-top"><span>SECURE MESSAGE COMPOSER</span><i>● ENCRYPTED</i></div>
                <label>
                  <span>YOUR NAME</span>
                  <input name="name" type="text" placeholder="Enter your name" required />
                </label>
                <label>
                  <span>EMAIL ADDRESS</span>
                  <input name="email" type="email" placeholder="you@company.com" required />
                </label>
                <label>
                  <span>PROJECT / MESSAGE</span>
                  <textarea name="message" rows="5" placeholder="Tell me what you’re imagining…" required />
                </label>
                <button type="submit" className="button button-primary"><span>Transmit message</span><ArrowRight /></button>
              </form>
            </div>
          </section>
        </main>

        <footer>
          <a className="brand" href="#home"><span className="brand-mark">I<i /></span><span className="brand-name">IMTEAZ<small>HOSSAIN</small></span></a>
          <p>© 2026 Imteaz Hossain. Designed for the next chapter.</p>
          <div className="footer-socials">
            <a href="mailto:252-15-304@diu.edu.bd" aria-label="Email"><Mail /></a>
            <a href="/Imteaz-Hossain-CV.pdf" download aria-label="Download CV"><Download /></a>
            <a href="#home" aria-label="Back to top"><ArrowUpRight /></a>
          </div>
        </footer>
      </div>
    </>
  );
}
