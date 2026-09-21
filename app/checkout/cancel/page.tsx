import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false },
};

export default function CancelPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush text-2xl text-rose">
        ×
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-honey">
        No worries at all
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight">
        Checkout cancelled
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base leading-7 text-cocoa">
        Nothing was charged and your cart is still waiting for you. Take your
        time — the honey isn&rsquo;t going anywhere.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/checkout"
          className="rounded-full bg-espresso px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-honey"
        >
          Back to checkout
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-espresso/20 bg-white/60 px-7 py-3.5 text-sm font-medium transition-colors hover:bg-white"
        >
          Keep shopping
        </Link>
      </div>
    </section>
  );
}