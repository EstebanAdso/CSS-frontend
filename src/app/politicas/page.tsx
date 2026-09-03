import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Políticas de Garantía y Devolución | CompuServicesSoft Pasto",
  description:
    "Conoce nuestras políticas de garantía (hasta 4 meses) y devolución de productos en CompuServicesSoft, Pasto, Nariño. CC San Agustín, Local 224A.",
  keywords: [
    "política de garantía Pasto",
    "garantía computadores Pasto",
    "devoluciones CompuServicesSoft",
    "garantía componentes PC Pasto",
    "política devolución tecnología Pasto",
    "CompuServicesSoft garantía",
  ],
  openGraph: {
    title: "Políticas de Garantía y Devolución | CompuServicesSoft Pasto",
    description:
      "Garantía hasta 4 meses y devoluciones en 30 días para productos con defecto de fábrica. CompuServicesSoft, CC San Agustín Local 224A, Pasto.",
    url: "https://www.compuservicessoft.com/politicas",
    type: "website",
  },
  alternates: { canonical: "https://www.compuservicessoft.com/politicas" },
};

const secciones = [
  {
    id: "garantia",
    titulo: "Política de Garantía",
    intro:
      "La duración máxima de nuestra garantía es de 4 meses; en casos excepcionales puede extenderse de 6 a 8 meses, según se refleje en la factura. La garantía cubre exclusivamente defectos de fábrica.",
    bloques: [
      {
        subtitulo: "Condiciones",
        items: [
          "El producto no debe presentar daños por mal uso, golpes, humedad o cortos eléctricos.",
          "Es obligatorio presentar la factura de compra.",
          "El cliente debe traer el producto junto con todos sus complementos (caja, accesorios, etc.).",
        ],
      },
      {
        subtitulo: "Proceso de Reclamo",
        items: [
          "Visitar nuestro local en el CC San Agustín, Local 224A (Segundo piso al fondo), Pasto.",
          "Presentar el producto y la factura.",
          "Revisión del producto para detectar fallas de fábrica.",
          "Envío del producto a los proveedores para su reemplazo o reparación.",
          "Entrega de un nuevo producto o reembolso si no se puede solucionar.",
        ],
      },
    ],
  },
  {
    id: "devoluciones",
    titulo: "Política de Devoluciones",
    intro:
      "Ofrecemos devoluciones para productos con defectos de fábrica dentro de los primeros 30 días hábiles a partir de la fecha de compra.",
    bloques: [
      {
        subtitulo: "Condiciones",
        items: [
          "El producto debe estar en buen estado, sin golpes ni daños por humedad.",
          "Debe presentarse la factura de compra.",
        ],
      },
      {
        subtitulo: "Proceso",
        items: [
          "Visitar nuestro local en el CC San Agustín, Local 224A (Segundo piso al fondo), Pasto.",
          "Presentar el producto y la factura.",
          "Evaluación del producto por nuestro equipo técnico.",
          "Si el defecto es confirmado, se enviará el producto a los proveedores.",
          "Reemplazo del producto o reembolso si no es posible reemplazarlo.",
        ],
      },
    ],
  },
];

export default function PoliticasPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar tema="claro" />

      <div className="container-site px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex-1">

        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
            — Información legal —
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Políticas de <span className="text-primary">Garantía y Devolución</span>
          </h1>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" />
          <p className="text-gray-500 text-base leading-relaxed">
            En <strong className="text-gray-700">CompuServicesSoft</strong> nos comprometemos con la calidad
            de nuestros productos y la satisfacción de nuestros clientes en Pasto, Nariño.
          </p>
        </div>

        {/* Secciones */}
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          {secciones.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Header sección */}
              <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                  {sec.titulo}
                </h2>
              </div>

              <div className="px-8 py-6 flex flex-col gap-6">
                {/* Intro */}
                <p className="text-gray-600 leading-relaxed">{sec.intro}</p>

                {/* Bloques condiciones / proceso */}
                {sec.bloques.map((bloque) => (
                  <div key={bloque.subtitulo}>
                    <h3 className="text-sm font-black uppercase tracking-wider text-primary mb-3">
                      {bloque.subtitulo}
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {bloque.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-primary"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Nota de contacto */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200 px-8 py-6 text-center">
            <p className="text-sm text-gray-500 mb-1">
              ¿Tienes dudas sobre tu garantía o devolución?
            </p>
            <p className="text-sm font-semibold text-gray-700">
              Escríbenos por WhatsApp o visítanos en el{" "}
              <strong className="text-gray-900">CC San Agustín, Local 224A</strong> — Pasto, Nariño.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
