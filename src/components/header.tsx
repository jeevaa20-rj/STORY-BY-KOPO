"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overlay = transparent && !scrolled && !open;

  return (
    <header className={`site-header ${overlay ? "site-header--overlay" : "site-header--solid"}`}>
      <div className="shell flex h-[5.4rem] items-center justify-between">
        <Logo light={overlay} />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "nav-link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="button button--small header-book-button">
            Book a story
          </Link>
        </nav>
        <button
          className="grid size-11 place-items-center rounded-full border border-current/20 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}>
        <nav className="shell flex flex-col py-8" aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="mobile-link"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              <span className="font-serif text-[2.3rem] leading-none">{link.label}</span>
              <span className="text-xs tracking-[0.24em] text-copper">0{index + 1}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
