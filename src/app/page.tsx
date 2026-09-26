import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HighlightFilm } from "@/components/highlight-film";
import { HeroSlider } from "@/components/hero-slider";
import { InstagramFeed } from "@/components/instagram-feed";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import { getStories } from "@/lib/sanity";

export default async function Home() {
  const stories = await getStories();
  const storiesWithVideo = stories
    .filter((story) => story.highlightVideo)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredFilm =
    storiesWithVideo.find((story) => story.highlightVideo?.featuredVideo) ?? storiesWithVideo[0];
  return (
    <main>
      <Header transparent />
      <HeroSlider />

      <section id="intro" className="section bg-ivory">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow text-copper">Story by Kopi</p>
            <div className="mt-8 hidden h-24 w-px bg-copper/45 lg:block" />
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="section-title max-w-4xl">We preserve the feeling <span className="italic text-copper">between</span> the moments.</h2>
            <div className="mt-9 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2">
              <p className="body-copy">The hand squeeze before the doors open. The half-second glance across a crowded room. The laughter that arrives just after the posed photograph is over.</p>
              <div>
                <p className="body-copy">Our approach is calm, artful, and deeply human—making space for your day to unfold while preserving it with intention.</p>
                <Link href="/about" className="text-link mt-6">Meet the photographer <ArrowRight size={15} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-warm-white">
        <div className="shell">
          <Reveal className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-4 text-copper">Selected stories</p>
              <h2 className="section-title">Recent chapters</h2>
            </div>
            <Link href="/stories" className="text-link">View all stories <ArrowRight size={15} /></Link>
          </Reveal>
          <div className="grid gap-x-7 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {stories.slice(0, 3).map((story, index) => (
              <Reveal key={story._id} delay={index * 0.1} className={index === 1 ? "lg:pt-20" : ""}>
                <StoryCard story={story} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {featuredFilm?.highlightVideo && <HighlightFilm video={featuredFilm.highlightVideo} />}

      <section className="overflow-hidden bg-ink py-24 text-ivory sm:py-32">
        <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] max-w-[620px] overflow-hidden">
              <Image src="/images/wedabi.jpg" alt="Newlyweds celebrating together beneath hanging lights" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-3 grid size-32 place-items-center rounded-full border border-copper/50 bg-ink text-center font-serif text-sm italic text-copper-light sm:-right-9 sm:size-40">
              Honest<br />by nature<br />artful by choice
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="eyebrow mb-5 text-copper-light">The experience</p>
            <h2 className="section-title text-ivory">Present with you.<br /><span className="italic text-copper-light">Never in the way.</span></h2>
            <p className="mt-8 max-w-lg text-sm leading-8 text-white/60 sm:text-base">From the first conversation to the final photographs and films, the experience is unhurried and personal. We learn what matters to you, then let the day breathe.</p>
            <div className="mt-10 grid grid-cols-3 border-y border-white/12 py-7">
              <div><strong className="font-serif text-3xl font-normal">01</strong><p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/45">Connect</p></div>
              <div><strong className="font-serif text-3xl font-normal">02</strong><p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/45">Create</p></div>
              <div><strong className="font-serif text-3xl font-normal">03</strong><p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-white/45">Remember</p></div>
            </div>
            <Link href="/contact" className="button button--outline mt-9">Tell us your story <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-ivory text-center">
        <Reveal className="shell max-w-5xl">
          <p className="eyebrow mb-6 text-copper">Now booking</p>
          <h2 className="font-serif text-[clamp(3.2rem,8vw,7.6rem)] leading-[0.86] tracking-[-0.04em]">Let&apos;s make something<br /><span className="italic text-copper">worth remembering.</span></h2>
          <p className="mx-auto mt-8 max-w-lg text-sm leading-7 text-ink/60">Tell us where your story is taking place and what you want to hold onto. We&apos;ll take it from there.</p>
          <Link href="/contact" className="button button--dark mt-9">Check availability <ArrowUpRight size={17} /></Link>
        </Reveal>
      </section>

      <InstagramFeed />
      <Footer />
    </main>
  );
}
