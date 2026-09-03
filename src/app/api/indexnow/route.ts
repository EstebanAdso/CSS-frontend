/**
 * POST /api/indexnow
 *
 * Accepts a JSON body and submits URLs to IndexNow.
 *
 * Body (single URL):
 *   { "url": "https://www.compuservicessoft.com/some-page" }
 *
 * Body (batch):
 *   { "urls": ["https://www.compuservicessoft.com/a", "https://www.compuservicessoft.com/b"] }
 *
 * Security: protected by INDEXNOW_ROUTE_SECRET so only internal callers can trigger it.
 * Pass the secret in the x-api-key header:
 *   x-api-key: <INDEXNOW_ROUTE_SECRET>
 */

import { NextRequest, NextResponse } from "next/server";
import { submitUrl, submitUrls } from "@/lib/indexnow";

export async function POST(req: NextRequest) {
  /* --- Auth check --------------------------------------------------------
   * Usamos x-api-key en lugar de Authorization porque Vercel Edge puede
   * stripear el header Authorization antes de que llegue al handler.
   * -------------------------------------------------------------------- */
  const secret = process.env.INDEXNOW_ROUTE_SECRET;
  if (!secret) {
    /* Sin secreto configurado la ruta queda abierta a cualquiera, asi que
       cierra en vez de abrir: mejor un deploy sin IndexNow que un endpoint
       que cualquiera pueda disparar. */
    console.error("[IndexNow] INDEXNOW_ROUTE_SECRET no esta configurado");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }
  if (req.headers.get("x-api-key") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  /* --- Parse body -------------------------------------------------------- */
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  /* --- Single URL -------------------------------------------------------- */
  if (typeof body.url === "string") {
    try {
      await submitUrl(body.url);
      return NextResponse.json({ ok: true, submitted: [body.url] });
    } catch (err) {
      console.error("[IndexNow route] Error:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Unknown error" },
        { status: 502 }
      );
    }
  }

  /* --- Batch URLs -------------------------------------------------------- */
  if (Array.isArray(body.urls) && body.urls.every((u) => typeof u === "string")) {
    try {
      await submitUrls(body.urls as string[]);
      return NextResponse.json({ ok: true, submitted: body.urls });
    } catch (err) {
      console.error("[IndexNow route] Error:", err);
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Unknown error" },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Body must contain "url" (string) or "urls" (string[])' },
    { status: 400 }
  );
}
