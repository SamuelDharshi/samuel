"use client";

export default function ThemeToggle() {
  function toggle() {
    const el = document.documentElement;
    const next = el.dataset.theme === "light" ? "dark" : "light";
    el.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  }
  return (
    <button onClick={toggle} aria-label="Toggle light/dark theme" className="min-h-11 min-w-11 box ml-2 grid place-items-center px-3 text-sm !shadow-[3px_3px_0_var(--fg)]">
      ◐
    </button>
  );
}
