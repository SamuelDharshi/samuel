import type { Metadata } from "next";
import Marketplace from "@/components/Marketplace";

export const metadata: Metadata = { title: "Projects", description: "Every project by Samuel Dharshi N across agents, Web3, AI and full-stack." };

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-8 pt-32">
      <h1 className="mb-10 font-[family-name:var(--font-serif)] text-6xl uppercase sm:text-8xl">Projects</h1>
      <Marketplace />
    </div>
  );
}
