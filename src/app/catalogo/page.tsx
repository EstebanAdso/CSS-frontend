import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  getProductos,
  getCategorias,
} from "@/lib/api";
import type { Categoria } from "@/types";
import { urlBusqueda, urlCategoriaFiltro } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCard from "@/components/ProductCard";
import CatalogoFiltros from "@/components/CatalogoFiltros";
import PaginacionControles from "@/components/PaginacionControles";
import DescargaCatalogo from "@/components/DescargaCatalogo";

type SearchParams = {
  q?: string;
  categoriaId?: string;
  page?: string;
};

/* SEO dinámico según filtros activos */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q ?? "";
  const categoriaId = params.categoriaId ? Number(params.categoriaId) : null;

  /* La página 2 se apunta a sí misma. Canonicalizar todas a `/catalogo` le dice a
     Google que de la 2 en adelante son duplicados y las descarta, y con 24
     productos por página eso deja sin ruta de rastreo a casi todo el listado.
     El mismo criterio que en /catalogo/categoria/[slug]. */
  const pagina = Number(params.page) > 1 ? Number(params.page) : 0;
  const sufijoPagina = pagina ? `?page=${pagina}` : "";

  let titulo = `Catálogo de Productos${pagina ? ` — Página ${pagina}` : ""} | CompuServicesSoft Pasto`;
  let descripcion =
    "Explora nuestro catálogo de componentes de computador en Pasto, Nariño. SSD, RAM, GPU, monitores, procesadores y más. Envíos y atención en el CC San Agustín.";

  /* Por defecto, el listado paginado. El filtro por categoría lo reescribe abajo. */
  let canonical = `https://www.compuservicessoft.com/catalogo${sufijoPagina}`;

  if (q) {
    titulo = `"${q}" — Catálogo CompuServicesSoft Pasto`;
    descripcion = `Resultados para "${q}" en CompuServicesSoft. Componentes de cómputo en Pasto, Nariño, Colombia.`;
  } else if (categoriaId) {
    try {
      const categorias = await getCategorias();
      const cat = categorias.find((c) => c.id === categoriaId);
      if (cat) {
        titulo = `${cat.nombre} en Pasto | CompuServicesSoft`;
        descripcion = `Compra ${cat.nombre} en Pasto, Nariño. Productos de calidad con garantía en CompuServicesSoft.`;
        /* `/catalogo?categoriaId=7` muestra exactamente lo mismo que
           `/catalogo/categoria/ssd`, que es la URL legible y la que está en el
           sitemap. Se apunta ahí en vez de a `/catalogo`: consolidar en la página
           equivalente conserva la señal, mandarla al listado general la tira. */
        canonical = `https://www.compuservicessoft.com${urlCategoriaFiltro(cat.nombre)}`;
      }
    } catch {
      /* Si falla, usa el título genérico */
    }
  }

  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
      url: canonical,
      type: "website",
    },
    alternates: { canonical },
  };
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = params.q ?? "";
  const categoriaId = params.categoriaId ? Number(params.categoriaId) : null;
  const page = params.page ? Math.max(0, Number(params.page) - 1) : 0;
  /* El mismo tamaño con el que pagina Zentivy: la mitad de páginas para ver lo mismo. */
  const PAGE_SIZE = 24;

  /* Redirect legacy: ?q= → /catalogo/buscar/[slug] */
  if (q) redirect(urlBusqueda(q));

  /* Redirect legacy: ?categoriaId= → /catalogo/categoria/[slug] */
  if (categoriaId) {
    try {
      const cats = await getCategorias();
      const cat = cats.find((c) => c.id === categoriaId);
      if (cat) redirect(urlCategoriaFiltro(cat.nombre));
    } catch { /* si falla la API, continúa mostrando el catálogo general */ }
  }

  let categoriasData: Categoria[] = [];
  let productosData;
  let errorMsg = "";

  try {
    [categoriasData, productosData] = await Promise.all([
      getCategorias(),
      getProductos(page, PAGE_SIZE),
    ]);
  } catch {
    errorMsg = "No se pudo conectar con el servidor. Intenta más tarde.";
    categoriasData = [];
    productosData = {
      content: [],
      totalPages: 0,
      totalElements: 0,
      number: 0,
    };
  }

  const productos = productosData?.content ?? [];
  const totalPages = productosData?.totalPages ?? 0;
  const totalElements = productosData?.totalElements ?? 0;
  const paginaActual = page + 1;

  /* Categoría activa para mostrar en el encabezado */
  const categoriaActiva = categoriaId
    ? categoriasData.find((c) => c.id === categoriaId) ?? null
    : null;

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar tema="claro" />

      {/* Layout principal: sidebar + contenido */}
      <div className="container-site px-4 sm:px-6 lg:px-8 pt-[140px] lg:pt-18 pb-20 flex-1">
        {/* En mobile: columna (filtros arriba, grid abajo). En desktop: fila (sidebar izq, grid der) */}
        <div className="flex flex-col lg:flex-row gap-6 mt-4">

          {/* Sidebar/filtros — internamente maneja mobile (chips) y desktop (sidebar) */}
          <CatalogoFiltros
            categorias={categoriasData}
            categoriaActivaId={categoriaId}
            busquedaActual={q}
            totalElements={totalElements}
          />

          {/* Área principal */}
          <div className="flex-1 min-w-0">

            {/* Título SEO + botón descarga */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                {q
                  ? <><span className="text-primary">"{q}"</span> — resultados</>
                  : categoriaActiva
                  ? categoriaActiva.nombre
                  : "Catálogo de Productos"}
                {totalElements > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">{totalElements} producto{totalElements !== 1 ? "s" : ""}</span>
                )}
              </h1>
              <DescargaCatalogo />
            </div>

            {/* Error de conexión */}
            {errorMsg && (
              <div className="mb-6 p-5 rounded-xl border border-red-200 bg-red-50 text-center text-red-600 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Grid de productos */}
            {!errorMsg && productos.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-lg font-bold text-gray-800 mb-2">Sin resultados</p>
                <p className="text-gray-500 text-sm">
                  No encontramos productos. Intenta con otro término o categoría.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 min-[370px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {productos.map((producto) => (
                  <ProductCard key={producto.id} producto={producto} />
                ))}
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <PaginacionControles
                paginaActual={paginaActual}
                totalPages={totalPages}
                q={q}
                categoriaId={categoriaId}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
