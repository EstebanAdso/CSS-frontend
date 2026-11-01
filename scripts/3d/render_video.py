"""Renderiza el loop de ensamblaje del hero como secuencia PNG (Eevee).

Uso:
  blender -b --factory-startup -P scripts/3d/render_video.py -- <tamaño> [preview]

  tamaño   lado del video cuadrado en px (1080 escritorio, 720 móvil)
  preview  renderiza solo 5 fotogramas clave en scripts/3d/out/preview_*.png

Entradas: scripts/3d/out/pc-build.raw.glb y pc-traces.json (npm run 3d:build)
Salida:   scripts/3d/out/frames_<tamaño>/0000.png …  (codificar con npm run 3d:encode)

La línea de tiempo replica src/components/hero/BuildHud.tsx (STEPS) para que el
panel "Build log" de la web quede sincronizado con el video.
"""

import json
import math
import os
import sys

import bpy
import numpy as np
from mathutils import Color, Matrix, Vector

ARGS = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
SIZE = int(ARGS[0]) if ARGS else 1080
PREVIEW = "preview" in ARGS
ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "out")
FPS = 60

# ─── Línea de tiempo (idéntica a la versión web) ─────────────────────────────

# (entrada, duración, salida) en segundos
PARTS = {
    "cpu":         (0.9, 0.8, 18.3),
    "cooler":      (1.8, 0.9, 18.15),
    "ram0":        (2.8, 0.7, 17.96),
    "ram1":        (3.08, 0.7, 17.89),
    "ram2":        (3.36, 0.7, 17.82),
    "ram3":        (3.64, 0.7, 17.75),
    "ssd":         (4.45, 0.8, 17.65),
    "gpu":         (5.35, 1.2, 17.5),
    "psu":         (6.7, 0.8, 17.35),
    "case_tray":   (8.8, 0.7, 16.75),
    "case_bottom": (8.95, 0.7, 16.65),
    "case_top":    (9.05, 0.7, 16.55),
    "case_rear":   (9.1, 0.7, 16.5),
    "case_front":  (9.4, 0.75, 16.35),
    "case_side":   (9.55, 0.75, 16.2),
}
CABLES = {  # crecimiento desde la fuente: (inicio, duración); se recogen juntos al final
    "atx24": (7.55, 0.7),
    "eps8":  (7.75, 0.7),
    "pcie":  (7.95, 0.7),
}
CABLE_RETRACT = (16.95, 0.35)
CAMERA_OUT = (6.3, 1.6)    # la cámara se aleja para mostrar el gabinete
CAMERA_IN = (16.3, 1.1)    # y vuelve al plano cerrado para el loop
OUT_DUR = 0.75
POWER_ON, POWER_OFF = 10.5, 15.8
LOOP_START, CYCLE = 0.5, 19.4
LOOP_LEN = CYCLE - LOOP_START

ENTRY = {  # desplazamiento / giro de entrada en ejes three.js
    "cpu":         ((0.4, 0.5, 2.8), (-0.9, 0.6, 1.4)),
    "cooler":      ((-0.2, 0.5, 3.0), (0.6, -0.5, 0.4)),
    "ram0":        ((0.5, 0.15, 1.9), (0, 0.35, 0.12)),
    "ram1":        ((0.58, 0.15, 1.9), (0, 0.35, 0.12)),
    "ram2":        ((0.66, 0.15, 1.9), (0, 0.35, 0.12)),
    "ram3":        ((0.74, 0.15, 1.9), (0, 0.35, 0.12)),
    "ssd":         ((-0.5, -0.25, 1.5), (0.25, 0.55, -0.25)),
    "gpu":         ((1.8, -0.7, 2.9), (-1.15, 0.55, 0.3)),
    "psu":         ((-1.6, -1.4, 2.6), (0.4, -0.6, 0.2)),
    "case_tray":   ((0, 0, -4.0), (0, 0, 0)),
    "case_bottom": ((0, -2.6, 0.6), (0.35, 0, 0)),
    "case_top":    ((0, 2.6, 0.6), (-0.35, 0, 0)),
    "case_rear":   ((-3.2, 0, 0.4), (0, 0.45, 0)),
    "case_front":  ((3.4, 0, 1.0), (0, -0.5, 0)),
    "case_side":   ((0, 0.2, 4.2), (0, 0, 0)),
}


