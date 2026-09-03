"use client";

import Link from "next/link";
import { useEffect } from "react";

/* Pantalla para cuando el catálogo de Zentivy no responde.
   Existe porque las páginas de producto y de categoría dejaron de tragarse los
   fallos de la API: antes devolvían 200 con "no se pudo conectar" o con un
   `noindex`, y Google lo leía como "esta página está vacía / no la indexes" —una
   caída de treinta segundos costaba semanas de indexación—. Ahora la excepción
   sube, Next responde 500, el buscador entiende "vuelve más tarde" y el visitante
   ve esto en lugar de la pantalla de error cruda del framework. */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
          <svg
            className="w-12 h-12 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
          No pudimos cargar esta página
        </h1>

        <p className="text-gray-600 leading-relaxed mb-8">
          Estamos teniendo problemas para conectarnos con el catálogo. Suele ser
          momentáneo: volvé a intentarlo en unos segundos.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-primary hover:bg-primary-dark text-white transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold border border-gray-200 text-gray-700 hover:border-gray-400 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
