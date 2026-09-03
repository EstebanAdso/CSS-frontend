/* Tipos globales del catálogo. Los datos vienen del catálogo público de Zentivy
   (ver src/lib/api.ts), que es donde el negocio administra su inventario. */

export type Categoria = {
  id: number;
  nombre: string;
};

export type Producto = {
  id: number;
  nombre: string;
  /** Precio de venta al público (en Zentivy, `precio`). */
  precioVendido: number;
  /** URL absoluta de la foto (Cloudinary). Vacío = sin foto. */
  imagen: string;
  descripcion: string;
  marca: string | null;
  modelo: string | null;
  /** Talla, capacidad, medida… del producto, cuando aplica. */
  especificacion: string | null;
  /** Meses de garantía. 0 = sin garantía; null = el negocio no lo registró. */
  garantia: number | null;
  categoria: Categoria;
  /* Sin `cantidad` a propósito: el catálogo público no publica existencias
     —revelan el pulso del negocio— y no hace falta, porque solo lista productos
     activos, o sea disponibles. */
};

/** Cabecera del catálogo: quién es el negocio y cómo contactarlo. */
export type Catalogo = {
  nombre: string;
  logoUrl: string | null;
  ciudad: string | null;
  departamento: string | null;
  telefono: string | null;
  horarioAtencion: string | null;
  sitioWeb: string | null;
  categorias: Categoria[];
};

export type PaginatedResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
  size?: number;
  number?: number;
};