def clamp01(x):
    return 0.0 if x < 0 else 1.0 if x > 1 else x


def prog(t, start, dur):
    return clamp01((t - start) / dur)


def ease_out_quart(x):
    return 1 - (1 - x) ** 4


def ease_in_cubic(x):
    return x ** 3


def ease_in_out_cubic(x):
    return 4 * x ** 3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2


def install(t, key):
    a, d, o = PARTS[key]
    return ease_out_quart(prog(t, a, d)) * (1 - ease_in_cubic(prog(t, o, OUT_DUR)))


def slot_glow(t, key):
    a, d, o = PARTS[key]
    end = a + d
    if t < a - 0.35 or t > o:
        return 0.0
    if t < a:
        return prog(t, a - 0.35, 0.35) * 0.8
    if t < end:
        return 0.8 + 1.7 * ((t - a) / d)
    return 2.5 * math.exp(-(t - end) * 2.5)


def power(t):
    return ease_in_out_cubic(prog(t, POWER_ON, 0.8)) * (1 - prog(t, POWER_OFF, 0.4))


def sweep(t):
    return max(0.0, (t - POWER_ON) * 2.8)


BRAND = [Color((0.2623, 0.0844, 1.0)), Color((1.0, 0.0242, 0.6724)), Color((0.0, 0.7835, 1.0))]  # lineal


def brand_rgb(phase):
    n = len(BRAND)
    x = (phase % 1) * n
    i = int(x)
    f = x - i
    s = f * f * (3 - 2 * f)
    a, b = BRAND[i], BRAND[(i + 1) % n]
    return (a.r + (b.r - a.r) * s, a.g + (b.g - a.g) * s, a.b + (b.b - a.b) * s)


# ─── Ejes: three.js (y arriba, z a cámara) → Blender (z arriba, -y a cámara) ──

C = Matrix(((1, 0, 0, 0), (0, 0, -1, 0), (0, 1, 0, 0), (0, 0, 0, 1)))
C_INV = C.inverted()


def v3(x, y, z):
    return (C @ Vector((x, y, z, 1))).xyz


def three_rot(rx, ry, rz):
    """Rotación Euler XYZ de three.js expresada en ejes de Blender."""
    r = Matrix.Rotation(rx, 4, "X") @ Matrix.Rotation(ry, 4, "Y") @ Matrix.Rotation(rz, 4, "Z")
    return C @ r @ C_INV


# ─── Escena ──────────────────────────────────────────────────────────────────

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
bpy.ops.import_scene.gltf(filepath=os.path.join(OUT, "pc-build.raw.glb"))

rig = bpy.data.objects.new("Rig", None)
scene.collection.objects.link(rig)
rig.rotation_mode = "QUATERNION"
offset = bpy.data.objects.new("Offset", None)
scene.collection.objects.link(offset)
offset.parent = rig
offset.location = v3(-0.1, 0, 0)
for ob in list(scene.objects):
    if ob.parent is None and ob not in (rig, offset):
        ob.parent = offset

board = bpy.data.objects["Part_board"]
parts = {k: bpy.data.objects[f"Part_{k}"] for k in PARTS}
for ob in parts.values():
    ob.rotation_mode = "QUATERNION"
base = {k: (ob.matrix_basis.copy()) for k, ob in parts.items()}

import re  # noqa: E402

# Rotores: GPU, fuente y ventiladores del gabinete (no sus piezas hijas *_hub, *_cap…)
fans = [ob for ob in scene.objects if re.fullmatch(r"FanRotor_(gpu\d|psu|case\d)", ob.name)]
print("FANS", [f.name for f in fans])
for f in fans:
    f.rotation_mode = "QUATERNION"
