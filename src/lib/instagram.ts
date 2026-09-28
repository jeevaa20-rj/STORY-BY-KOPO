export type InstagramPost = {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
};

const fallbackPosts = [
  {
    mediaUrl: "/images/model.jpg",
    caption: "Bride in a green sari standing beneath a weathered stone arch",
  },
  {
    mediaUrl: "/images/wedabi.jpg",
    caption: "Newlyweds celebrating together beneath hanging lights",
  },
  {
    mediaUrl: "/images/wedm.jpg",
    caption: "Newlyweds smiling during their traditional wedding ceremony",
  },
  {
    mediaUrl: "/images/wedabi.jpg",
    caption: "A joyful wedding celebration captured in black and white",
  },
  {
    mediaUrl: "/images/wedm.jpg",
    caption: "A candid moment from a traditional wedding ceremony",
  },
  {
    mediaUrl: "/images/model.jpg",
    caption: "Bridal portrait framed by the texture of historic stone walls",
  },
];

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

  return fallbackPosts.map((image, index) => ({
    id: `demo-${index}`,
    mediaUrl: image.mediaUrl,
    permalink: `https://instagram.com/${username}`,
    caption: image.caption,
  }));
}
