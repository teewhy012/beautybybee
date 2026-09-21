export const site = {
  name: "Beauty by Bee",
  shortName: "Bee",
  tagline: "Naturally beautiful, lovingly made",
  description:
    "Beauty by Bee is a boutique beauty brand and studio offering clean, cruelty-free skincare, makeup and body care products alongside professional beauty services. Every formula is crafted to make you feel radiant, inside and out.",
  phone: "+1 555-012-3456",
  email: "hello@beautybybee.com",
  addressLines: ["12 Linden Row, Mayfair", "London, W1K 6PP"],
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
  currency: {
    code: "NGN",
    symbol: "₦",
  },
} as const;