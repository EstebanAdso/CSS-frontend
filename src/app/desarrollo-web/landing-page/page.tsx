import NavbarWeb from "@/components/desarrollo-web/NavbarWeb";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Pages en Pasto | CompuServicesSoft",
  description:
    "Landing pages de alta conversión en Pasto, Nariño. Diseño moderno, SEO, WhatsApp integrado. Entrega en 5-7 días desde $500.000 COP.",
  keywords: [
    "landing page Pasto",
    "página de aterrizaje Pasto",
    "landing page empresa Pasto",
    "landing page negocio Pasto",
    "página web rápida Pasto",
    "conversión web Pasto",
    "landing page económica Pasto",
    "landing page profesional Pasto",
    "página de captura Pasto",
    "landing page WhatsApp Pasto",
    "página de ventas Pasto",
    "landing page Nariño",
    "diseño landing page Pasto",
    "crear landing page Pasto",
  ],
  alternates: { canonical: "https://www.compuservicessoft.com/desarrollo-web/landing-page" },
  openGraph: {
    title: "Landing Pages en Pasto | Páginas de Aterrizaje que Convierten — CompuServicesSoft",
    description:
      "Landing pages profesionales para tu negocio en Pasto. Diseño moderno, optimizadas para conversión, con formulario y WhatsApp. Entrega en 5-7 días hábiles.",
    url: "https://www.compuservicessoft.com/desarrollo-web/landing-page",
    type: "website",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "Landing Pages en Pasto — CompuServicesSoft",
      },
    ],
  },
};

const WA_LINK =
  "https://wa.me/573242264795?text=Hola%20CompuServicesSoft%2C%20necesito%20una%20landing%20page%20para%20mi%20negocio%20en%20Pasto";

const incluye = [
  {
    titulo: "Diseño Moderno y Atractivo",
    desc: "Tu landing page tendrá un diseño profesional y visualmente impactante que genera confianza desde el primer segundo. Colores de tu marca y estilo personalizado.",
  },
  {
    titulo: "Formulario de Contacto",
    desc: "Incluimos un formulario optimizado para que tus visitantes te dejen sus datos fácilmente. Recibes las consultas directamente en tu correo o WhatsApp.",
  },
  {
    titulo: "Integración con WhatsApp",
    desc: "Botón flotante de WhatsApp y enlaces directos para que tus clientes en Pasto te escriban con un solo clic. La forma más rápida de cerrar ventas.",
  },
  {
    titulo: "SEO Básico Incluido",
    desc: "Configuramos títulos, meta descripciones, etiquetas y estructura para que Google indexe tu landing page y aparezcas en los resultados de búsqueda en Pasto.",
  },
  {
    titulo: "Carga Ultra Rápida",
    desc: "Tu página cargará en menos de 3 segundos. Imágenes optimizadas, código limpio y hosting rápido. Google premia las páginas veloces y tus visitantes no se irán.",
  },
  {
    titulo: "100% Responsive y CTAs Claros",
    desc: "Se adapta perfectamente a celulares, tablets y PCs. Botones de acción claros y estratégicamente ubicados para maximizar la conversión en cada dispositivo.",
  },
];

const casosDeUso = [
  {
    titulo: "Lanzar un Nuevo Producto",
    desc: "Crea una página exclusiva para presentar tu nuevo producto en Pasto. Muestra beneficios, fotos y un botón de compra o contacto directo.",
  },
  {
    titulo: "Promocionar un Servicio",
    desc: "Destaca un servicio específico de tu negocio con una página dedicada que explique qué ofreces, por qué elegirte y cómo contactarte.",
  },
  {
    titulo: "Capturar Leads y Clientes",
    desc: "Recoge datos de personas interesadas en tu negocio con un formulario optimizado. Ideal para campañas de Facebook Ads o Google Ads en Pasto.",
  },
  {
    titulo: "Registro para Eventos",
    desc: "Crea una landing page para que las personas se inscriban a tu evento, taller o curso en Pasto. Con fecha, hora, ubicación y formulario de registro.",
  },
  {
    titulo: "Restaurante o Carta Digital",
    desc: "Presenta tu menú, ubicación en Pasto, horarios y un botón de reserva o pedido por WhatsApp. Perfecto para restaurantes y cafeterías.",
  },
];

