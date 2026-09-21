export type Service = {
  slug: string;
  name: string;
  category: string;
  duration: string;
  durationMin: number;
  price: string;
  description: string;
  icon: "brow" | "lash" | "nails" | "facial" | "makeup" | "body";
};

export const services: Service[] = [
  {
    slug: "signature-glow-facial",
    name: "Signature Glow Facial",
    category: "Skincare",
    duration: "75 min",
    durationMin: 75,
    price: "from ₦110",
    description:
      "A bespoke treatment combining double cleansing, honey-derived enzymes, gentle extractions and a sculpting massage for an instant, camera-ready glow.",
    icon: "facial",
  },
  {
    slug: "lash-lift-tint",
    name: "Lash Lift & Tint",
    category: "Eyes",
    duration: "60 min",
    durationMin: 60,
    price: "from ₦75",
    description:
      "Lifted, defined, curled lashes — no extensions needed. A gentle treatment that opens up the eyes for up to eight weeks, finished with a nourishing tint.",
    icon: "lash",
  },
  {
    slug: "brow-sculpting",
    name: "Brow Sculpting & Tint",
    category: "Eyes",
    duration: "45 min",
    durationMin: 45,
    price: "from ₦55",
    description:
      "Wax-free brow shaping mapped to your facial symmetry, finished with a semi-permanent tint and brow lamination for a feathery, natural hold.",
    icon: "brow",
  },
  {
    slug: "luxury-manicure-pedicure",
    name: "Luxury Manicure & Pedicure",
    category: "Nails",
    duration: "90 min",
    durationMin: 90,
    price: "from ₦85",
    description:
      "A spa ritual for hands and feet — buffing, cuticle care, warm paraffin wings and a breathable polish in our curated nude and nectar shades.",
    icon: "nails",
  },
  {
    slug: "honey-body-polish",
    name: "Honey Body Polish & Wrap",
    category: "Body",
    duration: "60 min",
    durationMin: 60,
    price: "from ₦120",
    description:
      "A full-body silk polish with whipped honey-sugar scrub, followed by a hydrating wrap that leaves skin soft, firm and deliciously scented.",
    icon: "body",
  },
  {
    slug: "glass-skin-treatment",
    name: "Glass Skin Treatment",
    category: "Skincare",
    duration: "80 min",
    durationMin: 80,
    price: "from ₦130",
    description:
      "Our most requested facial — a multi-layer hydration ritual with toners, serums and a LED mask that delivers that lit-from-within 'glass skin' finish.",
    icon: "facial",
  },
  {
    slug: "at-home-consultation",
    name: "At-Home Beauty Consultation",
    category: "Virtual",
    duration: "45 min",
    durationMin: 45,
    price: "from ₦60",
    description:
      "A one-to-one video consultation to build your perfect routine, choose shades that flatter you and get honest product guidance — from the comfort of home.",
    icon: "makeup",
  },
];