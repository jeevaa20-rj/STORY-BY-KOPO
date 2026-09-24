"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { categories, type GalleryCategory, type GalleryImage } from "@/lib/data";
import { Lightbox } from "@/components/lightbox";

export function PortfolioGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const filtered = useMemo(
    () => (filter === "All" ? images : images.filter((image) => image.category === filter)),
    [filter, images],
  );
  const close = useCallback(() => setActiveIndex(null), []);
  const change = useCallback((index: number) => setActiveIndex(index), []);

  return (
    <>
      <div className="mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap" role="tablist" aria-label="Filter portfolio">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-pill ${filter === category ? "filter-pill--active" : ""}`}
            onClick={() => setFilter(category)}
            role="tab"
            aria-selected={filter === category}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((image, index) => (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              key={image.id}
              className="portfolio-tile group relative mb-4 block w-full break-inside-avoid overflow-hidden bg-stone text-left"
              onClick={() => setActiveIndex(index)}
              aria-label={`Enlarge: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition duration-1000 ease-out group-hover:scale-[1.025]"
                style={{ objectPosition: image.objectPosition }}
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 translate-y-2 text-[0.62rem] uppercase tracking-[0.22em] text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">{image.category}</span>
              <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition duration-500 group-hover:opacity-100"><Expand size={15} /></span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {activeIndex !== null && (
        <Lightbox images={filtered} activeIndex={activeIndex} onClose={close} onChange={change} />
      )}
    </>
  );
}
