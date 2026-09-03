"use client";

import Link from "next/link";
import ImagenProducto from "@/components/ImagenProducto";
import { resolverImagen } from "@/lib/api";
import { useRef } from "react";
import { urlProducto } from "@/lib/utils";
import type { Producto } from "@/types";

function formatPrecio(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}

type Props = {
  titulo: string;
  lema: string;
  productos: Producto[];
  urlVerTodos: string;
};

export default function FilaCarrusel({ titulo, lema, productos, urlVerTodos }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const ancho = el.offsetWidth;
    const actual = el.scrollLeft;
    const destino = dir === "right"
      ? Math.round((actual + ancho) / ancho) * ancho
      : Math.round((actual - ancho) / ancho) * ancho;
    el.scrollTo({ left: Math.max(0, destino), behavior: "smooth" });
  }

  if (productos.length === 0) return null;

  return (
    <div className="mb-14">
      {/* Encabezado */}
      <div className="flex items-start justify-between mb-1 px-1">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">{titulo}</h3>
          <p className="text-sm text-gray-500 font-medium mt-0.5 italic">{lema}</p>
        </div>
        <Link
          href={urlVerTodos}
          className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 ml-4 shrink-0 mt-1"
        >
          Ver todos
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
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
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flecha derecha */}
        <button
          onClick={() => scroll("right")}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white border border-gray-200 hover:border-primary text-gray-400 hover:text-primary flex items-center justify-center transition-all duration-200 shadow-lg opacity-70 hover:opacity-100 hover:scale-110"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll horizontal - productos siempre completos */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
        >
          {productos.map((p) => {
            const url = urlProducto(p.nombre, p.categoria.nombre);
            return (
              <Link
                key={p.id}
                href={url}
                className="group shrink-0 w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[calc(25%-9px)] lg:w-[calc(20%-9.6px)] xl:w-[calc(16.666%-10px)] 2xl:w-[calc(14.285%-10.3px)] flex flex-col rounded-xl border border-gray-200 bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200 overflow-hidden"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                  <ImagenProducto
                    src={resolverImagen(p.imagen)}
                    alt={p.nombre}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, (max-width: 1536px) 16vw, 14vw"
                  />
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-gray-900 transition-colors">
                    {p.nombre}
                  </p>
                  <p className="text-sm font-black" style={{ color: "rgb(40, 167, 69)" }}>
                    {formatPrecio(p.precioVendido)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
