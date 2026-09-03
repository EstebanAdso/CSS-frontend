"use client";

import Link from "next/link";
import ImagenProducto from "@/components/ImagenProducto";
import { useRef, useState, useEffect } from "react";
import type { Producto } from "@/types";
import { miniatura } from "@/lib/api";
import { urlProducto } from "@/lib/utils";

type Props = {
  producto: Producto;
};

function formatPrecio(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}

export default function ProductCard({ producto }: Props) {
  /* Miniatura y no el original: la tarjeta mide ~300px y el archivo de Cloudinary
     puede pesar cientos de KB; una página de catálogo trae doce. */
  const imagenSrc = miniatura(producto.imagen, 500);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const [tituloLargo, setTituloLargo] = useState(false);

  useEffect(() => {
    const el = tituloRef.current;
    if (!el) return;
    /* line-height ~1.375 × font-size 14px ≈ 19.25px por línea; 2 líneas ≈ 38.5px */
    setTituloLargo(el.scrollHeight > 40);
  }, []);

  return (
    <Link
      href={urlProducto(producto.nombre, producto.categoria.nombre)}
      className="group flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-gray-400 hover:shadow-md transition-all duration-200"
      title={`${producto.nombre} en Pasto`}
    >
      {/* Imagen */}
      <div className="relative w-full bg-gray-50 overflow-hidden" style={{ height: "160px" }}>
        <ImagenProducto
          src={imagenSrc}
          alt={`${producto.nombre} — ${producto.categoria.nombre} en Pasto, Nariño`}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        {/* Categoría pequeña */}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          {producto.categoria.nombre}
        </span>

        {/* Nombre — sin clamp para medir altura real, luego se limita visualmente */}
        <h3
          ref={tituloRef}
          className="text-sm font-semibold text-gray-800 leading-snug line-clamp-4 group-hover:text-gray-900 transition-colors"
        >
          {producto.nombre}
        </h3>

        {/* Descripción — se oculta si el título ocupa más de 2 líneas */}
        {!tituloLargo && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
            {producto.descripcion}
          </p>
        )}

        {/* Precio + Ver detalle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 pt-2 border-t border-gray-100 gap-1">
          <span className="text-base font-black" style={{ color: "rgb(40, 167, 69)" }}>
            {formatPrecio(producto.precioVendido)}
          </span>
          <span className="text-xs text-gray-400 font-semibold flex items-center gap-0.5 group-hover:text-gray-700 transition-colors">
            Ver detalle
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
