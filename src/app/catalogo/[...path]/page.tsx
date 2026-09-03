import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ImagenProducto from "@/components/ImagenProducto";
import Link from "next/link";
import {
  getCategorias,
  getProductosPorCategoria,
  getTodosPorCategoria,
  miniatura,
  resolverImagen,
} from "@/lib/api";
import { slugify, urlProducto, urlCategoria } from "@/lib/utils";
import { generateProductKeywords } from "@/lib/seo-keywords";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductCard from "@/components/ProductCard";
import WhatsAppSelector from "@/components/WhatsAppSelector";
import ProductoNoDisponible from "@/components/ProductoNoDisponible";
import type { Producto, Categoria } from "@/types";

type Props = { params: Promise<{ path: string[] }> };

function formatPrecio(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}

/* Busca la categoría por slug.
   No atrapa los fallos de la API a proposito: `null` tiene que significar "no
   existe" y nada mas. Si un timeout de Zentivy tambien devolviera `null`, un
   corte de treinta segundos le serviria a Googlebot un `noindex` sobre paginas
   que existen —y ese noindex se queda—. Dejando pasar la excepcion, Next
   responde 500 y Google reintenta, que es lo correcto ante un fallo temporal. */
async function resolverCategoria(catSlug: string): Promise<Categoria | null> {
  const categorias = await getCategorias();
  return categorias.find((c) => slugify(c.nombre) === catSlug) ?? null;
}

/* Busca el producto por slug dentro de la categoría */
async function resolverProducto(
  catSlug: string,
  prodSlug: string
): Promise<{ producto: Producto; categoria: Categoria } | null> {
  const categoria = await resolverCategoria(catSlug);
  if (!categoria) return null;

  /* Todas las páginas de la categoría: el servidor no entrega más de 48 por llamada, y
     un producto en el puesto 49 quedaría con su ficha en 404 sin que nada lo avise. */
  const productos = await getTodosPorCategoria(categoria.id);
  const producto = productos.find((p) => slugify(p.nombre) === prodSlug);
  if (!producto) return null;
  return { producto, categoria };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;

  /* Solo manejamos el caso de 2 segmentos: [categoria, slug-producto] */
  if (path.length !== 2) return { title: "CompuServicesSoft" };

  const [catSlug, prodSlug] = path;
  const resultado = await resolverProducto(catSlug, prodSlug);
  if (!resultado) {
    /* Producto que ya no está en el catálogo. Aquí el noindex sí corresponde: la
       URL sigue viva mostrando alternativas, pero no queremos que Google indexe
       una ficha sin producto. Llegar hasta acá significa que la API respondió
       bien y el producto no estaba —un fallo de red habría lanzado antes—. */
    return {
      title: "Producto no disponible | CompuServicesSoft",
      robots: { index: false, follow: true },
    };
  }

  const { producto } = resultado;
  const titulo = `${producto.nombre} — ${producto.categoria.nombre} en Pasto | CompuServicesSoft`;
  const descripcion = `Compra ${producto.nombre} en Pasto, Nariño al mejor precio. ${producto.descripcion ?? ""} Disponible en CompuServicesSoft, CC San Agustín Local 224A. ¡Pregunta por WhatsApp!`.trim();
  const imagen = resolverImagen(producto.imagen);
  const canonicalUrl = `https://www.compuservicessoft.com${urlProducto(producto.nombre, producto.categoria.nombre)}`;

  /* Generar keywords optimizadas con sinónimos */
  const keywords = generateProductKeywords(
    producto.nombre,
    producto.categoria.nombre,
    catSlug
  );

  return {
    title: titulo,
    description: descripcion,
    keywords,
    openGraph: {
      title: titulo,
      description: descripcion,
      url: canonicalUrl,
      type: "website",
      images: [{ url: imagen, width: 800, height: 800, alt: `${producto.nombre} — CompuServicesSoft Pasto` }],
    },
    alternates: { canonical: canonicalUrl },
  };
}

