"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/data";

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onChange,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const image = images[activeIndex];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((activeIndex + 1) % images.length);
      if (event.key === "ArrowLeft") onChange((activeIndex - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, images.length, onChange, onClose]);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/95 p-4" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button onClick={onClose} className="lightbox-button right-4 top-4" aria-label="Close photo viewer"><X /></button>
      <button onClick={() => onChange((activeIndex - 1 + images.length) % images.length)} className="lightbox-button left-4 top-1/2 -translate-y-1/2" aria-label="Previous photo"><ChevronLeft /></button>
      <div className="relative h-[82vh] w-[82vw]">
        <Image src={image.src} alt={image.alt} fill sizes="90vw" className="object-contain" priority />
      </div>
      <button onClick={() => onChange((activeIndex + 1) % images.length)} className="lightbox-button right-4 top-1/2 -translate-y-1/2" aria-label="Next photo"><ChevronRight /></button>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-[0.65rem] uppercase tracking-[0.2em] text-white/65">
        {activeIndex + 1} / {images.length} · {image.category}
      </p>
    </div>
  );
}