fan_base = [f.matrix_basis.copy() for f in fans]
FAN_AXIS = (C @ Vector((0, 0, 1, 0))).xyz  # eje z local de three → eje local en Blender


def emission_material(name, color=(1, 1, 1), strength=1.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission")
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(em.outputs[0], out.inputs[0])
    em.inputs["Color"].default_value = (*color, 1)
    em.inputs["Strength"].default_value = strength
    return m, em


# Luces RGB y acentos de la placa
RGB_PROFILE = {"RGB_pump_ring": (0, 3.2), "RGB_pump_inner": (0.35, 2.4), "RGB_gpu_logo": (0.5, 2.6), "RGB_gpu_strip": (0.15, 3.0)}
rgb = []
glow_mat, glow_em = emission_material("GLOW_anim", (0.2623, 0.0844, 1.0))
for ob in scene.objects:
    if ob.type != "MESH":
        continue
    if ob.name.startswith("RGB_"):
        if ob.name.startswith("RGB_ram"):
            prof = (int(ob.name[-1]) * 0.09, 2.8)
        elif ob.name.startswith("RGB_casefan"):
            prof = (0.2 + int(re.search(r"\d", ob.name).group()) * 0.12, 3.2)
        else:
            prof = RGB_PROFILE.get(ob.name, (0.15, 3.0))
        m, em = emission_material(f"{ob.name}_anim")
        ob.data.materials.clear()
        ob.data.materials.append(m)
        rgb.append((em, prof))
    elif ob.name.startswith("GLOW_"):
        ob.data.materials.clear()
        ob.data.materials.append(glow_mat)

# Vidrio templado: transparencia real con reflejos (y sin proyectar sombra)
for ob in scene.objects:
    if ob.name.startswith("GLASS_"):
        ob.visible_shadow = False
        for m in ob.data.materials:
            m.surface_render_method = "BLENDED"
            m.use_transparency_overlap = False

# ─── Cables de la fuente: crecen hasta su conector (bevel_factor_end animado) ──

sleeve = bpy.data.materials.get("sleeve")
plug_mat = bpy.data.materials.get("plastic_black")
CABLE_PATHS = {  # ejes three.js, espacio de la placa; el último punto entra al conector
    "atx24": ([(0.33, -2.1, 0.55), (0.8, -2.05, 0.5), (1.42, -1.7, 0.25), (1.46, -0.6, 0.16),
               (1.46, 0.45, 0.14), (1.36, 0.7, 0.1), (1.21, 0.7, 0.09)], [(0, 0, -0.05), (0, 0, 0), (0, 0, 0.05)],
              (0.06, 0.6, 0.16), (1.24, 0.7, 0.09)),
    "eps8": ([(0.33, -2.0, 0.15), (0.65, -1.9, -0.1), (0.7, -1.5, -0.48), (0.0, 0.5, -0.48),
              (-0.55, 1.76, -0.48), (-0.55, 1.79, -0.1), (-0.55, 1.62, 0.32), (-0.55, 1.48, 0.3), (-0.55, 1.45, 0.15)],
             [(-0.05, 0, 0), (0.05, 0, 0)], (0.2, 0.1, 0.06), (-0.55, 1.45, 0.15)),
    "pcie": ([(0.33, -1.95, 0.9), (0.75, -1.6, 1.3), (0.62, -0.62, 1.44), (0.53, -0.38, 1.36), (0.53, -0.33, 1.17)],
             [(-0.06, 0, 0), (0.06, 0, 0)], (0.24, 0.07, 0.05), (0.53, -0.33, 1.17)),
}
cables = {}
for key, (pts, offsets, plug_size, plug_at) in CABLE_PATHS.items():
    curves = []
    for k, (ox, oy, oz) in enumerate(offsets):
        cu = bpy.data.curves.new(f"cable_{key}{k}", "CURVE")
        cu.dimensions = "3D"
        cu.bevel_depth = 0.032 if key == "atx24" else 0.028
        cu.bevel_resolution = 4
        cu.use_fill_caps = True
        cu.bevel_factor_mapping_end = "SPLINE"
        sp = cu.splines.new("NURBS")
        sp.points.add(len(pts) - 1)
        for p, (x, y, z) in zip(sp.points, pts):
            p.co = (*v3(x + ox, y + oy, z + oz), 1)
        sp.use_endpoint_u = True
        sp.order_u = 3
        ob = bpy.data.objects.new(f"cable_{key}{k}", cu)
        scene.collection.objects.link(ob)
        ob.parent = board
        cu.materials.append(sleeve)
        curves.append(cu)
    # Conector (plug) que aparece al llegar
    me = bpy.data.meshes.new(f"plug_{key}")
    import bmesh  # noqa: E402
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    sx, sy, sz = plug_size
    bmesh.ops.scale(bm, vec=(sx, sz, sy), verts=bm.verts)
    bm.to_mesh(me)
    bm.free()
    plug = bpy.data.objects.new(f"plug_{key}", me)
    scene.collection.objects.link(plug)
    plug.parent = board
    plug.location = v3(*plug_at)
    me.materials.append(plug_mat)
    cables[key] = (curves, plug)


def cable_amount(t, key):
    start, dur = CABLES[key]
    grow = ease_in_out_cubic(prog(t, start, dur))
    back = ease_in_out_cubic(prog(t, *CABLE_RETRACT))
    return grow * (1 - back)

# PCB: onda de energía desde el CPU (misma fórmula que el shader web)
pcb = bpy.data.objects["PCB"]
pm = pcb.data.materials[0]
nt = pm.node_tree
bsdf = next(n for n in nt.nodes if n.type == "BSDF_PRINCIPLED")
emit_src = bsdf.inputs["Emission Color"].links[0].from_socket if bsdf.inputs["Emission Color"].links else None
sweep_val = nt.nodes.new("ShaderNodeValue")
sweep_val.label = "sweep"
fade_val = nt.nodes.new("ShaderNodeValue")
fade_val.label = "fade"
tc = nt.nodes.new("ShaderNodeTexCoord")
sep = nt.nodes.new("ShaderNodeSeparateXYZ")
nt.links.new(tc.outputs["Object"], sep.inputs[0])
comb = nt.nodes.new("ShaderNodeCombineXYZ")
dx = nt.nodes.new("ShaderNodeMath")
dx.operation = "ADD"
dx.inputs[1].default_value = 0.1  # x - (-0.1)
nt.links.new(sep.outputs["X"], dx.inputs[0])
dz = nt.nodes.new("ShaderNodeMath")
dz.operation = "SUBTRACT"
dz.inputs[1].default_value = 0.7  # y_three - 0.7 (z local en Blender)
nt.links.new(sep.outputs["Z"], dz.inputs[0])
nt.links.new(dx.outputs[0], comb.inputs["X"])
nt.links.new(dz.outputs[0], comb.inputs["Y"])
length = nt.nodes.new("ShaderNodeVectorMath")
length.operation = "LENGTH"
nt.links.new(comb.outputs[0], length.inputs[0])


def math_node(op, a=None, b=None, clamp=False):
    n = nt.nodes.new("ShaderNodeMath")
    n.operation = op
    n.use_clamp = clamp
    for i, v in enumerate((a, b)):
        if v is None:
            continue
        if isinstance(v, (int, float)):
            n.inputs[i].default_value = v
        else:
            nt.links.new(v, n.inputs[i])
    return n


diff = math_node("SUBTRACT", sweep_val.outputs[0], length.outputs["Value"])
lit = math_node("DIVIDE", diff.outputs[0], 0.35, clamp=True)
xf = math_node("DIVIDE", diff.outputs[0], 0.12)
xx = math_node("MULTIPLY", xf.outputs[0], xf.outputs[0])
neg = math_node("MULTIPLY", xx.outputs[0], -1.0)
front = math_node("EXPONENT", neg.outputs[0])
a1 = math_node("MULTIPLY", lit.outputs[0], 0.55)
a2 = math_node("MULTIPLY", front.outputs[0], 2.2)
s1 = math_node("ADD", a1.outputs[0], a2.outputs[0])
s2 = math_node("MULTIPLY", s1.outputs[0], fade_val.outputs[0])
s3 = math_node("MULTIPLY", s2.outputs[0], 2.6)
nt.links.new(s3.outputs[0], bsdf.inputs["Emission Strength"])
if emit_src is not None:
    tint = nt.nodes.new("ShaderNodeMix")
    tint.data_type = "RGBA"
    tint.blend_type = "MULTIPLY"
    tint.inputs["Factor"].default_value = 1.0
    nt.links.new(emit_src, tint.inputs[6])
    tint.inputs[7].default_value = (0.46, 0.27, 1.0, 1)
    nt.links.new(tint.outputs[2], bsdf.inputs["Emission Color"])

# Guías de luz de los slots (marcos cian)
GUIDES = [("cpu", (-0.1, 0.7), (0.66, 0.66), 0.046, 0.012), ("ssd", (-0.42, 0.05), (0.86, 0.27), 0.004, 0.012),
          ("gpu", (-0.3, -0.3), (0.97, 0.11), 0.09, 0.012)] + \
         [(f"ram{i}", (x, 0.7), (0.07, 1.4), 0.08, 0.01) for i, x in enumerate((0.5, 0.62, 0.78, 0.9))]
guides = []
for key, (cx, cy), (w, h), z, wd in GUIDES:
    m, em = emission_material(f"guide_{key}", (0.0, 0.7835, 1.0), 0.0)
    for (bx, by, sx, sy) in ((cx, cy + h / 2, w + wd, wd), (cx, cy - h / 2, w + wd, wd), (cx - w / 2, cy, wd, h), (cx + w / 2, cy, wd, h)):
        me = bpy.data.meshes.new("guide")
        import bmesh
        bm = bmesh.new()
        bmesh.ops.create_cube(bm, size=1.0)
        bmesh.ops.scale(bm, vec=(sx, 0.004, sy), verts=bm.verts)  # ejes Blender: (x, -z3, y3)
        bm.to_mesh(me)
        bm.free()
        ob = bpy.data.objects.new("guide", me)
        scene.collection.objects.link(ob)
        ob.parent = board
        ob.location = v3(bx, by, z)
        me.materials.append(m)
        ob.visible_shadow = False
    guides.append((key, em))

# Pulsos de datos por los buses
with open(os.path.join(OUT, "pc-traces.json")) as f:
    TRACES = json.load(f)
seed = [7]


def rand():
    seed[0] = (seed[0] * 16807) % 2147483647
    return (seed[0] - 1) / 2147483646


pulse_mats = {k: emission_material(f"pulse_{k}", c, 6.0)[0] for k, c in (("cyan", (0.0, 0.7835, 1.0)), ("purple", (0.2623, 0.0844, 1.0)))}
pulses = []
for _ in range(40):
    path = TRACES[int(rand() * len(TRACES))]
    lens = [math.dist(path[i], path[i + 1]) for i in range(len(path) - 1)]
    phase, speed, cyan = rand(), 0.12 + rand() * 0.18, rand() > 0.45
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=1)
    ob = bpy.context.active_object
    ob.parent = board
    ob.data.materials.append(pulse_mats["cyan" if cyan else "purple"])
    ob.visible_shadow = False
    pulses.append((ob, path, lens, sum(lens), phase, speed))


