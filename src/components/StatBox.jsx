import { Box, Typography, useTheme } from "@mui/material"
import { tokens } from "../theme.js"

export function StatBox({ title, value, icon }) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box width="100%" m="30px">
      <Box mb="10px">{icon}</Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {title}
          </Typography>
        </Box>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100] }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}
