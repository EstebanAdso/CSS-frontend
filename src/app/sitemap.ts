import type { MetadataRoute } from "next";
import { getCategorias, getTodosLosProductos } from "@/lib/api";
import { urlProducto, urlCategoria } from "@/lib/utils";

const BASE = "https://www.compuservicessoft.com";

// El sitemap se regenera cada 12 horas. El mismo número se le pasa a las
// llamadas de abajo: Next se queda con el `revalidate` más corto entre el de la
// ruta y el de sus fetch, así que sin eso el sitemap se regeneraba cada 2
// minutos —y con él, cualquier fecha que dependiera del momento de generación—.
export const revalidate = 43200;

// Los productos no llevan `lastModified`. El catálogo público de Zentivy no
// expone fecha de modificación (ver el tipo `Producto`), así que no hay ningún
// dato real que poner ahí.
//
// Antes se generaba una fecha "estable por id" con `ahora - (id*17+11)%60` días.
// No era estable: `ahora` avanza en cada regeneración, así que las 380 fechas se
// corrían 12 horas hacia adelante cada 12 horas. Google lo veía como un catálogo
// entero modificándose sin parar, y su documentación es explícita: si el lastmod
// no es verificable deja de creerlo —para todo el sitio, no solo para esas URLs—.
// Omitirlo es lo que Google recomienda cuando no se conoce la fecha real:
// https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /* Ninguna entrada lleva `lastModified`. Antes las estáticas usaban
     `new Date()`, que es el instante de regeneración y no la fecha en que la
     página cambió de verdad: Google recibía "la home se modificó hace dos
     minutos" en cada consulta. Es el mismo error que la fecha inventada de los
     productos, y la respuesta de Google es la misma —dejar de creerle al
     lastmod de todo el sitio—. Sin fecha real que poner, el sitemap queda como
     lo que es: una lista de descubrimiento. */
  const estaticas: MetadataRoute.Sitemap = [
    { url: BASE,                              priority: 1.0 },
    { url: `${BASE}/desarrollo-web`,          priority: 0.9 },
    { url: `${BASE}/catalogo`,                priority: 0.9 },
    { url: `${BASE}/armar-pc-gamer`,          priority: 0.8 },
    { url: `${BASE}/desarrollo-web/diseno-web-personalizado`,       priority: 0.8 },
    { url: `${BASE}/desarrollo-web/seo-posicionamiento-web-pasto`,  priority: 0.8 },
    { url: `${BASE}/desarrollo-web/tienda-online-ecommerce`,        priority: 0.8 },
    { url: `${BASE}/desarrollo-web/landing-page`,                   priority: 0.8 },
    { url: `${BASE}/desarrollo-web/software-a-la-medida`,           priority: 0.8 },
    { url: `${BASE}/politicas`,               priority: 0.4 },
  ];

  /* Categorías y productos.
     Sin try/catch a propósito. Antes, si Zentivy fallaba, el sitemap se publicaba
     igual con solo las 10 URLs estáticas: Google leía que el catálogo entero
     desapareció del sitemap, que es peor señal que no recibir sitemap. Dejando
     subir la excepción, la regeneración falla y el ISR de Next sigue sirviendo la
     última versión buena hasta que la API vuelva. */
  const [categorias, productos] = await Promise.all([
    getCategorias(revalidate),
    getTodosLosProductos(revalidate),
  ]);

  const paginasCategorias: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${BASE}${urlCategoria(cat.nombre)}`,
    priority: 0.8,
  }));

  const paginasProductos: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${BASE}${urlProducto(p.nombre, p.categoria.nombre)}`,
    priority: 0.7,
  }));

  return [...estaticas, ...paginasCategorias, ...paginasProductos];
}
