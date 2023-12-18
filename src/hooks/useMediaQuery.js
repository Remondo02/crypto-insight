import { useEffect, useState, useRef } from "react"

export function useMediaQuery() {
  const initialScreenSize = useRef(window.innerWidth)
  const [isMobile, setIsMobile] = useState(initialScreenSize.current)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobile])

  return isMobile < 600 
}
