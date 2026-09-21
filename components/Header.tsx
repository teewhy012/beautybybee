"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/components/CartProvider";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/icons";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/shop", label: "Shop" },
];

export function Header() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass border-b border-espresso/5">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/bee-mark.svg"
            alt=""
            width={40}
            height={40}
            className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
            aria-hidden="true"
          />
          <span className="truncate font-serif text-lg font-semibold tracking-tight sm:text-xl">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-cocoa transition-colors hover:text-espresso"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
            className="hidden text-sm font-medium tracking-wide text-cocoa transition-colors hover:text-espresso xl:inline"
          >
            {site.phone}
          </a>
          <Link
            href="/book"
            className="hidden rounded-full bg-espresso px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-honey md:inline-flex"
          >
            Book Session
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-espresso/10 bg-bone/70 text-espresso transition-colors hover:bg-bone"
            aria-label={`Open cart, ${count} items`}
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-espresso px-1 text-[11px] font-semibold text-cream">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-espresso/10 bg-bone/70 text-espresso transition-colors hover:bg-bone lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-espresso/5 px-4 pb-4 pt-2 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-espresso/5 px-2 py-3 text-sm font-medium tracking-wide text-cocoa transition-colors hover:text-espresso"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block rounded-full bg-espresso px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-cream transition-colors hover:bg-honey"
          >
            Book Session
          </Link>
        </nav>
      )}
    </header>
  );
}