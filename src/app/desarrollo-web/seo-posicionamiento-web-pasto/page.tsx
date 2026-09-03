import NavbarWeb from "@/components/desarrollo-web/NavbarWeb";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO y Posicionamiento Web en Pasto | CompuServicesSoft",
  description:
    "Posiciona tu negocio en Google con SEO local en Pasto, Nariño. Optimización on-page, Search Console y estrategia de contenido. Cotiza gratis.",
  keywords: [
    "SEO Pasto",
    "posicionamiento web Pasto",
    "SEO local Pasto",
    "posicionamiento Google Pasto",
    "aparecer en Google Pasto",
    "agencia SEO Pasto",
    "consultor SEO Pasto",
    "optimización web Pasto",
    "SEO Nariño",
    "posicionamiento web Nariño",
    "Google Search Console Pasto",
    "SEO para negocios Pasto",
    "marketing digital Pasto",
    "primera página Google Pasto",
    "SEO local Nariño Colombia",
    "estrategia SEO Pasto",
  ],
  alternates: { canonical: "https://www.compuservicessoft.com/desarrollo-web/seo-posicionamiento-web-pasto" },
  openGraph: {
    title: "SEO y Posicionamiento Web en Pasto — CompuServicesSoft",
    description:
      "Haz que tu negocio en Pasto aparezca en Google. SEO local, optimización técnica y estrategia de contenido para más visibilidad y más clientes.",
    url: "https://www.compuservicessoft.com/desarrollo-web/seo-posicionamiento-web-pasto",
    type: "website",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "SEO y Posicionamiento Web en Pasto — CompuServicesSoft",
      },
    ],
  },
};

const WA_LINK =
  "https://wa.me/573242264795?text=Hola%20CompuServicesSoft%2C%20me%20interesa%20el%20servicio%20de%20SEO%20para%20mi%20negocio%20en%20Pasto";

const serviciosSEO = [
  {
    titulo: "SEO Local para Pasto y Nariño",
    desc: "Optimizamos tu presencia digital para que cuando alguien busque tus servicios en Pasto, tu negocio aparezca en los primeros resultados. Configuramos tu ficha de Google Business y optimizamos para búsquedas con intención local.",
  },
  {
    titulo: "Optimización On-Page",
    desc: "Mejoramos la estructura de tu sitio web: títulos, meta descripciones, encabezados, URLs amigables, imágenes optimizadas y contenido relevante. Todo lo que Google necesita para entender y posicionar tu web.",
  },
  {
    titulo: "Velocidad y Rendimiento Web",
    desc: "Google premia las páginas rápidas. Optimizamos el tiempo de carga de tu web, las imágenes, el código y la experiencia del usuario para mejorar tu Core Web Vitals y subir en el ranking.",
  },
  {
    titulo: "Google Search Console",
    desc: "Configuramos y monitoreamos tu sitio en Google Search Console. Analizamos qué búsquedas te traen tráfico, detectamos errores de indexación y te entregamos reportes claros de tu posicionamiento.",
  },
  {
    titulo: "Estructura Semántica y Schema.org",
    desc: "Implementamos datos estructurados (Schema.org) para que Google entienda mejor tu negocio: servicios, precios, ubicación, horarios y reseñas. Esto mejora cómo apareces en los resultados de búsqueda.",
  },
  {
    titulo: "Estrategia de Contenido SEO",
    desc: "Te asesoramos sobre qué contenido crear para atraer clientes potenciales desde Google. Palabras clave locales, preguntas frecuentes y temas relevantes para tu industria en Pasto.",
  },
];

const resultados = [
  { numero: "100%", desc: "de nuestros proyectos incluyen SEO básico optimizado para Pasto" },
  { numero: "<3s", desc: "tiempo de carga objetivo para todas las páginas web que desarrollamos" },
  { numero: "Top 10", desc: "posición objetivo en Google para búsquedas locales en Pasto" },
  { numero: "24/7", desc: "tu página web trabajando para ti, visible las 24 horas del día" },
];

const faqs = [
  {
    q: "¿Qué es el SEO local y por qué es importante para mi negocio en Pasto?",
    a: "El SEO local es el proceso de optimizar tu presencia online para que aparezcas en los resultados de búsqueda cuando personas en Pasto buscan tus servicios. Por ejemplo, si tienes un restaurante, queremos que cuando alguien busque 'restaurante en Pasto' tu negocio aparezca entre los primeros. El 46% de todas las búsquedas en Google tienen intención local.",
  },
  {
    q: "¿Cuánto tiempo tarda en funcionar el SEO?",
    a: "El SEO es una estrategia a mediano y largo plazo. Los primeros resultados se empiezan a ver entre 2 y 4 meses, dependiendo de la competencia en tu sector. Sin embargo, las optimizaciones técnicas que hacemos desde el primer día mejoran la experiencia del usuario inmediatamente.",
  },
  {
    q: "¿El SEO está incluido en el diseño de la página web?",
    a: "Sí. Todas las páginas web que desarrollamos incluyen SEO básico: estructura semántica, meta etiquetas, velocidad optimizada, datos estructurados y configuración de Google Search Console. Si necesitas un trabajo de SEO más avanzado o continuo, ofrecemos planes mensuales.",
  },
  {
    q: "¿Cómo sé si mi página web está bien posicionada en Google?",
    a: "Te configuramos Google Search Console y te explicamos cómo usarlo. Ahí puedes ver en qué posición apareces para cada búsqueda, cuántas personas ven tu sitio y cuántas hacen clic. También podemos enviarte reportes periódicos si contratas nuestro plan de mantenimiento.",
  },
  {
    q: "¿Cuánto cuesta el servicio de SEO en Pasto?",
    a: "El SEO básico está incluido en todos nuestros proyectos web. Para un trabajo de SEO avanzado y continuo (análisis mensual, creación de contenido, monitoreo), ofrecemos planes desde $300.000 COP/mes. Contáctanos para una cotización según tu caso.",
  },
];

