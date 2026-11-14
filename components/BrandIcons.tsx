import { siGithub } from "simple-icons";

export function GithubIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="GitHub" className={className} fill="currentColor">
      <path d={siGithub.path} />
    </svg>
  );
}

export function LinkedinIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="LinkedIn" className={className}>
      <rect width="24" height="24" rx="4" fill="currentColor" />
      <text x="12" y="17" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="Arial, sans-serif" style={{ fill: "var(--bg)" }}>in</text>
    </svg>
  );
}
