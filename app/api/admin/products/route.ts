import { NextResponse } from "next/server";

import {
  addAdminProduct,
  listAdminProducts,
  setPriceBySlug,
  type AddAdminProductInput,
} from "@/lib/admin-products";

export const runtime = "nodejs";

function isAdminPasswordValid(request: Request): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const supplied = request.headers.get("x-admin-password");
  return typeof supplied === "string" && supplied === password;
}

export async function GET() {
  const productList = await listAdminProducts();
  return NextResponse.json({ products: productList });
}

function readMoney(input: Record<string, unknown>, key: string): number {
  const value = input[key];
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? Math.round(n) : NaN;
}

function readText(input: Record<string, unknown>, key: string): string {
  const value = input[key];
  return typeof value === "string" ? value : "";
}

function readCategory(input: Record<string, unknown>): AddAdminProductInput["category"] {
  const value = input["category"];
  if (value === "Makeup" || value === "Bodycare") return value;
  return "Skincare";
}

export async function POST(request: Request) {
  if (!isAdminPasswordValid(request)) {
    return NextResponse.json(
      { error: "Admin access is required for that action." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Your request could not be read. Please try again." },
      { status: 400 },
    );
  }

  const input =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};

  const name = readText(input, "name");
  const short = readText(input, "short");
  const description = readText(input, "description");
  const image = readText(input, "image");
  const badge = readText(input, "badge");

  const inputForAdd: AddAdminProductInput = {
    name,
    category: readCategory(input),
    priceCents: readMoney(input, "priceCents"),
    short,
    description,
    image,
    badge: badge || undefined,
    rating: readMoney(input, "rating") || 0,
    reviews: readMoney(input, "reviews") || 0,
  };

  const productResult = await addAdminProduct(inputForAdd);

  if (!productResult.ok) {
    return NextResponse.json({ error: productResult.error }, { status: 400 });
  }

  return NextResponse.json({ product: productResult.product }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!isAdminPasswordValid(request)) {
    return NextResponse.json(
      { error: "Admin access is required for that action." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Your request could not be read. Please try again." },
      { status: 400 },
    );
  }

  const input =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};

  const slug = readText(input, "slug");
  const result = await setPriceBySlug(slug, readMoney(input, "priceCents"));

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ priceCents: result.priceCents });
}
