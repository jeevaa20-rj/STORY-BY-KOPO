"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/config";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#171714", color: "#f2eee6", padding: "2rem", fontFamily: "sans-serif" }}>
        <div style={{ maxWidth: 620 }}>
          <p style={{ letterSpacing: ".18em", textTransform: "uppercase", fontSize: 11, color: "#c98f70" }}>Studio setup needed</p>
          <h1 style={{ fontFamily: "serif", fontSize: 52, fontWeight: 400, margin: "1rem 0" }}>Connect your Sanity project.</h1>
          <p style={{ lineHeight: 1.7, opacity: .7 }}>Add NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to your environment, then redeploy. This route will become the full Story by Kopi content studio.</p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
