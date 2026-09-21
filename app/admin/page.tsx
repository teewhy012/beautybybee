"use client";

import { useState } from "react";

import { AdminImageLibrary } from "@/components/AdminImageLibrary";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

const CATEGORIES = ["Skincare", "Makeup", "Bodycare"] as const;

type ProductFormState = {
  name: string;
  category: string;
  priceCents: string;
  short: string;
  description: string;
  image: string;
  badge: string;
  rating: string;
  reviews: string;
};

const emptyProduct: ProductFormState = {
  name: "",
  category: "Skincare",
  priceCents: "",
  short: "",
  description: "",
  image: "",
  badge: "",
  rating: "",
  reviews: "",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [priceSlug, setPriceSlug] = useState("");
  const [priceCents, setPriceCents] = useState("");
  const [tab, setTab] = useState<"products" | "images">("products");

  async function verifyPassword(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const passwordHint = password.trim();
    if (!passwordHint) {
      setIsError(true);
      setMessage("Please enter the studio password to continue.");
      setBusy(false);
      return;
    }
    const res = await fetch("/api/admin/products", {
      headers: { "x-admin-password": passwordHint },
    });
    if (res.ok) {
      setAuthed(true);
    } else {
      setIsError(true);
      setMessage("That password was not accepted. Please try again.");
    }
    setBusy(false);
  }

  async function updateField(
    key: keyof ProductFormState,
    value: string,
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function addProduct(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const body = {
      name: form.name,
      category: form.category,
      priceCents: Math.round(Number(form.priceCents)) || 0,
      short: form.short,
      description: form.description,
      image: form.image,
      badge: form.badge || undefined,
      rating: Number(form.rating) || 0,
      reviews: Number(form.reviews) || 0,
    };
    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-password": password.trim(),
      },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as { error?: string; product?: unknown };
    if (res.ok) {
      setIsError(false);
      setMessage("That product was added and now appears in the shop.");
      setForm(emptyProduct);
    } else {
      setIsError(true);
      setMessage(data.error ?? "The product could not be added. Please try again.");
    }
    setBusy(false);
  }

  async function updatePrice(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-admin-password": password.trim(),
      },
      body: JSON.stringify({
        slug: priceSlug,
        priceCents: Math.round(Number(priceCents)) || 0,
      }),
    });
    const data = (await res.json()) as { error?: string };
    if (res.ok) {
      setIsError(false);
      setMessage("That price has been updated in the shop.");
      setPriceSlug("");
      setPriceCents("");
    } else {
      setIsError(true);
      setMessage(data.error ?? "The price could not be updated. Please try again.");
    }
    setBusy(false);
  }

  if (authed !== true) {
    return (
      <>
        <PageHeader
          eyebrow="Studio admin"
          title="Studio admin"
          description="Enter the studio password to add products to the shop or update prices."
        />
        <section className="mx-auto max-w-md px-4 py-14 sm:px-6 lg:px-8">
          <form
            onSubmit={(e) => void verifyPassword(e)}
            className="rounded-3xl border border-espresso/10 bg-white/70 p-7"
          >
            {message && (
              <p
                className={
                  isError
                    ? "mb-5 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose"
                    : "mb-5 rounded-2xl border border-honey/40 bg-honey/10 px-4 py-3 text-sm text-espresso"
                }
              >
                {message}
              </p>
            )}
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
                Studio password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full rounded-full bg-espresso px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cocoa"
            >
              {busy ? "Checking…" : "Unlock admin"}
            </button>
          </form>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Studio admin"
        title="Manage the site"
        description="Adding products, updating prices and uploading images. Changes appear on the site straight away."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {(
            [
              { value: "products", label: "Products" },
              { value: "images", label: "Images" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setTab(option.value)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                tab === option.value
                  ? "bg-espresso text-cream"
                  : "border border-espresso/15 bg-white/70 text-cocoa hover:border-espresso/30"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {tab === "products" ? (
          <>
            {message && (
          <p
            className={
              isError
                ? "mb-8 max-w-3xl rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose"
                : "mb-8 max-w-3xl rounded-2xl border border-honey/40 bg-honey/10 px-4 py-3 text-sm text-espresso"
            }
          >
            {message}
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-espresso/10 bg-white/70 p-7">
            <h2 className="font-serif text-xl font-medium">Add a product</h2>
            <form onSubmit={(e) => void addProduct(e)} className="mt-5 space-y-4">
              <Input
                label="Product name"
                value={form.name}
                onChange={(v) => void updateField("name", v)}
              />
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
                  Category
                </span>
                <select
                  value={form.category}
                  onChange={(e) => void updateField("category", e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <Input
                label={`Price (${site.currency.symbol})`}
                type="number"
                min="0"
                step="1"
                value={form.priceCents}
                onChange={(v) => void updateField("priceCents", v)}
              />
              <Input
                label="Short description"
                value={form.short}
                onChange={(v) => void updateField("short", v)}
              />
              <Input
                label="Long description"
                value={form.description}
                onChange={(v) => void updateField("description", v)}
              />
              <Input
                label="Image path"
                value={form.image}
                onChange={(v) => void updateField("image", v)}
              />
              <Input
                label="Badge (optional)"
                value={form.badge}
                onChange={(v) => void updateField("badge", v)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Rating (0–5)"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(v) => void updateField("rating", v)}
                />
                <Input
                  label="Reviews"
                  type="number"
                  min="0"
                  step="1"
                  value={form.reviews}
                  onChange={(v) => void updateField("reviews", v)}
                />
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-espresso px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cocoa"
              >
                {busy ? "Saving…" : "Add product"}
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-espresso/10 bg-white/70 p-7">
            <h2 className="font-serif text-xl font-medium">Update a price</h2>
            <form onSubmit={(e) => void updatePrice(e)} className="mt-5 space-y-4">
              <Input
                label="Product slug"
                value={priceSlug}
                onChange={setPriceSlug}
                placeholder="e.g. radiant-glow-serum"
              />
              <Input
                label={`New price (${site.currency.symbol})`}
                type="number"
                min="0"
                step="1"
                value={priceCents}
                onChange={setPriceCents}
              />
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-espresso px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cocoa"
              >
                {busy ? "Saving…" : "Update price"}
              </button>
            </form>
          </div>
        </div>
          </>
        ) : (
          <AdminImageLibrary password={password.trim()} />
        )}
      </section>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
      />
    </label>
  );
}
