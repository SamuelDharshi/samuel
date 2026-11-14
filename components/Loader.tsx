"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { sampleRobot } from "@/lib/robot";

const GREENS = ["#111111", "#2a2a2a", "#444444"];
const VIOLETS = ["#1a1a1a", "#555555", "#6b6b6b"];
const GRAYS = ["#8a8a86", "#a4a4a0", "#c4c4c0"];
const pick = (a: string[]) => a[(Math.random() * a.length) | 0];

type P = { hx: number; hy: number; c: string; delay: number; amp: number; seed: number; ambient: boolean };

function hex(c: string) {
  const n = parseInt(c.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const INK = hex("#0a0a0a");

export default function Loader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { const id = setTimeout(() => setShow(false), 0); return () => clearTimeout(id); }

    const cv = cvRef.current!;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.scale(dpr, dpr);
    document.body.style.overflow = "hidden";

    const s = Math.min(h * 0.5, 420) / 380;
    const ox = w / 2 - 150 * s, oy = h / 2 - 190 * s - 10;
    const pts = sampleRobot(s, ox, oy, Math.max(2, Math.round(2.2 * s)));

    const ps: P[] = pts.map((p) => ({
      hx: p.x, hy: p.y,
      c: p.top ? pick(GREENS) : pick(VIOLETS),
      delay: Math.random() * 0.35, amp: 120 + Math.random() * 380, seed: Math.random() * 6.28, ambient: false,
    }));
    // ambient cloud: blobs of green / violet / gray, hidden until the robot dissolves
    const centers = [
      { x: w * 0.22, y: h * 0.3, set: GREENS }, { x: w * 0.78, y: h * 0.28, set: VIOLETS },
      { x: w * 0.3, y: h * 0.75, set: VIOLETS }, { x: w * 0.72, y: h * 0.75, set: GREENS },
      { x: w * 0.5, y: h * 0.5, set: GRAYS }, { x: w * 0.12, y: h * 0.6, set: GRAYS },
    ];
    for (let i = 0; i < 5200; i++) {
      const c = centers[i % centers.length];
      const a = Math.random() * 6.28, r = Math.abs(Math.random() + Math.random() + Math.random() - 1.5) * 170;
      ps.push({ hx: c.x + Math.cos(a) * r, hy: c.y + Math.sin(a) * r * 0.8, c: pick(c.set), delay: Math.random() * 0.5, amp: 20, seed: Math.random() * 6.28, ambient: true });
    }
    const rgb = ps.map((p) => hex(p.c));

    const start = performance.now();
    const LOAD = 500, DISSOLVE = 450;
    let dissolveAt = 0, raf = 0, finished = false, lastN = -1;

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const prog = Math.min(1, (now - start) / LOAD);
      const pct = Math.round(prog * 100);
      if (pct !== lastN) { lastN = pct; setN(pct); }
      if (prog >= 1 && !dissolveAt) dissolveAt = now;
      const q = dissolveAt ? Math.min(1, (now - dissolveAt) / DISSOLVE) : 0;

      ctx.clearRect(0, 0, w, h);
      const bob = Math.sin(t * 2.2) * 3 * (1 - q);

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        let x = p.hx, y = p.hy, a = 1, col: number[] = INK;
        if (p.ambient) {
          const e = Math.max(0, Math.min(1, (q - p.delay * 0.4) / 0.5));
          a = e * 0.85;
          col = rgb[i];
          x += Math.cos(t * 0.8 + p.seed) * 6; y += Math.sin(t * 0.7 + p.seed) * 6;
        } else {
          const e = Math.max(0, Math.min(1, (q - p.delay) / (1 - p.delay)));
          const ease = e * e * (3 - 2 * e);
          const ang = Math.sin(p.hx * 0.006 + t * 0.6) * 3 + Math.cos(p.hy * 0.007 - t * 0.5) * 3 + p.seed;
          x += Math.cos(ang) * p.amp * ease; y += Math.sin(ang) * p.amp * ease;
          y += bob + Math.sin(t * 5 + p.seed) * 0.4 * (1 - ease);
          const k = Math.min(1, ease * 1.6);
          const tc = rgb[i];
          col = [INK[0] + (tc[0] - INK[0]) * k, INK[1] + (tc[1] - INK[1]) * k, INK[2] + (tc[2] - INK[2]) * k];
          a = 1 - Math.max(0, e - 0.55) * 1.2;
        }
        if (a <= 0.02) continue;
        ctx.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${a})`;
        ctx.fillRect(x, y, 1.7, 1.7);
      }

      if (q === 0) {
        for (let i = 0; i < 3; i++) {
          ctx.fillStyle = Math.floor(t * 2.5) % 4 > i ? "#0a0a0a" : "#c9c9c4";
          ctx.beginPath(); ctx.arc(w / 2 - 18 + i * 18, oy - 28, 4, 0, 6.28); ctx.fill();
        }
      }

      if (q >= 0.75 && !finished) {
        finished = true;
        setDone(true);
        setTimeout(() => setShow(false), 400);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); document.body.style.overflow = ""; };
  }, []);

  useEffect(() => { if (!show) document.body.style.overflow = ""; }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status" aria-label="Loading"
          className="fixed inset-0 z-[100] bg-[#f3f3ef]"
          initial={{ opacity: 1 }}
          animate={{ opacity: done ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.3 0 0 0 0 0.3 0 0 0 1.4 -0.45'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
          />
          <canvas ref={cvRef} className="absolute inset-0 h-full w-full" />
          <p className="absolute bottom-6 left-6 font-mono text-xs text-[#0a0a0a]">
            {done ? "ready" : "thinking…"} <span className="text-[#0a0a0a]">{n}%</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
