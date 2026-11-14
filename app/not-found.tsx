import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-8 pt-40 text-center">
      <p className="font-mono font-bold">404</p>
      <h1 className="mt-2 font-[family-name:var(--font-serif)] text-6xl uppercase">Not found</h1>
      <p className="mt-3 text-muted">This page doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 box inline-flex min-h-11 items-center bg-pop px-6 font-bold uppercase text-black">Home</Link>
    </div>
  );
}
