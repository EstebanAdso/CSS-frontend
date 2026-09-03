"use client";

import Link from "next/link";
import Image from "next/image";
import { presentacionCategoria } from "@/lib/categorias";
import { useRef } from "react";
import { urlCategoria } from "@/lib/utils";

const categorias = [
  { nombre: "SSD", img: "/imagenes/categorias/IASSD.webp" },
  { nombre: "M2", img: "/imagenes/categorias/nvme.webp" },
  { nombre: "MONITOR", img: "/imagenes/categorias/IAMONITOR.webp" },
  { nombre: "RAM", img: "/imagenes/categorias/IARAM.webp" },
  { nombre: "FUENTE DE PODER", img: "/imagenes/categorias/IAFUENTE.webp" },
  { nombre: "COMPUTADOR", img: "/imagenes/categorias/computador.webp" },
  { nombre: "GRAFICA", img: "/imagenes/categorias/IAGRAFICA.webp" },
  { nombre: "MOUSE", img: "/imagenes/categorias/mouseC.webp" },
  { nombre: "TECLADO", img: "/imagenes/categorias/tecladoC.webp" },
  { nombre: "CONTROLES Y JUEGOS", img: "/imagenes/categorias/control.webp" },
  {
    nombre: "BASE REFRIGERANTE",
    img: "/imagenes/categorias/baserefrigerante.webp",
  },
  { nombre: "MOTHERBOARD", img: "/imagenes/categorias/IABOARD.webp" },
  { nombre: "PROCESADOR", img: "/imagenes/categorias/IAPROCESADOR.webp" },
  { nombre: "DISIPADOR", img: "/imagenes/categorias/disipador.webp" },
  {
    nombre: "REGULADOR",
    img: "/imagenes/categorias/fuente%20de%20poder%202.webp",
  },
];


export default function CategoriasCarrusel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const ancho = scrollRef.current.offsetWidth;
    scrollRef.current.scrollBy({
      left: dir === "right" ? ancho : -ancho,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="categorias"
      className="py-10 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100/80"
    >
      <div className="container-site">
        {/* Encabezado */}
        <div className="flex items-end justify-between mb-1 px-1">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-1">
              — Catálogo —
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Categorías <span className="text-primary">Destacadas</span> en
              Pasto
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 ml-4 shrink-0"
          >
            Ver todas
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Divisor */}
        <div className="w-full h-px bg-gray-100 mb-4" />

        {/* Carrusel con flechas superpuestas */}
        <div className="relative group/carousel">
          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("left")}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center transition-all duration-200 shadow-lg opacity-70 hover:opacity-100 hover:scale-110"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("right")}
            aria-label="Siguiente"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center transition-all duration-200 shadow-lg opacity-70 hover:opacity-100 hover:scale-110"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carrusel horizontal - productos siempre completos */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
            }}
          >
            {categorias.map((cat) => (
              <Link
                key={cat.nombre}
                href={urlCategoria(cat.nombre)}
                className="group shrink-0 w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[calc(25%-9px)] lg:w-[calc(20%-9.6px)] xl:w-[calc(16.666%-10px)] 2xl:w-[calc(14.285%-10.3px)] flex flex-col rounded-2xl border border-gray-200 bg-white hover:border-gray-400 hover:shadow-lg transition-all duration-200 overflow-hidden"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative w-full aspect-4/3 bg-gray-50 overflow-hidden">
                  <Image
                    src={cat.img}
                    alt={`${presentacionCategoria(cat.nombre).plural} en Pasto — CompuServicesSoft Nariño`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16vw, 14vw"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-gray-800 leading-snug group-hover:text-gray-900 transition-colors truncate">
                    {presentacionCategoria(cat.nombre).plural}
                  </p>
                  <svg
                    className="w-3.5 h-3.5 text-gray-400 shrink-0 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
