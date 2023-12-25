import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export default function Header({ title, subtitle }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box mb={10} width="100%">
      {title && (
        <Typography
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="h2" color={colors.greenAccent[500]}>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
