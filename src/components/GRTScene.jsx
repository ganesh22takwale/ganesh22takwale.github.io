import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Float,
  shaderMaterial
} from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { extend } from "@react-three/fiber"
import * as THREE from "three"
import { useRef, useMemo } from "react"

/* ================================
   SHADER: ENERGY PULSE MATERIAL
================================ */
const EnergyMaterial = shaderMaterial(
  { time: 0 },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform float time;
    varying vec2 vUv;

    void main() {
      float pulse = sin(vUv.y * 20.0 + time * 4.0) * 0.5 + 0.5;
      vec3 color = vec3(0.2, 0.8, 1.0);
      gl_FragColor = vec4(color, pulse);
    }
  `
)

extend({ EnergyMaterial })

/* ================================
   LOGO PLANE
================================ */
function Logo({ image, emissive, intensity }) {
  const mesh = useRef()
  const texture = useMemo(
    () => new THREE.TextureLoader().load(image),
    [image]
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Awakening animation
    const scale = Math.min(t / 2, 1)
    mesh.current.scale.setScalar(scale)

    // Subtle intelligence motion
    mesh.current.rotation.y = Math.sin(t * 0.4) * 0.15

    // Mouse proximity reaction
    mesh.current.rotation.x = state.mouse.y * 0.3
    mesh.current.rotation.y += state.mouse.x * 0.4
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial
        map={texture}
        transparent
        emissive={new THREE.Color(emissive)}
        emissiveIntensity={intensity}
        metalness={0.85}
        roughness={0.2}
      />
    </mesh>
  )
}

/* ================================
   ENERGY RING
================================ */
function EnergyRing() {
  const ring = useRef()

  useFrame((state) => {
    ring.current.rotation.z += 0.002
    ring.current.material.time = state.clock.elapsedTime
  })

  return (
    <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.35, 0.045, 32, 200]} />
      <energyMaterial transparent />
    </mesh>
  )
}

/* ================================
   MAIN SCENE
================================ */
export default function GRTScene({ variant = "color" }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 6, 6]} intensity={2.2} />

      {/* Floating Intelligence Core */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <Logo
          image={
            variant === "silver"
              ? "/grt-logo-11.jpg"
              : "/grt-logo-05.jpg"
          }
          emissive={variant === "silver" ? "#ffffff" : "#00ffff"}
          intensity={variant === "silver" ? 0.7 : 1.5}
        />
        <EnergyRing />
      </Float>

      {/* Environment reflections */}
      <Environment preset="city" />

      {/* Postprocessing Glow */}
      <EffectComposer>
        <Bloom
          intensity={1.25}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  )
}
