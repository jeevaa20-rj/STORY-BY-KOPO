import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StoryCard } from "@/components/story-card";
import { getStories } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Stories",
  description: "Recent wedding, portrait and event stories photographed by Story by Kopi.",
};

export default async function StoriesPage() {
  const stories = await getStories();
  return (
    <main>
      <Header />
      <section className="page-hero bg-warm-white text-center">
        <div className="shell">
          <p className="eyebrow mb-6 text-copper">The journal</p>
          <h1 className="page-title">Full stories,<br /><span className="italic text-copper">beautifully remembered.</span></h1>
        </div>
      </section>
      <section className="section bg-warm-white pt-0">
        <div className="shell grid gap-x-8 gap-y-20 md:grid-cols-2">
          {stories.map((story, index) => <StoryCard key={story._id} story={story} index={index} />)}
        </div>
      </section>
      <Footer />
    </main>
  );
}
