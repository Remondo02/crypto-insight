import { Typography, Box, Divider, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export function Header({ title, subtitle }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box mb={7} width="100%">
      <Box mb={3}>
        {title && (
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
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
      <Divider />
    </Box>
  )
}
