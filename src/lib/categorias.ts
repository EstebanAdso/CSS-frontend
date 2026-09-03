/* Cómo se le muestra al público el nombre de una categoría.
   ─────────────────────────────────────────────────────────────────────────────
   En Zentivy los nombres se guardan en mayúsculas y en singular —"MONITOR",
   "GRAFICA", "M2"— porque ahí son etiquetas de inventario, no texto de cara al
   cliente. Ese nombre crudo estaba llegando tal cual al <title>, al <h1> y a la
   meta description, con tres costos:

     · "MONITOR EN PASTO" en un resultado de Google se lee como un grito y baja
       el porcentaje de clics.
     · Está en singular, y la gente busca en plural: "monitores pasto".
     · No usa la palabra que usa la gente: nadie busca "GRAFICA", buscan
       "tarjeta gráfica" o "tarjeta de video".

   Este módulo traduce el nombre de inventario al nombre de venta. Es solo
   presentación: los slugs y las URLs se siguen derivando del nombre crudo con
   `slugify`, así que cambiar algo de acá NO mueve ninguna URL ni rompe lo que
   ya está indexado. */

export type PresentacionCategoria = {
  /** Para breadcrumbs y frases en singular. */
  singular: string;
  /** Para el <title> y el <h1>: es la forma en la que se busca. */
  plural: string;
  /** Párrafo propio de la categoría, en vez de una plantilla repetida 39 veces. */
  intro: string;
};

