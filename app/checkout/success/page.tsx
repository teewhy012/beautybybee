import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your Beauty by Bee order was successfully placed.",
  robots: { index: false },
};

export default async function SuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  const { session_id } = await searchParams;

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-honey text-3xl text-white">
        ✓
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
        We love a delivered glow
      </p>
      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight">
        Thank you — your order is on its way!
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base leading-7 text-cocoa">
        You&rsquo;ll receive a confirmation email with tracking details shortly.
        {typeof session_id === "string" && (
          <span className="mt-2 block text-sm text-cocoa/70">
            Reference: {session_id.slice(0, 8)}…
          </span>
        )}
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/shop"
          className="rounded-full bg-espresso px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-honey"
        >
          Continue shopping
        </Link>
        <Link
          href="/"
          className="rounded-full border border-espresso/20 bg-white/60 px-7 py-3.5 text-sm font-medium transition-colors hover:bg-white"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}