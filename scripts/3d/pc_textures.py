"""Texturas procedurales del PCB: color, rugosidad, normales y emisión de pistas."""

import random

import bpy
import numpy as np

BOARD_W, BOARD_H = 2.44, 3.05
TEX_W, TEX_H = 1536, 1920
PX = TEX_W / BOARD_W  # píxeles por unidad


def to_px(x, y):
    return (x + BOARD_W / 2) * PX, (y + BOARD_H / 2) * PX


class Canvas:
    def __init__(self):
        self.h = np.zeros((TEX_H, TEX_W), np.float32)
        self.ii, self.jj = None, None

    def segment(self, layer, x1, y1, x2, y2, w, value=1.0):
        (px1, py1), (px2, py2) = to_px(x1, y1), to_px(x2, y2)
        hw = w * PX / 2 + 1.0
        x0, x1b = int(max(0, min(px1, px2) - hw - 1)), int(min(TEX_W, max(px1, px2) + hw + 2))
        y0, y1b = int(max(0, min(py1, py2) - hw - 1)), int(min(TEX_H, max(py1, py2) + hw + 2))
        if x0 >= x1b or y0 >= y1b:
            return
        ys, xs = np.mgrid[y0:y1b, x0:x1b].astype(np.float32)
        dx, dy = px2 - px1, py2 - py1
        L2 = dx * dx + dy * dy or 1e-6
        t = np.clip(((xs - px1) * dx + (ys - py1) * dy) / L2, 0, 1)
        d = np.hypot(xs - (px1 + t * dx), ys - (py1 + t * dy))
        a = np.clip(w * PX / 2 - d + 0.5, 0, 1) * value
        sub = layer[y0:y1b, x0:x1b]
        np.maximum(sub, a, out=sub)

    def polyline(self, layer, pts, w, value=1.0):
        for (a, b) in zip(pts, pts[1:]):
            self.segment(layer, a[0], a[1], b[0], b[1], w, value)

    def ring(self, layer, x, y, r, w, value=1.0):
        cx, cy = to_px(x, y)
        R = (r + w) * PX + 2
        x0, x1 = int(max(0, cx - R)), int(min(TEX_W, cx + R))
        y0, y1 = int(max(0, cy - R)), int(min(TEX_H, cy + R))
        if x0 >= x1 or y0 >= y1:
            return
        ys, xs = np.mgrid[y0:y1, x0:x1].astype(np.float32)
        d = np.abs(np.hypot(xs - cx, ys - cy) - r * PX)
        a = np.clip(w * PX / 2 - d + 0.5, 0, 1) * value
        sub = layer[y0:y1, x0:x1]
        np.maximum(sub, a, out=sub)

    def disc(self, layer, x, y, r, value=1.0):
        cx, cy = to_px(x, y)
        R = r * PX + 2
        x0, x1 = int(max(0, cx - R)), int(min(TEX_W, cx + R))
        y0, y1 = int(max(0, cy - R)), int(min(TEX_H, cy + R))
        if x0 >= x1 or y0 >= y1:
            return
        ys, xs = np.mgrid[y0:y1, x0:x1].astype(np.float32)
        a = np.clip(r * PX - np.hypot(xs - cx, ys - cy) + 0.5, 0, 1) * value
        sub = layer[y0:y1, x0:x1]
        np.maximum(sub, a, out=sub)

    def rect(self, layer, x, y, w, h, value=1.0):
        (ax, ay), (bx, by) = to_px(x - w / 2, y - h / 2), to_px(x + w / 2, y + h / 2)
        layer[int(max(0, ay)):int(min(TEX_H, by)), int(max(0, ax)):int(min(TEX_W, bx))] = np.maximum(
            layer[int(max(0, ay)):int(min(TEX_H, by)), int(max(0, ax)):int(min(TEX_W, bx))], value)

    def rect_outline(self, layer, x, y, w, h, lw, value=1.0):
        x1, x2, y1, y2 = x - w / 2, x + w / 2, y - h / 2, y + h / 2
        self.polyline(layer, [(x1, y1), (x2, y1), (x2, y2), (x1, y2), (x1, y1)], lw, value)


