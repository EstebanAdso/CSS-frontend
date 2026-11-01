"use client";

import { useEffect, useRef, useState } from "react";
import { STEPS, stepAtVideoTime } from "./buildTimeline";

/* ─── Video con transparencia ("stacked alpha") ────────────────────────────────
   Cada fotograma trae el color (N×N) y, a su derecha, el alfa a media resolución.
   Un shader WebGL mínimo los combina en un canvas transparente: el PC flota sobre
   el fondo de la página sin ningún recuadro. Lo decodifica el hardware de video,
   así que va fluido en cualquier equipo. https://jakearchibald.com/2024/video-with-transparency/
   ─────────────────────────────────────────────────────────────────────────── */

type Size = "720" | "1080";
const poster = (kind: "start" | "final", size: Size) => `/video/hero-pc-${kind}-${size}.webp`;

const VERT = `attribute vec2 p; varying vec2 uv;
void main() { uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;

/* Color en u ∈ [0, 2/3]; alfa en u ∈ [2/3, 1] y la mitad superior.
   El color viene premultiplicado: el halo del bloom (color sin alfa) se suma al fondo. */
const FRAG = `precision mediump float; uniform sampler2D tex; varying vec2 uv;
void main() {
  vec3 color = texture2D(tex, vec2(uv.x * (2.0 / 3.0), uv.y)).rgb;
  float alpha = texture2D(tex, vec2(2.0 / 3.0 + uv.x / 3.0, 0.5 + uv.y * 0.5)).r;
  alpha = clamp((alpha - 0.015) / 0.97, 0.0, 1.0);
  color = max(color - 0.006, 0.0);
  gl_FragColor = vec4(color, alpha);
}`;

type Renderer = { draw: () => void; resize: () => void; dispose: () => void };

function createRenderer(canvas: HTMLCanvasElement, video: HTMLVideoElement, maxSize: number): Renderer | null {
  const gl = canvas.getContext("webgl", {
    alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: "low-power",
  });
  if (!gl) return null;

  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.clearColor(0, 0, 0, 0);

  const resize = () => {
    const px = Math.min(Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)), maxSize);
    if (px > 0 && canvas.width !== px) {
      canvas.width = canvas.height = px;
      gl.viewport(0, 0, px, px);
    }
  };
  resize();

  return {
    resize,
    draw() {
      if (video.readyState < 2) return;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    dispose() {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

type Props = {
  /** Paso actual del ensamblaje, para sincronizar el HUD */
  onStep?: (step: number) => void;
};

export default function HeroVideo({ onStep }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<{ size: Size; src: string | null; still: boolean }>({ size: "720", src: null, still: false });
  const [drawing, setDrawing] = useState(false);

  /* Elegir tamaño y formato en el cliente */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const size: Size = window.matchMedia("(min-width: 768px)").matches ? "1080" : "720";
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || !!nav.connection?.saveData;
    const webm = video.canPlayType('video/webm; codecs="vp9"') !== "";
    const id = requestAnimationFrame(() => {
      setMode({ size, still, src: still ? null : `/video/hero-pc-${size}.${webm ? "webm" : "mp4"}` });
      if (still) onStep?.(STEPS.length); // imagen final: equipo armado y encendido
    });
    return () => cancelAnimationFrame(id);
  }, [onStep]);

  /* Render WebGL de cada fotograma nuevo + HUD sincronizado */
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !mode.src) return;
    const renderer = createRenderer(canvas, video, Number(mode.size));
    if (!renderer) return; // sin WebGL: queda el póster estático

    let last = -2;
    let handle = 0;
    let first = true;
    const frame = () => {
      renderer.draw();
      if (first && video.readyState >= 2) {
        first = false;
        setDrawing(true);
      }
      const s = stepAtVideoTime(video.currentTime);
      if (s !== last) {
        last = s;
        onStep?.(s);
      }
    };
    const hasRVFC = "requestVideoFrameCallback" in video;
    const loop = () => {
      frame();
      handle = hasRVFC ? video.requestVideoFrameCallback(loop) : requestAnimationFrame(loop);
    };
    handle = hasRVFC ? video.requestVideoFrameCallback(loop) : requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      renderer.resize();
      renderer.draw();
    });
    ro.observe(canvas);

    /* Reproducir solo mientras el hero está en pantalla */
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.05 });
    io.observe(canvas);

    return () => {
      if (hasRVFC) video.cancelVideoFrameCallback(handle);
      else cancelAnimationFrame(handle);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
    };
  }, [mode, onStep]);

  /* Inclinación 3D siguiendo el cursor (solo con mouse y sin "reducir movimiento") */
  useEffect(() => {
    const el = tiltRef.current;
    if (!el || mode.still || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      el.style.transform =
        `perspective(1400px) rotateY(${(cur.x * 9).toFixed(2)}deg) rotateX(${(-cur.y * 6).toFixed(2)}deg) ` +
        `translate3d(${(cur.x * 10).toFixed(1)}px, ${(cur.y * 6).toFixed(1)}px, 0)`;
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.9)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.9)));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.x = target.y = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [mode.still]);

  return (
    <div ref={tiltRef} className="relative w-full h-full will-change-transform" aria-hidden>
      {/* El video no se muestra: es la fuente de fotogramas del canvas */}
      <video
        ref={videoRef}
        src={mode.src ?? undefined}
        muted
        loop
        playsInline
        autoPlay
        preload={mode.src ? "auto" : "none"}
        disablePictureInPicture
        tabIndex={-1}
        className="absolute w-px h-px opacity-0 pointer-events-none"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Póster transparente: mientras carga, sin WebGL, o con "reducir movimiento" */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster(mode.still ? "final" : "start", mode.size)}
        alt=""
        width={1080}
        height={1080}
        decoding="async"
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${drawing ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}
