import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriasCarrusel from "@/components/CategoriasCarrusel";
import ArmarPCBanner from "@/components/ArmarPCBanner";
import ProductosDestacados from "@/components/ProductosDestacados";
import AboutSection from "@/components/AboutSection";
import ServiciosSection from "@/components/ServiciosSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import DescargaCatalogo from "@/components/DescargaCatalogo";
import GoogleReviews from "@/components/GoogleReviews";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "CompuServicesSoft Pasto | Tienda de Computadores, Componentes y Servicio Técnico en Nariño",
  description:
    "Tienda de tecnología en Pasto, Nariño. Venta de SSD, RAM, tarjetas gráficas, procesadores, monitores y componentes para PC. Armado de computadores gamer y servicio técnico especializado. CC San Agustín Local 224A. ¡Envíos en Pasto!",
  keywords: [
    // Tienda
    "CompuServicesSoft Pasto",
    "tienda computadores Pasto",
    "tienda tecnología Pasto",
    "componentes PC Pasto",
    "CC San Agustín Pasto",
    "tienda tecnología Nariño",

    // SSD - Disco Sólido
    "SSD Pasto",
    "disco duro sólido Pasto",
    "disco sólido Pasto",
    "solid state drive Pasto",
    "HDD Pasto",
    "disco duro Pasto",

    // RAM - Memoria
    "RAM Pasto",
    "memoria RAM Pasto",
    "memoria Pasto",
    "memoria DDR4 Pasto",
    "memoria DDR5 Pasto",
    "memoria para PC Pasto",

    // GPU - Tarjeta Gráfica
    "tarjeta gráfica Pasto",
    "tarjeta de video Pasto",
    "GPU Pasto",
    "gráfica Pasto",
    "placa de video Pasto",

    // Procesador
    "procesador Pasto",
    "CPU Pasto",
    "procesador Intel Pasto",
    "procesador AMD Pasto",

    // Monitor
    "monitor Pasto",
    "pantalla Pasto",
    "monitor gaming Pasto",
    "monitor gamer Pasto",

    // Motherboard
    "motherboard Pasto",
    "tarjeta madre Pasto",
    "placa madre Pasto",

    // Periféricos
    "teclado Pasto",
    "mouse Pasto",
    "teclado gaming Pasto",
    "mouse gamer Pasto",

    // Ensamble
    "armar PC gamer Pasto",
    "ensamble PC Pasto",
    "PC gamer Pasto",
    "computador gamer Pasto",
    "armado PC Pasto",
    "ensamblar computador Pasto",

    // Servicios
    "servicio técnico computadores Pasto",
    "reparación computadores Pasto",
    "mantenimiento PC Pasto",

    // Otros componentes
    "fuente de poder Pasto",
    "gabinete Pasto",
    "ventiladores PC Pasto",
    "componentes gaming Pasto",
    "periféricos Pasto",
  ],
  openGraph: {
    title:
      "CompuServicesSoft Pasto | Tienda de Computadores y Componentes en Nariño",
    description:
      "Tu tienda de confianza en Pasto para componentes de PC, armado de computadores gamer y servicio técnico. Visítanos en CC San Agustín Local 224A.",
    url: "https://www.compuservicessoft.com",
    type: "website",
    images: [
      {
        url: "https://www.compuservicessoft.com/imagenes/local.webp",
        width: 1200,
        height: 630,
        alt: "CompuServicesSoft - Tienda de Tecnología en Pasto, Nariño",
      },
    ],
  },
  alternates: { canonical: "https://www.compuservicessoft.com" },
};

export default function Home() {
  /* Schema.org LocalBusiness - mejora SEO local en Google */
  const schemaLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CompuServicesSoft",
    "description": "Tienda de tecnología en Pasto especializada en componentes de PC, armado de computadores gamer y servicio técnico",
    "image": "https://www.compuservicessoft.com/imagenes/local.jpeg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "CC San Agustín Local 224A",
      "addressLocality": "Pasto",
      "addressRegion": "Nariño",
      "postalCode": "520001",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 1.2136,
      "longitude": -77.2811
    },
    "url": "https://www.compuservicessoft.com",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/CompuServicesSoft",
      "https://www.instagram.com/compuservicessoft"
    ]
  };

  /* Schema.org WebSite - ayuda con sitelinks search box */
  const schemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CompuServicesSoft",
    "url": "https://www.compuservicessoft.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.compuservicessoft.com/catalogo/buscar/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Schema.org para mejorar SEO local - Lo que SÍ funciona */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }}
      />

      <Navbar />
      <HeroSection />
      <CategoriasCarrusel />
      <ProductosDestacados />

      {/* Sección descarga catálogo */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 border-y border-gray-100">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              ¿Quieres ver todos nuestros productos?
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Descarga nuestro catálogo completo con precios actualizados en
              PDF.
            </p>
          </div>
          <DescargaCatalogo />
        </div>
      </section>

      <ArmarPCBanner />
      <AboutSection />
      <ServiciosSection />
      <GoogleReviews />
      <Footer />
      <WhatsAppFloat hideOverHero />
    </main>
  );
}
