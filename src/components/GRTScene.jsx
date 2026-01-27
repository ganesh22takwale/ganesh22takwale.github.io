import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { useRef } from "react"

function Logo({ image, emissive, intensity }) {
  const mesh = useRef()
  const texture = new THREE.TextureLoader().load(image)

  useFrame((state) => {
    mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial
        map={texture}
        transparent
        emissive={new THREE.Color(emissive)}
        emissiveIntensity={intensity}
        roughness={0.25}
        metalness={0.8}
      />
    </mesh>
  )
}

function EnergyRing() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.3, 0.04, 32, 200]} />
      <meshStandardMaterial
        emissive="#7f5cff"
        emissiveIntensity={3}
        color="#00ffff"
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  )
}

export default function GRTScene({ variant = "color" }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2} />

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
        <Logo
          image={
            variant === "silver"
              ? "/grt-logo-11.jpg"
              : "/grt-logo-05.jpg"
          }
          emissive={variant === "silver" ? "#ffffff" : "#00ffff"}
          intensity={variant === "silver" ? 0.8 : 1.6}
        />
        <EnergyRing />
      </Float>

      <Environment preset="city" />

      <EffectComposer>
        <Bloom
          intensity={1.3}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
