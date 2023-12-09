import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import { useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export function Loader() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "inline",
      }}
    >
      <CircularProgress
        variant="indeterminate"
        sx={{
          color: colors.greenAccent[500],
        }}
        size={40}
        thickness={4}
      />
    </Box>
  )
}
