"use client";

import { useEffect, useRef } from "react";

// black & white only: palette depends on theme
const LIGHT = [[10, 10, 10], [110, 110, 110]];
const DARK = [[245, 245, 239], [150, 150, 146]];
let pal = LIGHT;
const LINK = 110;
const PUSH = 120;

type P = { x: number; y: number; r: number; a: number; c: number; glow: boolean; seed: number };

export default function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, ps: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    let scrollY = window.scrollY;

    const build = () => {
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = w < 768;
      const lowEnd = (navigator.hardwareConcurrency || 8) <= 4;
      const target = mobile ? 120 : lowEnd ? 220 : 350;
      const count = Math.round(Math.min(target, (w * h) / (mobile ? 5200 : 5500)));
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 1 + Math.random() * 1.5, a: 0.25 + Math.random() * 0.55,
        c: Math.random() < 0.55 ? 0 : 1, glow: Math.random() < 0.18, seed: Math.random() * 100,
      }));
    };

    const draw = (t: number, move: boolean) => {
      pal = document.documentElement.dataset.theme === "dark" ? DARK : LIGHT;
      ctx.clearRect(0, 0, w, h);
      const par = (scrollY * 0.04) % h;
      for (const p of ps) {
        if (move) {
          // curl-ish flow field
          const ang = Math.sin(p.x * 0.0035 + t * 0.00012 + p.seed) * 2.2 + Math.cos(p.y * 0.004 - t * 0.0001) * 2.2;
          p.x += Math.cos(ang) * 0.35; p.y += Math.sin(ang) * 0.35;
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
          if (d < PUSH && d > 0.1) { const f = (1 - d / PUSH) * 2.2; p.x += (dx / d) * f; p.y += (dy / d) * f; }
          if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
        }
      }
      // connections
      ctx.lineWidth = 0.7;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const dx = a.x - b.x; if (dx > LINK || dx < -LINK) continue;
          const dy = a.y - b.y; if (dy > LINK || dy < -LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const c = pal[a.c];
            ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${(1 - d / LINK) * 0.28})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y - par * (a.r / 2)); ctx.lineTo(b.x, b.y - par * (b.r / 2)); ctx.stroke();
          }
        }
      }
      for (const p of ps) {
        const pc = pal[p.c];
        ctx.fillStyle = `rgba(${pc[0]},${pc[1]},${pc[2]},${p.a})`;
        if (p.glow) { ctx.shadowColor = `rgb(${pc[0]},${pc[1]},${pc[2]})`; ctx.shadowBlur = 8; } else ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y - par * (p.r / 2), p.r, 0, 6.2832); ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    build();
    const loop = (t: number) => { draw(t, true); raf = requestAnimationFrame(loop); };
    if (reduced) draw(0, false); else raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onScroll = () => { scrollY = window.scrollY; };
    const onResize = () => { build(); if (reduced) draw(0, false); };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" style={{ animation: "pfade 1.2s ease-out both" }} />;
}
