import NavbarWeb from "@/components/desarrollo-web/NavbarWeb";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diseño Web Personalizado en Pasto | CompuServicesSoft",
  description:
    "Páginas web únicas con los colores de tu marca en Pasto, Nariño. Diseño responsive, moderno y optimizado. Reunión sin costo.",
  keywords: [
    "diseño web personalizado Pasto",
    "diseño páginas web Pasto",
    "diseñador web Pasto",
    "diseño web a medida Pasto",
    "diseño web profesional Pasto",
    "diseño web moderno Pasto",
    "diseño responsive Pasto",
    "diseño web empresas Pasto",
    "diseño web Nariño",
    "páginas web personalizadas Pasto",
    "diseño web adaptable celular Pasto",
    "diseño web con marca Pasto",
    "maquetación web Pasto",
    "diseño UX UI Pasto",
  ],
  alternates: { canonical: "https://www.compuservicessoft.com/desarrollo-web/diseno-web-personalizado" },
  openGraph: {
    title: "Diseño Web Personalizado en Pasto — CompuServicesSoft",
    description:
      "Páginas web diseñadas a tu medida con los colores de tu marca. Diseño moderno, responsive y listo para vender. Estamos en Pasto, Nariño.",
    url: "https://www.compuservicessoft.com/desarrollo-web/diseno-web-personalizado",
    type: "website",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "Diseño Web Personalizado en Pasto — CompuServicesSoft",
      },
    ],
  },
};

const WA_LINK =
  "https://wa.me/573242264795?text=Hola%20CompuServicesSoft%2C%20quiero%20un%20dise%C3%B1o%20web%20personalizado%20para%20mi%20negocio%20en%20Pasto";

const caracteristicas = [
  {
    titulo: "Diseño con tu Identidad de Marca",
    desc: "Usamos los colores, logotipo y tipografía de tu empresa para que tu página web refleje al 100% quién eres. Si aún no tienes marca, te ayudamos a definirla.",
  },
  {
    titulo: "Responsive: Perfecta en Celular y PC",
    desc: "Tu página se verá impecable en cualquier dispositivo. El 70% de tus clientes en Pasto te buscarán desde el celular — tu web estará lista para ellos.",
  },
  {
    titulo: "Diseño Orientado a Conversión",
    desc: "No solo hacemos páginas bonitas. Diseñamos pensando en que tus visitantes se conviertan en clientes: botones de acción claros, formularios optimizados y llamados a la acción estratégicos.",
  },
  {
    titulo: "Velocidad de Carga Optimizada",
    desc: "Un diseño ligero y optimizado para que tu web cargue en menos de 3 segundos. Google premia las páginas rápidas y tus visitantes no se irán por demora.",
  },
  {
    titulo: "Reunión de Diseño Personalizada",
    desc: "Antes de empezar, hacemos una reunión presencial o virtual contigo para entender tu negocio, tus objetivos y tus gustos. Así el diseño será exactamente lo que necesitas.",
  },
  {
    titulo: "Revisiones Incluidas",
    desc: "Te presentamos el diseño y hacemos ajustes hasta que quedes satisfecho. No publicamos nada sin tu aprobación final.",
  },
];

const proceso = [
  { num: "01", titulo: "Reunión Inicial", desc: "Nos reunimos contigo (presencial en Pasto o virtual) para conocer tu negocio, tu público objetivo y tus preferencias de diseño. Esta reunión es sin costo." },
  { num: "02", titulo: "Propuesta de Diseño", desc: "Creamos una propuesta visual con la estructura, colores y estilo de tu página. Te la presentamos para tu retroalimentación." },
  { num: "03", titulo: "Diseño Final", desc: "Con tus comentarios, refinamos el diseño hasta que sea exactamente lo que imaginas. Cada sección, cada botón, cada detalle." },
  { num: "04", titulo: "Desarrollo y Entrega", desc: "Convertimos el diseño aprobado en una página web funcional, rápida y optimizada. La publicamos y te entregamos los accesos." },
];

