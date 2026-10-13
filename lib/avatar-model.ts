import * as THREE from "three"
import { MarchingCubes } from "three/addons/objects/MarchingCubes.js"

// Paint the iris on the eye surface so the lids naturally cover it.
// Separate iris spheres made the earlier model look wide-eyed.
function createEyeTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 704
  canvas.height = 448
  const context = canvas.getContext("2d")!
  context.fillStyle = "#fffdf8"
  context.fillRect(0, 0, 704, 448)
  const x = 352
  const y = 173
  const radius = 200
  const gradient = context.createRadialGradient(x, y, 115, x, y, radius)
  gradient.addColorStop(0, "#9b7a4f")
  gradient.addColorStop(0.55, "#ab8958")
  gradient.addColorStop(0.88, "#765737")
  gradient.addColorStop(1, "#32271d")
  context.fillStyle = gradient
  context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.fill()
  for (let i = 0; i < 180; i++) {
    const angle = i * Math.PI * 2 / 180
    const inner = 137 + Math.sin(i * 7.13) * 13
    const outer = radius - 9 - (Math.sin(i * 3.71) + 1) * 10
    context.strokeStyle = i % 3 ? "rgba(63,42,22,0.17)" : "rgba(213,181,119,0.3)"
    context.lineWidth = 1.5
    context.beginPath()
    context.moveTo(x + Math.cos(angle) * inner, y + Math.sin(angle) * inner)
    context.lineTo(x + Math.cos(angle + 0.015) * outer, y + Math.sin(angle + 0.015) * outer)
    context.stroke()
  }
  context.fillStyle = "#070605"
  context.beginPath(); context.arc(x, y, 129, 0, Math.PI * 2); context.fill()
  context.fillStyle = "#ffffff"
  context.beginPath(); context.ellipse(x - 73, y - 95, 34, 30, -0.3, 0, Math.PI * 2); context.fill()
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function fuseHair(shapes: THREE.Group, material: THREE.Material) {
  shapes.updateMatrixWorld(true)
  const bounds = new THREE.Box3().setFromObject(shapes).expandByScalar(0.075)
  const center = bounds.getCenter(new THREE.Vector3())
  const size = bounds.getSize(new THREE.Vector3())
  const half = Math.max(size.x, size.y, size.z) / 2
  const volumes: { inverse: number[]; radius: number }[] = []
  shapes.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    volumes.push({ inverse: object.matrixWorld.clone().invert().elements, radius: Math.min(object.scale.x, object.scale.y, object.scale.z) })
  })
  const resolution = 64
  const surface = new MarchingCubes(resolution, material, false, false, 40000)
  surface.isolation = 0
  for (let z = 0; z < resolution; z++) {
    const worldZ = center.z + (z / resolution * 2 - 1) * half
    for (let y = 0; y < resolution; y++) {
      const worldY = center.y + (y / resolution * 2 - 1) * half
      for (let x = 0; x < resolution; x++) {
        const worldX = center.x + (x / resolution * 2 - 1) * half
        let distance = 100
        for (const { inverse: m, radius } of volumes) {
          const localX = m[0] * worldX + m[4] * worldY + m[8] * worldZ + m[12]
          const localY = m[1] * worldX + m[5] * worldY + m[9] * worldZ + m[13]
          const localZ = m[2] * worldX + m[6] * worldY + m[10] * worldZ + m[14]
          const next = (Math.sqrt(localX * localX + localY * localY + localZ * localZ) - 1) * radius
          // A soft union retains swept ridges while blending their seams.
          const blend = Math.max(0, Math.min(1, 0.5 + 0.5 * (next - distance) / 0.014))
          distance = next + (distance - next) * blend - 0.014 * blend * (1 - blend)
        }
        surface.field[z * resolution * resolution + y * resolution + x] = -distance
      }
    }
  }
  surface.update()
  const geometry = surface.geometry.clone()
  geometry.setDrawRange(0, surface.geometry.drawRange.count)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(center)
  mesh.scale.setScalar(half)
  surface.geometry.dispose()
  return mesh
}