export default function SEOPastoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "SEO y Posicionamiento Web",
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
    url: "https://www.compuservicessoft.com/desarrollo-web/seo-posicionamiento-web-pasto",
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
      { "@type": "ListItem", position: 3, name: "SEO Posicionamiento Web", item: "https://www.compuservicessoft.com/desarrollo-web/seo-posicionamiento-web-pasto" },
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
            <li style={{ color: "var(--color-primary)" }}>SEO Posicionamiento Web</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden flex items-center px-4 sm:px-6 lg:px-8 py-20 lg:py-28" style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 45%, #12001f 100%)" }}>
        <div className="absolute top-[-60px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="container-site relative z-10 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full" style={{ color: "var(--color-primary)", background: "rgba(140,82,255,0.12)", border: "1px solid rgba(140,82,255,0.3)" }}>
            SEO en Pasto, Nariño
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
            <span className="text-gradient-gamer">SEO</span> y Posicionamiento Web
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">para Negocios en Pasto</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            ¿Tu negocio no aparece en Google cuando buscan tus servicios en Pasto? Hacemos que tu página web se posicione en los
            primeros resultados con <strong className="text-white">SEO local, optimización técnica y estrategia de contenido</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide">
              Quiero aparecer en Google
            </a>
            <Link href="/desarrollo-web" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base tracking-wide transition-all duration-200" style={{ border: "1px solid rgba(140,82,255,0.4)", color: "var(--color-text-muted)" }}>
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* RESULTADOS / STATS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {resultados.map((r) => (
              <div key={r.desc} className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-primary mb-2">{r.numero}</div>
                <p className="text-sm text-gray-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS SEO */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">Nuestros servicios SEO</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ¿Qué hacemos para <span className="text-primary">posicionar tu web en Pasto?</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">
              Aplicamos las mejores prácticas de SEO para que Google entienda, indexe y posicione tu negocio en Pasto y Nariño.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviciosSEO.map((s) => (
              <div key={s.titulo} className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200">
                <h3 className="text-lg font-black text-gray-900 mb-3">{s.titulo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE SEO ES IMPORTANTE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 50%, #0a0010 100%)" }}>
        <div className="container-site max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-primary)" }}>La realidad</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              ¿Por qué tu negocio en Pasto <span style={{ color: "var(--color-primary)" }}>necesita SEO?</span>
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto mb-8" style={{ background: "var(--color-primary)" }} />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { titulo: "El 93% de las experiencias online empiezan en Google", desc: "Si tu negocio no aparece en Google, es como si no existiera para la mayoría de tus clientes potenciales en Pasto." },
              { titulo: "El 46% de las búsquedas tienen intención local", desc: "Casi la mitad de las personas buscan negocios cerca de ellos. 'Restaurante en Pasto', 'abogado Pasto', 'tienda de ropa Pasto'... ¿estás ahí?" },
              { titulo: "El 75% no pasa de la primera página", desc: "Si tu web está en la página 2 de Google, el 75% de las personas nunca la verán. Estar en la primera página es fundamental." },
              { titulo: "SEO trae clientes que ya te buscan", desc: "A diferencia de la publicidad, el SEO atrae personas que ya están buscando exactamente lo que ofreces. Son clientes con alta intención de compra." },
            ].map((item) => (
              <div key={item.titulo} className="card-gamer rounded-3xl p-8 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-white">{item.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
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
              Dudas sobre <span className="text-primary">SEO en Pasto</span>
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
              { titulo: "Diseño Web Personalizado", href: "/desarrollo-web/diseno-web-personalizado", desc: "Páginas web únicas con los colores de tu marca." },
              { titulo: "Tiendas Online", href: "/desarrollo-web/tienda-online-ecommerce", desc: "Vende tus productos 24/7 con tu propia tienda virtual." },
              { titulo: "Landing Pages", href: "/desarrollo-web/landing-page", desc: "Páginas de aterrizaje optimizadas para convertir visitantes." },
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
            ¿Quieres que tu negocio <span className="text-gradient-gamer">aparezca en Google?</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Escríbenos y te explicamos cómo podemos posicionar tu página web en los primeros resultados de búsqueda en Pasto. <strong className="text-white">Consulta sin costo.</strong>
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg sm:text-xl">
            Consultar sobre SEO gratis
          </a>
        </div>
      </section>

      <Footer hideGlobalPhone={true} />
      <WhatsAppFloat hideGlobalPhone={true} />
    </main>
  );
}
