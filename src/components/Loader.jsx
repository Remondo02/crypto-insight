import { Box, CircularProgress, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export default function Loader() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box
      sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "inline-block",
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
