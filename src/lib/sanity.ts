import { createClient } from "next-sanity";
import {
  demoStories,
  siteDetails,
  type AboutContent,
  type GalleryCategory,
  type GalleryImage,
  type SiteSettings,
  type Story,
} from "@/lib/data";
import { cloudinaryUrl } from "@/lib/cloudinary";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(projectId);

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-03-01",
      useCdn: true,
    })
  : null;

type SanityImage = {
  alt?: string;
  cloudinaryPublicId?: string;
  asset?: { url?: string; metadata?: { dimensions?: { width?: number; height?: number } } };
};

type SanityStory = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  date?: string;
  location?: string;
  description?: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
};

const storiesQuery = `*[_type == "event"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  "category": category->name,
  date,
  location,
  description,
  coverImage { alt, cloudinaryPublicId, asset->{url, metadata{dimensions}} },
  gallery[] { alt, cloudinaryPublicId, asset->{url, metadata{dimensions}} }
}`;

function normalizeImage(image: SanityImage | undefined, id: string, category: GalleryCategory): GalleryImage {
  const width = image?.asset?.metadata?.dimensions?.width || 1600;
  const height = image?.asset?.metadata?.dimensions?.height || 1200;
  const cloudinarySource = image?.cloudinaryPublicId
    ? cloudinaryUrl(image.cloudinaryPublicId, { width: 2200 })
    : "";

  return {
    id,
    src: cloudinarySource || image?.asset?.url || "/images/hero-courtyard.png",
    alt: image?.alt || `${category} photograph by Story by Kopi`,
    category,
    width,
    height,
  };
}

function normalizeStory(story: SanityStory): Story {
  const category = (story.category || "Wedding") as GalleryCategory;
  return {
    _id: story._id,
    title: story.title,
    slug: story.slug,
    category,
    date: story.date || new Date().toISOString(),
    location: story.location || "Location available on request",
    description: story.description || "A story told in honest, unhurried frames.",
    coverImage: normalizeImage(story.coverImage, `${story._id}-cover`, category),
    gallery: (story.gallery || []).map((image, index) =>
      normalizeImage(image, `${story._id}-${index}`, category),
    ),
  };
}

export async function getStories(): Promise<Story[]> {
  if (!client) return demoStories;
  try {
    const stories = await client.fetch<SanityStory[]>(storiesQuery, {}, { next: { revalidate: 60 } });
    return stories.length ? stories.map(normalizeStory) : demoStories;
  } catch {
    return demoStories;
  }
}

export async function getStory(slug: string): Promise<Story | undefined> {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug);
}

const aboutQuery = `*[_type == "about"][0] {
  heading,
  bio,
  awards,
  profileImage { alt, asset->{url} }
}`;

const settingsQuery = `*[_type == "siteSettings"][0] {
  phone,
  email,
  whatsapp,
  instagram,
  facebook,
  location
}`;

export async function getAbout(): Promise<AboutContent> {
  const fallback: AboutContent = {
    heading: "Hello, I'm Kopi.",
    bio: [
      "I'm drawn to the beautifully unscripted—the small gestures, shifting light, and honest emotion that make a story entirely yours.",
      "Story by Kopi began with a simple belief: meaningful photographs don't come from manufacturing moments. They come from paying close attention. My role is to create calm, notice what others miss, and shape it all into a body of work that feels lived-in and true.",
    ],
    profileImage: { src: "/images/photographer.png", alt: "The photographer behind Story by Kopi holding a camera in a daylight studio" },
    awards: [],
  };
  if (!client) return fallback;
  try {
    const about = await client.fetch<{
      heading?: string;
      bio?: Array<{ children?: Array<{ text?: string }> }>;
      awards?: string[];
      profileImage?: { alt?: string; asset?: { url?: string } };
    } | null>(aboutQuery, {}, { next: { revalidate: 60 } });
    if (!about) return fallback;
    return {
      heading: about.heading || fallback.heading,
      bio: about.bio?.map((block) => block.children?.map((child) => child.text || "").join("") || "").filter(Boolean) || fallback.bio,
      profileImage: { src: about.profileImage?.asset?.url || fallback.profileImage.src, alt: about.profileImage?.alt || fallback.profileImage.alt },
      awards: about.awards || [],
    };
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!client) return siteDetails;
  try {
    const settings = await client.fetch<Partial<SiteSettings> | null>(settingsQuery, {}, { next: { revalidate: 60 } });
    return settings ? { ...siteDetails, ...settings } : siteDetails;
  } catch {
    return siteDetails;
  }
}
