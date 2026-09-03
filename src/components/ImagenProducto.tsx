"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { SIN_FOTO } from "@/lib/api";

/* Una foto rota no es un caso raro del catálogo: las imágenes viven en
   Cloudinary y las administra Zentivy, así que basta con que allá borren una
   —o que el producto nunca haya tenido— para que el navegador pinte su icono
   de documento roto sobre la tarjeta. Este componente pone en su lugar un
   marcador propio, del mismo gris que la caja que lo contiene, para que el
   hueco parezca intencional y no un error de la página.

   Cubre los dos caminos por los que se llega al hueco:
     1. no hay ruta (o `resolverImagen` devolvió SIN_FOTO), y
     2. la ruta existía pero el archivo ya no responde → `onError`. */

type Props = Omit<ImageProps, "src"> & {
  src?: string | null;
  /** Miniaturas chicas (~80px): icono reducido y sin el texto, que no cabría. */
  compacto?: boolean;
};

export default function ImagenProducto({
  src,
  alt,
  compacto = false,
  fill,
  className,
  ...rest
}: Props) {
  /* Guardamos QUÉ url falló, no un booleano: estas tarjetas se reciclan al
     paginar y al filtrar, y un booleano dejaría marcado como roto al producto
     siguiente, que sí tiene foto. */
  const [urlRota, setUrlRota] = useState<string | null>(null);

  const url = typeof src === "string" ? src : "";
  const hayFoto = url !== "" && url !== SIN_FOTO && url !== urlRota;

  if (!hayFoto) {
    return (
      <span
        role="img"
        aria-label={alt}
        style={fill ? undefined : { width: rest.width, height: rest.height }}
        className={`${
          fill ? "absolute inset-0 flex" : "inline-flex"
        } flex-col items-center justify-center gap-1.5 bg-gray-50 text-gray-300 select-none`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={compacto ? "w-6 h-6" : "w-10 h-10"}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
          <path d="m2 2 20 20" />
        </svg>
        {!compacto && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Sin imagen
          </span>
        )}
      </span>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setUrlRota(url)}
      {...rest}
    />
  );
}
