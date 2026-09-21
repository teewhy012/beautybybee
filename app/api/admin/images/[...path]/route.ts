import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { EXT_TO_MIME, readUploadedImage } from "@/lib/admin-images";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

  if (!Array.isArray(path) || path.length !== 2) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const [folder, name] = path;
  const image = await readUploadedImage(folder, name);

  if (!image) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const contentType = EXT_TO_MIME[image.ext] ?? "application/octet-stream";
  const buffer = new ArrayBuffer(image.bytes.byteLength);
  new Uint8Array(buffer).set(image.bytes);
  const body = new Blob([buffer], { type: contentType });

  return new NextResponse(body, {
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}