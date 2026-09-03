# CompuServicesSoft — Frontend

Sitio web oficial de **CompuServicesSoft**, tienda de tecnología ubicada en el CC San Agustín, Local 224A, Pasto, Nariño, Colombia.

---

## Stack tecnológico

| Tecnología | Versión |
|---|---|
| Next.js (App Router) | 16.1.6 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 |
| Fuente | Montserrat (Google Fonts) |

---

## Levantar el proyecto

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

### Variables de entorno

El catálogo (productos, precios, fotos y categorías) sale del **catálogo público de
Zentivy**, no de una base propia: el inventario se administra allá y esta web solo lo
lee. Se configura en `.env.local`:

```env
NEXT_PUBLIC_ZENTIVY_API=https://zentivy-backend-production.up.railway.app
NEXT_PUBLIC_ZENTIVY_SLUG=compuservicessoft
```

En local, apuntando al backend de Zentivy en el puerto 8083:

```env
NEXT_PUBLIC_ZENTIVY_API=http://localhost:8083
```

Los valores por defecto (`http://localhost:8083` y `compuservicessoft`) están en
`src/lib/api.ts`. El endpoint es de solo lectura y sin autenticación, y **no** entrega
costo de compra, precio mayorista, proveedor ni existencias: por eso la web ya no
muestra "N en stock" — el catálogo solo publica productos activos.

Todas las llamadas salen del servidor de Next (RSC con `revalidate`), así que no hay
CORS que configurar ni llaves que exponer al navegador.

---

## Estructura principal

```
src/
├── app/
│   ├── layout.tsx               # Layout raíz: SEO, Schema.org, favicon, fuente Montserrat
│   ├── page.tsx                 # Página de inicio
│   ├── globals.css              # Variables CSS, animaciones y scroll-margin-top para anchors
│   ├── favicon.ico              # Favicon principal (detectado automáticamente por Next.js)
│   ├── favicon/                 # Carpeta con todos los assets del favicon (NO servida por Next.js)
│   ├── catalogo/                # Catálogo de productos
│   │   ├── page.tsx             # Listado con filtros por categoría
│   │   ├── buscar/[q]/page.tsx  # Búsqueda de productos
│   │   └── [...path]/page.tsx   # Detalle de producto con WhatsAppSelector
│   ├── armar-pc-gamer/
│   │   └── page.tsx             # Cotizador de PC por componentes
│   ├── politicas/
│   │   └── page.tsx             # Garantía y políticas de devolución
│   └── api/
│       └── catalogo-pdf/
│           └── route.ts         # Genera catálogo HTML con todos los productos para imprimir como PDF
│
└── components/
    ├── Navbar.tsx               # Navbar fija: logo real (favicon PNG), scroll effect, menú mobile
    ├── HeroSection.tsx          # Hero con CTAs, redes sociales y botón "Explorar" con scroll suave
    ├── CategoriasSection.tsx    # Grid de categorías de productos
    ├── CategoriasCarrusel.tsx   # Carrusel horizontal de categorías
    ├── FilaCarrusel.tsx         # Carrusel de productos por categoría
    ├── AboutSection.tsx         # Sección "Quiénes Somos"
    ├── ServiciosSection.tsx     # Servicios: técnico, asesorías, venta
    ├── CotizadorPC.tsx          # Cotizador de PC: selects, resumen, descuentos, links a productos
    ├── CatalogoFiltros.tsx      # Filtros de categoría + búsqueda para el catálogo
    ├── ProductCard.tsx          # Tarjeta de producto individual
    ├── DescargaCatalogo.tsx     # Botón que abre el catálogo PDF en nueva pestaña
    ├── WhatsAppFloat.tsx        # Botón flotante de WhatsApp con popover propio (fixed)
    ├── WhatsAppSelector.tsx     # Popover reutilizable para elegir entre dos números de WhatsApp
    └── Footer.tsx               # Pie de página responsive: centrado en mobile, columnas en desktop
```

