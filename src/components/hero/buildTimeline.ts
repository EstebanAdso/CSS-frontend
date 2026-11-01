/* ─── Línea de tiempo del video de ensamblaje ───────────────────────────────
   El video (public/video/hero-pc-*) se renderiza con scripts/3d/render_video.py
   usando exactamente estos tiempos: el segundo 0 del video equivale a
   t = LOOP_START. Si cambias algo aquí, cámbialo también allá y vuelve a
   renderizar (npm run 3d:render && npm run 3d:encode).
   ─────────────────────────────────────────────────────────────────────────── */

export const LOOP_START = 0.5;
export const POWER_ON = 10.5;
export const POWER_OFF = 15.8;

export const STEPS = [
  { label: "Placa madre", at: 0.9 },
  { label: "Procesador", at: 1.7 },
  { label: "Refrigeración líquida", at: 2.7 },
  { label: "Memoria RAM", at: 4.34 },
  { label: "SSD NVMe", at: 5.25 },
  { label: "Tarjeta gráfica", at: 6.55 },
  { label: "Fuente de poder", at: 7.5 },
  { label: "Cableado", at: 8.65 },
  { label: "Gabinete", at: 10.3 },
  { label: "Encendido · POST", at: POWER_ON + 0.7 },
] as const;

/** Pasos completados en el instante t; -1 mientras el equipo se desarma para reiniciar */
export function stepIndex(t: number) {
  if (t >= POWER_OFF) return -1;
  let n = 0;
  for (const s of STEPS) if (t >= s.at) n++;
  return n;
}

/** Paso a mostrar para un instante del video (en segundos) */
export function stepAtVideoTime(seconds: number) {
  return stepIndex(LOOP_START + seconds);
}
