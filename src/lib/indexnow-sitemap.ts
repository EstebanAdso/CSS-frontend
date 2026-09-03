/**
 * Reúne todas las URLs públicas del sitio y las envía a IndexNow en un solo lote.
 *
 * Se llama desde:
 *  - El webhook de despliegue (POST /api/indexnow-deploy)
 *  - El workflow de GitHub Actions, después de cada deploy a producción
 */

import { submitUrls } from "@/lib/indexnow";
import sitemap from "@/app/sitemap";

/**
 * Las URLs salen del sitemap, no de una lista propia.
 *
 * Antes este archivo tenía su propia copia de las páginas estáticas con un
 * comentario que pedía "mantener en sync con src/app/sitemap.ts", y además solo
 * agregaba categorías: los ~370 productos nunca entraban al lote, pese a que el
 * encabezado decía "categories + products". Bing solo podía descubrir las fichas
 * rastreando por su cuenta, que es exactamente lo que IndexNow existe para
 * evitar.
 *
 * Leyendo del sitemap hay una sola definición de "qué páginas son públicas", así
 * que las dos listas no pueden volver a separarse.
 */
export async function submitAllUrls(): Promise<void> {
  const paginas = await sitemap();
  await submitUrls(paginas.map((p) => p.url));
}
