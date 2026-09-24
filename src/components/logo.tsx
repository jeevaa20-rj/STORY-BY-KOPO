import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo-lockup ${light ? "text-ivory" : "text-ink"}`} aria-label="Story by Kopi, home">
      <span className="logo-mark" aria-hidden="true">SK</span>
      <span className="logo-words">
        <span>Story</span>
        <span>by Kopi</span>
      </span>
    </Link>
  );
}
