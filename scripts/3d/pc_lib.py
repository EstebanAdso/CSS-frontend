"""Utilidades de modelado para el hero 3D (Blender 5.x, modo consola).

Convención de ejes: se modela directamente en coordenadas de three.js
(x derecha, y arriba, z hacia la cámara) y se exporta con export_yup=False,
así el GLB llega a la web sin conversiones. Unidad = 1 dm (100 mm).
"""

import math
import os

import bmesh
import bpy
from mathutils import Matrix, Vector

# ─── Escena ──────────────────────────────────────────────────────────────────


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def link(obj, parent=None):
    bpy.context.scene.collection.objects.link(obj)
    if parent is not None:
        obj.parent = parent
    return obj


def empty(name, loc=(0, 0, 0), parent=None):
    ob = bpy.data.objects.new(name, None)
    ob.location = loc
    return link(ob, parent)


# ─── Fuentes ─────────────────────────────────────────────────────────────────

_FONTS = {}


def font(kind="ui"):
    """Bahnschrift (técnica) para logos, Consolas para serigrafía."""
    if kind in _FONTS:
        return _FONTS[kind]
    files = {
        "ui": ["C:/Windows/Fonts/bahnschrift.ttf", "C:/Windows/Fonts/segoeuib.ttf"],
        "mono": ["C:/Windows/Fonts/consola.ttf", "C:/Windows/Fonts/cour.ttf"],
    }[kind]
    f = None
    for path in files:
        if os.path.exists(path):
            f = bpy.data.fonts.load(path)
            break
    _FONTS[kind] = f
    return f


# ─── Materiales PBR ──────────────────────────────────────────────────────────

_MATS = {}


def material(name, color=(0.5, 0.5, 0.5), metal=0.0, rough=0.5, coat=0.0, coat_rough=0.1,
             aniso=0.0, emit=None, emit_strength=0.0):
    if name in _MATS:
        return _MATS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Metallic"].default_value = metal
    p.inputs["Roughness"].default_value = rough
    p.inputs["Coat Weight"].default_value = coat
    p.inputs["Coat Roughness"].default_value = coat_rough
    p.inputs["Anisotropic"].default_value = aniso
    if emit is not None:
        p.inputs["Emission Color"].default_value = (*emit, 1)
        p.inputs["Emission Strength"].default_value = emit_strength
    _MATS[name] = m
    return m


def glass_material():
    """Vidrio templado ahumado: casi transparente, con reflejos."""
    m = material("glass_panel", (0.03, 0.03, 0.045), 0.0, 0.04, coat=1.0, coat_rough=0.02)
    m.node_tree.nodes["Principled BSDF"].inputs["Alpha"].default_value = 0.1
    return m


