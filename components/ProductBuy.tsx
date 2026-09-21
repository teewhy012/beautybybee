"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/products";

export function ProductBuy({ product }: { product: Product }) {
  const { add, openCart } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-espresso/15">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-12 w-12 rounded-full text-xl leading-none transition-colors hover:bg-white"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center font-medium">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="h-12 w-12 rounded-full text-xl leading-none transition-colors hover:bg-white"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            add(product.slug, qty);
            setQty(1);
          }}
          className="flex-1 rounded-full bg-espresso px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-honey"
        >
          Add {qty > 1 ? `${qty} to cart` : "to cart"}
        </button>
      </div>
      <button
        type="button"
        onClick={() => {
          add(product.slug, qty);
          openCart();
        }}
        className="mt-3 w-full rounded-full border border-espresso/20 bg-white/60 px-7 py-3.5 text-sm font-medium transition-colors hover:border-espresso/40 hover:bg-white"
      >
        Buy it now
      </button>
      <Link
        href="/checkout"
        className="mt-2 block text-center text-sm text-cocoa underline-offset-2 hover:text-espresso hover:underline"
      >
        Go to checkout
      </Link>
    </div>
  );
}