/* Google necesita `priceValidUntil` en el futuro: si la fecha ya paso, deja de
   mostrar el precio en el resultado de busqueda. Se redondea al primer dia de un
   mes ~3 meses adelante en vez de calcular "ahora + 90 dias" por dos motivos: el
   valor no cambia entre renders —`Date.now()` dentro del componente es impuro y
   lo marca react-hooks/purity— y el HTML que guarda ISR queda identico durante
   todo el mes en lugar de variar en cada regeneracion. Nunca queda a menos de
   ~60 dias de distancia. */
function precioValidoHasta(): string {
  const ahora = new Date();
  /* Date.UTC normaliza el desborde de mes: mes 13 pasa a enero del ano siguiente. */
  const hasta = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth() + 3, 1));
  return hasta.toISOString().split("T")[0];
}

export default async function CatalogoPathPage({ params }: Props) {
  const { path } = await params;

  /* Solo manejamos 2 segmentos: /catalogo/[categoria]/[slug-producto] */
  if (path.length !== 2) notFound();

  const [catSlug, prodSlug] = path;
  const resultado = await resolverProducto(catSlug, prodSlug);

  /* Si el producto no existe, mostrar página de "no disponible" en la misma URL.
     Esto mantiene la URL activa en Google, evita problemas de SEO por redirecciones,
     y permite que cuando el producto se reactive, Google lo reindexe rápidamente
     sin perder el historial de indexación. */
  if (!resultado) {
    const categoria = await resolverCategoria(catSlug);
    if (!categoria) {
      /* La categoría tampoco existe, redirigir al catálogo general */
      notFound();
    }

    /* Obtener productos relacionados de la categoría para mostrar alternativas */
    let productosRelacionados: Producto[] = [];
    try {
      const data = await getProductosPorCategoria(categoria.id, 0, 8);
      productosRelacionados = data.content.slice(0, 8);
    } catch {
      productosRelacionados = [];
    }

    /* Renderizar página de producto no disponible en la MISMA URL */
    return (
      <main className="min-h-screen bg-white flex flex-col">
        <Navbar tema="claro" />

        {/* Breadcrumb */}
        <div className="pt-20 pb-0 px-4 sm:px-6 lg:px-8 container-site border-b border-gray-100">
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 py-3 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
            <span>/</span>
            <Link href={urlCategoria(categoria.nombre)} className="hover:text-primary transition-colors">
              {categoria.nombre}
            </Link>
            <span>/</span>
            <span className="text-gray-600">Producto no disponible</span>
          </nav>
        </div>

        <ProductoNoDisponible
          nombreProducto={prodSlug.replace(/-/g, ' ').toUpperCase()}
          nombreCategoria={categoria.nombre}
          slugCategoria={catSlug}
          productosRelacionados={productosRelacionados}
        />

        <Footer />
        <WhatsAppFloat />
      </main>
    );
  }

  const { producto } = resultado;

  const imagenSrc = miniatura(producto.imagen, 900);
  const urlCat = urlCategoria(producto.categoria.nombre);

  let relacionados: Producto[] = [];
  try {
    const data = await getProductosPorCategoria(producto.categoria.id, 0, 5);
    relacionados = data.content.filter((p) => p.id !== producto.id).slice(0, 4);
  } catch {
    relacionados = [];
  }

  const msgWsp = `Hola, vengo de la página CompuServicesSoft. Me interesa: ${producto.nombre}. ¿Está disponible?`;

  /* Schema.org Product mejorado para Google - Lo que SÍ ayuda al SEO */
  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion || `${producto.nombre} disponible en CompuServicesSoft Pasto`,
    image: imagenSrc,
    brand: {
      "@type": "Brand",
      name: "CompuServicesSoft",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.compuservicessoft.com${urlProducto(producto.nombre, producto.categoria.nombre)}`,
      priceCurrency: "COP",
      price: String(producto.precioVendido),   // string evita que Google asuma USD
      availability: "https://schema.org/InStock",   // el catálogo solo publica productos disponibles
      seller: {
        "@type": "LocalBusiness",
        name: "CompuServicesSoft",
        telephone: "+573242264795",
        address: {
          "@type": "PostalAddress",
          streetAddress: "CC San Agustín Local 224A",
          addressLocality: "Pasto",
          addressRegion: "Nariño",
          addressCountry: "CO",
        },
      },
      priceValidUntil: precioValidoHasta(),
      itemCondition: "https://schema.org/NewCondition",
    },
    category: producto.categoria.nombre,
    "sku": `COMPUSERV-${producto.id}`,
  };

  /* Schema.org BreadcrumbList para mejorar navegación en Google */
  const schemaBreadcrumb = {
    "@context": "https://schema.org",
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
        "name": producto.categoria.nombre,
        "item": `https://www.compuservicessoft.com${urlCat}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": producto.nombre,
        "item": `https://www.compuservicessoft.com${urlProducto(producto.nombre, producto.categoria.nombre)}`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Schema.org para Google - Lo que SÍ mejora el SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />
      <Navbar tema="claro" />

      {/* Breadcrumb */}
      <div className="pt-20 pb-0 px-4 sm:px-6 lg:px-8 container-site border-b border-gray-100">
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-gray-400 py-3 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <Link href={urlCat} className="hover:text-primary transition-colors">
            {producto.categoria.nombre}
          </Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-[200px]">{producto.nombre}</span>
        </nav>
      </div>

      {/* Detalle */}
      <section className="px-4 sm:px-6 lg:px-8 py-2 container-site flex-1">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Imagen */}
          <div className="rounded-2xl overflow-hidden relative aspect-square bg-gray-50 border border-gray-200">
            <ImagenProducto
              src={imagenSrc}
              alt={`${producto.nombre} — ${producto.categoria.nombre} en Pasto, Nariño`}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              loading="eager"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <Link href={urlCat}
              className="inline-flex w-fit items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors">
              ← {producto.categoria.nombre}
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {producto.nombre}
            </h1>

            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-dark">
                {formatPrecio(producto.precioVendido)}
              </span>
              <span className="text-sm text-gray-400 mb-1">COP</span>
            </div>

            {/* El catálogo solo publica productos disponibles; el número de unidades
                no se muestra —es información del negocio, no del cliente—. */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-600">Disponible</span>
            </div>

            {producto.descripcion && (
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Descripción</p>
                <p className="text-gray-700 leading-relaxed text-sm">{producto.descripcion}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Categoría", value: producto.categoria.nombre },
                producto.marca ? { label: "Marca", value: producto.marca } : null,
                producto.modelo ? { label: "Modelo", value: producto.modelo } : null,
                producto.especificacion ? { label: "Presentación", value: producto.especificacion } : null,
                producto.garantia ? { label: "Garantía", value: `${producto.garantia} meses` } : null,
                { label: "Ubicación", value: "Pasto, Nariño" },
                { label: "Horario", value: "10am – 7pm" },
              ].filter((x): x is { label: string; value: string } => x !== null).map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>

            {producto.garantia ? (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-100">
                <span className="text-xl">🛡️</span>
                <div>
                  <p className="text-xs font-bold text-green-700 mb-1">Garantía</p>
                  <p className="text-xs text-green-600">
                    {producto.garantia} {producto.garantia === 1 ? "mes" : "meses"} de garantía por defectos de fábrica.
                  </p>
                </div>
              </div>
            ) : null}

            <WhatsAppSelector
              mensaje={msgWsp}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold w-full bg-whatsapp hover:bg-whatsapp-hover text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Preguntar por WhatsApp
            </WhatsAppSelector>

            <a
              href="https://maps.app.goo.gl/e3nUAFL7zDNTMF9i7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mt-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ir a Comprar en Tienda
            </a>

            <p className="text-xs text-gray-400">
              📍 CC San Agustín, Local 224A — Pasto, Nariño &nbsp;·&nbsp; 🕙 10am – 7pm
            </p>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      {relacionados.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-20 container-site">
          <div className="border-t border-gray-100 pt-10">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Más en <span className="text-primary">{producto.categoria.nombre}</span>
            </h2>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 gap-4">
              {relacionados.map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