def palette():
    """Paleta de materiales compartida por todas las piezas."""
    M = {}
    M["alu_dark"] = material("alu_dark", (0.045, 0.043, 0.05), 1.0, 0.3)
    M["alu_bright"] = material("alu_bright", (0.56, 0.56, 0.6), 1.0, 0.36)
    M["gunmetal"] = material("gunmetal", (0.11, 0.105, 0.12), 1.0, 0.32)
    M["nickel"] = material("nickel", (0.78, 0.78, 0.8), 1.0, 0.16)
    M["chrome"] = material("chrome", (0.92, 0.92, 0.94), 1.0, 0.06)
    M["gold"] = material("gold", (1.0, 0.74, 0.32), 1.0, 0.22)
    M["copper"] = material("copper", (0.95, 0.52, 0.33), 1.0, 0.24)
    M["plastic_black"] = material("plastic_black", (0.012, 0.012, 0.014), 0.0, 0.42)
    M["plastic_matte"] = material("plastic_matte", (0.02, 0.02, 0.022), 0.0, 0.7)
    M["plastic_gray"] = material("plastic_gray", (0.22, 0.22, 0.24), 0.0, 0.45)
    M["plastic_white"] = material("plastic_white", (0.82, 0.82, 0.84), 0.0, 0.45)
    M["shroud"] = material("shroud", (0.016, 0.016, 0.019), 0.25, 0.38, coat=0.3, coat_rough=0.3)
    M["chip"] = material("chip", (0.016, 0.016, 0.018), 0.0, 0.5)
    M["chip_text"] = material("chip_text", (0.32, 0.32, 0.34), 0.0, 0.6)
    M["ceramic"] = material("ceramic", (0.42, 0.31, 0.19), 0.0, 0.5)
    M["tin"] = material("tin", (0.7, 0.7, 0.72), 1.0, 0.3)
    M["choke"] = material("choke", (0.1, 0.1, 0.11), 0.4, 0.5)
    M["silk"] = material("silk", (0.86, 0.86, 0.9), 0.0, 0.6)
    M["substrate"] = material("substrate", (0.025, 0.1, 0.055), 0.0, 0.4, coat=0.6, coat_rough=0.2)
    M["pcb_dark"] = material("pcb_dark", (0.012, 0.012, 0.016), 0.0, 0.4, coat=0.5, coat_rough=0.2)
    M["label"] = material("label", (0.24, 0.1, 0.72), 0.0, 0.42, coat=0.6, coat_rough=0.15)
    M["glass"] = material("glass", (0.008, 0.004, 0.016), 0.0, 0.03, coat=1.0, coat_rough=0.02)
    M["sleeve"] = material("sleeve", (0.022, 0.02, 0.026), 0.0, 0.6)
    M["blade"] = material("blade", (0.012, 0.012, 0.014), 0.1, 0.3, coat=0.6, coat_rough=0.1)
    M["cap_top"] = material("cap_top", (0.28, 0.12, 0.62), 0.6, 0.35)
    M["case"] = material("case", (0.016, 0.015, 0.02), 0.55, 0.42, coat=0.2, coat_rough=0.35)
    M["rubber_black"] = material("rubber_black", (0.01, 0.01, 0.012), 0.0, 0.8)
    M["glass_panel"] = glass_material()
    # Superficies que el render reemplaza por luz RGB animada
    M["rgb"] = material("RGB", (0.9, 0.9, 0.95), 0.0, 0.3, emit=(1, 1, 1), emit_strength=1.0)
    M["glow"] = material("GLOW", (0.5, 0.3, 0.9), 0.0, 0.3, emit=(0.55, 0.32, 1), emit_strength=1.0)
    return M


# ─── Primitivas ──────────────────────────────────────────────────────────────


def _finish(name, me, loc, rot, mat, parent, smooth):
    ob = bpy.data.objects.new(name, me)
    ob.location = loc
    if rot:
        ob.rotation_euler = rot
    if mat is not None:
        me.materials.append(mat)
    if smooth:
        for p in me.polygons:
            p.use_smooth = True
    return link(ob, parent)


def add_bevel(ob, width, segments=2, angle=35):
    if width <= 0:
        return ob
    mod = ob.modifiers.new("bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = math.radians(angle)
    mod.harden_normals = True
    mod.miter_outer = "MITER_ARC"
    for p in ob.data.polygons:
        p.use_smooth = True
    return ob


def box(name, size, loc, mat, bevel=0.004, segments=2, rot=None, parent=None):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    bm.to_mesh(me)
    bm.free()
    ob = _finish(name, me, loc, rot, mat, parent, False)
    return add_bevel(ob, min(bevel, min(size) * 0.45), segments)


def cyl(name, r, depth, loc, mat, axis="z", verts=40, bevel=0.003, segments=2, r2=None, parent=None, rot=None):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r, radius2=r if r2 is None else r2, depth=depth)
    if axis == "x":
        bmesh.ops.rotate(bm, verts=bm.verts, matrix=Matrix.Rotation(math.pi / 2, 3, "Y"))
    elif axis == "y":
        bmesh.ops.rotate(bm, verts=bm.verts, matrix=Matrix.Rotation(math.pi / 2, 3, "X"))
    bm.to_mesh(me)
    bm.free()
    ob = _finish(name, me, loc, rot, mat, parent, True)
    return add_bevel(ob, min(bevel, depth * 0.4, r * 0.4), segments, angle=50)


