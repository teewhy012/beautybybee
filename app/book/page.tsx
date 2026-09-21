"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import { services } from "@/lib/services";
import type { Slot } from "@/lib/bookings";

type SlotState = "idle" | "loading" | "ready" | "error";

function formatDateInput(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function today(): string {
  return formatDateInput(new Date());
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookPage() {
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug ?? "");
  const [date, setDate] = useState(today());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotState, setSlotState] = useState<SlotState>("idle");
  const [selectedStartMin, setSelectedStartMin] = useState<number | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedService = services.find((s) => s.slug === serviceSlug);
  const durationMin = selectedService?.durationMin ?? 60;

  const loadSlots = useCallback(
    async (slug: string, d: string) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return;
      setSlotState("loading");
      setSelectedStartMin(null);
      try {
        const res = await fetch(
          `/api/bookings?date=${encodeURIComponent(d)}&service=${encodeURIComponent(slug)}`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error("Something went wrong loading session times.");
        const data: { slots: Slot[] } = await res.json();
        setSlots(data.slots);
        setSlotState("ready");
      } catch {
        setSlotState("error");
      }
    },
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSlots(serviceSlug, date);
  }, [loadSlots, serviceSlug, date]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      if (selectedStartMin === null) {
        setError("Please pick a time of session — each time slot holds only one session.");
        return;
      }

      setSubmitting(true);
      setError(null);
      setSuccess(null);

      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName,
            phone,
            date,
            startMin: selectedStartMin,
            serviceSlug,
          }),
        });

        const data: { booking?: unknown; error?: string } = await res.json();
        if (!res.ok || !data.booking) {
          setError(data.error ?? "The session could not be booked. Please try again.");
          return;
        }

        setSuccess(
          `Your session is booked. One session per time slot is guaranteed — we'll call you at ${phone} to confirm. A 30-min rest is kept at session intervals for other sessions.`,
        );
        setCustomerName("");
        setPhone("");
        setSelectedStartMin(null);
        await loadSlots(serviceSlug, date);
      } catch {
        setError("The session could not be booked. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [selectedStartMin, customerName, phone, date, serviceSlug, loadSlots],
  );

  const dateLabel = useMemo(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const [y, m, d] = date.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    return `${WEEKDAYS[dt.getDay()]}, ${d} ${[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][m - 1]} ${y}`;
  }, [date]);

  return (
    <>
      <PageHeader
        eyebrow="Book a session"
        title="Book your session"
        description="Pick a service, a date and a time of session. Only one session can be booked for a time slot, and we keep a 30-min rest at session intervals so every appointment arrives relaxed and on time."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="rounded-3xl border border-espresso/10 bg-white/70 p-6 sm:p-9"
        >
          {error && (
            <p
              role="alert"
              className="mb-6 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose"
            >
              {error}
            </p>
          )}
          {success && (
            <p
              role="status"
              className="mb-6 rounded-2xl border border-honey/40 bg-honey/10 px-4 py-3 text-sm text-espresso"
            >
              {success}
            </p>
          )}

          <div className="grid gap-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
                  Customer name
                </span>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
                  placeholder="Your full name"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
                  Phone number
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  autoComplete="tel"
                  className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
                  placeholder="e.g. +1 555 012 3456"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
                  Service
                </span>
                <select
                  value={serviceSlug}
                  onChange={(e) => setServiceSlug(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.name} · {service.duration}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
                  Date of session
                </span>
                <input
                  type="date"
                  value={date}
                  min={today()}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
                />
              </label>
            </div>

            <fieldset>
              <legend className="flex items-baseline justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
                  Time of session
                </span>
                <span className="text-xs text-cocoa">{dateLabel}</span>
              </legend>

              {slotState === "loading" && (
                <p className="mt-3 text-sm text-cocoa">Loading session slots…</p>
              )}
              {slotState === "error" && (
                <p className="mt-3 text-sm text-rose">
                  We could&apos;t load session times. Please try again.
                </p>
              )}
              {slotState === "ready" && slots.length === 0 && (
                <p className="mt-3 text-sm text-cocoa">
                  No sessions available for this date.
                </p>
              )}

              {slotState === "ready" && slots.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((slot) => {
                    const isSelected = selectedStartMin === slot.startMin;
                    return (
                      <button
                        key={slot.startMin}
                        type="button"
                        disabled={slot.occupied}
                        onClick={() => setSelectedStartMin(slot.startMin)}
                        className={`rounded-xl border px-3 py-2.5 text-center text-sm transition-colors ${
                          slot.occupied
                            ? "cursor-not-allowed border-espresso/10 bg-espresso/5 text-cocoa/50 line-through"
                            : isSelected
                              ? "border-espresso bg-espresso text-cream"
                              : "border-espresso/15 bg-cream text-espresso hover:border-espresso/40"
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <p className="mt-4 text-xs leading-5 text-cocoa">
                Only one session can be booked per time slot — taken slots
                (including the 30-min rest kept at session intervals) are shown
                crossed out.
              </p>
            </fieldset>
          </div>

          <button
            type="submit"
            disabled={submitting || selectedStartMin === null}
            className="mt-8 w-full rounded-full bg-espresso px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? "Booking your session…"
              : `Book session · ${durationMin} min`}
          </button>
        </form>
      </section>
    </>
  );
}