# ─── Rutas de pistas ─────────────────────────────────────────────────────────


def bus_paths():
    """Buses principales (también se exportan para los pulsos de datos de la web)."""
    paths = []
    for i in range(14):  # CPU → RAM
        y = 0.42 + i * 0.034
        paths.append([(0.22, y), (0.3, y), (0.34, y + 0.04), (0.47, y + 0.04)])
    for i in range(12):  # CPU → PCIe
        x = -0.07 + i * 0.024
        paths.append([(x, 0.38), (x, 0.25), (x - 0.12, 0.13), (x - 0.12, -0.255)])
    for i in range(6):  # CPU → M.2
        x = -0.39 + i * 0.022
        paths.append([(x, 0.38), (x, 0.3), (x - 0.06, 0.24), (x - 0.06, 0.18)])
    for i in range(9):  # PCIe → chipset
        x = 0.05 + i * 0.028
        paths.append([(x, -0.345), (x, -0.45), (x + 0.25, -0.7)])
    for i in range(4):  # chipset → SATA
        y = -0.82 - i * 0.07
        paths.append([(0.905, y), (0.98, y), (1.06, -0.6 - i * 0.13)])
    for i in range(8):  # zona entre slots
        y = -0.41 - i * 0.026
        paths.append([(-1.15, y), (-0.9, y), (-0.82, y - 0.08), (-0.66, y - 0.08)])
    for i in range(6):  # chipset → audio
        y = -1.1 - i * 0.028
        paths.append([(-0.5, y), (0.0, y), (0.08, y + 0.08), (0.28, y + 0.08)])
    for i in range(6):  # I/O → CPU
        y = 1.39 + i * 0.022
        paths.append([(-0.8, y), (-0.66, y), (-0.62, y - 0.03)])
    return paths


def filler_paths(seed=11, count=320):
    """Pistas finas de relleno con quiebres a 45°, como un ruteo real."""
    import math

    rnd = random.Random(seed)
    out = []
    for _ in range(count):
        x = rnd.uniform(-1.15, 1.15)
        y = rnd.uniform(-1.45, 1.45)
        ang = rnd.choice([0, 90, 180, 270])
        pts = [(x, y)]
        for _ in range(rnd.randint(1, 3)):
            L = rnd.uniform(0.05, 0.28)
            x, y = x + math.cos(math.radians(ang)) * L, y + math.sin(math.radians(ang)) * L
            pts.append((x, y))
            # Tramo diagonal corto y vuelta a la dirección ortogonal (quiebre de 45°)
            turn = rnd.choice([-45, 45])
            L2 = rnd.uniform(0.02, 0.06)
            x += math.cos(math.radians(ang + turn)) * L2
            y += math.sin(math.radians(ang + turn)) * L2
            pts.append((x, y))
            ang += 2 * turn
        out.append([(max(-1.2, min(1.2, a)), max(-1.5, min(1.5, b))) for a, b in pts])
    return out


# ─── Huellas de serigrafía (contornos de componentes) ────────────────────────

FOOTPRINTS = [
    # (x, y, w, h)
    (-0.1, 0.7, 0.72, 0.72),    # socket
    (0.5, 0.7, 0.08, 1.44), (0.62, 0.7, 0.08, 1.44), (0.78, 0.7, 0.08, 1.44), (0.9, 0.7, 0.08, 1.44),
    (-0.3, -0.3, 0.98, 0.11), (-0.55, -0.65, 0.3, 0.1), (-0.3, -1.0, 0.98, 0.11),
    (-0.42, 0.05, 0.86, 0.27),  # M.2
    (0.6, -1.0, 0.66, 0.66),    # chipset
    (1.12, 0.7, 0.17, 0.66),    # ATX 24
    (-0.95, -1.28, 0.44, 0.34),  # audio
]


