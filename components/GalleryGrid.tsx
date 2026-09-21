"use client";

import Image from "next/image";
import { useState } from "react";

import { gallery, galleryCategories, type GalleryCategory } from "@/lib/gallery";

export function GalleryGrid() {
  const [active, setActive] = useState<"All" | GalleryCategory>("All");

  const visible =
    active === "All" ? gallery : gallery.filter((g) => g.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              active === category
                ? "bg-espresso text-cream"
                : "border border-espresso/15 bg-bone/70 text-cocoa hover:border-espresso/30"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((item) => (
          <figure
            key={item.slug}
            className={`group relative overflow-hidden rounded-full border border-espresso/10 ${
              item.tall ? "row-span-2" : ""
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={1000}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-espresso/70 to-transparent p-4 pt-12">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-amber">
                {item.category}
              </span>
              <p className="font-serif text-lg font-medium text-cream">
                {item.title}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}