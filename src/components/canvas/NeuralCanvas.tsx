import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  color: string;
  alpha: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface NeuralCanvasProps {
  reducedMotion?: boolean;
  onNodeClick?: () => void;
  accentSupernova?: boolean;
}

export const NeuralCanvas: React.FC<NeuralCanvasProps> = ({
  reducedMotion = false,
  onNodeClick,
  accentSupernova = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean; lastMoved: number }>({
    x: -1000,
    y: -1000,
    isInside: false,
    lastMoved: Date.now(),
  });
  const shockwavesRef = useRef<Shockwave[]>([]);
  const [fpsTier, setFpsTier] = useState<'high' | 'low'>('high');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 55 : (fpsTier === 'high' ? 160 : 80);
    const connectionDistance = isMobile ? 90 : 130;
    const cursorRadius = 150;

    const particles: Particle[] = [];
    const colors = accentSupernova
      ? ['#FF4FD8', '#5CFFC2', '#B8FF3C', '#FFB347']
      : ['#5CFFC2', '#8E93A8', '#5CFFC2', '#38BDF8'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.2 : 0.65),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.2 : 0.65),
        baseRadius: Math.random() * 2 + 1.2,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInside = true;
      mouseRef.current.lastMoved = Date.now();
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 220,
        alpha: 0.8,
      });
      if (onNodeClick) onNodeClick();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    let lastFrameTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      frameCount++;
      if (frameCount % 60 === 0) {
        const delta = time - lastFrameTime;
        const currentFps = 1000 / (delta / 60);
        if (currentFps < 35 && fpsTier === 'high') {
          setFpsTier('low');
        }
        lastFrameTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Check if idle (> 20s)
      const isIdle = Date.now() - mouseRef.current.lastMoved > 20000;
      const speedMultiplier = isIdle ? 0.3 : 1;

      // Update & render shockwaves
      for (let s = shockwavesRef.current.length - 1; s >= 0; s--) {
        const sw = shockwavesRef.current[s];
        sw.radius += 4;
        sw.alpha -= 0.015;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(92, 255, 194, ${sw.alpha * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // Push particles along shockwave front
        for (const p of particles) {
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.hypot(dx, dy);
          if (Math.abs(dist - sw.radius) < 25 && dist > 0) {
            const force = (1 - Math.abs(dist - sw.radius) / 25) * 4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }
      }

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;

          // Wrap edges
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Mouse attraction & connection
        let distToMouse = Infinity;
        if (mouseRef.current.isInside) {
          const mdx = mouseRef.current.x - p.x;
          const mdy = mouseRef.current.y - p.y;
          distToMouse = Math.hypot(mdx, mdy);

          if (distToMouse < cursorRadius) {
            // Attraction pull
            const pullFactor = (1 - distToMouse / cursorRadius) * 0.02;
            p.x += mdx * pullFactor;
            p.y += mdy * pullFactor;
            p.radius = p.baseRadius * 1.5;

            // Direct line from cursor to particle
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(p.x, p.y);
            const lineAlpha = (1 - distToMouse / cursorRadius) * 0.45;
            ctx.strokeStyle = `rgba(92, 255, 194, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          } else {
            p.radius = p.baseRadius;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = distToMouse < cursorRadius
          ? '#5CFFC2'
          : p.color;
        ctx.globalAlpha = distToMouse < cursorRadius ? 0.95 : (isIdle ? p.alpha * 0.4 : p.alpha);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Particle to particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * (isIdle ? 0.12 : 0.28);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = accentSupernova
              ? `rgba(255, 79, 216, ${alpha})`
              : `rgba(92, 255, 194, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion, onNodeClick, accentSupernova, fpsTier]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
