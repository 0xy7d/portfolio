import * as THREE from "three"
import { createAvatarModel, disposeAvatarModel } from "./avatar-model"

const initialYaw = 0.14
const initialPitch = 0.01
const initialRoll = 0.09

export function mountAvatar(canvas: HTMLCanvasElement, onContextLost: () => void) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1.55, 1.55, 1.8, -1.8, 0.1, 30)
  camera.position.set(0, 0, 8)
  const model = createAvatarModel()
  model.rotation.set(initialPitch, initialYaw, initialRoll)
  scene.add(model)
  scene.add(new THREE.HemisphereLight("#fff8f0", "#92817a", 2.6))
  const key = new THREE.DirectionalLight("#fff8ef", 2.2)
  key.position.set(-3, 5, 7)
  scene.add(key)
  const fill = new THREE.DirectionalLight("#e1deef", 1.2)
  fill.position.set(4, 1, 4)
  scene.add(fill)
  const rim = new THREE.DirectionalLight("#d9ccff", 1)
  rim.position.set(2, 3, -4)
  scene.add(rim)
  let disposed = false
  let visible = true
  let frame = 0

  function draw() {
    frame = 0
    if (!disposed && visible && !document.hidden) renderer.render(scene, camera)
  }
  function requestDraw() {
    if (!disposed && !frame) frame = requestAnimationFrame(draw)
  }
  function resize() {
    const { width, height } = canvas.getBoundingClientRect()
    if (!width || !height) return
    const aspect = width / height
    camera.left = -1.8 * aspect
    camera.right = 1.8 * aspect
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
    requestDraw()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) requestDraw()
  })
  intersectionObserver.observe(canvas)
  const onVisibility = () => { if (!document.hidden) requestDraw() }
  const onLoss = (event: Event) => { event.preventDefault(); onContextLost() }
  document.addEventListener("visibilitychange", onVisibility)
  canvas.addEventListener("webglcontextlost", onLoss)
  resize()

  return {
    rotate(x: number, y: number) {
      model.rotation.y = (model.rotation.y + x) % (Math.PI * 2)
      model.rotation.x = THREE.MathUtils.clamp(model.rotation.x + y, -0.35, 0.35)
      requestDraw()
    },
    reset() {
      model.rotation.set(initialPitch, initialYaw, initialRoll)
      requestDraw()
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      canvas.removeEventListener("webglcontextlost", onLoss)
      disposeAvatarModel(model)
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
