"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // On the home hero the nav is bare text; everywhere else (and after scrolling) it floats as a blurred bar.
  const floating = scrolled || path !== "/";

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1100px] items-center justify-between gap-2 px-4 py-1 transition-all duration-300 ${
          floating ? "rounded-2xl border border-fg/15 bg-bg/70 shadow-lg backdrop-blur-xl" : "border border-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-extrabold" aria-label="Home">
          <Image src="/logo.svg" alt="" width={28} height={28} />
          Samuel
        </Link>
        <ul className="flex items-center gap-1 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={`inline-flex min-h-11 items-center rounded-lg px-3 hover:bg-fg/10 ${path === l.href ? "font-bold underline decoration-2 underline-offset-4" : ""}`}>
                {l.label}
              </Link>
            </li>
          ))}
          <li><ThemeToggle /></li>
        </ul>
      </nav>
    </header>
  );
}
