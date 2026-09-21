import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { gallery } from "@/lib/gallery";
import { getFeaturedProducts } from "@/lib/products";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const values = [
  {
    title: "Cleanly Formulated",
    text: "No parabens, sulfates or synthetic dyes — ever.",
  },
  {
    title: "Kind to Every Skin",
    text: "Cruelty-free and dermatologist-screened formulas.",
  },
  {
    title: "Small Batch",
    text: "Made fresh, in minute batches, with raw honey.",
  },
  {
    title: "Bee-Loved Ingredients",
    text: "Propolis, honey and beeswax in every hero product.",
  },
];

const editorial = [
  {
    index: "01",
    href: "/about",
    label: "Our story",
    text: "How a tiny studio became a little community.",
  },
  {
    index: "02",
    href: "/services",
    label: "The studio",
    text: "Facials, makeup and rituals, appointment only.",
  },
  {
    index: "03",
    href: "/gallery",
    label: "The work",
    text: "Golden-hour looks and serendipity from the chair.",
  },
];

const testimonials = [
  {
    quote:
      "The Radiance Glow Serum is the first thing that's made my skin actually look dewy. I get compliments nearly every day now.",
    name: "Amara W.",
    detail: "Loyal customer since 2023",
  },
  {
    quote:
      "I booked the Glass Skin Treatment before my wedding and honestly cried at the result. Bee and her team are pure magic.",
    name: "Priya L.",
    detail: "Bridal client, June 2025",
  },
  {
    quote:
      "Everything smells like a Sunday morning. The Honey Silk Body Butter is dangerously addictive.",
    name: "Sofia R.",
    detail: "Bodycare lover",
  },
];

export default function Home() {
  const featured = getFeaturedProducts(4);
  const previewServices = services.slice(0, 3);
  const previewGallery = gallery.slice(0, 5);

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cocoa">
              {site.tagline}
            </p>
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-6xl">
              Beauty that&rsquo;s
              <br />
              as <span className="italic">natural</span> as it
              <br />
              is <span className="italic">glowy</span>.
            </h1>
            <p className="editorial-text mt-6 max-w-xl text-lg text-cocoa">
              Clean, cruelty-free skincare, makeup and body care — crafted with
              raw honey and little rituals that make every day feel golden.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-honey"
              >
                Book a session
                <ArrowIcon />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors hover:border-espresso/50 hover:bg-bone"
              >
                Shop the collection
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-espresso/10 pt-8">
              {[
                ["12k+", "Happy clients"],
                ["40+", "Clean formulas"],
                ["4.9★", "Average rating"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-serif text-2xl font-medium">{value}</dd>
                  <dd className="mt-1 text-[11px] uppercase tracking-wider text-cocoa">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-7">
            <div className="arch-image relative h-72 overflow-hidden border border-espresso/10 shadow-xl sm:h-96 lg:h-[30rem]">
              <Image
                src="/images/Homecard.jpg"
                alt="Inside the Beauty by Bee studio"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ——— Values strip ——— */}
      <section className="border-y border-espresso/10 bg-parchment">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {values.map((value, i) => (
            <div key={value.title}>
              <p className="font-serif text-sm italic text-cocoa">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-serif text-base font-medium">
                {value.title}
              </h3>
              <p className="editorial-text mt-2 text-sm text-cocoa">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— The story / editorial ——— */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="arch-image overflow-hidden border border-espresso/10 shadow-lg">
              <Image
                src="/images/facecard.jpg"
                alt="Beauty by Bee studio imagery"
                width={800}
                height={1000}
                className="w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Welcome to the hive"
              title="A beauty brand built like a love letter to your skin"
            />
            <p className="editorial-text mt-6 text-lg text-cocoa">
              We started Beauty by Bee in a tiny corner studio with two brushes,
              a dangerously good facial recipe, and a single belief: skincare
              should feel like self-care, not maintenance. Today our clean
              formulations are made in small batches and our facials are booked
              out weeks ahead — but nothing here is mass-produced, and nothing
              leaves the studio without a love note printed on the box.
            </p>
            <ul className="mt-10 space-y-4">
              {editorial.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start justify-between gap-6 border-b border-espresso/10 pb-4 transition-colors hover:border-espresso/40"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-serif text-sm italic text-cocoa">
                        {item.index}
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                          {item.label}
                        </p>
                        <p className="editorial-text mt-1 text-sm text-cocoa">
                          {item.text}
                        </p>
                      </div>
                    </div>
                    <ArrowIcon className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Featured products ——— */}
      <section className="border-y border-espresso/10 bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Shop the collection"
              title="Our most loved formulas"
            />
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa transition-colors hover:text-espresso"
            >
              View all products
              <ArrowIcon />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ——— Services preview ——— */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="The studio"
            title="Rituals, not procedures"
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa transition-colors hover:text-espresso"
          >
            All services
            <ArrowIcon />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {previewServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* ——— Gallery preview ——— */}
      <section className="border-y border-espresso/10 bg-parchment py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Visual harmonies"
              title="Little moments of glow"
            />
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-cocoa transition-colors hover:text-espresso"
            >
              Full gallery
              <ArrowIcon />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {previewGallery.map((item) => (
              <Link
                key={item.slug}
                href="/gallery"
                className={`group overflow-hidden rounded-full border border-espresso/10 bg-bone ${
                  item.tall ? "row-span-2" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="sr-only">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Testimonials ——— */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading eyebrow="Kind words" title="What our community says" />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-t border-espresso/15 pt-7">
              <div className="text-[13px] tracking-[0.2em] text-honey" aria-label="5 out of 5">
                ★★★★★
              </div>
              <blockquote className="editorial-text mt-5 font-serif text-xl leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-cocoa">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ——— CTA banner ——— */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-espresso px-6 py-16 text-center text-cream sm:px-16">
          <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">
            Join the hive.
          </h2>
          <p className="editorial-text mx-auto mt-4 max-w-xl text-base text-cream/80">
            Sign up for our little letters — new formula drops, salon
            availability and one honest skincare tip a month. No spam, ever.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}