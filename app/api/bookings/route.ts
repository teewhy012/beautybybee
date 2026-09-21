import { NextResponse } from "next/server";

import {
  buildSlotsForDate,
  createBooking,
  getDurationForService,
  listBookings,
} from "@/lib/bookings";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? "";
  const serviceSlug = searchParams.get("service") ?? "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ slots: [] });
  }

  const durationMin = getDurationForService(serviceSlug);
  const bookings = await listBookings();
  const slots = buildSlotsForDate(bookings, date, durationMin);

  return NextResponse.json({ date, serviceSlug, durationMin, slots });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Your request could not be read. Please try again." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Your request could not be read. Please try again." },
      { status: 400 },
    );
  }

  const input = body as {
    customerName?: unknown;
    phone?: unknown;
    date?: unknown;
    startMin?: unknown;
    serviceSlug?: unknown;
  };

  const result = await createBooking({
    customerName:
      typeof input.customerName === "string" ? input.customerName : "",
    phone: typeof input.phone === "string" ? input.phone : "",
    date: typeof input.date === "string" ? input.date : "",
    startMin: typeof input.startMin === "number" ? input.startMin : NaN,
    serviceSlug: typeof input.serviceSlug === "string" ? input.serviceSlug : "",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json({ booking: result.booking }, { status: 201 });
}
