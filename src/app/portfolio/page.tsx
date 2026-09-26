import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { galleryImages } from "@/lib/data";
import { getStories } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Story by Kopi wedding films, photography, portraits, engagements, and event coverage.",
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const stories = await getStories();

  const sanityImages = stories.flatMap((story) => [
    story.coverImage,
    ...story.gallery,
  ]);

  const portfolioImages =
    sanityImages.length > 0 ? sanityImages : galleryImages;

  return (
    <main>
      <Header />

      <section className="page-hero bg-ivory">
        <div className="shell grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow mb-6 text-copper">
              The portfolio
            </p>

            <h1 className="page-title">
              Stories in
              <br />
              <span className="italic text-copper">
                stillness & motion.
              </span>
            </h1>
          </div>

          <p className="max-w-md pb-2 text-sm leading-7 text-ink/60">
            Weddings, portraits, and celebrations preserved in photographs
            and films with an editorial eye and a documentary heart.
          </p>
        </div>
      </section>

      <section className="bg-ivory pb-24 sm:pb-32">
        <div className="shell">
          <PortfolioGrid images={portfolioImages} />
        </div>
      </section>

      <Footer />
    </main>
  );
}