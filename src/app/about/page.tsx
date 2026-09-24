import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { getAbout } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the photographer behind Story by Kopi and discover the philosophy behind the photographs.",
};

export default async function AboutPage() {
  const about = await getAbout();
  const headingParts = about.heading.split(/,(.+)/);
  return (
    <main>
      <Header />
      <section className="section bg-ivory pt-36 sm:pt-44">
        <div className="shell grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <Image src={about.profileImage.src} alt={about.profileImage.alt} fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-3 bg-copper px-7 py-5 text-[0.62rem] uppercase leading-5 tracking-[0.18em] text-white sm:-right-8">Observer<br />storyteller<br />memory keeper</div>
          </Reveal>
          <Reveal className="order-1 lg:order-2" delay={0.12}>
            <p className="eyebrow mb-6 text-copper">Behind the lens</p>
            <h1 className="page-title">{headingParts[0]}{headingParts[1] && <><br /><span className="italic text-copper">{headingParts[1].trim()}</span></>}</h1>
            <p className="mt-8 max-w-xl font-serif text-2xl leading-9">{about.bio[0]}</p>
            {about.bio.slice(1).map((paragraph) => <p key={paragraph} className="body-copy mt-6 max-w-xl">{paragraph}</p>)}
            <Link href="/contact" className="button button--dark mt-9">Work with me <ArrowUpRight size={17} /></Link>
          </Reveal>
        </div>
      </section>
      <section className="section bg-ink text-ivory">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal><p className="eyebrow text-copper-light">The philosophy</p></Reveal>
          <Reveal delay={0.1}>
            <blockquote className="font-serif text-[clamp(2.5rem,5vw,4.7rem)] leading-[1.02] tracking-[-0.02em]">“The best photographs feel like <span className="italic text-copper-light">memory itself</span>—imperfect, warm, and alive.”</blockquote>
            <div className="mt-12 grid gap-8 border-t border-white/12 pt-9 sm:grid-cols-3">
              <div><p className="mb-3 font-serif text-3xl text-copper-light">01</p><h3 className="mb-2 text-xs uppercase tracking-[0.18em]">Unhurried</h3><p className="text-sm leading-7 text-white/50">Space to be present, with gentle direction only when you need it.</p></div>
              <div><p className="mb-3 font-serif text-3xl text-copper-light">02</p><h3 className="mb-2 text-xs uppercase tracking-[0.18em]">Intentional</h3><p className="text-sm leading-7 text-white/50">Every frame chosen for feeling, composition, and the story it carries.</p></div>
              <div><p className="mb-3 font-serif text-3xl text-copper-light">03</p><h3 className="mb-2 text-xs uppercase tracking-[0.18em]">Enduring</h3><p className="text-sm leading-7 text-white/50">Timeless color and honest texture made to outlive passing trends.</p></div>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
