import NavbarWeb from "@/components/desarrollo-web/NavbarWeb";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software a la Medida en Pasto | CompuServicesSoft",
  description:
    "Software personalizado para tu negocio en Pasto, Nariño. Sistemas web, ERP, CRM, inventarios y automatización. Reunión de análisis gratis.",
  keywords: [
    "software a la medida Pasto",
    "desarrollo de software Pasto",
    "sistemas web Pasto",
    "aplicaciones web Pasto",
    "ERP Pasto",
    "CRM Pasto",
    "automatización Pasto",
    "programador Pasto",
    "desarrollador Pasto",
    "software empresarial Pasto",
    "sistema de inventarios Pasto",
    "facturación electrónica Pasto",
    "desarrollo web a medida Nariño",
    "aplicaciones empresariales Pasto",
  ],
  alternates: { canonical: "https://www.compuservicessoft.com/desarrollo-web/software-a-la-medida" },
  openGraph: {
    title: "Software a la Medida en Pasto — CompuServicesSoft",
    description:
      "Desarrollamos sistemas web, ERP, CRM y aplicaciones a la medida para tu negocio en Pasto. Análisis de requerimientos, desarrollo profesional y soporte continuo.",
    url: "https://www.compuservicessoft.com/desarrollo-web/software-a-la-medida",
    type: "website",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "Software a la Medida en Pasto — CompuServicesSoft",
      },
    ],
  },
};

const WA_LINK =
  "https://wa.me/573242264795?text=Hola%20CompuServicesSoft%2C%20necesito%20un%20software%20a%20la%20medida%20para%20mi%20negocio%20en%20Pasto";

const tiposSoftware = [
  {
    titulo: "Sistemas ERP",
    desc: "Centraliza la gestión de tu empresa: finanzas, inventarios, compras, ventas y recursos humanos en un solo sistema web diseñado para las necesidades de tu negocio en Pasto.",
  },
  {
    titulo: "CRM — Gestión de Clientes",
    desc: "Controla tus contactos, oportunidades de venta y seguimiento comercial. Un CRM a medida te ayuda a cerrar más ventas y fidelizar clientes en Pasto y Nariño.",
  },
  {
    titulo: "Sistemas de Inventario y Facturación",
    desc: "Administra tu stock en tiempo real, genera facturas electrónicas y controla entradas y salidas de productos. Ideal para comercios y distribuidoras en Pasto.",
  },
  {
    titulo: "Sistemas de Reservas y Citas",
    desc: "Permite a tus clientes agendar citas, reservar servicios o apartar horarios desde tu página web. Perfecto para clínicas, salones, consultorios y restaurantes.",
  },
  {
    titulo: "Dashboards y Paneles Internos",
    desc: "Visualiza los datos clave de tu negocio en tiempo real: ventas, rendimiento, métricas y reportes. Toma decisiones informadas con paneles personalizados.",
  },
  {
    titulo: "Integraciones API y Apps Web",
    desc: "Conectamos tus sistemas existentes, integramos pasarelas de pago, APIs de terceros y desarrollamos aplicaciones web completas adaptadas a tu operación.",
  },
];

const proceso = [
  { num: "01", titulo: "Reunión de Análisis", desc: "Nos reunimos contigo (presencial en Pasto o virtual) para entender tu negocio, tus procesos actuales y los problemas que quieres resolver. Esta reunión es sin costo." },
  { num: "02", titulo: "Propuesta Técnica", desc: "Diseñamos una propuesta con la arquitectura del sistema, funcionalidades, tecnologías, tiempos de entrega y cotización personalizada. Sin letra menuda." },
  { num: "03", titulo: "Desarrollo con Puntos de Control", desc: "Desarrollamos tu software por etapas con demostraciones periódicas para que valides cada avance. Puedes pedir ajustes en cada punto de control." },
  { num: "04", titulo: "Despliegue y Capacitación", desc: "Ponemos tu sistema en producción, migramos tus datos si es necesario y capacitamos a tu equipo para que lo usen con confianza desde el día uno." },
];

