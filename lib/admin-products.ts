import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import type { ProductCategory } from "@/lib/products";

export type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  priceCents: number;
  short: string;
  description: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "admin-products.json");
const TMP_FILE = path.join(DATA_DIR, "admin-products.json.tmp");

async function ensureDataDirPromise(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readAllAdminProducts(): Promise<AdminProduct[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AdminProduct[]) : [];
  } catch {
    return [];
  }
}

async function persistAllAdminProducts(products: AdminProduct[]): Promise<void> {
  await ensureDataDirPromise();
  const json = JSON.stringify(products, null, 2);
  await writeFile(TMP_FILE, json, "utf8");
  await rename(TMP_FILE, FILE);
}

function makeSlugFromInput(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type AddAdminProductInput = {
  name: string;
  category: ProductCategory;
  priceCents: number;
  short: string;
  description: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
};

export type AddAdminProductResult =
  | { ok: true; product: AdminProduct }
  | { ok: false; error: string };

export async function addAdminProduct(
  input: AddAdminProductInput,
): Promise<AddAdminProductResult> {
  const name = input.name.trim();

  if (!name) return { ok: false, error: "Please provide a product name." };
  if (
    input.category !== "Skincare" &&
    input.category !== "Makeup" &&
    input.category !== "Bodycare"
  ) {
    return { ok: false, error: "Please pick a valid category." };
  }
  if (
    !Number.isInteger(input.priceCents) ||
    input.priceCents <= 0
  ) {
    return { ok: false, error: "Please set a valid price." };
  }

  const products = await readAllAdminProducts();
  const slug = makeSlugFromInput(name);

  if (products.some((p) => p.slug === slug)) {
    return {
      ok: false,
      error: "A product with that name already exists. Please edit its price instead of adding it again.",
    };
  }

  const product: AdminProduct = {
    id: randomUUID(),
    slug,
    name,
    category: input.category,
    priceCents: input.priceCents,
    short: input.short.trim(),
    description: input.description.trim(),
    image: input.image.trim(),
    badge: input.badge?.trim() || undefined,
    rating: input.rating,
    reviews: input.reviews,
  };

  await persistAllAdminProducts([...products, product]);
  return { ok: true, product };
}

export async function setPriceBySlug(
  slug: string,
  priceCents: number,
): Promise<{ ok: true; priceCents: number } | { ok: false; error: string }> {
  if (!Number.isInteger(priceCents) || priceCents <= 0) {
    return { ok: false, error: "Please set a valid price." };
  }

  const products = await readAllAdminProducts();
  const next = products.map((p) =>
    p.slug === slug ? { ...p, priceCents } : p,
  );

  if (next.every((p, i) => p.priceCents === products[i].priceCents)) {
    return { ok: false, error: "That product could not be found." };
  }

  await persistAllAdminProducts(next);
  return { ok: true, priceCents };
}

export async function listAdminProducts(): Promise<AdminProduct[]> {
  return readAllAdminProducts();
}
