"use client";
import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try { await navigator.clipboard.writeText(email); setDone(true); setTimeout(() => setDone(false), 1500); } catch {}
      }}
      className="box min-h-11 px-5 text-sm font-bold uppercase tracking-wide"
    >
      {done ? "Copied ✓" : "Copy email"}
    </button>
  );
}
