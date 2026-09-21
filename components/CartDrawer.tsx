"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/CartProvider";
import { CloseIcon } from "@/components/icons";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { lines, count, total, isOpen, closeCart, updateQty, remove } =
    useCart();

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-espresso/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <h2 className="font-serif text-xl font-semibold">
            Your Cart{" "}
            <span className="text-sm font-normal text-cocoa">
              ({count} {count === 1 ? "item" : "items"})
            </span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/10 bg-white/70 transition-colors hover:bg-white"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-lg font-medium">Your cart is feeling light.</p>
            <p className="text-sm text-cocoa">
              Discover our cruelty-free skincare, makeup and body care.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-full bg-espresso px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-cocoa"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-espresso/10 overflow-y-auto px-6">
              {lines.map((line) => (
                <li key={line.slug} className="flex gap-4 py-4">
                  <Link
                    href={`/shop/${line.slug}`}
                    onClick={closeCart}
                    className="shrink-0 overflow-hidden rounded-2xl border border-espresso/10 bg-white"
                  >
                    <Image
                      src={line.image}
                      alt={line.name}
                      width={80}
                      height={100}
                      className="h-24 w-20 object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/shop/${line.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium leading-snug hover:text-honey"
                        >
                          {line.name}
                        </Link>
                        <p className="mt-1 text-sm text-cocoa">
                          {formatPrice(line.priceCents)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        className="-m-2 p-2 text-xs text-cocoa underline-offset-2 hover:text-rose hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-espresso/15">
                        <button
                          type="button"
                          onClick={() => updateQty(line.slug, line.qty - 1)}
                          className="h-10 w-10 rounded-full text-lg leading-none transition-colors hover:bg-white"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-sm font-medium">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.slug, line.qty + 1)}
                          className="h-10 w-10 rounded-full text-lg leading-none transition-colors hover:bg-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(line.priceCents * line.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-espresso/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-cocoa">Subtotal</span>
                <span className="text-lg font-semibold">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="mt-1 text-xs text-cocoa">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 block rounded-full bg-espresso px-6 py-3.5 text-center text-sm font-medium text-cream transition-colors hover:bg-honey"
              >
                Checkout securely
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}