import { aboutType } from "@/sanity/schemaTypes/about";
import { categoryType } from "@/sanity/schemaTypes/category";
import { eventType } from "@/sanity/schemaTypes/event";
import { siteSettingsType } from "@/sanity/schemaTypes/siteSettings";

export const schemaTypes = [eventType, categoryType, aboutType, siteSettingsType];
