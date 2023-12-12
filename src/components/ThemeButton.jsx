import { IconButton, useTheme } from "@mui/material"
import Box from "@mui/system/Box"
import { useContext } from "react"
import { ColorModeContext } from "../theme.js"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import { useMediaQuery } from "../hooks/useMediaQuery.js"

export function ThemeButton() {
  const isMobile = useMediaQuery()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  const styles = isMobile ? { py: 2 } : { p: 2 }

  return (
    <Box sx={styles} display="flex" justifyContent="flex-end" py={2}>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
    </Box>
  )
}
