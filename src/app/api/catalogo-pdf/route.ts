import { NextResponse } from "next/server";
import { getTodosLosProductos } from "@/lib/api";

/* Generar este HTML pagina el catalogo entero contra Zentivy: una llamada por
   cada 48 productos. Sin cache, cada visita —o cada bot— repite ese abanico
   completo contra el backend. Es un catalogo para imprimir: diez minutos de
   frescura le sobran, y bajan el peor caso a seis regeneraciones por hora.

   El numero se le pasa tambien a `getTodosLosProductos`: Next se queda con el
   revalidate MAS CORTO entre el de la ruta y el de sus fetch, asi que declararlo
   solo aqui no serviria de nada —las llamadas a productos caducan a los dos
   minutos y arrastrarian la ruta con ellas—. Diez minutos y no una hora porque
   ese es el piso real: cada pagina de productos pide en paralelo la cabecera del
   catalogo, que se cachea `TTL_CABECERA` = 600s.

   Next exige un literal en `revalidate` (lo lee sin ejecutar el modulo), asi que
   el literal vive aqui y la llamada de abajo lo reusa. */
export const revalidate = 600;

function formatPrecio(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
}

export async function GET() {
  try {
    const productos = await getTodosLosProductos(revalidate);

    /* Agrupar por categoría preservando el orden de aparición (que viene por ID desde la API) */
    const porCategoriaMap = new Map<number, { nombre: string; productos: typeof productos }>();
    for (const p of productos) {
      const id = p.categoria?.id ?? 0;
      const nombre = p.categoria?.nombre ?? "Sin categoría";
      if (!porCategoriaMap.has(id)) porCategoriaMap.set(id, { nombre, productos: [] });
      porCategoriaMap.get(id)!.productos.push(p);
    }

    /* Ordenar productos dentro de cada categoría por precio ascendente */
    for (const cat of porCategoriaMap.values()) {
      cat.productos.sort((a, b) => a.precioVendido - b.precioVendido);
    }

    /* Ordenar por ID de categoría ascendente */
    const categoriasOrdenadas = [...porCategoriaMap.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => [v.nombre, v.productos] as [string, typeof productos]);

    /* Generar HTML para el PDF */
    const fecha = new Date().toLocaleDateString("es-CO", {
      day: "2-digit", month: "long", year: "numeric",
    });

    const filas = categoriasOrdenadas.map(([cat, prods]) => {
      const filasProductos = prods
        .map(
          (p) => `
          <tr>
            <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-size:12px;color:#333">${p.nombre}</td>
            <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-size:12px;color:#111;font-weight:700;text-align:right;white-space:nowrap">${formatPrecio(p.precioVendido)}</td>
          </tr>`
        )
        .join("");

      return `
        <tr>
          <td colspan="2" style="padding:10px 10px 6px;background:#8c52ff;color:#fff;font-weight:800;font-size:13px;letter-spacing:0.5px">
            ${cat.toUpperCase()} (${prods.length})
          </td>
        </tr>
        ${filasProductos}
      `;
    }).join("");

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Catálogo CompuServicesSoft</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: Arial, sans-serif; background:#fff; color:#111; }
    @media print {
      .no-print { display:none !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <!-- Encabezado -->
  <div style="background:#111;padding:24px 32px;display:flex;justify-content:space-between;align-items:center">
    <div>
      <div style="font-size:22px;font-weight:900;color:#fff">
        Compu<span style="color:#8c52ff">Services</span>Soft
      </div>
      <div style="font-size:11px;color:#aaa;margin-top:4px">CC San Agustín, Local 224A — Pasto, Nariño</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:13px;font-weight:700;color:#8c52ff">CATÁLOGO DE PRODUCTOS</div>
      <div style="font-size:11px;color:#aaa;margin-top:2px">${fecha}</div>
      <div style="font-size:11px;color:#aaa">WhatsApp: +57 324 226 4795</div>
    </div>
  </div>

  <!-- Tabla -->
  <div style="padding:24px 32px">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:#f5f5f5">
          <th style="padding:8px 10px;text-align:left;font-size:11px;color:#666;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e0e0e0">Producto</th>
          <th style="padding:8px 10px;text-align:right;font-size:11px;color:#666;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #e0e0e0">Precio</th>
        </tr>
      </thead>
      <tbody>
        ${filas}
      </tbody>
    </table>

    <!-- Total de productos -->
    <div style="margin-top:24px;padding:12px 16px;background:#f9f9f9;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:12px;color:#666">Total de productos en catálogo</span>
      <span style="font-size:14px;font-weight:900;color:#8c52ff">${productos.length} productos</span>
    </div>

    <!-- Pie -->
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid #eee;text-align:center;font-size:10px;color:#aaa">
      Los precios están expresados en pesos colombianos (COP) e incluyen IVA. Sujetos a cambio sin previo aviso.<br/>
      compuservicessoft@gmail.com · instagram: @compuservicessoft · compuservicessoft.com
    </div>
  </div>

  <script class="no-print">window.onload = () => window.print();</script>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch {
    return NextResponse.json({ error: "No se pudo generar el catálogo" }, { status: 500 });
  }
}
