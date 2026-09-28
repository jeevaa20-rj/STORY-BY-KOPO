"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const slides = [
  {
    src: "/images/wedabi.jpg",
    alt: "Newlyweds walking through an old stone courtyard at golden hour",
    label: "The courtyard vows",
    type: "Wedding",
    position: "center",
  },
  {
    src: "/images/model.jpg",
    alt: "Newlyweds dancing at a candlelit garden reception",
    label: "After the last toast",
    type: "Celebration",
    position: "center",
  },
  {
    src: "/images/wedm.jpg",
    alt: "Engaged couple walking through coastal grass at dusk",
    label: "Wild coast, soft light",
    type: "Pre-wedding",
    position: "center",
  },
];

const services = ["Weddings", "Portraits", "Pre-weddings", "Films", "Celebrations"];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const id = window.setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      6500,
    );
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero-gallery hero-reveal">
        <div className="home-hero-frame">
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className={`hero-slide ${index === active ? "hero-slide--active" : ""}`}
              aria-hidden={index !== active}
            >
              <Image
                src={slide.src}
                alt={index === active ? slide.alt : ""}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.position }}
              />
            </div>
          ))}

          <div className="home-hero-frame-top" aria-hidden="true">
            <span>Story by Kopi</span>
            <span>Frame / {String(active + 1).padStart(2, "0")}</span>
          </div>

          <div className="home-hero-caption" aria-live="polite">
            <span>{slides[active].type}</span>
            <strong>{slides[active].label}</strong>
          </div>
        </div>

        <div className="hero-controls" role="group" aria-label="Choose a hero photograph">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(index)}
              className={`hero-number ${index === active ? "hero-number--active" : ""}`}
              aria-label={`Show ${slide.type}: ${slide.label}`}
              aria-pressed={index === active}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="home-hero-scrim" aria-hidden="true" />
      <div className="home-hero-grid" aria-hidden="true" />

      <div className="shell home-hero-layout">
        <div className="home-hero-copy">
          <p className="availability-badge hero-reveal">
            <span aria-hidden="true" />
            Sri Lanka · Worldwide
          </p>

          <h1 id="home-hero-title" className="home-hero-title hero-reveal hero-reveal--delay-1">
            <span>Real moments.</span>
            <span className="home-hero-title-accent">Remarkably</span>
            <span>remembered.</span>
          </h1>

          <p className="home-hero-description hero-reveal hero-reveal--delay-2">
            Wedding photography and films with an editorial eye, a documentary heart, and room for the day to feel entirely yours.
          </p>

          <div className="home-hero-actions hero-reveal hero-reveal--delay-3">
            <Link href="/portfolio" className="button button--lime">
              Explore the work <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/contact" className="button button--ghost">
              Book a story
            </Link>
          </div>
        </div>
      </div>

      <a href="#intro" className="home-hero-scroll" aria-label="Scroll to the introduction">
        <ArrowDown size={16} aria-hidden="true" />
      </a>

      <div className="services-ticker">
        <span className="sr-only">Services: {services.join(", ")}</span>
        <div className="services-ticker-track" aria-hidden="true">
          {[...services, ...services].map((service, index) => (
            <span key={`${service}-${index}`}>
              {service}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
