# Portfolio Website PRD

Nov 14, 2026 · @Chris

## 1. Overview

**Product:** A personal portfolio website for Samuel Dharshi, a developer at LICET working across AI, Web3/blockchain, cybersecurity and full-stack development.

**Problem:** Right now the only public home for the work is the GitHub profile: 45 repositories and a themed profile README, but no personal website. The most visible repos are forks or have no description, so a recruiter or judge can't tell in a few seconds what Samuel built himself, what he's good at, or how to reach him.

**Goals**

- **G1 — 10-second pitch:** One link that says who Samuel is, what he builds and what he's looking for, above the fold.
- **G2 — Proof of work:** 4–6 flagship projects, each with his own role, the stack, a screenshot and a live/demo link.
- **G3 — One-click contact:** Email, LinkedIn, GitHub and resume reachable from every page.
- **G4 — Easy to maintain:** Adding a project means adding one Markdown file and pushing to GitHub.
- **G5 — Memorable identity:** Carry the "dojo / blades" personality from the README into an original, professional design.

**Non-goals (v1):** user accounts, a CMS dashboard, e-commerce, comments, multi-language content.

## 2. Audience and user stories

| Audience | What they need | Time they'll spend |
| --- | --- | --- |
| Recruiters / HR (internships, first job) | Role fit, skills, resume, contact | 30–60 sec |
| Engineering interviewers | Real code, technical depth, decisions made | 3–5 min |
| Hackathon judges and teammates | Past hackathon projects, Web3/AI skills | 1–2 min |
| Freelance clients / collaborators | What he can build, how to reach him | 1–2 min |

**User stories**

- As a recruiter, I can see Samuel's focus areas and download his resume within one scroll.
- As an interviewer, I can open a project case study and see the problem, his role, the architecture and the repo link.
- As a hackathon organiser, I can filter projects by "Web3" or "AI".
- As a visitor on mobile, I can read everything and tap to email without zooming.
- As Samuel, I can add a new project by creating one `.mdx` file, with no code changes.

## 3. Content inventory (from GitHub)

**Identity and focus:** LICET ("Dojo"); domains: AI, Web3, Blockchain, Cybersecurity, Full Stack. Current arc: exploring new areas of code. Side quest: building tools for everyday needs.

**Skills ("blades")**

- Languages: Python, JavaScript, Java, C, HTML5, CSS3
- Full stack: React, Streamlit
- AI: Generative AI, Google Gemini, prompt engineering
- Tools: Git, GitHub, VS Code
- Seen in repos: TypeScript, zk-STARKs, fhEVM, x402 (add only if he actually worked with them)

**Candidate projects**

| Repo | What it is | Status | Portfolio action |
| --- | --- | --- | --- |
| null402 | x402-based agentic confidential lending protocol on fhEVM (TypeScript) | Fork | Feature only if Samuel contributed; state his part clearly |
| Starkproof | Privacy-preserving Proof of Reserves for exchanges using zk-STARKs (TypeScript) | Fork | Same as above |
| sih25 | JavaScript project, no description (likely a Smart India Hackathon entry — confirm) | Original | Write a case study if it's his |
| Gen\_Ai | Python generative-AI project | Fork | Feature if he extended it |
| absl-kh | No description | Unknown | Review |
| Other \~40 repos | Not reviewed yet | — | Shortlist the best 2–3 original projects |

**Links:** LinkedIn (linkedin.com/in/samueldharshi), GitHub (github.com/SamuelDharshi), college email.

**Content gaps to fill before launch**

- [ ] Two-line bio and a one-line headline (e.g. "Full-stack + AI developer building in Web3 and security")
- [ ] Headshot or avatar
- [ ] Resume PDF
- [ ] For each featured project: description, role, screenshots, live demo or video
- [ ] Hackathons, internships, certifications, achievements
- [ ] A personal email (not only the college address, which may expire after graduation)

## 4. Pages and features

**Site map**

- `/` — single-page home: Hero → About → Skills → Featured Projects → Experience & Hackathons → Contact
- `/projects` — all projects with filter chips (AI, Web3, Security, Full Stack)
- `/projects/[slug]` — case study page per project
- `/resume` — redirects to the resume PDF
- `/404` — custom on-theme not-found page

