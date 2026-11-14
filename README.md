# Samuel Dharshi N — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS. Static, no database.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Maintain

- Personal details, skills, experience, achievements: `data/site.ts`
- Add a project: add one entry to `data/projects.ts` (the page at `/projects/<slug>` is generated automatically)
- Resume: put the PDF at `public/resume.pdf` (`/resume` redirects to it)
- Set the real domain in `data/site.ts` (`url`) for sitemap and SEO
