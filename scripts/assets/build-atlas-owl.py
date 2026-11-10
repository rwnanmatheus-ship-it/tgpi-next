"""Build the articulated Atlas owl and its transparent poster with Blender 4.3.

Run from the repository: blender -b -t 6 --python scripts/assets/build-atlas-owl.py
"""

from math import cos, pi, sin
from pathlib import Path
from random import Random

import bpy
from mathutils import Vector

rng = Random(851)
output = Path("public/brand/atlas").resolve()
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)


def material(name, color, metal=0, roughness=.42, emission=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Metallic"].default_value = metal
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Emission Color"].default_value = (*color, 1)
    shader.inputs["Emission Strength"].default_value = emission
    return mat


obsidian = material("Obsidian", (.012, .021, .045), .66)
gold = material("Brushed champagne", (.60, .32, .081), .79, .3)
gold_light = material("Polished filigree", (.91, .57, .18), .72, .26)
navy = [material(f"Midnight enamel {i}", (.019 + i*.008, .045 + i*.014, .105 + i*.027), .55, .33) for i in range(4)]
ivory = [material(f"Pearl feather {i}", (.48 + i*.105, .39 + i*.105, .275 + i*.095), .06, .49) for i in range(4)]
amber = [material(f"Iris amber {i}", (.40 + i*.13, .105 + i*.052, .009 + i*.006), .31, .30, .17) for i in range(5)]
pupil = material("Optical glass", (.006, .01, .017), .12, .17)
glint = material("Eye light", (.96, .86, .65), .12, .24, 1.7)
sapphire = material("Sapphire core", (.025, .18, .49), .56, .28, .18)


def pivot(name, location, parent=None):
    node = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(node)
    node.parent = parent
    node.location = location
    return node


def attach(obj, part):
    obj.parent = part
    obj.matrix_parent_inverse = part.matrix_world.inverted()
    return obj


def sphere(name, position, scale, mat, part):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=14, location=position)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(mat)
    for face in obj.data.polygons:
        face.use_smooth = True
    return attach(obj, part)


def feather(name, origin, direction, width, length, lift, mats, part):
    origin = Vector(origin)
    direction = Vector((direction[0], 0, direction[1])).normalized()
    side = Vector((direction.z, 0, -direction.x))
    verts, faces = [], []
    ribs, across = 9, 6
    for row in range(ribs + 1):
        t = row/ribs
        edge = width * (max(.014, sin(pi*(.125 + .875*t)))**.74)
        for col in range(across + 1):
            u = 2*col/across - 1
            p = origin + direction*(t*length) + side*(edge*u)
            p.y -= lift*sin(pi*t)*(.92 - .55*u*u) + .022*(1-abs(u))
            p.y += .014*cos(4*pi*u)*abs(u)*sin(pi*t)
            verts.append(p)
    for row in range(ribs):
        for col in range(across):
            start = row*(across + 1) + col
            faces.append((start, start+1, start+across+2, start+across+1))
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    for mat in mats:
        mesh.materials.append(mat)
    for face in mesh.polygons:
        row, col = divmod(face.index, across)
        face.use_smooth = True
        if len(mats) > 1 and (col in (0, across-1) or row == ribs-1):
            face.material_index = 1
    return attach(obj, part)


def trim(name, points, radius, mat, part, cyclic=False):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = radius
    curve.bevel_resolution = 2
    spline = curve.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for point, xyz in zip(spline.points, points):
        point.co = (*xyz, 1)
    spline.use_cyclic_u = cyclic
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    curve.materials.append(mat)
    return attach(obj, part)


def torus(name, center, rx, rz, radius, mat, part, tilt=0):
    points = [(center[0] + rx*cos(t), center[1] + tilt*cos(t), center[2] + rz*sin(t))
              for t in (2*pi*i/88 for i in range(88))]
    return trim(name, points, radius, mat, part, True)


root = pivot("Atlas", (0, 0, 0))
body = pivot("Torso", (0, 0, 0), root)
head = pivot("Head", (0, -.01, 1.78), root)
left = pivot("WingLeft", (-.66, -.02, 1.52), root)
right = pivot("WingRight", (.66, -.02, 1.52), root)
orbit = pivot("Orbit", (0, .28, 1.88), root)
bpy.context.view_layer.update()

sphere("Body", (0, 0, 1.07), (.92, .55, .81), navy[0], body)
for row in range(6, -1, -1):
    z = 1.73 - row*.19
    span = .61 + .17*sin(pi*row/7)
    for col in range(7):
        x = span*(col-3)/3.2
        y = -.38 - .19*(1-abs(x)/.84) - .03*(6-row)
        feather("Breast plate", (x, y, z), (-.26*x, -1), .13, .39, .095,
                [rng.choice(navy), gold if (row+col)%3 == 0 else rng.choice(navy)], body)

