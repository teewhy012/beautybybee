import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductBuy } from "@/components/ProductBuy";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, products } from "@/lib/products";

export const dynamicParams = true;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.short,
  };
}

const perks = [
  "Cleanly formulated — no parabens, sulfates or synthetic dyes",
  "Cruelty-free and dermatologist-screened",
  "Small-batch fresh made",
  "Free shipping over ₦60 · 30-day returns",
];

export default async function ProductPage({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-cocoa">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-espresso">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/shop" className="hover:text-espresso">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-espresso">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] border border-espresso/10 bg-white/60 shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={1000}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-honey">
              {product.category}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-honey" aria-label={`Rated ${product.rating} out of 5`}>
                ★ {product.rating}
              </span>
              <span className="text-sm text-cocoa">
                {product.reviews} reviews
              </span>
              {product.badge && (
                <span className="rounded-full bg-blush px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-rose">
                  {product.badge}
                </span>
              )}
            </div>

            <p className="mt-5 font-serif text-3xl font-semibold">
              {formatPrice(product.priceCents)}
            </p>

            <p className="mt-6 text-base leading-7 text-cocoa">
              {product.short}
            </p>
            <p className="mt-4 text-base leading-7 text-cocoa">
              {product.description}
            </p>

            <div className="mt-8">
              <ProductBuy product={product} />
            </div>

            <ul className="mt-8 space-y-2.5 border-t border-espresso/10 pt-6">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-cocoa">
                  <span className="mt-0.5 text-honey">✓</span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white/50 py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              align="left"
              eyebrow="Complete the ritual"
              title={`More ${product.category.toLowerCase()}`}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}