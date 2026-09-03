import NavbarWeb from "@/components/desarrollo-web/NavbarWeb";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda Online en Pasto | E-commerce — CompuServicesSoft",
  description:
    "Crea tu tienda online en Pasto, Nariño. Catálogo, carrito, pasarela de pago y envíos. Vende 24/7 desde $2.000.000 COP.",
  keywords: [
    "tienda online Pasto",
    "e-commerce Pasto",
    "tienda virtual Pasto",
    "vender por internet Pasto",
    "pasarela de pago Pasto",
    "catálogo online Pasto",
    "tienda virtual Nariño",
    "crear tienda online Pasto",
    "ecommerce Pasto Nariño",
    "tienda web Pasto",
    "venta online Pasto",
    "carrito de compras Pasto",
    "plataforma e-commerce Pasto",
    "tienda online Colombia",
  ],
  alternates: { canonical: "https://www.compuservicessoft.com/desarrollo-web/tienda-online-ecommerce" },
  openGraph: {
    title: "Tienda Online y E-commerce en Pasto — CompuServicesSoft",
    description:
      "Crea tu tienda virtual profesional y vende tus productos por internet las 24 horas. Pasarela de pago, envíos y catálogo incluidos. Estamos en Pasto, Nariño.",
    url: "https://www.compuservicessoft.com/desarrollo-web/tienda-online-ecommerce",
    type: "website",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "Tienda Online y E-commerce en Pasto — CompuServicesSoft",
      },
    ],
  },
};

const WA_LINK =
  "https://wa.me/573242264795?text=Hola%20CompuServicesSoft%2C%20quiero%20crear%20una%20tienda%20online%20para%20mi%20negocio%20en%20Pasto";

const caracteristicas = [
  {
    titulo: "Catálogo de Productos Completo",
    desc: "Organiza tus productos por categorías, agrega fotos, descripciones, precios y variaciones (talla, color, etc.). Tus clientes en Pasto y toda Colombia podrán ver todo tu inventario desde el celular.",
  },
  {
    titulo: "Carrito de Compras y Pasarela de Pago",
    desc: "Integración con pasarelas de pago como Wompi, MercadoPago, PayU y PSE. Tus clientes pagan con tarjeta de crédito, débito, Nequi, Daviplata o transferencia bancaria de forma segura.",
  },
  {
    titulo: "Gestión de Pedidos y Órdenes",
    desc: "Panel de administración donde ves cada pedido en tiempo real: estado del pago, datos del cliente, dirección de envío y seguimiento. Controla tu negocio desde cualquier lugar.",
  },
  {
    titulo: "Diseño Responsive para Celular",
    desc: "Tu tienda se ve perfecta en celulares, tablets y computadores. El 80% de las compras online en Colombia se hacen desde el celular — tu tienda estará optimizada para eso.",
  },
  {
    titulo: "SEO por Categoría y Producto",
    desc: "Cada producto y categoría tiene su propia URL optimizada para Google. Cuando alguien busque lo que vendes en Pasto, tu tienda aparecerá en los primeros resultados.",
  },
  {
    titulo: "Integración con Redes Sociales y Envíos",
    desc: "Conectamos tu tienda con Instagram Shopping, Facebook y WhatsApp Business. Además, integración con empresas de envíos como Interrapidísimo, Servientrega y Coordinadora para despachos automáticos.",
  },
];

const beneficios = [
  {
    titulo: "Vende las 24 Horas, los 7 Días",
    desc: "Tu tienda online nunca cierra. Mientras duermes, tus clientes en Pasto, Nariño o cualquier parte de Colombia pueden comprar tus productos y pagar en línea.",
  },
  {
    titulo: "Llega a Todo Colombia",
    desc: "No te limites a los clientes que pasan por tu local. Con una tienda virtual, cualquier persona en Colombia puede descubrir tus productos, comprar y recibir el envío en su casa.",
  },
  {
    titulo: "Sin Necesidad de Local Físico",
    desc: "Puedes empezar a vender online sin pagar arriendo de un local comercial. Reduce tus costos fijos y enfoca tu inversión en productos y marketing digital.",
  },
  {
    titulo: "Escala tu Negocio sin Límites",
    desc: "Agrega nuevos productos, categorías y métodos de pago cuando quieras. Tu tienda crece contigo sin necesidad de remodelar o mudarte a un espacio más grande.",
  },
];

