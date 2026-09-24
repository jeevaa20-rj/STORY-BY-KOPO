import { galleryImages } from "@/lib/data";

export type InstagramPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
};

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const username = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "storybykopi";

  if (token) {
    try {
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=6&access_token=${token}`,
        { next: { revalidate: 3600 } },
      );
      if (response.ok) {
        const payload = await response.json();
        return payload.data.map(
          (post: {
            id: string;
            caption?: string;
            media_type: string;
            media_url: string;
            thumbnail_url?: string;
            permalink: string;
          }) => ({
            id: post.id,
            mediaUrl: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
            permalink: post.permalink,
            caption: post.caption || "Story by Kopi on Instagram",
          }),
        );
      }
    } catch {
      // Keep the portfolio usable while the Instagram token is absent or refreshing.
    }
  }

  return galleryImages.slice(0, 6).map((image) => ({
    id: `demo-${image.id}`,
    mediaUrl: image.src,
    permalink: `https://instagram.com/${username}`,
    caption: image.alt,
  }));
}