/* La clave es el nombre exacto que devuelve Zentivy. */
const CATEGORIAS: Record<string, PresentacionCategoria> = {
  ADAPTADOR: {
    singular: "Adaptador",
    plural: "Adaptadores",
    intro:
      "Adaptadores para conectar lo que no encaja: HDMI a VGA, USB a SATA, hubs multipuerto y adaptadores WiFi USB. Útiles cuando el equipo es nuevo y el monitor o el proyector no lo son.",
  },
  AUDIFONO: {
    singular: "Audífono",
    plural: "Audífonos",
    intro:
      "Audífonos para juego, trabajo y estudio, con y sin micrófono. Modelos con cable para latencia baja e inalámbricos para moverte sin quedar atado al escritorio.",
  },
  "BASE REFRIGERANTE": {
    singular: "Base Refrigerante",
    plural: "Bases Refrigerantes",
    intro:
      "Bases refrigerantes para portátil, desde una sola turbina silenciosa hasta seis ventiladores con RGB. Bajan la temperatura del equipo y levantan la pantalla a una altura más cómoda para la espalda.",
  },
  CABLES: {
    singular: "Cable",
    plural: "Cables",
    intro:
      "Cables HDMI, DisplayPort, VGA, ethernet, de poder y extensiones USB blindadas. El repuesto que casi siempre resulta ser la causa de la pantalla que parpadea o la red que se cae.",
  },
  CADDY: {
    singular: "Caddy",
    plural: "Caddy para Portátil",
    intro:
      "Caddy para reemplazar la unidad de DVD del portátil por un segundo disco. Una forma barata de sumar almacenamiento sin renunciar al disco que ya tenés instalado.",
  },
  "CAJA PARA DISCO": {
    singular: "Caja para Disco",
    plural: "Cajas para Disco Duro",
    intro:
      "Carcasas externas para discos de 2.5 pulgadas, M.2 y NVMe, con conexión USB 3.0 y tipo C. Convierten un disco que te sobró en un disco externo en cinco minutos y sin herramientas.",
  },
  "CAMARA DE SEGURIDAD": {
    singular: "Cámara de Seguridad",
    plural: "Cámaras de Seguridad",
    intro:
      "Cámaras de seguridad para casa, local y bodega. Modelos con visión nocturna y conexión WiFi para revisar desde el celular estés donde estés.",
  },
  "CARGADOR DE PORTATIL": {
    singular: "Cargador de Portátil",
    plural: "Cargadores de Portátil",
    intro:
      "Cargadores de reemplazo para portátil, universales y por marca, incluyendo modelos con la potencia que piden los equipos gamer. Traé el tuyo al local y verificamos voltaje y punta antes de que compres.",
  },
  COMBOS: {
    singular: "Combo",
    plural: "Combos de Teclado y Mouse",
    intro:
      "Combos de teclado y mouse en un solo paquete, con cable e inalámbricos. La salida más rápida y económica cuando estás montando un puesto de trabajo desde cero.",
  },
  COMPUTADOR: {
    singular: "Computador",
    plural: "Computadores",
    intro:
      "Computadores de escritorio y mini PC armados y probados acá, con procesadores Ryzen y equipos corporativos HP reacondicionados. Si preferís uno a tu medida, lo armamos con las piezas que elijas.",
  },
  "CONTROLES Y JUEGOS": {
    singular: "Control",
    plural: "Controles y Juegos",
    intro:
      "Controles para PlayStation, Xbox y PC, más accesorios como gatillos, dedales y game sticks retro. Repuestos y alternativas para cuando el control original ya no responde como antes.",
  },
  "DECODIFICADOR Y TVBOX": {
    singular: "Decodificador",
    plural: "Decodificadores y TV Box",
    intro:
      "TV Box y decodificadores para volver inteligente un televisor que no lo es. Se conectan por HDMI y traen las aplicaciones de video que ya usás.",
  },
  DIADEMA: {
    singular: "Diadema",
    plural: "Diademas",
    intro:
      "Diademas con micrófono para llamadas, clases virtuales y juego en línea. Modelos con almohadilla acolchada para las jornadas que se estiran más de la cuenta.",
  },
  "DISCO EXTERNO": {
    singular: "Disco Externo",
    plural: "Discos Duros Externos",
    intro:
      "Discos duros externos de 1 TB en adelante, listos para conectar y usar. Para respaldar fotos, mover proyectos pesados o sacarle carga al disco interno del equipo.",
  },
  DISIPADOR: {
    singular: "Disipador",
    plural: "Disipadores para Procesador",
    intro:
      "Disipadores de aire y refrigeración líquida para procesador, más pasta térmica de recambio. Si el equipo se apaga solo o los ventiladores suenan todo el tiempo, casi siempre empieza por acá.",
  },
  ESTUCHE: {
    singular: "Estuche",
    plural: "Estuches para Portátil",
    intro:
      "Estuches, fundas y morrales para transportar el portátil sin sustos, además de pad mouse en varios tamaños y acabados.",
  },
  "FUENTE DE PODER": {
    singular: "Fuente de Poder",
    plural: "Fuentes de Poder",
    intro:
      "Fuentes de poder de 500 W a 850 W, certificadas 80 Plus Bronce y Gold, modulares y no modulares. Es la pieza donde menos conviene ahorrar: de ella dependen todas las demás.",
  },
  "GABINETE DE COMPUTADOR": {
    singular: "Gabinete",
    plural: "Gabinetes de Computador",
    intro:
      "Gabinetes gamer con panel de vidrio templado y ventiladores ARGB incluidos, en negro y blanco. Flujo de aire pensado para que las temperaturas no arruinen el rendimiento que pagaste.",
  },
  GRAFICA: {
    singular: "Tarjeta Gráfica",
    plural: "Tarjetas Gráficas",
    intro:
      "Tarjetas gráficas NVIDIA GeForce y AMD Radeon, desde una GT 710 para oficina hasta una RTX 5060 o una RX 9060 XT para juego en alta resolución. Te ayudamos a elegir la que va con tu fuente y tu procesador.",
  },
  "JUEGOS PLAYSTATION": {
    singular: "Juego de PlayStation",
    plural: "Juegos de PlayStation",
    intro:
      "Juegos físicos para PlayStation 4 y PlayStation 5, con títulos de acción, terror y peleas. Stock rotativo: lo que hay hoy es lo que ves listado.",
  },
  LAMPARAS: {
    singular: "Lámpara",
    plural: "Lámparas de Escritorio",
    intro:
      "Lámparas de escritorio y barras de luz para monitor, con control de intensidad. Iluminan el teclado sin reflejarse en la pantalla, que es justo el problema de la lámpara común.",
  },
  M2: {
    singular: "Disco M.2",
    plural: "Discos M.2 NVMe",
    intro:
      "Discos sólidos M.2 NVMe y SATA de 128 GB a 2 TB, incluyendo unidades PCIe Gen 4. Es la mejora que más se nota en un equipo lento: arranca en segundos y los programas abren de inmediato.",
  },
  MICROFONO: {
    singular: "Micrófono",
    plural: "Micrófonos",
    intro:
      "Micrófonos de escritorio para streaming, grabación y reuniones. Un salto grande frente al micrófono integrado del portátil, que capta más ruido de sala que voz.",
  },
  MONITOR: {
    singular: "Monitor",
    plural: "Monitores",
    intro:
      "Monitores de 19 a 29 pulgadas, con paneles IPS y tasas de refresco de 75 Hz hasta 200 Hz, en Full HD, 2K y ultrawide. Marcas como Acer, AOC, Samsung, ASUS y KOORUI, para oficina y para juego competitivo.",
  },
  MOTHERBOARD: {
    singular: "Motherboard",
    plural: "Motherboards",
    intro:
      "Boards AMD para socket AM4 y AM5, con chipsets A520, B450, B550, A620 y B650, DDR4 y DDR5, con y sin WiFi. Verificá acá la compatibilidad antes de comprar el procesador.",
  },
  MOUSE: {
    singular: "Mouse",
    plural: "Mouse",
    intro:
      "Mouse con cable e inalámbricos, desde modelos de oficina hasta gamer con sensor de alta precisión y botones programables. También ergonómicos verticales para quien pasa el día entero frente al equipo.",
  },
  "PAD MOUSE": {
    singular: "Pad Mouse",
    plural: "Pad Mouse",
    intro:
      "Pad mouse en tela y con base de gel, en tamaños desde el clásico hasta el extendido que cubre teclado y mouse. Mejoran el deslizamiento y protegen el escritorio.",
  },
  PARLANTE: {
    singular: "Parlante",
    plural: "Parlantes",
    intro:
      "Parlantes para computador y celular, con conexión USB y Bluetooth. Sonido claro para música, clases y videollamadas sin depender de los altavoces del monitor.",
  },
  "PASTA TERMICA": {
    singular: "Pasta Térmica",
    plural: "Pasta Térmica",
    intro:
      "Pasta térmica para procesador, en presentaciones económicas y de alto rendimiento. Se reseca con los años: cambiarla suele bajar varios grados un equipo que ya calienta más de lo normal.",
  },
  PROCESADOR: {
    singular: "Procesador",
    plural: "Procesadores",
    intro:
      "Procesadores AMD Ryzen para socket AM4 y AM5, con y sin gráficos integrados. Si no vas a poner tarjeta de video, un Ryzen con gráficos integrados te ahorra esa compra.",
  },
  RAM: {
    singular: "Memoria RAM",
    plural: "Memorias RAM",
    intro:
      "Memorias RAM DDR3, DDR4 y DDR5 para escritorio y portátil, de 4 GB a 16 GB por módulo. Si el equipo se traba con varias pestañas abiertas, casi siempre es esto y no el procesador.",
  },
  "REFRIGERACION LIQUIDA": {
    singular: "Refrigeración Líquida",
    plural: "Refrigeración Líquida",
    intro:
      "Sistemas de refrigeración líquida todo en uno de 240 y 360 mm, con ventiladores ARGB en negro y blanco. Para procesadores que trabajan al límite y para gabinetes donde el disipador de aire no cabe.",
  },
  "REGULADORES Y UPS": {
    singular: "Regulador",
    plural: "Reguladores y UPS",
    intro:
      "Reguladores de voltaje y UPS de 700 VA a 2000 VA. En una zona donde la luz se va sin avisar, son lo que evita que un corte se lleve la fuente, el disco o el trabajo sin guardar.",
  },
  ROUTER: {
    singular: "Router",
    plural: "Routers y Repetidores WiFi",
    intro:
      "Routers y repetidores WiFi de doble banda AC1200 y AC1900, marcas TP-Link y Mercusys. Para cubrir las zonas de la casa o el local donde la señal del operador no alcanza.",
  },
  SSD: {
    singular: "SSD",
    plural: "SSD",
    intro:
      "Discos sólidos SSD SATA de 120 GB a 1 TB, marcas Kingston, Patriot, Crucial, PNY y Team Group. Reemplazar el disco mecánico por un SSD es la mejora con mejor relación precio-resultado que existe.",
  },
  "TABLETAS GRÁFICAS": {
    singular: "Tableta Gráfica",
    plural: "Tabletas Gráficas",
    intro:
      "Tabletas gráficas con lápiz sensible a la presión, en varios tamaños de área activa. Para dibujo digital, retoque de fotos, diseño y firma de documentos.",
  },
  TECLADO: {
    singular: "Teclado",
    plural: "Teclados",
    intro:
      "Teclados de membrana y mecánicos, con cable e inalámbricos, en formato completo, 75% y 60%. Modelos con switches rojos y cafés, retroiluminación RGB y distribución en español.",
  },
  VENTILADORES: {
    singular: "Ventilador",
    plural: "Ventiladores para Gabinete",
    intro:
      "Ventiladores de 120 mm para gabinete, en packs de tres, con iluminación ARGB en negro y blanco. Mejoran el flujo de aire interno y bajan la temperatura de todos los componentes a la vez.",
  },
  WEBCAM: {
    singular: "Cámara Web",
    plural: "Cámaras Web",
    intro:
      "Cámaras web de 720p a 4K, marcas Logitech y genéricas con micrófono integrado. Para clases virtuales, reuniones de trabajo y transmisiones donde la cámara del portátil se queda corta.",
  },
};