def build_textures(out_dir):
    c = Canvas()
    copper = np.zeros_like(c.h)
    pour = np.zeros_like(c.h)
    silk = np.zeros_like(c.h)
    vias = np.zeros_like(c.h)
    pads = np.zeros_like(c.h)
    emissive = np.zeros_like(c.h)

    # Planos de cobre (zonas de tierra) con un leve tramado
    rnd = random.Random(5)
    for _ in range(26):
        c.rect(pour, rnd.uniform(-1.1, 1.1), rnd.uniform(-1.4, 1.4), rnd.uniform(0.15, 0.5), rnd.uniform(0.1, 0.4), 0.5)

    buses = bus_paths()
    for p in buses:
        c.polyline(copper, p, 0.011)
        c.polyline(emissive, p, 0.011)
        c.disc(vias, *p[0], 0.012)
        c.disc(vias, *p[-1], 0.012)
    for p in filler_paths():
        c.polyline(copper, p, 0.0055, 0.8)
        c.disc(vias, *p[-1], 0.009, 0.9)
        c.polyline(emissive, p, 0.0055, 0.35)

    # Vías sueltas en rejilla bajo el socket (alimentación)
    for i in range(12):
        for j in range(12):
            c.disc(vias, -0.36 + i * 0.045, 0.45 + j * 0.045, 0.006, 0.8)

    for (x, y, w, h) in FOOTPRINTS:
        c.rect_outline(silk, x, y, w, h, 0.006)
        c.disc(silk, x - w / 2 + 0.025, y + h / 2 - 0.025, 0.008)  # marca de pin 1

    # Pads de soldadura expuestos (ENIG dorado) en los bordes de montaje
    for x in (-1.08, 0.3, 1.08):
        for y in (1.38, -1.38):
            c.ring(pads, x, y, 0.06, 0.02)
    for (x, y) in ((-1.08, -0.05), (1.08, 0.05)):
        c.ring(pads, x, y, 0.06, 0.02)
    for (x, y) in ((-0.48, 1.08), (0.28, 1.08), (-0.48, 0.32), (0.28, 0.32)):
        c.ring(pads, x, y, 0.035, 0.014)  # agujeros del disipador

    # ── Composición de mapas ──
    base = np.array([0.018, 0.012, 0.026], np.float32)  # máscara negra con tinte morado
    trace_col = np.array([0.1, 0.055, 0.16], np.float32)
    pour_col = np.array([0.038, 0.024, 0.055], np.float32)
    silk_col = np.array([0.78, 0.78, 0.82], np.float32)
    gold_col = np.array([0.95, 0.7, 0.32], np.float32)

    color = np.broadcast_to(base, (TEX_H, TEX_W, 3)).copy()
    color = color * (1 - pour[..., None]) + pour_col * pour[..., None]
    color = color * (1 - copper[..., None]) + trace_col * copper[..., None]
    color = color * (1 - vias[..., None] * 0.6) + np.array([0.09, 0.07, 0.1]) * vias[..., None] * 0.6
    color = color * (1 - silk[..., None]) + silk_col * silk[..., None]
    color = color * (1 - pads[..., None]) + gold_col * pads[..., None]
    # Variación sutil de la máscara (evita el aspecto "plano de render")
    noise = np.random.default_rng(3).normal(0, 0.004, (TEX_H, TEX_W, 1)).astype(np.float32)
    color = np.clip(color + noise, 0, 1)

    rough = 0.42 - copper * 0.08 + silk * 0.2 - pads * 0.18
    metal = pads * 1.0
    height = copper * 1.0 + pour * 0.35 + vias * 0.8 + silk * 0.5 + pads * 0.6

    gy, gx = np.gradient(height)
    strength = 2.2
    nx, ny = -gx * strength, -gy * strength
    nz = np.ones_like(nx)
    n = np.sqrt(nx * nx + ny * ny + nz * nz)
    normal = np.stack([nx / n, ny / n, nz / n], -1) * 0.5 + 0.5

    images = {
        "pcb_color": (color, False),
        "pcb_rough": (np.stack([rough, rough, metal], -1), True),
        "pcb_normal": (normal, True),
        "pcb_emit": (np.stack([emissive] * 3, -1), False),
    }
    out = {}
    for name, (arr, non_color) in images.items():
        img = bpy.data.images.new(name, TEX_W, TEX_H, alpha=False)
        # El espacio de color va ANTES de escribir píxeles: cambiarlo después recarga la imagen y la deja vacía
        img.colorspace_settings.name = "Non-Color" if non_color else "sRGB"
        rgba =np.concatenate([arr.astype(np.float32), np.ones((TEX_H, TEX_W, 1), np.float32)], -1)
        if not non_color:
            # Los datos se pintaron en lineal; Blender guarda sRGB para las imágenes de color
            rgba[..., :3] = np.where(rgba[..., :3] <= 0.0031308, rgba[..., :3] * 12.92,
                                     1.055 * np.power(np.clip(rgba[..., :3], 0, 1), 1 / 2.4) - 0.055)
        img.pixels.foreach_set(np.ascontiguousarray(rgba, dtype=np.float32).ravel())
        img.update()
        img.file_format = "PNG"
        img.pack()
        out[name] = img
    return out, buses


