import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getStories, getStory } from "@/lib/sanity";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.description,
    openGraph: { images: [{ url: story.coverImage.src, alt: story.coverImage.alt }] },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = await getStory(slug);
  if (!story) notFound();
  const date = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(story.date));
  const gallery = story.gallery.length ? story.gallery : [story.coverImage];

  return (
    <main>
      <Header transparent />
      <section className="relative flex min-h-[76vh] items-end overflow-hidden bg-ink text-ivory">
        <Image src={story.coverImage.src} alt={story.coverImage.alt} fill priority sizes="100vw" className="object-cover" style={{ objectPosition: story.coverImage.objectPosition }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30" />
        <div className="shell relative z-10 pb-14 pt-40 sm:pb-20">
          <Link href="/stories" className="mb-9 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-white/65"><ArrowLeft size={14} /> All stories</Link>
          <p className="eyebrow mb-5 text-copper-light">{story.category} · {date}</p>
          <h1 className="max-w-5xl font-serif text-[clamp(3.4rem,8vw,7rem)] leading-[0.88] tracking-[-0.035em]">{story.title}</h1>
        </div>
      </section>
      <section className="section bg-ivory">
        <div className="shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow text-copper">The setting</p>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink/65"><MapPin size={15} /> {story.location}</p>
          </div>
          <p className="font-serif text-3xl leading-[1.25] sm:text-4xl">{story.description}</p>
        </div>
      </section>
      <section className="bg-warm-white pb-24 sm:pb-32">
        <div className="shell columns-1 gap-4 sm:columns-2">
          {gallery.map((image, index) => (
            <figure key={image.id} className="mb-4 break-inside-avoid overflow-hidden bg-stone">
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 640px) 100vw, 50vw" className="h-auto w-full" />
              {index === 0 && <figcaption className="sr-only">Opening photograph from {story.title}</figcaption>}
            </figure>
          ))}
        </div>
      </section>
      <section className="section bg-ivory text-center">
        <div className="shell">
          <p className="eyebrow mb-5 text-copper">Your turn</p>
          <h2 className="section-title">Have a story of your own?</h2>
          <Link href="/contact" className="button button--dark mt-8">Start a conversation <ArrowUpRight size={17} /></Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
