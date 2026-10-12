import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stripPhotos = [
  {
    src: "/images/wedm.jpg",
    alt: "Wedding ceremony moment",
    caption: "Honest Vows",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/wedabi.jpg",
    alt: "Evening dance celebration",
    caption: "Golden Light",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/model.jpg",
    alt: "Bridal portrait",
    caption: "Portraits",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/wedm.jpg",
    alt: "Couple walking together",
    caption: "Unscripted Emotion",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/wedabi.jpg",
    alt: "Wedding reception celebration",
    caption: "Celebrations",
    aspect: "aspect-[4/5]",
  },
];

export function PhotoStrip() {
  return (
    <section className="photo-strip-section" aria-label="Visual journal highlights">
      <div className="shell mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-copper">Curated frames</p>
          <h2 className="font-serif text-3xl sm:text-4xl">Stories captured in motion & stillness</h2>
        </div>
        <Link href="/portfolio" className="text-link">
          Explore all work <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="photo-strip-scroll">
        <div className="photo-strip-track">
          {stripPhotos.map((photo, idx) => (
            <div key={`${photo.src}-${idx}`} className="photo-strip-item group">
              <div className={`photo-strip-frame ${photo.aspect}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 75vw, (max-width: 1200px) 35vw, 24vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="photo-strip-overlay">
                  <span className="photo-strip-caption">{photo.caption}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