def socket_contacts_image():
    """Campo de contactos LGA: puntos dorados sobre fondo oscuro."""
    N = 256
    ys, xs = np.mgrid[0:N, 0:N].astype(np.float32)
    cell = 6.0
    d = np.hypot((xs % cell) - cell / 2, (ys % cell) - cell / 2)
    dots = np.clip(1.6 - d, 0, 1)
    col = np.stack([0.05 + 0.85 * dots, 0.04 + 0.6 * dots, 0.03 + 0.25 * dots, np.ones_like(dots)], -1)
    img = bpy.data.images.new("lga_contacts", N, N, alpha=False)
    img.pixels.foreach_set(col.ravel())
    img.file_format = "PNG"
    img.pack()
    return img


def pcb_material(images):
    m = bpy.data.materials.new("PCB")
    m.use_nodes = True
    nt = m.node_tree
    p = nt.nodes["Principled BSDF"]

    def tex(img):
        n = nt.nodes.new("ShaderNodeTexImage")
        n.image = img
        return n

    nt.links.new(tex(images["pcb_color"]).outputs["Color"], p.inputs["Base Color"])
    rough = tex(images["pcb_rough"])
    sep = nt.nodes.new("ShaderNodeSeparateColor")
    nt.links.new(rough.outputs["Color"], sep.inputs["Color"])
    nt.links.new(sep.outputs["Green"], p.inputs["Roughness"])
    nt.links.new(sep.outputs["Blue"], p.inputs["Metallic"])
    nmap = nt.nodes.new("ShaderNodeNormalMap")
    nt.links.new(tex(images["pcb_normal"]).outputs["Color"], nmap.inputs["Color"])
    nt.links.new(nmap.outputs["Normal"], p.inputs["Normal"])
    nt.links.new(tex(images["pcb_emit"]).outputs["Color"], p.inputs["Emission Color"])
    p.inputs["Emission Strength"].default_value = 1.0
    p.inputs["Coat Weight"].default_value = 0.55
    p.inputs["Coat Roughness"].default_value = 0.18
    return m


def textured_material(name, img, metal=1.0, rough=0.3):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    p = nt.nodes["Principled BSDF"]
    t = nt.nodes.new("ShaderNodeTexImage")
    t.image = img
    nt.links.new(t.outputs["Color"], p.inputs["Base Color"])
    p.inputs["Metallic"].default_value = metal
    p.inputs["Roughness"].default_value = rough
    return m
