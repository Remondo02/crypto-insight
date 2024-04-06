import { Theme } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ThemeButton, Topbar, Sidebar } from "@/components"
import { PropsWithChildren } from "react"

type MainContentProps = PropsWithChildren<{
  wrapper: string
}>

export default function MainContent({ children, wrapper }: MainContentProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"))

  return (
    <div className="app">
      {isMobile ? <Topbar /> : <Sidebar />}
      <main>
        {!isMobile && <ThemeButton />}
        <div className={wrapper}>
          {children}
        </div>
      </main>
    </div>
  )
}
