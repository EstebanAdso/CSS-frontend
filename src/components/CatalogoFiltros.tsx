"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import type { Categoria } from "@/types";
import { urlCategoriaFiltro, urlBusqueda } from "@/lib/utils";

type Props = {
  categorias: Categoria[];
  categoriaActivaId: number | null;
  busquedaActual: string;
  totalElements: number;
};

export default function CatalogoFiltros({
  categorias,
  categoriaActivaId,
  busquedaActual,
  totalElements,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [busqueda, setBusqueda] = useState(busquedaActual);

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault();
    const termino = busqueda.trim();
    startTransition(() => {
      router.push(termino ? urlBusqueda(termino) : "/catalogo");
    });
  }

  function handleCategoria(cat: Categoria | null) {
    setBusqueda("");
    setExpandido(false);
    startTransition(() => {
      router.push(cat ? urlCategoriaFiltro(cat.nombre) : "/catalogo");
    });
  }

  /* Menú de categorías desplegado (móvil): bloquea el scroll de la página y cierra con Esc */
  const [expandido, setExpandido] = useState(false);

  /* En la fila horizontal, desplazar hasta la categoría activa para que siempre se vea */
  const filaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const activo = filaRef.current?.querySelector<HTMLElement>("[data-activo]");
    activo?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [categoriaActivaId, expandido]);
  useEffect(() => {
    if (!expandido) return;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpandido(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflowPrevio;
      window.removeEventListener("keydown", onKey);
    };
  }, [expandido]);

  const hayFiltro = !!(busquedaActual || categoriaActivaId);

  const claseChip = (activo: boolean) =>
    `shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
      activo
        ? "bg-gray-900 border-gray-900 text-white"
        : "border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 bg-white"
    }`;

  const chips = (
    <>
      <button onClick={() => handleCategoria(null)} className={claseChip(!categoriaActivaId && !busquedaActual)}>
        Todos
      </button>
      {categorias.map((cat) => (
        <button key={cat.id} onClick={() => handleCategoria(cat)} className={claseChip(categoriaActivaId === cat.id)}
          data-activo={categoriaActivaId === cat.id || undefined}>
          {cat.nombre}
        </button>
      ))}
    </>
  );

  const botonFlecha = (
    <button
      type="button"
      onClick={() => setExpandido((v) => !v)}
      aria-expanded={expandido}
      aria-controls="categorias-mobile"
      aria-label={expandido ? "Cerrar categorías" : "Ver todas las categorías"}
      className="shrink-0 w-8 h-8 mb-1 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:border-gray-400 transition-colors"
    >
      <svg
        className={`w-4 h-4 transition-transform duration-300 ${expandido ? "rotate-180" : ""}`}
        fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return (
    <div className="w-full lg:w-52 lg:shrink-0">
      {/* ── SIDEBAR desktop (≥ lg) ── */}
      <aside className="hidden lg:flex flex-col gap-1 self-start sticky top-24">

        {/* Búsqueda */}
        <form onSubmit={handleBuscar} className="mb-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
            />
          </div>
          <button type="submit" disabled={isPending}
            className="mt-2 w-full py-2 rounded-lg text-sm font-semibold bg-primary hover:bg-primary-dark text-white transition-colors disabled:opacity-50">
            {isPending ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {/* Título categorías */}
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-1 mb-2">
          Categorías
        </p>

        {/* Lista */}
        <button
          onClick={() => handleCategoria(null)}
          className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            !categoriaActivaId && !busquedaActual
              ? "bg-primary/10 text-primary border-l-2 border-primary font-semibold"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          Todos
          {!categoriaActivaId && !busquedaActual && totalElements > 0 && (
            <span className="ml-1 text-xs text-gray-400">({totalElements})</span>
          )}
        </button>

        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoria(cat)}
            className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoriaActivaId === cat.id
                ? "bg-primary/10 text-primary border-l-2 border-primary font-semibold"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {cat.nombre}
          </button>
        ))}

        {/* Limpiar filtro */}
        {hayFiltro && (
          <button
            onClick={() => { setBusqueda(""); handleCategoria(null); }}
            className="mt-3 text-xs text-gray-400 hover:text-primary transition-colors text-left px-3"
          >
            ✕ Limpiar filtro
          </button>
        )}
      </aside>

      {/* ── MOBILE fixed: búsqueda + chips pegados bajo el Navbar (< lg) ──
          Con la flecha, las categorías se despliegan hasta el final de la pantalla */}
      <div
        className={`lg:hidden fixed left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm px-4 py-2 flex flex-col gap-2 ${
          expandido ? "bottom-0" : ""
        }`}
        style={{ top: "64px" }}
      >

        {/* Búsqueda mobile */}
        <form onSubmit={handleBuscar} className="flex gap-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <button type="submit" disabled={isPending}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-900 hover:bg-gray-700 text-white transition-colors shrink-0 disabled:opacity-50">
            {isPending ? "..." : "Buscar"}
          </button>
        </form>

        {expandido ? (
          /* Todas las categorías a la vista; scroll vertical si no caben */
          <div id="categorias-mobile" className="flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between py-1">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Categorías <span className="font-semibold normal-case tracking-normal">({categorias.length})</span>
              </p>
              {botonFlecha}
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pt-1 pb-4">
              <div className="flex flex-wrap gap-2">{chips}</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Chips scrollables horizontalmente con el dedo */}
            <div
              ref={filaRef}
              className="flex-1 min-w-0 flex gap-2 overflow-x-auto pb-1"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                maskImage: "linear-gradient(to right, #000 85%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, #000 85%, transparent)",
              }}
            >
              {chips}
            </div>
            {botonFlecha}
          </div>
        )}
      </div>
    </div>
  );
}
