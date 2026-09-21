import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import { services } from "@/lib/services";

export const SLOT_MINUTES = 30; // booking grid: 30-minute time slots
export const REST_MINUTES = 30; // 30 mins time rest at session intervals
export const OPEN_MIN = 9 * 60; // 09:00
export const CLOSE_MIN = 19 * 60; // 19:00 (last session must end by 7:00 PM)

export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  date: string; // YYYY-MM-DD
  startMin: number; // minutes from midnight
  durationMin: number; // session length in minutes
  serviceSlug: string;
  createdAt: string; // ISO timestamp
};

export type Slot = {
  startMin: number;
  label: string; // "09:00"
  occupied: boolean; // true when booked OR inside a 30-min rest interval
};

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const TMP_FILE = path.join(DATA_DIR, "bookings.json.tmp");

async function ensureDataDir(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readAllBookings(): Promise<Booking[]> {
  try {
    const raw = await readFile(BOOKINGS_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch {
    return [];
  }
}

async function persistAllBookings(bookings: Booking[]): Promise<void> {
  await ensureDataDir();
  const json = JSON.stringify(bookings, null, 2);
  // Atomic-ish write: temp file + rename so concurrent readers never see a
  // half-written JSON store.
  await writeFile(TMP_FILE, json, "utf8");
  await rename(TMP_FILE, BOOKINGS_FILE);
}

export function minutesToLabel(startMin: number): string {
  const h = Math.floor(startMin / 60);
  const m = startMin % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Parse a service's "75 min" label into whole minutes. */
export function durationFromLabel(label: string): number {
  const match = /^(\d+)\s*min/.exec(label);
  return match ? Number(match[1]) : 60;
}

export function getDurationForService(slug: string): number {
  const service = services.find((s) => s.slug === slug);
  return service ? durationFromLabel(service.duration) : 60;
}

/**
 * Whether a brand-new session [startMin, startMin + durationMin) can start.
 * A slot is only free when it does not overlap any existing session AND does
 * not overlap the 30-minute rest that follows each session — so only one
 * session can be booked for a time slot, with 30 mins time rest at session
 * intervals for other sessions.
 */
export function isSlotFree(
  bookings: Booking[],
  date: string,
  startMin: number,
  durationMin: number,
): boolean {
  const endMin = startMin + durationMin;

  return !bookings.some((booking) => {
    if (booking.date !== date) return false;

    const bStart = booking.startMin;
    const bEnd = booking.startMin + booking.durationMin;
    const bRestEnd = bEnd + REST_MINUTES;

    // The candidate hits the session itself, or the session's 30-min rest.
    return startMin < bRestEnd && endMin > bStart;
  });
}

export function buildSlotsForDate(
  bookings: Booking[],
  date: string,
  durationMin: number,
): Slot[] {
  const slots: Slot[] = [];

  for (
    let startMin = OPEN_MIN;
    startMin + durationMin <= CLOSE_MIN;
    startMin += SLOT_MINUTES
  ) {
    const occupied = bookings.some((booking) => {
      if (booking.date !== date) return false;

      const bStart = booking.startMin;
      const bEnd = booking.startMin + booking.durationMin;
      const bRestEnd = bEnd + REST_MINUTES;

      return startMin < bRestEnd && startMin + durationMin > bStart;
    });

    slots.push({
      startMin,
      label: minutesToLabel(startMin),
      occupied,
    });
  }

  return slots;
}

export type CreateBookingInput = {
  customerName: string;
  phone: string;
  date: string; // YYYY-MM-DD
  startMin: number;
  serviceSlug: string;
};

export type CreateBookingResult =
  | { ok: true; booking: Booking }
  | { ok: false; error: string };

export async function createBooking(
  input: CreateBookingInput,
): Promise<CreateBookingResult> {
  const { customerName, phone, date, startMin, serviceSlug } = input;

  if (!customerName.trim() || !phone.trim()) {
    return { ok: false, error: "Please provide your name and phone number." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, error: "Please pick a valid session date." };
  }

  const durationMin = getDurationForService(serviceSlug);
  if (
    !Number.isInteger(startMin) ||
    startMin % SLOT_MINUTES !== 0 ||
    startMin < OPEN_MIN ||
    startMin + durationMin > CLOSE_MIN
  ) {
    return { ok: false, error: "Please pick a valid session time slot." };
  }

  const bookings = await readAllBookings();

  if (!isSlotFree(bookings, date, startMin, durationMin)) {
    return {
      ok: false,
      error:
        "That slot, or its 30-min rest window, is already taken. Only one session can be booked per time slot — please pick another slot or one that respects the 30-min rest at session intervals.",
    };
  }

  const booking: Booking = {
    id: randomUUID(),
    customerName: customerName.trim(),
    phone: phone.trim(),
    date,
    startMin,
    durationMin,
    serviceSlug,
    createdAt: new Date().toISOString(),
  };

  await persistAllBookings([...bookings, booking]);
  return { ok: true, booking };
}

export async function listBookings(): Promise<Booking[]> {
  return readAllBookings();
}