for sign, part in [(-1, left), (1, right)]:
    sphere("Wing shell", (sign*.94, -.01, 1.04), (.43, .39, .64), navy[0], part)
    for row in range(4, -1, -1):
        for col in range(4):
            x = sign*(.66 + col*.146 + row*.017)
            z = 1.55 - row*.20 - col*.034
            feather("Flight plate", (x, -.42 - .052*(3-col) - .031*(4-row), z),
                    (sign*(.24 + .15*col), -1), .125, .35 + col*.03, .092,
                    [rng.choice(navy), gold if (row+col)%2 == 0 else navy[2]], part)
    trim("Shoulder trim", [(sign*x, y, z) for x,y,z in ((.65,-.49,1.48),(.81,-.57,1.57),(1.03,-.53,1.56),(1.22,-.41,1.42))], .024, gold_light, part)

sphere("Crown shell", (0, .015, 2.24), (.84, .54, .70), navy[0], head)
for sign in [-1, 1]:
    for row in range(4, -1, -1):
        for col in range(4):
            x = sign*(.13 + col*.18)
            z = 2.99 - .14*row - .075*col
            feather("Crown scale", (x, -.18 - .085*row + .048*col, z),
                    (sign*(.04+col*.14), -.94), .112, .33, .080, [rng.choice(navy), gold if row < 2 else navy[2]], head)
    for index in range(7):
        feather("Ear plume", (sign*(.40+index*.045), -.42+index*.019, 2.60+index*.027),
                (sign*(.49-index*.04), 1), .109, .53+index*.024, .094, [navy[index%4], gold_light if index in (0,3,6) else gold], head)

    cx = sign*.359
    sphere("Face mask", (cx, -.445, 2.238), (.426, .23, .411), ivory[1], head)
    torus("Face outline", (cx, -.53, 2.242), .404, .386, .024, gold, head, sign*.07)
    for row in range(2):
        for i in range(18):
            angle = 2*pi*i/18
            rx, rz = (.248 + row*.066, .217 + row*.075)
            x, z = cx + rx*cos(angle), 2.246 + rz*sin(angle)
            feather("Facial feather", (x, -.606 + row*.045, z), (cos(angle), sin(angle)),
                    .045, .13, .033, [ivory[(i+row)%4]], head)
    eye_z = 2.302
    sphere("Eye bezel", (cx, -.665, eye_z), (.230, .075, .222), obsidian, head)
    torus("Eye ring", (cx, -.729, eye_z), .198, .197, .013, gold_light, head)
    iris_verts, iris_faces = [], []
    for ring, radius in enumerate([.047, .092, .135, .179]):
        for i in range(72):
            a = 2*pi*i/72
            iris_verts.append((cx+radius*cos(a), -.754 - .028*(1-(radius/.18)**2), eye_z+radius*sin(a)))
            if ring:
                prev = (ring-1)*72
                j = (i+1)%72
                iris_faces.append((prev+i, prev+j, prev+72+j, prev+72+i))
    mesh = bpy.data.meshes.new("Radial iris")
    mesh.from_pydata(iris_verts, [], iris_faces)
    obj = bpy.data.objects.new("Radial iris", mesh)
    bpy.context.collection.objects.link(obj)
    for mat in amber:
        mesh.materials.append(mat)
    for face in mesh.polygons:
        face.material_index = (rng.randrange(5) + face.index//72) % 5
        face.use_smooth = True
    attach(obj, head)
    sphere("Pupil", (cx, -.790, eye_z+.014), (.098, .031, .105), pupil, head)
    sphere("Catchlight", (cx-.038, -.817, eye_z+.073), (.028, .008, .021), glint, head)
    sphere("Catchlight", (cx+.043, -.812, eye_z-.029), (.011, .006, .012), glint, head)
    for i in range(6):
        feather("Eyebrow", (sign*(.105+i*.105), -.673 + .014*i, 2.430+.058*i),
                (sign*.85, .54+i*.085), .062, .36, .063, [navy[(i+1)%4], gold_light], head)

for row in range(3):
    for index in range(7 - row*2):
        x = (index - (3-row)) * .112
        feather("Bib", (x, -.604 - .039*row, 2.04-.112*row), (-x*.9, -1), .072, .23, .057, [rng.choice(ivory)], head)

beak_mesh = bpy.data.meshes.new("Beak")
beak_mesh.from_pydata([(0,-.655,2.334),(-.124,-.700,2.205),(0,-.944,2.216),(.124,-.700,2.205),(0,-.750,1.989),(0,-.653,2.112)],
                     [], [(0,1,2),(0,2,3),(1,4,2),(2,4,3),(1,5,4),(3,4,5),(0,5,1),(0,3,5)])
beak = bpy.data.objects.new("Gold beak", beak_mesh)
bpy.context.collection.objects.link(beak)
beak_mesh.materials.append(gold_light)
attach(beak, head)
bpy.context.view_layer.objects.active = beak
mod = beak.modifiers.new("Forged edges", "BEVEL")
mod.width, mod.segments = .028, 3

for sign in [-1, 1]:
    trim("Collar", [(sign*x, y, z) for x,y,z in ((0,-.77,.97),(.22,-.76,1.20),(.43,-.70,1.45),(.62,-.56,1.68),(.71,-.47,1.73))], .043, gold, body)
torus("Insignia", (0,-.791,1.30), .153, .153, .018, gold_light, body)
for angle in [0, pi/4, pi/2, 3*pi/4]:
    length = .193 if angle in (0,pi/2) else .105
    trim("Compass needle", [(-length*sin(angle),-.806,1.30-length*cos(angle)),(length*sin(angle),-.806,1.30+length*cos(angle))], .013, gold_light, body)
sphere("Compass stone", (0,-.828,1.30), (.054,.027,.054), sapphire, body)

torus("Orbit outside", (0,.43,1.84), 1.44, 1.17, .024, gold, orbit, .17)
torus("Orbit inside", (0,.47,1.84), 1.36, 1.08, .011, gold_light, orbit, -.21)
for angle in [.27, 1.37, 2.72, 3.49, 5.54]:
    x, z = 1.44*cos(angle), 1.84+1.17*sin(angle)
    sphere("Orbit node", (x,.43+.17*cos(angle),z), (.065,.065,.065), gold_light, orbit)


# Group geometry by articulation so every moving piece can be drawn in a few batches.
for part in (body, head, left, right, orbit):
    bpy.ops.object.select_all(action="DESELECT")
    pieces = list(part.children)
    for obj in pieces:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = pieces[0]
    bpy.ops.object.convert(target="MESH")
    bpy.ops.object.join()
    bpy.context.object.name = f"{part.name} geometry"


def motion(part, clip, keyframes):
    for frame, euler in keyframes:
        part.rotation_euler = euler
        part.keyframe_insert("rotation_euler", frame=frame, group="Articulation")
    action = part.animation_data.action
    action.name = f"{clip} {part.name}"
    tracks = part.animation_data.nla_tracks
    track = tracks.new()
    track.name = clip
    track.strips.new(clip, 1, action)
    part.animation_data.action = None
    part.rotation_euler = (0, 0, 0)


motion(head, "Idle", [(1,(0,0,0)), (50,(.04,-.038,.11)), (107,(-.04,.036,-.095)), (155,(0,0,0))])
motion(orbit, "Idle", [(1,(0,0,0)), (78,(.065,0,.16)), (155,(0,0,0))])
motion(head, "Invite", [(1,(0,0,0)), (13,(-.10,-.07,.10)), (34,(.09,.08,-.16)), (57,(0,0,0))])
motion(right, "Invite", [(1,(0,0,0)), (16,(.14,-.44,.20)), (28,(.07,-.29,.10)), (39,(.13,-.39,.17)), (57,(0,0,0))])
motion(left, "Invite", [(1,(0,0,0)), (25,(.08,.11,-.05)), (57,(0,0,0))])
motion(head, "Focus", [(1,(0,0,0)), (37,(.10,-.05,-.075)), (78,(.07,.025,.045)), (115,(0,0,0))])
motion(orbit, "Focus", [(1,(0,0,0)), (57,(0,0,.32)), (115,(0,0,0))])

scene = bpy.context.scene
scene.render.fps = 30
scene.frame_set(1)
bpy.ops.object.select_all(action="DESELECT")
for obj in (root, *root.children_recursive):
    obj.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(output/"owl-articulated.glb"), export_format="GLB", use_selection=True,
                          export_animations=True, export_animation_mode="NLA_TRACKS", export_frame_range=False)

