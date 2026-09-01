'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const PARTICLE_COUNT = 40;

/**
 * A restrained, ambient particle drift over the hero image — small dots
 * that slowly float and gently pulse. Purely decorative, so it bails out
 * entirely for prefers-reduced-motion and pauses when the tab is hidden.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frameId: number;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.scale(dpr, dpr);
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.6 + 0.6,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.25 - 0.05,
        opacity: Math.random() * 0.5 + 0.15,
      }));
    }

    function tick() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -4) p.y = height + 4;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx!.fill();
      }
      frameId = requestAnimationFrame(tick);
    }

    const handleVisibility = () => {
      running = !document.hidden;
      if (running) frameId = requestAnimationFrame(tick);
      else cancelAnimationFrame(frameId);
    };

    resize();
    frameId = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
