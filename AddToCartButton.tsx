"use client";

import { useCart } from "@/components/CartProvider";

export function AddToCartButton({
  slug,
  variant = "full",
  label = "Add to cart",
  className = "",
}: {
  slug: string;
  variant?: "full" | "icon";
  label?: string;
  className?: string;
}) {
  const { add } = useCart();

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => add(slug)}
        className={`flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-cream transition-colors hover:bg-honey ${className}`}
        aria-label={`${label} ${slug}`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 3h2l2.2 12.2a1.5 1.5 0 0 0 1.5 1.3h8.9a1.5 1.5 0 0 0 1.5-1.2L20.5 7H5.6" />
          <circle cx="9.5" cy="20.5" r="1.4" />
          <circle cx="16.5" cy="20.5" r="1.4" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => add(slug)}
      className={`rounded-full bg-espresso px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-honey ${className}`}
    >
      {label}
    </button>
  );
}