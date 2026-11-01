// Ejecuta un script de Blender en modo consola.
// Uso: node scripts/3d/blender.mjs <build|render>
// Ruta de Blender: variable BLENDER o, si no existe, "blender" en el PATH.

import { execFileSync } from "node:child_process";
import { join } from "node:path";

const BLENDER = process.env.BLENDER || "blender";
const dir = import.meta.dirname;
const run = (script, ...args) =>
  execFileSync(BLENDER, ["-b", "--factory-startup", "-P", join(dir, script), "--", ...args], { stdio: "inherit" });

const task = process.argv[2];
if (task === "build") {
  run("build_pc.py", join(dir, "out"));
} else if (task === "render") {
  for (const size of process.argv.slice(3).length ? process.argv.slice(3) : ["1080"]) run("render_video.py", size);
} else {
  console.error("Uso: node scripts/3d/blender.mjs <build|render> [tamaños…]");
  process.exit(1);
}
