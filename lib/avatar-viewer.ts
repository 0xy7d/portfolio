import * as THREE from "three"
import { createAvatarModel, disposeAvatarModel } from "./avatar-model"

const initialYaw = 0.2
const initialPitch = 0.01
const initialRoll = 0.06

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
  scene.add(new THREE.HemisphereLight("#ece8e0", "#aaa6a4", 1.8))
  const key = new THREE.DirectionalLight("#fffaff", 2.5)
  key.position.set(-3, 5, 8)
  scene.add(key)
  const fill = new THREE.DirectionalLight("#ffffff", 1.5)
  fill.position.set(1, 0, 8)
  scene.add(fill)
  const rim = new THREE.DirectionalLight("#d9ccff", 1)
  rim.position.set(2, 3, -4)
  scene.add(rim)
  let disposed = false
  let visible = true
  let frame = 0
  let targetYaw = initialYaw
  let targetPitch = initialPitch
  let lastFrame = 0
  let pointer: { x: number; y: number } | null = null
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  function draw(time: number) {
    frame = 0
    if (disposed || !visible || document.hidden) { lastFrame = 0; return }
    const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.05) : 1 / 60
    lastFrame = time
    const blend = reducedMotion.matches ? 1 : 1 - Math.exp(-12 * delta)
    model.rotation.y += (targetYaw - model.rotation.y) * blend
    model.rotation.x += (targetPitch - model.rotation.x) * blend
    const moving = Math.abs(targetYaw - model.rotation.y) + Math.abs(targetPitch - model.rotation.x) > 0.001
    if (!moving) {
      model.rotation.y = targetYaw
      model.rotation.x = targetPitch
      lastFrame = 0
    }
    renderer.render(scene, camera)
    if (moving) requestDraw()
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
  function followPointer() {
    if (!pointer || reducedMotion.matches || !visible || document.hidden || disposed) return
    const bounds = canvas.getBoundingClientRect()
    const yaw = THREE.MathUtils.clamp(Math.atan2(pointer.x - bounds.left - bounds.width / 2, bounds.width * 1.2), -0.7, 0.7)
    targetYaw = model.rotation.y + THREE.MathUtils.euclideanModulo(yaw - model.rotation.y + Math.PI, Math.PI * 2) - Math.PI
    targetPitch = THREE.MathUtils.clamp(Math.atan2(pointer.y - bounds.top - bounds.height / 2, bounds.height * 1.4), -0.32, 0.32)
    requestDraw()
  }
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || event.buttons) return
    pointer = { x: event.clientX, y: event.clientY }
    followPointer()
  }
  const rest = () => {
    pointer = null
    targetYaw = initialYaw
    targetPitch = initialPitch
    requestDraw()
  }
  const onMotionPreference = () => { if (reducedMotion.matches) rest() }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) { followPointer(); requestDraw() }
  })
  intersectionObserver.observe(canvas)
  const onVisibility = () => { if (!document.hidden) requestDraw() }
  const onLoss = (event: Event) => { event.preventDefault(); onContextLost() }
  document.addEventListener("visibilitychange", onVisibility)
  canvas.addEventListener("webglcontextlost", onLoss)
  window.addEventListener("pointermove", onPointer, { passive: true })
  window.addEventListener("scroll", followPointer, { passive: true })
  window.addEventListener("blur", rest)
  document.documentElement.addEventListener("pointerleave", rest)
  reducedMotion.addEventListener("change", onMotionPreference)
  resize()

  return {
    rotate(x: number, y: number) {
      pointer = null
      model.rotation.y = (model.rotation.y + x) % (Math.PI * 2)
      model.rotation.x = THREE.MathUtils.clamp(model.rotation.x + y, -0.35, 0.35)
      targetYaw = model.rotation.y
      targetPitch = model.rotation.x
      requestDraw()
    },
    reset() {
      pointer = null
      targetYaw = initialYaw
      targetPitch = initialPitch
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
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("scroll", followPointer)
      window.removeEventListener("blur", rest)
      document.documentElement.removeEventListener("pointerleave", rest)
      reducedMotion.removeEventListener("change", onMotionPreference)
      disposeAvatarModel(model)
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
