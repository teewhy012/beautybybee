import { NextResponse } from "next/server";

import { getProductBySlug } from "@/lib/products";

export const runtime = "nodejs";

const MAX_QTY = 99;

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Set STRIPE_SECRET_KEY in your .env.local file to accept payments.",
      },
      { status: 500 },
    );
  }

  let body: { items?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: "Your cart is empty." },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;

  const lineItems: { name: string; description: string; amount: number; images: string[]; quantity: number }[] = [];

  for (const raw of body.items) {
    if (typeof raw !== "object" || raw === null) continue;
    const { slug, qty } = raw as { slug?: unknown; qty?: unknown };
    if (typeof slug !== "string") continue;
    const product = getProductBySlug(slug);
    if (!product) continue;
    const quantity = Math.min(
      Math.max(Math.round(typeof qty === "number" ? qty : 1), 1),
      MAX_QTY,
    );
    lineItems.push({
      name: product.name,
      description: product.short,
      amount: product.priceCents,
      images: [`${origin}${product.image}`],
      quantity,
    });
  }

  if (lineItems.length === 0) {
    return NextResponse.json(
      { error: "Your cart is empty or contains unavailable products." },
      { status: 400 },
    );
  }

  const { Stripe } = await import("stripe");
  const stripe = new Stripe(secretKey);
  const email = typeof body.email === "string" ? body.email : undefined;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.amount,
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images,
          },
        },
        quantity: item.quantity,
      })),
      metadata: {
        items: JSON.stringify(
          lineItems.map((item) => ({ name: item.name, quantity: item.quantity })),
        ),
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 },
    );
  }
}