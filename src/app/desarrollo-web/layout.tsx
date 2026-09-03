import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Desarrollo Web en Pasto, Nariño | CompuServicesSoft",
  description:
    "Páginas web profesionales, landing pages, tiendas online y software a la medida en Pasto, Nariño. Diseño moderno, SEO optimizado y entrega rápida.",
  keywords: [
    /* Páginas web + Pasto */
    "páginas web Pasto",
    "página web Pasto",
    "diseño web Pasto",
    "desarrollo web Pasto",
    "hacer página web Pasto",
    "crear página web Pasto",
    "páginas web Nariño",
    "desarrollo web Nariño",
    "diseño web Nariño",
    "páginas web Colombia Pasto",

    /* Tipo de servicio */
    "landing page Pasto",
    "landing page empresa Pasto",
    "tienda online Pasto",
    "e-commerce Pasto",
    "tienda virtual Pasto",
    "página web empresa Pasto",
    "página web para negocio Pasto",
    "página web corporativa Pasto",
    "software a la medida Pasto",
    "desarrollo de software Pasto",
    "aplicaciones web Pasto",
    "sistema web Pasto",

    /* Preguntas frecuentes Google */
    "donde hacer páginas web en Pasto",
    "cuánto cuesta una página web en Pasto",
    "quién hace páginas web en Pasto",
    "agencia web Pasto",
    "agencia digital Pasto",
    "empresa desarrollo web Pasto",
    "programador web Pasto",
    "programador Pasto",
    "desarrollador web Pasto Nariño",

    /* SEO local */
    "página web con SEO Pasto",
    "posicionamiento web Pasto",
    "SEO Pasto",
    "marketing digital Pasto",
    "presencia online Pasto",
    "página web rápida Pasto",
    "página web moderna Pasto",
    "diseño responsive Pasto",

    /* Marca */
    "CompuServicesSoft desarrollo web",
    "CompuServicesSoft páginas web",
  ],
  authors: [{ name: "CompuServicesSoft — Carlos Esteban Trujillo Paz" }],
  creator: "CompuServicesSoft",
  publisher: "CompuServicesSoft",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.compuservicessoft.com/desarrollo-web",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.compuservicessoft.com/desarrollo-web",
    siteName: "CompuServicesSoft",
    title:
      "Desarrollo de Páginas Web en Pasto, Nariño | CompuServicesSoft",
    description:
      "Diseñamos páginas web profesionales, landing pages, tiendas online y software a la medida para empresas en Pasto, Nariño. Diseño moderno, SEO optimizado y entrega rápida. ¡Solicita tu presupuesto gratis!",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "Desarrollo de páginas web en Pasto, Nariño — CompuServicesSoft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Páginas Web en Pasto | CompuServicesSoft",
    description:
      "Landing pages, páginas empresariales, tiendas online y software a la medida en Pasto, Nariño. Diseño moderno y SEO incluido.",
    images: ["https://www.compuservicessoft.com/imagenes/local.webp"],
  },
  category: "technology",
};

export default function DesarrolloWebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Schema.org Service */
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Desarrollo de Páginas Web en Pasto",
    description:
      "Diseño y desarrollo de páginas web profesionales, landing pages, tiendas online y software a la medida para empresas y emprendedores en Pasto, Nariño, Colombia.",
    provider: {
      "@type": "LocalBusiness",
      name: "CompuServicesSoft",
      url: "https://www.compuservicessoft.com",
      telephone: "+573242264795",
      address: {
        "@type": "PostalAddress",
        streetAddress: "CC San Agustín, Local 224A",
        addressLocality: "Pasto",
        addressRegion: "Nariño",
        addressCountry: "CO",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Pasto",
    },
    serviceType: [
      "Diseño Web",
      "Desarrollo Web",
      "Landing Page",
      "Tienda Online",
      "E-commerce",
      "Software a la medida",
    ],
    url: "https://www.compuservicessoft.com/desarrollo-web",
  };

  /* Schema.org FAQPage */
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto cuesta una página web en Pasto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El precio de una página web en Pasto varía según el tipo de proyecto. Una landing page puede costar desde $500.000 COP, una página empresarial desde $1.200.000 COP y una tienda online desde $2.000.000 COP. Contáctanos por WhatsApp para una cotización personalizada sin costo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo tardan en hacer una página web?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dependiendo del tipo de página web: una landing page lista en 5–7 días hábiles, una página empresarial en 2–3 semanas y un e-commerce completo en 3–5 semanas. Trabajamos con entregas rápidas en Pasto y Nariño.",
        },
      },
      {
        "@type": "Question",
        name: "¿Incluyen posicionamiento SEO en las páginas web?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Todos nuestros proyectos incluyen optimización SEO básica: estructura semántica correcta, velocidad de carga optimizada, meta etiquetas, configuración de Google Search Console y buenas prácticas de posicionamiento para Pasto y Colombia.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué necesito para empezar mi página web en Pasto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Solo necesitas contarnos tu idea y tu presupuesto. Nosotros te asesoramos en todo: desde elegir el dominio y el hosting hasta el diseño y la publicación. No necesitas conocimientos técnicos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hacen páginas web para empresas de Pasto y Nariño?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, trabajamos con empresas, negocios locales y emprendedores de Pasto, Nariño y toda Colombia. Hemos desarrollado proyectos para tiendas, restaurantes, clínicas, servicios profesionales y más.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
      />
      {children}
    </>
  );
}
