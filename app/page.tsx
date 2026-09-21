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
    text: "No parabens, sulfates or synthetic dyes â€” ever.",
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
    href: "/about",
    label: "Our story",
    text: "How a tiny studio became a little community.",
  },
  {
    href: "/services",
    label: "The studio",
    text: "Facials, makeup and rituals, appointment only.",
  },
  {
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
      {/* â€”â€”â€” Hero â€”â€”â€” */}
      <section className="relative overflow-hidden bg-blush/30">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-honey">
              {site.tagline}
            </p>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Beauty that&rsquo;s
              <br />
              as <span className="italic text-honey">natural</span> as it
              <br />
              is glowy.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-cocoa sm:text-lg">
              Clean, cruelty-free skincare, makeup and body care â€” crafted with
              raw honey and little rituals that make every day feel golden.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-honey"
              >
                Shop the collection
                <ArrowIcon />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-white/60 px-7 py-3.5 text-sm font-medium transition-colors hover:border-espresso/40 hover:bg-white"
              >
                Book a service
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-espresso/10 pt-8">
              {[
                ["12k+", "Happy clients"],
                ["40+", "Clean formulas"],
                ["4.9â˜…", "Average rating"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-serif text-2xl font-semibold">
                    {value}
                  </dd>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-cocoa">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative h-72 overflow-hidden rounded-[2.5rem] rounded-tr-[8rem] border border-espresso/10 bg-white/60 shadow-xl sm:h-96 lg:col-span-8 lg:h-auto lg:min-h-[calc(100vh-9rem)]">
            <Image
              src="/images/micro.jpg"
              alt="Brow microblading being performed at the Beauty by Bee studio"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* â€”â€”â€” Values strip â€”â€”â€” */}
      <section className="border-y border-espresso/10 bg-parchment">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {values.map((value) => (
            <div key={value.title}>
              <h3 className="font-serif text-base font-semibold">
                {value.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-cocoa">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* â€”â€”â€” What we're about / editorial â€”â€”â€” */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2.5rem] rounded-br-[8rem] border border-espresso/10 bg-white/60 shadow-lg">
              <Image
                src="/images/home-ritual.jpg"
                alt="The Beauty by Bee ritual â€” honey jar and petals"
                width={800}
                height={900}
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
            <p className="mt-6 text-base leading-7 text-cocoa">
              We started Beauty by Bee in a tiny corner studio with two brushes,
              a dangerously good facial recipe, and a single belief: skincare
              should feel like self-care, not maintenance. Today our clean
              formulations are made in small batches and our facials are booked
              out weeks ahead â€” but nothing here is mass-produced, and nothing
              leaves the studio without a love note printed on the box.
            </p>
            <ul className="mt-8 space-y-5">
              {editorial.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start justify-between gap-4 rounded-2xl border border-espresso/10 bg-white/60 p-5 transition-colors hover:border-honey/50"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-honey">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-cocoa">{item.text}</p>
                    </div>
                    <ArrowIcon className="mt-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* â€”â€”â€” Featured products â€”â€”â€” */}
      <section className="bg-white/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="Shop the collection"
              title="Our most loved formulas"
            />
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-medium transition-colors hover:border-espresso/40"
            >
              View all products
              <ArrowIcon />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* â€”â€”â€” Services preview â€”â€”â€” */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="The studio"
            title="Rituals, not procedures"
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-medium transition-colors hover:border-espresso/40"
          >
            All services
            <ArrowIcon />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {previewServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* â€”â€”â€” Gallery preview â€”â€”â€” */}
      <section className="bg-white/50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              align="left"
              eyebrow="The gallery"
              title="Little moments of glow"
            />
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-medium transition-colors hover:border-espresso/40"
            >
              Full gallery
              <ArrowIcon />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {previewGallery.map((item) => (
              <Link
                key={item.slug}
                href="/gallery"
                className={`group overflow-hidden rounded-3xl border border-espresso/10 bg-white/60 ${
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

      {/* â€”â€”â€” Testimonials â€”â€”â€” */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Kind words"
          title="What our community says"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-espresso/10 bg-white/60 p-7"
            >
              <div className="text-honey" aria-label="5 out of 5">
                â˜…â˜…â˜…â˜…â˜…
              </div>
              <blockquote className="mt-4 flex-1 font-serif text-lg leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-espresso/10 pt-4">
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-cocoa">{t.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* â€”â€”â€” CTA banner â€”â€”â€” */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-linear-to-br from-honey via-amber to-honey px-6 py-16 text-center sm:px-16">
          <h2 className="font-serif text-3xl font-medium leading-tight text-espresso sm:text-4xl">
            Join the hive.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-espresso/80 sm:text-base">
            Sign up for our little letters â€” new formula drops, salon
            availability and one honest skincare tip a month. No spam, ever.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