def torus(name, R, r, loc, mat, axis="z", major=64, minor=12, parent=None):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    rings = []
    for i in range(major):
        a = 2 * math.pi * i / major
        ring = []
        for j in range(minor):
            b = 2 * math.pi * j / minor
            rr = R + r * math.cos(b)
            ring.append(bm.verts.new((rr * math.cos(a), rr * math.sin(a), r * math.sin(b))))
        rings.append(ring)
    for i in range(major):
        for j in range(minor):
            a, b = rings[i], rings[(i + 1) % major]
            bm.faces.new((a[j], b[j], b[(j + 1) % minor], a[(j + 1) % minor]))
    if axis == "y":
        bmesh.ops.rotate(bm, verts=bm.verts, matrix=Matrix.Rotation(math.pi / 2, 3, "X"))
    elif axis == "x":
        bmesh.ops.rotate(bm, verts=bm.verts, matrix=Matrix.Rotation(math.pi / 2, 3, "Y"))
    bm.to_mesh(me)
    bm.free()
    return _finish(name, me, loc, None, mat, parent, True)


def prism(name, pts2d, depth, loc, mat, plane="xy", bevel=0.003, parent=None):
    """Extruye un polígono 2D. plane='xy' extruye en z; 'yz' extruye en x."""
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    if plane == "xy":
        verts = [bm.verts.new((u, v, -depth / 2)) for u, v in pts2d]
        ext = Vector((0, 0, depth))
    else:  # yz
        verts = [bm.verts.new((-depth / 2, u, v)) for u, v in pts2d]
        ext = Vector((depth, 0, 0))
    face = bm.faces.new(verts)
    res = bmesh.ops.extrude_face_region(bm, geom=[face])
    moved = [e for e in res["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, vec=ext, verts=moved)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    ob = _finish(name, me, loc, None, mat, parent, False)
    return add_bevel(ob, bevel, 2)


def tube(name, points, radius, mat, parent=None, resolution=24):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = radius
    cu.bevel_resolution = 6
    cu.resolution_u = resolution
    cu.use_fill_caps = True
    sp = cu.splines.new("NURBS")
    sp.points.add(len(points) - 1)
    for p, co in zip(sp.points, points):
        p.co = (*co, 1)
    sp.use_endpoint_u = True
    sp.order_u = 4
    tmp = link(bpy.data.objects.new(name + "_crv", cu))
    ob = _to_mesh(tmp, name, parent)
    if mat is not None:
        ob.data.materials.append(mat)
    for p in ob.data.polygons:
        p.use_smooth = True
    return ob


def text(name, body, size, loc, mat, parent=None, kind="ui", extrude=0.0004, align="CENTER",
         xdir=(1, 0, 0), ydir=(0, 1, 0), spacing=1.0):
    """Texto 3D convertido a malla. xdir = dirección de lectura, ydir = 'arriba' del texto."""
    cu = bpy.data.curves.new(name, "FONT")
    cu.body = body
    cu.size = size
    cu.extrude = extrude
    cu.align_x = align
    cu.align_y = "CENTER"
    cu.space_character = spacing
    f = font(kind)
    if f:
        cu.font = f
    tmp = link(bpy.data.objects.new(name + "_txt", cu))
    ob = _to_mesh(tmp, name, parent)
    if mat is not None:
        ob.data.materials.append(mat)
    x, y = Vector(xdir).normalized(), Vector(ydir).normalized()
    z = x.cross(y)
    rot = Matrix((x, y, z)).transposed().to_4x4()
    ob.matrix_basis = Matrix.Translation(loc) @ rot
    return ob


def _to_mesh(tmp, name, parent):
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(tmp.evaluated_get(dg))
    me.name = name
    bpy.data.objects.remove(tmp, do_unlink=True)
    ob = bpy.data.objects.new(name, me)
    return link(ob, parent)


def mesh_from_bmesh(name, bm, mat, loc=(0, 0, 0), parent=None, smooth=False):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    return _finish(name, me, loc, None, mat, parent, smooth)


# ─── Modificadores ───────────────────────────────────────────────────────────


_ORDER = {"ARRAY": 0, "BOOLEAN": 1, "BEVEL": 2}


def _sort_modifiers(ob):
    """Orden correcto del stack: array → boolean → bisel."""
    wanted = sorted(ob.modifiers, key=lambda m: _ORDER.get(m.type, 1))
    for i, m in enumerate(wanted):
        if ob.modifiers.find(m.name) != i:
            with bpy.context.temp_override(object=ob, active_object=ob):
                bpy.ops.object.modifier_move_to_index(modifier=m.name, index=i)


def boolean_cut(target, cutters):
    """Resta los cortadores al objeto."""
    for c in cutters:
        mod = target.modifiers.new(f"cut{len(target.modifiers)}", "BOOLEAN")
        mod.operation = "DIFFERENCE"
        mod.solver = "EXACT"
        mod.object = c
        c.parent = target.parent  # mismo espacio local que el objeto a recortar
        c.hide_render = True
    _sort_modifiers(target)
    return target


def cutter_box(size, loc, rot=None):
    ob = box("_cutter", size, loc, None, bevel=0, rot=rot)
    return ob


def cutter_cyl(r, depth, loc, axis="z", verts=48):
    return cyl("_cutter", r, depth, loc, None, axis=axis, verts=verts, bevel=0)


def array(ob, count, offset):
    mod = ob.modifiers.new("array", "ARRAY")
    mod.count = count
    mod.use_relative_offset = False
    mod.use_constant_offset = True
    mod.constant_offset_displace = offset
    _sort_modifiers(ob)
    return ob


def apply_modifiers(ob):
    if ob.type != "MESH" or not ob.modifiers:
        return
    dg = bpy.context.evaluated_depsgraph_get()
    me = bpy.data.meshes.new_from_object(ob.evaluated_get(dg), preserve_all_data_layers=True, depsgraph=dg)
    old = ob.data
    ob.modifiers.clear()
    ob.data = me
    bpy.data.meshes.remove(old)


def delete_cutters():
    for ob in list(bpy.data.objects):
        if ob.name.startswith("_cutter"):
            bpy.data.objects.remove(ob, do_unlink=True)


def descendants(ob):
    out = []
    for c in ob.children:
        out.append(c)
        out.extend(descendants(c))
    return out


def consolidate(root, keep_prefixes=("RGB_", "GLOW_", "FanRotor", "PCB", "GLASS_")):
    """Une las mallas estáticas de una pieza por material: menos draw calls en la web."""
    groups = {}
    for ob in descendants(root):
        if ob.type != "MESH" or ob.name.startswith(keep_prefixes):
            continue
        if any(a.name.startswith("FanRotor") for a in _ancestors(ob)):
            continue
        apply_modifiers(ob)
        mat = ob.data.materials[0].name if ob.data.materials else "none"
        groups.setdefault(mat, []).append(ob)

    for mat, objs in groups.items():
        target = objs[0]
        world = target.matrix_world.copy()
        target.parent = root
        target.matrix_world = world
        if len(objs) > 1:
            with bpy.context.temp_override(active_object=target, object=target,
                                           selected_objects=objs, selected_editable_objects=objs):
                bpy.ops.object.join()
        target.name = f"{root.name}_{mat}"


def _ancestors(ob):
    out = []
    while ob.parent:
        ob = ob.parent
        out.append(ob)
    return out
