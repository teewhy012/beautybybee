"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const { lines, count, total, updateQty, remove } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({ slug: line.slug, qty: line.qty })),
          email: email || undefined,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-medium sm:text-4xl">
          Your cart is empty
        </h1>
        <p className="mt-4 max-w-md text-cocoa">
          Add a few of our clean formulas and you&rsquo;ll be ready to check out
          in no time.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-espresso px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-honey"
        >
          Browse the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
        Checkout
      </h1>
      <p className="mt-3 text-sm text-cocoa">
        {count} {count === 1 ? "item" : "items"} ready for their forever home.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <ul className="divide-y divide-espresso/10">
            {lines.map((line) => (
              <li key={line.slug} className="flex gap-4 py-5">
                <Link
                  href={`/shop/${line.slug}`}
                  className="shrink-0 overflow-hidden rounded-2xl border border-espresso/10 bg-white"
                >
                  <Image
                    src={line.image}
                    alt={line.name}
                    width={120}
                    height={150}
                    className="h-32 w-28 object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/shop/${line.slug}`}
                        className="font-medium hover:text-honey"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-sm text-cocoa">
                        {formatPrice(line.priceCents)} each
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
                  <div className="mt-3 flex items-center justify-between">
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
                    <p className="font-semibold">
                      {formatPrice(line.priceCents * line.qty)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-3xl border border-espresso/10 bg-white/60 p-7 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-semibold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-cocoa">
              <dt>Subtotal</dt>
              <dd className="font-medium text-espresso">
                {formatPrice(total)}
              </dd>
            </div>
            <div className="flex justify-between text-cocoa">
              <dt>Shipping</dt>
              <dd className="font-medium text-espresso">Free</dd>
            </div>
            <div className="flex justify-between border-t border-espresso/10 pt-3 text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-semibold">{formatPrice(total)}</dd>
            </div>
          </dl>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="checkout-email"
                className="mb-1.5 block text-sm font-medium"
              >
                Email for your receipt
              </label>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full rounded-full border border-espresso/15 bg-white px-5 text-sm outline-none transition-colors placeholder:text-cocoa/60 focus:border-honey"
              />
            </div>
            {error && (
              <p
                role="alert"
                className="rounded-2xl border border-rose/40 bg-blush px-4 py-3 text-sm leading-6 text-rose"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-espresso px-7 py-4 text-sm font-medium text-cream transition-colors hover:bg-honey disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirecting to secure checkout…" : "Pay securely"}
            </button>
          </form>
          <p className="mt-4 text-center text-xs leading-5 text-cocoa">
            Payments are processed securely by Stripe. We never see or store
            your card details.
          </p>
        </aside>
      </div>
    </section>
  );
}