// Sculpted from the supplied portrait. The unseen sides and back are interpreted.
export function createAvatarModel() {
  const head = new THREE.Group()
  const skin = new THREE.MeshStandardMaterial({ color: "#514139", roughness: 0.65 })
  const innerEar = new THREE.MeshStandardMaterial({ color: "#4f3226", roughness: 0.8 })
  const hair = new THREE.MeshStandardMaterial({ color: "#aaaba6", roughness: 0.6 })
  const hairShade = new THREE.MeshStandardMaterial({ color: "#a8aaa4", roughness: 0.68 })
  const eyeMaterial = new THREE.MeshBasicMaterial({ map: createEyeTexture(), toneMapped: false })
  const lips = new THREE.MeshStandardMaterial({ color: "#4d352e", roughness: 0.78 })
  const mouth = new THREE.MeshStandardMaterial({ color: "#301b15", roughness: 0.85 })
  const sphere = new THREE.SphereGeometry(1, 48, 32)

  function ellipsoid(parent: THREE.Group, material: THREE.Material, position: number[], scale: number[], rotation = 0) {
    const mesh = new THREE.Mesh(sphere, material)
    mesh.position.set(position[0], position[1], position[2])
    mesh.scale.set(scale[0], scale[1], scale[2])
    mesh.rotation.z = rotation
    parent.add(mesh)
    return mesh
  }

  function stroke(parent: THREE.Group, material: THREE.Material, points: number[][], radius: number) {
    const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)))
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, radius, 10, false), material)
    parent.add(mesh)
    ellipsoid(parent, material, points[0], [radius, radius, radius])
    ellipsoid(parent, material, points[points.length - 1], [radius, radius, radius])
    return mesh
  }

  // A continuous jaw, cheek and forehead surface rather than stacked primitives.
  const profile = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.001, -1.15, 0.001),
    new THREE.Vector3(0.15, -1.135, 0.14),
    new THREE.Vector3(0.34, -1.065, 0.31),
    new THREE.Vector3(0.59, -0.88, 0.49),
    new THREE.Vector3(0.77, -0.58, 0.62),
    new THREE.Vector3(0.83, -0.25, 0.66),
    new THREE.Vector3(0.87, 0.12, 0.66),
    new THREE.Vector3(0.86, 0.51, 0.70),
    new THREE.Vector3(0.83, 0.88, 0.6),
    new THREE.Vector3(0.65, 1.12, 0.47),
    new THREE.Vector3(0.001, 1.25, 0.001),
  ], false, "catmullrom", 0.35)
  const positions: number[] = []
  const indices: number[] = []
  const rows = 140
  const columns = 180
  for (let row = 0; row <= rows; row++) {
    const { x: radiusX, y, z: radiusZ } = profile.getPoint(row / rows)
    for (let column = 0; column <= columns; column++) {
      const angle = column / columns * Math.PI * 2
      const x = radiusX * Math.cos(angle)
      let z = radiusZ * Math.sin(angle) - 0.075
      if (Math.sin(angle) > 0) {
        // Subtle cheek fullness and shallow sockets blend into the face.
        const cheek = Math.exp(-((Math.abs(x) - 0.48) ** 2 / 0.06 + (y + 0.36) ** 2 / 0.06)) * 0.075
        const socket = Math.exp(-((Math.abs(x) - 0.42) ** 2 / 0.045 + y ** 2 / 0.025)) * 0.045
        const nose = Math.exp(-(x ** 2 / 0.026 + (y + 0.35) ** 2 / 0.018)) * 0.12
        const bridge = Math.exp(-(x ** 2 / 0.015 + (y + 0.12) ** 2 / 0.07)) * 0.075
        const muzzle = Math.exp(-((x - 0.1) ** 2 / 0.16 + (y + 0.61) ** 2 / 0.028)) * 0.035
        z += (cheek - socket + nose + bridge + muzzle) * Math.sin(angle)
      }
      positions.push(x, y, z)
      if (row < rows && column < columns) {
        const a = row * (columns + 1) + column
        const b = a + columns + 1
        indices.push(a, b, a + 1, b, b + 1, a + 1)
      }
    }
  }
  const face = new THREE.BufferGeometry()
  face.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  face.setIndex(indices)
  face.computeVertexNormals()
  head.add(new THREE.Mesh(face, skin))

  for (const side of [-1, 1]) {
    const ear = new THREE.Group()
    ear.position.set(side * 0.87, -0.12, -0.05)
    ear.rotation.z = side * -0.12
    ellipsoid(ear, skin, [side * 0.015, 0, 0], [0.105, 0.27, 0.1])
    ellipsoid(ear, innerEar, [side * 0.01, 0.025, 0.077], [0.042, 0.17, 0.023])
    ellipsoid(ear, skin, [side * -0.015, -0.02, 0.09], [0.04, 0.13, 0.035])
    head.add(ear)
  }

  // The whites are convex almond surfaces with a dark upper lid.
  function eye(side: number) {
    const group = new THREE.Group()
    group.position.set(side * 0.425, side === 1 ? 0.025 : -0.025, 0.49)
    group.rotation.y = side * 0.28
    group.rotation.z = side * 0.1
    const vertices = [0, 0, 0.075]
    const uvs = [0.5, 0.5]
    const triangles: number[] = []
    const segments = 64
    for (let ring = 1; ring <= 10; ring++) {
      const r = ring / 10
      for (let i = 0; i <= segments; i++) {
        const angle = i / segments * Math.PI * 2
        const x = Math.cos(angle) * 0.25 * r
        const y = Math.sin(angle) * (Math.sin(angle) > 0 ? (side === -1 ? 0.115 : 0.145) : 0.14) * r
        vertices.push(x, y, 0.075 * (1 - r * r))
        uvs.push(x / 0.55 + 0.5, y / 0.35 + 0.5)
        const current = 1 + (ring - 1) * (segments + 1) + i
        if (i < segments) {
          if (ring === 1) triangles.push(0, current, current + 1)
          else {
            const previous = current - segments - 1
            triangles.push(previous, current, current + 1, previous, current + 1, previous + 1)
          }
        }
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2))
    geometry.setIndex(triangles)
    geometry.computeVertexNormals()
    group.add(new THREE.Mesh(geometry, eyeMaterial))
    const lidHeight = side === -1 ? 0.115 : 0.145
    stroke(group, mouth, [[-0.246, 0, 0.009], [-0.14, lidHeight * 0.85, 0.011], [0, lidHeight, 0.011], [0.155, lidHeight * 0.8, 0.01], [0.246, 0, 0.009]], 0.009)
    head.add(group)
  }
  eye(-1)
  eye(1)

  // Low left brow and raised right brow preserve the reference's expression.
  stroke(head, hair, [[-0.69, 0.25, 0.369], [-0.56, 0.27, 0.48], [-0.39, 0.268, 0.546], [-0.22, 0.23, 0.564]], 0.024)
  stroke(head, hair, [[0.22, 0.28, 0.569], [0.38, 0.35, 0.544], [0.55, 0.37, 0.47], [0.68, 0.33, 0.369]], 0.026)
  ellipsoid(head, skin, [0, -0.35, 0.635], [0.18, 0.145, 0.145])

  const smile = new THREE.Group()
  smile.position.set(0.12, -0.64, 0.561)
  smile.rotation.z = 0.26
  ellipsoid(smile, lips, [0, -0.014, -0.018], [0.205, 0.045, 0.038])
  stroke(smile, mouth, [[-0.2, -0.012, 0.007], [-0.06, 0.011, 0.02], [0.07, 0.017, 0.022], [0.2, 0.022, 0.004]], 0.004)
  head.add(smile)

  // Side-swept silver hair wraps the scalp; overlapping lobes form the bun.
  const hairShapes = new THREE.Group()
  ellipsoid(hairShapes, hairShade, [0, 0.94, -0.24], [0.84, 0.5, 0.57])
  for (const side of [-1, 1]) {
    ellipsoid(hairShapes, hair, [side * 0.8, 0.49, -0.08], [0.09, 0.43, 0.36], side * 0.025)
    ellipsoid(hairShapes, hair, [side * 0.79, 0.74, 0.06], [0.15, 0.23, 0.35], side * -0.28)
  }
  const bun = new THREE.Group()
  bun.position.set(0.02, 1.5, -0.27)
  ellipsoid(bun, hairShade, [0, 0, 0], [0.36, 0.28, 0.32])
  for (let row = 0; row < 3; row++) {
    const count = row === 2 ? 5 : 8
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2 + row * 0.3
      const radius = row === 2 ? 0.19 : 0.36 - row * 0.06
      ellipsoid(bun, hair, [Math.cos(angle) * radius, row * 0.16 - 0.12, Math.sin(angle) * radius], [0.17, 0.215, 0.18], Math.cos(angle) * -0.45)
    }
  }
  head.add(fuseHair(hairShapes, hair))
  head.add(bun)
  // Broad overlapping sweeps, with the largest curl across the front left.
  ellipsoid(head, hair, [0.63, 1.14, 0.14], [0.28, 0.3, 0.39], -0.6)
  ellipsoid(head, hair, [0.43, 1.30, 0.32], [0.31, 0.36, 0.42], -0.5)
  ellipsoid(head, hair, [0.13, 1.34, 0.47], [0.30, 0.37, 0.32], -0.22)
  ellipsoid(head, hair, [-0.33, 1.30, 0.55], [0.46, 0.34, 0.29], 0.06)
  ellipsoid(head, hair, [-0.68, 1.04, 0.19], [0.23, 0.34, 0.35], -0.45)
  head.position.y = -0.34
  return head
}

export function disposeAvatarModel(model: THREE.Group) {
  const geometries = new Set<THREE.BufferGeometry>()
  const materials = new Set<THREE.Material>()
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    geometries.add(object.geometry)
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material)
  })
  for (const geometry of geometries) geometry.dispose()
  const textures = new Set<THREE.Texture>()
  for (const material of materials) {
    if ((material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshBasicMaterial) && material.map) textures.add(material.map)
    material.dispose()
  }
  for (const texture of textures) texture.dispose()
}
