import { MessageCircle } from "lucide-react";
import { getSiteSettings } from "@/lib/sanity";

export async function WhatsAppButton() {
  const siteDetails = await getSiteSettings();
  if (!siteDetails.whatsapp) return null;

  const text = encodeURIComponent("Hello Story by Kopi, I'd love to ask about a photography session.");
  return (
    <a
      href={`https://wa.me/${siteDetails.whatsapp}?text=${text}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-button"
      aria-label="Enquire on WhatsApp"
    >
      <MessageCircle size={20} />
      <span>Enquire</span>
    </a>
  );
}
