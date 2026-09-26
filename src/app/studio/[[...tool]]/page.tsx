"use client";

import dynamic from "next/dynamic";
import config from "@/sanity/config";

// Sanity owns its internal browser history. Loading the Studio client-only keeps
// that router out of Next's server hydration pass, where route segments can
// otherwise change the size of an internal memo dependency list.
const NextStudio = dynamic(
  () => import("next-sanity/studio").then((module) => module.NextStudio),
  { ssr: false },
);

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
