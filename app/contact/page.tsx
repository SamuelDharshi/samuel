import type { Metadata } from "next";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import CopyEmail from "@/components/CopyEmail";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Samuel Dharshi N." };

const row = "box flex min-h-14 items-center gap-4 px-5 font-[family-name:var(--font-sub)] font-bold";

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-8 pt-32">
      <h1 className="font-[family-name:var(--font-serif)] text-6xl uppercase sm:text-8xl">Contact</h1>
      <p className="mt-6 font-[family-name:var(--font-sub)] text-lg sm:text-xl">Open to internships and hackathon teams.</p>
      <div className="mt-10 space-y-4">
        <a href={`mailto:${site.email}`} className={row}><Mail className="size-5" aria-hidden /> {site.email}</a>
        <a href={site.linkedin} className={row}><LinkedinIcon /> LinkedIn</a>
        <a href={site.github} className={row}><GithubIcon /> GitHub</a>
        <a href="/resume" className={row}><FileText className="size-5" aria-hidden /> Resume</a>
        <CopyEmail email={site.email} />
      </div>
    </div>
  );
}
