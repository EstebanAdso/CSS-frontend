"""Genera scripts/3d/out/pc-build.raw.glb y pc-traces.json (fuente del video del hero).

Uso (desde la raíz del proyecto):
  BLENDER=ruta/blender npm run 3d:build

Luego: npm run 3d:render && npm run 3d:encode
"""

import json
import math
import os
import sys

import bmesh
import bpy

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pc_lib import (  # noqa: E402
    add_bevel, array, boolean_cut, box, consolidate, cutter_box, cutter_cyl, cyl, delete_cutters,
    empty, mesh_from_bmesh, palette, prism, reset_scene, text, torus, tube,
)
from pc_textures import build_textures, pcb_material, socket_contacts_image, textured_material  # noqa: E402

OUT_DIR = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")

reset_scene()
M = palette()

# Disposición de la placa (unidades = dm)
SOCKET = (-0.1, 0.7)
RAM_X = (0.5, 0.62, 0.78, 0.9)
RAM_Y = 0.7
PCIE_Y = -0.3
M2 = (-0.42, 0.05)


def planar_uv(ob, x0, x1, y0, y1):
    me = ob.data
    uv = me.uv_layers.new(name="UVMap")
    for loop in me.loops:
        co = me.vertices[loop.vertex_index].co
        uv.data[loop.index].uv = ((co.x - x0) / (x1 - x0), (co.y - y0) / (y1 - y0))


def pin_holes(target, center, rows, cols, pitch, hole, depth, face="z"):
    """Agujeros de conector (2×12, 2×4…) recortados con boolean."""
    cx, cy, cz = center
    cutters = []
    for i in range(rows):
        for j in range(cols):
            du = (i - (rows - 1) / 2) * pitch
            dv = (j - (cols - 1) / 2) * pitch
            if face == "z":
                loc = (cx + du, cy + dv, cz)
                size = (hole, hole, depth)
            else:  # x
                loc = (cx, cy + dv, cz + du)
                size = (depth, hole, hole)
            cutters.append(cutter_box(size, loc))
    # Un solo cortador combinado es mucho más rápido que N booleanos
    for c in cutters[1:]:
        c.parent = None
    base = cutters[0]
    others = cutters[1:]
    if others:
        with bpy.context.temp_override(active_object=base, object=base,
                                       selected_objects=cutters, selected_editable_objects=cutters):
            bpy.ops.object.join()
    boolean_cut(target, [base])


# ═════════════════════════════════════════════════════════════════════════════
#  PLACA MADRE
# ═════════════════════════════════════════════════════════════════════════════


