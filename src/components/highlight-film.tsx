"use client";

import Image from "next/image";
import { ArrowUpRight, Film } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { HighlightVideo } from "@/lib/data";

type HighlightFilmProps = {
  video: HighlightVideo;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionPreference() {
  return false;
}

function Poster({ video }: HighlightFilmProps) {
  return (
    <Image
      src={video.poster.src}
      alt={video.poster.alt}
      fill
      sizes="(max-width: 1024px) 100vw, 66vw"
      className="object-cover"
    />
  );
}

export function HighlightFilm({ video }: HighlightFilmProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isFacebookEmbedLoaded, setIsFacebookEmbedLoaded] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (!("IntersectionObserver" in window)) {
      const timeoutId = setTimeout(() => setIsNearViewport(true), 0);
      return () => clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const facebookEmbedUrl = video.facebookVideoUrl
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.facebookVideoUrl)}&show_text=false&width=1280`
    : undefined;

  const teaser = isNearViewport && video.teaserVideoUrl ? (
    <video
      className="absolute inset-0 size-full object-cover"
      autoPlay={!prefersReducedMotion}
      muted
      loop
      playsInline
      preload="metadata"
      poster={video.poster.src}
      aria-label={`${video.title}. Poster: ${video.poster.alt}`}
    >
      <source src={video.teaserVideoUrl} />
      Your browser cannot play this video teaser. Use the Facebook link to watch the film.
    </video>
  ) : (
    <Poster video={video} />
  );

  return (
    <section className="highlight-film-section" aria-labelledby={`film-${video.title.replace(/\W+/g, "-").toLowerCase()}`}>
      <div className="shell">
        <div className="highlight-film-card">
          <div className="highlight-film-copy">
            <p className="eyebrow flex items-center gap-3 text-copper-light">
              <Film aria-hidden="true" size={15} /> Featured film
            </p>
            <h2
              id={`film-${video.title.replace(/\W+/g, "-").toLowerCase()}`}
              className="mt-6 max-w-xl font-serif text-[clamp(2.8rem,5vw,5.6rem)] leading-[0.92] tracking-[-0.035em]"
            >
              {video.title}
            </h2>
            {video.caption && (
              <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
                {video.caption}
              </p>
            )}
            {video.facebookVideoUrl && (
              <a
                href={video.facebookVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--outline mt-8"
              >
                Watch the full film on Facebook <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            )}
          </div>

          <div ref={frameRef} className="highlight-film-frame">
            {video.teaserVideoUrl ? (
              video.facebookVideoUrl ? (
                <a
                  href={video.facebookVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 block"
                  aria-label={`Watch ${video.title} on Facebook (opens in a new tab)`}
                >
                  {teaser}
                  <span className="highlight-film-play">Watch film <ArrowUpRight aria-hidden="true" size={16} /></span>
                </a>
              ) : teaser
            ) : (
              <>
                <Poster video={video} />
                {isNearViewport && facebookEmbedUrl && (
                  <iframe
                    src={facebookEmbedUrl}
                    title={`${video.title} — Facebook wedding highlight video`}
                    className={`absolute inset-0 z-10 size-full border-0 transition-opacity duration-500 ${
                      isFacebookEmbedLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => setIsFacebookEmbedLoaded(true)}
                    onError={() => setIsFacebookEmbedLoaded(false)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
