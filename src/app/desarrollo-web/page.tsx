import NavbarWeb from "@/components/desarrollo-web/NavbarWeb";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import type { Metadata } from "next";
import HeroParticles from "@/components/desarrollo-web/HeroParticles";
import AnimatedCodeTerminal from "@/components/desarrollo-web/AnimatedCodeTerminal";
import AnimatedSection from "@/components/desarrollo-web/AnimatedSection";
import AnimatedCounter from "@/components/desarrollo-web/AnimatedCounter";

export const metadata: Metadata = {
  title: "Páginas Web en Pasto | CompuServicesSoft",
  description: "Diseño web, tiendas online y software a la medida en Pasto, Nariño. SEO incluido, entrega rápida y presupuesto sin costo. ¡Cotiza hoy!",
  keywords: [
    "páginas web Pasto",
    "desarrollo web Pasto",
    "diseño web Pasto",
    "tiendas online Pasto",
    "crear página web Nariño",
    "software a la medida Pasto",
    "programador web Pasto",
    "diseñador web Pasto",
    "agencia web Pasto",
    "SEO Pasto"
  ],
  openGraph: {
    title: "Diseño y Desarrollo de Páginas Web en Pasto",
    description: "Impulsa tus ventas en Pasto, Nariño con una página web o tienda online rápida, moderna y lista para SEO. Cotiza sin costo hoy mismo.",
    url: "https://www.compuservicessoft.com/desarrollo-web",
    type: "website",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "Servicios de Desarrollo de Páginas Web en Pasto, Nariño",
      },
    ],
  },
  alternates: { canonical: "https://www.compuservicessoft.com/desarrollo-web" },
};

/* ─── Íconos inline ────────────────────────────────────────────────── */
const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const StoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v0a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v0a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v0a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
  </svg>
);
const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─── Datos de servicios ────────────────────────────────────────────── */
const servicios = [
  {
    icon: <RocketIcon />,
    titulo: "Landing Page",
    precio: "Desde $500.000 COP",
    href: "/desarrollo-web/landing-page",
    items: [
      "Diseño moderno y atractivo",
      "Optimizada para conversión",
      "SEO básico incluido",
      "Formulario de contacto",
      "Adaptable a celular y PC",
      "Entrega en 5–7 días hábiles",
    ],
    desc: "Ideal para lanzar productos, servicios o campañas. Convierte visitantes en clientes.",
    popular: false,
  },
  {
    icon: <CodeIcon />,
    titulo: "Diseño Web Personalizado",
    precio: "Desde $1.200.000 COP",
    href: "/desarrollo-web/diseno-web-personalizado",
    items: [
      "Múltiples secciones y páginas",
      "Diseño personalizado con tu marca",
      "SEO avanzado para Pasto",
      "Blog o noticias (opcional)",
      "Panel de administración",
      "Entrega en 2–3 semanas",
    ],
    desc: "Presencia digital profesional para tu empresa o negocio en Pasto y todo el país.",
    popular: true,
  },
  {
    icon: <StoreIcon />,
    titulo: "Tienda Online — E-commerce",
    precio: "Desde $2.000.000 COP",
    href: "/desarrollo-web/tienda-online-ecommerce",
    items: [
      "Catálogo de productos",
      "Carrito y pasarela de pago",
      "Panel de gestión de pedidos",
      "SEO optimizado por categorías",
      "Integración redes sociales",
      "Entrega en 3–5 semanas",
    ],
    desc: "Vende tus productos 24/7 en todo Colombia. Tu vitrina online lista para generar ventas.",
    popular: false,
  },
  {
    icon: <GearIcon />,
    titulo: "Software a la Medida",
    precio: "Cotización personalizada",
    href: "/desarrollo-web/software-a-la-medida",
    items: [
      "Análisis de requerimientos",
      "Desarrollo personalizado",
      "Sistemas de gestión (ERP/CRM)",
      "Aplicaciones web internas",
      "Integraciones con APIs",
      "Soporte y mantenimiento",
    ],
    desc: "Soluciones digitales únicas para automatizar procesos y hacer crecer tu negocio en Pasto.",
    popular: false,
  },
];

