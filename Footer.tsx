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
  "Bridal & Event Makeup",
  "Lash Lift & Tint",
  "Brow Sculpting & Tint",
  "Luxury Manicure & Pedicure",
];

export function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-parchment">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/bee-mark.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9"
              aria-hidden="true"
            />
            <span className="font-serif text-lg font-semibold tracking-tight">
              {site.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-cocoa">
            A boutique beauty brand and studio crafting clean, cruelty-free
            skincare, makeup and body care — plus little rituals that make every
            day feel a bit golden.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/10 bg-white/70 text-cocoa transition-colors hover:text-espresso"
            >
              <InstagramIcon />
            </a>
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/10 bg-white/70 text-cocoa transition-colors hover:text-espresso"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-espresso/10 bg-white/70 text-cocoa transition-colors hover:text-espresso"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-espresso">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cocoa transition-colors hover:text-espresso"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-espresso">
            Studio
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li className="text-sm text-cocoa">
              {site.addressLines.join(", ")}
            </li>
            <li className="text-sm text-cocoa">{site.phone}</li>
            <li className="text-sm text-cocoa">{site.email}</li>
          </ul>
          <h3 className="mt-6 font-serif text-sm font-semibold uppercase tracking-widest text-espresso">
            Hours
          </h3>
          <ul className="mt-3 space-y-1.5">
            {site.hours.map((period) => (
              <li key={period.day} className="text-sm text-cocoa">
                <span className="font-medium text-espresso">{period.day}:</span>{" "}
                {period.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-espresso/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-xs text-cocoa sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-4 justify-center">
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