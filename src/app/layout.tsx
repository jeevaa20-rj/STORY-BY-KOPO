import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/app/globals.css";
import { Analytics } from "@/components/analytics";
import { WhatsAppButton } from "@/components/whatsapp-button";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storybykopi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Story by Kopi | Wedding & Portrait Photography", template: "%s | Story by Kopi" },
  description: "Story-driven wedding, portrait, engagement and event photography. Honest images, quietly observed and artfully preserved.",
  keywords: ["wedding photographer", "portrait photographer", "engagement photography", "event photography", "Story by Kopi"],
  openGraph: {
    title: "Story by Kopi",
    description: "Your story, held in light.",
    type: "website",
    images: [{ url: "/images/hero-courtyard.png", width: 1792, height: 1024, alt: "A Story by Kopi wedding photograph" }],
  },
  twitter: { card: "summary_large_image", title: "Story by Kopi", description: "Your story, held in light.", images: ["/images/hero-courtyard.png"] },
};

export const viewport: Viewport = { themeColor: "#171714", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
