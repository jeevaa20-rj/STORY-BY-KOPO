import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { getSiteSettings } from "@/lib/sanity";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Wedding Photography",
  "Highlight Films",
  "Pre-wedding Sessions",
  "Portrait Sessions",
  "Event Coverage",
];

const footerGallery = [
  { src: "/images/wedm.jpg", alt: "Wedding ceremony vows", label: "Ceremonies" },
  { src: "/images/wedabi.jpg", alt: "Newlyweds celebration", label: "Receptions" },
  { src: "/images/model.jpg", alt: "Bridal portrait", label: "Portraits" },
  { src: "/images/wedm.jpg", alt: "Candid emotional moment", label: "Unscripted" },
];

export async function Footer() {
  const siteDetails = await getSiteSettings();

  return (
    <footer className="footer-root">
      {/* ── Top Visual Statement Hero with Real Photograph Backdrop ── */}
      <div className="footer-statement-banner relative overflow-hidden">
        <Image
          src="/images/wedabi.jpg"
          alt="Atmospheric wedding celebration"
          fill
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.25] contrast-[1.05]"
        />
        <div className="footer-statement-overlay absolute inset-0 bg-gradient-to-t from-[#11120f] via-[#11120f]/60 to-transparent" />
        
        <div className="shell relative z-10 py-20 sm:py-28">
          <div className="max-w-3xl">
            <span className="eyebrow text-copper-light">Let&apos;s preserve your legacy</span>
            <p className="footer-statement-text mt-4">
              Every moment deserves to be{" "}
              <em>remembered honestly.</em>
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              Whether on a sunlit coast or beneath candlelit arches, we are dedicated to framing what feels true to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="button button--copper">
                Start your story <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/portfolio" className="button button--outline">
                View portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Visual Mini-Gallery Row in Footer ── */}
      <div className="footer-gallery-strip border-y border-white/10 bg-[#0d0e0c]">
        <div className="shell py-6">
          <div className="mb-4 flex items-center justify-between text-xs tracking-widest text-white/40 uppercase">
            <span>Visual Journal</span>
            <span>Frames from recent celebrations</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {footerGallery.map((item, idx) => (
              <div key={idx} className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#22231e] shadow-md">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-2.5 left-3 text-[0.65rem] font-medium tracking-wider text-white uppercase drop-shadow-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="footer-main">
        <div className="shell footer-grid">

          {/* Brand Column */}
          <div className="footer-brand">
            <Logo light />
            <p className="footer-tagline">
              Story-driven wedding photography and films, honestly observed and artfully preserved — Sri Lanka &amp; worldwide.
            </p>
            <div className="footer-social">
              {siteDetails.instagram && (
                <a
                  href={`https://instagram.com/${siteDetails.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link"
                  aria-label="Follow on Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {siteDetails.facebook && (
                <a
                  href={siteDetails.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link"
                  aria-label="Follow on Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
              <a
                href={`mailto:${siteDetails.email}`}
                className="footer-social-link"
                aria-label="Send an email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <p className="footer-col-heading">Navigate</p>
            <nav className="footer-nav" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="footer-nav-link">
                  <span>{link.label}</span>
                  <ArrowUpRight size={12} className="footer-nav-arrow" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <p className="footer-col-heading">Services</p>
            <ul className="footer-services" aria-label="Our services">
              {services.map((s) => (
                <li key={s} className="footer-service-item">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col">
            <p className="footer-col-heading">Get in touch</p>
            <div className="footer-contact-list">
              <a href={`mailto:${siteDetails.email}`} className="footer-contact-row">
                <Mail size={14} className="footer-contact-icon" aria-hidden="true" />
                <span>{siteDetails.email}</span>
              </a>
              {siteDetails.phone && (
                <a href={`tel:${siteDetails.phone}`} className="footer-contact-row">
                  <Phone size={14} className="footer-contact-icon" aria-hidden="true" />
                  <span>{siteDetails.phone}</span>
                </a>
              )}
              {siteDetails.location && (
                <div className="footer-contact-row footer-contact-row--static">
                  <MapPin size={14} className="footer-contact-icon" aria-hidden="true" />
                  <span>{siteDetails.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="shell footer-bottom-inner">
          <p>© {new Date().getFullYear()} Story by Kopi. All rights reserved.</p>
          <p className="footer-bottom-tagline">Made for stories worth keeping</p>
        </div>
      </div>
    </footer>
  );
}
