import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

const milestones = [
  {
    year: "2021",
    title: "The first tittle",
    text: "A corner studio, two chairs and a facial recipe perfected over eleven versions.",
  },
  {
    year: "2022",
    title: "Into the jars",
    text: "Our first small batch of Honey Silk Body Butter sold out online in 40 minutes.",
  },
  {
    year: "2024",
    title: "Clean promise",
    text: "Every formula is now independently screened and 100% cruelty-free certified.",
  },
  {
    year: "Today",
    title: "A little community",
    text: "12,000+ clients, a full studio, and a skincare line we're endlessly proud of.",
  },
];

const values = [
  {
    title: "Clean, inside and out",
    text: "We formulate without parabens, sulfates, synthetic dyes or fragrance allergens — and we publish every ingredient.",
  },
  {
    title: "Kind to all creatures",
    text: "We love bees, and we pay it forward — a share of each sale supports local beekeeping charities.",
  },
  {
    title: "Small is beautiful",
    text: "Nothing is mass-produced. Small batches mean fresh formulas and zero waste pressure.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="The story of Beauty by Bee"
        description="From a two-chair studio to a boutique brand — we make clean beauty that feels like self-care."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] rounded-tl-[8rem] border border-espresso/10 bg-white/60 shadow-lg">
            <Image
              src="/images/about-studio.jpg"
              alt="Inside the Beauty by Bee studio"
              width={800}
              height={900}
              className="w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our why"
              title="Named after a queen, built for every skin"
            />
            <div className="mt-6 space-y-5 text-base leading-7 text-cocoa">
              <p>
                Beauty by Bee began with a honey jar and a stubborn idea: that
                glowing skin shouldn&rsquo;t come with a list of ingredients you
                can&rsquo;t pronounce. Our founder — a lifelong skincare
                obsessive who studied cosmetic chemistry part-time while running
                her first studio — wanted to bottle the feeling of leaving a
                great facial: calm, luminous, a little bit in love with your
                own reflection.
              </p>
              <p>
                So she built it. Now a team of estheticians and chemists, we
                formulate in tiny batches, test on ourselves first, and treat
                every client like the star of the show — because you are.
              </p>
            </div>
            <div className="mt-8 rounded-3xl border border-espresso/10 bg-blush/50 p-6">
              <p className="font-serif text-lg italic leading-relaxed text-espresso">
                &ldquo;If it doesn&rsquo;t feel like a treat, it doesn&rsquo;t
                belong on your skin.&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium">— Bee, founder</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The journey"
            title="How we got here"
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((step) => (
              <li
                key={step.year}
                className="relative rounded-3xl border border-espresso/10 bg-cream p-6"
              >
                <span className="font-serif text-3xl font-semibold text-honey">
                  {step.year}
                </span>
                <h3 className="mt-3 font-serif text-lg font-medium">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-cocoa">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="What we believe"
          title="Three promises we make"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-3xl border border-espresso/10 bg-white/60 p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-honey text-xl text-white">
                ✓
              </span>
              <h3 className="mt-5 font-serif text-xl font-medium">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-cocoa">{value.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2.5rem] bg-linear-to-br from-blush to-cream p-8 text-center sm:p-14">
          <h2 className="font-serif text-3xl font-medium tracking-tight">
            Come meet the buzz in person
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-cocoa">
            Book a facial, a lash lift or a consultation at our studio —{" "}
            {site.addressLines.join(", ")}.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="rounded-full bg-espresso px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-honey"
            >
              Explore services
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-espresso/20 bg-white/60 px-7 py-3.5 text-sm font-medium transition-colors hover:bg-white"
            >
              Shop products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}