const faqs = [
  {
    q: "¿Qué es una landing page y para qué sirve?",
    a: "Una landing page es una página web de una sola sección diseñada con un objetivo específico: que el visitante realice una acción concreta como contactarte, comprar un producto o registrarse. A diferencia de un sitio web completo, la landing page elimina distracciones y enfoca toda la atención en la conversión.",
  },
  {
    q: "¿Cuánto cuesta una landing page en Pasto?",
    a: "Nuestras landing pages tienen un precio desde $500.000 COP. El costo final depende de la complejidad del diseño, las funcionalidades que necesites y el contenido. Escríbenos por WhatsApp para darte un presupuesto exacto según tu proyecto.",
  },
  {
    q: "¿En cuánto tiempo entregan la landing page?",
    a: "Tu landing page estará lista en 5 a 7 días hábiles una vez aprobado el diseño y recibido el contenido (textos e imágenes). Si necesitas algo más urgente, consúltanos y haremos lo posible por ajustar los tiempos.",
  },
  {
    q: "¿Cuál es la diferencia entre una landing page y un sitio web completo?",
    a: "Una landing page es una sola página enfocada en un objetivo específico (vender un producto, captar leads, etc.), mientras que un sitio web completo tiene múltiples páginas (inicio, servicios, nosotros, contacto, blog). La landing page es más económica, rápida de crear y efectiva para campañas publicitarias.",
  },
  {
    q: "¿Puedo actualizar la landing page yo mismo después?",
    a: "Sí. Te entregamos la landing page con acceso al panel de administración para que puedas modificar textos, imágenes y contenido fácilmente. Además, te damos una capacitación básica para que seas autónomo. Si prefieres, también ofrecemos planes de mantenimiento mensual.",
  },
];

export default function LandingPagePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Landing Page",
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
    url: "https://www.compuservicessoft.com/desarrollo-web/landing-page",
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
      { "@type": "ListItem", position: 3, name: "Landing Page", item: "https://www.compuservicessoft.com/desarrollo-web/landing-page" },
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
            <li style={{ color: "var(--color-primary)" }}>Landing Page</li>
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
            Landing Pages en Pasto
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
            Landing Pages que <span className="text-gradient-gamer">Convierten</span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">para tu Negocio en Pasto</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Creamos páginas de aterrizaje enfocadas en un solo objetivo: <strong className="text-white">convertir visitantes en clientes</strong>.
            Diseño moderno, formulario de contacto, WhatsApp integrado y carga ultra rápida para tu negocio en Pasto.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white" style={{ background: "rgba(140,82,255,0.18)", border: "1px solid rgba(140,82,255,0.35)" }}>
              Tu landing page lista en 5-7 dias habiles
            </span>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white" style={{ background: "rgba(140,82,255,0.18)", border: "1px solid rgba(140,82,255,0.35)" }}>
              Desde $500.000 COP
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide">
              Quiero mi landing page
            </a>
            <Link href="/desarrollo-web" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-200" style={{ border: "1px solid rgba(140,82,255,0.4)", color: "var(--color-text-muted)" }}>
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* QUE INCLUYE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">Todo incluido</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ¿Qué incluye tu <span className="text-primary">Landing Page?</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">
              Cada landing page que creamos en Pasto está optimizada para que tus visitantes se conviertan en clientes reales.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {incluye.map((c) => (
              <div key={c.titulo} className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200">
                <h3 className="text-lg font-black text-gray-900 mb-3">{c.titulo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 50%, #0a0010 100%)" }}>
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-primary)" }}>Ideal para</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Perfecta para <span style={{ color: "var(--color-primary)" }}>Estos Casos</span>
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto" style={{ background: "var(--color-primary)" }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {casosDeUso.map((c, i) => (
              <div key={c.titulo} className="card-gamer rounded-3xl p-8 flex flex-col gap-4">
                <span className="text-5xl font-black" style={{ color: "rgba(140,82,255,0.3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-black text-white">{c.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{c.desc}</p>
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
              Dudas sobre <span className="text-primary">Landing Pages</span>
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
            ¿Listo para tener tu <span className="text-gradient-gamer">landing page profesional?</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Escríbenos por WhatsApp y cuéntanos sobre tu proyecto. Te damos una cotización <strong className="text-white">sin ningún compromiso</strong>.
            Estamos en el CC San Agustín Local 224A, Pasto, Nariño, Colombia.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg sm:text-xl">
            Cotizar mi landing page
          </a>
        </div>
      </section>

      <Footer hideGlobalPhone={true} />
      <WhatsAppFloat hideGlobalPhone={true} />
    </main>
  );
}
