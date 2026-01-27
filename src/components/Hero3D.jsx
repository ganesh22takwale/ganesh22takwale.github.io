import GRTScene from "./GRTScene"
import StaticFallback from "./StaticFallback"

export default function Hero3D({ variant }) {
  const isLowEnd =
    navigator.hardwareConcurrency < 4 ||
    !window.WebGLRenderingContext

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {isLowEnd ? (
        <StaticFallback variant={variant} />
      ) : (
        <GRTScene variant={variant} />
      )}
    </div>
  )
}