def pulse_pos(path, lens, total, u):
    d = u * total
    i = 0
    while i < len(lens) - 1 and d > lens[i]:
        d -= lens[i]
        i += 1
    f = min(1.0, d / lens[i]) if lens[i] else 0.0
    (x1, y1), (x2, y2) = path[i], path[i + 1]
    return v3(x1 + (x2 - x1) * f, y1 + (y2 - y1) * f, 0.008)


# ─── Luces, entorno y cámara ─────────────────────────────────────────────────

world = bpy.data.worlds.new("studio")
scene.world = world
world.use_nodes = True
wn = world.node_tree
env = wn.nodes.new("ShaderNodeTexEnvironment")
env.image = bpy.data.images.load(os.path.join(ROOT, "assets", "studio_small_09_1k.hdr"))
bg = wn.nodes["Background"]
bg.inputs["Strength"].default_value = 0.6
wn.links.new(env.outputs["Color"], bg.inputs["Color"])


def add_light(name, kind, loc3, energy, color=(1, 1, 1), size=1.0, target3=(0, 0.1, 0)):
    ld = bpy.data.lights.new(name, kind)
    ld.energy = energy
    ld.color = color
    if kind == "AREA":
        ld.size = size
    ob = bpy.data.objects.new(name, ld)
    scene.collection.objects.link(ob)
    ob.location = v3(*loc3)
    direction = v3(*target3) - ob.location
    ob.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    return ob


