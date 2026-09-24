import type { Metadata } from "next";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSiteSettings } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contact",
  description: "Enquire about wedding, portrait, engagement or event photography with Story by Kopi.",
};

export default async function ContactPage() {
  const siteDetails = await getSiteSettings();
  const whatsappText = encodeURIComponent("Hello Story by Kopi, I'd love to ask about a photography session.");
  return (
    <main>
      <Header />
      <section className="page-hero bg-ivory">
        <div className="shell grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow mb-6 text-copper">Start a conversation</p>
            <h1 className="page-title">Tell us what you<br /><span className="italic text-copper">want to remember.</span></h1>
          </div>
          <p className="max-w-md pb-2 text-sm leading-7 text-ink/60">Share as much or as little as you know. You&apos;ll hear back within two working days with availability and a thoughtful next step.</p>
        </div>
      </section>
      <section className="section bg-warm-white pt-0">
        <div className="shell grid gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <aside>
            <p className="eyebrow mb-7 text-copper">Direct</p>
            <div className="space-y-6 text-sm">
              <a className="contact-row" href={`mailto:${siteDetails.email}`}><Mail size={17} /><span>{siteDetails.email}</span></a>
              {siteDetails.phone && <a className="contact-row" href={`tel:${siteDetails.phone.replace(/\s/g, "")}`}><Phone size={17} /><span>{siteDetails.phone}</span></a>}
              {siteDetails.whatsapp && <a className="contact-row" href={`https://wa.me/${siteDetails.whatsapp}?text=${whatsappText}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /><span>WhatsApp enquiry</span></a>}
              <a className="contact-row" href={`https://instagram.com/${siteDetails.instagram}`} target="_blank" rel="noreferrer"><Instagram size={17} /><span>@{siteDetails.instagram}</span></a>
              <p className="contact-row"><MapPin size={17} /><span>{siteDetails.location}</span></p>
            </div>
            <div className="mt-10 border-t border-ink/15 pt-7">
              <p className="font-serif text-2xl italic">Good stories travel.</p>
              <p className="mt-3 text-sm leading-7 text-ink/55">For destination weddings and events, include your location and approximate dates in the form.</p>
            </div>
          </aside>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
