// Codifica los fotogramas renderizados en videos web con transparencia ("stacked alpha").
// Uso: npm run 3d:encode      (requiere ffmpeg en el PATH o la variable FFMPEG)
//
// Entrada:  scripts/3d/out/frames_<N>/0000.png   color premultiplicado (incluye el halo del bloom)
//           scripts/3d/out/alpha_<N>/*.png        canal alfa en escala de grises
// Salida:   public/video/hero-pc-<N>.{webm,mp4}   (1.5N × N) → color N×N + alfa N/2×N/2 arriba a la derecha
//           public/video/hero-pc-{start,final}-<N>.webp   pósters con transparencia real
//
// Los navegadores no reproducen video con alfa de forma uniforme (Safari no soporta VP9 con alfa),
// así que el alfa viaja como imagen dentro de un video normal y un shader WebGL lo recombina
// (src/components/hero/HeroVideo.tsx). Técnica: https://jakearchibald.com/2024/video-with-transparency/

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "out");
const DEST = join(import.meta.dirname, "..", "..", "public", "video");
const FFMPEG = process.env.FFMPEG || "ffmpeg";
const FPS = 30;
const LOOP_START = 0.5;
/* Pósters: inicio del loop y equipo armado y encendido dentro del gabinete (t = 12.5 s) */
const POSTERS = { start: 0, final: Math.round((12.5 - LOOP_START) * FPS) };

const PROFILES = {
  1080: { vp9: 33, h264: 23 },
  720: { vp9: 35, h264: 25 },
};

mkdirSync(DEST, { recursive: true });

const run = (args) => execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
const kb = (f) => `${Math.round(statSync(f).size / 1024)} KB`;

/** Patrón de numeración de una carpeta de PNG (p. ej. "a0000.png" → "a%04d.png") */
function sequence(dir) {
  const first = readdirSync(dir).filter((f) => f.endsWith(".png")).sort()[0];
  const m = /^(.*?)(\d{4})\.png$/.exec(first);
  if (!m) throw new Error(`No reconozco la numeración de ${dir}/${first}`);
  return { pattern: join(dir, `${m[1]}%04d.png`), file: (n) => join(dir, `${m[1]}${String(n).padStart(4, "0")}.png`) };
}

/* Color a la izquierda, alfa a media resolución arriba a la derecha; espacio de color BT.709 explícito */
const STACK =
  "[1:v]scale=iw/2:ih/2:flags=lanczos,format=gray,format=rgb24[a];" +
  "[0:v]format=rgb24,pad=iw*1.5:ih:0:0:black[c];" +
  "[c][a]overlay=x=main_w*2/3:y=0,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p";
const COLOR_TAGS = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"];

const ONLY = process.env.SIZES?.split(",");

for (const [size, q] of Object.entries(PROFILES)) {
  if (ONLY && !ONLY.includes(size)) continue;
  const colorDir = join(ROOT, `frames_${size}`);
  const alphaDir = join(ROOT, `alpha_${size}`);
  if (!existsSync(colorDir) || !existsSync(alphaDir)) {
    console.warn(`· sin fotogramas para ${size}px (npm run 3d:render)`);
    continue;
  }
  const color = sequence(colorDir);
  const alpha = sequence(alphaDir);
  const count = readdirSync(colorDir).filter((f) => f.endsWith(".png")).length;
  const input = ["-framerate", String(FPS), "-i", color.pattern, "-framerate", String(FPS), "-i", alpha.pattern];

  const webm = join(DEST, `hero-pc-${size}.webm`);
  run([...input, "-filter_complex", STACK, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(q.vp9),
    "-row-mt", "1", "-deadline", "good", "-cpu-used", "1", "-g", String(FPS * 2), ...COLOR_TAGS, "-an", webm]);

  const mp4 = join(DEST, `hero-pc-${size}.mp4`);
  run([...input, "-filter_complex", STACK, "-c:v", "libx264", "-preset", "slow", "-crf", String(q.h264),
    "-profile:v", "high", "-g", String(FPS * 2), ...COLOR_TAGS, "-movflags", "+faststart", "-an", mp4]);

  /* Pósters con alfa real: el color está premultiplicado, así que se "despremultiplica" */
  for (const [kind, frame] of Object.entries(POSTERS)) {
    const out = join(DEST, `hero-pc-${kind}-${size}.webp`);
    run(["-i", color.file(frame), "-i", alpha.file(frame), "-filter_complex",
      "[1:v]format=gray[a];[0:v]format=rgb24[c];[c][a]alphamerge,unpremultiply=inplace=1,format=yuva420p",
      "-c:v", "libwebp", "-quality", "85", out]);
  }

  console.log(`✓ ${size}px · ${count} fotogramas · webm ${kb(webm)} · mp4 ${kb(mp4)}`);
}
