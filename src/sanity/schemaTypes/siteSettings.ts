import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (rule) => rule.email() }),
    defineField({ name: "whatsapp", title: "WhatsApp number", description: "Include country code and digits only.", type: "string" }),
    defineField({ name: "instagram", title: "Instagram username", type: "string" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
    defineField({ name: "location", title: "Location / service area", type: "string" }),
    defineField({ name: "seoDescription", title: "Default SEO description", type: "text", rows: 3 }),
  ],
});
