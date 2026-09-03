import type { Metadata } from "next";
import { getCategorias, getProductosPorCategoria } from "@/lib/api";
import { slugify, urlCategoriaFiltro } from "@/lib/utils";
import { generateCategoryKeywords, getCategorySynonyms } from "@/lib/seo-keywords";
import type { Categoria } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCard from "@/components/ProductCard";
import CatalogoFiltros from "@/components/CatalogoFiltros";
import PaginacionControles from "@/components/PaginacionControles";

type SearchParams = { page?: string };
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
};

async function resolverCategoria(slug: string): Promise<Categoria | null> {
  try {
    const cats = await getCategorias();
    return cats.find((c) => slugify(c.nombre) === slug) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await resolverCategoria(slug);
  if (!cat) return { title: "Categoría | CompuServicesSoft" };

  const titulo = `${cat.nombre} en Pasto, Nariño | CompuServicesSoft`;
  const descripcion = `Compra ${cat.nombre} en Pasto, Nariño al mejor precio. Productos originales con garantía. Visita CompuServicesSoft en el CC San Agustín, Local 224A.`;
  const canonical = `https://compuservicessoft.com${urlCategoriaFiltro(cat.nombre)}`;
  const ogImage = "https://compuservicessoft.com/imagenes/local.webp";

  /* Generar keywords optimizadas con sinónimos */
  const keywords = generateCategoryKeywords(cat.nombre, slug);

  return {
    title: titulo,
    description: descripcion,
    keywords,
    openGraph: {
      title: titulo,
      description: descripcion,
      url: canonical,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${cat.nombre} en Pasto — CompuServicesSoft` }],
    },
    alternates: { canonical },
  };
}

export default async function CategoriaFiltroPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = sp.page ? Math.max(0, Number(sp.page) - 1) : 0;
  /* El mismo tamaño con el que pagina Zentivy: la mitad de páginas para ver lo mismo. */
  const PAGE_SIZE = 24;

  let categoriasData: Categoria[] = [];
  let categoriaActiva: Categoria | null = null;
  let productos: import("@/types").Producto[] = [];
  let totalPages = 0;
  let totalElements = 0;
  let errorMsg = "";

  try {
    categoriasData = await getCategorias();
    categoriaActiva = categoriasData.find((c) => slugify(c.nombre) === slug) ?? null;

    if (categoriaActiva) {
      const data = await getProductosPorCategoria(categoriaActiva.id, page, PAGE_SIZE);
      productos = data.content;
      totalPages = data.totalPages;
      totalElements = data.totalElements;
    }
  } catch {
    errorMsg = "No se pudo conectar con el servidor. Intenta más tarde.";
  }

  const paginaActual = page + 1;
  const baseUrl = categoriaActiva ? urlCategoriaFiltro(categoriaActiva.nombre) : undefined;

  /* Schema.org para la categoría - mejora SEO */
  const schemaCollectionPage = categoriaActiva ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoriaActiva.nombre} en Pasto`,
    "description": `Compra ${categoriaActiva.nombre} en Pasto, Nariño. ${totalElements} productos disponibles con garantía y envío.`,
    "url": `https://compuservicessoft.com${urlCategoriaFiltro(categoriaActiva.nombre)}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://compuservicessoft.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Catálogo",
          "item": "https://compuservicessoft.com/catalogo"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": categoriaActiva.nombre,
          "item": `https://compuservicessoft.com${urlCategoriaFiltro(categoriaActiva.nombre)}`
        }
      ]
    },
    "numberOfItems": totalElements,
    "provider": {
      "@type": "LocalBusiness",
      "name": "CompuServicesSoft",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "CC San Agustín Local 224A",
        "addressLocality": "Pasto",
        "addressRegion": "Nariño",
        "addressCountry": "CO"
      }
    }
  } : null;

  /* Obtener sinónimos para mostrar en el contenido */
  const synonyms = categoriaActiva ? getCategorySynonyms(slugify(categoriaActiva.nombre)) : [];

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Schema.org para SEO */}
      {schemaCollectionPage && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaCollectionPage) }}
        />
      )}

      <Navbar tema="claro" />

      {/* Layout: sidebar + grid */}
      <div className="container-site px-4 sm:px-6 lg:px-8 pt-[172px] lg:pt-18 pb-20 flex-1">
        <div className="flex flex-col lg:flex-row gap-6 mt-0 lg:mt-4">

          <CatalogoFiltros
            categorias={categoriasData}
            categoriaActivaId={categoriaActiva?.id ?? null}
            busquedaActual=""
            totalElements={totalElements}
          />

          <div className="flex-1 min-w-0">

            {/* Título SEO H1 - MUY importante para Google */}
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 text-center mt-0 lg:mt-4">
              {categoriaActiva ? `${categoriaActiva.nombre} en Pasto, Nariño` : "Catálogo de Productos"}
            </h1>

            {/* Descripción enriquecida con keywords - contenido que Google SÍ indexa */}
            {categoriaActiva && (
              <div className="mb-4 text-center">
                <p className="text-sm text-gray-600 max-w-3xl mx-auto">
                  {`Encuentra los mejores ${categoriaActiva.nombre.toLowerCase()} en Pasto. 
                  ${totalElements > 0 ? `${totalElements} producto${totalElements !== 1 ? "s" : ""} disponible${totalElements !== 1 ? "s" : ""}` : "Productos"} con garantía. 
                  ¡Envíos en Pasto y Nariño!`}
                </p>
                {/* Sinónimos ocultos para SEO - ayudan a la indexación semántica */}
                {synonyms.length > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    También conocido como: {synonyms.slice(0, 3).join(", ")}
                  </p>
                )}
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-5 rounded-xl border border-red-200 bg-red-50 text-center text-red-600 text-sm">
                {errorMsg}
              </div>
            )}

            {!errorMsg && productos.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-5xl mb-4">📦</p>
                <p className="text-lg font-bold text-gray-800 mb-2">Sin productos</p>
                <p className="text-gray-500 text-sm">
                  {categoriaActiva
                    ? "Esta categoría no tiene productos disponibles."
                    : "Categoría no encontrada."}
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
                q=""
                categoriaId={categoriaActiva?.id ?? null}
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
