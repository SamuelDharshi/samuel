import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getByUrlSlug, projects, repoUrl, urlSlug } from "@/data/projects";

function Section({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="font-mono text-sm text-accent">{h}</h2>
      <div className="mt-2 text-muted">{children}</div>
    </section>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: urlSlug(p) }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getByUrlSlug(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getByUrlSlug(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 pb-8 pt-32">
      <Link href="/projects" className="text-sm text-muted hover:text-accent">← Projects</Link>
      <div className="mt-6 box p-8">
        <h1 className="blade display text-4xl sm:text-6xl">{p.title}</h1>
        {p.award && <p className="mt-4 font-mono text-sm text-accent">🏆 {p.award}</p>}
        <p className="mt-4 text-lg text-muted">{p.summary}</p>
        {p.role && <Section h="My role">{p.role}</Section>}
        <Section h="Domains">
          <ul className="flex flex-wrap gap-2 font-mono text-xs">
            {p.tags.map((t) => <li key={t} className="rounded-md bg-fg px-2 py-1 text-bg">{t}</li>)}
          </ul>
        </Section>
        <Section h="Stack">
          <ul className="flex flex-wrap gap-2 font-mono text-xs">
            {p.stack.map((s) => <li key={s} className="rounded-md border border-line px-2 py-1">{s}</li>)}
          </ul>
        </Section>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.demo && <a href={p.demo} className="box inline-flex min-h-11 items-center bg-pop px-6 font-bold uppercase text-black">Live demo ↗</a>}
          <a href={repoUrl(p)} className="box inline-flex min-h-11 items-center px-6 font-bold uppercase">Source on GitHub</a>
        </div>
      </div>
    </article>
  );
}
