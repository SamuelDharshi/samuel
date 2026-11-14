// Build-time helper: pulls public repo metadata + README intro into data/repos.json
import fs from "node:fs";
const user = "SamuelDharshi";
const repos = await (await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`)).json();
const out = [];
for (const r of repos) {
  if (r.name.toLowerCase() === user.toLowerCase()) continue;
  let readme = "";
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${user}/${r.name}/${r.default_branch}/README.md`);
    if (res.ok) {
      const t = await res.text();
      const lines = t.split("\n").map((l) => l.trim()).filter((l) => l && !/^(#|!\[|\[!\[|<|```|[-=*|>]{2,}|---)/.test(l) && l.length > 40 && !/^\[/.test(l));
      readme = (lines[0] || "").replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").slice(0, 220);
    }
  } catch {}
  out.push({ name: r.name, fork: r.fork, lang: r.language, desc: r.description || "", readme, demo: r.homepage || "", url: r.html_url, pushed: r.pushed_at, topics: r.topics || [] });
}
fs.mkdirSync("data", { recursive: true });
fs.writeFileSync("data/repos.json", JSON.stringify(out, null, 1));
console.log(out.length);
out.forEach((o) => console.log(o.name, "=>", o.desc || o.readme || "(none)"));