/* ─── Por qué elegirnos ─────────────────────────────────────────────── */
const ventajas = [
  {
    emoji: "🎨",
    titulo: "Diseño Moderno",
    desc: "Interfaces atractivas, animadas y adaptadas a cualquier dispositivo. Tu web se verá increíble en celular, tablet y PC.",
  },
  {
    emoji: "🔍",
    titulo: "SEO Incluido",
    desc: "Optimización para aparecer en Google cuando busquen tus servicios en Pasto y Nariño. Más visibilidad = más clientes.",
  },
  {
    emoji: "⚡",
    titulo: "Entrega Rápida",
    desc: "Cumplimos los tiempos de entrega. Sin excusas. Tu proyecto en producción lo antes posible.",
  },
  {
    emoji: "📍",
    titulo: "Soporte Local en Pasto",
    desc: "Estamos en Pasto. Puedes visitarnos en el CC San Agustín o contactarnos por WhatsApp cuando necesites ayuda.",
  },
];

/* ─── Proceso de trabajo ────────────────────────────────────────────── */
const pasos = [
  { num: "01", titulo: "Tu Idea", desc: "Cuéntanos qué necesitas. Hacemos una reunión (presencial o virtual) para entender tu proyecto y objetivos." },
  { num: "02", titulo: "Diseño", desc: "Creamos el diseño visual segun tu marca y lo que necesites utilizando los colores y diseño que mas te guste." },
  { num: "03", titulo: "Desarrollo", desc: "Construimos tu web con tecnologías modernas: rápida, segura y lista para Google." },
  { num: "04", titulo: "Entrega", desc: "Publicamos tu página web, te entregamos accesos y te capacitamos para administrarla." },
];

