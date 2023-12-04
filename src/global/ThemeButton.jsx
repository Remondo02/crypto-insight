import { IconButton, useTheme } from "@mui/material"
import Box from "@mui/system/Box"
import { useContext } from "react"
import { ColorModeContext } from "../theme.js"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"

export function ThemeButton() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}
