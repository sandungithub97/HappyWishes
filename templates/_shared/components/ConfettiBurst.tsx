"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
  shape: "rect" | "circle" | "star";
};

type Props = {
  colors: string[];
  count?: number;
  variant?: "confetti" | "sparkle";
};

export function ConfettiBurst({
  colors,
  count = 140,
  variant = "confetti",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const surface: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;
    const palette = colors.length > 0 ? colors : ["#FF3D7F", "#FFE566", "#3DFFF3"];
    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;
    let running = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      surface.width = Math.floor(width * dpr);
      surface.height = Math.floor(height * dpr);
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(): Particle {
      const fromLeft = Math.random() < 0.5;
      return {
        x: width * (0.28 + Math.random() * 0.44),
        y: -20 - Math.random() * 80,
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 12,
        vx: (fromLeft ? 1 : -1) * (1 + Math.random() * 4),
        vy: 2 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.28,
        color: palette[Math.floor(Math.random() * palette.length)] ?? palette[0],
        shape:
          variant === "sparkle"
            ? "star"
            : Math.random() > 0.72
              ? "circle"
              : "rect",
      };
    }

    resize();
    const particles = Array.from({ length: count }, spawn);

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      frame += 1;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.995;
        p.rot += p.vr;

        if (p.y > height + 40 && frame < 180) {
          Object.assign(p, spawn());
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.92;
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.w * 0.45, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "star") {
          ctx.beginPath();
          ctx.moveTo(0, -p.h / 2);
          ctx.lineTo(p.w * 0.18, -p.h * 0.12);
          ctx.lineTo(p.w / 2, 0);
          ctx.lineTo(p.w * 0.18, p.h * 0.12);
          ctx.lineTo(0, p.h / 2);
          ctx.lineTo(-p.w * 0.18, p.h * 0.12);
          ctx.lineTo(-p.w / 2, 0);
          ctx.lineTo(-p.w * 0.18, -p.h * 0.12);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }

      if (frame < 420) {
        raf = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    }

    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [colors, count, variant]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden
    />
  );
}
