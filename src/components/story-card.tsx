import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Story } from "@/lib/data";

export function StoryCard({ story, index = 0 }: { story: Story; index?: number }) {
  return (
    <article className="story-card group">
      <Link href={`/stories/${story.slug}`} className="block overflow-hidden" aria-label={`Open ${story.title}`}>
        <div className={`relative overflow-hidden bg-stone ${index % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
          <Image
            src={story.coverImage.src}
            alt={story.coverImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-1000 ease-out group-hover:scale-[1.035]"
            style={{ objectPosition: story.coverImage.objectPosition }}
          />
          <span className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-ivory/90 text-ink opacity-0 transition duration-500 group-hover:opacity-100">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4 border-t border-ink/15 pt-4">
        <div>
          <p className="mb-2 text-[0.66rem] uppercase tracking-[0.22em] text-copper">{story.category} · {story.location}</p>
          <h3 className="font-serif text-3xl leading-tight">{story.title}</h3>
        </div>
        <span className="pt-1 text-xs tabular-nums text-ink/50">0{index + 1}</span>
      </div>
    </article>
  );
}
