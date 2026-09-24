import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Hello, I'm Kopi." }),
    defineField({ name: "bio", title: "Biography", type: "array", of: [{ type: "block" }], validation: (rule) => rule.required() }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Accessible description", type: "string", validation: (rule) => rule.required() })],
    }),
    defineField({ name: "awards", title: "Awards & recognition", type: "array", of: [{ type: "string" }] }),
  ],
});
