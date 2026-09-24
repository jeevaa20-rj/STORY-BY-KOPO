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
  ],
  orderings: [{ title: "Event date, new to old", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "location", media: "coverImage" },
  },
});
