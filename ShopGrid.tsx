"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import {
  categories,
  products,
  type ProductCategory,
} from "@/lib/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function ShopGrid() {
  const [category, setCategory] = useState<"All" | ProductCategory>("All");
  const [sort, setSort] = useState<SortKey>("featured");

  const visible = useMemo(() => {
    const filtered =
      category === "All"
        ? [...products]
        : products.filter((p) => p.category === category);
    switch (sort) {
      case "price-asc":
        return filtered.sort((a, b) => a.priceCents - b.priceCents);
      case "price-desc":
        return filtered.sort((a, b) => b.priceCents - a.priceCents);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered.sort((a, b) => b.reviews - a.reviews);
    }
  }, [category, sort]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-espresso text-cream"
                  : "border border-espresso/15 bg-white/60 text-cocoa hover:border-espresso/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-cocoa">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 rounded-full border border-espresso/15 bg-white px-4 text-sm font-medium text-espresso outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-20 text-center text-cocoa">
          No products found in this category yet.
        </p>
      )}
    </div>
  );
}