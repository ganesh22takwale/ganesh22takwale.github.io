export default function StaticFallback({ variant }) {
  return (
    <img
      src={
        variant === "silver"
          ? "/grt-logo-11.jpg"
          : "/grt-logo-05.jpg"
      }
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        background: "black",
      }}
    />
  )
}
