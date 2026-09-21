# Beauty by Bee

A boutique beauty brand website built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS v4**. It includes brand storytelling, About Us, Services, a Gallery, an online shop with cart, and a Stripe-powered checkout.

![brand](https://img.shields.io/badge/status-active-brightgreen)

## Features

- **Home** — brand story, featured products, services preview, gallery preview, testimonials.
- **About Us** — the story, journey timeline and promises.
- **Services** — studio treatments with pricing, duration and a "how booking works" section.
- **Gallery** — filterable image grid (Makeup / Facials / Nails / Events / Studio).
- **Shop** — product grid with category filters and sorting, plus product detail pages.
- **Cart** — slide-out drawer with quantities, persisted in `localStorage`.
- **Checkout** — secure Stripe Checkout session with success/cancel pages.

## Getting started

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:9000](http://localhost:9000).

## Accepting payments (Stripe)

1. Create a free account at [dashboard.stripe.com](https://dashboard.stripe.com).
2. Copy your **secret key** (start it with `sk_test_`) from the API keys page.
3. Create a `.env.local` file (or copy `.env.example`) and set:

   ```bash
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

4. Restart the dev server. The cart → checkout flow will now create a real Stripe Checkout session.

The prices shown are **calculated on the server** in the checkout API route (`app/api/checkout/route.ts`) from the product catalog in `lib/products.ts` — clients can&#8217;t tamper with amounts.

For testing, Stripe&#8217;s test card is `4242 4242 4242 4242`, any future expiry and any CVC.

> The `public/images/` SVGs are brand placeholder artwork. Replace them with real product and studio photography when you have it (any file name works as long as the path in `lib/products.ts` / `lib/services.ts` / `lib/gallery.ts` matches).

## Project structure

```
app/
  layout.tsx            # root layout (fonts, header, footer, cart provider)
  page.tsx              # home
  about/page.tsx        # about us
  services/page.tsx     # services
  gallery/page.tsx      # gallery
  shop/page.tsx         # product listing
  shop/[slug]/page.tsx  # product detail
  checkout/page.tsx     # checkout
  checkout/success| /cancel
  api/checkout/route.ts # creates a Stripe Checkout Session
components/             # header, footer, cart, cards, galleries…
lib/                    # site, products, services, gallery data + formatters
```

## Editing the site

- **Brand info** (name, contact, hours, socials): `lib/site.ts`
- **Products & pricing**: `lib/products.ts` (price is in **cents**)
- **Services**: `lib/services.ts`
- **Gallery images & titles**: `lib/gallery.ts`

## Scripts

```bash
npm run dev      # development server on port 9000
npm run build    # production build
npm run start    # run the production build on port 9000
npm run lint     # ESLint
```