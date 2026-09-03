import type { Categoria, Producto, PaginatedResponse, Catalogo } from "@/types";

/* ─────────────────────────────────────────────────────────────────────────────
   Los datos del catálogo vienen del catálogo público de Zentivy, no de la base
   MySQL propia. El inventario ya se administra en Zentivy (productos, precios,
   fotos, categorías), así que mantener una segunda base era mantener dos
   verdades: cada cambio de precio había que hacerlo dos veces y la web quedaba
   vieja sin que nadie se enterara.

   Contrato (solo lectura, sin autenticación):
     GET /publico/catalogo/{slug}            → cabecera + categorías publicables
     GET /publico/catalogo/{slug}/productos  → página de productos (categoriaId, q, page, size)

   Lo que ese endpoint NO entrega, a propósito: costo de compra, precio
   mayorista, proveedor y EXISTENCIAS. Publicar el nivel de inventario le regala
   a la competencia el pulso del negocio, así que la web ya no muestra "N en
   stock" — y no hace falta: el catálogo solo lista productos activos, o sea con
   existencias (o de disponibilidad continua).

   Todas las consultas salen del SERVIDOR de Next (RSC + revalidate), así que no
   hay CORS que configurar ni llaves que exponer.
   ───────────────────────────────────────────────────────────────────────────── */

/** Host de la API de Zentivy. En local, el backend en el puerto 8083. */
const ZENTIVY_API = (
  process.env.NEXT_PUBLIC_ZENTIVY_API ?? "http://localhost:8083"
).replace(/\/+$/, "");

/** Identificador del negocio dentro de Zentivy (el de zentivy.com/catalogo/<slug>). */
const SLUG = process.env.NEXT_PUBLIC_ZENTIVY_SLUG ?? "compuservicessoft";

const CATALOGO = `${ZENTIVY_API}/publico/catalogo/${SLUG}`;

/* Cuánto vale cada respuesta en caché. La cabecera cambia casi nunca; los
   productos, cuando el negocio ajusta precios o sube fotos. */
const TTL_CABECERA = 600;
const TTL_PRODUCTOS = 120;

/**
 * Tope de página del servidor. Zentivy recorta el `size` a 48
 * (`CatalogoPublicoService.TAMANO_MAX`) porque el endpoint es público y nadie debe poder
 * pedir el catálogo entero en una llamada. Pedir 500 no da error: devuelve 48 —y eso es
 * peor que un error, porque la página se ve bien con los primeros y pierde el resto en
 * silencio—. Por eso lo que necesita "todo" pagina con `paginarTodo`.
 */
const TAMANO_MAX = 48;

/**
 * Productos por página. El mismo que trae Zentivy por defecto
 * (`CatalogoPublicoService.TAMANO_DEFECTO`): con 12 se pedía el doble de páginas para ver
 * lo mismo, y cada página es una llamada de red que el visitante espera.
 */
const TAMANO_PAGINA = 24;

/* ─── Forma cruda de la API (lo que manda Zentivy) ───────────────────────── */

type ProductoZentivy = {
  id: number;
  nombre: string;
  marca: string | null;
  modelo: string | null;
  descripcion: string | null;
  especificacion: string | null;
  garantia: number | null;
  precio: number;
  imagenUrl: string | null;
  /** Solo el NOMBRE de la categoría; el id se resuelve con la cabecera. */
  categoria: string | null;
};

type CatalogoZentivy = {
  nombre: string | null;
  logoUrl: string | null;
  ciudad: string | null;
  departamento: string | null;
  telefono: string | null;
  horarioAtencion: string | null;
  sitioWeb: string | null;
  categorias: { id: number; nombre: string }[];
};

/* ─── Imágenes ───────────────────────────────────────────────────────────── */

/**
 * Foto que se usa cuando el producto no trae ninguna. Tiene que ser un archivo
 * que exista de verdad: esta ruta termina en la etiqueta `og:image` y en el
 * JSON-LD del producto, y ahi un 404 es una tarjeta de WhatsApp o de Google en
 * blanco. Antes apuntaba a `/imagenes/placeholder.png`, que nunca se subio a
 * `public/` — de ahi el icono de imagen rota.
 *
 * En pantalla no se muestra: `ImagenProducto` reconoce esta ruta y pinta su
 * propio marcador de "sin imagen" en su lugar.
 */
export const SIN_FOTO = "/imagenes/local.webp";

/**
 * Ruta de imagen lista para usar. Las fotos de Zentivy llegan como URL absoluta
 * de Cloudinary; se dejan pasar tal cual. Se conserva el manejo de rutas
 * relativas por si queda alguna imagen local en `public/`.
 */
