import type { Metadata } from "next";
import { Code2, Layers, Brain, Link2, Wrench, Trophy, GraduationCap } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "About", description: "About Samuel Dharshi N: skills, experience and hackathon wins." };

const icons = [Code2, Layers, Brain, Link2, Wrench];
const h2 = "font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-tight sm:text-5xl";

export default function About() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-8 pt-32">
      <h1 className="font-[family-name:var(--font-serif)] text-6xl uppercase sm:text-8xl">About</h1>
      <p className="mt-6 max-w-2xl font-[family-name:var(--font-sub)] text-lg sm:text-xl">{site.bio}</p>

      <section className="mt-20">
        <h2 className={h2}>Skills</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.blades.map((b, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={b.name} delay={i * 0.05}>
                <div className="box h-full p-5">
                  <Icon aria-hidden className="size-6" />
                  <h3 className="mt-3 font-[family-name:var(--font-sub)] text-xl font-bold">{b.name}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2 font-mono text-xs">
                    {b.items.map((it) => <li key={it} className="rounded-md border-2 border-fg px-2 py-1">{it}</li>)}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-20 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className={h2}>Experience</h2>
          <ol className="mt-8 space-y-8 border-l-4 border-fg pl-6">
            {site.experience.map((e) => (
              <li key={e.title} className="relative">
                <span className="absolute -left-[34px] top-1.5 size-4 border-2 border-fg bg-pop" />
                <p className="font-mono text-xs font-bold">{e.period}</p>
                <h3 className="font-[family-name:var(--font-sub)] text-lg font-bold">{e.title}</h3>
                <p className="text-sm text-muted">{e.org}</p>
              </li>
            ))}
            <li className="relative">
              <span className="absolute -left-[34px] top-1.5 size-4 border-2 border-fg bg-pop" />
              <p className="font-mono text-xs font-bold">2023 – 2027</p>
              <h3 className="flex items-center gap-2 font-[family-name:var(--font-sub)] text-lg font-bold"><GraduationCap className="size-5" aria-hidden /> B.E. Computer Science</h3>
              <p className="text-sm text-muted">Loyola-ICAM College of Engineering and Technology</p>
            </li>
          </ol>
        </div>
        <div>
          <h2 className={h2}>Wins</h2>
          <ul className="mt-8 space-y-5">
            {site.achievements.map((a) => (
              <li key={a.title} className="box flex gap-4 p-5">
                <Trophy aria-hidden className="mt-0.5 size-6 shrink-0" />
                <div>
                  <h3 className="font-[family-name:var(--font-sub)] font-bold">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