const faqs = [
  {
    q: "¿Puedo elegir los colores y el estilo de mi página web?",
    a: "Sí, absolutamente. El diseño se hace 100% a tu gusto. Usamos los colores de tu marca, tu logotipo y el estilo visual que prefieras. Si no tienes marca definida, te asesoramos para elegir una paleta de colores profesional.",
  },
  {
    q: "¿El diseño web se adapta a celulares?",
    a: "Sí. Todos nuestros diseños son responsive, es decir, se adaptan automáticamente a celulares, tablets y computadores. Esto es fundamental porque la mayoría de personas en Pasto navegan desde el celular.",
  },
  {
    q: "¿Cuántas revisiones del diseño puedo pedir?",
    a: "Incluimos hasta 3 rondas de revisiones en todos nuestros planes. Queremos que quedes completamente satisfecho con el resultado antes de publicar tu página.",
  },
  {
    q: "¿Cuánto cuesta un diseño web personalizado en Pasto?",
    a: "Depende de la complejidad. Un diseño para landing page desde $500.000 COP, para página empresarial desde $1.200.000 COP. Escríbenos por WhatsApp para darte un presupuesto exacto según lo que necesitas.",
  },
  {
    q: "¿La reunión de diseño tiene costo?",
    a: "No. La reunión inicial donde hablamos sobre tu proyecto, tus necesidades y tu presupuesto es completamente gratuita. Puedes visitarnos en el CC San Agustín en Pasto o hacerla por videollamada.",
  },
];

export default function DisenoWebPersonalizadoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Diseño Web Personalizado",
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
    url: "https://www.compuservicessoft.com/desarrollo-web/diseno-web-personalizado",
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
      { "@type": "ListItem", position: 3, name: "Diseño Web Personalizado", item: "https://www.compuservicessoft.com/desarrollo-web/diseno-web-personalizado" },
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
            <li style={{ color: "var(--color-primary)" }}>Diseño Personalizado</li>
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
            Diseño Web en Pasto
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 text-white">
            Diseño Web <span className="text-gradient-gamer">Personalizado</span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">para tu Negocio en Pasto</span>
          </h1>

          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            No usamos plantillas genéricas. Cada página web que diseñamos es <strong className="text-white">única, hecha a medida</strong> con los colores de tu marca,
            adaptada a celulares y pensada para convertir visitantes en clientes. Nos reunimos contigo para entender tu visión.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm sm:text-base tracking-wide">
              Solicitar diseño personalizado
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
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary mb-3">Nuestro enfoque</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              ¿Qué incluye nuestro <span className="text-primary">Diseño Web Personalizado?</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">
              Cada detalle de tu página web está pensado para representar tu negocio en Pasto y generar confianza en tus clientes.
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

      {/* PROCESO */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0a0010 0%, #1e0035 50%, #0a0010 100%)" }}>
        <div className="container-site">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--color-primary)" }}>Paso a paso</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Nuestro Proceso de <span style={{ color: "var(--color-primary)" }}>Diseño Web</span>
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
              Dudas sobre <span className="text-primary">Diseño Web Personalizado</span>
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
              { titulo: "SEO y Posicionamiento", href: "/desarrollo-web/seo-posicionamiento-web-pasto", desc: "Aparece en Google cuando busquen tus servicios en Pasto." },
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
            ¿Quieres un diseño web <span className="text-gradient-gamer">único para tu negocio?</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            Agenda una reunión gratuita con nosotros. Te escuchamos, entendemos tu proyecto y te damos una cotización <strong className="text-white">sin ningún costo</strong>.
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gamer inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-lg sm:text-xl">
            Agendar reunión gratis
          </a>
        </div>
      </section>

      <Footer hideGlobalPhone={true} />
      <WhatsAppFloat hideGlobalPhone={true} />
    </main>
  );
}
