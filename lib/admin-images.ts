import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { del, head, list, put } from "@vercel/blob";

export type AdminImage = {
  name: string;
  folder: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
};

export const IMAGE_FOLDERS = ["general", "products", "gallery"] as const;
export type ImageFolder = (typeof IMAGE_FOLDERS)[number];

export const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

export const EXT_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
};

const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");
const INDEX_FILE = path.join(UPLOAD_DIR, "index.json");
const MAX_BYTES = 8 * 1024 * 1024;

const BLOB_PREFIX = "images";

function isBlobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function blobPathname(folder: string, name: string): string {
  return `${BLOB_PREFIX}/${folder}/${name}`;
}

function parseBlobPathname(pathname: string): {
  folder: string;
  name: string;
} | null {
  const parts = pathname.split("/");
  if (parts[0] !== BLOB_PREFIX || parts.length !== 3) return null;
  return { folder: parts[1], name: parts[2] };
}

function isAllowedFolder(folder: string): folder is ImageFolder {
  return (IMAGE_FOLDERS as readonly string[]).includes(folder);
}

function isSafeFileName(name: string): boolean {
  return /^[a-z0-9._-]+$/i.test(name) && !name.startsWith(".");
}

async function ensureUploadDir(): Promise<void> {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

async function readIndex(): Promise<AdminImage[]> {
  try {
    const raw = await readFile(INDEX_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as AdminImage[]) : [];
  } catch {
    return [];
  }
}

async function writeIndex(images: AdminImage[]): Promise<void> {
  await ensureUploadDir();
  const tmp = `${INDEX_FILE}.tmp`;
  await writeFile(tmp, JSON.stringify(images, null, 2), "utf8");
  await rename(tmp, INDEX_FILE);
}

export type UploadImageInput = {
  buffer: Uint8Array;
  mime: string;
  folder: string;
};

export type UploadImageResult =
  | { ok: true; image: AdminImage }
  | { ok: false; error: string };

export async function uploadImage(
  input: UploadImageInput,
): Promise<UploadImageResult> {
  const folder = input.folder;
  if (!isAllowedFolder(folder)) {
    return { ok: false, error: "Please pick a valid folder." };
  }

  const ext = MIME_TO_EXT[input.mime];
  if (!ext) {
    return {
      ok: false,
      error: "Only JPEG, PNG, WebP, GIF, SVG and AVIF images are allowed.",
    };
  }

  if (input.buffer.byteLength === 0) {
    return { ok: false, error: "That file appears to be empty." };
  }

  if (input.buffer.byteLength > MAX_BYTES) {
    return { ok: false, error: "Images must be 8MB or smaller." };
  }

  const name = `${randomUUID()}.${ext}`;

  if (isBlobStorageEnabled()) {
    const pathname = blobPathname(folder, name);
    const putResult = await put(pathname, Buffer.from(input.buffer), {
      access: "public",
      addRandomSuffix: false,
      contentType: input.mime,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const image: AdminImage = {
      name,
      folder,
      url: putResult.url,
      size: input.buffer.byteLength,
      type: input.mime,
      uploadedAt: new Date().toISOString(),
    };
    return { ok: true, image };
  }

  await ensureUploadDir();
  const folderAbs = path.join(UPLOAD_DIR, folder);
  await mkdir(folderAbs, { recursive: true });

  await writeFile(path.join(folderAbs, name), input.buffer);

  const image: AdminImage = {
    name,
    folder,
    url: `/api/admin/images/${folder}/${name}`,
    size: input.buffer.byteLength,
    type: input.mime,
    uploadedAt: new Date().toISOString(),
  };

  const index = await readIndex();
  await writeIndex([image, ...index]);
  return { ok: true, image };
}

export async function listImages(): Promise<AdminImage[]> {
  if (isBlobStorageEnabled()) {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const all: AdminImage[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({
        token,
        prefix: `${BLOB_PREFIX}/`,
        cursor,
        limit: 1000,
      });
      for (const blobItem of page.blobs) {
        const parsed = parseBlobPathname(blobItem.pathname);
        if (!parsed) continue;
        const ext = path.extname(parsed.name).slice(1).toLowerCase();
        all.push({
          name: parsed.name,
          folder: parsed.folder,
          url: blobItem.url,
          size: blobItem.size,
          type: EXT_TO_MIME[ext] ?? "application/octet-stream",
          uploadedAt: blobItem.uploadedAt.toISOString(),
        });
      }
      cursor = page.cursor;
    } while (cursor);
    return all.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  }

  const index = await readIndex();
  return [...index].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

export async function deleteImage(
  folder: string,
  name: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isAllowedFolder(folder) || !isSafeFileName(name)) {
    return { ok: false, error: "That image could not be found." };
  }

  if (isBlobStorageEnabled()) {
    await del(blobPathname(folder, name), {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return { ok: true };
  }

  const fileAbs = path.join(UPLOAD_DIR, folder, name);
  if (!fileAbs.startsWith(`${UPLOAD_DIR}${path.sep}`)) {
    return { ok: false, error: "That image could not be found." };
  }

  await rm(fileAbs, { force: true });
  const index = await readIndex();
  await writeIndex(
    index.filter((img) => !(img.folder === folder && img.name === name)),
  );
  return { ok: true };
}

export type DownloadedImage = {
  bytes: Uint8Array;
  ext: string;
};

export async function getImageUrl(
  folder: string,
  name: string,
): Promise<string | null> {
  if (!isAllowedFolder(folder) || !isSafeFileName(name)) return null;
  if (!isBlobStorageEnabled()) return null;
  try {
    const blob = await head(blobPathname(folder, name), {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  } catch {
    return null;
  }
}

export async function readUploadedImage(
  folder: string,
  name: string,
): Promise<DownloadedImage | null> {
  if (!isAllowedFolder(folder) || !isSafeFileName(name)) return null;

  const fileAbs = path.join(UPLOAD_DIR, folder, name);
  if (!fileAbs.startsWith(`${UPLOAD_DIR}${path.sep}`)) return null;

  try {
    const bytes = await readFile(fileAbs);
    return { bytes, ext: path.extname(name).slice(1).toLowerCase() };
  } catch {
    return null;
  }
}
