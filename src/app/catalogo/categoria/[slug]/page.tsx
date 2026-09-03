import type { Metadata } from "next";
import { getCategorias, getProductosPorCategoria } from "@/lib/api";
import { slugify, urlCategoriaFiltro } from "@/lib/utils";
import { generateCategoryKeywords, getCategorySynonyms } from "@/lib/seo-keywords";
import { presentacionCategoria } from "@/lib/categorias";
import { urlProducto } from "@/lib/utils";
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

/* `null` significa "esta categoria no existe", nunca "la API fallo": si el
   timeout tambien devolviera `null`, Google recibiria una pagina de categoria
   vacia con 200 —un soft 404— cada vez que Zentivy tarde. Sin atrapar, Next
   responde 500 y el crawler vuelve mas tarde. */
async function resolverCategoria(slug: string): Promise<Categoria | null> {
  const cats = await getCategorias();
  return cats.find((c) => slugify(c.nombre) === slug) ?? null;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sp = await searchParams;
  const cat = await resolverCategoria(slug);
  if (!cat) return { title: "Categoría | CompuServicesSoft" };

  /* La página 2 se apunta a sí misma, no a la 1. Apuntarlas todas a la primera
     le dice a Google que las demás son duplicados y las descarta: los productos
     que solo aparecen de la página 2 en adelante se quedan sin ningún camino de
     rastreo hacia ellos, y con 24 por página eso es casi todo el catálogo. */
  const pagina = Number(sp.page) > 1 ? Number(sp.page) : 0;
  const sufijoPagina = pagina ? `?page=${pagina}` : "";

  /* El nombre de venta, no el de inventario: "Monitores" y no "MONITOR". Es lo
     que se ve en el resultado de Google y lo que la gente realmente escribe. */
  const { plural, intro } = presentacionCategoria(cat.nombre);

  const titulo = `${plural} en Pasto, Nariño${pagina ? ` — Página ${pagina}` : ""} | CompuServicesSoft`;
  /* La description sale del párrafo propio de la categoría, recortado a lo que
     Google alcanza a mostrar. Antes las 39 categorías compartían la misma frase,
     que es exactamente la señal de "contenido de plantilla". */
  const descripcion = intro.length > 158 ? `${intro.slice(0, 155).trimEnd()}…` : intro;
  const canonical = `https://www.compuservicessoft.com${urlCategoriaFiltro(cat.nombre)}${sufijoPagina}`;
  const ogImage = "https://www.compuservicessoft.com/imagenes/local.webp";

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

  /* Sin try/catch: devolver 200 con "no se pudo conectar" es un soft 404 —Google
     lo lee como pagina valida y vacia, y la deja de indexar—. Que la excepcion
     suba hace que Next responda 500, que es lo que el crawler entiende como
     "vuelve despues". */
  categoriasData = await getCategorias();
  categoriaActiva = categoriasData.find((c) => slugify(c.nombre) === slug) ?? null;

  if (categoriaActiva) {
    const data = await getProductosPorCategoria(categoriaActiva.id, page, PAGE_SIZE);
    productos = data.content;
    totalPages = data.totalPages;
    totalElements = data.totalElements;
  }

  const paginaActual = page + 1;
  const baseUrl = categoriaActiva ? urlCategoriaFiltro(categoriaActiva.nombre) : undefined;

  const presentacion = presentacionCategoria(categoriaActiva?.nombre ?? "");

  /* Schema.org para la categoría - mejora SEO */
  const schemaCollectionPage = categoriaActiva ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${presentacion.plural} en Pasto`,
    "description": presentacion.intro,
    "url": `https://www.compuservicessoft.com${urlCategoriaFiltro(categoriaActiva.nombre)}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://www.compuservicessoft.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Catálogo",
          "item": "https://www.compuservicessoft.com/catalogo"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": presentacion.plural,
          "item": `https://www.compuservicessoft.com${urlCategoriaFiltro(categoriaActiva.nombre)}`
        }
      ]
    },
    "numberOfItems": totalElements,
    /* El listado en sí, no solo la ficha de la página. Le dice a Google qué
       productos contiene esta colección y en qué orden, que es como los
       buscadores entienden una página de categoría de tienda. */
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": productos.length,
      "itemListElement": productos.map((prod, i) => ({
        "@type": "ListItem",
        /* La posición es global, no relativa a la página: en la página 2 el
           primer producto es el 25, no el 1. */
        "position": page * PAGE_SIZE + i + 1,
        "url": `https://www.compuservicessoft.com${urlProducto(prod.nombre, prod.categoria.nombre)}`,
        "name": prod.nombre,
      })),
    },
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

  /* Sinónimos para el texto de la página, sin los que repiten el nombre que ya
     usamos: la lista de "monitor" empieza por "monitores", y la frase quedaba
     "También encontrás monitores buscando monitores". */
  const synonyms = (categoriaActiva ? getCategorySynonyms(slugify(categoriaActiva.nombre)) : []).filter(
    (sin) => slugify(sin) !== slugify(presentacion.plural) && slugify(sin) !== slugify(presentacion.singular)
  );

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

          {/* Columna en flex para poder reordenar visualmente sin tocar el orden
              del DOM: en celular el párrafo de la categoría baja al final, después
              de los productos, y en escritorio vuelve a su lugar bajo el título.
              El orden del HTML —que es lo que lee el crawler— no cambia. */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* Título SEO H1 - MUY importante para Google */}
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 text-center mt-0 lg:mt-4">
              {categoriaActiva ? `${presentacion.plural} en Pasto, Nariño` : "Catálogo de Productos"}
            </h1>

            {/* Párrafo propio de la categoría. Antes las 39 compartían la misma
                plantilla —y decía "los mejores monitor", en singular, porque
                salía del nombre crudo de Zentivy—. Un texto repetido 39 veces es
                justo lo que Google marca como contenido de plantilla y deja sin
                indexar. */}
            {categoriaActiva && (
              /* `order-last` solo en celular: los productos van primero, que es a
                 lo que viene el visitante desde el teléfono. NO se oculta con
                 `hidden`, y la diferencia importa: Google indexa con el Googlebot
                 de smartphone, así que lo que no está en la versión móvil es
                 contenido que no cuenta. Su documentación pide que el móvil tenga
                 el mismo contenido que el escritorio; moverlo cumple, esconderlo
                 no. */
              <div className="order-last lg:order-none mt-10 pt-6 border-t border-gray-100 lg:mt-0 lg:pt-0 lg:border-t-0 lg:mb-5 max-w-3xl mx-auto">
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {presentacion.intro}
                </p>
                {/* Los sinónimos, en la misma tipografía que el resto: son
                    términos por los que la gente busca de verdad, así que van
                    como texto para el lector y no como letra chica gris. */}
                {synonyms.length > 0 && (
                  <p className="text-sm text-gray-500 leading-relaxed text-center mt-2">
                    {`También encontrás ${presentacion.plural.toLowerCase()} buscando `}
                    {synonyms.slice(0, 3).join(", ")}
                    {totalElements > 0
                      ? `. Hoy hay ${totalElements} producto${totalElements !== 1 ? "s" : ""} disponible${totalElements !== 1 ? "s" : ""} con garantía.`
                      : "."}
                  </p>
                )}
              </div>
            )}

            {productos.length === 0 ? (
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
