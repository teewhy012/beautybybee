import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Facials, lash lifts, brow sculpting, manicures and more at the Beauty by Bee studio.",
};

const howItWorks = [
  {
    step: "01",
    title: "Tell us about you",
    text: "Pick a service and date. We'll ask a few questions about your skin, your day, and your hopes for the appointment.",
  },
  {
    step: "02",
    title: "Come relax",
    text: "Arrive, settle in with a herbal tea, and let our estheticians create a treatment tailored just for you.",
  },
  {
    step: "03",
    title: "Leave glowing",
    text: "Walk out with homework — a routine, product picks or booking details — and skin that speaks for itself.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Little rituals for real life"
        description="Book an appointment at the studio or meet us online for a consult. Every treatment is tailored — never a conveyor belt."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-parchment py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How booking works"
            title="Three easy steps"
          />
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {howItWorks.map((item) => (
              <li
                key={item.step}
                className="rounded-3xl border border-espresso/10 bg-cream p-7"
              >
                <span className="font-serif text-4xl font-semibold text-honey/70">
                  {item.step}
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-cocoa">{item.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-center text-sm text-cocoa">
            To book, call the studio at{" "}
            {site.phones.map((phone, i) => (
              <span key={phone}>
                {i > 0 && " or "}
                <a
                  href={`tel:${phone}`}
                  className="font-medium text-espresso underline-offset-2 hover:underline"
                >
                  {phone}
                </a>
              </span>
            ))}{" "}
            or email{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-espresso underline-offset-2 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-[2.5rem] bg-linear-to-br from-honey via-amber to-honey px-6 py-14 text-center sm:px-14">
          <h2 className="font-serif text-3xl font-medium tracking-tight text-espresso sm:text-4xl">
            Take the glow home too
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-espresso/80 sm:text-base">
            Every treatment features products from our collection — ask your
            esthetician what would suit your skin, or shop the heroes online.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-espresso px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cocoa"
          >
            Shop the collection
          </Link>
        </div>
      </section>
    </>
  );
}