const faqs = [
  {
    q: "¿Qué es un software a la medida?",
    a: "Es un sistema o aplicación web desarrollada específicamente para las necesidades de tu negocio. A diferencia de las soluciones genéricas, un software a la medida se adapta a tus procesos, no al revés. Tú decides qué funcionalidades necesitas y cómo debe funcionar.",
  },
  {
    q: "¿Cuánto cuesta desarrollar un software a la medida en Pasto?",
    a: "Cada proyecto es diferente. El costo depende de la complejidad, las funcionalidades y el alcance del sistema. Por eso trabajamos con cotización personalizada: nos reunimos contigo, entendemos lo que necesitas y te damos un presupuesto detallado sin compromiso.",
  },
  {
    q: "¿Cuánto tiempo toma desarrollar mi sistema?",
    a: "Depende del tamaño del proyecto. Un sistema sencillo puede estar listo en 4-6 semanas, mientras que un ERP completo puede tomar 3-6 meses. En la propuesta técnica te damos un cronograma detallado con fechas de entrega por etapas.",
  },
  {
    q: "¿Qué tecnologías utilizan para el desarrollo?",
    a: "Trabajamos con tecnologías modernas y robustas: React, Next.js, Node.js, bases de datos PostgreSQL y MongoDB, entre otras. Elegimos la mejor tecnología según las necesidades de tu proyecto para garantizar rendimiento, seguridad y escalabilidad.",
  },
  {
    q: "¿Ofrecen mantenimiento y soporte después de la entrega?",
    a: "Sí. Todos nuestros proyectos incluyen un periodo de soporte post-entrega. Además, ofrecemos planes de mantenimiento mensual para actualizaciones, correcciones y nuevas funcionalidades. Estamos en Pasto, así que el soporte es directo y rápido.",
  },
  {
    q: "¿Puedo solicitar cambios o nuevas funcionalidades después?",
    a: "Por supuesto. Tu software está diseñado para crecer contigo. Puedes solicitar mejoras, nuevos módulos o integraciones en cualquier momento. Al ser un desarrollo propio, tienes control total sobre la evolución de tu sistema.",
  },
];

export default function SoftwareALaMedidaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Desarrollo de Software a la Medida",
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
    url: "https://www.compuservicessoft.com/desarrollo-web/software-a-la-medida",
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
      { "@type": "ListItem", position: 3, name: "Software a la Medida", item: "https://www.compuservicessoft.com/desarrollo-web/software-a-la-medida" },
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
            <li style={{ color: "var(--color-primary)" }}>Software a la Medida</li>
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
            Desarrollo de Software en Pasto
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
            Software <span className="text-gradient-gamer">a la Medida</span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">para tu Negocio en Pasto</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Desarrollamos <strong className="text-white">sistemas web, ERP, CRM y aplicaciones</strong> diseñadas
            específicamente para tu negocio. Nos reunimos contigo para analizar tus necesidades y crear una solución que automatice
            tus procesos y haga crecer tu empresa. <strong className="text-white">Cotización personalizada.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide">
              Solicitar cotización personalizada
            </a>
            <Link href="/desarrollo-web" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-200" style={{ border: "1px solid rgba(140,82,255,0.4)", color: "var(--color-text-muted)" }}>
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* TIPOS DE SOFTWARE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">Soluciones</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ¿Qué tipo de <span className="text-primary">Software</span> podemos desarrollar?
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">
              Cada sistema se diseña desde cero para adaptarse a la operación real de tu negocio en Pasto. Estos son algunos ejemplos de lo que podemos construir para ti.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiposSoftware.map((c) => (
              <div key={c.titulo} className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200">
                <h3 className="text-lg font-black text-gray-900 mb-3">{c.titulo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 50%, #0a0010 100%)" }}>
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-primary)" }}>Paso a paso</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Nuestro Proceso de <span style={{ color: "var(--color-primary)" }}>Desarrollo</span>
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto" style={{ background: "var(--color-primary)" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {proceso.map((p) => (
              <div key={p.num} className="card-gamer rounded-3xl p-8 flex flex-col gap-4">
                <span className="text-5xl font-black" style={{ color: "rgba(140,82,255,0.3)" }}>{p.num}</span>
                <h3 className="text-xl font-black text-white">{p.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{p.desc}</p>
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
              Dudas sobre <span className="text-primary">Software a la Medida</span>
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
              { titulo: "Tiendas Online", href: "/desarrollo-web/tienda-online-ecommerce", desc: "Vende tus productos 24/7 con tu propia tienda virtual." },
              { titulo: "Landing Pages", href: "/desarrollo-web/landing-page", desc: "Páginas de aterrizaje optimizadas para convertir visitantes." },
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
            ¿Necesitas un sistema <span className="text-gradient-gamer">hecho a tu medida?</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Agenda una reunión de análisis gratuita. Evaluamos tu caso, entendemos tus procesos y te entregamos una <strong className="text-white">cotización personalizada sin compromiso</strong>.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg sm:text-xl">
            Agendar reunión de análisis gratis
          </a>
        </div>
      </section>

      <Footer hideGlobalPhone={true} />
      <WhatsAppFloat hideGlobalPhone={true} />
    </main>
  );
}
