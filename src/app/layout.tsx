import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/* SEO completo para CompuServicesSoft - Pasto, Nariño, Colombia */
export const metadata: Metadata = {
  title:
    "CompuServicesSoft | Tienda de Computadores y Servicio Técnico en Pasto, Nariño",
  description:
    "CompuServicesSoft en Pasto, Nariño: compra SSD, RAM, tarjetas gráficas, procesadores, monitores y periféricos. Armado de PCs gamer y servicio técnico especializado. CC San Agustín Local 224A. ¡Envíos y atención personalizada!",
  keywords: [
    /* Productos específicos + Pasto */
    "SSD Pasto",
    "SSD Nariño",
    "RAM Pasto",
    "RAM DDR4 Pasto",
    "RAM DDR5 Pasto",
    "tarjeta gráfica Pasto",
    "GPU Pasto",
    "procesador Pasto",
    "procesador Intel Pasto",
    "procesador AMD Pasto",
    "monitor Pasto",
    "monitor gamer Pasto",
    "NVMe Pasto",
    "SSD NVMe Pasto",
    "motherboard Pasto",
    "board Pasto",
    "fuente de poder Pasto",
    "disco duro Pasto",
    "disco SSD Pasto",
    "memoria RAM Pasto",
    "tarjeta de video Pasto",

    /* Búsquedas long-tail - Donde comprar */
    "donde comprar RAM en Pasto",
    "donde comprar SSD en Pasto",
    "donde comprar GPU en Pasto",
    "donde comprar componentes PC Pasto",
    "donde armar PC en Pasto",
    "donde venden procesadores en Pasto",
    "donde comprar tarjeta gráfica Pasto",

    /* Mejor tienda / comparativas */
    "mejor tienda computadores Pasto",
    "mejor tienda tecnología Pasto",
    "mejores precios componentes Pasto",
    "tienda confiable computadores Pasto",
    "mejor lugar comprar PC Pasto",

    /* Gaming específico */
    "componentes gaming Pasto",
    "PC gamer Pasto",
    "armar PC gamer Pasto",
    "armar computador gamer Pasto",
    "componentes PC gamer Pasto",
    "tarjeta gráfica gaming Pasto",
    "monitor gaming Pasto",
    "periféricos gaming Pasto",
    "teclado gaming Pasto",
    "mouse gaming Pasto",

    /* Armado de PC */
    "armar PC Pasto",
    "armar computador Pasto",
    "armado de PC Pasto",
    "cotizar PC Pasto",
    "ensamblar computador Pasto",
    "configurar PC Pasto",

    /* Venta de componentes */
    "venta componentes computador Pasto",
    "venta tarjetas gráficas Pasto",
    "venta RAM Pasto",
    "venta SSD Pasto",
    "venta procesadores Pasto",
    "venta componentes PC Pasto Nariño",

    /* Tienda + ubicación */
    "tienda computadores Pasto",
    "tienda tecnología Pasto",
    "tienda componentes PC Pasto",
    "tienda tecnología Pasto Nariño",
    "tienda PC gamer Pasto",
    "CC San Agustín Pasto tecnología",
    "tienda centro Pasto computadores",

    /* Servicios técnicos */
    "servicio técnico computadores Pasto",
    "mantenimiento computadores Pasto",
    "reparación computadores Pasto",
    "reparación PC Pasto",
    "mantenimiento PC Pasto",
    "formateo computador Pasto",
    "instalación Windows Pasto",
    "instalación sistema operativo Pasto",
    "limpieza computador Pasto",
    "cambio pasta térmica Pasto",

    /* Marcas + Pasto */
    "Intel Pasto",
    "AMD Pasto",
    "NVIDIA Pasto",
    "Kingston RAM Pasto",
    "Corsair Pasto",
    "ASUS Pasto",
    "MSI Pasto",
    "Gigabyte Pasto",

    /* Precios */
    "precio RAM Pasto",
    "precio SSD Pasto",
    "precio tarjeta gráfica Pasto",
    "precio armar PC Pasto",
    "precios componentes Pasto",
    "computadores económicos Pasto",

    /* Nariño específico */
    "componentes PC Nariño",
    "computadores Nariño",
    "tecnología Nariño",
    "SSD Nariño Colombia",

    /* Marca */
    "CompuServicesSoft",
    "CompuServicesSoft Pasto",

    /* Generales tecnología */
    "computador Pasto",
    "PC Pasto",
    "laptop Pasto",
    "notebook Pasto",
    "periféricos Pasto",
    "accesorios PC Pasto",
    "disco duro SSD Pasto Colombia",
    "componentes originales Pasto",
    "garantía componentes Pasto",
  ],
  authors: [{ name: "CompuServicesSoft - Carlos Esteban Trujillo Paz" }],
  creator: "CompuServicesSoft",
  publisher: "CompuServicesSoft",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.compuservicessoft.com",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.compuservicessoft.com",
    siteName: "CompuServicesSoft",
    title:
      "CompuServicesSoft | Tienda de Computadores y Servicio Técnico en Pasto, Nariño",
    description:
      "Compra SSD, RAM, GPU, procesadores y más copmonentes de computador en Pasto, Nariño. Armado de PCs gamer y servicio técnico especializado. ¡Visítanos en el CC San Agustín Local 224A!",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "CompuServicesSoft - Tienda de tecnología en Pasto, Nariño — CC San Agustín",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CompuServicesSoft | Tienda de Computadores en Pasto, Nariño",
    description:
      "Compra SSD, RAM, GPU, procesadores y periféricos en Pasto, Nariño. Armado de PCs gamer y servicio técnico especializado en el CC San Agustín.",
    images: ["https://www.compuservicessoft.com/imagenes/local.webp"],
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Datos estructurados Schema.org para negocio local */
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CompuServicesSoft",
    description:
      "Venta de componentes de computador, periféricos, armado de PCs y servicio técnico especializado en Pasto, Nariño, Colombia.",
    url: "https://www.compuservicessoft.com",
    telephone: "+573242264795",
    email: "compuservicessoft@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "CC San Agustín, Local 224A (Segundo piso al fondo)",
      addressLocality: "Pasto",
      addressRegion: "Nariño",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "1.2136",
      longitude: "-77.2811",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    sameAs: [
      "https://www.instagram.com/compuservicessoft/",
      "https://wa.me/573242264795",
    ],
    priceRange: "$$",
    image: "https://www.compuservicessoft.com/imagenes/local.webp",
    hasMap: "https://maps.app.goo.gl/e3nUAFL7zDNTMF9i7",
    knowsAbout: [
      "Venta de componentes de computador",
      "Servicio técnico de computadores",
      "Armado de PC gamer",
      "SSD",
      "RAM",
      "Procesadores",
      "Tarjetas gráficas",
      "Motherboards",
    ],
    // Actualizar reviewCount cuando llegues a 30, 50, 100+ reseñas
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "20",
      bestRating: "5",
      worstRating: "1",
    },
  };

  /* Schema.org FAQPage para preguntas frecuentes */
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Dónde está CompuServicesSoft en Pasto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Estamos ubicados en el CC San Agustín, Local 224A (segundo piso al fondo), Pasto, Nariño, Colombia. Horario: Lunes a Sábado de 10:00 AM a 7:00 PM.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué productos venden en CompuServicesSoft?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vendemos componentes de computador como SSD, RAM, tarjetas gráficas, procesadores, motherboards, monitores, teclados, mouse y periféricos gaming. También ofrecemos armado de PC gamer y servicio técnico especializado.",
        },
      },
      {
        "@type": "Question",
        name: "¿Arman computadores personalizados en Pasto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, en CompuServicesSoft armamos computadores personalizados según tus necesidades y presupuesto. Ofrecemos asesoría para gaming, diseño, oficina y más. Contáctanos por WhatsApp al +57 317 403 4349 o al +57 324 226 4795.",
        },
      },
      {
        "@type": "Question",
        name: "¿Tienen garantía los productos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, todos nuestros productos cuentan con garantía según el fabricante. Las garantías varían por categoría de producto. Consulta las políticas específicas en nuestra tienda o por WhatsApp.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hacen envíos en Pasto?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, realizamos envíos a domicilio en Pasto y Nariño. Contáctanos por WhatsApp al +57 324 226 4795 o +57 317 403 4349 para coordinar tu pedido y conocer los costos de envío.",
        },
      },
    ],
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }}
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