const faqs = [
  {
    q: "¿Cuánto cuesta crear una tienda online en Pasto?",
    a: "Una tienda online completa con catálogo, carrito de compras, pasarela de pago y diseño personalizado tiene un precio desde $2.000.000 COP. El costo final depende del número de productos, funcionalidades adicionales y la pasarela de pago que elijas. Escríbenos por WhatsApp para una cotización exacta.",
  },
  {
    q: "¿Qué pasarelas de pago puedo usar en mi tienda online?",
    a: "Integramos las principales pasarelas de pago en Colombia: Wompi, MercadoPago, PayU y PSE. Tus clientes podrán pagar con tarjeta de crédito, débito, Nequi, Daviplata y transferencia bancaria. Te asesoramos para elegir la mejor opción según tu volumen de ventas.",
  },
  {
    q: "¿Cómo administro los productos de mi tienda virtual?",
    a: "Tu tienda incluye un panel de administración fácil de usar donde puedes agregar, editar o eliminar productos, cambiar precios, subir fotos y gestionar inventario. Te damos una capacitación completa para que manejes todo tú mismo sin depender de un programador.",
  },
  {
    q: "¿Puedo integrar envíos y domicilios en mi tienda online?",
    a: "Sí. Integramos tu tienda con empresas de envíos como Interrapidísimo, Servientrega y Coordinadora. El sistema calcula automáticamente el costo del envío según la ciudad del comprador. También puedes ofrecer domicilios en Pasto con tu propio equipo de reparto.",
  },
  {
    q: "¿La tienda online incluye mantenimiento y soporte?",
    a: "Sí. Todos nuestros planes incluyen soporte técnico y mantenimiento por los primeros 3 meses. Después puedes contratar un plan de mantenimiento mensual para actualizaciones, respaldos y soporte continuo. Estamos en el CC San Agustín en Pasto para atenderte.",
  },
];

export default function TiendaOnlineEcommercePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tienda Online y E-commerce",
    provider: {
      "@type": "LocalBusiness",
      name: "CompuServicesSoft",
      address: {
        "@type": "PostalAddress",
        streetAddress: "CC San Agustín Local 224A",
        addressLocality: "Pasto",
        addressRegion: "Nariño",
        addressCountry: "CO",
      },
    },
    areaServed: { "@type": "City", name: "Pasto" },
    url: "https://www.compuservicessoft.com/desarrollo-web/tienda-online-ecommerce",
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.compuservicessoft.com" },
      { "@type": "ListItem", position: 2, name: "Desarrollo Web", item: "https://www.compuservicessoft.com/desarrollo-web" },
      { "@type": "ListItem", position: 3, name: "Tienda Online", item: "https://www.compuservicessoft.com/desarrollo-web/tienda-online-ecommerce" },
    ],
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <NavbarWeb />

      {/* Breadcrumb */}
      <nav className="pt-24 pb-2 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 45%, #12001f 100%)" }}>
        <div className="container-site">
          <ol className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li>/</li>
            <li><Link href="/desarrollo-web" className="hover:text-white transition-colors">Desarrollo Web</Link></li>
            <li>/</li>
            <li style={{ color: "var(--color-primary)" }}>Tienda Online</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative overflow-hidden flex items-center px-4 sm:px-6 lg:px-8 py-20 lg:py-28"
        style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 45%, #12001f 100%)" }}
      >
        <div className="absolute top-[-60px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="container-site relative z-10 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full" style={{ color: "var(--color-primary)", background: "rgba(140,82,255,0.12)", border: "1px solid rgba(140,82,255,0.3)" }}>
            E-commerce en Pasto
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
            Tu <span className="text-gradient-gamer">Tienda Online</span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">Vende por Internet desde Pasto</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Creamos tiendas virtuales profesionales con <strong className="text-white">catálogo de productos, carrito de compras, pasarela de pago y envíos integrados</strong>.
            Vende tus productos las 24 horas a todo Colombia. Desde <strong className="text-white">$2.000.000 COP</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide">
              Crear mi tienda online
            </a>
            <Link href="/desarrollo-web" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-200" style={{ border: "1px solid rgba(140,82,255,0.4)", color: "var(--color-text-muted)" }}>
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* CARACTERISTICAS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">Todo incluido</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ¿Qué incluye tu <span className="text-primary">Tienda Online?</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">
              Tu tienda virtual viene lista para vender desde el primer día. Todo lo que necesitas para recibir pedidos y cobrar en línea.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caracteristicas.map((c) => (
              <div key={c.titulo} className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200">
                <h3 className="text-lg font-black text-gray-900 mb-3">{c.titulo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 50%, #0a0010 100%)" }}>
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-primary)" }}>Ventajas de vender online</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              ¿Por qué tener una <span style={{ color: "var(--color-primary)" }}>Tienda Virtual?</span>
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto" style={{ background: "var(--color-primary)" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beneficios.map((b) => (
              <div key={b.titulo} className="card-gamer rounded-3xl p-8 flex flex-col gap-4">
                <h3 className="text-xl font-black text-white">{b.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">Preguntas frecuentes</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Dudas sobre <span className="text-primary">Tiendas Online</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 flex flex-col gap-3 border border-gray-200">
                <h3 className="font-bold text-base text-gray-900">{faq.q}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS RELACIONADOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "var(--color-bg)" }}>
        <div className="container-site">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Otros Servicios de <span style={{ color: "var(--color-primary)" }}>Desarrollo Web</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { titulo: "Diseño Web Personalizado", href: "/desarrollo-web/diseno-web-personalizado", desc: "Páginas web únicas con los colores de tu marca y diseño a medida." },
              { titulo: "SEO y Posicionamiento", href: "/desarrollo-web/seo-posicionamiento-web-pasto", desc: "Aparece en Google cuando busquen tus servicios en Pasto." },
              { titulo: "Landing Pages", href: "/desarrollo-web/landing-page", desc: "Páginas de aterrizaje optimizadas para convertir visitantes en clientes." },
              { titulo: "Software a la Medida", href: "/desarrollo-web/software-a-la-medida", desc: "Sistemas y aplicaciones web para automatizar tu negocio." },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="card-gamer rounded-2xl p-6 flex flex-col gap-2 hover:scale-[1.02] transition-transform duration-200">
                <h3 className="text-base font-bold text-white">{s.titulo}</h3>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{s.desc}</p>
                <span className="text-sm font-bold mt-2" style={{ color: "var(--color-primary)" }}>Ver servicio →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 sm:py-32 flex flex-col items-center justify-center border-t" style={{ background: "linear-gradient(135deg, var(--color-bg-card-dark) 0%, var(--color-bg-card) 50%, var(--color-bg-card-dark) 100%)", borderColor: "rgba(140,82,255,0.15)" }}>
        <div className="container-site relative z-10 text-center px-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
            ¿Listo para <span className="text-gradient-gamer">vender por internet?</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Escríbenos por WhatsApp y te asesoramos para crear tu tienda online. Cotización <strong className="text-white">sin costo y sin compromiso</strong>. Desde $2.000.000 COP.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg sm:text-xl">
            Cotizar mi tienda online
          </a>
        </div>
      </section>

      <Footer hideGlobalPhone={true} />
      <WhatsAppFloat hideGlobalPhone={true} />
    </main>
  );
}
