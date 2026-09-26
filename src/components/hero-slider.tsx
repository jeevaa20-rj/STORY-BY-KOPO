"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const slides = [
  {
    src: "/images/wedabi.jpg",
    alt: "Newlyweds walking through an old stone courtyard at golden hour",
    label: "Wedding · The Courtyard Vows",
    position: "center",
  },
  {
    src: "/images/model.jpg",
    alt: "Newlyweds dancing at a candlelit garden reception",
    label: "Celebration · After the Last Toast",
    position: "center",
  },
  {
    src: "/images/wedm.jpg",
    alt: "Engaged couple walking through coastal grass at dusk",
    label: "Engagement · Wild Coast, Soft Light",
    position: "center",
  },
];

export function HeroSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-ink text-ivory sm:min-h-[820px] lg:h-svh lg:min-h-[760px]">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`hero-slide ${index === active ? "hero-slide--active" : ""}`}
          aria-hidden={index !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slide.position }}
          />
        </div>
      ))}
      <div className="hero-scrim" />
      <div className="shell relative z-10 flex min-h-[760px] items-end pb-16 pt-40 sm:min-h-[820px] lg:h-svh lg:min-h-[760px] lg:items-center lg:pb-0">
        <div className="max-w-[920px]">
          <p className="eyebrow hero-reveal mb-6">Quietly observed · honestly remembered</p>
          <h1 className="hero-title hero-reveal hero-reveal--delay-1">
            Your story,
            <span className="block italic text-warm-white">held in light.</span>
          </h1>
          <div className="hero-reveal hero-reveal--delay-2 mt-9 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
            <p className="max-w-md text-sm leading-7 text-white/72 sm:text-base">
              Editorial wedding photography and films for people who want to remember how it felt—not just how it looked.
            </p>
            <Link href="/portfolio" className="button button--light">
              View portfolio <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-5 z-20 hidden items-center gap-4 sm:flex lg:right-10">
        <div className="text-right text-[0.65rem] uppercase tracking-[0.22em] text-white/60">{slides[active].label}</div>
        <div className="flex gap-1.5" aria-label="Choose hero image">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              onClick={() => setActive(index)}
              className={`hero-dot ${index === active ? "hero-dot--active" : ""}`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <a href="#intro" className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.24em] text-white/60 lg:flex">
        Scroll <ArrowDown size={16} />
      </a>
    </section>
  );
}