/**
 * "BASE REFRIGERANTE" → "Base Refrigerante".
 *
 * Es el respaldo para una categoría que todavía no está en el mapa de arriba: en
 * cuanto el negocio cree una nueva en Zentivy, su página se publica igual y con
 * un nombre presentable, sin esperar a que alguien toque este archivo. Preserva
 * las siglas de dos o tres letras —SSD, RAM, UPS, PC— que en minúscula se leerían
 * como errores.
 */
function titulizar(nombre: string): string {
  const MENORES = new Set(["de", "y", "para", "con", "la", "el", "en"]);
  return nombre
    .toLowerCase()
    .split(" ")
    .map((palabra, i) => {
      const original = nombre.split(" ")[i] ?? "";
      if (original.length <= 3 && original === original.toUpperCase() && /[A-Z]/.test(original)) {
        return original;
      }
      if (i > 0 && MENORES.has(palabra)) return palabra;
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    })
    .join(" ");
}

/** Cómo mostrarle al público el nombre que Zentivy guarda en mayúsculas. */
export function presentacionCategoria(nombre: string): PresentacionCategoria {
  const conocida = CATEGORIAS[nombre];
  if (conocida) return conocida;

  const legible = titulizar(nombre);
  return {
    singular: legible,
    plural: legible,
    intro: `${legible} disponibles en CompuServicesSoft, Pasto. Productos originales con garantía. Visitanos en el CC San Agustín, Local 224A, o escribinos por WhatsApp para confirmar existencias y precios.`,
  };
}
