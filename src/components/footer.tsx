import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { getSiteSettings } from "@/lib/sanity";

export async function Footer() {
  const siteDetails = await getSiteSettings();
  return (
    <footer className="border-t border-white/10 bg-ink pb-8 pt-16 text-ivory">
      <div className="shell">
        <div className="grid gap-14 pb-16 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-7 max-w-sm text-sm leading-7 text-white/55">Honest photographs for the moments you will want to return to, long after the day has passed.</p>
          </div>
          <div>
            <p className="eyebrow mb-5 text-white/40">Explore</p>
            <nav className="flex flex-col gap-3 text-sm text-white/70" aria-label="Footer navigation">
              <Link href="/portfolio">Portfolio</Link><Link href="/stories">Stories</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div>
            <p className="eyebrow mb-5 text-white/40">Start a conversation</p>
            <a href={`mailto:${siteDetails.email}`} className="inline-flex items-center gap-2 border-b border-copper pb-2 font-serif text-2xl">{siteDetails.email} <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-7 text-[0.62rem] uppercase tracking-[0.18em] text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Story by Kopi</p>
          <p>Made for stories worth keeping</p>
        </div>
      </div>
    </footer>
  );
}
