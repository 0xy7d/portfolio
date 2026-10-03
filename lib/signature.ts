export type Signature = [number, number][][]
export const signatureWidth = 400
export const signatureHeight = 160
export const maxSignaturePoints = 1200
export const maxSignatureStrokes = 32

/** Accept only bounded numeric strokes, never uploaded SVG, HTML or image data. */
export function parseSignature(value: unknown): Signature | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > maxSignatureStrokes) return null
  const result: Signature = []
  let count = 0
  for (const stroke of value) {
    if (!Array.isArray(stroke) || stroke.length === 0) return null
    count += stroke.length
    if (count > maxSignaturePoints) return null
    const points: [number, number][] = []
    for (const point of stroke) {
      if (!Array.isArray(point) || point.length !== 2) return null
      const [x, y] = point
      if (typeof x !== "number" || typeof y !== "number" || !Number.isFinite(x) || !Number.isFinite(y) || x < 0 || x > signatureWidth || y < 0 || y > signatureHeight) return null
      points.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10])
    }
    result.push(points)
  }
  return result
}