for part in (body, head, left, right, orbit):
    part.animation_data_clear()
    part.rotation_euler = (0, 0, 0)


def aim(obj, target):
    obj.rotation_euler = (Vector(target)-obj.location).to_track_quat("-Z", "Y").to_euler()


def light(name, position, color, power, size):
    bpy.ops.object.light_add(type="AREA", location=position)
    obj = bpy.context.object
    obj.name = name
    obj.data.energy = power
    obj.data.color = color
    obj.data.shape = "DISK"
    obj.data.size = size
    aim(obj, (0,0,1.82))


bpy.ops.object.camera_add(location=(.43,-8.4,2.72))
scene.camera = bpy.context.object
scene.camera.data.type = "ORTHO"
scene.camera.data.ortho_scale = 3.61
aim(scene.camera, (0,0,1.87))
light("Key softbox", (-3,-5,6), (1,.78,.52), 520, 4.2)
light("Sapphire rim", (3,1.5,4), (.20,.43,1), 660, 3)
light("Frontal fill", (2,-4,3.2), (.53,.72,1), 230, 3.4)
light("Crown edge", (-2,2,4.7), (1,.67,.28), 420, 2.7)
scene.world.color = (.18,.18,.18)
scene.render.engine = "CYCLES"
scene.cycles.samples = 60
scene.cycles.use_denoising = False
scene.render.film_transparent = True
scene.render.resolution_x = scene.render.resolution_y = 880
scene.render.resolution_percentage = 100
scene.render.image_settings.color_mode = "RGBA"
scene.render.filepath = str(output/"owl-poster.png")
bpy.ops.render.render(write_still=True)
