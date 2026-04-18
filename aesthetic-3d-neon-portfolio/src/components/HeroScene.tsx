import { useRef, useEffect } from 'react';

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0;

    // Generate orbit particles
    const orbits = [
      { radius: 100, speed: 0.008, particles: 60, color: '0,212,255', size: 1.5, opacity: 0.6 },
      { radius: 145, speed: -0.005, particles: 40, color: '123,47,255', size: 1, opacity: 0.4 },
      { radius: 185, speed: 0.004, particles: 30, color: '0,255,255', size: 0.8, opacity: 0.3 },
    ];

    const floatingDots = Array.from({ length: 30 }, (_, i) => ({
      angle: (i / 30) * Math.PI * 2,
      radius: 220 + Math.random() * 100,
      speed: (Math.random() - 0.5) * 0.003,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? '0,212,255' : '123,47,255',
      opacity: Math.random() * 0.6 + 0.2,
      rotX: Math.random() * 0.02 - 0.01,
    }));

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Outer glow
      const outerGlow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 200);
      outerGlow.addColorStop(0, 'rgba(0,212,255,0.08)');
      outerGlow.addColorStop(0.5, 'rgba(0,50,100,0.05)');
      outerGlow.addColorStop(1, 'transparent');
      ctx!.fillStyle = outerGlow;
      ctx!.fillRect(0, 0, w, h);

      // Draw sphere core
      const sphereGrad = ctx!.createRadialGradient(cx - 20, cy - 20, 0, cx, cy, 80);
      sphereGrad.addColorStop(0, 'rgba(0,100,180,0.9)');
      sphereGrad.addColorStop(0.4, 'rgba(0,50,120,0.7)');
      sphereGrad.addColorStop(0.8, 'rgba(0,20,60,0.5)');
      sphereGrad.addColorStop(1, 'rgba(0,0,30,0.1)');
      ctx!.beginPath();
      ctx!.arc(cx, cy, 78, 0, Math.PI * 2);
      ctx!.fillStyle = sphereGrad;
      ctx!.fill();

      // Sphere rim glow
      ctx!.beginPath();
      ctx!.arc(cx, cy, 78, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(0,212,255,0.6)';
      ctx!.lineWidth = 1.5;
      ctx!.shadowBlur = 20;
      ctx!.shadowColor = '#00d4ff';
      ctx!.stroke();
      ctx!.shadowBlur = 0;

      // Inner shine
      const shine = ctx!.createRadialGradient(cx - 25, cy - 25, 0, cx, cy, 80);
      shine.addColorStop(0, 'rgba(0,212,255,0.3)');
      shine.addColorStop(0.5, 'transparent');
      ctx!.beginPath();
      ctx!.arc(cx, cy, 78, 0, Math.PI * 2);
      ctx!.fillStyle = shine;
      ctx!.fill();

      // Rotating orbit rings
      orbits.forEach((orbit, oi) => {
        const phase = t * orbit.speed * 60;
        for (let i = 0; i < orbit.particles; i++) {
          const angle = (i / orbit.particles) * Math.PI * 2 + phase;
          // Tilt the orbit
          const tilt = oi * 0.4 + 0.3;
          const px = cx + Math.cos(angle) * orbit.radius;
          const py = cy + Math.sin(angle) * orbit.radius * Math.cos(tilt);
          const scale = (Math.sin(angle) * Math.sin(tilt) + 1.5) / 2.5;
          const alpha = orbit.opacity * scale;

          ctx!.beginPath();
          ctx!.arc(px, py, orbit.size * scale, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${orbit.color}, ${alpha})`;
          if (i % 5 === 0) {
            ctx!.shadowBlur = 6;
            ctx!.shadowColor = `rgba(${orbit.color}, 0.8)`;
          }
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      });

      // Floating outer particles
      floatingDots.forEach((dot) => {
        dot.angle += dot.speed;
        const px = cx + Math.cos(dot.angle) * dot.radius;
        const py = cy + Math.sin(dot.angle) * dot.radius * 0.4;
        const flicker = 0.7 + Math.sin(t * 3 + dot.angle) * 0.3;

        ctx!.beginPath();
        ctx!.arc(px, py, dot.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${dot.color}, ${dot.opacity * flicker})`;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = `rgba(${dot.color},0.8)`;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      });

      // Hex grid lines on sphere
      ctx!.save();
      ctx!.beginPath();
      ctx!.arc(cx, cy, 78, 0, Math.PI * 2);
      ctx!.clip();
      ctx!.strokeStyle = 'rgba(0,212,255,0.15)';
      ctx!.lineWidth = 0.5;
      const hexSpacing = 18;
      for (let x = cx - 80; x < cx + 80; x += hexSpacing) {
        ctx!.beginPath();
        ctx!.moveTo(x + Math.sin(t * 0.5) * 3, cy - 80);
        ctx!.lineTo(x + Math.sin(t * 0.5) * 3, cy + 80);
        ctx!.stroke();
      }
      for (let y = cy - 80; y < cy + 80; y += hexSpacing) {
        ctx!.beginPath();
        ctx!.moveTo(cx - 80, y + Math.cos(t * 0.5) * 3);
        ctx!.lineTo(cx + 80, y + Math.cos(t * 0.5) * 3);
        ctx!.stroke();
      }
      ctx!.restore();

      t += 0.016;
      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
