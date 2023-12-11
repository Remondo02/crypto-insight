import { useEffect, useState } from "react"

export function useCheckNavigation() {
  const [pathName, setPathName] = useState(location.pathname)

  useEffect(() => {
    const handleHashChange = () => {
      setPathName(location.pathname)
    }
    window.addEventListener("popstate", handleHashChange)

    return () => {
      window.removeEventListener("popstate", handleHashChange)
    }
  }, [])

  const cleanPathName = pathName.replace("/", "").toLowerCase()
  return { page: cleanPathName ? cleanPathName : "dashboard" }
}
