import { useRef, useEffect } from 'react';

export default function NeonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // Floating particles
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#00d4ff' : '#7b2fff',
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let t = 0;

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      // Background gradient
      const bg = ctx!.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, '#020b18');
      bg.addColorStop(1, '#030d20');
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      // Draw grid
      ctx!.strokeStyle = 'rgba(0,212,255,0.04)';
      ctx!.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, h);
        ctx!.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(w, y);
        ctx!.stroke();
      }

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(t * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.4 + 0.6;
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200, 230, 255, ${star.opacity * twinkle})`;
        ctx!.fill();
        star.y += star.speed * 0.2;
        if (star.y > h) { star.y = 0; star.x = Math.random() * w; }
      });

      // Draw particles
      particles.forEach((p) => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const color = p.color === '#00d4ff' ? '0,212,255' : '123,47,255';
        ctx!.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = p.color;
        ctx!.fill();
        ctx!.shadowBlur = 0;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      });

      // Neon glow orbs
      const orb1X = w * 0.25 + Math.sin(t * 0.4) * 80;
      const orb1Y = h * 0.3 + Math.cos(t * 0.3) * 60;
      const g1 = ctx!.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, 220);
      g1.addColorStop(0, 'rgba(0,212,255,0.07)');
      g1.addColorStop(1, 'transparent');
      ctx!.fillStyle = g1;
      ctx!.fillRect(0, 0, w, h);

      const orb2X = w * 0.75 + Math.sin(t * 0.3 + 1) * 100;
      const orb2Y = h * 0.7 + Math.cos(t * 0.4 + 2) * 70;
      const g2 = ctx!.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, 200);
      g2.addColorStop(0, 'rgba(123,47,255,0.06)');
      g2.addColorStop(1, 'transparent');
      ctx!.fillStyle = g2;
      ctx!.fillRect(0, 0, w, h);

      t += 0.016;
      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
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
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
