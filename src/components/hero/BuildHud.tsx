import { STEPS } from "./buildTimeline";

/* Versión móvil: una sola línea debajo del video, sin tapar el ensamblaje */
export function BuildBar({ step }: { step: number }) {
  const total = STEPS.length;
  const resetting = step < 0;
  const done = resetting ? 0 : step;
  const ready = done >= total;
  const label = ready ? "Sistema listo · POST OK" : resetting ? "Reiniciando…" : STEPS[done].label;

  return (
    <div className="pointer-events-none select-none font-mono text-[11px]" aria-hidden>
      <div className="flex items-center justify-between gap-3 text-white/70">
        <span className="flex items-center gap-1.5 truncate">
          <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${ready ? "bg-active" : "bg-accent animate-pulse"}`} />
          <span className={ready ? "text-active" : "text-accent"}>{ready ? "ONLINE" : "BUILD"}</span>
          <span className="truncate">{label}</span>
        </span>
        <span className="text-white/40">{Math.round((done / total) * 100)}%</span>
      </div>
      <div className="mt-1.5 h-[3px] rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary via-accent-2 to-accent transition-[width] duration-500 ease-out"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

/* Panel tipo "build log" sincronizado con el ensamblaje 3D.
   step = pasos completados (0..7); -1 mientras se reinicia el ciclo. */
export default function BuildHud({ step }: { step: number }) {
  const total = STEPS.length;
  const resetting = step < 0;
  const done = resetting ? 0 : step;
  const ready = done >= total;
  const current = ready ? null : STEPS[done];

  return (
    <div
      className="pointer-events-none select-none w-[210px] sm:w-[240px] rounded-xl border border-white/10 bg-[#0b0216]/70 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(140,82,255,0.45)] font-mono text-[11px] sm:text-xs"
      aria-hidden
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <span className="tracking-[0.18em] text-white/50">BUILD LOG</span>
        <span className={`flex items-center gap-1.5 ${ready ? "text-active" : "text-accent"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${ready ? "bg-active" : "bg-accent animate-pulse"}`} />
          {ready ? "ONLINE" : resetting ? "RESET" : "ASSEMBLING"}
        </span>
      </div>

      {/* Lista completa solo en pantallas grandes */}
      <ul className="hidden sm:block px-3 py-2 space-y-1">
        {STEPS.map((s, i) => {
          const isDone = i < done;
          const isActive = !resetting && i === done;
          return (
            <li
              key={s.label}
              className={`flex items-center gap-2 transition-colors duration-300 ${
                isDone ? "text-white/85" : isActive ? "text-accent" : "text-white/25"
              }`}
            >
              <span className="w-3 text-center">{isDone ? "✓" : isActive ? "›" : "·"}</span>
              <span className="truncate">{s.label}</span>
            </li>
          );
        })}
      </ul>

      {/* Móvil: solo el paso actual */}
      <p className="sm:hidden px-3 py-2 text-white/80 truncate">
        {ready ? "Sistema listo ✓" : resetting ? "Reiniciando…" : `› ${current?.label}`}
      </p>

      <div className="px-3 pb-3 pt-1">
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-accent-2 to-accent transition-[width] duration-500 ease-out"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-white/40">
          <span>{ready ? "POST OK · 0 errores" : "Ensamblando…"}</span>
          <span>{Math.round((done / total) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
