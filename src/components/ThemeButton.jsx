import { useContext } from "react"
import { Box, IconButton, useTheme } from "@mui/material"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import { ColorModeContext } from "../theme.js"

export default function ThemeButton() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  return (
    <Box sx={{py: {xs: 2}, p: {sm: 2}}} display="flex" justifyContent="flex-end" py={2}>
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
