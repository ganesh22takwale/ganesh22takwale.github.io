import { useEffect, useState } from "react"

export function useScrollEffects(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const visible =
        1 - Math.min(Math.max(rect.top / window.innerHeight, 0), 1)

      setProgress(visible)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return progress
}