**Feature requirements**

| ID | Requirement | Priority |
| --- | --- | --- |
| F1 | Hero: name, headline, short typed/animated tagline, CTAs "View work" and "Contact" | P0 |
| F2 | About: bio, photo, current focus ("current arc") and what he's looking for | P0 |
| F3 | Skills grouped into "blades" (Languages, Full Stack, AI, Web3, Tools) with icons | P0 |
| F4 | Featured projects grid (bento layout): image, title, one-liner, tags, repo and demo links | P0 |
| F5 | Project case study: problem, his role, stack, architecture, screenshots, outcome, links | P0 |
| F6 | Contact: email (mailto + copy button), LinkedIn, GitHub, resume download | P0 |
| F7 | Responsive layout from 360px to wide desktop | P0 |
| F8 | Dark theme by default, light theme toggle, remembers choice | P1 |
| F9 | Contact form (name, email, message) via Formspree or Resend, with spam protection | P1 |
| F10 | Live GitHub stats (repo count, top languages, recent activity) fetched at build time | P1 |
| F11 | Project filtering by tag on `/projects` | P1 |
| F12 | Experience & hackathons timeline | P1 |
| F13 | Command palette (Ctrl/⌘+K) to jump to sections and links | P2 |
| F14 | Blog / notes in MDX | P2 |
| F15 | Interactive hero (3D or canvas effect) | P2 |

## 5. Design direction

**Concept — "The Dojo":** Keep the swordsman personality from the GitHub README, but make it an original theme rather than an anime fan page. Use the metaphor in the copy (Dojo, Blades, Current Arc, Side Quest) and in the visuals (ink, steel, a clean "slash" accent line), and do **not** use One Piece characters, artwork, quotes or logos on the site. That avoids copyright issues and keeps it professional for recruiters.

**Visual language**

- Colour: near-black ink background (#0B0D0C), off-white text, steel grey surfaces, one accent — emerald green (#10B981) as a quiet nod to the theme. Same accent for links, focus rings and highlights.
- Type: a bold display font for headings (e.g. Space Grotesk or Clash Display), Inter or Geist for body, JetBrains Mono for code and tags.
- Layout: generous spacing, a bento grid for featured projects, max content width \~1100px.
- Motion: short fade/slide reveals on scroll and a thin "blade" underline that sweeps under section titles. All motion off when the visitor has `prefers-reduced-motion` set.

**References from the free-template topic**

- bento-grid-portfolio — grid layout for featured work
- NeonMint — minimalist dark theme with a single mint accent
- hak3r — cybersecurity portfolio with dark/light themes and SEO
- portfolio-v2 — Next.js + Tailwind + Framer Motion pattern

Take layout and interaction ideas from these; don't copy their branding.

## 6. Tech stack and architecture

**Recommended stack**

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router) + TypeScript | Builds on his React skills; static pages plus easy server routes for the contact form |
| Styling | Tailwind CSS + shadcn/ui | The most common pairing in the template set; fast to build, easy to theme |
| Animation | Framer Motion | Scroll reveals and page transitions |
| Content | MDX files in the repo (Contentlayer or `next-mdx-remote`) | Add a project = add a file |
| Icons | lucide-react + simple-icons for tech logos | Lightweight |
| Contact form | Resend (API route) or Formspree | Free tier is enough |
| GitHub data | GitHub REST API at build time, revalidated every 24h | Live stats without client-side rate limits |
| Analytics | Vercel Analytics or Umami | Privacy-friendly |
| Hosting | Vercel (free), custom domain | Preview deploys on every pull request |

**Alternative:** Astro + Tailwind if he wants the lightest possible static site (NeonMint and 8-BitQuest use it). Pick one at kickoff; the PRD works for both.

**Start from a template or from scratch?** Fastest path: fork a Next.js + Tailwind template (e.g. portfolio-v2), strip it down and re-theme it. Better learning and a stronger interview story: build from scratch with shadcn/ui, using the templates only as reference. Either way, check the template's license and credit it in the README.

**Architecture:** Fully static pages generated at build time from MDX and the GitHub API, with one serverless route (`/api/contact`) for the form. No database.

## 7. Content model and folder structure