```
public/
└── favicon/                     # Assets del favicon servidos como rutas públicas
    ├── favicon.ico
    ├── favicon.svg
    ├── favicon-96x96.png
    ├── apple-touch-icon.png     # iOS pantalla de inicio
    ├── web-app-manifest-192x192.png
    ├── web-app-manifest-512x512.png
    └── site.webmanifest         # Manifiesto PWA
```

---

## Contacto configurado

| Canal | Valor |
|---|---|
| WhatsApp principal | +57 317 403 4349 |
| WhatsApp secundario | +57 324 226 4795 |
| Instagram | @compuservicessoft |
| Email | compuservicessoft@gmail.com |
| Ubicación | CC San Agustín, Local 224A — Pasto, Nariño |
| Horario | Lun–Sáb · 10am – 7pm |

---

## Funcionalidades implementadas

### Navegación y layout
- **Navbar** con logo real (imagen PNG del favicon), dos temas: `oscuro` (inicio) y `claro` (catálogo/producto).
- Menú hamburguesa en mobile con animación.
- Modal de contacto con íconos de redes sociales, WhatsApp, email y ubicación.
- **Footer** responsive: centrado en mobile, columnas en desktop. Link "Quiénes Somos" usa `/#about` para funcionar desde cualquier página.
- Scroll suave **solo** en el botón "Explorar" del Hero (via `scrollIntoView`) — la navegación entre páginas es instantánea.
- `scroll-margin-top: 88px` en todas las secciones con `id` para compensar el Navbar fijo al navegar a anchors.

### Catálogo de productos
- Listado con filtros por categoría (sidebar en desktop, drawer en mobile).
- Búsqueda de productos por nombre con página dedicada `/catalogo/buscar/[q]`.
- Detalle de producto: botón "Preguntar por WhatsApp" usa `WhatsAppSelector` para elegir número.
- `ProductCard` con imagen optimizada via `next/image`.

### Cotizador de PC (`/armar-pc-gamer`)
- Selección de componentes: procesador, RAM (con cantidad), motherboard, fuente, disco (SSD o NVMe), gabinete, disipador, gráfica y monitor.
- Resumen en tiempo real con precios individuales y total.
- **Descuento automático del 5%** al completar la torre (sin gráfica).
- **Obsequio de teclado + mouse** al agregar monitor junto con la torre completa.
- Cada producto del resumen es un **link clickeable** que abre la página del producto en nueva pestaña.
- Botón de envío de cotización por WhatsApp con `WhatsAppSelector` para elegir número.
- Estilos sin morado excesivo: promociones en gris/verde, total en negro, botón WhatsApp verde.

### WhatsApp con selección de número
- `WhatsAppSelector`: popover tipo nube al hacer clic — muestra los dos números (317 primero, 324 segundo) para que el usuario elija.
- `WhatsAppFloat`: botón flotante verde, esquina inferior derecha, popover posicionado con `fixed` para evitar clipping, tooltip al hover, animación de pulso.
- Implementado en: `WhatsAppFloat`, `HeroSection`, `ServiciosSection`, `AboutSection`, `CotizadorPC`, detalle de producto.
- **Eliminados todos los botones/links de llamada telefónica** (`tel:`) del sitio.

### Catálogo PDF
- Ruta `/api/catalogo-pdf` genera un HTML con todos los productos agrupados por categoría.
- Al abrir en nueva pestaña, el navegador muestra el diálogo de impresión/guardar como PDF.
- Botón `DescargaCatalogo` visible solo en desktop (`hidden md:inline-flex`).