/* ─── FAQ ───────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "¿Cuánto cuesta una página web en Pasto?",
    a: "Depende del tipo de proyecto. Una landing page desde $500.000 COP, una página empresarial desde $1.200.000 COP y una tienda online desde $2.000.000 COP. Escríbenos por WhatsApp para una cotización personalizada sin costo.",
  },
  {
    q: "¿Cuánto tiempo tardan en entregar una página web?",
    a: "Una landing page en 5–7 días hábiles, una página empresarial en 2–3 semanas y un e-commerce en 3–5 semanas. Respetamos los tiempos acordados.",
  },
  {
    q: "¿La página web incluye posicionamiento SEO para Pasto?",
    a: "Sí. Todos los proyectos incluyen SEO básico: meta etiquetas, estructura semántica, velocidad optimizada y configuración de Google Search Console para que aparezcas en búsquedas locales de Pasto y Nariño.",
  },
  {
    q: "¿Qué necesito para comenzar?",
    a: "Solo tu idea y algo de información sobre tu negocio. Nosotros nos encargamos del diseño, desarrollo, dominio y hosting. No necesitas conocimientos técnicos.",
  },
  {
    q: "¿Ofrecen mantenimiento y soporte después de entregar la página?",
    a: "Sí. Ofrecemos planes de mantenimiento mensual que incluyen actualizaciones de contenido, seguridad y soporte técnico. También puedes contratarlo puntualmente cuando lo necesites.",
  },
];

const WA_LINK =
  "https://wa.me/573242264795?text=Hola%20CompuServicesSoft%2C%20me%20interesa%20una%20p%C3%A1gina%20web%20para%20mi%20negocio%20en%20Pasto";

export default function DesarrolloWebPage() {
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Diseño y Desarrollo de Páginas Web",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CompuServicesSoft",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "CC San Agustín Local 224A",
        "addressLocality": "Pasto",
        "addressRegion": "Nariño",
        "postalCode": "520001",
        "addressCountry": "CO"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Pasto"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Desarrollo Web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Landing Page" },
          "price": "500000",
          "priceCurrency": "COP"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Página Empresarial" },
          "price": "1200000",
          "priceCurrency": "COP"
        },
        {
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": "Tienda Online E-commerce" },
          "price": "2000000",
          "priceCurrency": "COP"
        }
      ]
    }
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.compuservicessoft.com" },
      { "@type": "ListItem", "position": 2, "name": "Desarrollo Web", "item": "https://www.compuservicessoft.com/desarrollo-web" },
    ]
  };

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Marcador SEO para Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }}
      />

      <NavbarWeb />

      {/* ──── HERO ──────────────────────────────────────────────────── */}
      <section
        id="hero-web"
        className="relative overflow-hidden min-h-dvh flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, #0a0010 0%, #1e0035 45%, #12001f 100%)",
        }}
      >
        {/* Partículas animadas de fondo */}
        <HeroParticles />

        {/* Orbe derecha — con animación de flotación */}
        <div
          className="absolute top-[-60px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-20 pointer-events-none dw-orb-animate"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Orbe izquierda inferior — con animación de flotación */}
        <div
          className="absolute bottom-[-40px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none dw-orb-animate-2"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Orbe extra centro-superior */}
        <div
          className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none dw-orb-animate"
          style={{
            background: "radial-gradient(circle, var(--color-accent-2) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container-site relative z-10 pt-24 pb-12 lg:pt-28">
          <div className="grid xl:grid-cols-2 gap-12 items-center">
            {/* Columna izquierda — texto con stagger */}
            <div className="dw-hero-stagger text-center xl:text-left">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full"
                style={{
                  color: "var(--color-primary)",
                  background: "rgba(140,82,255,0.12)",
                  border: "1px solid rgba(140,82,255,0.3)",
                }}
              >
                — Desarrollo Web en Pasto, Nariño —
              </span>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white">
                <span className="block">
                  Páginas Web <span className="dw-text-shimmer">Profesionales</span>
                </span>
                <span className="block mt-1 sm:mt-2 text-2xl sm:text-4xl md:text-5xl font-bold">
                  que generan <span style={{ color: "var(--color-primary)" }}>clientes</span>
                </span>
              </h1>

              <p
                className="hidden sm:block text-base sm:text-lg max-w-2xl mb-10 leading-relaxed xl:mx-0 mx-auto"
                style={{ color: "var(--color-text-muted)" }}
              >
                Diseñamos y desarrollamos páginas web, landing pages, tiendas
                online y software a la medida para empresas y emprendedores en
                Pasto, Nariño adaptadas a dispositivos moviles y computadores. <strong className="text-white">Diseño moderno, SEO incluido y entrega rápida.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center xl:justify-start">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gamer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide"
                >
                  <WhatsAppIcon />
                  Cotizar gratis por WhatsApp
                </a>
                <a
                  href="#servicios-web"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-200"
                  style={{
                    border: "1px solid rgba(140,82,255,0.4)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Ver servicios
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>

              {/* Badges de confianza con pulse */}
              <div className="mt-12 flex flex-wrap gap-4 justify-center xl:justify-start">
                {["✅ Presupuesto sin costo", "🚀 Entrega rápida", "📍 En Pasto, Nariño", "🔍 SEO incluido"].map((b, i) => (
                  <span
                    key={b}
                    className="text-sm px-4 py-2 rounded-full dw-badge-pulse"
                    style={{
                      color: "var(--color-text-muted)",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Columna derecha — terminal de código animado */}
            <div className="hidden xl:block">
              <AnimatedCodeTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* ──── CONTADOR DE CONFIANZA ───────────────────────────────────── */}
      <section
        className="py-10 px-4 sm:px-6 lg:px-8 border-y"
        style={{
          background: "linear-gradient(90deg, #0a0010 0%, #1e0035 50%, #0a0010 100%)",
          borderColor: "rgba(140,82,255,0.15)",
        }}
      >
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { end: 50, suffix: "+", label: "Proyectos entregados" },
              { end: 100, suffix: "%", label: "Clientes satisfechos" },
              { end: 5, suffix: "", prefix: "<", label: "Días entrega landing" },
              { end: 24, suffix: "/7", label: "Tu web siempre online" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 150} direction="up">
                <div className="text-3xl sm:text-4xl font-black dw-text-shimmer">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──── SERVICIOS ─────────────────────────────────────────────── */}
      <section id="servicios-web" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
                — Lo que ofrecemos —
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Nuestros{" "}
                <span className="text-primary">Servicios Web</span>
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
              <p className="text-gray-500 max-w-xl mx-auto">
                Desde una landing page sencilla hasta un sistema web complejo.
                Trabajamos con empresas de Pasto y Nariño.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicios.map((srv, srvIndex) => (
              <AnimatedSection key={srv.titulo} delay={srvIndex * 120} direction="up">
              <div
                className="relative bg-white rounded-3xl p-7 flex flex-col gap-5 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
                style={{
                  borderColor: srv.popular
                    ? "var(--color-primary)"
                    : "#e5e7eb",
                  boxShadow: srv.popular
                    ? "0 0 0 2px rgba(140,82,255,0.15)"
                    : undefined,
                }}
              >
                {srv.popular && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full text-white whitespace-nowrap"
                    style={{ background: "var(--color-primary)" }}
                  >
                    ⭐ Más elegido
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(140,82,255,0.1)",
                      border: "1px solid rgba(140,82,255,0.25)",
                      color: "var(--color-primary)",
                    }}
                  >
                    {srv.icon}
                  </div>
                  <h3 className="text-lg font-black text-gray-900">{srv.titulo}</h3>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">{srv.desc}</p>

                <ul className="flex flex-col gap-2 flex-1">
                  {srv.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--color-primary)" }}
                      >
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className="pt-4 border-t text-sm font-bold"
                  style={{
                    borderColor: "rgba(140,82,255,0.15)",
                    color: "var(--color-primary)",
                  }}
                >
                  {srv.precio}
                </div>

                <div className="flex flex-col gap-2">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                    style={{
                      background: srv.popular
                        ? "var(--color-primary)"
                        : "var(--color-dark)",
                    }}
                  >
                    <WhatsAppIcon />
                    Cotizar ahora
                  </a>
                  <Link
                    href={srv.href}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-80"
                    style={{
                      border: "1px solid rgba(140,82,255,0.3)",
                      color: "var(--color-primary)",
                    }}
                  >
                    Ver detalles →
                  </Link>
                </div>
              </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──── POR QUÉ ELEGIRNOS ─────────────────────────────────────── */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, #0a0010 0%, #1e0035 50%, #0a0010 100%)",
        }}
      >
        <div className="container-site">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              — Nuestra diferencia —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              ¿Por qué elegirnos para tu{" "}
              <span style={{ color: "var(--color-primary)" }}>
                página web en Pasto?
              </span>
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto mb-4"
              style={{ background: "var(--color-primary)" }}
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ventajas.map((v, i) => (
              <AnimatedSection key={v.titulo} delay={i * 120} direction="scale">
                <div className="card-gamer rounded-3xl p-8 text-center flex flex-col gap-4 h-full">
                  <div className="text-5xl animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{v.emoji}</div>
                  <h3 className="text-lg font-black text-white">{v.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {v.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──── PROCESO ───────────────────────────────────────────────── */}
      <section id="proceso-web" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
              — Cómo trabajamos —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Tu página web en{" "}
              <span className="text-primary">4 pasos</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pasos.map((p, i) => (
              <AnimatedSection key={p.num} delay={i * 200} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="bg-white rounded-3xl p-8 flex flex-col gap-4 border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group h-full">
                  <span
                    className="text-5xl font-black transition-colors duration-200"
                    style={{ color: "rgba(140,82,255,0.2)" }}
                  >
                    {p.num}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors duration-200">
                    {p.titulo}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──── FAQ ───────────────────────────────────────────────────── */}
      <section
        id="faq-web"
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="container-site max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--color-primary)" }}
            >
              — Preguntas frecuentes —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Preguntas sobre{" "}
              <span style={{ color: "var(--color-primary)" }}>
                páginas web en Pasto
              </span>
            </h2>
            <div
              className="w-16 h-1 rounded-full mx-auto"
              style={{ background: "var(--color-primary)" }}
            />
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.q} delay={i * 100}>
                <div
                  className="rounded-2xl p-6 flex flex-col gap-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3 className="font-bold text-base text-white">
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {faq.a}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──── EXPLORA NUESTROS SERVICIOS ──────────────────────────────── */}
      <section id="explora-web" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">
              — Explora en detalle —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              Conoce cada <span className="text-primary">servicio a fondo</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">
              Visita la página de cada servicio para conocer el proceso, precios, preguntas frecuentes y todo lo que necesitas saber.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                titulo: "Diseño Web Personalizado",
                href: "/desarrollo-web/diseno-web-personalizado",
                desc: "Páginas web únicas con los colores de tu marca, diseño responsive y reuniones personalizadas para entender tu visión.",
              },
              {
                titulo: "SEO y Posicionamiento Web",
                href: "/desarrollo-web/seo-posicionamiento-web-pasto",
                desc: "Haz que tu negocio aparezca en Google cuando busquen tus servicios en Pasto. SEO local, técnico y de contenido.",
              },
              {
                titulo: "Tiendas Online / E-commerce",
                href: "/desarrollo-web/tienda-online-ecommerce",
                desc: "Vende tus productos 24/7 con tu propia tienda virtual: catálogo, carrito, pasarela de pago y gestión de pedidos.",
              },
              {
                titulo: "Landing Pages",
                href: "/desarrollo-web/landing-page",
                desc: "Páginas de aterrizaje rápidas y optimizadas para convertir visitantes en clientes. Entrega en 5–7 días hábiles.",
              },
              {
                titulo: "Software a la Medida",
                href: "/desarrollo-web/software-a-la-medida",
                desc: "Sistemas web, ERP, CRM y aplicaciones personalizadas para automatizar los procesos de tu negocio en Pasto.",
              },
            ].map((s, i) => (
              <AnimatedSection key={s.href} delay={i * 100} direction="up">
                <Link
                  href={s.href}
                  className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-200 flex flex-col gap-3 group hover:-translate-y-1 h-full"
                >
                  <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors">{s.titulo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                  <span className="text-sm font-bold text-primary mt-2">Ver servicio completo →</span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ──── CTA FINAL IMMERSIVE ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[100dvh] sm:min-h-0 sm:py-32 flex flex-col items-center justify-center border-t"
        style={{
          background: "linear-gradient(135deg, var(--color-bg-card-dark) 0%, var(--color-bg-card) 50%, var(--color-bg-card-dark) 100%)",
          borderColor: "rgba(140,82,255,0.15)",
        }}
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at top center, var(--color-primary-light) 0%, transparent 70%)",
          }}
        />

        <div className="container-site relative z-10 text-center px-6">
          <AnimatedSection direction="scale">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full" style={{
              color: "var(--color-primary)",
              background: "rgba(140,82,255,0.12)",
              border: "1px solid rgba(140,82,255,0.3)",
            }}>
              ÚLTIMO PASO
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              ¿Listo para tener tu{" "}
              <span className="block mt-1 dw-text-shimmer">
                página web en Pasto?
              </span>
            </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Escríbenos hoy. Te respondemos rápido y te damos una cotización personalizada completamente <strong className="text-white">sin ningún costo</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gamer w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg sm:text-xl"
            >
              <WhatsAppIcon />
              Cotizar gratis
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-200"
              style={{
                border: "1px solid rgba(140,82,255,0.35)",
                color: "var(--color-text-muted)",
              }}
            >
              Volver al inicio
            </Link>
          </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer hideGlobalPhone={true} />
      <WhatsAppFloat hideGlobalPhone={true} />
    </main>
  );
}