```
portfolio/
├─ app/
│  ├─ page.tsx              # home (all sections)
│  ├─ projects/page.tsx     # all projects + filters
│  ├─ projects/[slug]/page.tsx
│  ├─ api/contact/route.ts
│  └─ not-found.tsx
├─ components/              # Hero, SkillBlades, ProjectCard, Timeline, ThemeToggle…
├─ content/
│  ├─ projects/*.mdx        # one file per project
│  └─ experience.json
├─ data/site.ts             # name, headline, bio, links, skills
├─ public/                  # images, og-image.png, resume.pdf
└─ lib/github.ts            # build-time GitHub fetch
```

**Project frontmatter**

```yaml
title: Starkproof
slug: starkproof
summary: Privacy-preserving proof of reserves for exchanges using zk-STARKs
role: "What I did — e.g. built the verifier UI"
tags: [Web3, Security]
stack: [TypeScript, zk-STARKs]
repo: https://github.com/SamuelDharshi/Starkproof
demo: ""
cover: /images/starkproof.png
featured: true
order: 1
date: 2025-09
```

**Site config (`data/site.ts`):** name, headline, bio, location, email, socials, resume path, and the skills grouped by blade, so personal details live in one place.

## 8. Non-functional requirements

- **Performance:** Lighthouse ≥ 95 on Performance, Accessibility, Best Practices and SEO; LCP under 2.5s on mobile 4G; images in AVIF/WebP via `next/image`; total JS on the home page under \~150 KB gzipped.
- **Accessibility:** WCAG 2.1 AA — colour contrast ≥ 4.5:1, full keyboard navigation, visible focus states, alt text on every image, semantic headings.
- **SEO and sharing:** unique title and description per page, Open Graph and Twitter card images (generated per project), `sitemap.xml`, `robots.txt`, JSON-LD `Person` schema linking GitHub and LinkedIn.
- **Responsive:** tested at 360, 768, 1024 and 1440px; touch targets ≥ 44px.
- **Security and privacy:** API keys only in server environment variables; contact form rate-limited with a honeypot field; no personal phone number or home address published.
- **Maintainability:** ESLint + Prettier, TypeScript strict mode, a README explaining how to add a project, and preview deploys on every pull request.

## 9. Milestones

| Phase | Duration | Deliverables |
| --- | --- | --- |
| 0. Content prep | 2–3 days | Bio, headline, photo, resume PDF, 4–6 projects chosen with screenshots and write-ups |
| 1. Setup | 1 day | Repo, Next.js + Tailwind + shadcn/ui, theme tokens, deploy skeleton to Vercel |
| 2. Home page MVP | 3–4 days | F1–F4, F6, F7 working with real content |
| 3. Project pages | 2–3 days | MDX pipeline, `/projects`, case study template (F5, F11) |
| 4. Polish | 2–3 days | Dark/light theme, animations, contact form, GitHub stats, timeline (F8–F10, F12) |
| 5. Launch | 1 day | SEO, OG images, Lighthouse pass, custom domain, link added to GitHub profile and LinkedIn |
| 6. Later | ongoing | Command palette, blog, interactive hero (F13–F15) |

Total for v1: about 2–3 weeks part-time.

## 10. Success metrics, risks and open questions

**Success metrics**

- Lighthouse ≥ 95 across all four categories at launch
- Portfolio link added to GitHub profile, LinkedIn and resume
- ≥ 30% of visitors open at least one project page (analytics)
- Recruiter or collaborator contacts arriving through the site within 2 months

**Risks**

| Risk | Mitigation |
| --- | --- |
| Featured work is mostly forks, which weakens credibility | Feature only projects he contributed to, state his exact role, and prioritise 2–3 original builds |
| Anime theme reads as unprofessional or raises IP issues | Keep the dojo metaphor in copy and an original visual style; no character art |
| Too many animations slow the site | Performance budget in section 8; animations only on scroll and respect reduced motion |
| College email stops working after graduation | Use a personal or custom-domain email |

**Open questions**

- Which 4–6 projects are featured, and what did Samuel build in each?
- Next.js or Astro?
- Custom domain name (e.g. samueldharshi.dev)?
- Is a blog wanted in v1 or later?
- What is the primary goal right now: internship, full-time role, freelance or hackathon teams?
