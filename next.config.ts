import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/armar.html",
        destination: "/armar-pc-gamer",
        permanent: true,
      },
      {
        source: "/armar",
        destination: "/armar-pc-gamer",
        permanent: true,
      },
      {
        source: "/:path*.html",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    /* Permite imágenes desde el servidor de producción cuando la URL cambie */
    remotePatterns: [
      {
        /* Las fotos del catálogo viven en Cloudinary (las sube Zentivy) */
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "compuservicessoft.com",
      },
      {
        /* Servidor local de desarrollo */
        protocol: "http",
        hostname: "localhost",
      },
    ],
    /* Fallback: si la imagen no carga, no rompe la página */
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

export default nextConfig;