export function resolverImagen(ruta: string | null | undefined): string {
  if (!ruta) return SIN_FOTO;
  if (/^https?:\/\//i.test(ruta)) return ruta;
  return `/${ruta.replace(/^(\.\.\/)+/, "").replace(/^\/+/, "")}`;
}

/**
 * Miniatura de Cloudinary del tamaño que se va a mostrar. Sin esto el navegador
 * baja el original —que puede pesar cientos de KB— para pintarlo en una tarjeta
 * de 300px, y una página de catálogo trae doce. Lo que no es de Cloudinary se
 * devuelve intacto.
 */
export function miniatura(ruta: string | null | undefined, ancho = 400): string {
  const url = resolverImagen(ruta);
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/c_limit,w_${ancho},q_auto,f_auto/`);
}

/* ─── Cabecera y categorías ──────────────────────────────────────────────── */

async function pedirCabecera(): Promise<CatalogoZentivy> {
  const res = await fetch(CATALOGO, { next: { revalidate: TTL_CABECERA } });
  if (!res.ok) throw new Error(`Catálogo no disponible (${res.status})`);
  return res.json();
}

/** Cabecera del negocio: nombre, logo, ciudad, teléfono, horario y categorías. */
export async function getCatalogo(): Promise<Catalogo> {
  const c = await pedirCabecera();
  return {
    nombre: c.nombre ?? "",
    logoUrl: c.logoUrl ?? null,
    ciudad: c.ciudad ?? null,
    departamento: c.departamento ?? null,
    telefono: c.telefono ?? null,
    horarioAtencion: c.horarioAtencion ?? null,
    sitioWeb: c.sitioWeb ?? null,
    categorias: c.categorias ?? [],
  };
}

/**
 * Categorías publicables. Zentivy las entrega dentro de la cabecera —son las que
 * tienen al menos un producto visible—, así que no hay una consulta aparte.
 */
export async function getCategorias(): Promise<Categoria[]> {
  const { categorias } = await getCatalogo();
  return categorias.map((c) => ({ id: c.id, nombre: c.nombre }));
}

/** Sin tildes, en minúsculas y sin espacios de más: para comparar nombres escritos a mano. */
const canonico = (t: string) =>
  t.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();

/**
 * Busca una categoría por NOMBRE, aceptando sinónimos, y devuelve `null` si no está.
 *
 * <p>Existe porque las páginas armadas a mano (el armador de PC) apuntaban a ids de la base
 * MySQL vieja —`procesador: 20`, `ram: 4`…— y esos ids no son los de Zentivy: la página habría
 * quedado con las listas vacías sin dar ningún error. Por nombre sí sobrevive a la migración,
 * y también a que el negocio renombre o recree una categoría.
 *
 * <p>Primero busca el nombre exacto (canónico) y después uno que lo contenga, para que
 * «procesador» encuentre «PROCESADORES».
 */
export async function buscarCategoria(...nombres: string[]): Promise<Categoria | null> {
  const cats = await getCategorias();
  for (const nombre of nombres) {
    const objetivo = canonico(nombre);
    const exacta = cats.find((c) => canonico(c.nombre) === objetivo);
    if (exacta) return exacta;
    const parecida = cats.find((c) => canonico(c.nombre).includes(objetivo));
    if (parecida) return parecida;
  }
  return null;
}

export async function getCategoriaPorId(id: number): Promise<Categoria> {
  const cats = await getCategorias();
  const cat = cats.find((c) => c.id === id);
  if (!cat) throw new Error(`Categoría ${id} no encontrada`);
  return cat;
}

/* ─── Productos ──────────────────────────────────────────────────────────── */

/**
 * El producto que espera la web. La categoría llega como nombre y aquí se
 * completa con su id usando la cabecera: las páginas construyen URLs y buscan
 * relacionados con `categoria.id`, y cambiar eso obligaría a tocar cada vista.
 */
function aProducto(p: ProductoZentivy, porNombre: Map<string, number>): Producto {
  const nombreCat = p.categoria ?? "Sin categoría";
  return {
    id: p.id,
    nombre: p.nombre,
    precioVendido: Number(p.precio ?? 0),
    imagen: p.imagenUrl ?? "",
    descripcion: p.descripcion ?? "",
    marca: p.marca ?? null,
    modelo: p.modelo ?? null,
    especificacion: p.especificacion ?? null,
    garantia: p.garantia ?? null,
    categoria: { id: porNombre.get(nombreCat.toLowerCase()) ?? 0, nombre: nombreCat },
  };
}

/* `ttl` deja que quien llama alargue la cache de esta consulta. Next se queda con
   el revalidate MAS CORTO entre el de la ruta y el de sus fetch, asi que sin esto
   una ruta que pide una hora igual se regenera cada dos minutos. */
type Filtros = { categoriaId?: number; q?: string; page?: number; size?: number; ttl?: number };

async function pedirProductos({
  categoriaId,
  q,
  page = 0,
  size = TAMANO_PAGINA,
  ttl = TTL_PRODUCTOS,
}: Filtros): Promise<PaginatedResponse<Producto>> {
  /* Recortado igual que en el servidor: así el `size` que se pide es el que se recibe y
     nadie cree haber traído 100 productos cuando le llegaron 48. */
  const params = new URLSearchParams({
    page: String(Math.max(page, 0)),
    size: String(Math.min(Math.max(size, 1), TAMANO_MAX)),
  });
  if (categoriaId) params.set("categoriaId", String(categoriaId));
  if (q) params.set("q", q);

  /* La cabecera se pide en paralelo: hace falta para ponerle id a la categoría
     de cada producto, y su caché es larga (casi siempre no cuesta una llamada). */
  const [res, cabecera] = await Promise.all([
    fetch(`${CATALOGO}/productos?${params}`, { next: { revalidate: ttl } }),
    getCatalogo(),
  ]);
  if (!res.ok) throw new Error(`Error al obtener productos (${res.status})`);

  const data = (await res.json()) as PaginatedResponse<ProductoZentivy>;
  const porNombre = new Map(cabecera.categorias.map((c) => [c.nombre.toLowerCase(), c.id]));
  return { ...data, content: (data.content ?? []).map((p) => aProducto(p, porNombre)) };
}

export function getProductos(page = 0, size = TAMANO_PAGINA): Promise<PaginatedResponse<Producto>> {
  return pedirProductos({ page, size });
}

export function buscarProductos(q: string, page = 0, size = TAMANO_PAGINA): Promise<PaginatedResponse<Producto>> {
  return pedirProductos({ q, page, size });
}

export function getProductosPorCategoria(
  categoriaId: number,
  page = 0,
  size = TAMANO_PAGINA
): Promise<PaginatedResponse<Producto>> {
  return pedirProductos({ categoriaId, page, size });
}

/**
 * Recorre todas las páginas de un filtro. El `totalPages` sale de la respuesta, no de una
 * cuenta propia, para que siga funcionando si el servidor cambia su tope.
 */
async function paginarTodo(filtros: Omit<Filtros, "page" | "size">): Promise<Producto[]> {
  const TOPE_PAGINAS = 200; // ~9.600 productos: freno ante una respuesta rara, no un límite real
  const primera = await pedirProductos({ ...filtros, page: 0, size: TAMANO_MAX });
  const todos = [...primera.content];

  const paginas = Math.min(primera.totalPages ?? 1, TOPE_PAGINAS);
  for (let page = 1; page < paginas; page += 1) {
    const siguiente = await pedirProductos({ ...filtros, page, size: TAMANO_MAX });
    if (siguiente.content.length === 0) break;
    todos.push(...siguiente.content);
  }
  return todos;
}

/**
 * Todos los productos publicables (catálogo PDF, sitemap, feeds).
 *
 * `ttl` sube la cache de las llamadas que hace por dentro. Recorrer el catálogo
 * entero cuesta una llamada por cada 48 productos, y quien lo pide no siempre
 * necesita datos de hace dos minutos: el PDF impreso se conforma con una hora.
 */
export function getTodosLosProductos(ttl?: number): Promise<Producto[]> {
  return paginarTodo({ ttl });
}

/**
 * Todos los productos de una categoría. Hace falta donde se busca un producto concreto
 * dentro de su categoría —la ficha de detalle resuelve por slug— y donde se listan piezas
 * completas: con una sola página, un producto en el puesto 49 no existiría.
 */
export function getTodosPorCategoria(categoriaId: number): Promise<Producto[]> {
  return paginarTodo({ categoriaId });
}

/**
 * Un producto por id. El catálogo público no expone un endpoint por id, así que se busca
 * recorriendo el listado. Es caro; para el detalle, las rutas buscan por slug dentro de la
 * categoría, que son pocas páginas.
 */
export async function getProductoPorId(id: number): Promise<Producto> {
  const producto = (await getTodosLosProductos()).find((p) => p.id === id);
  if (!producto) throw new Error(`Producto ${id} no encontrado`);
  return producto;
}
