bl_info = {
    "name": "Feather 3D Importer & Multi Material Master",
    "author": "Feather3D Team",
    "version": (1, 0, 0),
    "blender": (3, 0, 0),
    "location": "File > Import > Feather 3D (.feather)",
    "description": "Imports Feather 3D non-destructive sketches as 3D curves with Multi Material Master shaders",
    "category": "Import-Export",
}

import bpy
import json
import math
from mathutils import Vector, Color
from bpy_extras.io_utils import ImportHelper
from bpy.props import StringProperty, BoolProperty, FloatProperty


def hex_to_rgb(hex_str):
    hex_clean = hex_str.lstrip('#')
    if len(hex_clean) == 6:
        r = int(hex_clean[0:2], 16) / 255.0
        g = int(hex_clean[2:4], 16) / 255.0
        b = int(hex_clean[4:6], 16) / 255.0
        return (r, g, b, 1.0)
    return (0.1, 0.1, 0.18, 1.0)


def create_feather_material(name, hex_color, mat_type="shadeless"):
    mat_name = f"Feather_{mat_type}_{name}"
    mat = bpy.data.materials.get(mat_name)
    if mat:
        return mat

    mat = bpy.data.materials.new(name=mat_name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    out_node = nodes.new(type="ShaderNodeOutputMaterial")
    out_node.location = (400, 0)
    rgba = hex_to_rgb(hex_color)

    if mat_type == "glow":
        # Emissive glow shader
        emit_node = nodes.new(type="ShaderNodeEmission")
        emit_node.location = (100, 0)
        emit_node.inputs["Color"].default_value = rgba
        emit_node.inputs["Strength"].default_value = 3.5
        links.new(emit_node.outputs["Emission"], out_node.inputs["Surface"])

    elif mat_type in ("shaded", "cel_shaded"):
        # Multi Material Master Cel-Shaded / Toon Node Setup
        bsdf = nodes.new(type="ShaderNodeBsdfDiffuse")
        bsdf.location = (-200, 0)
        bsdf.inputs["Color"].default_value = rgba

        shader_to_rgb = nodes.new(type="ShaderNodeShaderToRGB")
        shader_to_rgb.location = (0, 0)
        links.new(bsdf.outputs["BSDF"], shader_to_rgb.inputs["Shader"])

        ramp = nodes.new(type="ShaderNodeValToRGB")
        ramp.location = (200, 0)
        ramp.color_ramp.interpolation = "CONSTANT"
        ramp.color_ramp.elements[0].position = 0.0
        ramp.color_ramp.elements[0].color = (rgba[0]*0.3, rgba[1]*0.3, rgba[2]*0.3, 1.0)
        ramp.color_ramp.elements.new(0.5)
        ramp.color_ramp.elements[1].position = 0.45
        ramp.color_ramp.elements[1].color = rgba

        links.new(shader_to_rgb.outputs["Color"], ramp.inputs["Fac"])
        links.new(ramp.outputs["Color"], out_node.inputs["Surface"])

    else:
        # Shadeless (Unlit Emission)
        emit_node = nodes.new(type="ShaderNodeEmission")
        emit_node.location = (100, 0)
        emit_node.inputs["Color"].default_value = rgba
        emit_node.inputs["Strength"].default_value = 1.0
        links.new(emit_node.outputs["Emission"], out_node.inputs["Surface"])

    return mat


class IMPORT_SCENE_OT_feather(bpy.types.Operator, ImportHelper):
    """Import Feather 3D project file (.feather / .json)"""
    bl_idname = "import_scene.feather"
    bl_label = "Import Feather 3D (.feather)"
    bl_options = {"REGISTER", "UNDO"}

    filename_ext = ".feather"
    filter_glob: StringProperty(
        default="*.feather;*.json",
        options={"HIDDEN"},
        maxlen=255,
    )

    import_as_curves: BoolProperty(
        name="Import as 3D Curves",
        description="Imports strokes as native 3D Bezier Curves with bevel depth and pressure radius",
        default=True,
    )

    scale_factor: FloatProperty(
        name="Scale",
        description="Scale multiplier for imported geometry",
        default=1.0,
        min=0.001,
        max=100.0,
    )

    def execute(self, context):
        with open(self.filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        layers = data.get("layers", [])
        if not layers:
            self.report({"WARNING"}, "No layers or curves found in project")
            return {"CANCELLED"}

        # Create collection for imported project
        coll_name = data.get("name", "Feather_Project")
        collection = bpy.data.collections.new(coll_name)
        context.scene.collection.children.link(collection)

        for layer_idx, layer in enumerate(layers):
            layer_name = layer.get("name", f"Layer_{layer_idx + 1}")
            layer_coll = bpy.data.collections.new(layer_name)
            collection.children.link(layer_coll)

            curves_data = layer.get("curves", [])
            for c_idx, curve in enumerate(curves_data):
                pts = curve.get("points", [])
                if len(pts) < 2:
                    continue

                stroke_name = curve.get("name", f"Stroke_{c_idx + 1}")
                color_hex = curve.get("color", "#1a1a2e")
                mat_type = curve.get("materialType", "shadeless")
                base_size = curve.get("size", 0.02) * self.scale_factor

                material = create_feather_material(f"{layer_idx}_{c_idx}", color_hex, mat_type)

                # Build 3D Curve Object
                curve_data = bpy.data.curves.new(name=stroke_name, type="CURVE")
                curve_data.dimensions = "3D"
                curve_data.fill_mode = "FULL"
                curve_data.bevel_depth = base_size * 0.5
                curve_data.bevel_resolution = 4

                spline = curve_data.splines.new(type="BEZIER")
                spline.bezier_points.add(len(pts) - 1)

                for i, p in enumerate(pts):
                    bp = spline.bezier_points[i]
                    x = p.get("x", 0.0) * self.scale_factor
                    y = p.get("z", 0.0) * self.scale_factor # Three.js Z is Blender Y
                    z = p.get("y", 0.0) * self.scale_factor # Three.js Y is Blender Z
                    bp.co = Vector((x, y, z))

                    pressure = p.get("pressure", 0.5)
                    bp.radius = max(0.1, pressure * 1.5)
                    bp.handle_left_type = "AUTO"
                    bp.handle_right_type = "AUTO"

                obj = bpy.data.objects.new(name=stroke_name, object_data=curve_data)
                obj.data.materials.append(material)
                layer_coll.objects.link(obj)

        self.report({"INFO"}, f"Successfully imported Feather 3D project: {coll_name}")
        return {"FINISHED"}


def menu_func_import(self, context):
    self.layout.operator(IMPORT_SCENE_OT_feather.bl_idname, text="Feather 3D (.feather)")


def register():
    bpy.utils.register_class(IMPORT_SCENE_OT_feather)
    bpy.types.TOPBAR_MT_file_import.append(menu_func_import)


def unregister():
    bpy.types.TOPBAR_MT_file_import.remove(menu_func_import)
    bpy.utils.unregister_class(IMPORT_SCENE_OT_feather)


if __name__ == "__main__":
    register()
