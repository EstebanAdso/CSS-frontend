"use client";

import WhatsAppSelector from "@/components/WhatsAppSelector";
import BuildHud, { BuildBar } from "@/components/hero/BuildHud";
import HeroVideo from "@/components/hero/HeroVideo";

import Link from "next/link";
import { useState } from "react";

const EDGE_FADE =
  "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)," +
  "linear-gradient(to bottom, transparent, #000 6%, #000 94%, transparent)";

/* Patrón de pistas de circuito impreso para el fondo */
function CircuitPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" aria-hidden>
      <defs>
        <pattern id="hero-pcb" width="160" height="160" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M0 20H40L60 40H97" />
            <path d="M103 40L120 23H160" />
            <path d="M20 160V113L40 93V63" />
            <path d="M80 160V130L100 110H137" />
            <path d="M0 80H30L50 100H67" />
            <path d="M130 0V27" />
            <path d="M160 140H125L110 155" />
            <circle cx="100" cy="40" r="3" />
            <circle cx="40" cy="60" r="3" />
            <circle cx="70" cy="100" r="3" />
            <circle cx="130" cy="30" r="3" />
            <circle cx="140" cy="110" r="3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-pcb)" />
    </svg>
  );
}

export default function HeroSection() {
  const [step, setStep] = useState(0);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07000d]">
      {/* ── Fondo: brillo de marca, rejilla técnica y pistas de PCB ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 72% 48%, rgba(140,82,255,0.20), transparent 70%)," +
            "radial-gradient(ellipse 45% 40% at 0% 100%, rgba(0,229,255,0.07), transparent 70%)," +
            "radial-gradient(ellipse 50% 35% at 15% 0%, rgba(140,82,255,0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,96,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(192,96,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 85%)",
        }}
      />
      <div
        className="absolute inset-0 text-primary opacity-[0.16]"
        style={{
          maskImage: "linear-gradient(100deg, #000 0%, rgba(0,0,0,0.5) 35%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(100deg, #000 0%, rgba(0,0,0,0.5) 35%, transparent 60%)",
        }}
      >
        <CircuitPattern />
      </div>

      <div className="relative z-10 container-site px-4 sm:px-6 lg:px-8 pt-[6.5rem] short:pt-20 pb-3 sm:pt-28 sm:pb-24 lg:pt-24 lg:pb-16 min-h-[var(--app-h,100dvh)] flex flex-col sm:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:items-center gap-2 sm:gap-4 lg:gap-6">
        {/* ── Columna de texto ── */}
        <div className="relative z-10 text-center lg:text-left">
          {/* Badge ubicación */}
          <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(160,32,240,0.5)] bg-[rgba(122,0,212,0.15)] backdrop-blur-sm mb-7">
            <span className="w-2 h-2 rounded-full bg-active animate-pulse" />
            <span className="text-xs min-[380px]:text-sm font-medium text-text-muted">
              📍 Pasto, Nariño — CC San Agustín Local 224A
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-3xl short:text-[1.7rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight mb-7 short:mb-3 sm:mb-6">
            <span className="block">
              <span className="text-white">Compu</span><span className="text-primary">Services</span><span className="text-white">Soft</span>
            </span>
            <span className="block text-white text-2xl short:text-[1.15rem] sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mt-3 short:mt-1 sm:mt-1">
              Tu tienda de tecnología en Pasto
            </span>
          </h1>

          <div className="neon-line w-48 mx-auto lg:mx-0 mb-8 short:mb-4 sm:mb-7" />

          <p className="hidden sm:block max-w-2xl mx-auto lg:mx-0 text-lg xl:text-xl text-primary-lighter leading-relaxed mb-9">
            Encuentra los mejores componentes de cómputo, arma tu PC gamer ideal y obtén servicio técnico especializado. <strong className="text-primary-lighter">CompuServicesSoft</strong> —
            tu aliado tecnológico en Nariño.
          </p>

          {/* Botones CTA */}
          <div className="flex flex-row gap-2 sm:gap-3 justify-center lg:justify-start items-center mb-7 short:mb-3 sm:mb-7">
            <Link
              href="/catalogo"
              className="btn-gamer inline-flex items-center gap-2 whitespace-nowrap px-4 sm:px-6 py-3 rounded-xl text-sm font-bold tracking-wide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
              Ver Catálogo
            </Link>
            <Link
              href="/armar-pc-gamer"
              className="inline-flex items-center gap-2 whitespace-nowrap px-4 sm:px-6 py-3 rounded-xl text-sm font-bold tracking-wide border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              Arma tu PC
            </Link>
          </div>

          {/* Redes sociales */}
          <div
            className="inline-flex items-center gap-5 px-4 py-1.5 sm:px-5 sm:py-3 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <WhatsAppSelector className="flex items-center justify-center w-9 h-9 text-white/70 hover:text-whatsapp transition-colors duration-200" aria-label="WhatsApp">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </WhatsAppSelector>
            <a href="https://www.instagram.com/compuservicessoft/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-9 h-9 text-white/70 hover:text-[#e1306c] transition-colors duration-200" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="mailto:compuservicessoft@gmail.com"
              className="flex items-center justify-center w-9 h-9 text-white/70 hover:text-[#ea4335] transition-colors duration-200" aria-label="Gmail">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" /></svg>
            </a>
          </div>
        </div>

        {/* ── Video del ensamblaje de un PC ── */}
        <div className="relative flex-1 min-h-[280px] -mt-10 sm:mt-0 flex flex-col sm:block sm:flex-none sm:h-[460px] lg:h-[min(80vh,760px)] -mx-4 sm:mx-0 lg:translate-x-12 xl:translate-x-20 2xl:translate-x-36">
          {/* Halo de marca suave detrás del equipo (el video es transparente: no hay recuadro) */}
          <div
            className="absolute inset-[-15%] pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side at 52% 50%, rgba(140,82,255,0.16), rgba(140,82,255,0.05) 60%, transparent 100%)," +
                "radial-gradient(closest-side at 68% 74%, rgba(0,229,255,0.06), transparent 100%)",
            }}
          />
          {/* Caja cuadrada. En el video el contenido está centrado en x (48–49 %) y ocupa
              en y del 7 % al 84 %; en móvil el cuadrado es mayor que la pantalla (los márgenes
              son transparentes): el gabinete llena casi todo el ancho sin salirse del alto, y
              translate centra el contenido. Se centra con left/top 50 % + translate: un ítem de
              grid más grande que su celda se alinea al inicio y se correría a la derecha. */}
          <div className="absolute inset-x-0 top-0 bottom-9 sm:bottom-0 [container-type:size]">
            <div
              className="absolute left-1/2 top-1/2 size-[min(140vw,116cqh)] -translate-x-[49%] -translate-y-[42%] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:size-[min(100cqw,100cqh)]"
              style={{
                /* Solo un desvanecido en el último 6 % del borde: las piezas que entran
                   volando desde fuera del encuadre no se cortan en seco */
                maskImage: EDGE_FADE,
                WebkitMaskImage: EDGE_FADE,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              <HeroVideo onStep={setStep} />
            </div>
          </div>

          {/* Panel completo desde sm; en móvil, barra de una línea debajo del ensamblaje */}
          <div className="hidden sm:block absolute sm:left-4 sm:bottom-6 lg:-left-10 xl:-left-16">
            <BuildHud step={step} />
          </div>
          <div className="sm:hidden absolute left-6 right-24 bottom-2">
            <BuildBar step={step} />
          </div>
        </div>
      </div>

      {/* Flecha scroll */}
      <button
        onClick={() => {
          document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-text-muted/50 hover:text-primary-lighter transition-colors duration-300"
        aria-label="Ver categorías"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explorar</span>
        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Borde inferior degradado */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }} />
    </section>
  );
}