add_light("key", "AREA", (3, 5, 6), 900, size=4)
add_light("fill", "AREA", (-4, 2, 5), 180, (0.88, 0.9, 1.0), size=3)
add_light("rim_purple", "POINT", (-3, 2.5, -1.5), 900, (0.55, 0.32, 1.0))
add_light("rim_cyan", "POINT", (3, -2, -1), 500, (0.0, 0.9, 1.0))
flash = add_light("power_flash", "POINT", (-0.2, 0.7, 1.4), 0, (0.65, 0.48, 1.0))

cam_data = bpy.data.cameras.new("cam")
cam_data.sensor_fit = "VERTICAL"
cam_data.angle_y = math.radians(30)
cam = bpy.data.objects.new("cam", cam_data)
scene.collection.objects.link(cam)
CAM_CLOSE = ((0, 0.9, 9.2), (0, 0.1, 0))     # (posición, objetivo) en ejes three.js
CAM_WIDE = ((0.0, 0.6, 14.8), (0.0, -0.45, 0.6))
cam.location = v3(*CAM_CLOSE[0])
cam.rotation_euler = (v3(*CAM_CLOSE[1]) - cam.location).to_track_quat("-Z", "Y").to_euler()
scene.camera = cam

# ─── Render ──────────────────────────────────────────────────────────────────

scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = scene.render.resolution_y = SIZE
scene.render.fps = FPS
scene.render.film_transparent = True
scene.render.use_motion_blur = True
scene.render.motion_blur_shutter = 0.5
scene.view_settings.view_transform = "Khronos PBR Neutral"
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
ee = scene.eevee
for attr, val in (("taa_render_samples", 48 if not PREVIEW else 24), ("use_raytracing", True),
                  ("use_shadows", True), ("fast_gi_method", "GLOBAL_ILLUMINATION")):
    if hasattr(ee, attr):
        setattr(ee, attr, val)

# Composición: bloom sobre fondo TRANSPARENTE + dos salidas para "stacked alpha"
#   - salida principal: color premultiplicado (incluye el halo del bloom) con alfa = 1
#   - alpha/####.png:   canal alfa en escala de grises (sin transformación de vista)
# La web recombina ambas con un shader WebGL mínimo (src/components/hero/HeroVideo.tsx).

if hasattr(scene, "compositing_node_group"):
    tree = bpy.data.node_groups.new("comp", "CompositorNodeTree")
    scene.compositing_node_group = tree
    out_node = tree.nodes.new("NodeGroupOutput")
    tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    out_sock = out_node.inputs[0]
else:
    scene.use_nodes = True
    tree = scene.node_tree
    tree.nodes.clear()
    out_node = tree.nodes.new("CompositorNodeComposite")
    out_sock = out_node.inputs["Image"]


def set_input(node, names, value):
    """Blender 5 movió muchas propiedades de nodo a sockets de entrada."""
    for n in names:
        if n in node.inputs:
            try:
                node.inputs[n].default_value = value
                return True
            except Exception:
                pass
    return False


