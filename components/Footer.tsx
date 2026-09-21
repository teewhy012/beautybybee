import Image from "next/image";
import Link from "next/link";

import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons";
import { site } from "@/lib/site";

const exploreLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/shop", label: "Shop" },
  { href: "/checkout", label: "Checkout" },
];

const serviceLinks = [
  "Signature Glow Facial",
  "Lash Lift & Tint",
  "Brow Sculpting & Tint",
  "Luxury Manicure & Pedicure",
];

export function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-parchment">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <Image
              src="/images/bee-mark.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
              aria-hidden="true"
            />
            <span className="font-serif text-2xl font-semibold tracking-tight">
              {site.name}
            </span>
          </div>
          <p className="editorial-text mt-5 max-w-sm text-base text-cocoa">
            A boutique beauty brand and studio crafting clean, cruelty-free
            skincare, makeup and body care — plus little rituals that make every
            day feel a bit golden.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-cocoa transition-colors hover:bg-espresso hover:text-cream"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-cocoa transition-colors hover:bg-espresso hover:text-cream"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/15 text-cocoa transition-colors hover:bg-espresso hover:text-cream"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-espresso/80 transition-colors hover:text-espresso"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
            The Studio
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-espresso/80">
            <li>{site.addressLines.join(", ")}</li>
            {site.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`} className="transition-colors hover:text-espresso">
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-espresso"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
            Hours
          </h3>
          <ul className="mt-5 space-y-3">
            {site.hours.map((period) => (
              <li key={period.day} className="flex items-baseline justify-between gap-3 text-sm">
                <span className="text-espresso/80">{period.day}</span>
                <span className="text-cocoa">{period.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-espresso/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-cocoa sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap justify-center gap-x-4">
            {serviceLinks.map((name) => (
              <span key={name} className="opacity-80">
                {name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}