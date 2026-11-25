import { projects as curated, moreRepos as curatedMore, GITHUB_USER, urlSlug, type Project, type Tag } from "@/data/projects";

type Repo = {
  name: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  archived: boolean;
  created_at: string;
};

// Repos that are not portfolio projects.
const IGNORE = new Set(["samuel", "samueldharshi"]);

function guessTags(text: string, language: string | null): Tag[] {
  const t = text.toLowerCase();
  const tags: Tag[] = [];
  if (/\bagents?\b/.test(t)) tags.push("Agents");
  if (/(web3|blockchain|ethereum|solana|cardano|x402|usdc|nft|defi|token|wallet|\bdao\b|onchain|on-chain|zk-|arc\b|hedera|monad|starknet)/.test(t)) tags.push("Web3");
  if (/(\bai\b|\bllm\b|gpt|claude|gemini|machine learning|\bml\b)/.test(t)) tags.push("AI");
  if (/(secur|privacy|encrypt|proof|audit|solvency)/.test(t)) tags.push("Security");
  if (language === "Kotlin") tags.push("Mobile");
  if (tags.length === 0) tags.push("Full Stack");
  return tags.slice(0, 3);
}

function normalizeUrl(u: string | null) {
  if (!u) return undefined;
  const s = u.trim();
  if (!s) return undefined;
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

/**
 * Curated entries (data/projects.ts) win. Any other public repo on GitHub is added automatically,
 * so new repos show up on the site within the revalidate window (1 hour) without a redeploy.
 */
export async function getProjects(): Promise<{ projects: Project[]; more: string[] }> {
  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=created`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const repos = (await res.json()) as Repo[];

    const known = new Set([...curated.map((p) => p.slug.toLowerCase()), ...curatedMore.map((n) => n.toLowerCase()), ...IGNORE]);
    const auto: Project[] = [];
    const more: string[] = [...curatedMore];

    for (const r of repos) {
      if (r.archived || known.has(r.name.toLowerCase())) continue;
      const desc = (r.description || "").trim();
      if (!desc) { more.unshift(r.name); continue; }
      auto.push({
        slug: r.name,
        title: r.name.replace(/[-_]+/g, " ").replace(/^./, (c) => c.toUpperCase()).trim(),
        summary: desc.length > 240 ? `${desc.slice(0, 237)}...` : desc,
        tags: guessTags(`${r.name} ${desc} ${(r.topics || []).join(" ")}`, r.language),
        stack: r.language ? [r.language] : [],
        demo: normalizeUrl(r.homepage),
        date: r.created_at.slice(0, 7),
      });
    }
    return { projects: [...auto, ...curated], more };
  } catch {
    return { projects: curated, more: curatedMore };
  }
}

export async function getProjectByUrlSlug(slug: string) {
  const { projects } = await getProjects();
  return projects.find((p) => urlSlug(p) === slug);
}