rl = tree.nodes.new("CompositorNodeRLayers")
glare = tree.nodes.new("CompositorNodeGlare")
if not set_input(glare, ("Type",), "Bloom"):
    glare.glare_type = "BLOOM"
set_input(glare, ("Quality",), "High")
set_input(glare, ("Threshold", "Highlights Threshold"), 1.0)
set_input(glare, ("Strength",), 0.55)
set_input(glare, ("Size",), 0.7)
tree.links.new(rl.outputs["Image"], glare.inputs["Image"])

opaque = tree.nodes.new("CompositorNodeSetAlpha")
set_input(opaque, ("Type",), "Replace Alpha")
opaque.inputs["Alpha"].default_value = 1.0
tree.links.new(glare.outputs["Image"], opaque.inputs["Image"])
tree.links.new(opaque.outputs["Image"], out_sock)

split = tree.nodes.new("CompositorNodeSeparateColor")
tree.links.new(rl.outputs["Image"], split.inputs[0])
alpha_out = tree.nodes.new("CompositorNodeOutputFile")
alpha_out.save_as_render = False  # el alfa son datos: sin transformación de color
alpha_out.format.media_type = "IMAGE"
alpha_out.format.file_format = "PNG"
alpha_out.format.color_mode = "BW"
alpha_out.file_output_items.new("FLOAT", "a")
tree.links.new(split.outputs["Alpha"], alpha_out.inputs[0])

scene.render.image_settings.color_mode = "RGB"
# ─── Animación: un keyframe por fotograma ────────────────────────────────────

N = round(LOOP_LEN * FPS)
scene.frame_start, scene.frame_end = 0, N - 1


def key(sock_or_obj, path, frame):
    sock_or_obj.keyframe_insert(path, frame=frame)


