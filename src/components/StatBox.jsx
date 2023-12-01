import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export function StatBox({ title, value, icon }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box backgroundColor={colors.primary[400]} padding={2}>
      <Box display="flex" justifyContent="flex-start" mb={1}>
        {icon}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {title}
        </Typography>
        <Typography
          variant="cardStat"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}