export type GalleryCategory =
  | "Wedding"
  | "Pre-wedding"
  | "Portrait"
  | "Engagement"
  | "Events";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
  objectPosition?: string;
};

export type Story = {
  _id: string;
  title: string;
  slug: string;
  category: GalleryCategory;
  date: string;
  location: string;
  description: string;
  coverImage: GalleryImage;
  gallery: GalleryImage[];
};

export type AboutContent = {
  heading: string;
  bio: string[];
  profileImage: { src: string; alt: string };
  awards: string[];
};

export type SiteSettings = {
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  location: string;
};

const images = {
  courtyard: "/images/hero-courtyard.png",
  quiet: "/images/quiet-moment.png",
  evening: "/images/evening-dance.png",
  coast: "/images/coastal-engagement.png",
  bouquet: "/images/bouquet-detail.png",
};

export const galleryImages: GalleryImage[] = [
  {
    id: "courtyard-wide",
    src: images.courtyard,
    alt: "Newlyweds walking hand in hand through a sunlit stone courtyard",
    category: "Wedding",
    width: 1792,
    height: 1024,
  },
  {
    id: "quiet-portrait",
    src: images.quiet,
    alt: "Newlywed couple sharing a quiet moment beside sheer curtains",
    category: "Wedding",
    width: 1024,
    height: 1280,
  },
  {
    id: "evening-dance",
    src: images.evening,
    alt: "Newlyweds dancing beneath warm lights at their evening reception",
    category: "Events",
    width: 1536,
    height: 1024,
  },
  {
    id: "coastal-walk",
    src: images.coast,
    alt: "Engaged couple walking through coastal grass at dusk",
    category: "Engagement",
    width: 1536,
    height: 1024,
  },
  {
    id: "bouquet-detail",
    src: images.bouquet,
    alt: "Bride holding an organic white bouquet with heirloom rings visible",
    category: "Wedding",
    width: 1024,
    height: 1280,
  },
  {
    id: "portrait-editorial",
    src: images.quiet,
    alt: "Editorial portrait framed by soft ivory curtains",
    category: "Portrait",
    width: 1024,
    height: 1280,
    objectPosition: "64% center",
  },
  {
    id: "prewedding-coast",
    src: images.coast,
    alt: "Relaxed pre-wedding portrait on a windswept coast",
    category: "Pre-wedding",
    width: 1536,
    height: 1024,
    objectPosition: "30% center",
  },
  {
    id: "reception-story",
    src: images.evening,
    alt: "Candlelit wedding guests surrounding the first dance",
    category: "Events",
    width: 1536,
    height: 1024,
    objectPosition: "68% center",
  },
  {
    id: "courtyard-portrait",
    src: images.courtyard,
    alt: "Wedding couple walking into their next chapter together",
    category: "Portrait",
    width: 1792,
    height: 1024,
    objectPosition: "78% center",
  },
];

export const demoStories: Story[] = [
  {
    _id: "story-01",
    title: "The Courtyard Vows",
    slug: "the-courtyard-vows",
    category: "Wedding",
    date: "2026-06-14",
    location: "Old Stone House",
    description:
      "A slow summer day shaped by handwritten vows, long tables, and the kind of laughter that carries into the night.",
    coverImage: galleryImages[0],
    gallery: [galleryImages[0], galleryImages[1], galleryImages[4], galleryImages[2]],
  },
  {
    _id: "story-02",
    title: "Wild Coast, Soft Light",
    slug: "wild-coast-soft-light",
    category: "Engagement",
    date: "2026-04-03",
    location: "The Western Coast",
    description:
      "No elaborate plan—just sea air, a weathered path, and two people entirely at ease with one another.",
    coverImage: galleryImages[3],
    gallery: [galleryImages[3], galleryImages[6], galleryImages[5]],
  },
  {
    _id: "story-03",
    title: "After the Last Toast",
    slug: "after-the-last-toast",
    category: "Events",
    date: "2026-02-21",
    location: "The Olive Garden",
    description:
      "A candlelit celebration that moved from quiet speeches to a dance floor under the trees.",
    coverImage: galleryImages[2],
    gallery: [galleryImages[2], galleryImages[7], galleryImages[4], galleryImages[1]],
  },
];

export const categories: (GalleryCategory | "All")[] = [
  "All",
  "Wedding",
  "Pre-wedding",
  "Portrait",
  "Engagement",
  "Events",
];

export const siteDetails: SiteSettings = {
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@storybykopi.com",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "storybykopi",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
  location: "Available locally & worldwide",
};
