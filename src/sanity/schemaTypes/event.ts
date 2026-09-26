import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event / Story",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], validation: (rule) => rule.required() }),
    defineField({ name: "date", title: "Date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Accessible description", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "cloudinaryPublicId", title: "Cloudinary public ID (optional)", description: "When supplied, the optimized Cloudinary asset is used on the website.", type: "string" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Accessible description", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
            defineField({ name: "cloudinaryPublicId", title: "Cloudinary public ID (optional)", type: "string" }),
          ],
        }),
      ],
      options: { layout: "grid" },
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "description", title: "Short story / caption", type: "text", rows: 5, validation: (rule) => rule.required().max(900) }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({
      name: "videoTitle",
      title: "Highlight film title",
      type: "string",
      description: "Optional title displayed with this story's highlight film.",
    }),
    defineField({
      name: "facebookVideoUrl",
      title: "Facebook video URL",
      type: "url",
      description: "Paste the secure URL of a public Facebook video or post from facebook.com or fb.watch.",
      validation: (rule) =>
        rule
          .uri({ scheme: ["https"], allowRelative: false })
          .custom((value) => {
            if (!value) return true;
            try {
              const hostname = new URL(value).hostname.toLowerCase();
              return hostname === "facebook.com" ||
                hostname.endsWith(".facebook.com") ||
                hostname === "fb.watch"
                ? true
                : "Use a public HTTPS URL from facebook.com, www.facebook.com, or fb.watch.";
            } catch {
              return "Enter a valid public Facebook video URL.";
            }
          }),
    }),
    defineField({
      name: "teaserVideoUrl",
      title: "Direct teaser video URL",
      type: "url",
      description: "Optional direct HTTPS video URL, normally a Cloudinary MP4. Do not paste a Facebook page URL here.",
      validation: (rule) =>
        rule
          .uri({ scheme: ["https"], allowRelative: false })
          .custom((value) => {
            if (!value) return true;
            try {
              const hostname = new URL(value).hostname.toLowerCase();
              return hostname === "facebook.com" ||
                hostname.endsWith(".facebook.com") ||
                hostname === "fb.watch"
                ? "Use the Facebook video URL field for Facebook links. This field must be a direct video URL."
                : true;
            } catch {
              return "Enter a valid direct HTTPS video URL.";
            }
          }),
    }),
    defineField({
      name: "videoPoster",
      title: "Video poster image",
      type: "image",
      options: { hotspot: true },
      description: "Displayed before the video loads and as a fallback. The story cover is used when no poster is uploaded.",
      fields: [
        defineField({
          name: "alt",
          title: "Accessible description",
          type: "string",
          description: "Describe what is visible in the poster for people using assistive technology.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "videoCaption",
      title: "Film caption",
      type: "text",
      rows: 3,
      description: "Optional short context displayed beneath the highlight film.",
    }),
    defineField({
      name: "featuredVideo",
      title: "Feature this film on the homepage",
      type: "boolean",
      description: "The newest featured film is shown on the homepage. Leave off for regular story films.",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Event date, new to old", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "location", media: "coverImage" },
  },
});
