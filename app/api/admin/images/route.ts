import { NextResponse } from "next/server";

import type { ImageFolder } from "@/lib/admin-images";
import {
  deleteImage,
  IMAGE_FOLDERS,
  listImages,
  uploadImage,
} from "@/lib/admin-images";

export const runtime = "nodejs";

function isAdminPasswordValid(request: Request): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const supplied = request.headers.get("x-admin-password");
  return typeof supplied === "string" && supplied === password;
}

function adminDenied() {
  return NextResponse.json(
    { error: "Admin access is required for that action." },
    { status: 401 },
  );
}

export async function GET(request: Request) {
  if (!isAdminPasswordValid(request)) return adminDenied();
  const images = await listImages();
  return NextResponse.json({ images });
}

export async function POST(request: Request) {
  if (!isAdminPasswordValid(request)) return adminDenied();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Your upload could not be read. Please try again." },
      { status: 400 },
    );
  }

  const fileField = form.get("file");
  const folderValue = form.get("folder");

  if (!fileField || typeof (fileField as File).arrayBuffer !== "function") {
    return NextResponse.json(
      { error: "Please choose an image file to upload." },
      { status: 400 },
    );
  }

  const folder =
    typeof folderValue === "string" &&
    (IMAGE_FOLDERS as readonly string[]).includes(folderValue)
      ? (folderValue as ImageFolder)
      : "general";

  const buffer = new Uint8Array(await (fileField as File).arrayBuffer());
  const result = await uploadImage({
    buffer,
    mime: (fileField as File).type,
    folder,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ image: result.image }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!isAdminPasswordValid(request)) return adminDenied();

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

  const folder = typeof input.folder === "string" ? input.folder : "";
  const name = typeof input.name === "string" ? input.name : "";

  if (!name) {
    return NextResponse.json(
      { error: "Please specify which image to delete." },
      { status: 400 },
    );
  }

  const result = await deleteImage(folder, name);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}