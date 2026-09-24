import Image from "next/image";
import { Instagram } from "lucide-react";
import { getInstagramPosts } from "@/lib/instagram";

export async function InstagramFeed() {
  const posts = await getInstagramPosts();
  const username = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "storybykopi";

  return (
    <section className="bg-ink py-20 text-ivory sm:py-28">
      <div className="shell">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 text-copper-light">Follow the ongoing story</p>
            <h2 className="font-serif text-4xl sm:text-5xl">@{username}</h2>
          </div>
          <a href={`https://instagram.com/${username}`} target="_blank" rel="noreferrer" className="circle-link" aria-label="Open Instagram"><Instagram size={18} /></a>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, index) => (
            <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden bg-white/5" aria-label={post.caption}>
              <Image src={post.mediaUrl} alt={post.caption} fill sizes="(max-width: 768px) 50vw, 17vw" className="object-cover transition duration-700 group-hover:scale-105" style={{ objectPosition: index === 0 ? "75% center" : "center" }} />
              <span className="absolute inset-0 grid place-items-center bg-black/35 opacity-0 transition group-hover:opacity-100"><Instagram size={20} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