def build_motherboard(tex):
    root = empty("Part_board")

    pcb = box("PCB", (2.44, 3.05, 0.04), (0, 0, -0.02), None, bevel=0.006, parent=root)
    planar_uv(pcb, -1.22, 1.22, -1.525, 1.525)
    pcb.data.uv_layers.active_index = 0
    # El UV se calcula en coordenadas locales (centro en z=-0.02, x/y sin desplazar)
    pcb.data.materials.append(pcb_material(tex))

    # Agujeros de montaje: anillo estañado + hueco oscuro
    for (x, y) in ((-1.08, 1.38), (0.3, 1.38), (1.08, 1.38), (-1.08, -0.05), (1.08, 0.05),
                   (-1.08, -1.38), (0.3, -1.38), (1.08, -1.38)):
        cyl("hole_ring", 0.05, 0.004, (x, y, 0.002), M["tin"], parent=root, bevel=0.001)
        cyl("hole", 0.028, 0.006, (x, y, 0.002), M["plastic_matte"], parent=root, bevel=0)
        cyl("screw", 0.04, 0.012, (x, y, 0.008), M["nickel"], parent=root, bevel=0.003)

    # ── Cubierta del panel I/O ──
    io = prism("io_body", [(-0.18, -0.475), (0.18, -0.475), (0.18, 0.38), (0.08, 0.475), (-0.18, 0.475)],
               0.28, (-1.0, 1.0, 0.14), M["alu_dark"], bevel=0.01, parent=root)
    top = prism("io_top", [(-0.15, -0.44), (0.15, -0.44), (0.15, 0.36), (0.07, 0.44), (-0.15, 0.44)],
                0.014, (-1.0, 1.0, 0.285), M["alu_bright"], bevel=0.004, parent=root)
    for i in range(5):
        box("io_groove", (0.24, 0.006, 0.004), (-1.0, 0.62 + i * 0.03, 0.293), M["gunmetal"], bevel=0, parent=root)
    text("io_logo", "CSS", 0.09, (-1.0, 1.15, 0.2925), M["gunmetal"], parent=root, extrude=0.0012,
         xdir=(0, 1, 0), ydir=(-1, 0, 0))
    box("GLOW_io", (0.008, 0.78, 0.03), (-0.818, 0.98, 0.2), M["glow"], bevel=0, parent=root)
    # Puertos traseros asomando por el borde
    for k, y in enumerate((1.36, 1.16, 0.96, 0.76, 0.6)):
        box("port_shell", (0.14, 0.12, 0.14 if k < 4 else 0.1), (-1.26, y, 0.09), M["nickel"], bevel=0.004, parent=root)
        box("port_in", (0.02, 0.09, 0.05), (-1.33, y, 0.09), M["plastic_black"], bevel=0, parent=root)

    # ── VRM: bobinas, MOSFETs y disipadores con aletas ──
    for i in range(8):
        box("choke", (0.075, 0.075, 0.055), (-0.45, 0.42 + i * 0.083, 0.028), M["choke"], bevel=0.006, parent=root)
        text("choke_t", "R22", 0.022, (-0.45, 0.42 + i * 0.083, 0.0561), M["chip_text"], parent=root, kind="mono", extrude=0.0002)
    for i in range(8):
        box("choke", (0.075, 0.075, 0.055), (-0.35 + i * 0.083, 1.055, 0.028), M["choke"], bevel=0.006, parent=root)
        text("choke_t", "R22", 0.022, (-0.35 + i * 0.083, 1.055, 0.0561), M["chip_text"], parent=root, kind="mono", extrude=0.0002)

    # Disipador superior
    box("vrm_t_base", (0.95, 0.24, 0.07), (-0.12, 1.22, 0.035), M["alu_dark"], bevel=0.006, parent=root)
    fin = box("vrm_t_fins", (0.012, 0.22, 0.15), (-0.58, 1.22, 0.14), M["alu_dark"], bevel=0.003, parent=root)
    array(fin, 24, (0.04, 0, 0))
    cover = prism("vrm_t_cover", [(-0.47, -0.125), (0.3, -0.125), (0.47, 0.0), (0.47, 0.125), (-0.47, 0.125)],
                  0.02, (-0.12, 1.22, 0.225), M["alu_bright"], bevel=0.005, parent=root)
    text("vrm_t_txt", "CSS X1 GAMING", 0.045, (-0.2, 1.22, 0.2365), M["gunmetal"], parent=root, extrude=0.0008)
    # Disipador lateral
    box("vrm_l_base", (0.24, 0.85, 0.07), (-0.62, 0.62, 0.035), M["alu_dark"], bevel=0.006, parent=root)
    fin = box("vrm_l_fins", (0.22, 0.012, 0.15), (-0.62, 0.22, 0.14), M["alu_dark"], bevel=0.003, parent=root)
    array(fin, 21, (0, 0.04, 0))
    prism("vrm_l_cover", [(-0.125, -0.42), (0.125, -0.42), (0.125, 0.3), (0.0, 0.42), (-0.125, 0.42)],
          0.02, (-0.62, 0.62, 0.225), M["alu_bright"], bevel=0.005, parent=root)
    # Heatpipe que une ambos disipadores
    tube("vrm_pipe", [(-0.62, 0.9, 0.08), (-0.62, 1.1, 0.08), (-0.55, 1.2, 0.08), (-0.3, 1.22, 0.08)], 0.018, M["nickel"], parent=root)

    # Condensadores sólidos con tapa morada
    caps = [(1.0, 0.2 + i * 0.075) for i in range(4)] + [(0.27 + i * 0.075, -0.43) for i in range(3)] \
        + [(-0.02 + i * 0.07, 1.45) for i in range(4)]
    for (x, y) in caps:
        cyl("cap", 0.03, 0.08, (x, y, 0.04), M["alu_bright"], parent=root, bevel=0.006)
        cyl("cap_top", 0.022, 0.002, (x, y, 0.0805), M["cap_top"], parent=root, bevel=0)

    # ── Conectores de energía con agujeros reales ──
    for x in (-0.55, -0.3):
        eps = box("eps", (0.2, 0.1, 0.12), (x, 1.45, 0.06), M["plastic_black"], bevel=0.004, parent=root)
        pin_holes(eps, (x, 1.45, 0.12), 4, 2, 0.042, 0.03, 0.04)
    atx = box("atx24", (0.14, 0.62, 0.18), (1.12, 0.7, 0.09), M["plastic_black"], bevel=0.005, parent=root)
    pin_holes(atx, (1.19, 0.7, 0.09), 2, 12, 0.048, 0.034, 0.05, face="x")
    for (x, y, label) in ((0.35, 1.47, "CPU_FAN"), (1.05, 1.47, "SYS_FAN1"), (1.05, -1.45, "SYS_FAN2")):
        hdr = box("fan_hdr", (0.11, 0.05, 0.06), (x, y, 0.03), M["plastic_white"], bevel=0.003, parent=root)
        pin_holes(hdr, (x, y, 0.06), 4, 1, 0.025, 0.012, 0.03)
        text("silk", label, 0.026, (x, y - 0.06, 0.0005), M["silk"], parent=root, kind="mono", extrude=0.0002)

    # ── Socket LGA ──
    sx, sy = SOCKET
    box("sock_base", (0.58, 0.58, 0.02), (sx, sy, 0.01), M["plastic_black"], bevel=0.004, parent=root)
    contacts = box("sock_contacts", (0.46, 0.46, 0.004), (sx, sy, 0.021), None, bevel=0, parent=root)
    planar_uv(contacts, -0.23, 0.23, -0.23, 0.23)
    contacts.data.materials.append(textured_material("lga", socket_contacts_image(), 1.0, 0.3))
    plate = box("sock_plate", (0.64, 0.64, 0.01), (sx, sy, 0.037), M["nickel"], bevel=0.003, parent=root)
    boolean_cut(plate, [cutter_box((0.39, 0.39, 0.05), (sx, sy, 0.037))])
    for dx in (-0.29, 0.29):
        for dy in (-0.29, 0.29):
            cyl("plate_screw", 0.018, 0.012, (sx + dx, sy + dy, 0.044), M["chrome"], parent=root, bevel=0.003)
    tube("lever", [(sx + 0.35, sy - 0.3, 0.03), (sx + 0.35, sy + 0.2, 0.03), (sx + 0.35, sy + 0.32, 0.04),
                   (sx + 0.3, sy + 0.36, 0.04)], 0.008, M["nickel"], parent=root)
    for dx in (-0.38, 0.38):
        for dy in (-0.38, 0.38):
            cyl("cooler_hole", 0.024, 0.004, (sx + dx, sy + dy, 0.002), M["gold"], parent=root, bevel=0.001)
    text("silk", "LGA SOCKET", 0.03, (sx, sy - 0.39, 0.0005), M["silk"], parent=root, kind="mono", extrude=0.0002)

    # ── Slots DIMM con seguro ──
    for i, x in enumerate(RAM_X):
        slot = box(f"dimm{i}", (0.055, 1.38, 0.075), (x, RAM_Y, 0.0375), M["plastic_black"], bevel=0.004, parent=root)
        boolean_cut(slot, [cutter_box((0.016, 1.3, 0.05), (x, RAM_Y, 0.075))])
        prism(f"latch{i}", [(-0.03, 0), (0.03, 0), (0.03, 0.09), (-0.01, 0.11), (-0.03, 0.11)], 0.058,
              (x, RAM_Y + 0.69, 0), M["plastic_gray"], plane="yz", bevel=0.003, parent=root)
        text("silk", f"DDR5_{'AB'[i // 2]}{i % 2 + 1}", 0.026, (x, RAM_Y - 0.76, 0.0005), M["silk"], parent=root,
             kind="mono", extrude=0.0002, xdir=(0, 1, 0), ydir=(-1, 0, 0))

    # ── M.2 ──
    mx, my = M2
    box("m2_conn", (0.045, 0.24, 0.045), (mx - 0.41, my, 0.0225), M["plastic_black"], bevel=0.003, parent=root)
    cyl("m2_standoff", 0.02, 0.03, (mx + 0.4, my, 0.015), M["nickel"], parent=root)
    text("silk", "M.2_1  PCIe 4.0 x4", 0.026, (mx, my - 0.16, 0.0005), M["silk"], parent=root, kind="mono", extrude=0.0002)

    # ── PCIe ──
    armor = box("pcie_armor", (0.95, 0.09, 0.062), (-0.3, PCIE_Y, 0.031), M["alu_bright"], bevel=0.006, parent=root)
    boolean_cut(armor, [cutter_box((0.9, 0.065, 0.1), (-0.3, PCIE_Y, 0.06))])
    slot = box("pcie_slot", (0.9, 0.06, 0.084), (-0.3, PCIE_Y, 0.042), M["plastic_black"], bevel=0.004, parent=root)
    boolean_cut(slot, [cutter_box((0.86, 0.014, 0.06), (-0.3, PCIE_Y, 0.084))])
    for dx in (-0.76, 0.16):
        cyl("armor_rivet", 0.012, 0.008, (dx, PCIE_Y, 0.064), M["chrome"], parent=root, bevel=0.002)
    prism("pcie_latch", [(-0.03, 0), (0.03, 0), (0.03, 0.08), (0.0, 0.1), (-0.03, 0.1)], 0.07,
          (0.2, PCIE_Y, 0), M["plastic_gray"], plane="yz", bevel=0.003, parent=root)
    text("silk", "PCIEX16_1", 0.028, (-0.62, PCIE_Y + 0.08, 0.0005), M["silk"], parent=root, kind="mono", extrude=0.0002)
    box("pcie_x1", (0.25, 0.06, 0.08), (-0.55, -0.65, 0.04), M["plastic_black"], bevel=0.004, parent=root)
    box("pcie_slot2", (0.9, 0.06, 0.08), (-0.3, -1.0, 0.04), M["plastic_black"], bevel=0.004, parent=root)
    text("silk", "PCIEX16_2", 0.028, (-0.62, -1.08, 0.0005), M["silk"], parent=root, kind="mono", extrude=0.0002)

    # ── Chipset ──
    box("chipset_base", (0.6, 0.6, 0.05), (0.6, -1.0, 0.025), M["alu_dark"], bevel=0.008, parent=root)
    cp = prism("chipset_top", [(-0.26, -0.26), (0.26, -0.26), (0.26, 0.14), (0.14, 0.26), (-0.26, 0.26)],
               0.012, (0.6, -1.0, 0.056), M["alu_bright"], bevel=0.004, parent=root)
    text("chipset_logo", "CSS", 0.12, (0.6, -1.0, 0.0635), M["gunmetal"], parent=root, extrude=0.0012)
    torus("GLOW_chipset", 0.16, 0.007, (0.6, -1.0, 0.063), M["glow"], parent=root)

    # ── SATA ──
    for i in range(4):
        y = -0.6 - i * 0.13
        sata = box("sata", (0.12, 0.1, 0.07), (1.13, y, 0.035), M["plastic_black"], bevel=0.003, parent=root)
        boolean_cut(sata, [cutter_box((0.08, 0.05, 0.03), (1.19, y, 0.04))])
    text("silk", "SATA6G", 0.028, (1.0, -0.47, 0.0005), M["silk"], parent=root, kind="mono", extrude=0.0002)

    # ── Audio: blindaje EMI, condensadores dorados y separación iluminada ──
    shield = box("audio_shield", (0.22, 0.16, 0.02), (-0.95, -1.25, 0.01), M["alu_bright"], bevel=0.003, parent=root)
    text("audio_t", "CSS AUDIO", 0.025, (-0.95, -1.25, 0.0205), M["gunmetal"], parent=root, extrude=0.0003)
    for k in range(6):
        x, y = -1.12 + (k % 3) * 0.075, -1.42 + (k // 3) * 0.075
        cyl("audio_cap", 0.028, 0.07, (x + 0.33, y, 0.035), M["gold"], parent=root, bevel=0.005)
    box("GLOW_audio_h", (0.6, 0.007, 0.002), (-0.9, -1.07, 0.001), M["glow"], bevel=0, parent=root)
    box("GLOW_audio_v", (0.007, 0.45, 0.002), (-0.6, -1.295, 0.001), M["glow"], bevel=0, parent=root)

    # ── Chips pequeños con serigrafía ──
    for (x, y, w, label) in ((0.98, -0.32, 0.12, "BIOS"), (0.35, 0.25, 0.1, "CLK"), (-0.9, 0.3, 0.13, "SIO"),
                             (0.95, 1.25, 0.1, "RGB"), (-0.95, -0.55, 0.11, "LAN")):
        box("ic", (w, w, 0.012), (x, y, 0.006), M["chip"], bevel=0.0015, parent=root)
        text("ic_t", label, 0.022, (x, y, 0.0122), M["chip_text"], parent=root, kind="mono", extrude=0.0002)

    text("silk_logo", "COMPUSERVICES  ·  X1 GAMING", 0.045, (0.45, -1.47, 0.0005), M["silk"], parent=root, extrude=0.0002)

    # ── Componentes SMD (una sola malla por material) ──
    import random
    rnd = random.Random(42)
    bm_body, bm_term = bmesh.new(), bmesh.new()
    for _ in range(420):
        x, y = rnd.uniform(-1.15, 1.15), rnd.uniform(-1.45, 1.45)
        horiz = rnd.random() > 0.5
        L, W = (0.026, 0.013) if rnd.random() > 0.3 else (0.016, 0.008)
        sx_, sy_ = (L, W) if horiz else (W, L)
        res = bmesh.ops.create_cube(bm_body, size=1.0)
        bmesh.ops.scale(bm_body, vec=(sx_ * 0.6 if horiz else sx_, sy_ if horiz else sy_ * 0.6, 0.006), verts=res["verts"])
        bmesh.ops.translate(bm_body, vec=(x, y, 0.003), verts=res["verts"])
        for s in (-1, 1):
            r2 = bmesh.ops.create_cube(bm_term, size=1.0)
            bmesh.ops.scale(bm_term, vec=(sx_ * 0.22 if horiz else sx_, sy_ if horiz else sy_ * 0.22, 0.0062), verts=r2["verts"])
            off = (s * sx_ * 0.4, 0) if horiz else (0, s * sy_ * 0.4)
            bmesh.ops.translate(bm_term, vec=(x + off[0], y + off[1], 0.0031), verts=r2["verts"])
    mesh_from_bmesh("smd_body", bm_body, M["ceramic"], parent=root)
    mesh_from_bmesh("smd_term", bm_term, M["tin"], parent=root)
    return root


# ═════════════════════════════════════════════════════════════════════════════
#  PIEZAS INSTALABLES
# ═════════════════════════════════════════════════════════════════════════════


def build_cpu():
    root = empty("Part_cpu", (SOCKET[0], SOCKET[1], 0.026))
    box("substrate", (0.44, 0.44, 0.012), (0, 0, 0), M["substrate"], bevel=0.002, parent=root)
    box("ihs_skirt", (0.385, 0.385, 0.008), (0, 0, 0.01), M["nickel"], bevel=0.003, parent=root)
    ihs = box("ihs_top", (0.34, 0.34, 0.024), (0, 0, 0.024), M["nickel"], bevel=0.01, segments=3, parent=root)
    # Muescas laterales del IHS
    boolean_cut(ihs, [cutter_box((0.06, 0.05, 0.05), (sx, sy, 0.02)) for (sx, sy) in
                      ((-0.17, 0.08), (-0.17, -0.08), (0.17, 0.08), (0.17, -0.08))])
    text("cpu_brand", "COMPUSERVICES", 0.034, (0, 0.07, 0.0362), M["gunmetal"], parent=root, extrude=0.0002)
    text("cpu_model", "CSS-X9  14C · 5.8GHz", 0.026, (0, 0.015, 0.0362), M["gunmetal"], parent=root, kind="mono", extrude=0.0002)
    text("cpu_serial", "X4G7 2611A  MALAY", 0.018, (0, -0.04, 0.0362), M["gunmetal"], parent=root, kind="mono", extrude=0.0002)
    box("pin1", (0.025, 0.025, 0.002), (-0.2, -0.2, 0.0065), M["gold"], bevel=0, parent=root)
    for k in range(10):
        box("cpu_smd", (0.016, 0.008, 0.005), (-0.16 + k * 0.035, -0.205, 0.008), M["ceramic"], bevel=0, parent=root)
    return root


def build_cooler():
    root = empty("Part_cooler", (SOCKET[0], SOCKET[1], 0.062))
    box("cold_plate", (0.4, 0.4, 0.02), (0, 0, 0.01), M["copper"], bevel=0.004, parent=root)
    for ang in (45, -45):
        box("bracket_arm", (1.08, 0.06, 0.014), (0, 0, 0.028), M["gunmetal"], bevel=0.005,
            rot=(0, 0, math.radians(ang)), parent=root)
    for dx in (-0.38, 0.38):
        for dy in (-0.38, 0.38):
            cyl("thumb", 0.032, 0.045, (dx, dy, 0.045), M["chrome"], parent=root, bevel=0.006)
            cyl("standoff", 0.012, 0.06, (dx, dy, -0.02), M["nickel"], parent=root, bevel=0.002)
    cyl("pump_body", 0.25, 0.13, (0, 0, 0.1), M["alu_dark"], parent=root, bevel=0.012, segments=3, verts=64)
    for z in (0.065, 0.1):
        torus("pump_groove", 0.251, 0.004, (0, 0, z), M["alu_bright"], parent=root)
    cyl("pump_glass", 0.226, 0.012, (0, 0, 0.17), M["glass"], parent=root, bevel=0.004, verts=64)
    torus("RGB_pump_ring", 0.236, 0.011, (0, 0, 0.165), M["rgb"], parent=root, major=96)
    torus("RGB_pump_inner", 0.13, 0.006, (0, 0, 0.172), M["rgb"], parent=root, major=64)
    text("pump_logo", "CSS", 0.085, (0, 0, 0.1755), M["alu_bright"], parent=root, extrude=0.001)
    # Racores giratorios cromados y mangueras con malla
    for x in (-0.085, 0.085):
        cyl("fitting", 0.045, 0.06, (x, 0.24, 0.12), M["chrome"], axis="y", parent=root, bevel=0.006)
        cyl("ferrule", 0.044, 0.05, (x, 0.29, 0.15), M["chrome"], axis="y", parent=root, bevel=0.006,
            rot=(math.radians(-35), 0, 0))
        k = 1.4 if x < 0 else 1.4
        tube(f"hose{x}", [(x, 0.29, 0.15), (x, 0.42, 0.28), (x * k, 0.72, 0.38), (x * 1.6, 1.0, 0.3),
                          (x * 1.6, 1.13, 0.0), (x * 1.6, 1.1, -0.45)], 0.038, M["sleeve"], parent=root)
    return root


def build_ram(i):
    x = RAM_X[i]
    root = empty(f"Part_ram{i}", (x, RAM_Y, 0.075))
    box("ram_pcb", (0.012, 1.33, 0.05), (0, 0, 0.0), M["pcb_dark"], bevel=0.001, parent=root)
    box("ram_pins", (0.013, 1.28, 0.02), (0, 0, -0.012), M["gold"], bevel=0, parent=root)
    profile = [(-0.665, 0.02), (0.665, 0.02), (0.665, 0.27), (0.42, 0.27), (0.36, 0.3), (-0.36, 0.3),
               (-0.42, 0.27), (-0.665, 0.27)]
    for side in (-1, 1):
        prism("ram_spreader", profile, 0.016, (side * 0.0145, 0, 0), M["alu_dark"], plane="yz", bevel=0.004, parent=root)
        stripe = [(-0.5, 0.06), (-0.1, 0.06), (0.05, 0.21), (-0.35, 0.21)]
        prism("ram_stripe", stripe, 0.004, (side * 0.0235, 0, 0), M["alu_bright"], plane="yz", bevel=0.001, parent=root)
        text("ram_txt", "CSS  DDR5-6000", 0.036, (side * 0.0258, 0.33, 0.12), M["alu_bright"], parent=root,
             extrude=0.0004, xdir=(0, side, 0), ydir=(0, 0, 1))
    box(f"RGB_ram{i}", (0.03, 0.72, 0.05), (0, 0, 0.32), M["rgb"], bevel=0.008, parent=root)
    for y in (-0.52, 0.52):
        box("ram_cap", (0.045, 0.3, 0.05), (0, y, 0.295), M["alu_dark"], bevel=0.006, parent=root)
    return root


def build_ssd():
    root = empty("Part_ssd", (M2[0], M2[1], 0.036))
    pcb = box("ssd_pcb", (0.8, 0.22, 0.008), (0, 0, 0), M["pcb_dark"], bevel=0.0015, parent=root)
    boolean_cut(pcb, [cutter_cyl(0.022, 0.05, (0.4, 0, 0)), cutter_box((0.012, 0.03, 0.05), (-0.38, 0.045, 0))])
    box("ssd_pins", (0.04, 0.2, 0.0085), (-0.38, 0, 0), M["gold"], bevel=0, parent=root)
    box("ctrl", (0.11, 0.11, 0.012), (-0.26, 0, 0.01), M["chip"], bevel=0.002, parent=root)
    text("ctrl_t", "CSS-E26", 0.018, (-0.26, 0, 0.0162), M["chip_text"], parent=root, kind="mono", extrude=0.0002)
    box("dram", (0.08, 0.1, 0.01), (-0.14, 0, 0.009), M["chip"], bevel=0.002, parent=root)
    for k in range(8):
        box("ssd_smd", (0.014, 0.007, 0.004), (-0.34 + (k % 2) * 0.02, -0.08 + (k // 2) * 0.05, 0.006), M["ceramic"], bevel=0, parent=root)
    box("label", (0.5, 0.2, 0.012), (0.13, 0, 0.011), M["label"], bevel=0.002, parent=root)
    text("ssd_t1", "CSS NVMe", 0.048, (0.13, 0.035, 0.0172), M["silk"], parent=root, extrude=0.0002)
    text("ssd_t2", "Gen4 x4 · 2TB", 0.03, (0.13, -0.035, 0.0172), M["silk"], parent=root, extrude=0.0002)
    cyl("ssd_screw", 0.02, 0.012, (0.4, 0, 0.008), M["chrome"], parent=root, bevel=0.003)
    return root


def fan_rotor(name, R, loc, rot, parent, blades=11):
    """Rotor con aspas curvas y alabeadas; el eje de giro es el z local."""
    bm = bmesh.new()
    r0, r1 = R * 0.3, R * 0.93
    nu, nv = 7, 6
    for b in range(blades):
        base = 2 * math.pi * b / blades
        grid = []
        for i in range(nu + 1):
            u = i / nu
            r = r0 + (r1 - r0) * u
            sweep = 0.6 * u * u
            width = 0.36 + 0.14 * u
            row = []
            for j in range(nv + 1):
                v = j / nv
                a = base + sweep + (v - 0.5) * width
                z = (v - 0.5) * (0.075 - 0.035 * u)
                row.append(bm.verts.new((r * math.cos(a), r * math.sin(a), z)))
            grid.append(row)
        for i in range(nu):
            for j in range(nv):
                bm.faces.new((grid[i][j], grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]))
    rotor = mesh_from_bmesh(name, bm, M["blade"], loc=loc, parent=parent, smooth=True)
    rotor.rotation_euler = rot
    sol = rotor.modifiers.new("thick", "SOLIDIFY")
    sol.thickness = 0.006
    sol.offset = 0
    cyl(name + "_hub", R * 0.3, 0.05, (0, 0, 0), M["shroud"], parent=rotor, bevel=0.012, verts=48)
    cyl(name + "_cap", R * 0.2, 0.004, (0, 0, 0.027), M["alu_bright"], parent=rotor, bevel=0.001, verts=48)
    text(name + "_logo", "CSS", 0.04, (0, 0, 0.0295), M["gunmetal"], parent=rotor, extrude=0.0004,
         xdir=(1, 0, 0), ydir=(0, 1, 0))
    torus(name + "_rim", R * 0.94, 0.006, (0, 0, 0), M["blade"], parent=rotor)
    return rotor


def build_gpu():
    # Pivote de animación en el centro de la tarjeta; geometría relativa al conector PCIe
    root = empty("Part_gpu", (0.18, PCIE_Y - 0.2, 0.6))
    g = empty("gpu_body", (0, 0.2, -0.6), parent=root)

    box("gpu_pcb", (2.0, 0.016, 1.04), (-0.4, 0, 0.6), M["pcb_dark"], bevel=0.002, parent=g)
    box("gpu_fingers", (0.85, 0.018, 0.075), (-0.48, 0, 0.04), M["gold"], bevel=0, parent=g)

    bp = box("backplate", (2.8, 0.02, 1.08), (0, 0.02, 0.6), M["alu_dark"], bevel=0.008, parent=g)
    boolean_cut(bp, [cutter_box((0.55, 0.1, 0.78), (1.02, 0.02, 0.6))])
    text("bp_logo", "COMPUSERVICES", 0.075, (-0.35, 0.0305, 0.62), M["alu_bright"], parent=g, extrude=0.0008,
         xdir=(1, 0, 0), ydir=(0, 0, -1))
    box("GLOW_gpu_back", (2.0, 0.004, 0.014), (-0.2, 0.031, 1.0), M["glow"], bevel=0, parent=g)
    box("GLOW_gpu_back2", (1.1, 0.004, 0.014), (-0.65, 0.031, 0.95), M["glow"], bevel=0, parent=g)

    # Bloque de aletas y heatpipes de cobre
    fin = box("fins", (0.006, 0.36, 0.96), (-1.33, -0.21, 0.6), M["alu_bright"], bevel=0, parent=g)
    array(fin, 89, (0.03, 0, 0))
    for k, (z1, z2) in enumerate(((0.3, 0.9), (0.42, 0.78), (0.54, 0.66))):
        y = -0.12 - k * 0.07
        tube(f"heatpipe{k}", [(-1.2, y, z1), (1.25, y, z1), (1.42, y, (z1 + z2) / 2), (1.25, y, z2), (-0.6, y, z2)],
             0.022, M["copper"], parent=g)

    # Carcasa inferior con huecos para ventiladores
    fans_x = (-0.9, 0.0, 0.9)
    plate = box("shroud_plate", (2.84, 0.05, 1.1), (0, -0.425, 0.6), M["shroud"], bevel=0.014, segments=3, parent=g)
    boolean_cut(plate, [cutter_cyl(0.41, 0.2, (x, -0.425, 0.6), axis="y", verts=96) for x in fans_x])
    for x in fans_x:
        torus("fan_trim", 0.415, 0.011, (x, -0.452, 0.6), M["alu_bright"], axis="y", major=96, parent=g)
    for x in (-0.45, 0.45):
        box("trim", (0.035, 0.012, 1.0), (x, -0.456, 0.6), M["alu_bright"], bevel=0.004,
            rot=(0, math.radians(22), 0), parent=g)

    # Borde visible (cara superior al montarla) con tira RGB y logo
    edge = box("shroud_edge", (2.84, 0.43, 0.05), (0, -0.21, 1.13), M["shroud"], bevel=0.012, segments=3, parent=g)
    # Ranura de la tira RGB + rejilla de ventilación inclinada que deja ver las aletas
    vents = [cutter_box((0.026, 0.17, 0.08), (-0.55 + k * 0.085, -0.3, 1.14), rot=(0, 0, math.radians(28)))
             for k in range(10)]
    boolean_cut(edge, [cutter_box((1.84, 0.034, 0.03), (0.25, -0.12, 1.155))] + vents)
    for y in (-0.418, -0.002):
        box("edge_trim", (2.76, 0.012, 0.014), (0, y, 1.15), M["alu_bright"], bevel=0.004, parent=g)
    for x in (-1.38, 1.38):
        prism("edge_corner", [(-0.03, -0.2), (0.03, -0.2), (0.03, 0.12), (-0.03, 0.2)], 0.02,
              (x, -0.21, 1.158), M["alu_bright"], bevel=0.004, parent=g)
    box("RGB_gpu_strip", (1.82, 0.03, 0.014), (0.25, -0.12, 1.148), M["rgb"], bevel=0.003, parent=g)
    text("RGB_gpu_logo", "CSS", 0.13, (-1.0, -0.235, 1.156), M["rgb"], parent=g, extrude=0.002)
    box("edge_panel", (0.9, 0.16, 0.008), (0.8, -0.29, 1.157), M["alu_bright"], bevel=0.003, parent=g)
    text("edge_txt", "X-SERIES  OC", 0.055, (0.8, -0.29, 1.1615), M["gunmetal"], parent=g, extrude=0.0004)
    box("shroud_inner", (2.84, 0.43, 0.04), (0, -0.21, 0.11), M["shroud"], bevel=0.01, parent=g)
    for z in (0.22, 0.98):
        box("end_cap", (0.06, 0.43, 0.24), (1.41, -0.21, z), M["shroud"], bevel=0.01, parent=g)

    # Conector de energía 12V-2x6
    pwr = box("pwr", (0.24, 0.07, 0.06), (0.35, -0.03, 1.1), M["plastic_black"], bevel=0.004, parent=g)
    pin_holes(pwr, (0.35, -0.03, 1.13), 6, 2, 0.035, 0.022, 0.03)

    # Ventiladores: eje de giro hacia -y
    for k, x in enumerate(fans_x):
        fan_rotor(f"FanRotor_gpu{k}", 0.4, (x, -0.43, 0.6), (math.pi / 2, 0, 0), g)

    # Bracket PCIe con puertos y ventilación
    br = box("bracket", (0.02, 0.6, 1.22), (-1.43, -0.2, 0.6), M["nickel"], bevel=0.003, parent=g)
    boolean_cut(br, [cutter_box((0.05, 0.035, 0.24), (-1.43, -0.38 + k * 0.06, 0.95)) for k in range(5)])
    for k, z in enumerate((0.25, 0.42, 0.59, 0.76)):
        box("port", (0.03, 0.08 if k else 0.1, 0.13), (-1.445, -0.1, z), M["chrome"], bevel=0.003, parent=g)
        box("port_in", (0.032, 0.05, 0.1), (-1.447, -0.1, z), M["plastic_black"], bevel=0, parent=g)
    return root


# ═════════════════════════════════════════════════════════════════════════════
#  FUENTE DE PODER Y GABINETE
# ═════════════════════════════════════════════════════════════════════════════

# Gabinete tipo "fishtank": vidrio frontal y lateral sin columna (ejes three.js, dm)
CASE = {"x0": -1.62, "x1": 2.62, "y0": -2.8, "y1": 1.95, "z0": -0.34, "z1": 1.94}
PSU_CENTER = (-0.45, -2.15, 0.55)


def case_fan(name, center, rot, R, parent, rgb_name):
    """Ventilador de 120 mm con marco, aro RGB y rotor. El eje es el z local del soporte."""
    mount = empty(f"mount_{rgb_name}", center, parent=parent)
    mount.rotation_euler = rot
    frame = box("fanframe", (2.08 * R, 2.08 * R, 0.25), (0, 0, 0), M["plastic_black"], bevel=0.02, parent=mount)
    boolean_cut(frame, [cutter_cyl(R * 0.97, 0.4, (0, 0, 0), verts=96)])
    for sx in (-1, 1):
        for sy in (-1, 1):
            cyl("fanscrew", 0.035, 0.02, (sx * R * 0.86, sy * R * 0.86, 0.13), M["chrome"], parent=mount, bevel=0.004)
    torus(rgb_name, R * 0.985, 0.022, (0, 0, 0.11), M["rgb"], major=96, parent=mount)
    torus(rgb_name + "b", R * 0.985, 0.022, (0, 0, -0.11), M["rgb"], major=96, parent=mount)
    fan_rotor(name, R * 0.95, (0, 0, 0), (0, 0, 0), mount)
    return mount


def build_psu():
    cx, cy, cz = PSU_CENTER
    root = empty("Part_psu", PSU_CENTER)
    body = box("psu_body", (1.5, 0.86, 1.4), (0, 0, 0), M["case"], bevel=0.03, segments=3, parent=root)
    # Rejilla del ventilador en la cara superior
    boolean_cut(body, [cutter_cyl(0.6, 0.2, (0.05, 0.43, 0.05), axis="y", verts=96)])
    for k, r in enumerate((0.58, 0.46, 0.34, 0.22)):
        torus("psu_grille", r, 0.009, (0.05, 0.42, 0.05), M["gunmetal"], axis="y", major=96, parent=root)
    for a in (0, 45, 90, 135):
        box("psu_spoke", (1.16, 0.012, 0.016), (0.05, 0.42, 0.05), M["gunmetal"], bevel=0,
            rot=(0, math.radians(a), 0), parent=root)
    fan_rotor("FanRotor_psu", 0.55, (0.05, 0.36, 0.05), (-math.pi / 2, 0, 0), root)
    # Etiqueta lateral (cara hacia el vidrio)
    box("psu_label", (0.9, 0.42, 0.006), (-0.15, 0.02, 0.703), M["label"], bevel=0.003, parent=root)
    text("psu_t1", "CSS 850W", 0.11, (-0.15, 0.08, 0.7075), M["silk"], parent=root, extrude=0.0005)
    text("psu_t2", "80 PLUS GOLD · FULL MODULAR", 0.038, (-0.15, -0.07, 0.7075), M["silk"], parent=root, extrude=0.0003)
    box("GLOW_psu", (1.3, 0.012, 0.008), (0, -0.3, 0.703), M["glow"], bevel=0, parent=root)
    # Panel modular (cara frontal +x, donde salen los cables)
    box("psu_panel", (0.012, 0.7, 1.2), (0.756, 0, 0), M["gunmetal"], bevel=0.004, parent=root)
    for k, (y, z, w) in enumerate(((0.2, 0.0, 0.34), (0.2, 0.42, 0.18), (-0.15, 0.42, 0.18), (-0.15, 0.0, 0.18), (-0.15, -0.35, 0.18))):
        sock = box("psu_sock", (0.03, 0.14, w), (0.765, y, z), M["plastic_black"], bevel=0.003, parent=root)
        pin_holes(sock, (0.78, y, z), max(2, int(w / 0.045)), 2, 0.04, 0.025, 0.03, face="x")
    # Conector AC e interruptor en la cara trasera
    box("psu_ac", (0.03, 0.2, 0.28), (-0.766, -0.15, 0.3), M["plastic_black"], bevel=0.004, parent=root)
    box("psu_switch", (0.03, 0.12, 0.08), (-0.766, -0.15, -0.05), M["plastic_black"], bevel=0.004, parent=root)
    return root


def build_case():
    x0, x1, y0, y1, z0, z1 = (CASE[k] for k in ("x0", "x1", "y0", "y1", "z0", "z1"))
    cx, cy, cz = (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2
    W, H, D = x1 - x0, y1 - y0, z1 - z0
    roots = {}

    # Bandeja de la placa (detrás de todo) con pasacables de goma
    r = roots["case_tray"] = empty("Part_case_tray", (cx, cy, z0))
    tray = box("tray", (W, H, 0.04), (0, 0, 0), M["case"], bevel=0.01, parent=r)
    grommets = [((1.45 - cx, yy - cy, 0), (0.12, 0.55)) for yy in (0.7, -0.35, -1.25)] + [((-0.55 - cx, 1.76 - cy, 0), (0.5, 0.12))]
    boolean_cut(tray, [cutter_box((w, h, 0.2), loc) for loc, (w, h) in grommets])
    for loc, (w, h) in grommets:
        box("grommet", (w + 0.03, h + 0.03, 0.05), loc, M["rubber_black"], bevel=0.015, parent=r)
    for (sx, sy) in ((-1.08, 1.38), (0.3, 1.38), (1.08, 1.38), (-1.08, -1.38), (0.3, -1.38), (1.08, -1.38)):
        cyl("standoff", 0.035, 0.28, (sx - cx, sy - cy, 0.15), M["gold"], parent=r, bevel=0.004)

    # Piso con patas, techo con rejilla y trasera con ranuras PCIe
    r = roots["case_bottom"] = empty("Part_case_bottom", (cx, y0, cz))
    box("bottom", (W, 0.06, D), (0, 0, 0), M["case"], bevel=0.015, parent=r)
    for sx in (-1, 1):
        for sz in (-1, 1):
            cyl("foot", 0.12, 0.12, (sx * (W / 2 - 0.3), -0.09, sz * (D / 2 - 0.25)), M["rubber_black"], axis="y", parent=r, bevel=0.02)
    box("GLOW_case_bottom", (W - 0.1, 0.012, 0.012), (0, 0.035, D / 2 - 0.01), M["glow"], bevel=0, parent=r)
    for k, fx in enumerate((0.95, 2.05)):
        case_fan(f"FanRotor_case{k}", (fx - cx, 0.18, 0.85 - cz), (-math.pi / 2, 0, 0), 0.52, r, f"RGB_casefan{k}")

    r = roots["case_top"] = empty("Part_case_top", (cx, y1, cz))
    top = box("top", (W, 0.06, D), (0, 0, 0), M["case"], bevel=0.015, parent=r)
    boolean_cut(top, [cutter_box((0.05, 0.2, D - 0.5), (-W / 2 + 0.6 + k * 0.12, 0, 0)) for k in range(26)])
    box("top_mesh", (W - 1.0, 0.012, D - 0.45), (0.1, -0.025, 0), M["gunmetal"], bevel=0, parent=r)
    box("GLOW_case_top", (W - 0.1, 0.012, 0.012), (0, -0.035, D / 2 - 0.01), M["glow"], bevel=0, parent=r)

    r = roots["case_rear"] = empty("Part_case_rear", (x0, cy, cz))
    rear = box("rear", (0.05, H, D), (0, 0, 0), M["case"], bevel=0.012, parent=r)
    boolean_cut(rear, [cutter_box((0.2, 0.95, 0.3), (0, 1.0 - cy, 0.15 - cz))] +
                [cutter_box((0.2, 0.08, 0.6), (0, -0.3 - k * 0.2 - cy, 0.45 - cz)) for k in range(6)])
    case_fan("FanRotor_case2", (0.14, 1.05 - cy, 0.95 - cz), (0, math.pi / 2, 0), 0.52, r, "RGB_casefan2")

    # Vidrios templados con marco de aluminio
    r = roots["case_front"] = empty("Part_case_front", (x1, cy, cz))
    box("GLASS_front", (0.012, H - 0.08, D - 0.02), (0, 0, 0), M["glass_panel"], bevel=0.004, parent=r)
    r = roots["case_side"] = empty("Part_case_side", (cx, cy, z1))
    box("GLASS_side", (W - 0.02, H - 0.08, 0.012), (0, 0, 0), M["glass_panel"], bevel=0.004, parent=r)
    for sy in (-1, 1):
        box("glass_trim", (W, 0.03, 0.02), (0, sy * (H / 2 - 0.05), 0.01), M["alu_bright"], bevel=0.006, parent=r)
    text("case_logo", "CSS", 0.16, (W / 2 - 0.45, -H / 2 + 0.22, 0.0075), M["alu_bright"], parent=r, extrude=0.0006)
    return list(roots.values())


# ═════════════════════════════════════════════════════════════════════════════
#  CONSTRUCCIÓN Y EXPORTACIÓN
# ═════════════════════════════════════════════════════════════════════════════

tex, buses = build_textures(OUT_DIR)
parts = [build_motherboard(tex), build_cpu(), build_cooler()] + [build_ram(i) for i in range(4)] + \
    [build_ssd(), build_gpu(), build_psu()] + build_case()

for p in parts:
    consolidate(p)
delete_cutters()

# Limpieza: quitar objetos auxiliares ocultos
for ob in list(bpy.data.objects):
    if ob.hide_render:
        bpy.data.objects.remove(ob, do_unlink=True)

os.makedirs(OUT_DIR, exist_ok=True)
out = os.path.join(OUT_DIR, "pc-build.raw.glb")
bpy.ops.export_scene.gltf(
    filepath=out,
    export_format="GLB",
    export_yup=False,
    export_apply=True,
    export_image_format="WEBP",
    export_image_quality=90,
    export_cameras=False,
    export_lights=False,
    export_extras=False,
)

with open(os.path.join(OUT_DIR, "pc-traces.json"), "w") as f:
    json.dump([[[round(x, 4), round(y, 4)] for x, y in p] for p in buses], f)

meshes = [o for o in bpy.data.objects if o.type == "MESH"]
tris = sum(sum(len(p.vertices) - 2 for p in o.evaluated_get(bpy.context.evaluated_depsgraph_get()).data.polygons) for o in meshes)
print(f"OK {out}  objetos={len(meshes)}  triángulos≈{tris}")
