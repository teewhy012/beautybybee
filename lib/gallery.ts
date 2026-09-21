export type GalleryCategory =
  | "Makeup"
  | "Facials"
  | "Nails"
  | "Events"
  | "Studio";

export type GalleryItem = {
  slug: string;
  title: string;
  category: GalleryCategory;
  image: string;
  tall?: boolean;
};

export const galleryCategories: ("All" | GalleryCategory)[] = [
  "All",
  "Makeup",
  "Facials",
  "Nails",
  "Events",
  "Studio",
];

export const gallery: GalleryItem[] = [
  {
    slug: "golden-hour-glam",
    title: "Golden Hour Glam",
    category: "Makeup",
    image: "/images/gallery/golden-hour.jpg",
    tall: true,
  },
  {
    slug: "bridal-bloom",
    title: "Bridal Bloom",
    category: "Events",
    image: "/images/gallery/bridal.jpg",
  },
  {
    slug: "honey-glow-facial",
    title: "Honey Glow Facial",
    category: "Facials",
    image: "/images/gallery/honey-glow.jpg",
  },
  {
    slug: "nectar-nails",
    title: "Nectar Nails",
    category: "Nails",
    image: "/images/gallery/nectar-nails.jpg",
    tall: true,
  },
  {
    slug: "soft-glam-studio",
    title: "Soft Glam Studio",
    category: "Studio",
    image: "/images/gallery/soft-glam.jpg",
  },
  {
    slug: "rosewater-facial",
    title: "Rosewater Ritual",
    category: "Facials",
    image: "/images/gallery/rosewater.jpg",
  },
  {
    slug: "edit-pretty",
    title: "Editorial Pretty",
    category: "Makeup",
    image: "/images/gallery/editorial.jpg",
    tall: true,
  },
  {
    slug: "blush-party",
    title: "Blush Party",
    category: "Events",
    image: "/images/gallery/blush-party.jpg",
  },
  {
    slug: "petal-mani",
    title: "Petal Mani",
    category: "Nails",
    image: "/images/gallery/petal-mani.jpg",
  },
  {
    slug: "the-bee-room",
    title: "The Bee Room",
    category: "Studio",
    image: "/images/gallery/the-bee-room.jpg",
    tall: true,
  },
];