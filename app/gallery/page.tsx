import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the Beauty by Bee gallery — makeup looks, facials, nails and events from our studio.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="A peek behind the buzz"
        description="Makeup, facials, nails and events — a living album of everything our little studio creates."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <GalleryGrid />
      </section>
    </>
  );
}