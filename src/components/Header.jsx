import { Typography, Box, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export function Header({ title, subtitle }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box mb={3}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5" }}
        mb={3}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[500]}>
        {subtitle}
      </Typography>
    </Box>
  )
}
