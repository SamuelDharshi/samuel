import type { Metadata } from "next";
import { Outfit, JetBrains_Mono, Bricolage_Grotesque, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { ScrollBar } from "@/components/Reveal";
import "./globals.css";
import { site } from "@/data/site";
import SceneLoader from "@/components/SceneLoader";
import ParticleBackground from "@/components/ParticleBackground";
import Loader from "@/components/Loader";
import Header from "@/components/Header";

const body = Outfit({ variable: "--f-body", subsets: ["latin"], weight: ["300","400","500","700","900"] });
const dsp = Bricolage_Grotesque({ variable: "--f-display", subsets: ["latin"], weight: ["700","800"] });
const serif = Instrument_Serif({ variable: "--f-serif", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const grotesk = Space_Grotesk({ variable: "--f-sub", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--f-jb", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.headline}`, template: `%s · ${site.name}` },
  description: site.bio,
  openGraph: { title: site.name, description: site.headline, type: "website" },
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Software developer",
  url: site.url,
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${body.variable} ${dsp.variable} ${serif.variable} ${grotesk.variable} ${mono.variable} antialiased`}>
      <body suppressHydrationWarning className="grain relative flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Loader />
        <ScrollBar />
        <ParticleBackground />
        <SceneLoader />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <footer className="relative z-10 mt-24 border-t-2 border-fg bg-bg">
          <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-muted">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <span className="flex gap-4"><a className="hover:text-fg" href={site.github}>GitHub</a><a className="hover:text-fg" href={site.linkedin}>LinkedIn</a><a className="hover:text-fg" href="/resume">Resume</a></span>
          </div>
        </footer>
      </body>
    </html>
  );
}
