"use client";

import { useState, useEffect, useRef } from "react";

const NUMEROS = [
  { label: "+(57) 317 403 4349", numero: "573174034349" },
  { label: "+(57) 324 226 4795", numero: "573242264795" },
];

const WSP_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

type Props = {
  hideGlobalPhone?: boolean;
  /** Oculto mientras se ve el hero (#hero); aparece con animación al salir de él */
  hideOverHero?: boolean;
};

export default function WhatsAppFloat({ hideGlobalPhone = false, hideOverHero = false }: Props = {}) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(!hideOverHero);
  const ref = useRef<HTMLDivElement>(null);

  /* Mostrar solo cuando el hero ya casi salió de pantalla (queda menos del 20 % visible) */
  useEffect(() => {
    if (!hideOverHero) return;
    const hero = document.getElementById("hero");
    if (!hero) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        const fuera = !entry.isIntersecting || entry.intersectionRatio < 0.2;
        setVisible(fuera);
        if (!fuera) setOpen(false);
      },
      { threshold: [0, 0.2, 0.5, 1] },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [hideOverHero]);

  const activeNumeros = hideGlobalPhone
    ? NUMEROS.filter((n) => !n.label.includes("317 403 4349"))
    : NUMEROS;

  /* Cerrar al hacer clic fuera */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div
      ref={ref}
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-75 pointer-events-none"
      }`}
    >

      {/* Popover tipo nube — aparece encima del botón, alineado a la derecha */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-visible w-56">
          {/* Flecha apuntando hacia abajo-derecha */}
          <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
          <div className="overflow-hidden rounded-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-2">
              ¿A cuál número escribir?
            </p>
            {activeNumeros.map((n) => (
              <a
                key={n.numero}
                href={`https://wa.me/${n.numero}?text=Hola%20vengo%20de%20la%20p%C3%A1gina%20CompuServicesSoft,%20me%20interesa%20preguntar%20por%20productos`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-800"
              >
                <span className="text-whatsapp">{WSP_ICON}</span>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <div className="relative">
        <button
          onClick={() => {
            if (activeNumeros.length === 1) {
              window.open(`https://wa.me/${activeNumeros[0].numero}?text=Hola%20vengo%20de%20la%20p%C3%A1gina%20CompuServicesSoft`, "_blank");
            } else {
              setOpen((v) => !v);
            }
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          aria-label="Contactar por WhatsApp"
          className="flex items-center gap-3 group"
        >
          {/* Tooltip */}
          <span
            className={`bg-surface border border-primary-light/40 text-text-muted text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
              hover && !open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            ¡Escríbenos!
          </span>

          {/* Círculo verde */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--color-whatsapp), #128c7e)",
              boxShadow: hover
                ? "0 0 0 4px rgba(37,211,102,0.3), 0 8px 24px rgba(37,211,102,0.4)"
                : "0 4px 16px rgba(37,211,102,0.3)",
              transform: hover ? "scale(1.1)" : "scale(1)",
            }}
          >
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </button>

        {/* Pulso animado (solo mientras el botón está visible) */}
        {visible && (
          <span
            className="absolute right-0 bottom-0 w-14 h-14 rounded-full animate-ping opacity-30 pointer-events-none"
            style={{ background: "var(--color-whatsapp)" }}
          />
        )}
      </div>
    </div>
  );
}
