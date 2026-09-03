/**
 * POST /api/indexnow-deploy
 *
 * Webhook endpoint — call this after each deployment to submit every
 * public URL to IndexNow in one shot.
 *
 * Example (curl):
 *   curl -X POST https://compuservicessoft.com/api/indexnow-deploy \
 *        -H "x-api-key: <INDEXNOW_ROUTE_SECRET>"
 *
 * Vercel deploy hook: add this URL in Project → Settings → Deploy Hooks
 * and call it from the "Post-deployment webhook" step in your workflow.
 */

import { NextRequest, NextResponse } from "next/server";
import { submitAllUrls } from "@/lib/indexnow-sitemap";

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

  try {
    await submitAllUrls();
    return NextResponse.json({ ok: true, message: "All URLs submitted to IndexNow" });
  } catch (err) {
    console.error("[IndexNow deploy] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
