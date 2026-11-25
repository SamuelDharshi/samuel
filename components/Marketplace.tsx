"use client";

import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { allTags, repoUrl, urlSlug, type Project } from "@/data/projects";

function Card({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(i % 3, 3) * 0.06 }}
      className="[perspective:900px]"
    >
      <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="agent-card group relative h-full rounded-xl">
        <div className="box relative flex h-full flex-col rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <span aria-hidden className="grid size-11 place-items-center rounded-lg border-2 border-fg bg-bg font-mono text-sm font-bold">
              {p.title.slice(0, 2).toUpperCase()}
            </span>
            <div className="flex items-center gap-2">
              {p.demo && (
                <span className="flex items-center gap-1.5 rounded-full border border-line px-2 py-1 font-mono text-[11px] text-accent">
                  <span className="size-1.5 animate-pulse rounded-full bg-accent" /> live
                </span>
              )}
              {p.featured && <span className="rounded-full bg-pop px-2 py-1 font-mono text-[11px] font-bold text-black">featured</span>}
            </div>
          </div>

          <h3 className="mt-4 text-xl font-black uppercase tracking-tight">
            <Link href={`/projects/${urlSlug(p)}`} className="after:absolute after:inset-0 after:rounded-xl">{p.title}</Link>
          </h3>
          {p.award && <p className="mt-1 font-mono text-xs text-accent">🏆 {p.award}</p>}
          <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-muted">{p.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <li key={t} className="rounded-md bg-fg px-2 py-0.5 font-mono text-[11px] text-bg">{t}</li>
            ))}
          </ul>
          <ul className="mt-2 flex flex-wrap gap-x-3 font-mono text-[11px] text-muted">
            {p.stack.map((s) => <li key={s}>{s}</li>)}
          </ul>

          <div className="relative z-10 mt-5 flex gap-2 border-t border-line pt-4 text-sm">
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noreferrer" className="box inline-flex min-h-11 flex-1 items-center justify-center bg-pop text-sm font-bold uppercase text-black !shadow-[3px_3px_0_var(--fg)]">
                Open demo ↗
              </a>
            )}
            <a href={repoUrl(p)} target="_blank" rel="noreferrer" className="box inline-flex min-h-11 flex-1 items-center justify-center text-sm font-bold uppercase !shadow-[3px_3px_0_var(--fg)]">
              Source
            </a>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default function Marketplace({ items: projects, limit, compact }: { items: Project[]; limit?: number; compact?: boolean }) {
  const [tag, setTag] = useState<string>("All");
  const [q, setQ] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    allTags.forEach((t) => (c[t] = projects.filter((p) => p.tags.includes(t)).length));
    return c;
  }, [projects]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = projects
      .filter((p) => !compact || p.featured)
      .filter((p) => tag === "All" || p.tags.includes(tag as never))
      .filter((p) => !liveOnly || p.demo)
      .filter((p) => !needle || `${p.title} ${p.summary} ${p.stack.join(" ")}`.toLowerCase().includes(needle))
      .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return limit && tag === "All" && !needle && !liveOnly ? list.slice(0, limit) : list;
  }, [projects, tag, q, liveOnly, limit, compact]);

  return (
    <div>
      {!compact && <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter agents">
          {["All", ...allTags].map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              aria-pressed={tag === t}
              className={`min-h-11 rounded-full border-2 px-4 text-sm font-bold uppercase tracking-wide transition ${tag === t ? "border-fg bg-pop font-bold text-black" : "border-fg/40 text-fg hover:border-fg"}`}
            >
              {t} <span className="font-mono text-xs opacity-70">{counts[t]}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="q">Search projects</label>
          <input
            id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search agents, chains, stacks…"
            className="min-h-11 w-full rounded-full border-2 border-fg bg-surface px-4 text-sm outline-none placeholder:text-muted md:w-72"
          />
          <button
            onClick={() => setLiveOnly((v) => !v)} aria-pressed={liveOnly}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-sm ${liveOnly ? "border-fg bg-pop font-bold text-black" : "border-fg/40 text-fg hover:border-fg"}`}
          >
            Live only
          </button>
        </div>
      </div>}

      {!compact && <p className="mt-4 font-mono text-xs text-muted" aria-live="polite">{shown.length} result{shown.length === 1 ? "" : "s"}</p>}

      <motion.ul layout className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => <Card key={p.slug} p={p} i={i} />)}
        </AnimatePresence>
      </motion.ul>
      {shown.length === 0 && <p className="mt-10 text-center text-muted">No agents match. Try another filter.</p>}
    </div>
  );
}
