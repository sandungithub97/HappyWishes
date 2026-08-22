"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  s: number;
  vy: number;
  vx: number;
  rot: number;
  vr: number;
  color: string;
};

type Props = {
  colors?: string[];
  count?: number;
  className?: string;
  /** When false, canvas is absolute (for gates/modals). Default: fixed full viewport. */
  fixed?: boolean;
};

export function PetalFall({
  colors = ["#F7C1D0", "#E8A0B4", "#FFD6E0", "#F4B8C5"],
  count = 48,
  className,
  fixed = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const paletteKey = colors.join(",");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const surface: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;
    const palette = paletteKey.split(",");
    let width = 0;
    let height = 0;
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

    function spawn(startY = false): Petal {
      return {
        x: Math.random() * width,
        y: startY ? Math.random() * height : -20 - Math.random() * 80,
        s: 7 + Math.random() * 10,
        vy: 0.45 + Math.random() * 0.85,
        vx: -0.4 + Math.random() * 0.8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.04,
        color: palette[Math.floor(Math.random() * palette.length)] ?? "#F7C1D0",
      };
    }

    resize();
    const petals = Array.from({ length: count }, () => spawn(true));

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.02) * 0.35;
        p.rot += p.vr;

        if (p.y > height + 24) {
          Object.assign(p, spawn(false));
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.82;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s * 0.55, p.s, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = window.requestAnimationFrame(tick);
    }

    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(tick);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [paletteKey, count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none inset-0 z-30 ${fixed ? "fixed" : "absolute"} ${className ?? ""}`}
      aria-hidden
    />
  );
}
