export type ProductCategory = "Skincare" | "Makeup" | "Bodycare";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  priceCents: number;
  short: string;
  description: string;
  image: string;
  badge?: "Bestseller" | "New" | "Limited";
  rating: number;
  reviews: number;
};

export const categories: ProductCategory[] = ["Skincare", "Makeup", "Bodycare"];

export const products: Product[] = [
  {
    slug: "radiant-glow-serum",
    name: "Radiance Glow Serum",
    category: "Skincare",
    priceCents: 5800,
    short: "A daily boost of vitamin C and honey extracts for luminous, even-toned skin.",
    description:
      "Our signature brightening serum blends stabilized vitamin C with raw honey enzymes and squalane to visibly even tone, soften fine lines and leave skin dewy. Absorbs quickly under makeup and works for all skin types.",
    image: "/images/products/serum-glow.jpg",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 412,
  },
  {
    slug: "honey-silk-body-butter",
    name: "Honey Silk Body Butter",
    category: "Bodycare",
    priceCents: 3200,
    short: "Whipped shea and honey body butter that melts in for 48-hour nourishment.",
    description:
      "Hand-whipped with shea butter, cold-pressed grapeseed oil and raw honey, this cloud-like butter restores dry skin and leaves a soft, satin finish with a whisper of orange blossom.",
    image: "/images/products/body-butter.jpg",
    rating: 4.8,
    reviews: 287,
  },
  {
    slug: "petal-soft-lip-oil",
    name: "Petal Soft Lip Oil",
    category: "Makeup",
    priceCents: 2400,
    short: "Glossy, cushiony lip oil that plumps with botanical oils and a sheer rose tint.",
    description:
      "A weightless lip oil infused with jojoba, rosehip and a hint of peppermint for a natural plump. Delivers high-shine glass lips in four sheer shades.",
    image: "/images/products/lip-oil.jpg",
    rating: 4.7,
    reviews: 189,
  },
  {
    slug: "velvet-matte-lipstick",
    name: "Velvet Matte Lipstick — Rosewood",
    category: "Makeup",
    priceCents: 2800,
    short: "An ultra-creamy matte lipstick with a velvety, transfer-resistant finish.",
    description:
      "Rich pigments wrapped in murumuru butter glide on like a balm and set to a soft-focus matte. Rosewood is our cult classic — a warm, wearable neutral for every undertone.",
    image: "/images/products/lipstick.jpg",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 563,
  },
  {
    slug: "midnight-repair-cream",
    name: "Midnight Repair Face Cream",
    category: "Skincare",
    priceCents: 6400,
    short: "An overnight barrier cream with ceramides and honey peptides for morning glow.",
    description:
      "While you sleep, this rich yet breathable cream rebuilds the skin barrier with ceramides, honey peptides and oat-derived squalane. Wake to skin that looks rested, bouncy and smooth.",
    image: "/images/products/face-cream.jpg",
    rating: 4.8,
    reviews: 231,
  },
  {
    slug: "gentle-bee-eye-serum",
    name: "Gentle Bee Eye Serum",
    category: "Skincare",
    priceCents: 4500,
    short: "A cooling eye serum with caffeine and propolis to de-puff and brighten.",
    description:
      "This featherlight gel delivers a cool, caffeinated wake-up call to tired eyes. Bee propolis soothes while fine peptides smooth the look of fine lines.",
    image: "/images/products/eye-serum.jpg",
    badge: "New",
    rating: 4.7,
    reviews: 96,
  },
  {
    slug: "everyday-sun-milk",
    name: "Everyday SPF 50 Sun Milk",
    category: "Skincare",
    priceCents: 3800,
    short: "An invisible, reef-safe mineral SPF 50 that wears beautifully under makeup.",
    description:
      "A weightless mineral sun milk with zinc oxide and hydrating aloe. No white cast, no fragrance overload — just dependable, reef-safe daily protection.",
    image: "/images/products/sun-milk.jpg",
    rating: 4.6,
    reviews: 340,
  },
  {
    slug: "blossom-hair-mist",
    name: "Blossom Hair & Body Mist",
    category: "Bodycare",
    priceCents: 3400,
    short: "A delicate cherry-blossom and honey mist for hair and skin.",
    description:
      "Spritz on for a fresh, dewy veil of cherry blossom, honey and white musk. Lightweight and alcohol-free, it scents hair and skin without drying them out.",
    image: "/images/products/hair-mist.jpg",
    badge: "Limited",
    rating: 4.8,
    reviews: 158,
  },
  {
    slug: "nectar-blush-palette",
    name: "Nectar Blush Duo",
    category: "Makeup",
    priceCents: 4200,
    short: "Two silky cream-to-powder blushes in sunkissed nectar shades.",
    description:
      "Our creamy blush duo layers effortlessly — a dewy rose for every day and a warm honey-peach for sun-kissed moments. Blend with fingers for a lit-from-within glow.",
    image: "/images/products/blush-palette.jpg",
    rating: 4.9,
    reviews: 274,
  },
  {
    slug: "clean-glow-face-wash",
    name: "Cleanse & Glow Face Wash",
    category: "Skincare",
    priceCents: 2600,
    short: "A honey-gel cleanser that melts makeup without stripping the barrier.",
    description:
      "Low-foam honey gel cleanser with amino acid surfactants removes the day (including light makeup) while calming chamomile keeps skin comfortable and never tight.",
    image: "/images/products/face-wash.jpg",
    rating: 4.8,
    reviews: 405,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.slice(0, limit);
}