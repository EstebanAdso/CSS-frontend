# Video 3D del hero

El ensamblaje del PC que se ve en el hero es un video pre-renderizado con Blender.
Todo se genera por código y no hace falta abrir Blender a mano.

| Archivo | Qué hace |
|---|---|
| `build_pc.py` (+ `pc_lib.py`, `pc_textures.py`) | Modela placa, CPU, refrigeración, RAM, SSD, GPU, fuente y gabinete, y exporta `out/pc-build.raw.glb` |
| `render_video.py` | Anima el ensamblaje y renderiza los fotogramas con Eevee (color + canal alfa) |
| `encode.mjs` | Codifica los videos *stacked alpha* (MP4 H.264, 60 fps) y los pósters en `public/video/` |
| `blender.mjs` | Lanza Blender en modo consola |
| `assets/` | HDRI de estudio (Poly Haven, CC0) |

## Regenerar el video

Requisitos: [Blender](https://www.blender.org) 5.x y [FFmpeg](https://ffmpeg.org), ambos gratuitos.

```bash
# Si no están en el PATH:
#   BLENDER="D:/Esteban/Tools/blender-5.2.3-windows-x64/blender.exe"
#   FFMPEG="ruta/a/ffmpeg.exe"
npm run 3d:build    # modelo (~15 s)
npm run 3d:render   # fotogramas 1080 a 60 fps (~45 min con GPU)
npm run 3d:encode   # videos y pósters (~2 min)
```

Los tiempos de la animación están en `render_video.py` (`PARTS`, `CABLES`, `POWER_ON`…).
El panel "Build log" de la web los replica en `src/components/hero/buildTimeline.ts`:
si cambias unos, cambia los otros.

## Cómo se muestra en la web

Safari no reproduce video con transparencia en todos los formatos, así que cada fotograma lleva
el color a la izquierda y el alfa (en gris, a media resolución) a la derecha. Un shader WebGL
mínimo los combina en un canvas transparente (`src/components/hero/HeroVideo.tsx`).
Técnica: <https://jakearchibald.com/2024/video-with-transparency/>
