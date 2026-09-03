import type { MetadataRoute } from "next";

// Indica a los motores de busqueda que pueden indexar el sitio y que no deben indexar la API
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: "https://www.compuservicessoft.com/sitemap.xml",
  };
}
