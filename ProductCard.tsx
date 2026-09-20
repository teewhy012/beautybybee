import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div
      className="flex items-center gap-0.5 text-honey"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-3.5 w-3.5 ${i < full ? "fill-honey" : "fill-espresso/15"}`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M10 1.5 12.6 7l6 .6-4.5 4 1.3 5.9L10 14.6l-5.4 2.9L5.9 11.6l-4.5-4L7.4 7 10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-espresso/10 bg-white/70 transition-shadow hover:shadow-lg">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={1000}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-espresso/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-honey">
          {product.category}
        </p>
        <Link
          href={`/shop/${product.slug}`}
          className="font-serif text-lg font-medium leading-snug hover:text-honey"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-cocoa">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold">{formatPrice(product.priceCents)}</span>
          <AddToCartButton slug={product.slug} variant="icon" />
        </div>
      </div>
    </div>
  );
}