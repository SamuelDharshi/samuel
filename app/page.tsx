import Link from "next/link";
import { GithubIcon } from "@/components/BrandIcons";
import { FolderGit2, Radio, Trophy, Briefcase } from "lucide-react";
import { projects, moreRepos } from "@/data/projects";
import Marketplace from "@/components/Marketplace";
import { Reveal } from "@/components/Reveal";

const btn = "box inline-flex min-h-12 items-center px-7 text-sm font-extrabold uppercase tracking-widest";
const stack = ["TypeScript", "Python", "Solidity", "Next.js", "x402", "fhEVM", "zk-STARKs", "Rust", "Java", "Flask", "AI agents", "Hedera", "Starknet", "Monad"];

export default function Home() {
  const total = projects.length + moreRepos.length;
  const live = projects.filter((p) => p.demo).length;
  const stats = [
    { n: total, l: "repos", Icon: FolderGit2 },
    { n: live, l: "live demos", Icon: Radio },
    { n: 3, l: "hackathon podiums", Icon: Trophy },
    { n: 2, l: "internships", Icon: Briefcase },
  ];
  return (
    <div className="overflow-x-clip">
      <section className="relative mx-auto flex min-h-svh max-w-[1100px] flex-col justify-center px-5 py-24">
        <h1 className="reveal">
          <span className="block text-xl font-medium sm:text-2xl">Hi, I&apos;m</span>
          <span className="mt-1 block font-[family-name:var(--font-serif)] text-[15vw] uppercase leading-[0.9] sm:text-7xl lg:text-8xl">Samuel Dharshi</span>
        </h1>
        <p className="reveal mt-6 max-w-lg font-[family-name:var(--font-sub)] text-lg sm:text-xl">
          Computer Science student at LICET. I love learning by building: AI, Web3 and full-stack projects.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-4">
          <Link href="/projects" className={`${btn} bg-pop text-black`}>Projects</Link>
          <a href="/resume" className={btn}>Resume</a>
          <Link href="/contact" className={btn}>Contact</Link>
        </div>
        <div aria-hidden className="absolute bottom-8 right-5 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl] sm:flex">
          scroll <span>→</span>
        </div>
      </section>

      <div className="overflow-hidden border-y-2 border-fg bg-pop py-3 text-black" aria-hidden>
        <div className="marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 gap-8 pr-8 font-mono text-lg font-bold uppercase">
              {stack.map((s) => <span key={s + k}>{s} ✦</span>)}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-5">
        <Reveal>
          <section className="grid grid-cols-2 gap-5 py-16 md:grid-cols-4">
            {stats.map(({ n, l, Icon }) => (
              <div key={l} className="box p-5">
                <Icon aria-hidden className="size-6" />
                <p className="mt-3 font-mono text-4xl font-bold">{n}</p>
                <p className="text-sm text-muted">{l}</p>
              </div>
            ))}
          </section>
        </Reveal>

        <section className="py-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">Featured</h2>
            <Link href="/projects" className="font-mono text-sm font-bold underline underline-offset-4">All projects →</Link>
          </div>
          <Marketplace compact />
        </section>

        <section className="flex justify-center py-20">
          <a href="https://github.com/SamuelDharshi" className={btn}><GithubIcon className="mr-2 size-4" /> More on GitHub</a>
        </section>
      </div>
    </div>
  );
}
