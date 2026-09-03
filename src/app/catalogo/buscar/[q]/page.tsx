import type { Metadata } from "next";
import { buscarProductos, getCategorias } from "@/lib/api";
import { urlBusqueda } from "@/lib/utils";
import type { Categoria } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCard from "@/components/ProductCard";
import CatalogoFiltros from "@/components/CatalogoFiltros";
import PaginacionControles from "@/components/PaginacionControles";

type SearchParams = { page?: string };
type Props = {
  params: Promise<{ q: string }>;
  searchParams: Promise<SearchParams>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { q } = await params;
  /* Restaura el término legible desde el slug (guiones → espacios) */
  const termino = q.replace(/-/g, " ");
  const titulo = `${termino} en Pasto — Búsqueda | CompuServicesSoft Nariño`;
  const descripcion = `Resultados de búsqueda para "${termino}" en Pasto, Nariño. Encuentra ${termino} y más componentes de computador en CompuServicesSoft. Tienda en CC San Agustín Local 224A, Pasto.`;
  const canonical = `https://compuservicessoft.com${urlBusqueda(termino)}`;

  return {
    title: titulo,
    description: descripcion,
    keywords: [
      termino,
      `${termino} Pasto`,
      `${termino} Nariño`,
      `comprar ${termino} Pasto`,
      `${termino} precio Pasto`,
      "CompuServicesSoft Pasto",
      "tienda tecnología Pasto",
    ],
    openGraph: {
      title: titulo,
      description: descripcion,
      url: canonical,
      type: "website",
    },
    alternates: { canonical },
  };
}

export default async function BuscarPage({ params, searchParams }: Props) {
  const { q } = await params;
  const sp = await searchParams;
  const page = sp.page ? Math.max(0, Number(sp.page) - 1) : 0;
  /* El mismo tamaño con el que pagina Zentivy: la mitad de páginas para ver lo mismo. */
  const PAGE_SIZE = 24;

  /* El slug puede tener guiones en lugar de espacios */
  const termino = q.replace(/-/g, " ");

  let categoriasData: Categoria[] = [];
  let productos: import("@/types").Producto[] = [];
  let totalPages = 0;
  let totalElements = 0;
  let errorMsg = "";

  try {
    [categoriasData, { content: productos, totalPages, totalElements }] =
      await Promise.all([
        getCategorias(),
        buscarProductos(termino, page, PAGE_SIZE),
      ]);
  } catch {
    errorMsg = "No se pudo conectar con el servidor. Intenta más tarde.";
  }

  const paginaActual = page + 1;
  const baseUrl = urlBusqueda(termino);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar tema="claro" />

      {/* Layout: sidebar + grid */}
      <div className="container-site px-4 sm:px-6 lg:px-8 pt-[172px] lg:pt-18 pb-20 flex-1">
        <div className="flex flex-col lg:flex-row gap-6 mt-4">
          <CatalogoFiltros
            categorias={categoriasData}
            categoriaActivaId={null}
            busquedaActual={termino}
            totalElements={totalElements}
          />

          <div className="flex-1 min-w-0">
            {/* Título SEO dentro del área de productos */}
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">
              Resultados para <span className="text-primary">"{termino}"</span>
              {totalElements > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  {totalElements} producto{totalElements !== 1 ? "s" : ""}
                </span>
              )}
            </h1>

            {errorMsg && (
              <div className="mb-6 p-5 rounded-xl border border-red-200 bg-red-50 text-center text-red-600 text-sm">
                {errorMsg}
              </div>
            )}

            {!errorMsg && productos.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-lg font-bold text-gray-800 mb-2">
                  Sin resultados
                </p>
                <p className="text-gray-500 text-sm">
                  No encontramos productos para "{termino}". Intenta con otro
                  término.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 min-[370px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {productos.map((p) => (
                  <ProductCard key={p.id} producto={p} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <PaginacionControles
                paginaActual={paginaActual}
                totalPages={totalPages}
                q={termino}
                categoriaId={null}
                baseUrl={baseUrl}
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
