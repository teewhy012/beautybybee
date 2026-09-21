"use client";

import { useEffect, useState } from "react";

type AdminImage = {
  name: string;
  folder: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
};

const FOLDERS = [
  { value: "general", label: "General / brand" },
  { value: "products", label: "Product shots" },
  { value: "gallery", label: "Gallery" },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminImageLibrary({ password }: { password: string }) {
  const [images, setImages] = useState<AdminImage[]>([]);
  const [folder, setFolder] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/images", {
      headers: { "x-admin-password": password },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { images: AdminImage[] }) => {
        if (active) setImages(data.images ?? []);
      })
      .catch(() => {
        if (active) {
          setIsError(true);
          setMessage("The image library could not be loaded.");
        }
      });
    return () => {
      active = false;
    };
  }, [password]);

  function pickFile(next: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(next ? URL.createObjectURL(next) : null);
  }

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    if (!file) {
      setIsError(true);
      setMessage("Please choose an image file first.");
      return;
    }
    setBusy(true);
    setMessage("");
    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);
    try {
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: form,
      });
      const data = (await res.json()) as { error?: string; image?: AdminImage };
      if (res.ok && data.image) {
        setIsError(false);
        setMessage("Uploaded. Copy the path and paste it where you need it.");
        setImages((prev) => [data.image as AdminImage, ...prev]);
        pickFile(null);
      } else {
        setIsError(true);
        setMessage(data.error ?? "The image could not be uploaded.");
      }
    } catch {
      setIsError(true);
      setMessage("The image could not be uploaded. Please try again.");
    }
    setBusy(false);
  }

  async function copyPath(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  async function removeImage(image: AdminImage) {
    if (!window.confirm(`Delete ${image.name}?`)) return;
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ folder: image.folder, name: image.name }),
      });
      if (res.ok) {
        setIsError(false);
        setMessage("Image deleted.");
        setImages((prev) => prev.filter((item) => item.name !== image.name));
      } else {
        setIsError(true);
        setMessage("The image could not be deleted.");
      }
    } catch {
      setIsError(true);
      setMessage("The image could not be deleted.");
    }
    setBusy(false);
  }

  return (
    <div>
      <div className="rounded-3xl border border-espresso/10 bg-white/70 p-7">
        <h2 className="font-serif text-xl font-medium">Upload an image</h2>
        <p className="mt-1 text-sm text-cocoa">
          JPEG, PNG, WebP, GIF, SVG or AVIF — up to 8MB. Uploaded files are
          served from <span className="font-medium text-espresso">/api/admin/images/…</span>{" "}
          and are never lost on rebuilds of the public folders.
        </p>
        <form onSubmit={(event) => void handleUpload(event)} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
              Folder
            </span>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-espresso/15 bg-cream px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-honey"
            >
              {FOLDERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-cocoa">
              Choose a file
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              className="mt-2 block w-full text-sm text-cocoa file:mr-4 file:cursor-pointer file:rounded-full file:border file:border-espresso/20 file:bg-cream file:px-5 file:py-2.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.15em] file:text-espresso file:transition-colors hover:file:border-espresso/40"
            />
          </label>

          {preview && (
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Selected upload preview"
                className="h-20 w-20 rounded-2xl border border-espresso/10 object-cover"
              />
              <div className="text-sm text-cocoa">
                <p className="font-medium text-espresso">{file?.name}</p>
                <p>{file ? formatBytes(file.size) : ""}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !file}
            className="w-full rounded-full bg-espresso px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-cocoa disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Uploading…" : "Upload image"}
          </button>
        </form>
      </div>

      {message && (
        <p
          className={
            isError
              ? "mb-8 mt-6 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose"
              : "mb-8 mt-6 rounded-2xl border border-honey/40 bg-honey/10 px-4 py-3 text-sm text-espresso"
          }
        >
          {message}
        </p>
      )}

      <div className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-xl font-medium">Image library</h2>
          <p className="text-xs uppercase tracking-[0.18em] text-cocoa">
            {images.length} {images.length === 1 ? "file" : "files"}
          </p>
        </div>

        {images.length === 0 ? (
          <p className="editorial-text mt-4 text-sm text-cocoa">
            Nothing uploaded yet — your uploads will appear here.
          </p>
        ) : (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.name}
                className="overflow-hidden rounded-3xl border border-espresso/10 bg-white/70"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-44 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cocoa">
                    {image.folder}
                  </p>
                  <p className="mt-1 truncate font-serif text-base font-medium">
                    {image.name.slice(0, 26)}
                  </p>
                  <p className="mt-1 text-xs text-cocoa">{formatBytes(image.size)}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void copyPath(image.url)}
                      className="flex-1 rounded-full border border-espresso/15 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:border-espresso/40"
                    >
                      {copied === image.url ? "Copied" : "Copy path"}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void removeImage(image)}
                      className="rounded-full border border-rose/40 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-rose transition-colors hover:bg-rose/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}