### Favicon y PWA
- Logo real: diseño gamer con letras "CSS", fondo morado, líneas decorativas.
- Assets en `public/favicon/`: SVG vectorial, PNG 96px, ICO, apple-touch-icon, manifests 192/512px.
- `layout.tsx` configura `icons` y `manifest` en metadata de Next.js.
- `site.webmanifest` con `theme_color: #8c52ff`, `background_color: #0a0010`, `start_url: /`.
- Logo real también usado en el **Navbar** (imagen PNG en lugar del cuadrado CSS generado).

### SEO y metadatos
- `layout.tsx` con `metadata` completo: título, descripción, keywords, OpenGraph, Twitter Card, icons, manifest.
- Schema.org `LocalBusiness` en JSON-LD con nombre, dirección, teléfonos, horario y coordenadas.
- Imágenes con `next/image` optimizadas, `priority` en imágenes LCP, `loading="lazy"` en el resto.

### Rendimiento
- `FilaCarrusel`: `priority` solo en las primeras 4 imágenes del primer carrusel, `loading="lazy"` en el resto.
- `AboutSection`: imagen del local con `priority` por ser candidata a LCP.
- `sizes` correctos en todos los `next/image` según el layout real.

### Otros
- Eliminado el botón ✕ de limpiar búsqueda en mobile del catálogo (`CatalogoFiltros`).
- SVGs genéricos de Next.js eliminados de `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`).

---

## Tokens de diseño (variables CSS)

Definidos en `src/app/globals.css` bajo `:root`. Para cambiar el color principal del sitio basta con editar `--color-primary`.

### Colores principales

| Variable | Valor | Uso |
|---|---|---|
| `--color-primary` | `#8c52ff` | Color principal del sitio (morado) |
| `--color-primary-light` | `#a020f0` | Hover de scrollbar, bordes activos |
| `--color-primary-lighter` | `#c060ff` | Textos suaves, pasos secundarios |
| `--color-primary-dark` | `#4a0080` | Hover de botones, gradientes |

### Fondos

| Variable | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0a0010` | Fondo principal de la app |
| `--color-bg-subtle` | `#12001f` | Track del scrollbar |
| `--color-bg-card` | `#2d0050` | Gradientes de secciones oscuras |
| `--color-bg-card-dark` | `#1e0035` | Gradientes más profundos |
| `--color-surface` | `#1c0030` | Tooltip flotante, hover navbar mobile |
| `--color-dark` | `#111111` | Footer, header del carrito |

### Texto

| Variable | Valor | Uso |
|---|---|---|
| `--color-text` | `#f0e6ff` | Texto sobre fondo oscuro |
| `--color-text-muted` | `#d89fff` | Subtítulos, descripciones en oscuro |

### Acentos y funcionales

| Variable | Valor | Uso |
|---|---|---|
| `--color-accent` | `#00e5ff` | Cyan — botón "Arma tu PC", orbe |
| `--color-accent-2` | `#ff00aa` | Rosa/magenta — orbe decorativo |
| `--color-active` | `#39ff14` | Verde neón — indicador "abierto" |
| `--color-whatsapp` | `#25d366` | Botones de WhatsApp |
| `--color-whatsapp-hover` | `#1da851` | Hover de botones de WhatsApp |

### Clases Tailwind generadas

Todos los tokens anteriores están disponibles como clases Tailwind (via `@theme inline`):

```
bg-primary        text-primary        border-primary
bg-primary-dark   text-primary-dark
bg-primary-light  text-primary-light
bg-surface        text-text-muted
bg-dark           bg-active
bg-whatsapp       hover:bg-whatsapp-hover
bg-accent         text-accent
```

---

## Notas de Tailwind v4

- Usar `bg-linear-to-br` (no `bg-gradient-to-br`)
- Usar `shrink-0` (no `flex-shrink-0`)
- Clases custom disponibles en `globals.css`: `.card-gamer`, `.btn-gamer`, `.text-gradient-gamer`, `.text-gradient-purple`, `.neon-line`, `.animate-float`, `.animate-border-glow`, `.animate-text-glow`, `.animate-pulse-glow`