fan_turn = 0.0  # giro acumulado de los ventiladores (integral de la potencia)
for frame in range(N + 1):
    t = LOOP_START + frame / FPS
    time = frame / FPS
    p = power(t)
    loop_phase = 2 * math.pi * (t - LOOP_START) / LOOP_LEN

    # Balanceo del equipo (periódico: el loop no salta)
    sway = math.sin(loop_phase) * 0.09
    bob = math.sin(2 * loop_phase) * 0.03
    m = Matrix.Translation(Vector((0, bob, 0))) @ Matrix.Rotation(-0.16, 4, "X") @ Matrix.Rotation(-0.5 + sway, 4, "Y")
    rig.matrix_basis = C @ m @ C_INV
    key(rig, "location", frame)
    key(rig, "rotation_quaternion", frame)

    for k, ob in parts.items():
        kk = install(t, k)
        rr = 1 - kk
        (ox, oy, oz), (rx, ry, rz) = ENTRY[k]
        b = base[k]
        loc = b.to_translation() + v3(ox * rr, oy * rr, oz * rr)
        ob.matrix_basis = Matrix.Translation(loc) @ three_rot(rx * rr, ry * rr, rz * rr) @ b.to_3x3().to_4x4()
        key(ob, "location", frame)
        key(ob, "rotation_quaternion", frame)
        ob.scale = (1, 1, 1) if kk > 0.002 else (0.0001, 0.0001, 0.0001)
        key(ob, "scale", frame)

    for i, f in enumerate(fans):
        ang = -(0.5 * time + 24 * fan_turn)
        f.matrix_basis = fan_base[i] @ Matrix.Rotation(ang, 4, FAN_AXIS)
        key(f, "rotation_quaternion", frame)
    fan_turn += power(t) / FPS

    for em, (phase, strength) in rgb:
        em.inputs["Color"].default_value = (*brand_rgb(time * 0.12 + phase), 1)
        em.inputs["Strength"].default_value = (0.03 + strength * p) * 2.2
        key(em.inputs["Color"], "default_value", frame)
        key(em.inputs["Strength"], "default_value", frame)
    glow_em.inputs["Strength"].default_value = (0.1 + 2.6 * p) * 1.6
    key(glow_em.inputs["Strength"], "default_value", frame)

    sweep_val.outputs[0].default_value = sweep(t)
    fade_val.outputs[0].default_value = (1 - prog(t, POWER_OFF, 0.4)) if t >= POWER_ON else 0.0
    key(sweep_val.outputs[0], "default_value", frame)
    key(fade_val.outputs[0], "default_value", frame)

    for k, em in guides:
        em.inputs["Strength"].default_value = slot_glow(t, k) * 2.0
        key(em.inputs["Strength"], "default_value", frame)

    for ob, path, lens, total, phase, speed in pulses:
        ob.location = pulse_pos(path, lens, total, (phase + time * speed / total) % 1)
        s = 0.014 * p
        ob.scale = (max(s, 1e-4),) * 3
        key(ob, "location", frame)
        key(ob, "scale", frame)

    spike = math.exp(-(t - POWER_ON) * 3) if t > POWER_ON else 0
    flash.data.energy = (6 * p + 40 * spike) * 12
    key(flash.data, "energy", frame)

    # Cables: crecen desde la fuente; el conector aparece al llegar
    for ck, (curves, plug) in cables.items():
        amount = cable_amount(t, ck)
        for cu in curves:
            cu.bevel_factor_end = max(amount, 0.001)
            key(cu, "bevel_factor_end", frame)
        for ob in [o for o in scene.objects if o.type == "CURVE" and o.data in curves]:
            ob.hide_render = amount < 0.002
            key(ob, "hide_render", frame)
        plug.scale = (1, 1, 1) if amount > 0.97 else (0.0001, 0.0001, 0.0001)
        key(plug, "scale", frame)

    # Cámara: plano cerrado durante el ensamblaje, abierto para mostrar el gabinete
    zoom = ease_in_out_cubic(prog(t, *CAMERA_OUT)) * (1 - ease_in_out_cubic(prog(t, *CAMERA_IN)))
    pos = [a + (b - a) * zoom for a, b in zip(CAM_CLOSE[0], CAM_WIDE[0])]
    look = [a + (b - a) * zoom for a, b in zip(CAM_CLOSE[1], CAM_WIDE[1])]
    cam.location = v3(*pos)
    cam.rotation_euler = (v3(*look) - cam.location).to_track_quat("-Z", "Y").to_euler()
    key(cam, "location", frame)
    key(cam, "rotation_euler", frame)

# Interpolación lineal entre fotogramas (el desenfoque de movimiento muestrea subfotogramas)
for ad in [o.animation_data for o in bpy.data.objects] + [m.node_tree.animation_data for m in bpy.data.materials if m.node_tree] + \
          [l.animation_data for l in bpy.data.lights] + [c.animation_data for c in bpy.data.curves]:
    if ad and ad.action:
        fcurves = getattr(ad.action, "fcurves", None)
        if fcurves is None:  # acciones por capas (Blender 4.4+)
            fcurves = [fc for layer in ad.action.layers for strip in layer.strips
                       for bag in strip.channelbags for fc in bag.fcurves]
        for fc in fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = "LINEAR"

if PREVIEW:
    alpha_out.directory = os.path.join(OUT, "preview_alpha", "")
    for name, t in (("gpu", 6.1), ("psu", 7.2), ("cables", 8.3), ("case", 9.9), ("online", 12.5)):
        scene.frame_set(round((t - LOOP_START) * FPS))
        scene.render.filepath = os.path.join(OUT, f"preview_{name}.png")
        bpy.ops.render.render(write_still=True)
        print("PREVIEW", name)
else:
    folder = os.path.join(OUT, f"frames_{SIZE}")
    os.makedirs(folder, exist_ok=True)
    alpha_out.directory = os.path.join(OUT, f"alpha_{SIZE}", "")
    alpha_out.file_name = ""
    scene.render.filepath = os.path.join(folder, "")
    bpy.ops.render.render(animation=True)
    print("RENDER OK", N, "fotogramas")
